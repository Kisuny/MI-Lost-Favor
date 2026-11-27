import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

USER_AGENT = "MI-Lost-Favor-CI (https://github.com/Kisuny/MI-Lost-Favor, 1.0)"
ARCHIVE = "serverpack.zip"
REPLACED_DIRS = ["kubejs"]
PRESERVED_FILES = ["server.properties"]
KEEP_MODS = ["SimpleDiscordLink"]
DROPPED_MODS = ["SimpleBackups"]
KEEP_CONFIGS = ["simple-discord-link"]
WARNINGS = [(60, "1 minute"), (30, "30 seconds"), (10, "10 seconds")]


def fail(message):
    print(f"\nERROR: {message}", file=sys.stderr)
    sys.exit(1)


def env(name):
    value = os.environ.get(name, "").strip()
    if not value:
        fail(f"the {name} environment variable is not set")
    return value


PANEL_URL = env("PANEL_URL").rstrip("/")
API_KEY = env("PANEL_API_KEY")
SERVER = env("PANEL_SERVER_ID")


def api(method, path, query=None, body=None, raw=None, timeout=60):
    url = f"{PANEL_URL}/api/client/servers/{SERVER}{path}"
    if query:
        url += "?" + urllib.parse.urlencode(query)
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Accept": "application/json",
        "User-Agent": USER_AGENT,
    }
    data = None
    if body is not None:
        data = json.dumps(body).encode("utf-8")
        headers["Content-Type"] = "application/json"
    elif raw is not None:
        data = raw
        headers["Content-Type"] = "text/plain"
    request = urllib.request.Request(url, data=data, method=method, headers=headers)
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            payload = response.read()
    except urllib.error.HTTPError as error:
        fail(f"{method} {path} returned HTTP {error.code}: {error.read().decode('utf-8', errors='replace')[:1000]}")
    if not payload:
        return None
    text = payload.decode("utf-8", errors="replace")
    if response.headers.get_content_type() == "application/json":
        return json.loads(text)
    return text


def state():
    return api("GET", "/resources")["attributes"]["current_state"]


def list_dir(directory):
    return {item["attributes"]["name"]: item["attributes"] for item in api("GET", "/files/list", {"directory": directory})["data"]}


def wait_for(description, check, timeout, interval=5):
    deadline = time.time() + timeout
    while time.time() < deadline:
        if check():
            return True
        time.sleep(interval)
    print(f"Timed out waiting for {description}")
    return False


def say(message):
    api("POST", "/command", body={"command": f"say {message}"})


def download_archive(url, size):
    if ARCHIVE in list_dir("/"):
        api("POST", "/files/delete", body={"root": "/", "files": [ARCHIVE]})
    print(f"Server is downloading {url}")
    api("POST", "/files/pull", body={"url": url, "directory": "/", "filename": ARCHIVE, "foreground": False})

    def done():
        entry = list_dir("/").get(ARCHIVE)
        current = entry["size"] if entry else 0
        print(f"  {current / 1048576:.0f} / {size / 1048576:.0f} MiB")
        return current == size

    if not wait_for("the archive download", done, timeout=1800, interval=15):
        fail("the server could not download the server pack")


def stop_server(version):
    if state() == "offline":
        print("Server is already offline")
        return
    for index, (seconds, label) in enumerate(WARNINGS):
        say(f"Server restarts in {label} to update to MI:Lost Favor {version}")
        following = WARNINGS[index + 1][0] if index + 1 < len(WARNINGS) else 0
        time.sleep(seconds - following)
    print("Saving the world")
    api("POST", "/command", body={"command": "save-all flush"})
    print("Stopping the server")
    api("POST", "/power", body={"signal": "stop"})
    if not wait_for("the server to stop", lambda: state() == "offline", timeout=1200):
        print("Killing the server")
        api("POST", "/power", body={"signal": "kill"})
        if not wait_for("the server to die", lambda: state() == "offline", timeout=60):
            fail("the server did not stop")


def backup_slots():
    backups = sorted((item["attributes"] for item in api("GET", "/backups")["data"]), key=lambda item: item.get("created_at") or "")
    limit = api("GET", "")["attributes"].get("feature_limits", {}).get("backups")
    unlocked = [item for item in backups if not item.get("is_locked")]
    doomed = unlocked[0] if limit is not None and len(backups) >= limit and unlocked else None
    return backups, limit, doomed


def free_backup_slot():
    backups, limit, doomed = backup_slots()
    if limit is None or len(backups) < limit:
        return
    if limit == 0:
        fail("the panel does not allow backups on this server, use --skip-backup")
    if not doomed:
        fail(f"all {len(backups)} backups are locked and the limit is {limit}, unlock or delete one")
    print(f"Backup limit reached ({len(backups)}/{limit}), deleting the oldest one: {doomed.get('name')} ({doomed.get('created_at')})")
    api("DELETE", f"/backups/{doomed['uuid']}", timeout=300)


