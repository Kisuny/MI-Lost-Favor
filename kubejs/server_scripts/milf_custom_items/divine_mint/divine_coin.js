//priority: 2

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

    let playerPos = player.position()

    let structures = getCurrentStructures(player)

    //console.log(structures);

    let bossData = DIVINE_MINT_BOSSES_DATA[data.getString("bossTier")][data.getString("bossID")]

    //console.log(bossData.structure);

    let isInAbstraction = level.dimension == "milf:abstraction"

    if (isInAbstraction && bossData.isStructureExclusive){
        event.player.sendData("milf_divine_coin_structure_exclusive")
        //sendImmersiveMessage(Component.translatable("milf.divine_mint.notification.structure_exclusive"), player, DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
        return
    }

    if (structures.contains(bossData.structure) || (isInAbstraction && !bossData.isStructureExclusive)){

        let resurrectionItems = bossData.resurrectionItems

        if (resurrectionItems){
            let enough = true
            let itemsTag = new $ListTag()
            for (let entry of resurrectionItems) {
                let { id, count } = entry

                let item = Item.of(id)

                let playerCount = player.getInventory().count(item)

                if (playerCount < count) {
                    enough = false
                    itemsTag.add($StringTag.valueOf(id))
                    //sendImmersiveMessage(Component.translatable("milf.divine_mint.notification.not_enough_items"), player, DEFAULT_WARN_NOTIFICATION_STYLE, event.server)

                }

            }

            if (!enough) {
                let missingItemsData = new $CompoundTag()
                missingItemsData.put("itemsToShake", itemsTag)
                event.player.sendData("milf_divine_coin_not_enough_items", missingItemsData)
                return
            }

            for (let entry of resurrectionItems) {
                let { id, count } = entry

                let item = Item.of(id)

                let playerCount = player.getInventory().clearOrCountMatchingItems(
                    stack => stack.is(item),
                    count,
                    player.inventoryMenu.getCraftSlots()
                )

            }

            player.containerMenu.broadcastChanges()
        }



        let playerPosData = new $CompoundTag()
        playerPosData.putDouble("x", playerPos.x)
        playerPosData.putDouble("y", playerPos.y)
        playerPosData.putDouble("z", playerPos.z)

        data.put("spawnPos", playerPosData)

        event.player.sendData("milf_divine_coin_valid", data)

        return
    }

    if (bossData.isStructureExclusive){
        event.player.sendData("milf_divine_coin_structure_exclusive")
    } else {
        event.player.sendData("milf_divine_coin_wrong_spawn_conditions")
    }
    

    //sendImmersiveMessage(Component.translatable("milf.divine_mint.notification.spawn_conditions"), player, DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
    
})

NetworkEvents.dataReceived('milf_divine_coin_boss_particles', (event) => {

    let data = event.data
    let spawnPos = data.get("spawnPos")

    let posVector = new Vec3d(spawnPos.getDouble("x"), spawnPos.getDouble("y") + 0.01, spawnPos.getDouble("z"))

    milfPlaySound(event, "fdbosses:geburah_sin_change", {pos: BlockPos.containing(posVector)})
    event.getLevel().spawnParticles("companions:teddy_transformation_cloud", false, posVector.x(), posVector.y(), posVector.z(), 0, 0, 0, 1, 0)

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

        //let scale = easeOutBounce((30 - newTicks) / 30)
        let scale = easeInOutCirc((30 - newTicks) / 30)
        
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

function easeInOutCirc(x) {
    return x < 0.5
        ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
        : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2
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

                    //console.log(maxHealth);
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

            entity["moveTo(double,double,double)"](spawnPos.getDouble("x"), spawnPos.getDouble("y"), spawnPos.getDouble("z"))
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

NativeEvents.onEvent($LivingDropsEvent, event => {
    let entity = event.getEntity()
    if (entity.getPersistentData().contains("milfLootModifier")){

        let lootModifier = entity.getPersistentData().getFloat("milfLootModifier")

        let extraDrops = []

        let addStackCopy = (stackToAdd, itemEntity) => {

            let itemEntityToAdd = new $ItemEntity(
                itemEntity.level,
                itemEntity.getX(),
                itemEntity.getY(),
                itemEntity.getZ(),
                stackToAdd
            )

            itemEntityToAdd.setGlowing(true)

            let spreadX = (Math.random() - 0.5) * 0.5
            let spreadY = Math.random() * 0.5
            let spreadZ = (Math.random() - 0.5) * 0.5

            itemEntityToAdd.setDeltaMovement(new Vec3d(
                itemEntity.getDeltaMovement().x + spreadX,
                itemEntity.getDeltaMovement().y + spreadY,
                itemEntity.getDeltaMovement().z + spreadZ
            ))

            itemEntityToAdd.setPickUpDelay(10)

            extraDrops.push(itemEntityToAdd)
        }

        for (let drop of event.getDrops()) {
            let originalStack = drop.getItem()
            let originalCount = originalStack.getCount()

            let targetCountDecimal = originalCount * lootModifier
            let targetCount = targetCountDecimal | 0

            if (Math.random() < targetCountDecimal - targetCount){
                targetCount++
            }

            if (targetCount == originalCount) continue

            let originalMaxSize = originalStack.getMaxStackSize()
            if (targetCount > originalMaxSize){

                let fullStacksSize = Math.ceil(targetCount / originalMaxSize) - 1

                for (let i = 0; i < fullStacksSize; i++) {
                    addStackCopy(originalStack.copyWithCount(originalMaxSize), drop)
                }

                let extraToAddCount = targetCount - fullStacksSize * originalMaxSize - originalCount
                if (extraToAddCount != 0){
                    addStackCopy(originalStack.copyWithCount(extraToAddCount), drop)
                }
                

            } else {
                originalStack.setCount(targetCount)
                originalStack.getEntityRepresentation().setGlowing(true)
            }

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

        let structureStart = structureManager.getStructureAt(playerPos, structure)

        if (structureStart.isValid()){
            let structureID = structureRegistry.getKey(structure).toString()
            structures.add(structureID)
        }
        
    })
    
    return structures

}



