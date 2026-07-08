BlockEvents.modification(event => {
  event.modify('minecraft:spawner', block => {
    block.destroySpeed = 50.0

  })
})