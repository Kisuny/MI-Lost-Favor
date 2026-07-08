// WIP for now

const lootRestrictions = [

    {
        stage: 'tools_and_armors_everywhere',
        everywhere: true,
        tags: ['c:tools', 'c:armors'],
    },
    {
        stage: 'simplyswords_swords_everywhere',
        everywhere: true,
        tags: ['simplyswords:swords'],
        items: 'simplyswords:runic_tablet'
    },
    {
        stage: 'enchanted_book_everywhere',
        everywhere: true,
        items: 'minecraft:enchanted_book',
    },
    {
        stage: 'bucket_everywhere',
        everywhere: true,
        items: 'minecraft:bucket',
    },
    {
        stage: 'gems_everywhere',
        everywhere: true,
        tags: 'c:gems',
    },
    {
        stage: 'enigmaticlegacyplus_everywhere',
        everywhere: true,
        mods: 'enigmaticlegacyplus',
    },

    // {
    //     stage: 'replace_iron_to_tin',
    //     everywhere: true,
    //     replacements: { 'minecraft:raw_iron': ['minecraft:raw_copper', 1] }
    // },

    // {
    //     stage: 'test_loot_stage_2',
    //     entityFilter: 'PARTIAL',
    //     entities: 'minecraft:zombie',
    //     items: 'minecraft:rotten_flesh',
    //     replacements: { 'minecraft:rotten_flesh': ['minecraft:emerald_block', 10] }
    // },

    // {
    //     stage: 'test_loot_stage_3',
    //     lootTableFilter: 'PARTIAL',
    //     lootTables: 'minecraft:chests/simple_dungeon',
    //     items: 'minecraft:rotten_flesh'
    // },
    // {
    //     stage: 'test_loot_stage_4',
    //     everywhere: true,
    //     tags: ['c:tools', 'c:armors'],
    //     items: ['minecraft:diamond_sword'],
    //     ignoredItems: 'minecraft:diamond_pickaxe'
    // },

    // {
    //     stage: 'test_loot_stage_5',
    //     everywhere: true,
    //     mods: ['milf',  'devices']
    // },
    {
        stage: 'relic_test',
        everywhere: true,
        tags: ['milf:artifacts', 'relics:relics']
    },

    // {
    //     stage: 'test_loot_stage_7',
    //     everywhere: true,
    //     items: ['minecraft:gold_ingot', 'minecraft:diamond'],
    //     replacements: {
    //         'minecraft:gold_ingot': ['minecraft:iron_ingot', 2],
    //         'minecraft:diamond': 'minecraft:coal' // count defaults to 1 when omitted
    //     }
    // },

    // {
    //     stage: 'test_loot_stage_8',
    //     blocks: 'minecraft:coal_ore',
    //     items: 'minecraft:coal',
    //     replacer: stack => Item.of('minecraft:charcoal', stack.getCount())
    // },


    // {
    //     stage: 'test_loot_stage_10',
    //     entityFilter: 'ALL',
    //     entities: 'minecraft:creeper'
    // }
]

lootRestrictions.forEach(addLootRestriction)

function toArray(value) {
    if (value === undefined || value === null) return []
    return Array.isArray(value) ? value : [value]
}

function replacerFromMap(replacements) {
    return stack => {
        for (const id in replacements) {
            if (!stack.is(id)) continue

            const entry = replacements[id]
            return Array.isArray(entry) ? Item.of(entry[0], entry[1]) : Item.of(entry)
        }

        return Item.empty
    }
}

/**
 * Single entry point for registering all loot restrictions.
 * Each entry describes ONE rule and gets turned into a AStages.addRestrictionForLoot(...) call.
 *
 * Entry fields (all optional except id/stage):
 *   id - unique string identifier for the rule
 *   stage - progression stage that lifts the restriction
 *   items - string | string[]  - item ids to restrict
 *   tags - string | string[]  - item tags to restrict
 *   mods - string | string[]  - list of mod IDs
 *   ignoredItems - string | string[]  - item ids exempted, even if caught by tags/mods
 *   ignoredTags - string | string[]  - list of item tags to ignore
 *   blocks - string | string[]  - blocks whose loot table (block drop) triggers the rule
 *   entities - string | string[]  - entities whose death triggers the rule
 *   lootTables - string | string[]  - loot table ids the rule applies to
 *   everywhere - true - applyEverywhere() (ignores blocks/entities/lootTables, the restriction applies to any item drop whatsoever)
 *   entityFilter, lootTableFilter, damageTypeFilter - 'ALL' | 'PARTIAL':
 *       PARTIAL (default) - the item is restricted only if it also matches items/tags/mods
 *       ALL                - every item from this entity/lootTable/damageType is restricted, no items/tags check
 *   replacer - function(stack) => stack - custom replacement; defaults to simply removing the item (Item.empty)
 *   replacements - object { itemId: [resultId, count] | resultId } - declarative shortcut for simple 1:1 replacements,
 *       used instead of replacer when a plain switch-by-id is enough (ignored if replacer is also set)
 */
function addLootRestriction(rule) {
    const restriction = AStages.addRestrictionForLoot(`astages/loot/${rule.stage}`, rule.stage)

    const items = toArray(rule.items)
    const tags = toArray(rule.tags)
    const mods = toArray(rule.mods)
    const ignoredItems = toArray(rule.ignoredItems)
    const ignoredTags = toArray(rule.ignoredTags)
    const blocks = toArray(rule.blocks)
    const entities = toArray(rule.entities)
    const lootTables = toArray(rule.lootTables)

    if (items.length) restriction.restrictItems(items)
    if (tags.length) restriction.restrictTags(tags)
    if (mods.length) restriction.restrictMods(mods)
    if (ignoredItems.length) restriction.ignoredItems(ignoredItems)
    if (ignoredTags.length) restriction.ignoredTags(ignoredTags)

    if (rule.everywhere) {
        restriction.applyEverywhere()
    } else {
        if (blocks.length) restriction.restrictBlocks(blocks)
        if (entities.length) restriction.restrictForEntities(entities)
        if (lootTables.length) restriction.restrictForLootTables(lootTables)
    }

    if (rule.entityFilter) restriction.entityFilter(AFilter[rule.entityFilter])
    if (rule.lootTableFilter) restriction.lootTableFilter(AFilter[rule.lootTableFilter])
    if (rule.damageTypeFilter) restriction.damageTypeFilter(AFilter[rule.damageTypeFilter])

    // restriction.replacer(rule.replacer || (rule.replacements && replacerFromMap(rule.replacements)) || (stack => Item.empty))

    // console.log(restriction);
    return restriction
}