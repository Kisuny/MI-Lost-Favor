//priority 10
/**
 * @typedef {Object} WorkspaceRecipeArgs
 * @property {[string[], string[], string[]]} pattern
 * @property {Object.<string, any>} key
 * @property {Array<[{id: string}, number]>} outputItems
 * @property {Object} [materialset]
 * @property {any} [tool]
 * @property {boolean} [removeRecipe]
 * @property {string} [removeRecipeType]
 * @property {string} [miCompatMachine]
 * @property {boolean} [compatOff]
 */

/**
 * @param {$RecipesKubeEvent_} event
 * @param {WorkspaceRecipeArgs} args
 * @returns {void}
 */
function yTechWorkspaceRecipe(event, args){
    let recipe = {
        type: "ytech:workspace_crafting",
        key: Object.assign({}, args.key, args.materialset?.key),
        pattern: {
            top:args.pattern[0],
            middle:args.pattern[1],
            bottom:args.pattern[2]
        },
        result: Object.assign({}, args.outputItems[0][0], { count: args.outputItems[0][1] || 1 }),
        tool:args.tool || { tag: "c:hammers" }
    }
    if (!args.compatOff) {
        let itemInputs = getItemInputsFromShaped(args)
        // let amounts = args.pattern.map(layer => layer.join("")).join("")
        // Object.entries(args.key).forEach(m => {
        //     let regex = new RegExp(m[0], 'g')
        //     itemInputs.push([m[1], (amounts.match(regex) || []).length])
        // })
        if(args.materialset){
            itemInputs.push(args.materialset.replaceWith)
        }
        if(args.miCompatMachine != "modern_industrialization:packer"){
            miMachineRecipe(event, {
                energy: 1, time: 200, machine: args.miCompatMachine || "modern_industrialization:not_so_multi_but_still_block_packer_2099_3x3x3_edition",
                inputItems: itemInputs,
                outputItems: [[{ item: recipe.result.id }, recipe.result.count]]
            })
        } else {
            miMachineRecipe(event, {
                energy: 1, time: 200, machine: args.miCompatMachine || "modern_industrialization:assembler",
                inputItems: itemInputs,
                outputItems: [[{ item: recipe.result.id }, recipe.result.count]]
            })

            miMachineRecipe(event, {
                energy: 1, time: 200, machine: "modern_industrialization:unpacker",
                inputItems: [[{ item: recipe.result.id }, recipe.result.count]],
                outputItems: itemInputs
            })
        }

    }
    if (args.removeRecipe) { event.remove({ output: args.outputItems[0][0].id }) }
    if (args.removeRecipeType) { event.remove({ output: args.outputItems[0][0].id, type: args.removeRecipeType }) }
    event.custom(recipe)
}

//#region materialsets

const WORKSPACE_MATERIALSETS = {
    BRONZE_BITS:{
        key:{M:{item:'milf:bronze_machine_bit'}},
        replaceWith: [{item:"modern_industrialization:bronze_machine_casing"}, 1]
    },

    STEEL_UPGRADE:{
        key:{M:{item:'milf:steel_machine_bit'}, P:{item:"immersiveengineering:fluid_pipe"}, G:{item:'milf:steel_infused_glass'}},
        replaceWith: [{item:"modern_industrialization:steel_upgrade"}, 1]
    },
    STEEL_BITS:{
        key:{M:{item:'milf:steel_machine_bit'}},
        replaceWith: [{item:"modern_industrialization:steel_machine_casing"}, 1]
    },

    BASIC:{
        key:{M:{item:'milf:basic_machine_bit'}, B:{item:"modern_industrialization:portable_storage_unit"}, G:{item:'milf:tempered_glass'}, C:{item:'modern_industrialization:tin_cable'}},
        replaceWith: [{item:"modern_industrialization:basic_machine_hull"}, 1]
    },

    BASIC_BITS:{
        key:{M:{item:'milf:basic_machine_bit'}},
        replaceWith: [{item:"modern_industrialization:frostproof_machine_casing"}, 1]
    }
}

//#endregion

//#region Array functions

Array.prototype.workspaceFull = function(letter) {
    this.fill(letter.repeat(3))
    return this
}

Array.prototype.workspaceRow = function(letter, row) {
    this.splice(row, 1, letter.repeat(3))
    return this
}

Array.prototype.workspaceOne = function(letter, row, index) {
    this.splice(row, 1, this[row].substring(0, index) + letter + this[row].substring(index + 1))
    return this
}

Array.prototype.workspaceCorners = function(letter) {
    this.splice(0, 1, letter + this[0].substring(1, 2) + letter)
    this.splice(2, 1, letter + this[2].substring(1, 2) + letter)
    return this
}

Array.prototype.workspaceSides = function(letter) {
    this.splice(0, 1, this[0].substring(0, 1) + letter + this[0].substring(2, 3))
    this.splice(1, 1, letter + this[1].substring(1, 2) + letter)
    this.splice(2, 1, this[2].substring(0, 1) + letter + this[2].substring(2, 3))
    return this
}

Array.prototype.workspaceCenter = function(letter) {
    this.workspaceOne(letter,1,1)
    return this
}

Array.prototype.workspaceFront = function(letter) {
    this.workspaceOne(letter,2,1)
    return this
}

Array.prototype.workspaceRight = function(letter) {
    this.workspaceOne(letter,1,0)
    return this
}

Array.prototype.workspaceLeft = function(letter) {
    this.workspaceOne(letter,1,2)
    return this
}

Array.prototype.workspaceBack = function(letter) {
    this.workspaceOne(letter,0,1)
    return this
}

Array.prototype.workspacePlus = function(letter) {
    this.workspaceOne(letter,0,1)
    this.workspaceRow(letter,1)
    this.workspaceOne(letter,2,1)
    return this
}

//#endregion

