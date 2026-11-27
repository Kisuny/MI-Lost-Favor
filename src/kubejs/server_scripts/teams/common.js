function getTeamData(player){
    let team = $EmbersServerTeams.teamOf(player)
    let playerList = player.server.getPlayerList()
    /**@type {import("net.minecraft.server.level.ServerPlayer").$ServerPlayer$$Original[]}*/ let teamMembers = []
    let hasSelf = false
    team.memberIds().forEach(uuid => {
        let member = playerList.getPlayer(uuid)
        if (!member) return
        if (member.uuid.equals(player.uuid)) hasSelf = true
        teamMembers.push(member)
    })
    if (!hasSelf) teamMembers.push(player)
    return { team: team, teamMembers: teamMembers }
}

function getTeamStoredSet(server, key, team) {
    let set = new $HashSet()
    server.persistentData.getList(`${key}.${team.id()}`, 8).forEach(tag => set.add(tag.getAsString()))
    return set
}

function putTeamStoredSet(server, key, team, set) {
    let list = new $ListTag()
    set.forEach(value => list.add($StringTag.valueOf(value)))
    server.persistentData.put(`${key}.${team.id()}`, list)
}