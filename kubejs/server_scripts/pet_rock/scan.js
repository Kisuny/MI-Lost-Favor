let $WorldTargets = Java.loadClass("com.endertech.minecraft.mods.adlods.world.WorldTargets")
let $Collectors = Java.loadClass("java.util.stream.Collectors")
let $NbtUtils = Java.loadClass("net.minecraft.nbt.NbtUtils")
let $Tag = Java.loadClass("net.minecraft.nbt.Tag")

function getAllPossibleDeposits(name){
    return new $HashSet([name, name + "_vertical"])
}

const ORE_ID_TO_DEPOSIT_NAMES = {
    "modern_industrialization:raw_tin": getAllPossibleDeposits("tin"),
    "minecraft:raw_copper": getAllPossibleDeposits("copper"),
    "minecraft:raw_iron": getAllPossibleDeposits("iron"),
    "minecraft:raw_gold": getAllPossibleDeposits("gold"),
    "minecraft:coal": getAllPossibleDeposits("coal"),
    "modern_industrialization:raw_lead":getAllPossibleDeposits("lead"),

    "minecraft:emerald": getAllPossibleDeposits("emerald"),
    "minecraft:redstone": getAllPossibleDeposits("redstone"),
    "minecraft:diamond": getAllPossibleDeposits("diamond"),
    "minecraft:lapis_lazuli": getAllPossibleDeposits("lapis"),
    "minecraft:quartz": getAllPossibleDeposits("quartz"),

    "modern_industrialization:bauxite_dust": getAllPossibleDeposits("aluminum"),
    "modern_industrialization:raw_nickel": getAllPossibleDeposits("nickel"),
    "minecraft:netherite_scrap":getAllPossibleDeposits("nether_gold"),
    "modern_industrialization:salt_dust":getAllPossibleDeposits("salt"),
    "modern_industrialization:raw_antimony":getAllPossibleDeposits("antimony"),

    "modern_industrialization:raw_uranium":getAllPossibleDeposits("uranium"),
    "modern_industrialization:raw_tungsten":getAllPossibleDeposits("tungsten"),
    "modern_industrialization:raw_titanium":getAllPossibleDeposits("titanium"),
    "modern_industrialization:raw_platinum":getAllPossibleDeposits("platinum"),
    "modern_industrialization:monazite_dust":getAllPossibleDeposits("monazite")
}

function collectDepositNames(oreId, collector){
    collector.addAll(ORE_ID_TO_DEPOSIT_NAMES[oreId])
}

NetworkEvents.dataReceived("milf_pet_rock_deposits_to_scan", event => {
    //if (event.hand == "OFF_HAND") return false
    if (event.level.isClientSide()) return false
    let item = event.player.getMainHandItem()
    if (event.player.cooldowns.isOnCooldown(item)) return


    let { player, data } = event

    let oresToScan = data.getList("oresToScan", $Tag.TAG_STRING)
    let depositToOreMap = new $HashMap()
    let scanndedOresMap = new $HashMap()
    //let oresArray = []
    let oresSet = new $HashSet()
    for (let i = 0; i < oresToScan.size(); i++){
        let oreId = oresToScan.getString(i)
        //oresArray.push()
        collectDepositNames(oreId, oresSet)

        for (let depositName of ORE_ID_TO_DEPOSIT_NAMES[oreId]){
            depositToOreMap.put(depositName, oreId)
        }

        scanndedOresMap.put(oreId, new $ListTag())

    }

    //console.log(depositToOreMap);
    

    //console.log(oresSet);
    

    //console.log(oresArray);
    

    //sendImmersiveMessageWithSubtext(Text.translate('milf.stage.something_changed'), Text.translate(`milf.stage.test`), player, DEFAULT_MILESTONE_NOTIFICATION_STYLE, DEFAULT_MILESTONE_SUBTEXT_STYLE, event.server)


    let worldTargets = $WorldTargets.get(event.level)
    let playerBlockPos = player.blockPosition()
    let genResultMap = worldTargets.generated()
    let blockPosTag = new $ListTag()

    //console.log(genResultMap);
    

    let filteredMap = genResultMap.entrySet().stream().filter(entry => {
        return oresSet.contains(entry.getValue().name) && entry.getKey().closerThan(playerBlockPos, 500)
    }).forEach(entry => {
        scanndedOresMap.get(depositToOreMap.get(entry.getValue().name)).add($NbtUtils.writeBlockPos(entry.getKey()))
        //blockPosTag.add($NbtUtils.writeBlockPos(entry.getKey()))
    })
    //.collect($Collectors.toMap(entry => entry.getKey(), entry => entry.getValue()))

    // genResultMap.forEach((pos, targetGenResult) => {
    //     targetGenResult.name
    // })

    let posData = new $CompoundTag()

    scanndedOresMap.forEach((oreId, listTag) => {
        posData.put(oreId, listTag)
    })

    let dataToSend = new $CompoundTag()
    dataToSend.put("depositPositions", posData)
    
    //posData.put("depositPositions", blockPosTag)

    event.player.sendData("milf_pet_rock_deposits_scan", dataToSend)
})

// ItemEvents.firstRightClicked("milf:pet_rock", event => {


// })
