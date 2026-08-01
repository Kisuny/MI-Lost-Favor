global.disabledFluids = [

    new DisabledFluidBuilder("modern_industrialization:plant_oil").replaceWith("immersiveengineering:plantoil").build(),
    new DisabledFluidBuilder("modern_industrialization:ethanol").replaceWith("immersiveengineering:ethanol").build(),
    new DisabledFluidBuilder("modern_industrialization:biodiesel").replaceWith("immersiveengineering:biodiesel").build(),


    new DisabledFluidBuilder("oritech:still_steam").replaceWith("modern_industrialization:steam").build(),
    new DisabledFluidBuilder("oritech:still_sulfuric_acid").replaceWith("modern_industrialization:sulfuric_acid").build()
]


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