// FTB Quests custom tasks completed by Thaumaturge research progress.
const thaumaturgeResearchTasks = [
    // Sanity Checker quest: first non-temporary warp completes "thaumaturge:warp"
    { task: '3F17F8D517052054', complete: ['thaumaturge:warp'] },
    // Flux Rift quest: a Thaumometer scan completes "thaumaturge:scanned/fluxrift"
    { task: '489650C01C734A57', complete: ['thaumaturge:scanned/fluxrift'], known: ['thaumaturge:flux_rift'] },
]

thaumaturgeResearchTasks.forEach(entry => {
    const complete = (entry.complete || []).map(id => $ResourceLocation.parse(id))
    const known = (entry.known || []).map(id => $ResourceLocation.parse(id))

    FTBQuestsEvents.customTask(entry.task, event => {
        event.setCheckTimer(40)
        event.setCheck((data, player) => {
            const knowledge = $KnowledgeAccess.of(player)
            if (complete.some(id => knowledge.isResearchComplete(id)) || known.some(id => knowledge.isResearchKnown(id))) {
                data.setProgress(1)
            }
        })
    })
})
