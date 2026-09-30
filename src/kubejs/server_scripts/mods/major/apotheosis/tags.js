ServerEvents.tags('item', event => {
    event.add("apotheosis:gems", "apotheosis:gem")
    event.add("apotheosis:tomes", [
        'apothic_enchanting:other_tome', 
        'apothic_enchanting:fishing_tome', 
        'apothic_enchanting:pickaxe_tome', 
        'apothic_enchanting:bow_tome', 
        'apothic_enchanting:weapon_tome', 
        'apothic_enchanting:boots_tome', 
        'apothic_enchanting:leggings_tome', 
        'apothic_enchanting:chestplate_tome', 
        'apothic_enchanting:helmet_tome'
    ])
})
