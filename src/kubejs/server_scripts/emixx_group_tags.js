ServerEvents.tags("item", (event) => {
    for (const entry of global.emixxGroups) {
        if (entry.type === "tag") {
            if (entry.sources) event.add(entry.tag, entry.sources)
        }
    }
})
