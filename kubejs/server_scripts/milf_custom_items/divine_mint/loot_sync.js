//priority: 2
NetworkEvents.dataReceived('milf_divine_mint_sync_loot', (event) => {

    let level = event.getLevel()
    if(level.isClientSide()) return
    let player = event.getPlayer()

    let bossesTiers = event.data.getCompound("bosses")

    let aliRegistry = $PluginManager.getInstance().serverRegistry

    let loot = {}

    for (let tierID of bossesTiers.getAllKeys()) {

        let bossesTag = bossesTiers.get(tierID)

        let tierLoot = {}

        for (let bossID of bossesTag.getAllKeys()) {

            let bossData = bossesTag.get(bossID)
            let entityType = $BuiltInRegistries.ENTITY_TYPE.get(new $ResourceLocation.parse(bossID))
            if (bossData.contains("fakeLootEntity")) entityType = $BuiltInRegistries.ENTITY_TYPE.get(new $ResourceLocation.parse(bossData.getString("fakeLootEntity")))
            //entityType.spawn(level, blockPos, $MobSpawnType.COMMAND)
            let entity = entityType.create(level)

            let lootTable = level.getServer().reloadableRegistries().getLootTable(entityType.getDefaultLootTable())
            let lootTableId = entity.getLootTable().location()

            //console.log(lootTable);

            //let aliNode = $NodeUtils.getLootTableNode($Collections.emptyList(), aliRegistry, lootTable, 1, $Collections.emptyList(), $Collections.emptyList())
            //aliRegistry.setCurrentLootTable(entityType.getDefaultLootTable())
            //let aliNode = aliRegistry.parseTable(aliRegistry.getLootModifiers(), lootTable)
            //aliRegistry.setCurrentLootTable(null)
            //console.log(rawItems);

            // let aliNode = aliRegistry.parseTable($Collections.emptyList(), lootTable)
            // let output = new $ArrayList()
            // collectItemStacks(aliNode, output)
            // tierLoot[bossID] = output
            // console.log(output);
            
            let items = $ItemCollectorUtils.collectLootTable(aliRegistry, lootTable)

            let modifiers = new $ArrayList()

            for(let modifier of aliRegistry.getLootModifiers()){
                if (modifier.getType() == $ILootModifier.IType.ENTITY && modifier.predicate(entity)){
                    if(items.isEmpty() || items.stream().anyMatch(item => 
                        modifier.getOperations().stream().anyMatch(operation => 
                            operation.predicate().test(item.getDefaultInstance()))
                    )){
                        modifiers.add(modifier)
                    }
                } else if (modifier.getType() == $ILootModifier.IType.LOOT_TABLE && modifier.predicate(lootTableId)){
                    if(items.isEmpty() || items.stream().anyMatch(item =>
                        modifier.getOperations().stream().anyMatch(operation => 
                            operation.predicate().test(item.getDefaultInstance()))
                    )){
                        modifiers.add(modifier)
                    }
                }
            }

            // let testNode = aliRegistry.parseTable(modifiers, lootTable)

            // let testOutput = new $ArrayList()
            // collectItemStacks(testNode, testOutput)

            // console.log(testOutput);

            let aliNode = aliRegistry.parseTable(modifiers, lootTable)
            let output = new $ArrayList()
            collectItemStacks(aliNode, output)

            if (bossData.fakeLoot){
                //console.log(bossData.fakeLoot);
                
                bossData.fakeLoot.forEach(entry =>{
                    //console.log(entry);
                    
                    output.add(entry)
                })
            }

            tierLoot[bossID] = output

            //console.log(output);


        }

        loot[tierID] = tierLoot
    }

    //console.log(loot);
    

    player.sendData("milf_divine_mint_server_loot_data", loot)


    //console.log(output);


    // entity.moveTo(pos.x, pos.y, pos.z, level.random.nextFloat(), 0)
    // level.addFreshEntity(entity)

})


function collectItemStacks(node, output){
    //console.log(node);
    if (node instanceof $IItemNode){

        let nodeData = {}

        //console.log(node.getFunctions());

        node.getModifiedItem().ifLeft(item => {
            //console.log(item);
            let itemID = $BuiltInRegistries.ITEM.getKey(item.getItem()).toString()
            nodeData[itemID] = { count: node.getCount().toFloatString(), chance: node.getChance() }

            if (itemID.split(":")[0] != "simplyswords") output.add(nodeData)
        })

        node.getModifiedItem().ifRight(tag =>{
            // console.log(tag);
            
        })

        //console.log(node.getCount())
        //console.log(node.getConditions())
        //console.log(node.getChance())
        //console.log(node.getFunctions())

    } else if (node instanceof $ListNode){
        node.nodes().forEach(child => {
            collectItemStacks(child, output)
        })
    } else {
        //console.log(node.getTooltip());
        
    }
}
