global.disabledFluids = [

    new DisabledFluidBuilder("immersivepetroleum:lubricant"),

    new DisabledFluidBuilder("modern_industrialization:raw_biodiesel"),
    new DisabledFluidBuilder("modern_industrialization:diesel"),
    new DisabledFluidBuilder("modern_industrialization:creosote").replaceWith("immersiveengineering:creosote"),
    new DisabledFluidBuilder("modern_industrialization:plant_oil").replaceWith("immersiveengineering:plantoil"),
    new DisabledFluidBuilder("modern_industrialization:ethanol").replaceWith("immersiveengineering:ethanol"),
    new DisabledFluidBuilder("modern_industrialization:biodiesel").replaceWith("immersiveengineering:biodiesel"),

    new DisabledFluidBuilder("oritech:still_silicon_wash"),
    new DisabledFluidBuilder("oritech:still_mineral_slurry"),
    new DisabledFluidBuilder("oritech:still_oil"),
    new DisabledFluidBuilder("oritech:still_heavy_oil"),
    new DisabledFluidBuilder("oritech:still_naphtha"),
    new DisabledFluidBuilder("oritech:still_diesel"),
    new DisabledFluidBuilder("oritech:still_steam").replaceWith("modern_industrialization:steam"),
    new DisabledFluidBuilder("oritech:still_sulfuric_acid").replaceWith("modern_industrialization:sulfuric_acid")

].map(builder => builder.build())


function DisabledFluidBuilder(id) {
    const self = this
    this.id = id,

    this.replaceData = { id: null, in: ["RECIPE_INPUTS", "RECIPE_OUTPUTS"] },
    this.replaceWith = function (id, isNotEverywhere) {
        self.replaceData.id = id
        return self

    }

    this.build = function () {
        return { id: self.id, replaceData: self.replaceData }
    }

    return self
}