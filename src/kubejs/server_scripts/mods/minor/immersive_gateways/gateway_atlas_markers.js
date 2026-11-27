let lastPlayerPos = {}


function getGatewayPair(level, pos) {
    let portals = $IGPortalDataManager.getState(level)
    let pair = null

    for (let x = -2; x <= 2; x++) {
        for (let y = -2; y <= 2; y++) {
            for (let z = -2; z <= 2; z++) {
                pair = portals.search(pos.offset(x, y, z))
                if (pair) return pair
            }
        }
    }

    return null
}


function markGateways(player, pair) {

    let first = pair.first().boundingBox().getCenter()
    let second = pair.second().boundingBox().getCenter()

    let hash = Math.imul(first.getX() + second.getX() * 31, 0x9E3779B1) ^ Math.imul(first.getZ() + second.getZ() * 31, 0x85EBCA6B)
    let color = (hash & 0x7F7F7F) + 0x606060

    // console.log(first, second)

    let marker = (pos, exit) => {
        player.sendData("milf_add_marker", {
            pos: {
                x: pos.getX(),
                y: pos.getY(),
                z: pos.getZ()
            },
            dimension: String(player.level.dimension),
            name: "milf.atlas.gateway",
            note: "milf.atlas.gateway.exit",
            noteArgs: [`${ exit.getX() } ${ exit.getY() } ${ exit.getZ() }`],
            translateNote: true,
            icon: "embersatlas:portal",
            color: color,
            group: "Gateways"
        })
    }

    marker(first, second)
    marker(second, first)
}


PlayerEvents.tick(event => {

    let player = event.player
    let uuid = String(player.uuid)
    let pos = player.blockPosition()
    let dimension = String(player.level.dimension)

    let last = lastPlayerPos[uuid]
    lastPlayerPos[uuid] = { pos: pos, dimension: dimension }

    if (!last || last.dimension != dimension) return
    if (last.pos.distManhattan(pos) < 16) return

    // console.log("jump", pos)

    let pair = getGatewayPair(player.level, last.pos)

    // console.log(pair)

    if (!pair) return

    let target = pair.getTarget(last.pos).boundingBox().getCenter()

    // console.log("dist", target.distManhattan(pos))

    if (target.distManhattan(pos) > 64) return

    markGateways(player, pair)
    milfPlaySoundForPlayer(player, "enchanted:chalk_write")
})


PlayerEvents.loggedOut(event => {
    delete lastPlayerPos[String(event.player.uuid)]
})
