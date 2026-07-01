let $AdvancementProgressEvent = Java.loadClass("net.neoforged.neoforge.event.entity.player.AdvancementEvent$AdvancementProgressEvent")
let $AdvancementEarnEvent = Java.loadClass("net.neoforged.neoforge.event.entity.player.AdvancementEvent$AdvancementEarnEvent")

// ItemEvents.firstRightClicked("modern_industrialization:steel_rod", event => {
//     if (event.hand == "OFF_HAND") return false
//     if (event.level.isClientSide()) return false

//     let player = event.getPlayer()

//     syncTeamAdvancements(player)
    
    
// })

PlayerEvents.loggedIn(event => {
    syncTeamAdvancements(event.getPlayer())
})

PlayerEvents.loggedOut(event => {
    syncTeamAdvancements(event.getPlayer())
})

const TEAM_ADVANCEMENTS_KEY = "milf_team_advancements"
const MODS_TO_SYNC_ADVANCEMENTS = ["spectrum", "apotheosis"]

NativeEvents.onEvent($AdvancementProgressEvent, event => {

    if (event.getProgressType() == $AdvancementProgressEvent.ProgressType.REVOKE) return

    /**@type {import("net.minecraft.advancements.AdvancementHolder").$AdvancementHolder$$Original}*/ let advancementHolder = event.getAdvancement()
    let modId = advancementHolder.id().getNamespace()

    if (!MODS_TO_SYNC_ADVANCEMENTS.includes(modId)) return

    let criterion = event.getCriterionName()
    let { teamMembers } = getTeamData(event.getEntity())

    teamMembers.forEach(member => {
        let memberAdvancements = member.getAdvancements()
        memberAdvancements.award(advancementHolder, criterion)

        //console.log("FROM MEMBER: " + advancementHolder + " --- " + criterion);
        
    })    

})

NativeEvents.onEvent($AdvancementEarnEvent, event => {

    /**@type {import("net.minecraft.advancements.AdvancementHolder").$AdvancementHolder$$Original}*/ let advancementHolder = event.getAdvancement()
    let modId = advancementHolder.id().getNamespace()

    if (!MODS_TO_SYNC_ADVANCEMENTS.includes(modId)) return

    let { teamMembers } = getTeamData(event.getEntity())

    teamMembers.forEach(member => {
        let memberAdvancements = member.getAdvancements()

        memberAdvancements.getOrStartProgress(advancementHolder).getRemainingCriteria().forEach(criterion => {
            memberAdvancements.award(advancementHolder, criterion)
            //console.log("REMAINING: " + advancementHolder + " ---> " + criterion)
        })

    })

})


function syncTeamAdvancements(/**@type {import("net.minecraft.server.level.ServerPlayer").$ServerPlayer$$Original}*/  player) {
    let manager = player.getServer().getAdvancements()
    let { team } = getTeamData(player)
    //if (team.isPlayerTeam()) return
    let teamAdvancementsSet = getTeamAdvancements(player)
    let playerAdvancements = player.getAdvancements()

    /** @type {import("java.util.HashSet").$HashSet$$Original<StringJS>} */
    let playerAdvancementsSet = new $HashSet()
    for (const advancementHolder of manager.getAllAdvancements()) {
        let progress = playerAdvancements.getOrStartProgress(advancementHolder)
        if (progress.isDone()) {
            let id = advancementHolder.id()
            if (MODS_TO_SYNC_ADVANCEMENTS.includes(id.getNamespace())) {
                playerAdvancementsSet.add(id.toString())
            }
        }
    }

    for (const advancementId of teamAdvancementsSet) {
        if (!playerAdvancementsSet.contains(advancementId)) {

            let advHoler = manager.get($ResourceLocation.parse(advancementId))

            if (advHoler != null){
                playerAdvancements.getOrStartProgress(advHoler).getRemainingCriteria().forEach(criterion =>{
                    playerAdvancements.award(advHoler, criterion)
                })
            }
        }
    }

    team.getExtraData().putString(TEAM_ADVANCEMENTS_KEY, $String["join(java.lang.CharSequence,java.lang.Iterable)"](",", teamAdvancementsSet))
    team.markDirty()
}



function getTeamAdvancements(/**@type {import("net.minecraft.server.level.ServerPlayer").$ServerPlayer$$Original}*/ player){
    let manager = player.getServer().getAdvancements()

    let { team, teamMembers } = getTeamData(player)

    /** @type {import("java.util.HashSet").$HashSet$$Original<StringJS>} */
    let teamAdvancementsSet = new $HashSet()
    for (const advancementHolder of manager.getAllAdvancements()) {
        teamMembers.forEach(member => {
            let progress = member.getAdvancements().getOrStartProgress(advancementHolder)
            if (progress.isDone()) {
                let name = advancementHolder.value().name()
                let id = advancementHolder.id()
                if (MODS_TO_SYNC_ADVANCEMENTS.includes(id.getNamespace()) ) {
                    teamAdvancementsSet.add(id.toString())

                }
            }
        })
    }

    let data = team.getExtraData().getString(TEAM_ADVANCEMENTS_KEY)
    let storedTeamAdvancements = data.split(",")    

    if (storedTeamAdvancements.length != 0) {

        for (const advancementId of storedTeamAdvancements) {
            if (advancementId.length() == 0) continue
            teamAdvancementsSet.add(advancementId)
        }

    }

    return teamAdvancementsSet
}

