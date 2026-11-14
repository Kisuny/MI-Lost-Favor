import argparse
import json
import os
import subprocess
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
SETTINGS = json.loads((Path(__file__).resolve().parent / "build_settings.json").read_text(encoding="utf-8"))
SRC = ROOT / "src"
DIST = ROOT / "dist"
API = "https://minecraft.curseforge.com/api"


def fail(message):
    print(f"\nERROR: {message}", file=sys.stderr)
    sys.exit(1)


def read_json(path):
    return json.loads(Path(path).read_text(encoding="utf-8"))


pakku_config = read_json(SRC / "pakku.json")
pakku_lock = read_json(SRC / "pakku-lock.json")

parser = argparse.ArgumentParser()
parser.add_argument("--version", default=pakku_config["version"], help="pack version (default: from pakku.json)")
parser.add_argument("--release-type", default=SETTINGS.get("curseforge_release_type", "release"), choices=["release", "beta", "alpha"])
parser.add_argument("--changelog", default=str(DIST / "changes.md"), help="markdown changelog file")
parser.add_argument("--changelog-url", help="link to the release page, used as the changelog instead of the file")
parser.add_argument("--dry-run", action="store_true", help="print what would be uploaded without uploading")
args = parser.parse_args()

project_id = os.environ.get("CURSEFORGE_PROJECT_ID") or SETTINGS.get("curseforge_project_id")
if not project_id:
    fail("no CurseForge project id: set curseforge_project_id in build_settings.json")
token = os.environ.get("CURSEFORGE_TOKEN")
if not token and not args.dry_run:
    fail("the CURSEFORGE_TOKEN environment variable is not set")

client_zip = DIST / f"MI-Lost-Favor-{args.version}.zip"
server_zip = DIST / f"MI-Lost-Favor-{args.version}-serverpack.zip"
for path in (client_zip, server_zip):
    if not path.exists():
        fail(f"{path} not found, build the pack first")

changelog_path = Path(args.changelog)
if args.changelog_url:
    changelog = f"Changelog: [{args.changelog_url}]({args.changelog_url})"
elif changelog_path.exists():
    changelog = changelog_path.read_text(encoding="utf-8")
else:
    changelog = f"{pakku_config['name']} {args.version}"


def api_get(path):
    request = urllib.request.Request(f"{API}{path}", headers={"X-Api-Token": token or ""})
    with urllib.request.urlopen(request) as response:
        return json.loads(response.read().decode("utf-8"))


def game_version_ids():
    mc_versions = pakku_lock.get("mc_versions") or []
    if not mc_versions:
        fail("no mc_versions in pakku-lock.json")
    if args.dry_run and not token:
        return mc_versions
    minecraft_types = {t["id"] for t in api_get("/game/version-types") if t["slug"].startswith("minecraft-")}
    versions = [v for v in api_get("/game/versions") if v["gameVersionTypeID"] in minecraft_types]
    ids = []
    for name in mc_versions:
        matches = [v["id"] for v in versions if v["name"] == name]
        if not matches:
            fail(f"CurseForge does not know Minecraft version {name}")
        ids.append(matches[0])
    return ids


def upload(path, metadata):
    print(f"\nUploading {path.name} ({path.stat().st_size / 1024 / 1024:.1f} MB)")
    print(json.dumps({k: v for k, v in metadata.items() if k != "changelog"}, ensure_ascii=False))
    if args.dry_run:
        return 0
    result = subprocess.run(
        [
            "curl", "--silent", "--show-error", "--fail-with-body",
            "--retry", "3", "--retry-all-errors", "--max-time", "3600",
            "-H", f"X-Api-Token: {token}",
            "-F", f"metadata={json.dumps(metadata, ensure_ascii=False)};type=application/json",
            "-F", f"file=@{path}",
            f"{API}/projects/{project_id}/upload-file",
        ],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        fail(f"upload of {path.name} failed: {result.stdout.strip()} {result.stderr.strip()}")
    file_id = json.loads(result.stdout)["id"]
    print(f"Uploaded, file id {file_id}")
    return file_id


name = pakku_config["name"]
client_id = upload(client_zip, {
    "displayName": f"{name} {args.version}",
    "changelog": changelog,
    "changelogType": "markdown",
    "gameVersions": game_version_ids(),
    "releaseType": args.release_type,
})
upload(server_zip, {
    "displayName": f"{name} {args.version} Server Pack",
    "changelog": changelog,
    "changelogType": "markdown",
    "parentFileID": client_id,
    "releaseType": args.release_type,
})
print("\nDone")
