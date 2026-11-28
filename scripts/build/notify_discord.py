import argparse
import json
import os
import random
import sys
import urllib.error
import urllib.request
from pathlib import Path

SETTINGS = json.loads((Path(__file__).resolve().parent / "build_settings.json").read_text(encoding="utf-8"))
SUPPRESS_EMBEDS = 1 << 2
USER_AGENT = "MI-Lost-Favor-CI (https://github.com/MI-Lost-Favor-Team/MI-Lost-Favor, 1.0)"
APPROVED = {4: "Approved", 10: "Released"}
REJECTED = {2: "ChangesRequired", 5: "Rejected", 6: "MalwareDetected", 7: "Deleted", 15: "FailedPublishing"}


def fail(message):
    print(f"\nERROR: {message}", file=sys.stderr)
    sys.exit(1)


def set_output(sent):
    github_output = os.environ.get("GITHUB_OUTPUT")
    if github_output:
        with open(github_output, "a", encoding="utf-8") as output:
            output.write(f"sent={'true' if sent else 'false'}\n")


parser = argparse.ArgumentParser()
parser.add_argument("--version", required=True)
parser.add_argument("--file-id", required=True, help="CurseForge file id of the client pack")
parser.add_argument("--server-pack-url", required=True)
parser.add_argument("--changelog-url", required=True)
parser.add_argument("--require-approved", action="store_true", help="send only if CurseForge has approved the file")
parser.add_argument("--dry-run", action="store_true", help="print the message without sending it")
args = parser.parse_args()


def file_is_approved():
    api_key = os.environ.get("CURSEFORGE_API_KEY")
    if not api_key:
        fail("the CURSEFORGE_API_KEY environment variable is not set")
    project_id = SETTINGS["curseforge_project_id"]
    request = urllib.request.Request(
        f"https://api.curseforge.com/v1/mods/{project_id}/files/{args.file_id}",
        headers={"x-api-key": api_key, "Accept": "application/json", "User-Agent": USER_AGENT},
    )
    try:
        with urllib.request.urlopen(request) as response:
            data = json.loads(response.read().decode("utf-8"))["data"]
    except urllib.error.HTTPError as error:
        if error.code == 404:
            print(f"File {args.file_id} is not visible yet (HTTP 404)")
            return False
        fail(f"CurseForge returned HTTP {error.code}: {error.read().decode('utf-8', errors='replace')}")
    status = data.get("fileStatus")
    if status in REJECTED:
        fail(f"file {args.file_id} was not approved: {REJECTED[status]} ({status})")
    approved = status in APPROVED and data.get("isAvailable", True)
    print(f"File {args.file_id} status: {APPROVED.get(status, status)}, available: {data.get('isAvailable')}")
    return approved


if args.require_approved and not file_is_approved():
    print("Not approved yet, nothing sent")
    set_output(False)
    sys.exit(0)

discord = SETTINGS["discord"]
file_url = f"https://www.curseforge.com/minecraft/modpacks/{SETTINGS['curseforge_slug']}/files/{args.file_id}"
lines = [
    f"{SETTINGS['manifest_name']} [{args.version}](<{file_url}>) is out {random.choice(discord['emojis'])}",
    "",
    f"[Serverpack](<{args.server_pack_url}>)",
    f"[Changelog](<{args.changelog_url}>)",
]
role_id = discord.get("ping_role_id")
if role_id:
    lines.append(f"<@&{role_id}>")
payload = {
    "content": "\n".join(lines),
    "flags": SUPPRESS_EMBEDS,
    "allowed_mentions": {"parse": [], "roles": [str(role_id)] if role_id else []},
}

print(payload["content"])
if args.dry_run:
    sys.exit(0)

webhook = os.environ.get("DISCORD_WEBHOOK_URL")
if not webhook:
    fail("the DISCORD_WEBHOOK_URL environment variable is not set")

request = urllib.request.Request(
    f"{webhook}?wait=true",
    data=json.dumps(payload).encode("utf-8"),
    headers={"Content-Type": "application/json", "User-Agent": "DiscordBot (https://github.com/MI-Lost-Favor-Team/MI-Lost-Favor, 1.0)"},
    method="POST",
)
try:
    with urllib.request.urlopen(request) as response:
        print(f"\nSent, HTTP {response.status}")
except urllib.error.HTTPError as error:
    fail(f"Discord returned HTTP {error.code}: {error.read().decode('utf-8', errors='replace')}")
set_output(True)
