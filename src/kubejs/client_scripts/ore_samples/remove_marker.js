let $AtlasClientApi = Java.loadClass("dev.tysontheember.embersatlas.api.AtlasClientApi")


NetworkEvents.dataReceived('milf_remove_marker', (event) => {

    milfPlayGUISound("abyssal_decor:bellmetal_break")

    let data = event.data

    let pos = data.getCompound("pos")
    let markerName = data.getString("markerName")
    let dimension = data.getString("dimension")    

    let blockPos = new BlockPos(pos.getInt("x"), pos.getInt("y"), pos.getInt("z"))

    $AtlasClientApi.removeWaypoint(blockPos, markerName, dimension)


})