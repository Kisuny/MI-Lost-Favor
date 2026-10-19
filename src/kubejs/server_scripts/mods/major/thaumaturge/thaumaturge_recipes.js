const thaumIngredient = spec => typeof spec !== 'string' ? spec : spec.startsWith('#') ? { tag: spec.slice(1) } : { item: spec }
const thaumResult = spec => typeof spec === 'string' ? { id: spec, count: 1 } : Object.assign({ count: 1 }, spec)
const thaumAspects = spec => {
    const entries = Array.isArray(spec) ? spec.map(a => [a, 1]) : Object.entries(spec || {})
    return entries.map(([aspect, amount]) => ({ aspect: aspect.includes(':') ? aspect : `thaumaturge:${aspect}`, amount: amount }))
}
const thaumResearch = (recipe, args) => {
    if (!args.research) return
    recipe.research = { entry: args.research }
    if (args.stage !== undefined) recipe.research.stage = args.stage
}
const thaumAddRecipe = (event, recipe, args, types) => {
    if (args.removeRecipe && args.id) event.remove({ id: args.id })
    if (args.removeOutput && recipe.result) event.remove({ output: recipe.result.id })
    if (args.removeRecipeType && recipe.result) types.forEach(type => event.remove({ output: recipe.result.id, type: type }))
    const added = event.custom(recipe)
    if (args.id) added.id(args.id)
}

const customThaumDustTrigger = (event, args) => {
    const isTag = args.target.startsWith('#')
    const recipe = { type: isTag ? 'thaumaturge:dust_trigger_tag' : 'thaumaturge:dust_trigger_simple', result: thaumResult(args.result) }
    if (isTag) recipe.target_tag = args.target.slice(1)
    else recipe.target = args.target
    thaumResearch(recipe, args)
    thaumAddRecipe(event, recipe, args, ['thaumaturge:dust_trigger_tag', 'thaumaturge:dust_trigger_simple'])
}

const customThaumArcaneCraft = (event, args) => {
    const shaped = !!args.pattern
    const recipe = {
        type: shaped ? 'thaumaturge:arcane_workbench_shaped' : 'thaumaturge:arcane_workbench_shapeless',
        crystals: thaumAspects(args.crystals).map(c => c.amount === 1 ? { aspect: c.aspect } : c),
        vis: args.vis || 0,
        result: thaumResult(args.result)
    }
    if (shaped) {
        recipe.pattern = args.pattern
        recipe.key = {}
        Object.entries(args.key).forEach(([k, v]) => recipe.key[k] = thaumIngredient(v))
    } else {
        recipe.ingredients = args.ingredients.map(thaumIngredient)
    }
    thaumResearch(recipe, args)
    thaumAddRecipe(event, recipe, args, ['thaumaturge:arcane_workbench_shaped', 'thaumaturge:arcane_workbench_shapeless'])
}

const customThaumCrucible = (event, args) => {
    const recipe = {
        type: 'thaumaturge:crucible',
        catalyst: thaumIngredient(args.catalyst),
        aspects: thaumAspects(args.aspects),
        result: thaumResult(args.result)
    }
    thaumResearch(recipe, args)
    thaumAddRecipe(event, recipe, args, ['thaumaturge:crucible'])
}


const customThaumInfusion = (event, args) => {
    const recipe = {
        type: 'thaumaturge:infusion',
        catalyst: thaumIngredient(args.catalyst),
        components: (args.components || []).map(thaumIngredient),
        aspects: thaumAspects(args.aspects),
        // instability 0..100 (mod recipes use 1..10)
        instability: args.instability || 0
    }
    if (args.catalystPatch) recipe.catalyst_patch = args.catalystPatch
    else recipe.result = thaumResult(args.result)
    thaumResearch(recipe, args)
    thaumAddRecipe(event, recipe, args, ['thaumaturge:infusion'])
}

