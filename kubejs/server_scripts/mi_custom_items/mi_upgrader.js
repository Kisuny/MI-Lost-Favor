
const MI_UPGRADES = global.MI_UPGRADES

ServerEvents.tags('block', event => {

    for(const upgradable of Object.keys(MI_UPGRADES)){
        event.add('milf:upgradable', upgradable)
    }
})

BlockEvents.rightClicked(Object.keys(MI_UPGRADES), event => {
    if(event.getHand()=="OFF_HAND") event.cancel()
    let {player, block} = event
    if (player.mainHandItem.id != "milf:mi_upgrader") return

    let blockEntity = block.getEntity()
    let requiredMaterials = MI_UPGRADES[block.getId()].upgradeMaterials
    
    let { isEnough, missingItems } = checkAndRemoveItems(player, requiredMaterials)

    //let isEnough = true
    // let missingItems = []
    // for (let entry of requiredMaterials) {
    //     let { id, count } = entry

    //     let item = Item.of(id)

    //     let playerCount = player.getInventory().count(item)

    //     if (playerCount < count) {
    //         enough = false
    //         missingItems.push(id)

    //     }

    // }

    if(isEnough || event.player.creative){
        // if(!event.player.creative){

        //     for (let entry of requiredMaterials) {
        //         let { id, count } = entry

        //         let item = Item.of(id)

        //         let playerCount = player.getInventory().clearOrCountMatchingItems(
        //             stack => stack.is(item),
        //             count,
        //             player.inventoryMenu.getCraftSlots()
        //         )

        //     }

        //     player.containerMenu.broadcastChanges()

        // }

        particleFrame(PARTICLES.dispersed, block.getPos(), {x:1, y:1, z:1}, event)
        
        let entityData = block.getEntityData().copy()
        let newBlock = Block.withProperties(MI_UPGRADES[block.getId()].upgradesTo, block.getProperties())
        let level = event.getLevel()
        let blockPos = block.getPos()
        
        level.removeBlockEntity(blockPos)
        level.setBlockAndUpdate(blockPos, newBlock)
        let newEntityData = level.getBlock(blockPos).getEntityData()
        //console.log(newEntityData);
        
        if (newEntityData.contains("fluids") && entityData.contains("fluids")){
            let newFluidsList = newEntityData.get("fluids")
            let oldFluidsList = entityData.get("fluids")

            for (let i = 0; i < newFluidsList.size(); i++) {
                let newFluidEntry = newFluidsList.getCompound(i)
                let oldFluidEntry = oldFluidsList.getCompound(i)
                // console.log(newFluidEntry, oldFluidEntry);

                oldFluidEntry.putLong("capacity", newFluidEntry.getLong("capacity"))
            }
            
            //entityData.putLong(newEntityData.getLong("capacity"))
        }
        level.getBlock(blockPos).setEntityData(entityData) 

        milfPlaySound(event, "immersive_machinery:hatch_open", { pos: blockPos })

        blockEntity.setChanged();
        blockEntity.sync();
    } else {
        
        let ticksOffset = 0

        missingItems.forEach(id => {
            let missingItemsComponent = Component.translatable("milf.mi_upgrade_notification_1")
            missingItemsComponent.append(Component.translatable(Item.getItem(id).getDescriptionId()))
            missingItemsComponent.append(Component.translatable("milf.mi_upgrade_notification_2"))
            event.server.scheduleInTicks(ticksOffset, callback => {
                sendImmersiveMessage(missingItemsComponent, player, DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
            })
            
            ticksOffset+=5
        })

        
        // sendImmersiveMessage(Component.translatable("milf.mi_upgrade_notification_1")
        // .append(Component.translatable(Item.getItem(MI_UPGRADES[block.getId()].upgradeMaterials).getDescriptionId()))
        // .append(Component.translatable("milf.mi_upgrade_notification_2")), 
        //         event.getPlayer(), DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
    }
    event.cancel()
    
})

ServerEvents.recipes(event => {

    for( const [ blockToUpgrade, upgradeData] of Object.entries(MI_UPGRADES)){

        switch (upgradeData.upgradeMaterials.length) {
            case 1:
                if (upgradeData.upgradeMaterials[0].count == 1){
                    event.shaped(upgradeData.upgradesTo,
                        [
                            " K ",
                            " U ",
                            " S "
                        ],
                        {
                            K: { item: blockToUpgrade },
                            U: { item: "milf:mi_upgrader" },
                            S: { item: upgradeData.upgradeMaterials[0].id }
                        }).keepIngredient("milf:mi_upgrader").modifyResult("milf:mi_upgrader_recipe")
                } else if (upgradeData.upgradeMaterials[0].count == 4){
                    event.shaped(upgradeData.upgradesTo,
                        [
                            " K ",
                            "SUS",
                            "S S"
                        ],
                        {
                            K: { item: blockToUpgrade },
                            U: { item: "milf:mi_upgrader" },
                            S: { item: upgradeData.upgradeMaterials[0].id }
                        }).keepIngredient("milf:mi_upgrader").modifyResult("milf:mi_upgrader_recipe")
                }

                break;
            // case 2:
            //     event.shaped(value.upgradesTo,
            //         [
            //             " K ",
            //             " U ",
            //             "S E"
            //         ],
            //         {
            //             K: { item: key },
            //             U: { item: "milf:mi_upgrader" },
            //             S: { item: value.upgradeMaterials[0].id },
            //             E: { item: value.upgradeMaterials[1].id }
            //         }).keepIngredient("milf:mi_upgrader").modifyResult("milf:mi_upgrader_recipe")
            //     break;
            // case 3:
            //     event.shaped(value.upgradesTo,
            //         [
            //             " K ",
            //             " U ",
            //             "SEG"
            //         ],
            //         {
            //             K: { item: key },
            //             U: { item: "milf:mi_upgrader" },
            //             S: { item: value.upgradeMaterials[0].id },
            //             E: { item: value.upgradeMaterials[1].id },
            //             G: { item: value.upgradeMaterials[2].id }
            //         }).keepIngredient("milf:mi_upgrader").modifyResult("milf:mi_upgrader_recipe")
            //     break;
            // case 4:
            //     event.shaped(value.upgradesTo,
            //         [
            //             " K ",
            //             "SUE",
            //             "G s"
            //         ],
            //         {
            //             K: { item: key },
            //             U: { item: "milf:mi_upgrader" },
            //             S: { item: value.upgradeMaterials[0].id },
            //             E: { item: value.upgradeMaterials[1].id },
            //             G: { item: value.upgradeMaterials[2].id },
            //             s: { item: value.upgradeMaterials[3].id }
            //         }).keepIngredient("milf:mi_upgrader").modifyResult("milf:mi_upgrader_recipe")
            //     break;
            default:
                break;
        }



    }

})

ServerEvents.modifyRecipeResult("milf:mi_upgrader_recipe", event =>{

    let prev = event.grid.getItem(0)

    //console.log(prev)
    

    let outputItem = new $ItemStack(event.item.asHolder(), 1, prev.componentsPatch)
    // try {
    //     console.log(outputItem);
        
    // } catch (error) {
    //     console.log(error);
        
    // }
    
    event.success(outputItem)
})
