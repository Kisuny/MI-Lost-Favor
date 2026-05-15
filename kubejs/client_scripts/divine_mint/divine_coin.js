ItemEvents.firstRightClicked("milf:divine_coin", event => {

})

ItemEvents.modifyTooltips(event => {

    //console.log("WHAT");
    
    event.modify("milf:divine_coin", tooltip =>{
        tooltip.dynamic("milf:divine_coin_tooltip")
    })

})

ItemEvents.dynamicTooltips("milf:divine_coin_tooltip", event =>{


    let {item} = event

    let data

    if(item.get($DataComponents.CUSTOM_DATA)){
        data = item.get($DataComponents.CUSTOM_DATA).copyTag()

        let registryAccess = Client.level.registryAccess()

        let bossName = $Component$Serializer["fromJson(java.lang.String,net.minecraft.core.HolderLookup$Provider)"](data.getString("bossNameJson"), registryAccess)
        let effectName = $Component$Serializer["fromJson(java.lang.String,net.minecraft.core.HolderLookup$Provider)"](data.getString("effectNameJson"), registryAccess)
        let difficultyName = $Component$Serializer["fromJson(java.lang.String,net.minecraft.core.HolderLookup$Provider)"](data.getString("difficultyNameJson"), registryAccess)

        //let bossName = data.contains("bossID") ? data.getString("bossID") : "none"

        event.add(bossName)
        event.add(effectName)
        event.add(difficultyName)

    }

    //console.log(data);
    

    //console.log("WHAT");



})