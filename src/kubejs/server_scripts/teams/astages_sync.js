
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
    let { team } = getTeamData(player)
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
    

    putTeamStoredSet(player.server, TEAM_STAGES_KEY, team, teamStagesSet)
}

function getAllTeamStages(player){
    let { team, teamMembers } = getTeamData(player)

    let teamStagesSet = getTeamStoredSet(player.server, TEAM_STAGES_KEY, team)
    teamMembers.forEach(member => {
        let playerStages = AStages.getStagesFromPlayer(member)
        for (const stage of playerStages) {
            teamStagesSet.add(stage)
        }
    })


    //console.log("BEFORE SYNC: " + teamStagesSet);
    

    return teamStagesSet
}