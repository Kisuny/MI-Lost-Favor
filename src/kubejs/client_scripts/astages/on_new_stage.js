

NetworkEvents.dataReceived('milf_new_stage', (event) => {

    let data = event.data
    let stage = data.getString("stage")

    // Astages does nothing with EMI upon receipt of new stages (from what I've gathered), BUT hides the recipes of items and
    // items themselves if they are restricted by some stage (WHY (┬┬﹏┬┬) )
    // so without reloading EMI they still are not visible until you either /reload or reconnect to the world
    // (both are quite yucky), but reloading EMI causes all the recipes previously hidden by the restrictions to appear, just with unfamiliar items as
    // item names, which is not as bad, but this is still a crutch and maybe the dev should do something to fix this behavior ( and, of course, 
    // I will not report this issue in my lifetime cause interacting with new people is scawy ⓛ ω ⓛ ) 

    $EmiReloadManager.reload()
    
})