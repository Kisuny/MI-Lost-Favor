import shutil
import sys
from pathlib import Path

EXCLUDE = ["SimpleDiscordLink"]

root = Path(__file__).resolve().parent.parent
source = root / "server_mods"
target = root / "src" / ".pakku" / "server-overrides"

if not source.is_dir():
    sys.exit(f"{source} does not exist")

target_mods = target / "mods"
target_config = target / "config"
for folder in (target_mods, target_config):
    if folder.exists():
        shutil.rmtree(folder)

copied = []
skipped = []
for jar in sorted(source.glob("*.jar")):
    if any(jar.name.startswith(prefix) for prefix in EXCLUDE):
        skipped.append(jar.name)
        continue
    target_mods.mkdir(parents=True, exist_ok=True)
    shutil.copy2(jar, target_mods / jar.name)
    copied.append(jar.name)

if (source / "config").is_dir():
    shutil.copytree(source / "config", target_config)

print("Staged mods:", ", ".join(copied) or "none")
print("Skipped mods:", ", ".join(skipped) or "none")
print("Staged config:", "yes" if target_config.exists() else "no")
