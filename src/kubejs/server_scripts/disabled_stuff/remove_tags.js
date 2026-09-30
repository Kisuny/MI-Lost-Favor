ServerEvents.tags('item', event => {

    global.disabledItems.forEach(entry => {
        let { id, replaceData } = entry

        let replaceWithId = replaceData.id
        if (replaceWithId != null){

            // Surely this will not bite me in the arse later (‾◡◝) 
            // (tags are not populated at this point, so there's no way to transfer 
            // tags from a disabled item to another, thus there's no way to keep all the 
            // tag-driven recipes without keeping those tags on the original items)



            // if (replaceData.tags){
            //     //console.log(replaceData.tags);

            //     replaceData.tags.forEach(tag => event.add(tag, replaceWithId))

            //     event.removeAllTagsFrom(id)
            // } else {
            //     let tags = $BuiltInRegistries.ITEM["getHolder(net.minecraft.resources.ResourceKey)"](
            //         $ResourceKey.create($Registries.ITEM, $ResourceLocation.parse(id))
            //     )
            //         .map(holderReference => holderReference.tags())
            //         .map(tagStream => tagStream.collect($Collectors.toSet()))
            //         .orElse($Collections.emptySet())

                    
                    
            //     tags.forEach(tag => console.log( "BIR: " + tag.location()))

            //     Item.of(id).getTags().forEach(tag => {
            //         console.log("STACK: " + tag);
                    
            //         event.add(tag, replaceWithId)
            //         replaceData.tags = replaceData.tags || []
            //         replaceData.tags.push(tag)
            //         event.remove(tag, id)
            //     })
            // }
            

        } else {
            event.removeAllTagsFrom(id)
        }

        event.add('milf:nocompat', id)

    })

})

ServerEvents.tags('block', event => {

    let itemIds = global.disabledItems.map(entry => entry.id)
    event.removeAllTagsFrom(itemIds)

})

ServerEvents.tags('fluid', event => {

    let fluidIds = global.disabledFluids.map(entry => entry.id)
    event.removeAllTagsFrom(fluidIds)

})