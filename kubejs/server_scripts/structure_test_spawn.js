// /spawnrandom - 10 random structures from all mods
// /spawnrandom 20 - 20 random structures from all mods
// /spawnrandom 15 minecraft - 15 random vanilla structures
ServerEvents.commandRegistry((event) => {
    const { commands: Commands, arguments: Arguments } = event

    function spawnRandom(ctx, count, namespace) {
        const source = ctx.source
        const level = source.getLevel()
        const server = source.getServer()

        const structureRegistry = level.registryAccess().registryOrThrow($Registries.STRUCTURE)

        const ids = []
        for (let id of structureRegistry.keySet()) {
            if (namespace && id.getNamespace() !== namespace) continue
            ids.push(id)
        }

        for (let i = ids.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let tmp = ids[i]
            ids[i] = ids[j]
            ids[j] = tmp
        }

        const picked = ids.slice(0, Math.min(count, ids.length))

        const spacing = 60
        const perRow = 5
        const originX = Math.floor(source.getPosition().x)
        const originZ = Math.floor(source.getPosition().z)
        const y = 100

        picked.forEach((id, i) => {
            const x = originX + (i % perRow) * spacing
            const z = originZ + Math.floor(i / perRow) * spacing
            const cmd = `place structure ${id} ${x} ${y} ${z}`
            server.getCommands().performPrefixedCommand(source, cmd)
        })

        source.sendSuccess(() => $Component.literal(`[milf] Placed ${picked.length} random structures`), true)

        return picked.length
    }

    event.register(
        Commands.literal('spawnrandom')
            .requires(src => src.hasPermission(2))
            .executes((ctx) => spawnRandom(ctx, 10, null))
            .then(
                Commands.argument('count', Arguments.INTEGER.create(event))
                    .executes((ctx) => spawnRandom(ctx, Arguments.INTEGER.getResult(ctx, 'count'), null))
                    .then(
                        Commands.argument('namespace', Arguments.STRING.create(event))
                            .executes((ctx) => spawnRandom(
                                ctx,
                                Arguments.INTEGER.getResult(ctx, 'count'),
                                Arguments.STRING.getResult(ctx, 'namespace')
                            ))
                    )
            )
    )
})
