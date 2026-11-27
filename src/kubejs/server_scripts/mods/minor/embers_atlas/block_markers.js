let atlasBlocks = {

    "minecraft:spawner": {
        icon: "embersatlas:sword",
        color: 0xB0413E,
        info: "milf.emi_info.atlas_marker.spawner",
        note: block => {
            let mob = String(block.entityData.getCompound("SpawnData").getCompound("entity").getString("id"))
            // console.log(mob)
            if (mob == "") return null
            return { key: "milf.atlas.spawner.mob", args: [`entity.${ mob.replace(":", ".") }`] }
        }
    },

    "minecraft:budding_amethyst": {
        icon: "embersatlas:diamond",
        color: 0x9A5CC6
    },

    "spectrum:budding_citrine": {
        icon: "embersatlas:diamond",
        color: 0xF2C94C
    },

    "spectrum:budding_topaz": {
        icon: "embersatlas:diamond",
        color: 0x4FB8E0
    },

}


Object.keys(atlasBlocks).forEach(blockId => {

    let blockMarker = atlasBlocks[blockId]

    BlockEvents.rightClicked(blockId, event => {

        if (String(event.hand) != "MAIN_HAND") return

        let player = event.player
        let block = event.block

        let data = {
            pos: {
                x: block.pos.getX(),
                y: block.pos.getY(),
                z: block.pos.getZ()
            },
            dimension: String(event.level.dimension),
            icon: blockMarker.icon
        }

        if (player.isShiftKeyDown()) {
            player.sendData("milf_remove_marker", data)
            return
        }

        data.name = String(block.blockState.block.descriptionId)
        data.color = blockMarker.color
        data.group = ""

        let note = blockMarker.note ? blockMarker.note(block) : null
        // console.log(note)

        if (note) {
            data.note = note.key
            data.noteArgs = note.args
            data.translateNote = true
        }

        // console.log(data)

        player.sendData("milf_add_marker", data)
        milfPlaySound(event, "enchanted:chalk_write")
    })
})


RecipeViewerEvents.addInformation('item', event => {
    Object.keys(atlasBlocks).forEach(blockId => {
        if (atlasBlocks[blockId].info) {
            event.add(blockId, [Text.translate("milf.emi_info.atlas_marker"), Text.translate(atlasBlocks[blockId].info)])
        } else {
            event.add(blockId, [Text.translate("milf.emi_info.atlas_marker")])
        }
    })
})
