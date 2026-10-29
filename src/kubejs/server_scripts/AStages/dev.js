let $MiscStorage = Java.loadClass("com.alessandro.astages.engine.server.MiscStorage")

ItemEvents.firstRightClicked("milf:nbt_pen", event => {
    let {player} = event
    if (player.getOffHandItem().id != "milf:dev_pen") return

    let stages = $MiscStorage.ALL_STAGES

    stages.forEach(stage => {
        if(AStages.playerHasStage(stage, player)) return
        AStages.addStageToPlayer(stage, player)
    })

    console.log(stages);
    
})