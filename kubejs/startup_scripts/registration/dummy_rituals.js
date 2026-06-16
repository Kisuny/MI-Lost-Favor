// https://github.com/klikli-dev/occultism-kubejs/blob/version/1.21.1/runs/client/kubejs/startup_scripts/example.js
StartupEvents.registry('item', (event) => {
    // event.create('milf:craft_curio_bag', 'occultism:ritual_dummy')
    //     .pentacleType("craft") //Determines the dummy texture, valid options are Valid options are: "misc", "craft", "summon", "possess", default is "misc".
    //     .displayName('Ritual: Craft Trinkets Pouch')
    //     .ritualTooltip('The Trinkets Pouch allows you to store items and can also be used to craft your first backpacks. It can also be equipped in the Trinkets slot!')

    event.create('milf:craft_vial_of_liquid_confidence', 'occultism:ritual_dummy')
        .pentacleType("craft") //Determines the dummy texture, valid options are Valid options are: "misc", "craft", "summon", "possess", default is "misc".
        .displayName('Ritual: Craft Vial Of Liquid Confidence')
        .ritualTooltip('Vial allows you to show courage and start interacting with The Gatekeeper')
    
        event.create('milf:alakarkinos', 'occultism:ritual_dummy')
        .pentacleType("summon") 
        .displayName('Ritual: Summon Alakarkinos')
        .ritualTooltip('Summon Ars Nouveau Alakarkinos')
        
        event.create('milf:starbuncle', 'occultism:ritual_dummy')
        .pentacleType("summon") 
        .displayName('Ritual: Summon Starbuncle')
        .ritualTooltip('Summon Ars Nouveau Starbuncle')
        
        event.create('milf:whirlisprig', 'occultism:ritual_dummy')
        .pentacleType("summon") 
        .displayName('Ritual: Summon Whirlisprig')
        .ritualTooltip('Summon Ars Nouveau Whirlisprig')
        
        event.create('milf:drygmy', 'occultism:ritual_dummy')
        .pentacleType("summon") 
        .displayName('Ritual: Summon Drygmy')
        .ritualTooltip('Summon Ars Nouveau Drygmy')
        
        event.create('milf:siren', 'occultism:ritual_dummy')
        .pentacleType("summon") 
        .displayName('Ritual: Summon Siren')
        .ritualTooltip('Summon Ars Elemental Siren')
})