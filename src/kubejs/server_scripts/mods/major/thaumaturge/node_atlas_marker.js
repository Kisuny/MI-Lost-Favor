let scannedNodes = {}


function knowsNode(player, level, blockPos) {
    return $PlayerResearchAccess.of(player).knows($ScanNode.researchKey(level, blockPos))
}

function sendNodeMarker(player, level, blockPos) {

    let node = level.getBlockEntity(blockPos)
    if (!node) return false

    let aspects = []
    node.getAspects().entries().forEach(entry => {
        aspects.push({
            name: String(entry.aspect().getRegisteredName()).split(":")[1].capitalize(),
            amount: entry.amount(),
            color: entry.aspect().value().color()
        })
    })
    if (aspects.length == 0) return false
    aspects.sort((a, b) => b.amount - a.amount)

    let typeKey = `milf.atlas.node.type.${node.getNodeType().getSerializedName()}`
    let modifier = node.getNodeModifier()

    let data = {
        pos: {
            x: blockPos.getX(),
            y: blockPos.getY(),
            z: blockPos.getZ()
        },
        dimension: String(level.dimension),
        name: typeKey,
        note: aspects.map(aspect => {
            let hex = aspect.color.toString(16).padStart(6, "0")
            return `<grad colors=#${hex},#${hex}>${aspect.name}</grad> ${aspect.amount}`
        }).join(", "),
        icon: "embersatlas:sparkles",
        color: aspects[0].color,
        group: "Nodes"
    }

    if (modifier) {
        data.name = "milf.atlas.node.modified"
        data.nameArgs = [typeKey, `milf.atlas.node.modifier.${modifier.getSerializedName()}`]
    }

    player.sendData("milf_add_marker", data)

    return true
}


BlockEvents.rightClicked("thaumaturge:node", event => {

    let player = event.player
    let blockPos = event.block.pos

    if (String(event.hand) != "MAIN_HAND") return
    if (player.mainHandItem.id == "thaumaturge:thaumometer") return
    if (!$GogglesAccess.wearsRevealingGear(player)) return

    if (!knowsNode(player, event.level, blockPos)) {
        player.setStatusMessage(Text.translatable("milf.atlas.node.unknown"))
        return
    }

    if (sendNodeMarker(player, event.level, blockPos)) {
        milfPlaySound(event, "enchanted:chalk_write")
    }
})


PlayerEvents.tick(event => {

    let player = event.player
    let level = player.level
    let uuid = String(player.uuid)

    let isScanning = player.isUsingItem() && player.getUseItem().id == "thaumaturge:thaumometer"
    let target = isScanning ? $ThaumometerItem.resolveTarget(level, player) : null

    if (target instanceof $ScannedBlock &&
        level.getBlockState(target.pos()).block.id == "thaumaturge:node" &&
        !knowsNode(player, level, target.pos())) {
        scannedNodes[uuid] = { pos: target.pos(), dimension: String(level.dimension), idleTicks: 0 }
    }

    let scan = scannedNodes[uuid]
    if (!scan) return

    if (String(level.dimension) != scan.dimension) {
        delete scannedNodes[uuid]
        return
    }

    if (knowsNode(player, level, scan.pos)) {
        delete scannedNodes[uuid]
        if (sendNodeMarker(player, level, scan.pos)) {
            milfPlaySoundForPlayer(player, "enchanted:chalk_write")
        }
        return
    }

    scan.idleTicks = isScanning ? 0 : scan.idleTicks + 1
    if (scan.idleTicks > 40) delete scannedNodes[uuid]
})
