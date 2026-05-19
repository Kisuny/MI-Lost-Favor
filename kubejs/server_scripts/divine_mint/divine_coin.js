//priority: 2

let $DataComponents = Java.loadClass("net.minecraft.core.component.DataComponents")
let $Component$Serializer = Java.loadClass("net.minecraft.network.chat.Component$Serializer")
let $HashSet = Java.loadClass("java.util.HashSet")
let $Attributes = Java.loadClass("net.minecraft.world.entity.ai.attributes.Attributes")
let $MobEffectInstance = Java.loadClass("net.minecraft.world.effect.MobEffectInstance")
let $MobEffects = Java.loadClass("net.minecraft.world.effect.MobEffects")
let $Float = Java.loadClass("java.lang.Float")
let $ItemEntity = Java.loadClass("net.minecraft.world.entity.item.ItemEntity")

let DIVINE_MINT_BOSSES_DATA = global.milfBosses

NetworkEvents.dataReceived('milf_divine_mint_give_divine_coin', (event) => {

    //console.log(event.data);

    let data = event.data

    let coinStack = Item.of("milf:divine_coin")

    coinStack.set($DataComponents.CUSTOM_DATA, data)

    event.player.getInventory().add(coinStack)
    
})

NetworkEvents.dataReceived('milf_divine_coin_validate', (event) => {

    let {data, player, level} = event

    let playerPos = player.blockPosition()

    let structures = getCurrentStructures(player)

    //console.log(structures);
    

    let bossData = DIVINE_MINT_BOSSES_DATA[data.getString("bossTier")][data.getString("bossID")]

    //console.log(bossData.structure);
    

    if (structures.contains(bossData.structure) || level.dimension == "milf:abstraction"){

        let playerPosData = new $CompoundTag()
        playerPosData.putInt("x", playerPos.x)
        playerPosData.putInt("y", playerPos.y)
        playerPosData.putInt("z", playerPos.z)

        data.put("spawnPos", playerPosData)
        event.player.sendData("milf_divine_coin_valid", data)

    }
    
})

let milfBossesToSpawn = {

}

ServerEvents.tick(event =>{
    if (Object.keys(milfBossesToSpawn).length == 0){ return }

    for (let [uuid, data] of Object.entries(milfBossesToSpawn)){


        let newTicks = data.ticks - 1
        milfBossesToSpawn[uuid].ticks = newTicks

        //console.log(newTicks);
        //console.log(data.entity.getPersistentData());

        let scale = easeOutBounce((30 - newTicks) / 30)
        
        data.entity.getAttribute($Attributes.SCALE).setBaseValue(scale)

        if (newTicks == 0){
            delete milfBossesToSpawn[uuid]
        }

    }
})


//ty https://easings.net/
function easeOutBounce(x) {
    const n1 = 7.5625
    const d1 = 2.75

    if (x < 1 / d1) {
        return n1 * x * x
    } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75
    } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375
    } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375
    }
}


NetworkEvents.dataReceived('milf_divine_coin_spawn_boss', (event) => {

    let data = event.data
    let player = event.player
    let level = player.level

    let spawnPos = data.get("spawnPos")

    let bossID = data.getString("bossID")
    let entityType = $BuiltInRegistries.ENTITY_TYPE.get($ResourceLocation.parse(bossID))
    //let entity = entityType.create(level)
    let entity = entityType.spawn(level,
        entity => {
            let difficultyID = event.data.getString("difficultyID")

            switch (difficultyID) {
                case "normal":

                    break;

                case "hard":
                    let maxHealth = entity.getMaxHealth()

                    console.log(maxHealth);
                    let newMaxHealth = maxHealth * 1.5

                    entity.getAttribute($Attributes.MAX_HEALTH).setBaseValue(newMaxHealth)
                    entity.setHealth(newMaxHealth)

                    break;
            }

            let effectID = data.getString("effectID")

            if (effectID != "none") {
                let effect = $BuiltInRegistries.MOB_EFFECT.get(effectID)
                let effectInstance = new $MobEffectInstance(effect, -1, 1, true, true, true)
                entity.addEffect(effectInstance)
            }

            entity.getAttribute($Attributes.SCALE).setBaseValue(0)

            entity["moveTo(double,double,double)"](spawnPos.getInt("x"), spawnPos.getInt("y"), spawnPos.getInt("z"))
        },
        new BlockPos(0,0,0),
        $MobSpawnType.COMMAND,
        true,
        false
    )

    entity.getPersistentData().putFloat("milfLootModifier", $Float.parseFloat(data.getString("lootModifier")))

    //level.addFreshEntity(entity)
    milfBossesToSpawn[entity.uuid.toString()] = {ticks: 30, entity:entity}

})

NativeEvents.onEvent("net.neoforged.neoforge.event.entity.living.LivingDropsEvent", event => {
    let entity = event.getEntity()
    if (entity.getPersistentData().contains("milfLootModifier")){

        let lootModifier = entity.getPersistentData().getFloat("milfLootModifier")

        let extraDrops = []

        for (let drop of event.getDrops()) {
            let originalStack = drop.getItem()
            let originalCount = originalStack.getCount()

            let targetCountDecimal = originalCount * lootModifier
            let targetCount = targetCountDecimal | 0

            if (Math.random() < targetCountDecimal - targetCount){
                targetCount++
            }

            let toAddCount = targetCount - originalCount

            for (let i = 0; i < toAddCount; i++) {
                let stackToAdd = originalStack.copy()

                let itemEntityToAdd = new $ItemEntity(
                    drop.level,
                    drop.getX(),
                    drop.getY(),
                    drop.getZ(),
                    stackToAdd
                )

                itemEntityToAdd.setGlowing(true)

                let spreadX = (Math.random() - 0.5) * 0.5
                let spreadY = Math.random() * 0.5
                let spreadZ = (Math.random() - 0.5) * 0.5

                itemEntityToAdd.addDeltaMovement( new Vec3d(
                    drop.getDeltaMovement().x + spreadX,
                    drop.getDeltaMovement().y + spreadY,
                    drop.getDeltaMovement().z + spreadZ
                ))

                itemEntityToAdd.setPickUpDelay(10)

                extraDrops.push(itemEntityToAdd)
            }


            // let newCount = Math.min(originalStack.getCount() * lootModifier, originalStack.getMaxStackSize()) | 0
            // originalStack.setCount(newCount)
        }

        event.getDrops().addAll(new $ArrayList(extraDrops))

        
    }
})




function getCurrentStructures(player){
    let playerPos = player.blockPosition()
    let level = player.level

    let structures = new $HashSet()

    let structureRegistry = level.registryAccess().registryOrThrow($Registries.STRUCTURE)

    let structureManager = level.structureManager()

    let structureStarts = structureManager.getAllStructuresAt(playerPos)

    structureStarts.forEach((structure, something) => {

        let structureID = structureRegistry.getKey(structure).toString()

        structures.add(structureID)
        
        
    })

    
    return structures

}



