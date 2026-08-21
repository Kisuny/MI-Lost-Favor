MIMaterialModifier("uranium").addParts(["plate", "bolt"])
MIMaterialModifier("steel").addParts(["wire", "rotor", "blade"]).addSpecialCasing("reinforced_steel_machine_casing", 8)
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
MIMaterialModifier("carbon").addParts(["coil"])
MIMaterialModifier("silicon").addParts(["large_plate"])

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

        milfData.addCredit(`${this.name}_machine_casing_pipe`, "mi_part", "modern_industrialization")

        return this
    }

    this.addSpecialCasing = function (id, hardness, langArgs) {
        let casingLang = Object.assign({ "en_us": idToName(id) }, langArgs)
        MIMaterialEvents.modifyMaterial(this.name, event => {
            event.builder.specialCasing(casingLang.en_us, id, hardness)
        })

        milfData.addLang(`modern_industrialization:${id}`, { lang: casingLang }, "block", "modern_industrialization")
        milfData.addCredit(`${id}`, "mi_part", "modern_industrialization")

        return this
    }
    
    return this
}

