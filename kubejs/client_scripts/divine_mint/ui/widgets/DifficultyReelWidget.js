function DifficultyReelWidget(x, y, width, height, component) {

    let overrides = {
        onNewItemSelected(difficulty) {
            let difficultyData = this.itemsToRenderEntries[difficulty]
            this.reelParentScreen.getInfoBox().updateBossDifficulty(Object.assign({}, difficultyData, { difficultyID: difficulty }))
        }
    }

    return AbstractRLReelWidget(x, y, width, height, component, overrides)

}