def backup(version):
    print("Creating a backup")
    created = api("POST", "/backups", body={"name": f"before {version}"}, timeout=120)["attributes"]
    uuid = created["uuid"]
    result = {}

    def done():
        result.update(api("GET", f"/backups/{uuid}")["attributes"])
        return result.get("completed_at") is not None

    if not wait_for("the backup", done, timeout=3600, interval=20):
        fail("the backup did not finish, the server is left stopped")
    if not result.get("is_successful"):
        fail("the backup failed, the server is left stopped")
    print(f"Backup {uuid} is ready")


def exists(path):
    parent, _, name = path.rpartition("/")
    if parent and parent not in list_dir("/"):
        return False
    return name in list_dir(f"/{parent}")


def kept(directory, name):
    if directory == "mods":
        return any(name.startswith(prefix) for prefix in KEEP_MODS)
    return name in KEEP_CONFIGS


def clean(directory):
    doomed = [name for name in list_dir(f"/{directory}") if not kept(directory, name)]
    if doomed:
        print(f"Removing {len(doomed)} entries from {directory}")
        api("POST", "/files/delete", body={"root": f"/{directory}", "files": doomed}, timeout=300)


def install():
    saved = {path: api("GET", "/files/contents", {"file": f"/{path}"}) for path in PRESERVED_FILES if exists(path)}
    root = list_dir("/")
    for directory in ("mods", "config"):
        if directory in root:
            clean(directory)
    old_dirs = [name for name in REPLACED_DIRS if name in root]
    if old_dirs:
        print(f"Removing {', '.join(old_dirs)}")
        api("POST", "/files/delete", body={"root": "/", "files": old_dirs}, timeout=300)
    print("Unpacking the server pack")
    api("POST", "/files/decompress", body={"root": "/", "file": ARCHIVE}, timeout=1800)
    api("POST", "/files/delete", body={"root": "/", "files": [ARCHIVE]})
    dropped = [name for name in list_dir("/mods") if any(name.startswith(prefix) for prefix in DROPPED_MODS)]
    if dropped:
        print(f"Removing mods not used on this server: {', '.join(dropped)}")
        api("POST", "/files/delete", body={"root": "/mods", "files": dropped})
    for path, content in saved.items():
        print(f"Restoring {path}")
        api("POST", "/files/write", {"file": f"/{path}"}, raw=content.encode("utf-8"))


def announce_update(version):
    webhook = os.environ.get("SERVER_NEWS_WEBHOOK_URL", "").strip()
    if not webhook:
        print("SERVER_NEWS_WEBHOOK_URL is not set, skipped the Discord notification")
        return
    payload = {"content": f"The server has been updated to version {version}", "allowed_mentions": {"parse": []}}
    request = urllib.request.Request(
        f"{webhook}?wait=true",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json", "User-Agent": "DiscordBot (https://github.com/Kisuny/MI-Lost-Favor, 1.0)"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            print(f"Sent the Discord notification, HTTP {response.status}")
    except (urllib.error.HTTPError, urllib.error.URLError) as error:
        print(f"WARNING: the Discord notification failed: {error}")


def check():
    current = state()
    print(f"Server state: {current}")
    if current == "running":
        api("POST", "/command", body={"command": "say [GitHub Actions] deploy check, no changes"})
        print("Sent a test message to the server chat")
    else:
        print("Server is not running, skipped the test message")
    root = list_dir("/")
    print(f"Root: {', '.join(sorted(root))}")
    for directory in ("mods", "config"):
        if directory in root:
            entries = list_dir(f"/{directory}")
            survivors = [name for name in entries if kept(directory, name)]
            print(f"{directory}: {len(entries)} entries, kept on update: {', '.join(survivors) or 'none'}")
    for path in PRESERVED_FILES:
        print(f"{path}: {'will be restored after unpacking' if exists(path) else 'missing, the pack version will be used'}")
    backups, limit, doomed = backup_slots()
    print(f"Backups: {len(backups)}, limit: {limit if limit is not None else '?'}")
    for item in backups:
        marks = ("  [locked]" if item.get("is_locked") else "") + ("  [deleted on update]" if item is doomed else "")
        print(f"  {item.get('created_at')}  {item.get('name')}{marks}")
    if limit is not None and len(backups) >= limit and not doomed:
        print("WARNING: no backup can be deleted to make room, the update will fail")


parser = argparse.ArgumentParser()
parser.add_argument("--check", action="store_true", help="only read the server state and send a test chat message")
parser.add_argument("--version")
parser.add_argument("--url", help="server pack download URL")
parser.add_argument("--size", type=int, help="server pack size in bytes")
parser.add_argument("--skip-backup", action="store_true")
args = parser.parse_args()

if args.check:
    check()
    sys.exit(0)
if not (args.version and args.url and args.size):
    fail("--version, --url and --size are required")

if not args.skip_backup:
    free_backup_slot()
download_archive(args.url, args.size)
stop_server(args.version)
if not args.skip_backup:
    backup(args.version)
install()
print("Starting the server")
api("POST", "/power", body={"signal": "start"})
if not wait_for("the server to start", lambda: state() == "running", timeout=900, interval=15):
    fail("the server did not reach the running state, check the console")
print("Server is running")
announce_update(args.version)
