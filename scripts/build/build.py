"""Build the client and server packs locally.
Usage: build [--client-only] [--version X.Y.Z] [--ram MB] [--name NAME] [--heap 8g]
"""
import argparse
import glob
import json
import os
import re
import shutil
import subprocess
import sys
import urllib.request
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SETTINGS = json.loads((Path(__file__).resolve().parent / "build_settings.json").read_text(encoding="utf-8"))
SRC = ROOT / "src"
DIST = ROOT / "dist"
MAX_ATTEMPTS = 3

parser = argparse.ArgumentParser()
parser.add_argument("--client-only", action="store_true", help="skip the server pack")
parser.add_argument("--version", help="set the pack version in pakku.json before building")
parser.add_argument("--ram", type=int, default=SETTINGS["recommended_ram"], help="recommendedRam for the manifest (MB)")
parser.add_argument("--name", default=SETTINGS["manifest_name"], help="pack name written to manifest.json")
parser.add_argument("--heap", default=SETTINGS["pakku_heap"], help="maximum Java heap for pakku (it reads all mod files into memory)")
args = parser.parse_args()


def fail(message):
    print(f"\nERROR: {message}", file=sys.stderr)
    sys.exit(1)


PAKKU_VERSION = SETTINGS["pakku_version"]
PAKKU_URL = f"https://github.com/juraj-hrivnak/Pakku/releases/download/{PAKKU_VERSION}/pakku.jar"


def pakku_command():
    exe = shutil.which("pakku")
    if exe:
        return [exe]
    if not shutil.which("java"):
        fail("pakku was not found and Java is not installed. Install Java 21+ (or pakku itself via scoop/brew).")
    jar = ROOT / "pakku.jar"
    if not jar.exists():
        print(f"pakku was not found, downloading {PAKKU_URL} to {jar}")
        try:
            urllib.request.urlretrieve(PAKKU_URL, jar)
        except OSError as error:
            jar.unlink(missing_ok=True)
            fail(f"could not download pakku.jar: {error}")
    return ["java", "-jar", str(jar)]


def run_pakku(*pakku_args, capture=False):
    command = pakku_command() + list(pakku_args)
    env = os.environ.copy()
    env.setdefault("JAVA_TOOL_OPTIONS", f"-Xmx{args.heap}")
    process = subprocess.Popen(command, cwd=SRC, env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    lines = []
    for raw in process.stdout:
        line = raw.decode("utf-8", errors="replace")
        lines.append(line)
        if not capture:
            sys.stdout.write(line)
            sys.stdout.flush()
    process.wait()
    return process.returncode, "".join(lines)


def read_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


if args.version:
    code, _ = run_pakku("cfg", "--version", args.version)
    if code != 0:
        fail("could not set the version in pakku.json")

pakku_config = read_json(SRC / "pakku.json")
pakku_lock = read_json(SRC / "pakku-lock.json")
modpack_version = pakku_config["version"]
print(f"Building {pakku_config['name']} {modpack_version}")

neoforge_version = pakku_lock.get("loaders", {}).get("neoforge")
if not neoforge_version:
    fail("no NeoForge version in pakku-lock.json")

NEOFORGE_PLACEHOLDER = b"@NEOFORGE_VERSION@"
start_scripts = [SRC / ".pakku" / "server-overrides" / name for name in ("start.sh", "start.bat")]

if not args.client_only:
    subprocess.run([sys.executable, str(Path(__file__).resolve().parent / "stage_server_files.py")], check=True)
# TODO: Finish implementing caching for server pack (mods folder with 1g size) ;-;
cache = SRC / "build" / ".cache" / "serverpack"
if cache.exists():
    shutil.rmtree(cache)
for pattern in ("build/curseforge/*.zip", "build/serverpack/*.zip"):
    for old in glob.glob(str(SRC / pattern)):
        try:
            os.remove(old)
        except OSError:
            fail(f"cannot delete {old}. Close the program that has it open (archiver, explorer, ...) and try again.")

templates = {}
try:
    if not args.client_only:
        for script in start_scripts:
            data = script.read_bytes()
            if NEOFORGE_PLACEHOLDER not in data:
                fail(f"{script.name} has no {NEOFORGE_PLACEHOLDER.decode()} placeholder")
            templates[script] = data
            script.write_bytes(data.replace(NEOFORGE_PLACEHOLDER, neoforge_version.encode()))

    export_args = ["-y", "export"] + (["--no-server"] if args.client_only else [])
    for attempt in range(1, MAX_ATTEMPTS + 1):
        print(f"\nExport attempt {attempt}/{MAX_ATTEMPTS}")
        code, output = run_pakku(*export_args)
        if "OutOfMemoryError" in output:
            fail(f"pakku ran out of memory. Try a bigger heap, e.g. --heap 12g (currently {args.heap}).")
        if "Failed to download" not in output:
            break
        print(f"WARNING: some files failed to download (attempt {attempt})")
    else:
        fail(f"files failed to download after {MAX_ATTEMPTS} attempts")
finally:
    for script, data in templates.items():
        script.write_bytes(data)


def newest(pattern):
    files = sorted(glob.glob(str(SRC / pattern)), key=os.path.getmtime)
    return Path(files[-1]) if files else None


client_zip = newest("build/curseforge/*.zip")
if not client_zip:
    fail("the client zip was not created")
server_zip = None if args.client_only else newest("build/serverpack/*.zip")
if not args.client_only and not server_zip:
    fail("the server pack was not created")

if server_zip:
    mods = [p for p in pakku_lock["projects"] if p["type"] == "MOD"]
    excluded_slugs = {
        slug
        for slug, value in pakku_config.get("projects", {}).items()
        if value.get("side") == "CLIENT" or value.get("export") is False
    }
    expected = len(mods) - len(excluded_slugs)
    with zipfile.ZipFile(server_zip) as archive:
        actual = sum(1 for n in archive.namelist() if re.match(r"^mods/.*\.jar$", n))
    print(f"\nServer pack jars: {actual} (expected at least {expected})")
    if actual < expected:
        fail("the server pack has fewer mods than expected")

subprocess.run(
    [sys.executable, str(Path(__file__).resolve().parent / "patch_manifest.py"), str(client_zip), "--ram", str(args.ram), "--name", args.name],
    check=True,
)

DIST.mkdir(exist_ok=True)
outputs = [(client_zip, f"MI-Lost-Favor-{modpack_version}-curseforge.zip")]
if server_zip:
    outputs.append((server_zip, f"MI-Lost-Favor-{modpack_version}-serverpack.zip"))
print()
for source, name in outputs:
    (DIST / name).unlink(missing_ok=True)
    shutil.move(source, DIST / name)
    print(f"Created {DIST / name} ({(DIST / name).stat().st_size / 1024 / 1024:.1f} MB)")
