function getClaimAt(level, blockPos) {
    return $EmbersServerClaims.at(level, new $ChunkPos(blockPos))
}

function getClaimTeam(server, claim) {
    return $EmbersTeamStore.get(server).get(claim.team())
}

function getClaimTeamName(server, claim) {
    let team = getClaimTeam(server, claim)
    return team ? team.name() : "?"
}

function getClaimTeamColor(server, claim) {
    let team = getClaimTeam(server, claim)
    return team ? team.color() & 0xFFFFFF : 0xFFFFFF
}

function isOwnClaim(player, claim) {
    return claim.team().equals($EmbersServerTeams.teamOf(player).id())
}

function isFriendlyClaim(player, claim) {
    let playerTeamId = $EmbersServerTeams.teamOf(player).id()
    if (claim.team().equals(playerTeamId)) return true
    let claimTeam = getClaimTeam(player.server, claim)
    if (!claimTeam) return false
    return claimTeam.allies().contains(playerTeamId) || claimTeam.trusted().contains(player.uuid)
}
