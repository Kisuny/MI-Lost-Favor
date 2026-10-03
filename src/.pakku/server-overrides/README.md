# MI:Lost Favor - Server Pack

## Requirements

- **Java 21 or newer** (check with `java -version`).
- Enough RAM: the default is 8 GB for the server, so the machine should have at least 9-10 GB.

## First start

1. Extract the server pack into an empty folder.
2. Run `start.bat` (Windows) or `start.sh` (Linux/macOS).
   - On Linux/macOS use `bash start.sh`, or run `chmod +x start.sh` first.
3. On the first run the script downloads and installs NeoForge, then starts the server.
4. Accept the Minecraft EULA when the server asks for it.
   If the server stops instead, open `eula.txt`, set `eula=true`, and start it again.

The first start takes a while because the world is generated and all mods are loaded.

## JVM args

Memory and other JVM settings are in `user_jvm_args.txt`. Change `-Xms` and `-Xmx` together
(keep them equal) and leave 1-1.5 GB of the machine's RAM free for the operating system.
The rest of the file contains Aikar's G1GC flags; leave them as they are unless you know why you want to change them.

On Linux, run the script inside `screen` or `tmux` if you want it to keep running after you disconnect.

## Updating to a new pack version

1. Stop the server with `/stop`.
2. **Back up the whole server folder**, especially the world.
3. Download the new server pack and extract it to a separate folder.
4. In your server folder, **delete the old `mods`, `config` and `kubejs` folders**.
   Old mod files must not stay next to the new ones: duplicate or mismatched mods will stop the server from starting.
5. Copy the new `mods`, `config` and `kubejs` folders, `start.bat` and `start.sh` from the new pack into your server folder.
6. Start the server. If the NeoForge version has changed, the script installs the new one automatically.

Note: copying the new `config` folder overwrites any config changes you made yourself.
Write them down before updating and reapply them afterwards.
