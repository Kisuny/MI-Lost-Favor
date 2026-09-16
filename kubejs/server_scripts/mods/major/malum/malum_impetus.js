// Still WIP 
// We need to consider a more reasonable number of spirits and their types, at the moment, they are all the same in most cases.
// I might have missed some types of metals as well, so it's worth double-checking everything
const defaultImpetusFocusing = {
    resultCount: 3,
    spirits: [
        { type: "malum:earthen", count: 2 },
        { type: "malum:infernal", count: 2 }
    ],
    time: 900,
    durabilityCost: 2
}

const impetusFocusingOverrides = {
    oblivion_alloy: {
        spirits: [
            { type: "malum:wicked", count: 2 },
            { type: "malum:sacred", count: 2 }
        ],
        time: 1800
    },
    pure_malachite: {
        time: 1800
    },
    pure_bloodstone: {
        time: 1800
    },
    pure_azurite: {
        time: 1800
    },
    platinum: {
        time: 1800
    },
    stainless_steel: {
        time: 1800
    },
    titanium: {
        time: 1800
    },
    tungsten: {
        time: 1800
    },
    chromium: {
        time: 1800
    },
}

const defaultImpetusCrafting = {
    ingots: material => [{ item: `modern_industrialization:${material}_ingot`, count: 6 }],
    gunpowderCount: 4,
    cthonicGoldCount: 1,
    spirits: [
        { type: "malum:earthen", count: 8 },
        { type: "malum:infernal", count: 8 },
        { type: "malum:aqueous", count: 8 }
    ]
}

const impetusCraftingOverrides = {
    pure_azurite: { ingots: () => [{ item: "spectrum:pure_azurite", count: 6 }] },
    pure_bloodstone: { ingots: () => [{ item: "spectrum:pure_bloodstone", count: 6 }] },
    pure_malachite: { ingots: () => [{ item: "spectrum:pure_malachite", count: 6 }] },
    oblivion_alloy: {
        ingots: () => [
            { item: "malum:soul_stained_steel_ingot", count: 6 },
            { item: "malum:hallowed_gold_ingot", count: 6 }
        ]
    },
}

const defaultNodeSmelting = {
    output: material => ({ tag: `c:nuggets/${material}` }),
    outputCount: 6,
    smeltingTime: 200,
    blastingTime: 100,
    experience: 0.25
}

const nodeSmeltingOverrides = {}

const defaultImpetusRepair = {
    repairMaterial: { count: 2, item: "malum:cthonic_gold_fragment" },
    spirits: [
        { type: "malum:aqueous", count: 8 },
        { type: "malum:infernal", count: 8 }
    ],
    durabilityPercentage: 1.0
}

const impetusRepairOverrides = {}

ServerEvents.recipes(event => {

    global.miImpetusMaterials.forEach(material => {
        const focusing = Object.assign({}, defaultImpetusFocusing, impetusFocusingOverrides[material])
        event.custom({
            type: "malum:spirit_focusing",
            input: { item: `modern_industrialization:${material}_impetus` },
            result: { id: `modern_industrialization:${material}_node`, count: focusing.resultCount },
            spirits: focusing.spirits,
            time: focusing.time,
            durabilityCost: focusing.durabilityCost
        })

        const crafting = Object.assign({}, defaultImpetusCrafting, impetusCraftingOverrides[material])
        const extraInputs = [
            { count: crafting.gunpowderCount, tag: "c:gunpowders" },
            { count: crafting.cthonicGoldCount, item: "malum:cthonic_gold" }
        ].concat(crafting.ingots(material))

        spiritInfusion(event, {
            input: { count: 1, item: "malum:alchemical_impetus" },
            extraInputs: extraInputs,
            spirits: crafting.spirits,
            result: { count: 1, id: `modern_industrialization:${material}_impetus` }
        })

        const nodeSmelting = Object.assign({}, defaultNodeSmelting, nodeSmeltingOverrides[material])
        const output = nodeSmelting.output(material)
        event.custom({
            type: "malum:node_smelting",
            group: "",
            ingredient: { item: `modern_industrialization:${material}_node` },
            output: output,
            outputCount: nodeSmelting.outputCount,
            cookingTime: nodeSmelting.smeltingTime,
            experience: nodeSmelting.experience
        })
        event.custom({
            type: "malum:node_blasting",
            group: "",
            ingredient: { item: `modern_industrialization:${material}_node` },
            output: output,
            outputCount: nodeSmelting.outputCount,
            cookingTime: nodeSmelting.blastingTime,
            experience: nodeSmelting.experience
        })

        const repair = Object.assign({}, defaultImpetusRepair, impetusRepairOverrides[material])
        event.custom({
            type: "malum:spirit_repair",
            validItems: [`modern_industrialization:${material}_fractured_impetus`],
            repairMaterial: repair.repairMaterial,
            spirits: repair.spirits,
            durabilityPercentage: repair.durabilityPercentage
        })
    })

})
