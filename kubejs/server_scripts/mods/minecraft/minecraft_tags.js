ServerEvents.tags('item', event => {
    event.add("c:experience", "minecraft:experience_bottle")
    event.add("minecraft:vanilla_music_discs", [
        'minecraft:music_disc_13', 
        'minecraft:music_disc_cat', 
        'minecraft:music_disc_blocks', 
        'minecraft:music_disc_chirp', 
        'minecraft:music_disc_far', 
        'minecraft:music_disc_mall', 
        'minecraft:music_disc_mellohi', 
        'minecraft:music_disc_ward', 
        'minecraft:music_disc_strad', 
        'minecraft:music_disc_stal', 
        'minecraft:music_disc_wait', 
        'minecraft:music_disc_11'
    ])
})


ServerEvents.tags('block', event => {
    event.removeAll('minecraft:enderman_holdable')

    event.remove("minecraft:nylium", "minecraft:mycelium")
    event.remove("minecraft:nylium", "minecraft:netherrack")
    event.remove("minecraft:nylium", "minecraft:grass_block")
    event.remove("minecraft:nylium", "minecraft:moss_block")
})