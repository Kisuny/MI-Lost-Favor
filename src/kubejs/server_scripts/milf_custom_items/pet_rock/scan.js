function getAllPossibleDeposits(name){
    return new $HashSet([name, name + "_vertical"])
}

const ORE_NAME_TO_DEPOSIT_NAME_MAP = {
    bauxite: "aluminum",
    ancient_debris: "nether_gold"
}

function getDepositNameFor(itemName){
    return ORE_NAME_TO_DEPOSIT_NAME_MAP[itemName] ?? itemName
}

const ORE_ID_TO_DEPOSIT_NAMES = Object.fromEntries(
    global.oresWithSamples.map(({itemName, oreData}) => [
        oreData.displayItem, getAllPossibleDeposits(getDepositNameFor(itemName))
    ])
)

function collectDepositNames(oreId, collector){
    collector.addAll(ORE_ID_TO_DEPOSIT_NAMES[oreId])
}

NetworkEvents.dataReceived("milf_pet_rock_deposits_to_scan", event => {
    if (event.level.isClientSide()) return false
    let item = event.player.getMainHandItem()
    //if (event.player.cooldowns.isOnCooldown(item)) return

    let { player, data } = event

    const scanRadius = data.getInt("scan_radius") || 500
    const scanDuration = data.getInt("scan_duration") || 600

    let oresToScan = data.getList("oresToScan", $Tag.TAG_STRING)

    let depositToOreMap = new $HashMap()
    let scanndedOresMap = new $HashMap()
    let oresSet = new $HashSet()
    for (let i = 0; i < oresToScan.size(); i++){

        let oreId = oresToScan.getString(i)
        collectDepositNames(oreId, oresSet)

        for (let depositName of ORE_ID_TO_DEPOSIT_NAMES[oreId]){
            depositToOreMap.put(depositName, oreId)
        }

        scanndedOresMap.put(oreId, new $ListTag())

    }

    let worldTargets = $WorldTargets.get(event.level)
    let playerBlockPos = player.blockPosition()
    let genResultMap = worldTargets.generated()
    let blockPosTag = new $ListTag()
    
    let filteredMap = genResultMap.entrySet().stream().filter(entry => {
        return oresSet.contains(entry.getValue().name) && entry.getKey().closerThan(playerBlockPos, scanRadius)
    }).forEach(entry => {
        scanndedOresMap.get(depositToOreMap.get(entry.getValue().name)).add($NbtUtils.writeBlockPos(entry.getKey()))
    })

    let posData = new $CompoundTag()
    scanndedOresMap.forEach((oreId, listTag) => {
        posData.put(oreId, listTag)
    })

    let dataToSend = new $CompoundTag()
    dataToSend.put("depositPositions", posData)
    dataToSend.putInt("scan_duration", scanDuration)
    dataToSend.putInt("scan_radius", scanRadius)

    event.player.sendData("milf_pet_rock_deposits_scan", dataToSend)
})
