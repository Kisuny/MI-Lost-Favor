NativeEvents.onEvent($EntityJoinLevelEvent, event => {
    let level = event.getLevel()
    if (level.isClientSide()) return

    let entity = event.getEntity()

    if (!(entity instanceof $DeerEntity)) return

    //console.log(entity.goalSelector.getAvailableGoals())

    entity.goalSelector.getAvailableGoals().forEach(wrappedGoal => {
        if (!wrappedGoal) return
        let goal = wrappedGoal.getGoal()

        if (goal instanceof $AvoidEntityGoal){
            entity.goalSelector.removeGoal(goal)
        }
    })

})