ServerEvents.recipes(event => {
    customThaumDustTrigger(event, {
        target: '#milf:pedestal_basic',
        result: 'thaumaturge:arcane_workbench',
        research: 'thaumaturge:first_steps',
        stage: 0,
        id: 'thaumaturge:dust_trigger/crafting_tables_to_arcane_workbench',
        removeRecipe: true
    })

    customThaumDustTrigger(event, {
        target: 'hexerei:mixing_cauldron',
        result: 'thaumaturge:crucible',
        research: 'thaumaturge:unlock_alchemy',
        stage: 0,
        id: 'thaumaturge:dust_trigger/cauldron_to_crucible',
        removeRecipe: true
    })

    customThaumArcaneCraft(event, {
        pattern: [
            ' S ',
            'SCS',
            ' S '
        ],
        key: {
            S: '#c:strings',
            C: 'hexerei:infused_fabric'
        },
        crystals: [],
        vis: 5,
        research: 'thaumaturge:unlock_infusion',
        result: 'thaumaturge:fabric',
        id: 'thaumaturge:arcane_workbench/fabric',
        removeRecipe: true
    })

    customThaumCrucible(event, {
        catalyst: '#c:ingots/steel',
        aspects: { praecantatio: 5, terra: 5 },
        research: 'thaumaturge:metallurgy',
        stage: 1,
        result: 'thaumaturge:ingot_thaumium',
        id: 'thaumaturge:crucible/ingot_thaumium',
        removeRecipe: true
    })

    customThaumCrucible(event, {
        catalyst: 'embers:dawnstone_ingot',
        aspects: { instrumentum: 5 },
        research: 'thaumaturge:metallurgy',
        stage: 0,
        result: 'thaumaturge:ingot_brass',
        id: 'thaumaturge:crucible/ingot_brass',
        removeRecipe: true
    })

    customThaumCrucible(event, {
        catalyst: 'supplementaries:soap',
        aspects: { cognitio: 75, alienis: 50, ordo: 75, victus: 50 },
        research: 'thaumaturge:sane_soap',
        result: 'thaumaturge:sanity_soap',
        id: 'thaumaturge:crucible/sanity_soap',
        removeRecipe: true
    })

    customThaumCrucible(event, {
        catalyst: 'spectrum:shimmerstone_gem',
        aspects: { potentia: 10, ignis: 10, lux: 10 },
        research: 'thaumaturge:unlock_alchemy',
        stage: 2,
        result: 'thaumaturge:nitor_yellow',
        id: 'thaumaturge:crucible/nitor_yellow',
        removeRecipe: true
    })

    event.remove({ id: 'thaumaturge:scribing_tools' })
    event.remove({ id: 'thaumaturge:scribing_tools_alt' })
    event.shapeless('thaumaturge:scribing_tools', ['thaumaturge:phial', 'supplementaries:antique_ink', '#c:feathers']).id('thaumaturge:scribing_tools')
    event.shapeless('thaumaturge:scribing_tools', ['minecraft:glass_bottle', 'supplementaries:antique_ink', '#c:feathers']).id('thaumaturge:scribing_tools_alt')

    const thaumReplacements = {
        'c:plates/iron': 'modern_industrialization:steel_plate',
        'c:gems/diamond': 'enchanted:attuned_stone_charged',
        'c:gems/quartz': 'spectrum:onyx_shard',
    }

    const thaumInputKeys = ['key', 'ingredients', 'catalyst', 'components']

    function patchThaumIngredients(node) {
        if (Array.isArray(node)) {
            return node.map(patchThaumIngredients).some(Boolean)
        }
        if (!node || typeof node !== 'object') return false

        let thaumNodeChanged = false
        const thaumReplacement = thaumReplacements[node.item] || thaumReplacements[node.tag]
        if (thaumReplacement) {
            delete node.tag
            node.item = thaumReplacement
            thaumNodeChanged = true
        }

        Object.values(node).forEach(child => {
            if (patchThaumIngredients(child)) thaumNodeChanged = true
        })
        return thaumNodeChanged
    }

    event.forEachRecipe({ mod: 'thaumaturge' }, recipe => {
        const thaumJson = JSON.parse(recipe.json)
        let thaumChanged = false
        thaumInputKeys.forEach(key => {
            if (patchThaumIngredients(thaumJson[key])) thaumChanged = true
        })
        if (thaumChanged) {
            event.remove({ id: recipe.getId() })
            // keep the id: Thaumonomicon pages link recipes by id
            event.custom(thaumJson).id(recipe.getId())
        }
    })


    //test examples 

    // customThaumArcaneCraft(event, {
    //     pattern: [
    //         'TDT',
    //         'DBD',
    //         'TDT'
    //     ],
    //     key: {
    //         T: 'thaumaturge:ingot_thaumium',
    //         D: 'thaumaturge:plank_greatwood',
    //         B: 'minecraft:dirt'
    //     },
    //     crystals: { aqua: 20, ordo: 10, terra: 10, ignis: 5 },
    //     vis: 45,
    //     research: 'thaumaturge:warded_arcana',
    //     result: 'minecraft:grass_block',
    //     id: 'thaumaturge:arcane_workbench/arcane_door', 
    //     removeRecipe: true
    // })

    // customThaumCrucible(event, {
    //     catalyst: '#c:nuggets/quartz',
    //     aspects: { aer: 2 },
    //     research: 'thaumaturge:base_alchemy',
    //     result: { 
    //         id: 'minecraft:grass_block', 
    //         count: 1, 
    //     }
    // })

    // customThaumInfusion(event, {
    //     catalyst: 'thaumaturge:ring_mundane',
    //     components: 
    //     [
    //         '#c:feathers', 
    //         'minecraft:dirt', 
    //         { type: 'neoforge:components', items: 'thaumaturge:essentia_crystal', components: { 'thaumaturge:crystal_aspect': { aspect: 'thaumaturge:aer' } } }
    //     ],
    //     aspects: { aer: 50 },
    //     instability: 50, // 0..100, see customThaumInfusion
    //     research: 'thaumaturge:cloud_ring',
    //     result: 'minecraft:grass_block'
    // })
})
