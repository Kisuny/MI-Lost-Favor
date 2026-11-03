const thaumaturgeResearchTasks = [
    { task: 'milf:thaumaturge/warp', quest: 'magic_step_i/feel_the_first_touch_of_warp', complete: ['thaumaturge:warp'] },
    { task: 'milf:thaumaturge/flux_rift', quest: 'magic_step_i/flux_rift', complete: ['thaumaturge:scanned/fluxrift'], known: ['thaumaturge:flux_rift'] },
].map(entry => ({
    task: entry.task,
    quest: entry.quest,
    complete: (entry.complete || []).map(id => $ResourceLocation.parse(id)),
    known: (entry.known || []).map(id => $ResourceLocation.parse(id)),
}))

PlayerEvents.tick(event => {
    const { player } = event
    if (player.tickCount % 40 != 0) return

    thaumaturgeResearchTasks.forEach(entry => {
        if (EmbersQuesting.isCompleted(player, entry.quest)) return
        let knowledge = $KnowledgeAccess.of(player)
        if (entry.complete.some(id => knowledge.isResearchComplete(id)) || entry.known.some(id => knowledge.isResearchKnown(id))) {
            EmbersQuesting.progress(player, entry.task, 1)
        }
    })
})
