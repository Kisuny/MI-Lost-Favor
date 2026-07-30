MIMaterialModifier("uranium").addParts(["plate", "bolt"])
MIMaterialModifier("steel").addParts(["wire"])
MIMaterialModifier("lead").addParts(["wire", "bolt", "rod"])
MIMaterialModifier("invar").addPipeCasing(8.0).addParts(["curved_plate"])
MIMaterialModifier("silver").addParts(["rod", "bolt"])
MIMaterialModifier("nickel").addParts(["rod", "bolt"])
MIMaterialModifier("electrum").addParts(["rod", "bolt"])
MIMaterialModifier("tin").addParts(["large_plate"])
MIMaterialModifier("gold").addParts(["large_plate"])
MIMaterialModifier("copper").addParts(["large_plate"])
MIMaterialModifier("bronze").addParts(["large_plate"])
MIMaterialModifier("battery_alloy").addParts(["large_plate"])

function MIMaterialModifier(name ){
    this.name = name

    this.addParts = function(parts){
        MIMaterialEvents.modifyMaterial(this.name, event => {
            event.builder.addParts(parts)
        })

        parts.forEach(part => {
            
            milfData.addCredit(`${this.name}_${part}`,"mi_part", "modern_industrialization")
        })

        return this
    }

    this.addPipeCasing = function(hardness){
        MIMaterialEvents.modifyMaterial(this.name, event => {
            event.builder.pipeCasing(hardness)
        })

        milfData.addCredit(`${this.name}_machine_casing_pipe`, "mi_block", "modern_industrialization")

        return this
    }
    
    return this
}

