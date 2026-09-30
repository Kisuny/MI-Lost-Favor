// Command: /getlangvalue <key>
// Returns the translation string for the given lang key with a [Copy] button.

ServerEvents.commandRegistry(event => {
  const { commands: Commands, arguments: Arguments } = event

  // sendImmersiveMessage test command
  // Examples:
  // /milf test_immersive milf.crimson_veil.enter
  // /milf test_immersive milf.crimson_veil.enter warn
  // /milf test_immersive milf.crimson_veil.enter milestone {"drip":true,"col":"740707"}
  const STYLE_PRESETS = {
    milestone: DEFAULT_MILESTONE_NOTIFICATION_STYLE,
    warn: DEFAULT_WARN_NOTIFICATION_STYLE,
    chunk_claim: DEFAULT_CHUNK_CLAIM_NOTIFICATION_STYLE,
    new_age: DEFAULT_NEW_AGE_NOTIFICATION_STYLE,
    center: DEFAULT_CENTER_MESSAGE_STYLE(3),
  }

  event.register(
    Commands.literal('milf')
      .requires(src => src.hasPermission(2))
      .then(
        Commands.literal('test_immersive')
          .then(
            Commands.argument('key', Arguments.STRING.create(event))
              .executes(ctx => {
                const player = ctx.source.player
                const server = ctx.source.server
                const key = Arguments.STRING.getResult(ctx, 'key')
                sendImmersiveMessage(Text.translatable(key), player, DEFAULT_MILESTONE_NOTIFICATION_STYLE, server)
                return 1
              })
              .then(
                Commands.argument('style', Arguments.STRING.create(event))
                  .suggests((ctx, builder) => {
                    Object.keys(STYLE_PRESETS).forEach(s => builder.suggest(s))
                    return builder.buildFuture()
                  })
                  .executes(ctx => {
                    const player = ctx.source.player
                    const server = ctx.source.server
                    const key = Arguments.STRING.getResult(ctx, 'key')
                    const style = STYLE_PRESETS[Arguments.STRING.getResult(ctx, 'style')] || DEFAULT_MILESTONE_NOTIFICATION_STYLE
                    sendImmersiveMessage(Text.translatable(key), player, style, server)
                    return 1
                  })
                  .then(
                    Commands.argument('args', Arguments.GREEDY_STRING.create(event))
                      .executes(ctx => {
                        const player = ctx.source.player
                        const server = ctx.source.server
                        const key = Arguments.STRING.getResult(ctx, 'key')
                        const style = STYLE_PRESETS[Arguments.STRING.getResult(ctx, 'style')] || DEFAULT_MILESTONE_NOTIFICATION_STYLE
                        const extraArgs = JSON.parse(Arguments.GREEDY_STRING.getResult(ctx, 'args'))
                        sendImmersiveMessage(Text.translatable(key), player, Object.assign({}, style, extraArgs), server)
                        return 1
                      })
                  )
              )
          )
      )
  )

  event.register(
    Commands.literal('getlangvalue')
      .requires(src => src.hasPermission(2))
      .then(
        Commands.argument('key', Arguments.STRING.create(event))
          .executes(getLangValue)
      )
  )

  function getLangValue(ctx) {
    const key = Arguments.STRING.getResult(ctx, 'key')
    const source = ctx.source
    const player = source.player

    const translated = Text.translate(key)

    player.tell([
      Text.gray('[lang] '),
      Text.green(key).clickCopy(key).hover('Click to copy Key'),
      Text.gray(' = '),
      translated,
      Text.gray(' | '),
      Text.darkAqua('[Copy value]').clickCopy(translated.getString()).hover('Click to copy value'),
    ])

    return 1
  }
})
