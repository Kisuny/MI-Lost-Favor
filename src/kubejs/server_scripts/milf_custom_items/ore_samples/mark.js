global.oresWithSamples.forEach(oreEntry => {

    let oreName = oreEntry.itemName
    oreName = oreName.charAt(0).toUpperCase() + oreName.slice(1)

    BlockEvents.rightClicked(`milf:${ oreEntry.itemName }_ore_sample`, event => {

        let blockPos = event.getBlock().pos


        if(event.player.isShiftKeyDown()){
            event.player.sendData("milf_remove_marker", {
                pos: { 
                    x: blockPos.getX(), 
                    y: blockPos.getY(),
                    z: blockPos.getZ()
                },
                markerName: oreName,
                dimension: String(event.level.dimension)
            })
        } else {

            milfPlaySound(event, "enchanted:chalk_write")

            EmbersAtlas.giveMarker(
                event.player,
                oreName,
                event.level.dimension,
                blockPos,
                "embersatlas:pickaxe",
                oreEntry.color,
                false,
                false
            )
        }


    })

})

