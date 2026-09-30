const customStuff = global.langCustomStuff
Object.entries(customStuff).forEach(([langID, langStrings]) => {
    Object.entries(langStrings).forEach(([lang, string]) => {
        ClientEvents.lang(lang, event => {event.add(langID, string)})
    })
});