function findAtlasMarkers(data) {
    let pos = data.getCompound("pos")
    let found = []
    $AtlasClient.markers().all().forEach(marker => {
        if (marker.x == pos.getInt("x") &&
            marker.y == pos.getInt("y") &&
            marker.z == pos.getInt("z") &&
            String(marker.dimension) == String(data.getString("dimension")) &&
            String(marker.icon) == String(data.getString("icon"))) found.push(marker)
    })
    return found
}


NetworkEvents.dataReceived("milf_add_marker", event => {

    let data = event.data
    let pos = data.getCompound("pos")
    let markers = $AtlasClient.markers()

    let nameArgs = []
    data.getList("nameArgs", 8).forEach(arg => nameArgs.push(Text.translate(arg.getAsString())))
    let name = Text.translate(data.getString("name"), nameArgs).getString()

    let note = data.getString("note")
    if (data.getBoolean("translateNote")) {
        let noteArgs = []
        data.getList("noteArgs", 8).forEach(arg => noteArgs.push(Text.translate(arg.getAsString())))
        note = Text.translate(note, noteArgs).getString()
    }
    let color = 0xFF000000 | data.getInt("color")
    let group = data.getString("group")

    let existing = findAtlasMarkers(data)

    if (existing.length > 0) {
        existing.forEach(marker => {
            marker.name = name
            marker.note = note
            marker.color = color
            marker.group = group
        })
        markers.changed()
        return
    }

    let marker = new $AtlasMarker()
    marker.dimension = data.getString("dimension")
    marker.x = pos.getInt("x")
    marker.y = pos.getInt("y")
    marker.z = pos.getInt("z")
    marker.name = name
    marker.note = note
    marker.icon = data.getString("icon")
    marker.color = color
    marker.group = group
    marker.source = $AtlasMarker$Source.SHARED
    marker.repair()
    markers.add(marker)

    Client.player.displayClientMessage(Text.translate("embersatlas.share.added", name), true)
})


NetworkEvents.dataReceived("milf_remove_marker", event => {

    let existing = findAtlasMarkers(event.data)
    if (existing.length == 0) return

    let markers = $AtlasClient.markers()
    existing.forEach(marker => markers.remove(marker.id))

    milfPlayGUISound("abyssal_decor:bellmetal_break")
})
