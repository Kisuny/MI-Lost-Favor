// Dunno if IIFE is necessary here, but I guess polluting the global scope with a bunch 
// of stuff is generally not a great idea, so better safe than sorry
// (I also should probably refactor all the other places where it is feasible...)(‾◡◝)

(() => {

let builders = [
    new MIMaterialBuilder("constantan", "Constantan", 0xf1885b)
        .withMaterialSet("shiny")
        .addParts(["ingot", "nugget", "dust", "tiny_dust", "plate", "rod", "bolt"])
        .addBlock("copper")
        .withDefaultRecipes(),

    new MIMaterialBuilder("saltpeter", "Saltpeter", 0x9C9E9E)
        .withMaterialSet("shiny")
        .addParts(["dust", "tiny_dust"])
        .withDefaultRecipes(),

    new MIMaterialBuilder("hop_graphite", "HOP Graphite", 0x111212)
        .withMaterialSet("dull")
        .addParts(["ingot", "dust", "tiny_dust", "plate"])
        .withDefaultRecipes(),

    new MIMaterialBuilder("plastic", "Plastic", 0x9A9F9C)
        .withMaterialSet("dull")
        .addParts(["plate", "large_plate", "dust", "tiny_dust"])
        .withDefaultRecipes(),

    new MIMaterialBuilder("netherite", "Netherite", 0x5a5455)
        .addParts(["nugget", "rod", "tiny_dust"])
        .addExternalPart({ ingot: "minecraft:netherite_ingot" })
        .addExternalPart({ dust: "extended_industrialization:netherite_dust" })
        .withDefaultRecipes(),

    new MIMaterialBuilder("certus_quartz", "Certus quartz", 0xd5f4f7)
        .withMaterialSet("shiny")
        .addExternalPart({ ingot: "ae2:certus_quartz_crystal" })
        .addExternalPart({ dust: "ae2:certus_quartz_dust" })
        .addParts(["rod", "plate", "large_plate"])
        .withMachineCasing(8.0)
        .withDefaultRecipes(),

    new MIMaterialBuilder("bioresistant_alloy", "Bioresistant Alloy", 0x54ccc2)
        .withMaterialSet("shiny")
        .addParts(["ingot", "rod", "plate", "large_plate", "ring", "curved_plate", "bolt", "gear", "dust", "tiny_dust"])
        .withMachineCasing(8.0)
        .addSpecialCasing("bioresistant_machine_casing", 8.0, { "en_us": "Bioresistant Machine Casing" })
        .withDefaultRecipes(),

    new MIMaterialBuilder("tumbaga", "Tumbaga", 0xb0501c)
        .withMaterialSet("shiny")
        .addParts(["ingot", "rod", "plate", "large_plate", "ring", "curved_plate", "bolt", "gear", "dust", "tiny_dust"])
        .withMachineCasing(8.0)
        .addSpecialCasing("bioactive_machine_casing", 8.0, { "en_us": "Bioactive Machine Casing" })
        .withDefaultRecipes(),

    new MIMaterialBuilder("silicon_steel", "Silicon Steel", 0x15203b)
        .withMaterialSet("shiny")
        .addParts(["ingot", "rod", "plate", "large_plate", "ring", "curved_plate", "bolt", "gear", "dust", "tiny_dust"])
        .withMachineCasing(8.0)
        .addSpecialCasing("biointensive_machine_casing", 8.0, { "en_us": "Biointensive Machine Casing" })
        .withDefaultRecipes(),

    new MIMaterialBuilder("adamant", "Adamant", 0x15203b)
        .withMaterialSet("shiny")
        .addExternalPart({ ingot: "oritech:adamant_ingot" })
        .addParts(["rod", "plate", "large_plate", "ring", "curved_plate", "bolt", "gear", "dust", "tiny_dust"])
        .withMachineCasing(8.0)
        .withDefaultRecipes(),

    new MIMaterialBuilder("energite", "Energite", 0x15203b)
        .withMaterialSet("shiny")
        .addExternalPart({ ingot: "oritech:energite_ingot" })
        .addParts(["rod", "plate", "large_plate", "ring", "curved_plate", "bolt", "gear", "dust", "tiny_dust"])
        .withMachineCasing(8.0)
        .withDefaultRecipes(),

    new MIMaterialBuilder("duratium", "Duratium", 0x15203b)
        .withMaterialSet("shiny")
        .addExternalPart({ ingot: "oritech:duratium_ingot" })
        .addParts(["rod", "plate", "large_plate", "ring", "curved_plate", "bolt", "gear", "dust", "tiny_dust"])
        .withMachineCasing(8.0)
        .withDefaultRecipes(),

    new MIMaterialBuilder("biosteel", "Biosteel", 0x15203b)
        .withMaterialSet("shiny")
        .addExternalPart({ ingot: "oritech:biosteel_ingot" })
        .addParts(["rod", "plate", "large_plate", "ring", "curved_plate", "bolt", "gear", "dust", "tiny_dust"])
        .withMachineCasing(8.0)
        .withDefaultRecipes()
]

MIMaterialEvents.addMaterials(event => {
    builders.forEach(builder => builder.create(event))
})

function MIMaterialBuilder(materialId, materialName, color) {
    this.materialId = materialId

    this.config = {
        materialSet: "shiny",
        parts: [],
        externalParts: {},
        machineCasing: null,
        specialCasing:null,
        block: null,
        isWithDefaultRecipes: false
    }

    this.create = function(event){
        
        event.createMaterial(
            materialName, this.materialId, color || 0x15203b,
            builder => {
                let config = this.config

                builder.materialSet(config.materialSet)

                config.parts.length != 0 && builder.addParts(config.parts)

                Object.entries(config.externalParts).forEach(([part, id]) => builder.addExternalPart(part, id))

                config.machineCasing && builder.machineCasing(config.machineCasing)
                config.block && builder.block(config.block)
                config.specialCasing && builder.specialCasing(config.specialCasing.name, config.specialCasing.id, config.specialCasing.hardness)
                config.isWithDefaultRecipes && builder.defaultRecipes()
            }
        )
        
    }

    this.addExternalPart = function(partEntry){
        this.config.externalParts = Object.assign({}, this.config.externalParts, partEntry)

        return this
    }

    this.addSpecialCasing = function (id, hardness, langArgs){
        let casingLang = Object.assign({ "en_us": idToName(id) }, langArgs)
        this.config.specialCasing = { id: id, hardness: hardness, name: casingLang.en_us}


        milfData.addLang(`modern_industrialization:${id}`, { lang: casingLang }, "block", "modern_industrialization")
        milfData.addCredit(`${id}`, "mi_part", "modern_industrialization")

        return this
    }

    this.addParts = function (parts) {
        this.config.parts = parts

        parts.forEach(part => {
            milfData.addCredit(`${this.materialId}_${part}`, "mi_part", "modern_industrialization")
        })

        return this
    }

    this.withMachineCasing = function (hardness) {
        this.config.machineCasing = hardness
        milfData.addCredit(`${this.materialId}_machine_casing`, "mi_part", "modern_industrialization")
        return this
    }

    this.addBlock = function (type) {
        this.config.block = type
        milfData.addCredit(`${this.materialId}_block`, "mi_part", "modern_industrialization")
        return this
    }

    this.withDefaultRecipes = function (){
        this.config.isWithDefaultRecipes = true

        return this
    }

    this.withMaterialSet = function (materialSet) {
        this.config.materialSet = materialSet

        return this
    }

    return this
}

})()