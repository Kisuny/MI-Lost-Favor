
const TEAM_STAGES_KEY = "milf_team_stages"

PlayerEvents.loggedIn(event => {
    //console.log("LOGGED IN");
    syncTeamStages(event.getPlayer())
})

PlayerEvents.loggedOut(event =>{
    //console.log("LOGGED OUT");
    //syncTeamStages(event.getPlayer())
})

function syncTeamStages(player){
    let teamManager = $FTBTeamsAPI.getManager()
    let team = teamManager.getTeamForPlayer(player).get()
    //if (team.isPlayerTeam()) return
    let teamStagesSet = getAllTeamStages(player)

    let playerStagesSet = new $HashSet()
    let playerStagesList = AStages.getStagesFromPlayer(player)

    //console.log("STAGES", playerStagesList)

    for (const stage of playerStagesList) {
        playerStagesSet.add(stage)
    }

    //console.log("PLAYER STAGES BEFORE SYNC: " + playerStagesSet);

    for (const stage of teamStagesSet) {
        if (!playerStagesSet.contains(stage)) {
            AStages.addStageToPlayer(stage, player)
            //console.log("NEW STAGE FROM TEAM: " + stage)
            
        }
    }

    //console.log("PLAYER STAGES AFTER SYNC: " + teamStagesSet);
    

    team.getExtraData().putString(TEAM_STAGES_KEY, $String["join(java.lang.CharSequence,java.lang.Iterable)"](",", teamStagesSet))
    team.markDirty()
}

function getAllTeamStages(player){
    let teamManager = $FTBTeamsAPI.getManager()
    let team = teamManager.getTeamForPlayer(player).get()
    let teamMembers = team.getOnlineMembers()

    let teamStagesSet = new $HashSet()
    teamMembers.forEach(member => {
        let playerStages = AStages.getStagesFromPlayer(member)
        for (const stage of playerStages) {
            teamStagesSet.add(stage)
        }
    })


    let data = team.getExtraData().getString(TEAM_STAGES_KEY)
    let storedTeamStages = data.split(",")
    if (storedTeamStages.length != 0) {

        for (const stage of storedTeamStages) {
            if (stage.length() == 0) continue
            teamStagesSet.add(stage)
            //console.log("STORED STAGE:" + stage)
            
        }

    }

    //console.log("BEFORE SYNC: " + teamStagesSet);
    

    return teamStagesSet
}