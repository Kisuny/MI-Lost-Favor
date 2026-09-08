ServerEvents.recipes(event => {
    alterationRecipe(event, {
        input: 'apothic_enchanting:apothic_enchanting_table',
        result: 'neovitae:ara_vitae',
        removeRecipe: true
    });

    const vitaeReplacements = {
        "minecraft:gold_ingot": "malum:hallowed_gold_ingot",
        "c:ingots/gold": "malum:hallowed_gold_ingot",
        "minecraft:iron_ingot": "malum:soul_stained_steel_ingot",
        "c:ingots/iron": "malum:soul_stained_steel_ingot",
        "c:ingots/gold": "malum:hallowed_gold_ingot",
        "minecraft:copper_ingot": "spectrum:stratine_fragments",
        "c:ingots/copper": "spectrum:stratine_fragments",
        "minecraft:diamond": "eidolon_repraised:shadow_gem",
        "c:gems/diamond": "eidolon_repraised:shadow_gem",
        "c:gems/diamond": "eidolon_repraised:shadow_gem",
        "minecraft:iron_boots": "malum:soul_stained_steel_boots",
        "minecraft:iron_chestplate": "malum:soul_stained_steel_chestplate",
        "minecraft:iron_leggings": "malum:soul_stained_steel_leggings",
        "minecraft:iron_helmet": "malum:soul_stained_steel_helmet",
        "minecraft:iron_axe": "malum:soul_stained_steel_axe",
        "minecraft:iron_sword": "malum:soul_stained_steel_sword",
        "minecraft:iron_pickaxe": "malum:soul_stained_steel_pickaxe",
        "minecraft:iron_shovel": "malum:soul_stained_steel_shovel",
        "minecraft:iron_hoe": "malum:soul_stained_steel_hoe",
        "minecraft:redstone": "malum:hex_ash",
        "c:dusts/redstone": "malum:hex_ash",
        "minecraft:redstone_block": "malum:block_of_hex_ash",
        "c:storage_blocks/redstone": "malum:block_of_hex_ash",
        "c:obsidians": "spectrum:neolith",
        "minecraft:obsidian": "spectrum:neolith",
        "minecraft:iron_block": "malum:block_of_soul_stained_steel",
        "c:storage_blocks/iron": "malum:block_of_soul_stained_steel",
        "minecraft:gold_block": "malum:block_of_hallowed_gold",
        "c:storage_blocks/gold": "malum:block_of_hallowed_gold",
        // "": "",
    }

    const vitaeInputKeys = ["input", "inputs", "ingredient", "ingredients", "key", "catalysts", "catalyst", "addedinput", "baseinput"]

    function patchVitaeIngredients(node) {
        if (Array.isArray(node)) {
            return node.map(patchVitaeIngredients).some(Boolean)
        }
        if (!node || typeof node !== "object") return false

        let changed = false
        const replacement = vitaeReplacements[node.item] || vitaeReplacements[node.tag]
        if (replacement) {
            delete node.tag
            node.item = replacement
            changed = true
        }

        Object.values(node).forEach(child => {
            if (patchVitaeIngredients(child)) changed = true
        })
        return changed
    }

    event.forEachRecipe({ or: [{ mod: "neovitae" }, { mod: "animusnv" }] }, recipe => {
        const json = JSON.parse(recipe.json)
        let changed = false
        vitaeInputKeys.forEach(key => {
            if (patchVitaeIngredients(json[key])) changed = true
        })
        if (changed) {
            event.remove({ id: recipe.getId() })
            event.custom(json)
        }
    })
})

