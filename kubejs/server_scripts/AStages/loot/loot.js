// WIP for now

const lootRestrictions = [

    {
        stage: 'any_tools_and_armors_everywhere',
        everywhere: true,
        tags: ['c:tools', 'c:armors'],
        ignoredItems: [
            'minecraft:iron_shovel', 'minecraft:iron_pickaxe', 'minecraft:iron_axe', 'minecraft:iron_hoe',
            'minecraft:iron_sword', 'minecraft:iron_helmet', 'minecraft:iron_chestplate', 'minecraft:iron_leggings', 'minecraft:iron_boots',
            'minecraft:diamond_shovel', 'minecraft:diamond_pickaxe', 'minecraft:diamond_axe', 'minecraft:diamond_hoe',
            'minecraft:diamond_sword', 'minecraft:diamond_helmet', 'minecraft:diamond_chestplate', 'minecraft:diamond_leggings', 'minecraft:diamond_boots',
            'minecraft:netherite_pickaxe', 'minecraft:netherite_shovel', 'minecraft:netherite_axe', 'minecraft:netherite_hoe', 'minecraft:netherite_helmet',
            'minecraft:netherite_chestplate', 'minecraft:netherite_leggings', 'minecraft:netherite_boots', 'minecraft:netherite_sword',
        ]
    },
    {
        stage: 'iron_tools_and_armors_everywhere',
        everywhere: true,
        items: ['minecraft:iron_shovel', 'minecraft:iron_pickaxe', 'minecraft:iron_axe', 'minecraft:iron_hoe', 'minecraft:iron_sword', 'minecraft:iron_helmet', 'minecraft:iron_chestplate', 'minecraft:iron_leggings', 'minecraft:iron_boots']
    },
    {
        stage: 'diamond_tools_and_armors_everywhere',
        everywhere: true,
        items: ['minecraft:diamond_shovel', 'minecraft:diamond_pickaxe', 'minecraft:diamond_axe', 'minecraft:diamond_hoe', 'minecraft:diamond_sword', 'minecraft:diamond_helmet', 'minecraft:diamond_chestplate', 'minecraft:diamond_leggings', 'minecraft:diamond_boots']
    },
    {
        stage: 'netherite_tools_and_armors_everywhere',
        everywhere: true,
        items: ['minecraft:netherite_pickaxe', 'minecraft:netherite_shovel', 'minecraft:netherite_axe', 'minecraft:netherite_hoe', 'minecraft:netherite_helmet','minecraft:netherite_chestplate', 'minecraft:netherite_leggings', 'minecraft:netherite_boots', 'minecraft:netherite_sword']
    },
    {
        stage: 'simplyswords_swords_everywhere',
        everywhere: true,
        tags: ['simplyswords:swords'],
        ignoredTags: 'simplyswords:uniques'
    },
    {
        stage: 'simplyswords_uniques_swords_everywhere',
        everywhere: true,
        tags: ['simplyswords:uniques']
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
    // diamonds/emeralds/lapis etc
    {
        stage: 'gems_everywhere',
        everywhere: true,
        tags: 'c:gems',
    },
    

    //List of ideas that won't work because of GLM https://docs.neoforged.net/docs/1.21.1/resources/server/loottables/glm/
    {
        stage: 'relic_test',
        everywhere: true,
        tags: ['milf:artifacts', 'relics:relics']
    },
    {
        stage: 'enigmaticlegacyplus_everywhere',
        everywhere: true,
        mods: 'enigmaticlegacyplus',
    },
    {
        stage: 'simplyswords_runic_tablet_everywhere',
        everywhere: true,
        items: 'simplyswords:runic_tablet',
    },
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