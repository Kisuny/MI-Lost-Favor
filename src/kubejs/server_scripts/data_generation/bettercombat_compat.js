ServerEvents.generateData("before_mods", event => {

    let weaponJsons = {

    }

    Object.entries({
        dagger: [
            'dungeonsdelight:flint_cleaver',
            'dungeonsdelight:iron_cleaver',
            'dungeonsdelight:diamond_cleaver',
            'dungeonsdelight:netherite_cleaver',
            'dungeonsdelight:golden_cleaver',

            "eidolon_edoni:all_rounder",

            "malum:sundering_anchor",

            "paganbless:boline",
            "paganbless:athame",

            "ytech:bronze_file",
            "ytech:sharp_flint",

            "grimoireofgaia:fan_fire",
            "grimoireofgaia:fan_ice"
        ],
        scythe: [
            "malum:soul_stained_steel_hoe",
            "animusnv:hand_of_death",
        ],
        heavy_axe: [
            "risus:unawakened_vessel",
            "risus:crescent_disaster",
            "risus:killjoy"
        ],
        sword: [
        ],
        mace: [
            "grimoireofgaia:weapon_book",
            "grimoireofgaia:metal_club"
        ],
        claymore: [
            "legendary_monsters:shattered_greatsword"
        ],
        spear: [
            "animusnv:spear_iron",
            "animusnv:spear_diamond",
            "animusnv:spear_bound",
            "animusnv:spear_sentient",
            "legendary_monsters:resurrected_javelin"
        ],
        claw:[
            "modern_industrialization:robot_arm"
        ],
        fist:[
            "risus:toothknocker"
        ]
    }).forEach(([preset, weaponIds]) => {
        weaponIds.forEach(id => weaponJsons[id] = {
            parent: `bettercombat:${preset}`
        })
    })

    Object.entries(weaponJsons).forEach(([weaponId, json]) => {

        event.json(`${weaponId.split(":")[0]}:weapon_attributes/${weaponId.split(":")[1]}`, json)
    })

})