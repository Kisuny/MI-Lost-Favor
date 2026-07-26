
ItemEvents.firstRightClicked("milf:orb_of_the_forest", event => {
    //apothic_enchanting:chainsaw
    if(!applyOrb(event,
        (item) => { 
            let isInfused = item.getCustomData().getBoolean("milf:forest_infusion") || false
            return item.hasTag("minecraft:axes") && !isInfused
        },
        (item) => {

            addSpecificEnchantment(event, item, -1, "apothic_enchanting:chainsaw")
            let tool = item.getComponents().get($DataComponents.TOOL)

            let newRules = []
            let tagKey = $TagKey.create($Registries.BLOCK, $ResourceLocation.fromNamespaceAndPath("minecraft", "mineable/axe"))
            let tag = event.server.registryAccess().registryOrThrow($Registries.BLOCK).getTagOrEmpty(tagKey)

            //console.log(tag);
            
            for(const rule of tool.rules() ){                
                if(rule.blocks() == tag) {
                    newRules.push(new $Tool.Rule(tag, rule.speed().get() / 10, true))
                } else {
                    newRules.push(rule)
                }
            }

            let newTool = new $Tool(newRules, tool.defaultMiningSpeed() / 10, tool.damagePerBlock())
            item.setTool(newTool)
            //console.log(item.getCustomData());
            let compound = $CompoundTag()
            if(item.get($DataComponents.CUSTOM_DATA)){
                compound = item.get($DataComponents.CUSTOM_DATA).get().copy()
            }

            compound.putBoolean("milf:forest_infusion", true)

            item.set($DataComponents.CUSTOM_DATA, compound)
            
        }
    )) { return }
})