ServerEvents.recipes(event => {

    const wrench = { item: "modern_industrialization:wrench" }
    const anyTool = {tag: "c:tools"}
    const packer = "modern_industrialization:not_so_multi_but_still_block_packer_2099_3x3x3_edition"

    //#region MI bronze machines

    //furnace
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceFull("M").workspaceCenter("C").workspaceSides("p"),
            ['   ','   ','   '].workspaceFull("M").workspaceFront("G").workspaceCenter("S").workspaceBack("P"),
            ['   ','   ','   '].workspaceFull("B").workspaceCenter("F")
        ],
        key: {
            B: { item: "modern_industrialization:fire_clay_bricks" },
            S: { item: "ytech:primitive_smelter" },
            C: { item: "ytech:reinforced_brick_chimney" },
            P: { item: "moderndynamics:fluid_pipe" },
            G: { item: "milf:bronze_glass" },
            F: { item: "milf:small_copper_fluid_container" },
            p: { item: "modern_industrialization:bronze_curved_plate" }
        },
        outputItems: [[{ id: "modern_industrialization:bronze_mi_furnace" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BRONZE_BITS,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //steam_blast_furnace
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceFull("B").workspaceCenter("C"),
            ['   ','   ','   '].workspaceFull("B").workspaceFront(" ").workspaceCenter("S"),
            ['   ','   ','   '].workspaceFull("B")
        ],
        key: {
            B: { item: "modern_industrialization:fire_clay_bricks" },
            S: { item: "ytech:primitive_smelter" },
            C: { item: "ytech:reinforced_brick_chimney" }
        },
        outputItems: [[{ id: "modern_industrialization:steam_blast_furnace" }, 1]],
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //coke_oven
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceFull("B").workspaceCenter("C"),
            ['   ','   ','   '].workspaceFull("B").workspaceFront(" ").workspaceCenter("S"),
            ['   ','   ','   '].workspaceFull("B")
        ],
        key: {
            B: { item: "minecraft:bricks" },
            S: { item: "ytech:primitive_smelter" },
            C: { item: "ytech:reinforced_brick_chimney" }
        },
        outputItems: [[{ id: "modern_industrialization:coke_oven" }, 1]],
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //macerator
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceCorners("g").workspaceSides("r"),
            ['   ','   ','   '].workspaceFull("M").workspaceFront("G").workspaceCenter(" ").workspaceBack("I"),
            ['   ','   ','   '].workspaceFull("M").workspacePlus("P").workspaceCenter("F")
        ],
        key: {
            g: { tag: "c:gears/copper" },
            r: { tag: "c:rods/copper" },
            P: { item: "moderndynamics:fluid_pipe" },
            G: { item: "milf:bronze_glass" },
            F: { item: "milf:small_copper_fluid_container" },
            I: { item: "moderndynamics:item_pipe" }
        },
        outputItems: [[{ id: "modern_industrialization:bronze_macerator" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BRONZE_BITS,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //compressor
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceSides("r").workspaceCenter("d"),
            ['   ','   ','   '].workspaceFull("M").workspaceFront("G").workspaceCenter("h").workspaceBack("I"),
            ['   ','   ','   '].workspaceFull("M").workspacePlus("P").workspaceCenter("F")
        ],
        key: {
            r: { tag: "c:gears/copper" },
            h: { item: "modern_industrialization:forge_hammer" },
            P: { item: "moderndynamics:fluid_pipe" },
            G: { item: "milf:bronze_glass" },
            F: { item: "milf:small_copper_fluid_container" },
            I: { item: "moderndynamics:item_pipe" },
            d: { item: "modern_industrialization:iron_double_ingot" }
        },
        outputItems: [[{ id: "modern_industrialization:bronze_compressor" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BRONZE_BITS,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //cutting_machine
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceSides("r"),
            ['   ','   ','   '].workspaceFull("M").workspaceFront("G").workspaceCenter("h").workspaceBack("I"),
            ['   ','   ','   '].workspaceFull("M").workspacePlus("P").workspaceCenter("F")
        ],
        key: {
            r: { tag: "c:gears/copper" },
            h: { item: "modern_industrialization:copper_blade" },
            P: { item: "moderndynamics:fluid_pipe" },
            G: { item: "milf:bronze_glass" },
            F: { item: "milf:small_copper_fluid_container" },
            I: { item: "moderndynamics:item_pipe" }
        },
        outputItems: [[{ id: "modern_industrialization:bronze_cutting_machine" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BRONZE_BITS,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //composter
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceSides("r"),
            ['   ','   ','   '].workspaceFull("M").workspaceFront("G").workspaceCenter("h").workspaceBack("I"),
            ['   ','   ','   '].workspaceFull("M").workspacePlus("P").workspaceCenter("F")
        ],
        key: {
            r: { tag: "c:rods/copper" },
            h: { item: "minecraft:composter" },
            P: { item: "moderndynamics:fluid_pipe" },
            G: { item: "milf:bronze_glass" },
            F: { item: "milf:small_copper_fluid_container" },
            I: { item: "moderndynamics:item_pipe" }
        },
        outputItems: [[{ id: "extended_industrialization:bronze_composter" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BRONZE_BITS,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //pump
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ',' P ','   '].workspaceCorners("g").workspaceSides("r"),
            ['   ','   ','   '].workspaceFull("M").workspaceFront("G").workspaceCenter("h").workspaceBack("P"),
            ['   ','   ','   '].workspaceFull("M").workspacePlus("P").workspaceCenter("F")
        ],
        key: {
            r: { tag: "c:rods/copper" },
            h: { item: "modern_industrialization:copper_rotor" },
            g: { tag: "c:gears/copper" },
            P: { item: "moderndynamics:fluid_pipe" },
            G: { item: "milf:bronze_glass" },
            F: { item: "milf:small_copper_fluid_container" }
        },
        outputItems: [[{ id: "modern_industrialization:bronze_water_pump" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BRONZE_BITS,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //mixer
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceCenter("G").workspaceSides("r").workspaceCorners("g"),
            ['   ','   ','   '].workspaceFull("M").workspaceSides("G").workspaceCenter("h"),
            ['   ','   ','   '].workspaceFull("M").workspacePlus("P").workspaceCenter("F")
        ],
        key: {
            r: { tag: "c:rods/copper" },
            h: { item: "modern_industrialization:copper_rotor" },
            g: { tag: "c:gears/copper" },
            P: { item: "moderndynamics:fluid_pipe" },
            G: { item: "milf:bronze_glass" },
            F: { item: "milf:small_copper_fluid_container" }
        },
        outputItems: [[{ id: "modern_industrialization:bronze_mixer" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BRONZE_BITS,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //solar_boiler
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceCenter("G").workspaceSides("s").workspaceCorners("M"),
            ['   ','   ','   '].workspaceFull("M").workspaceFront("G").workspaceCenter("F").workspaceBack("P"),
            ['   ','   ','   '].workspaceFull("B").workspaceCenter("P")
        ],
        key: {
            s: { tag: "c:plates/silver" },
            B: { item: "modern_industrialization:fire_clay_bricks" },
            P: { item: "moderndynamics:fluid_pipe" },
            G: { item: "milf:bronze_glass" },
            F: { item: "milf:small_copper_fluid_container" }
        },
        outputItems: [[{ id: "extended_industrialization:bronze_solar_boiler" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BRONZE_BITS,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //bronze_boilder
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceCenter("F").workspaceSides("r").workspaceCorners("M"),
            ['   ','   ','   '].workspaceFull("M").workspaceFront("G").workspaceCenter("h").workspaceBack("I"),
            ['   ','   ','   '].workspaceFull("B").workspaceCenter("P")
        ],
        key: {
            r: { tag: "c:rods/copper" },
            h: { item: "minecraft:furnace" },
            B: { item: "modern_industrialization:fire_clay_bricks" },
            P: { item: "moderndynamics:fluid_pipe" },
            G: { item: "milf:bronze_glass" },
            F: { item: "milf:small_copper_fluid_container" },
            I: { item: "moderndynamics:item_pipe" }
        },
        outputItems: [[{ id: "modern_industrialization:bronze_boiler" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BRONZE_BITS,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //waste_collector
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceCenter("m").workspaceSides("r"),
            ['   ','   ','   '].workspaceFull("M").workspaceFront("G").workspaceCenter("h").workspaceBack("P"),
            ['   ','   ','   '].workspaceFull("M").workspacePlus("P").workspaceCenter("F")
        ],
        key: {
            r: { tag: "c:rods/copper" },
            h: { item: "minecraft:composter" },
            m: { item: "ytech:copper_mesh" },
            P: { item: "moderndynamics:fluid_pipe" },
            G: { item: "milf:bronze_glass" },
            F: { item: "milf:small_copper_fluid_container" }
        },
        outputItems: [[{ id: "extended_industrialization:bronze_waste_collector" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BRONZE_BITS,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //bending_machine
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceFull("g").workspaceSides("r"),
            ['   ','   ','   '].workspaceFull("M").workspaceFront("G").workspaceCenter(" ").workspaceBack("I"),
            ['   ','   ','   '].workspaceFull("M").workspacePlus("P").workspaceCenter("F")
        ],
        key: {
            r: { tag: "c:rods/copper" },
            g: { tag: "c:gears/copper" },
            P: { item: "moderndynamics:fluid_pipe" },
            G: { item: "milf:bronze_glass" },
            F: { item: "milf:small_copper_fluid_container" },
            I: { item: "moderndynamics:item_pipe" }
        },
        outputItems: [[{ id: "extended_industrialization:bronze_bending_machine" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BRONZE_BITS,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //large_steam_furnace
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceCorners("c").workspacePlus("C"),
            ['   ',' f ','   '].workspaceCorners("c").workspaceSides("C"),
            ['   ','   ','   '].workspaceCorners("c").workspacePlus("P")
        ],
        key: {
            c: { item: "modern_industrialization:bronze_curved_plate" },
            P: { item: "modern_industrialization:fire_clay_bricks" },
            f: { item: "modern_industrialization:bronze_mi_furnace" },
            C: { item: "modern_industrialization:bronze_machine_casing_pipe" }
        },
        outputItems: [[{ id: "mi_tweaks:advanced_large_steam_furnace" }, 1]],
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //large_steam_macerator
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceCorners("c").workspacePlus("C"),
            ['   ',' f ','   '].workspaceCorners("c").workspaceSides("C"),
            ['   ','   ','   '].workspaceCorners("c").workspacePlus("P")
        ],
        key: {
            c: { item: "modern_industrialization:bronze_curved_plate" },
            P: { item: "modern_industrialization:bronze_plated_bricks" },
            f: { item: "modern_industrialization:bronze_macerator" },
            C: { item: "modern_industrialization:bronze_machine_casing_pipe" }
        },
        outputItems: [[{ id: "extended_industrialization:large_steam_macerator" }, 1]],
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //Large steam boiler
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceCorners("c").workspacePlus("C").workspaceCenter("a"),
            ['   ',' f ','   '].workspaceCorners("c").workspaceSides("C"),
            ['   ','   ','   '].workspaceCorners("c").workspacePlus("P")
        ],
        key: {
            c: { item: "modern_industrialization:bronze_curved_plate" },
            P: { item: "modern_industrialization:fire_clay_bricks" },
            f: { item: "modern_industrialization:bronze_boiler" },
            C: { item: "modern_industrialization:bronze_plated_bricks" },
            a: { item: "modern_industrialization:analog_circuit" }
        },
        outputItems: [[{ id: "modern_industrialization:large_steam_boiler" }, 1]],
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //Steam farmer
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceCorners("c").workspacePlus("C").workspaceCenter("a"),
            ['   ',' f ','   '].workspaceCorners("c").workspaceSides("C"),
            ['   ','   ','   '].workspaceCorners("c").workspacePlus("P")
        ],
        key: {
            c: { item: "modern_industrialization:bronze_curved_plate" },
            P: { item: "modern_industrialization:bronze_plated_bricks" },
            f: { item: "extended_industrialization:steel_combine" },
            C: { item: "modern_industrialization:bronze_machine_casing_pipe" },
            a: { item: "modern_industrialization:analog_circuit" }
        },
        outputItems: [[{ id: "extended_industrialization:steam_farmer" }, 1]],
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //#endregion

    //#region steel machines

    function steelMachineUpgrade(base, output){
        yTechWorkspaceRecipe(event, {
            pattern: [
                ['   ','   ','   '],
                ['   ','   ','   '].workspaceFull("M").workspaceFront("G").workspaceCenter("B").workspaceBack("P"),
                ['   ','   ','   '].workspacePlus("P").workspaceCorners("M")
            ],
            key: {
                B: { item: base }
            },
            outputItems: [[{ id: output }, 1]],
            materialset: WORKSPACE_MATERIALSETS.STEEL_UPGRADE,
            tool: wrench,
            removeRecipe: true,
            miCompatMachine:"modern_industrialization:packer"
        })
    }

    //furnace
    steelMachineUpgrade("modern_industrialization:bronze_mi_furnace", "modern_industrialization:steel_mi_furnace")
    //boiler
    steelMachineUpgrade("modern_industrialization:bronze_boiler", "modern_industrialization:steel_boiler")
    //solar_boiler
    steelMachineUpgrade("extended_industrialization:bronze_solar_boiler", "extended_industrialization:steel_solar_boiler")
    //macerator
    steelMachineUpgrade("modern_industrialization:bronze_macerator", "modern_industrialization:steel_macerator")
    //cutting_machine
    steelMachineUpgrade("modern_industrialization:bronze_cutting_machine", "modern_industrialization:steel_cutting_machine")
    //water_pump
    steelMachineUpgrade("modern_industrialization:bronze_water_pump", "modern_industrialization:steel_water_pump")
    //bending_machine
    steelMachineUpgrade("extended_industrialization:bronze_bending_machine", "extended_industrialization:steel_bending_machine")
    //mixer
    steelMachineUpgrade("modern_industrialization:bronze_mixer", "modern_industrialization:steel_mixer")
    //waste_collector
    steelMachineUpgrade("extended_industrialization:bronze_waste_collector", "extended_industrialization:steel_waste_collector")
    //compressor
    steelMachineUpgrade("modern_industrialization:bronze_compressor", "modern_industrialization:steel_compressor")
    //composter
    steelMachineUpgrade("extended_industrialization:bronze_composter", "extended_industrialization:steel_composter")

    //honey_extractor
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceFull("M").workspaceSides("g").workspaceCorners(" "),
            ['   ','   ','   '].workspaceFull("M").workspaceSides("G").workspaceFront("R").workspaceCenter(" "),
            ['   ','   ','   '].workspaceFull("M").workspacePlus("P").workspaceCenter("F")
        ],
        key: {
            R: { item: "modern_industrialization:tin_rotor" },
            g: { item: "modern_industrialization:bronze_gear" },
            P: { item: "immersiveengineering:fluid_pipe" },
            G: { item: "milf:steel_infused_glass" },
            F: { item: "milf:small_steel_fluid_container" }
        },
        outputItems: [[{ id: "extended_industrialization:steel_honey_extractor" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.STEEL_BITS,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //wiremill
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceFull("M").workspaceCorners("R").workspaceCenter(" "),
            ['   ','   ','   '].workspaceFull("M").workspaceCorners("g").workspaceCenter(" ").workspaceFront("G").workspaceBack("I"),
            ['   ','   ','   '].workspaceFull("M").workspacePlus("P").workspaceCenter("F")
        ],
        key: {
            R: { item: "modern_industrialization:bronze_rotor" },
            g: { item: "modern_industrialization:bronze_gear" },
            P: { item: "immersiveengineering:fluid_pipe" },
            G: { item: "milf:steel_infused_glass" },
            F: { item: "milf:small_steel_fluid_container" },
            I: { item: "moderndynamics:item_pipe" }
        },
        outputItems: [[{ id: "modern_industrialization:steel_wiremill" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.STEEL_BITS,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //alloy_smelter
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceFull("M").workspaceCorners("w").workspaceCenter(" "),
            ['   ','   ','   '].workspaceFull("M").workspaceCorners("w").workspaceCenter("A").workspaceFront("G").workspaceBack("I"),
            ['   ','   ','   '].workspaceFull("M").workspacePlus("P").workspaceCenter("F")
        ],
        key: {
            w: { item: "modern_industrialization:cupronickel_wire" },
            A: { item: "ytech:primitive_alloy_smelter" },
            P: { item: "immersiveengineering:fluid_pipe" },
            G: { item: "milf:steel_infused_glass" },
            F: { item: "milf:small_steel_fluid_container" },
            I: { item: "moderndynamics:item_pipe" }
        },
        outputItems: [[{ id: "extended_industrialization:steel_alloy_smelter" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.STEEL_BITS,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //packer
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceFull("M").workspaceCorners("g").workspaceCenter("M"),
            ['   ','   ','   '].workspaceFull("M").workspaceCorners("g").workspaceSides("p").workspaceCenter(" ").workspaceFront("G").workspaceBack("M"),
            ['   ','   ','   '].workspaceFull("M").workspacePlus("P").workspaceCenter("F")
        ],
        key: {
            g: { item: "modern_industrialization:bronze_gear" },
            p: { item: "minecraft:piston" },
            P: { item: "immersiveengineering:fluid_pipe" },
            G: { item: "milf:steel_infused_glass" },
            F: { item: "milf:small_steel_fluid_container" }
        },
        outputItems: [[{ id: "modern_industrialization:steel_packer" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.STEEL_BITS,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //unpacker
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceFull("M").workspaceCorners("g").workspaceCenter("M"),
            ['   ','   ','   '].workspaceFull("M").workspaceCorners("g").workspaceSides("p").workspaceCenter(" ").workspaceFront("G").workspaceBack("M"),
            ['   ','   ','   '].workspaceFull("M").workspacePlus("P").workspaceCenter("F")
        ],
        key: {
            g: { item: "modern_industrialization:bronze_gear" },
            p: { item: "minecraft:sticky_piston" },
            P: { item: "immersiveengineering:fluid_pipe" },
            G: { item: "milf:steel_infused_glass" },
            F: { item: "milf:small_steel_fluid_container" }
        },
        outputItems: [[{ id: "modern_industrialization:steel_unpacker" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.STEEL_BITS,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //large tank
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceFull("M").workspacePlus("P").workspaceCenter("M"),
            ['   ','   ','   '].workspaceFull("M").workspaceSides("T").workspaceCenter(" ").workspaceCorners(" "),
            ['   ','   ','   '].workspaceFull("M").workspacePlus("P").workspaceCenter("M")
        ],
        key: {
            P: { item: "immersiveengineering:fluid_pipe" },
            T: { item: "modern_industrialization:steel_tank" }
        },
        outputItems: [[{ id: "modern_industrialization:large_tank" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.STEEL_BITS,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //large tank hatch
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceFull("M").workspacePlus("P").workspaceCenter("M"),
            ['   ','   ','   '].workspaceFull("M").workspaceSides("P").workspaceCenter("T").workspaceCorners(" "),
            ['   ','   ','   '].workspaceFull("M").workspacePlus("P").workspaceCenter("M")
        ],
        key: {
            P: { item: "immersiveengineering:fluid_pipe" },
            T: { item: "modern_industrialization:steel_tank" }
        },
        outputItems: [[{ id: "modern_industrialization:large_tank_hatch" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.STEEL_BITS,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //configurable chest
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspacePlus("M"),
            ['   ','   ','   '].workspaceCenter("C").workspaceSides("H"),
            ['   ','   ','   '].workspacePlus("M")
        ],
        key: {
            H: { item: "moderndynamics:item_pipe" },
            C: { item: "modern_industrialization:analog_circuit" }
        },
        outputItems: [[{ id: "modern_industrialization:configurable_chest" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.STEEL_BITS,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //large configurable chest
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspacePlus("M"),
            ['   ','   ','   '].workspaceCenter("C").workspaceSides("H"),
            ['   ','   ','   '].workspacePlus("M"),
        ],
        key: {
            H: { item: "moderndynamics:item_pipe" },
            C: { item: "modern_industrialization:configurable_chest" }
        },
        outputItems: [[{ id: "extended_industrialization:large_configurable_chest" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.STEEL_BITS,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //#endregion

    //#region MI basic machines

    //polarizer
    yTechWorkspaceRecipe(event, {
        pattern: [
            [' W ','I I',' W '].workspaceCorners("I").workspaceCenter("c"),
            ['   ','   ','   '].workspaceFull("M").workspaceFront("G").workspaceCenter(" ").workspaceBack("i"),
            ['   ','   ','   '].workspaceCorners("M").workspacePlus("C").workspaceCenter("B")
        ],
        key: {
            I: { item: "modern_industrialization:inductor" },
            W: { item: "modern_industrialization:tin_wire" },
            c: { item: "modern_industrialization:analog_circuit" },
            i: { item: "moderndynamics:item_pipe" }
        },
        outputItems: [[{ id: "modern_industrialization:polarizer" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BASIC,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //assembler
    yTechWorkspaceRecipe(event, {
        pattern: [
            [' W ','I I',' W '].workspaceCenter("c").workspaceCorners("A"),
            ['   ','   ','   '].workspaceFull("M").workspaceLeft("D").workspaceFront("G").workspaceCenter(" "),
            ['   ','   ','   '].workspaceCorners("M").workspacePlus("C").workspaceCenter("B")
        ],
        key: {
            D: { item: "milf:cd_reader" },
            A: { item: "modern_industrialization:robot_arm" },
            I: { item: "milf:rangefinder" },
            W: { item: "modern_industrialization:conveyor" },
            c: { item: "modern_industrialization:analog_circuit" }
        },
        outputItems: [[{ id: "modern_industrialization:assembler" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BASIC,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //wiremill
    yTechWorkspaceRecipe(event, {
        pattern: [
            [' c ','I I',' c '].workspaceCenter("m").workspaceCorners("A"),
            ['   ','   ','   '].workspaceFull("M").workspaceFront("G").workspaceCenter(" ").workspaceBack("i"),
            ['   ','   ','   '].workspaceCorners("M").workspacePlus("C").workspaceCenter("B")
        ],
        key: {
            A: { item: "modern_industrialization:aluminum_blade" },
            I: { item: "modern_industrialization:steel_rod_magnetic" },
            c: { item: "modern_industrialization:analog_circuit" },
            m: { item: "immersiveengineering:mold_wire" },
            i: { item: "moderndynamics:item_pipe" }
        },
        outputItems: [[{ id: "modern_industrialization:electric_wiremill" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BASIC,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //mixer
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceCenter("G").workspaceCorners("A").workspaceSides("w"),
            ['   ','   ','   '].workspaceFull("M").workspaceSides("G").workspaceCenter("r"),
            ['   ','   ','   '].workspaceCorners("M").workspacePlus("C").workspaceCenter("B")
        ],
        key: {
            A: { item: "modern_industrialization:motor" },
            w: { item: "modern_industrialization:tin_wire" },
            r: { item: "modern_industrialization:aluminum_rotor" }
        },
        outputItems: [[{ id: "modern_industrialization:electric_mixer" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BASIC,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //cutting_machine
    yTechWorkspaceRecipe(event, {
        pattern: [
            [' c ','w w',' c '].workspaceCenter("c").workspaceCorners("A"),
            ['   ','   ','   '].workspaceFull("M").workspaceFront("G").workspaceCenter("r").workspaceBack("I"),
            ['   ','   ','   '].workspaceCorners("M").workspacePlus("C").workspaceCenter("B")
        ],
        key: {
            A: { item: "modern_industrialization:motor" },
            w: { item: "modern_industrialization:analog_circuit" },
            c: { item: "modern_industrialization:conveyor" },
            r: { item: "modern_industrialization:invar_rotary_blade" },
            I: { item: "moderndynamics:item_pipe" }
        },
        outputItems: [[{ id: "modern_industrialization:electric_cutting_machine" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BASIC,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //packer
    yTechWorkspaceRecipe(event, {
        pattern: [
            [' c ','w w',' c '].workspaceCenter("p").workspaceCorners("A"),
            ['   ','   ','   '].workspaceFull("M").workspaceFront("G").workspaceCenter(" ").workspaceBack("I"),
            ['   ','   ','   '].workspaceCorners("M").workspacePlus("C").workspaceCenter("B")
        ],
        key: {
            A: { item: "modern_industrialization:piston" },
            w: { item: "modern_industrialization:analog_circuit" },
            p: { item: "modern_industrialization:motor" },
            c: { item: "modern_industrialization:tin_wire" },
            I: { item: "moderndynamics:item_pipe" }
        },
        outputItems: [[{ id: "modern_industrialization:electric_packer" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BASIC,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //furnace
    yTechWorkspaceRecipe(event, {
        pattern: [
            [' c ','w w',' c '].workspaceCenter("p").workspaceCorners("c"),
            ['   ','   ','   '].workspaceFull("M").workspaceFront("G").workspaceCenter(" ").workspaceBack("I"),
            ['   ','   ','   '].workspaceCorners("M").workspacePlus("C").workspaceCenter("B")
        ],
        key: {
            w: { item: "modern_industrialization:analog_circuit" },
            p: { item: "modern_industrialization:motor" },
            c: { item: "modern_industrialization:cupronickel_wire_magnetic" },
            I: { item: "moderndynamics:item_pipe" }
        },
        outputItems: [[{ id: "modern_industrialization:electric_mi_furnace" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BASIC,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //brewery
    yTechWorkspaceRecipe(event, {
        pattern: [
            [' c ','w w',' c '].workspaceCenter("r").workspaceCorners("g"),
            ['   ','   ','   '].workspaceFull("M").workspaceSides("G").workspaceCenter("r"),
            ['   ','   ','   '].workspaceCorners("M").workspacePlus("C").workspaceCenter("B")
        ],
        key: {
            g: { item: "minecraft:glass_bottle" },
            r: { item: "minecraft:blaze_rod" },
            w: { item: "modern_industrialization:analog_circuit" },
            c: { item: "modern_industrialization:pump" }
        },
        outputItems: [[{ id: "extended_industrialization:electric_brewery" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BASIC,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //waste_collector
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceCenter("R").workspaceCorners("r").workspaceSides("r"),
            ['   ','   ','   '].workspaceFull("M").workspaceSides("G").workspaceCenter("c"),
            ['   ','   ','   '].workspaceCorners("M").workspacePlus("C").workspaceCenter("B")
        ],
        key: {
            r: { tag: "c:rods/steel" },
            R: { item: "modern_industrialization:tin_rotor" },
            c: { item: "modern_industrialization:pump" }
        },
        outputItems: [[{ id: "extended_industrialization:electric_waste_collector" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BASIC,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //honey_extractor
    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceCenter("G").workspaceLeft("w").workspaceRight("w").workspaceFront("c").workspaceBack("c"),
            ['   ','   ','   '].workspaceFull("M").workspaceSides("G").workspaceCenter(" ").workspaceFront("R"),
            ['   ','   ','   '].workspaceCorners("M").workspacePlus("C").workspaceCenter("B")
        ],
        key: {
            w: { item: "modern_industrialization:analog_circuit" },
            R: { item: "modern_industrialization:tin_rotor" },
            c: { item: "modern_industrialization:pump" }
        },
        outputItems: [[{ id: "extended_industrialization:electric_honey_extractor" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BASIC,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //unpacker
    yTechWorkspaceRecipe(event, {
        pattern: [
            [' c ','w w',' c '].workspaceCenter("p").workspaceCorners("A"),
            ['   ','   ','   '].workspaceFull("M").workspaceFront("G").workspaceCenter("m").workspaceBack("I"),
            ['   ','   ','   '].workspaceCorners("M").workspacePlus("C").workspaceCenter("B")
        ],
        key: {
            m: { item: "immersiveengineering:mold_unpacking" },
            A: { item: "modern_industrialization:piston" },
            w: { item: "modern_industrialization:analog_circuit" },
            p: { item: "modern_industrialization:motor" },
            c: { item: "modern_industrialization:tin_wire" },
            I: { item: "moderndynamics:item_pipe" }
        },
        outputItems: [[{ id: "modern_industrialization:electric_unpacker" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BASIC,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //composter
    yTechWorkspaceRecipe(event, {
        pattern: [
            [' c ','w w',' A '].workspaceCenter("p").workspaceCorners("W"),
            ['   ','   ','   '].workspaceFull("M").workspaceFront("G").workspaceCenter("m").workspaceBack("I"),
            ['   ','   ','   '].workspaceCorners("M").workspacePlus("C").workspaceCenter("B")
        ],
        key: {
            m: { item: "minecraft:composter" },
            A: { item: "modern_industrialization:motor" },
            w: { item: "modern_industrialization:analog_circuit" },
            p: { item: "modern_industrialization:tin_rotor" },
            c: { item: "modern_industrialization:pump" },
            W: { item: "modern_industrialization:tin_wire" },
            I: { item: "moderndynamics:item_pipe" }
        },
        outputItems: [[{ id: "extended_industrialization:electric_composter" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BASIC,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //bending_machine
    yTechWorkspaceRecipe(event, {
        pattern: [
            [' A ','w w',' A '].workspaceCenter("p").workspaceCorners("W"),
            ['   ','   ','   '].workspaceFull("M").workspaceFront("G").workspaceCenter(" ").workspaceBack("I"),
            ['   ','   ','   '].workspaceCorners("M").workspacePlus("C").workspaceCenter("B")
        ],
        key: {
            p: { item: "modern_industrialization:motor" },
            A: { item: "modern_industrialization:piston" },
            w: { item: "modern_industrialization:analog_circuit" },
            W: { item: "modern_industrialization:steel_ring" },
            I: { item: "moderndynamics:item_pipe" }
        },
        outputItems: [[{ id: "extended_industrialization:electric_bending_machine" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BASIC,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //compressor
    yTechWorkspaceRecipe(event, {
        pattern: [
            [' p ','w w',' p '].workspaceCenter("W").workspaceCorners("A"),
            ['   ','   ','   '].workspaceFull("M").workspaceFront("G").workspaceCenter(" ").workspaceBack("I"),
            ['   ','   ','   '].workspaceCorners("M").workspacePlus("C").workspaceCenter("B")
        ],
        key: {
            p: { item: "modern_industrialization:motor" },
            A: { item: "modern_industrialization:piston" },
            w: { item: "modern_industrialization:analog_circuit" },
            W: { item: "modern_industrialization:tin_wire" },
            I: { item: "moderndynamics:item_pipe" }
        },
        outputItems: [[{ id: "modern_industrialization:electric_compressor" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BASIC,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //alloy_smelter
    yTechWorkspaceRecipe(event, {
        pattern: [
            [' r ','w w',' r '].workspaceCenter("p").workspaceCorners("c"),
            ['   ','   ','   '].workspaceFull("M").workspaceFront("G").workspaceCenter(" ").workspaceBack("I"),
            ['   ','   ','   '].workspaceCorners("M").workspacePlus("C").workspaceCenter("B")
        ],
        key: {
            r: { item: "modern_industrialization:tin_rotor" },
            w: { item: "modern_industrialization:analog_circuit" },
            p: { item: "modern_industrialization:motor" },
            c: { item: "modern_industrialization:cupronickel_wire_magnetic" },
            I: { item: "moderndynamics:item_pipe" }
        },
        outputItems: [[{ id: "extended_industrialization:electric_alloy_smelter" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BASIC,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //water_pump
    yTechWorkspaceRecipe(event, {
        pattern: [
            [' p ','w w',' p '].workspaceCenter("r").workspaceCorners("c"),
            ['   ','   ','   '].workspaceFull("M").workspaceFront("G").workspaceCenter(" ").workspaceBack("I"),
            ['   ','   ','   '].workspaceCorners("M").workspacePlus("C").workspaceCenter("B")
        ],
        key: {
            r: { item: "modern_industrialization:tin_rotor" },
            w: { item: "modern_industrialization:analog_circuit" },
            p: { item: "modern_industrialization:motor" },
            c: { item: "modern_industrialization:pump" },
            I: { item: "moderndynamics:fluid_pipe" }
        },
        outputItems: [[{ id: "modern_industrialization:electric_water_pump" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BASIC,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //macerator
    yTechWorkspaceRecipe(event, {
        pattern: [
            [' p ','w w',' p '].workspaceCenter("r").workspaceCorners("p"),
            ['   ','   ','   '].workspaceFull("M").workspaceFront("G").workspaceCenter(" ").workspaceBack("I"),
            ['   ','   ','   '].workspaceCorners("M").workspacePlus("C").workspaceCenter("B")
        ],
        key: {
            r: { item: "modern_industrialization:invar_rotary_blade" },
            w: { item: "modern_industrialization:analog_circuit" },
            p: { item: "modern_industrialization:motor" },
            I: { item: "moderndynamics:item_pipe" }
        },
        outputItems: [[{ id: "modern_industrialization:electric_macerator" }, 1]],
        materialset: WORKSPACE_MATERIALSETS.BASIC,
        tool: wrench,
        removeRecipe: true,
        miCompatMachine:packer
    })

    //#endregion

    //#region misc

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['WWW','WTW','WWW'],
            ['   ',' B ','   '].workspaceCorners("S").workspaceSides("b"),
            ['   ','   ','   '].workspaceCorners("S")
        ],
        key: {
            S: { item: "immersiveengineering:stick_treated" },
            T: { item: "craftingstation:crafting_station_slab" },
            W: { tag: "immersiveengineering:treated_wood_slab" },
            B: { item: "immersiveengineering:wooden_barrel" },
            b: { item: "milf:steel_machine_bit" }
        },
        outputItems: [[{ id: "immersiveengineering:craftingtable" }, 1]],
        tool: wrench,
        removeRecipe: true
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceCenter("S").workspaceCorners("R").workspaceSides("P"),
            ['   ','   ','   '].workspaceSides("S").workspaceCorners("R").workspaceCenter(" ").workspaceSides("M").workspaceFront(" ").workspaceBack("C"),
            ['   ','   ','   '].workspaceCenter("S").workspaceCorners("R").workspaceSides("P")
        ],
        key: {
            S: { tag: "immersiveengineering:treated_wood" },
            R: { item: "modern_industrialization:steel_rod" },
            P: { item: "modern_industrialization:steel_plate" },
            C: { item: "immersiveengineering:component_electronic" },
            M: { item: "milf:basic_motor" },
        },
        outputItems: [[{ id: "mi_tweaks:multiblock_packer_3000_safety_regulations_edition" }, 1]],
        tool: { item: "immersiveengineering:hammer" },
        miCompatMachine:packer,
        removeRecipe: true
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceCenter("S").workspaceCorners("R").workspaceSides("P"),
            ['   ','   ','   '].workspaceSides("S").workspaceCorners("R").workspaceCenter("C"),
            ['   ','   ','   '].workspaceCenter("S").workspaceCorners("R").workspaceSides("P")
        ],
        key: {
            S: { item: "modern_industrialization:fire_clay_bricks" },
            R: { item: "modern_industrialization:steel_rod" },
            P: { item: "modern_industrialization:steel_plate" },
            C: { item: "extended_industrialization:steel_alloy_smelter" }
        },
        outputItems: [[{ id: "mi_tweaks:advanced_steam_alloy_smelter" }, 1]],
        miCompatMachine:packer,
        tool: wrench,
        removeRecipe: true
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceCenter("S").workspaceCorners("R").workspaceSides("P"),
            ['   ','   ','   '].workspaceSides("S").workspaceCorners("R").workspaceCenter("C"),
            ['   ','   ','   '].workspaceCenter("S").workspaceCorners("R").workspaceSides("P")
        ],
        key: {
            S: { item: "modern_industrialization:fire_clay_bricks" },
            R: { item: "modern_industrialization:steel_rod" },
            P: { item: "modern_industrialization:steel_plate" },
            C: { item: "modern_industrialization:steam_blast_furnace" }
        },
        outputItems: [[{ id: "mi_tweaks:advanced_steam_blast_furnace" }, 1]],
        miCompatMachine:packer,
        tool: wrench,
        removeRecipe: true
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            [' B ',' B ',' B '],
            ['   ',' I ','   '],
            ['   ',' P ','   '].workspaceCorners("b").workspaceSides("R")
        ],
        key: {
            B: { item: "minecraft:iron_block" },
            I: { tag: "c:ingots/iron" },
            b: { tag: "c:bolts/iron" },
            R: { tag: "c:rods/iron" },
            P: { item: "minecraft:heavy_weighted_pressure_plate" }
        },
        outputItems: [[{ id: "minecraft:anvil" }, 1]],
        tool: { tag: "c:hammers" },
        removeRecipe: true
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceFull("I"),
            ['   ',' P ','   '],
            ['   ',' B ','   '].workspaceCorners("I").workspaceSides("I")
        ],
        key: {
            B: { item: "minecraft:iron_block" },
            I: { tag: "c:ingots/iron" },
            P: { item: "minecraft:heavy_weighted_pressure_plate" }
        },
        outputItems: [[{ id: "modern_industrialization:forge_hammer" }, 1]],
        tool: { tag: "c:hammers" },
        removeRecipe: true
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ',' B ','   '].workspaceCorners("I").workspaceSides("I"),
            ['   ',' I ','   '],
            [' B ','BBB',' B ']
        ],
        key: {
            B: { item: "modern_industrialization:bronze_block" },
            I: { tag: "c:ingots/bronze" }
        },
        outputItems: [[{ id: "ytech:bronze_anvil" }, 1]],
        tool: { tag: "c:hammers" },
        removeRecipe: true
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceFull("I").workspaceCenter("W"),
            ['   ','   ','   '].workspaceFull("I").workspaceSides("W").workspaceFront(" ").workspaceCenter("c"),
            ['   ','   ','   '].workspaceFull("I").workspaceCenter("W")
        ],
        key: {
            I: { item: "immersiveengineering:sheetmetal_aluminum" },
            W: { item: "immersiveengineering:graphite_electrode" },
            c: { item: "modern_industrialization:analog_circuit" }
        },
        outputItems: [[{ id: "modern_industrialization:desalter" }, 1]],
        miCompatMachine:packer,
        tool: { item: "immersiveengineering:hammer" },
        removeRecipe: true
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceFull("I").workspaceCenter("W"),
            ['   ','   ','   '].workspaceFull("I").workspaceSides("W").workspaceFront(" ").workspaceCenter("c"),
            ['   ','   ','   '].workspaceFull("I").workspaceCenter("W")
        ],
        key: {
            I: { item: "immersiveengineering:sheetmetal_steel" },
            W: { item: "immersiveengineering:sheetmetal_steel" },
            c: { item: "modern_industrialization:analog_circuit" }
        },
        outputItems: [[{ id: "modern_industrialization:steam_cracker" }, 1]],
        miCompatMachine:packer,
        tool: { item: "immersiveengineering:hammer" },
        removeRecipe: true
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceCenter("E"),
            ['   ','   ','   '].workspaceCorners("C").workspacePlus("G"),
            ['   ','   ','   '].workspaceFull("C")
        ],
        key: {
            E: { item: "transmog:void_fragment" },
            C: { item: "spectrum:citrine_block" },
            G: { item: "minecraft:glass" }
        },
        outputItems: [[{ id: "transmog:transmogrification_table" }, 1]],
        tool: { item: "milf:amber_visage" },
        removeRecipe: true,
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '],
            ['   ','   ','   '].workspaceCenter("S"),
            ['   ','   ','   '].workspaceFull("C").workspacePlus("s")
        ],
        key: {
            C: { item: "minecraft:cobblestone" },
            S: { item: "minecraft:stick" },
            s: { item: "minecraft:cobblestone_slab" }
        },
        outputItems: [[{ id: "hexerei:pestle_and_mortar" }, 1]],
        tool: anyTool,
        removeRecipe: true,
        compatOff: true
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceFull("S").workspaceCenter("H"),
            ['   ','   ','   '].workspaceFull("S").workspaceCenter("C").workspaceSides("B"),
            ['   ','   ','   '].workspaceFull("S").workspaceCenter("H")
        ],
        key: {
            C: { item: "modern_industrialization:analog_circuit" },
            H: { item: "minecraft:hopper" },
            B: { tag: "c:barrels" },
            S: { tag: "c:stones" }
        },
        outputItems: [[{ id: "sophisticatedstorage:controller" }, 1]],
        tool: wrench,
        removeRecipe: true
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceFull("S").workspaceCenter("H"),
            ['   ','   ','   '].workspaceFull("S").workspaceCenter("B").workspaceSides(" "),
            ['   ','   ','   '].workspaceFull("S").workspaceCenter("H")
        ],
        key: {
            H: { item: "minecraft:hopper" },
            B: { tag: "c:barrels" },
            S: { tag: "c:stones" }
        },
        outputItems: [[{ id: "sophisticatedstorage:storage_io" }, 1]],
        tool: wrench,
        removeRecipe: true
    })

    //#region YTech

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceCenter("L").workspaceSides("T"),
            ['   ','   ','   '].workspaceCenter("L").workspaceSides("T"),
            ['   ','   ','   '].workspaceFull("P")
        ],
        key: {
            P: { item: "minecraft:cobblestone" },
            L: { tag: "minecraft:logs" },
            T: { item: "ytech:grass_twine" }
        },
        outputItems: [[{ id: "ytech:tree_stump" }, 1]],
        tool: anyTool,
        removeRecipe: true,
        compatOff: true
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceCorners("T").workspaceSides("P"),
            ['   ','   ','   '].workspaceCorners("T").workspaceSides("P").workspaceFront(" "),
            ['   ','   ','   '].workspaceFull("C").workspaceCenter("F")
        ],
        key: {
            P: { item: "ytech:pebble" },
            T: { item: "ytech:grass_twine" },
            F: { item: "ytech:fire_pit" },
            C: { tag: "c:cobblestones" }
        },
        outputItems: [[{ id: "minecraft:furnace" }, 1]],
        tool: { tag: "c:hammers" },
        removeRecipe: true,
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ', '   ', '   '].workspaceFull("D"),
            ['   ', '   ', '   '].workspaceCorners("I").workspacePlus("P"),
            ['   ', '   ', '   '].workspaceCorners("I").workspacePlus("P")
        ],
        key: {
            D: { item: "modern_industrialization:iron_double_ingot" },
            I: { item: "minecraft:iron_block" },
            P: { tag: "minecraft:planks" }
        },
        outputItems: [[{ id: "minecraft:smithing_table" }, 1]],
        tool: { tag: "c:hammers" },
        removeRecipeType: "ytech:workspace_crafting"
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceFull("P").workspaceCenter(" ").workspaceCorners(" "),
            ['   ', '   ', '   '].workspaceFull("P").workspaceCenter(" ").workspaceFront("S").workspaceCorners(" "),
            ['   ', '   ', '   '].workspaceFull("C").workspaceCenter("F").workspaceFront("S").workspaceCorners("P")
        ],
        key: {
            P: { item: "minecraft:brick" },
            F: { item: "ytech:fire_pit" },
            C: { item: "minecraft:bricks" },
            S: { item: "minecraft:brick_slab" }
        },
        outputItems: [[{ id: "ytech:primitive_smelter" }, 1]],
        tool: { tag: "c:hammers" },
        removeRecipe: true,
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceSides("P"),
            ['   ','   ','   '].workspaceSides("P"),
            ['   ','   ','   '].workspaceSides("P")
        ],
        key: { P: { item: "minecraft:brick" } },
        outputItems: [[{ id: "ytech:brick_chimney" }, 1]],
        tool: { tag: "c:hammers" },
        removeRecipe: true,
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceSides("P"),
            ['   ','   ','   '].workspaceFull("P").workspaceSides("C").workspaceCenter(" ").workspaceFront("S"),
            ['   ','   ','   '].workspaceFull("C").workspaceCenter("F").workspaceFront("S").workspaceCorners("P")
        ],
        key: {
            P: { item: "minecraft:brick" },
            F: { item: "ytech:fire_pit" },
            C: { item: "minecraft:bricks" },
            S: { item: "minecraft:brick_slab" }
        },
        outputItems: [[{ id: "ytech:primitive_alloy_smelter" }, 1]],
        tool: { tag: "c:hammers" },
        removeRecipe: true,
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceFull("F").workspaceCenter(" "),
            ['   ','   ','   '].workspaceFull("P").workspaceCenter(" "),
            ['   ','   ','   '].workspaceFull("F").workspaceCenter(" ")
        ],
        key: {
            P: { item: "minecraft:brick" },
            F: { item: "modern_industrialization:fire_clay_brick" }
        },
        outputItems: [[{ id: "ytech:reinforced_brick_chimney" }, 1]],
        tool: { tag: "c:hammers" },
        removeRecipe: true,
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceFull("B").workspaceCenter("s").workspaceLeft("s").workspaceRight("s"),
            ['   ','   ','   '].workspaceFull("S").workspaceBack("B").workspaceFront("B").workspaceCenter("A"),
            ['   ','   ','   '].workspaceFull("B").workspaceCenter("s").workspaceLeft("s").workspaceRight("s")
        ],
        key: {
            B: { item: "ytech:terracotta_bricks" },
            A: { item: "ytech:terracotta_aqueduct" },
            S: { item: "minecraft:stick" },
            s: { item: "ytech:terracotta_brick_slab" }
        },
        outputItems: [[{ id: "ytech:aqueduct_valve" }, 1]],
        tool: { tag: "c:hammers" },
        removeRecipe: true,
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspacePlus("s").workspaceCorners("B").workspaceCenter(" "),
            ['   ','   ','   '].workspaceFull("S").workspaceCenter(" "),
            ['   ','   ','   '].workspacePlus("s").workspaceCorners("B")
        ],
        key: {
            B: { item: "ytech:grass_twine" },
            S: { item: "minecraft:stick" },
            s: { item: "ytech:terracotta_brick_slab" }
        },
        outputItems: [[{ id: "ytech:aqueduct_hydrator" }, 1]],
        tool: { tag: "c:hammers" },
        removeRecipe: true,
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '],
            ['   ','   ','   '].workspaceCenter("A"),
            ['   ','   ','   '].workspaceFull("B").workspaceCenter("S").workspaceLeft("s").workspaceRight("s")
        ],
        key: {
            B: { item: "ytech:terracotta_bricks" },
            A: { item: "ytech:aqueduct_hydrator" },
            S: { item: "ytech:wooden_box" },
            s: { item: "ytech:terracotta_aqueduct" }
        },
        outputItems: [[{ id: "ytech:aqueduct_fertilizer" }, 1]],
        tool: { tag: "c:hammers" },
        removeRecipe: true,
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '].workspaceFull("s"),
            ['   ','   ','   '].workspaceCenter("S"),
            ['   ','   ','   '].workspaceFull("s").workspaceCenter("S").workspaceSides("C").workspaceFront("T").workspaceBack("T")
        ],
        key: {
            s: { tag: "minecraft:wooden_slabs" },
            S: { item: "minecraft:stick" },
            C: { item: "minecraft:copper_ingot" },
            T: { item: "modern_industrialization:tin_ingot" }
        },
        outputItems: [[{ id: "ytech:potters_wheel" }, 1]],
        tool: { tag: "c:hammers" },
        removeRecipe: true,
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '],
            ['   ','   ','   '].workspaceFull(" ").workspaceCenter(" ").workspaceSides("L"),
            ['   ','   ','   '].workspaceFull("S").workspaceCenter("L").workspaceCorners(" ")
        ],
        key: { S: { tag: "minecraft:planks" } ,L: { tag: "minecraft:wooden_slabs" }},
        outputItems: [[{ id: "ytech:wooden_box" }, 1]],
        tool: anyTool,
        removeRecipe: true,
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ',' L ','   '],
            ['   ', ' S ', '   '].workspaceSides("s"),
            ['   ',' P ','   '].workspaceSides("s")
        ],
        key: {
            P: { tag: "minecraft:planks" },
            S: { item: "ytech:wooden_box" },
            L: { tag: "minecraft:wooden_slabs" },
            s: {item: "minecraft:stick"}
        },
        outputItems: [[{ id: "minecraft:chest" }, 1]],
        tool: { tag: "milf:knives" },
        removeRecipe: true,
        compatOff: true
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','   ','   '],
            ['   ',' L ','   '],
            ['   ','   ','   '].workspaceFull("s").workspaceCenter("S")
        ],
        key: {
            S: { item: "ytech:wooden_box" },
            L: { tag: "minecraft:wooden_slabs" },
            s: { item: "minecraft:stick" }
        },
        outputItems: [[{ id: "minecraft:barrel" }, 1]],
        tool: { tag: "milf:knives" },
        removeRecipe: true,
        compatOff: true
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','LTL','   '],
            ['   ','L L','   '],
            ['   ','L L','   ']
        ],
        key: {
            L: { tag: "milf:non_vanilla_logs" },
            T: { item: "ytech:grass_twine" }
        },
        outputItems: [[{ id: "ytech:oak_drying_rack" }, 1]],
        tool: { tag: "minecraft:axes" },
    })

    yTechWorkspaceRecipe(event, {
        pattern: [
            ['   ','LTL','   '],
            ['   ','L L','   '],
            ['   ','LTL','   ']
        ],
        key: {
            L: { tag: "milf:non_vanilla_logs" },
            T: { item: "ytech:grass_twine" }
        },
        outputItems: [[{ id: "ytech:oak_tanning_rack" }, 1]],
        tool: { tag: "minecraft:axes" },
    })

})