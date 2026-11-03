//priority 10

ServerEvents.recipes(event => {

    let changedItemIds = new $HashSet([
        "ytech:tool_rack"
    ])

    /**
     * @typedef {Object} WorkspaceRecipeArgs
     * @property {[string[], string[], string[]]} pattern
     * @property {Object.<string, any>} key
     * @property {Array<[{id: string}, number]>} outputItems
     * @property {Object} [materialset]
     * @property {ItemOrTagObject} [tool]
     * @property {boolean} [removeRecipe]
     * @property {string} [removeRecipeType]
     * @property {string} [miCompatMachine]
     * @property {boolean} [compatOff]
     */

    /**
     * @param {WorkspaceRecipeArgs} args
     */
    function yTechWorkspaceRecipe(event, args) {
        let recipe = {
            type: "ytech:workspace_crafting",
            key: Object.assign({}, args.key, args.materialset?.key),
            pattern: {
                top: args.pattern[0],
                middle: args.pattern[1],
                bottom: args.pattern[2]
            },
            result: Object.assign({}, args.outputItems[0][0], { count: args.outputItems[0][1] || 1 }),
            tool: args.tool || { tag: "c:hammers" }
        }
        if (!args.compatOff) {

            let itemInputs = getItemInputsFromShaped(args)

            if (args.materialset) {
                itemInputs.push(args.materialset.replaceWith)
            }
            if (args.miCompatMachine != "modern_industrialization:packer") {
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

    /**
     * @typedef {Object} PlaneBuilder
     * @property {string[]} plane
     * @property {function(): string[]} build
     * @property {function(string): PlaneBuilder} fill
     * @property {function(string, number): PlaneBuilder} row
     * @property {function(string, number, number): PlaneBuilder} one
     * @property {function(string): PlaneBuilder} corners
     * @property {function(string): PlaneBuilder} sides
     * @property {function(string): PlaneBuilder} center
     * @property {function(string): PlaneBuilder} front
     * @property {function(string): PlaneBuilder} right
     * @property {function(string): PlaneBuilder} left
     * @property {function(string): PlaneBuilder} back
     * @property {function(string): PlaneBuilder} plus
     * @property {function(string[]): PlaneBuilder} set
    */

    /**
     * @callback PlaneCallback
     * @param {PlaneBuilder} plane
     * @returns {void}
    */
    function WorkspaceRecipeBuilder(outputId) {

        this.key = {}

        this.args = {
            materialset: null,
            tool: { tag: "c:tools" },
            removeRecipe: true,
            miCompatMachine: "modern_industrialization:not_so_multi_but_still_block_packer_2099_3x3x3_edition"
        }

        this.pattern = [
            ['   ', '   ', '   '],
            ['   ', '   ', '   '],
            ['   ', '   ', '   ']
        ]
        /** @type {PlaneBuilder} */
        this.topPlaneBuilder = new PlaneBuilder()
        /** @type {PlaneBuilder} */
        this.middlePlaneBuilder = new PlaneBuilder()
        /** @type {PlaneBuilder} */
        this.bottomPlaneBuilder = new PlaneBuilder()

        /**
         * @param {PlaneCallback} callback
         * @returns {WorkspaceRecipeBuilder}
         */
        this.top = function (callback) {
            callback?.(this.topPlaneBuilder)
            return this
        }

        /**
         * @param {PlaneCallback} callback
         * @returns {WorkspaceRecipeBuilder}
         */
        this.middle = function (callback) {
            callback?.(this.middlePlaneBuilder)
            return this
        }

        /**
         * @param {PlaneCallback} callback
         * @returns {WorkspaceRecipeBuilder}
         */
        this.bottom = function (callback) {
            callback?.(this.bottomPlaneBuilder)
            return this
        }
        /**
         * @returns {WorkspaceRecipeBuilder}
         */
        this.setKey = function(key){
            this.key = key
            return this
        }
        /**
         * @returns {WorkspaceRecipeBuilder}
         * @param {WorkspaceRecipeArgs} args
         */
        this.setArgs = function(args){
            this.args = Object.assign({}, this.args, args)
            return this
        }

        this.build = function () {

            let args = Object.assign(
                {}, 
                {

                    pattern: [
                        this.topPlaneBuilder,
                        this.middlePlaneBuilder,
                        this.bottomPlaneBuilder
                    ].map(builder => builder.build()),

                    key: this.key,

                    outputItems: [[{ id: outputId }, 1]]

                }, 
                this.args
            )

            yTechWorkspaceRecipe(event, args)

            changedItemIds.add(outputId)

        }


        function PlaneBuilder() {
            this.plane = ['   ', '   ', '   ']

            this.build = function(){
                return this.plane
            },

            this.fill = function (letter) {
                this.plane.fill(letter.repeat(3))
                return this
            }

            this.row = function (letter, row) {
                this.plane.splice(row, 1, letter.repeat(3))
                return this
            }

            this.one = function (letter, row, index) {
                this.plane.splice(row, 1, this.plane[row].substring(0, index) + letter + this.plane[row].substring(index + 1))
                return this
            }

            this.corners = function (letter) {
                this.plane.splice(0, 1, letter + this.plane[0].substring(1, 2) + letter)
                this.plane.splice(2, 1, letter + this.plane[2].substring(1, 2) + letter)
                return this
            }

            this.sides = function (letter) {
                this.plane.splice(0, 1, this.plane[0].substring(0, 1) + letter + this.plane[0].substring(2, 3))
                this.plane.splice(1, 1, letter + this.plane[1].substring(1, 2) + letter)
                this.plane.splice(2, 1, this.plane[2].substring(0, 1) + letter + this.plane[2].substring(2, 3))
                return this
            }

            this.center = function (letter) {
                this.one(letter, 1, 1)
                return this
            }

            this.front = function (letter) {
                this.one(letter, 2, 1)
                return this
            }

            this.right = function (letter) {
                this.one(letter, 1, 0)
                return this
            }

            this.left = function (letter) {
                this.one(letter, 1, 2)
                return this
            }

            this.back = function (letter) {
                this.one(letter, 0, 1)
                return this
            }

            this.plus = function (letter) {
                this.one(letter, 0, 1)
                this.row(letter, 1)
                this.one(letter, 2, 1)
                return this
            }

            this.set = function (plane) {
                this.plane = plane
                return this
            }
        }

    }

    const wrench = { item: "modern_industrialization:wrench" }

    const WORKSPACE_MATERIALSETS = {
        BRONZE_BITS: {
            key: { M: { item: 'milf:bronze_machine_bit' } },
            replaceWith: [{ item: "modern_industrialization:bronze_machine_casing" }, 1]
        },

        STEEL_UPGRADE: {
            key: { M: { item: 'milf:steel_machine_bit' }, P: { item: "immersiveengineering:fluid_pipe" }, G: { item: 'milf:steel_infused_glass' } },
            replaceWith: [{ item: "modern_industrialization:steel_upgrade" }, 1]
        },
        STEEL_BITS: {
            key: { M: { item: 'milf:steel_machine_bit' } },
            replaceWith: [{ item: "modern_industrialization:steel_machine_casing" }, 1]
        },

        BASIC: {
            key: { M: { item: 'milf:basic_machine_bit' }, B: { item: "modern_industrialization:portable_storage_unit" }, G: { item: 'milf:tempered_glass' }, C: { item: 'modern_industrialization:tin_cable' } },
            replaceWith: [{ item: "modern_industrialization:basic_machine_hull" }, 1]
        },

        BASIC_BITS: {
            key: { M: { item: 'milf:basic_machine_bit' } },
            replaceWith: [{ item: "modern_industrialization:frostproof_machine_casing" }, 1]
        }
    }

    let builders = [ ]

    builders.push(
        new WorkspaceRecipeBuilder("mi_tweaks:advanced_large_steam_furnace")
            .top(plane => plane.corners("c").plus("C"))
            .middle(plane => plane.corners("c").sides("C").center("f"))
            .bottom(plane => plane.corners("c").plus("P"))
            .setKey({
                c: { item: "modern_industrialization:bronze_curved_plate" },
                P: { item: "modern_industrialization:fire_clay_bricks" },
                f: { item: "modern_industrialization:bronze_mi_furnace" },
                C: { item: "modern_industrialization:bronze_machine_casing_pipe" }
            })
            .setArgs({
                tool: wrench,
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("extended_industrialization:large_steam_macerator")
            .top(plane => plane.corners("c").plus("C"))
            .middle(plane => plane.corners("c").sides("C").center("f"))
            .bottom(plane => plane.corners("c").plus("P"))
            .setKey({
                c: { item: "modern_industrialization:bronze_curved_plate" },
                P: { item: "modern_industrialization:bronze_plated_bricks" },
                f: { item: "modern_industrialization:bronze_macerator" },
                C: { item: "modern_industrialization:bronze_machine_casing_pipe" }
            })
            .setArgs({
                tool: wrench,
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("modern_industrialization:large_steam_boiler")
            .top(plane => plane.corners("c").plus("C").center("a"))
            .middle(plane => plane.corners("c").sides("C").center("f"))
            .bottom(plane => plane.corners("c").plus("P"))
            .setKey({
                c: { item: "modern_industrialization:bronze_curved_plate" },
                P: { item: "modern_industrialization:fire_clay_bricks" },
                f: { item: "modern_industrialization:bronze_boiler" },
                C: { item: "modern_industrialization:bronze_plated_bricks" },
                a: { item: "modern_industrialization:analog_circuit" }
            })
            .setArgs({
                tool: wrench,
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("extended_industrialization:steam_farmer")
            .top(plane => plane.corners("c").plus("C").center("a"))
            .middle(plane => plane.corners("c").sides("C").center("f"))
            .bottom(plane => plane.corners("c").plus("P"))
            .setKey({
                c: { item: "modern_industrialization:bronze_curved_plate" },
                P: { item: "modern_industrialization:bronze_plated_bricks" },
                f: { item: "extended_industrialization:steel_combine" },
                C: { item: "modern_industrialization:bronze_machine_casing_pipe" },
                a: { item: "modern_industrialization:analog_circuit" }
            })
            .setArgs({
                tool: wrench,
            })
    )

    //#endregion

    //#region misc

    builders.push(
        new WorkspaceRecipeBuilder("mi_tweaks:multiblock_packer_3000_safety_regulations_edition")
            .top(plane => plane.center("S").corners("R").sides("P"))
            .middle(plane => plane.sides("S").corners("R").center(" ").sides("M").front(" ").back("C"))
            .bottom(plane => plane.center("S").corners("R").sides("P"))
            .setKey({
                S: { tag: "immersiveengineering:treated_wood" },
                R: { item: "modern_industrialization:steel_rod" },
                P: { item: "modern_industrialization:steel_plate" },
                C: { item: "immersiveengineering:component_electronic" },
                M: { item: "milf:basic_motor" },
            })
            .setArgs({
                tool: { item: "immersiveengineering:hammer" },
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("mi_tweaks:advanced_steam_alloy_smelter")
            .top(plane => plane.center("S").corners("R").sides("P"))
            .middle(plane => plane.sides("S").corners("R").center("C"))
            .bottom(plane => plane.center("S").corners("R").sides("P"))
            .setKey({
                S: { item: "modern_industrialization:fire_clay_bricks" },
                R: { item: "modern_industrialization:steel_rod" },
                P: { item: "modern_industrialization:steel_plate" },
                C: { item: "extended_industrialization:steel_alloy_smelter" }
            })
            .setArgs({
                tool: wrench
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("mi_tweaks:advanced_steam_blast_furnace")
            .top(plane => plane.center("S").corners("R").sides("P"))
            .middle(plane => plane.sides("S").corners("R").center("C"))
            .bottom(plane => plane.center("S").corners("R").sides("P"))
            .setKey({
                S: { item: "modern_industrialization:fire_clay_bricks" },
                R: { item: "modern_industrialization:steel_rod" },
                P: { item: "modern_industrialization:steel_plate" },
                C: { item: "modern_industrialization:steam_blast_furnace" }
            })
            .setArgs({
                tool: wrench
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("minecraft:anvil")
            .top(plane => plane.set([' B ', ' B ', ' B ']))
            .middle(plane => plane.center("I"))
            .bottom(plane => plane.center("I").corners("b").sides("R"))
            .setKey({
                B: { item: "modern_industrialization:iron_double_ingot" },
                I: { tag: "c:ingots/iron" },
                b: { item: "modern_industrialization:iron_bolt" },
                R: { item: "modern_industrialization:iron_rod" }
            })
            .setArgs({
                tool: { tag: "c:hammers" }
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("minecraft:crafting_table")
            .top(plane => plane.center("L"))
            .middle(plane => plane.sides("S").center("P"))
            .bottom(plane => plane.plus("P"))
            .setKey({
                L: { item: "minecraft:leather" },
                S: { item: "ytech:leather_strips" },
                P: { tag: "minecraft:planks" }
            })
            .setArgs({
                tool: { tag: "ytech:bone_needles" }
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("modern_industrialization:forge_hammer")
            .top(plane => plane.plus("I").center("B"))
            .middle(plane => plane.center("B"))
            .bottom(plane => plane.plus("I").center("B").corners("P"))
            .setKey({
                B: { item: "modern_industrialization:iron_double_ingot" },
                I: { item: "minecraft:iron_ingot" },
                P: { item: "embers:caminite_brick" }
            })
            .setArgs({
                tool: { tag: "c:hammers" }
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("transmog:transmogrification_table")
            .top(plane => plane.center("E"))
            .middle(plane => plane.corners("C").plus("G"))
            .bottom(plane => plane.fill("C"))
            .setKey({
                E: { item: "transmog:void_fragment" },
                C: { item: "spectrum:citrine_block" },
                G: { item: "minecraft:glass" }
            })
            .setArgs({
                tool: { item: "milf:amber_visage" }
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("hexerei:pestle_and_mortar")
            .middle(plane => plane.center("S"))
            .bottom(plane => plane.fill("C").plus("s"))
            .setKey({
                C: { item: "modern_industrialization:iron_double_ingot" },
                S: { item: "milf:stone_rod" },
                s: { item: "modern_industrialization:iron_plate" }
            })
    )

    //#endregion

    //#region YTech

    builders.push(
        new WorkspaceRecipeBuilder("minecraft:composter")
            .top(plane => plane.sides("S"))
            .middle(plane => plane.sides("S"))
            .bottom(plane => plane.plus("P"))
            .setKey({
                S: { item: "minecraft:stick" },
                P: { tag: "minecraft:planks" },
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("ytech:strainer")
            .top(plane => plane.sides("S"))
            .middle(plane => plane.sides("L").center("B"))
            .bottom(plane => plane.plus("L"))
            .setKey({
                S: { item: "minecraft:stick" },
                B: { item: "ytech:wooden_box" },
                L: { tag: "minecraft:logs" },
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("minecraft:stonecutter")
            .top(plane => plane)
            .middle(plane => plane.center("B"))
            .bottom(plane => plane.plus("S").sides("L"))
            .setKey({
                S: { item: "minecraft:smooth_stone" },
                B: { item: "ytech:iron_saw_blade" },
                L: { tag: "minecraft:logs" },
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("minecraft:grindstone")
            .top(plane => plane.set([' S ', ' S ', ' S ']))
            .middle(plane => plane.left("s").right("s").center("S").back("S").front("S"))
            .bottom(plane => plane.left("s").right("s"))
            .setKey({
                s: { item: "minecraft:stick" },
                S: { item: "minecraft:stone" },
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("ytech:millstone")
            .top(plane => plane.center("L"))
            .middle(plane => plane.plus("S").center("L"))
            .bottom(plane => plane.plus("S").center("L"))
            .setKey({
                S: { item: "minecraft:smooth_stone" },
                L: { tag: "minecraft:logs" },
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("ytech:tree_stump")
            .top(plane => plane.center("L").sides("T"))
            .middle(plane => plane.center("L").sides("T"))
            .bottom(plane => plane.fill("P"))
            .setKey({
                P: { item: "minecraft:cobblestone" },
                L: { tag: "minecraft:logs" },
                T: { item: "ytech:grass_twine" }
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("minecraft:furnace")
            .top(plane => plane.corners("T").sides("P"))
            .middle(plane => plane.corners("T").sides("P").front(" "))
            .bottom(plane => plane.fill("C").center("F"))
            .setKey({
                P: { item: "ytech:pebble" },
                T: { item: "ytech:grass_twine" },
                F: { item: "milf:fire_pit" },
                C: { tag: "c:cobblestones" }
            })
            .setArgs({
                tool: { tag: "c:hammers" }
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("minecraft:smithing_table")
            .top(plane => plane.fill("D"))
            .middle(plane => plane.corners("I").plus("P"))
            .bottom(plane => plane.corners("I").plus("P"))
            .setKey({
                D: { item: "modern_industrialization:iron_double_ingot" },
                I: { item: "minecraft:iron_block" },
                P: { tag: "minecraft:planks" }
            })
            .setArgs({
                tool: { tag: "c:hammers" },
                removeRecipe: false,
                removeRecipeType: "ytech:workspace_crafting"
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("ytech:aqueduct_valve")
            .top(plane => plane.fill("B").center("s").left("s").right("s"))
            .middle(plane => plane.fill("S").back("B").front("B").center("A"))
            .bottom(plane => plane.fill("B").center("s").left("s").right("s"))
            .setKey({
                B: { item: "ytech:terracotta_bricks" },
                A: { item: "ytech:terracotta_aqueduct" },
                S: { item: "minecraft:stick" },
                s: { item: "ytech:terracotta_brick_slab" }
            })
            .setArgs({
                tool: { tag: "c:hammers" }
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("ytech:aqueduct_hydrator")
            .top(plane => plane.plus("s").corners("B").center(" "))
            .middle(plane => plane.fill("S").center(" "))
            .bottom(plane => plane.plus("s").corners("B"))
            .setKey({
                B: { item: "ytech:grass_twine" },
                S: { item: "minecraft:stick" },
                s: { item: "ytech:terracotta_brick_slab" }
            })
            .setArgs({
                tool: { tag: "c:hammers" }
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("ytech:aqueduct_fertilizer")
            .middle(plane => plane.center("A"))
            .bottom(plane => plane.fill("B").center("S").left("s").right("s"))
            .setKey({
                B: { item: "ytech:terracotta_bricks" },
                A: { item: "ytech:aqueduct_hydrator" },
                S: { item: "ytech:wooden_box" },
                s: { item: "ytech:terracotta_aqueduct" }
            })
            .setArgs({
                tool: { tag: "c:hammers" }
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("ytech:potters_wheel")
            .top(plane => plane.fill("s"))
            .middle(plane => plane.center("S"))
            .bottom(plane => plane.fill("s").center("S").sides("C").front("T").back("T"))
            .setKey({
                s: { tag: "minecraft:wooden_slabs" },
                S: { item: "minecraft:stick" },
                C: { item: "minecraft:copper_ingot" },
                T: { item: "modern_industrialization:tin_ingot" }
            })
            .setArgs({
                tool: { tag: "c:hammers" }
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("ytech:wooden_box")
            .middle(plane => plane.sides("L"))
            .bottom(plane => plane.fill("S").center("L").corners(" "))
            .setKey({
                S: { tag: "minecraft:planks" },
                L: { tag: "minecraft:wooden_slabs" }
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("minecraft:chest")
            .top(plane => plane.center("L"))
            .middle(plane => plane.center("S").sides("s"))
            .bottom(plane => plane.center("P").sides("s"))
            .setKey({
                P: { tag: "minecraft:planks" },
                S: { item: "ytech:wooden_box" },
                L: { tag: "minecraft:wooden_slabs" },
                s: { item: "minecraft:stick" }
            })
            .setArgs({
                tool: { tag: "milf:knives" },
                compatOff: true
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("minecraft:barrel")
            .middle(plane => plane.center("L"))
            .bottom(plane => plane.fill("s").center("S"))
            .setKey({
                S: { item: "ytech:wooden_box" },
                L: { tag: "minecraft:wooden_slabs" },
                s: { item: "minecraft:stick" }
            })
            .setArgs({
                tool: { tag: "milf:knives" },
                compatOff: true
            })
    )

    builders.push(
        new WorkspaceRecipeBuilder("ytech:oak_tanning_rack")
            .top(plane => plane.set(['   ', 'LTL', '   ']))
            .middle(plane => plane.set(['   ', 'L L', '   ']))
            .bottom(plane => plane.set(['   ', 'LTL', '   ']))
            .setKey({
                L: { tag: "milf:non_vanilla_logs" },
                T: { item: "ytech:grass_twine" }
            })
            .setArgs({
                tool: { tag: "minecraft:axes" },
                removeRecipe: false
            })
    )

    //#endregion

    builders.forEach(builder => builder.build())

    event.forEachRecipe({ type: 'ytech:workspace_crafting' }, r => {
        let rjson = JSON.parse(r.json)

        let output = rjson.result

        if (!changedItemIds.contains(output.id)) {
            let {key, tool} = rjson
            let patternObject = rjson.pattern
            let pattern = [patternObject.top, patternObject.middle, patternObject.bottom]

            yTechWorkspaceRecipe(event, {
                pattern: pattern,
                key: key,
                tool: tool,
                outputItems: [[output]],
                removeRecipe: true,
                miCompatMachine: "modern_industrialization:not_so_multi_but_still_block_packer_2099_3x3x3_edition"
            })
        }

        //console.log(rjson)
        
    })

})