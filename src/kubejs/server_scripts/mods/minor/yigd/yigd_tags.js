ServerEvents.tags('block', event => {
    // Immunity to Grave Destroying
    const grave_block = 'yigd:grave'
    
    event.add('cataclysm:scylla_immune', grave_block)
    event.add('cataclysm:leviathan_immune', grave_block)
    event.add('cataclysm:ignis_immune', grave_block)
    event.add('cataclysm:clawdian_immune', grave_block)
    event.add('cataclysm:altar_destroy_immune', grave_block)
    event.add('cataclysm:harbinger_immune', grave_block)
    event.add('cataclysm:remnant_immune', grave_block)
    event.add('cataclysm:netherite_monstrosity_immune', grave_block)
    event.add('cataclysm:maledictus_immune', grave_block)
})

// ServerEvents.tags('item', event => {

//     event.add("yigd:natural_soulbound","enigmaticlegacyplus:cursed_ring" )

// })