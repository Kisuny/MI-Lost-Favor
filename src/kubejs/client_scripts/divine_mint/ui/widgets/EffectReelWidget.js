function EffectReelWidget(x, y, width, height, component) {

    let overrides = {
        onNewItemSelected(effectID) {
            let effectData = this.itemsToRenderEntries[effectID]
            this.reelParentScreen.getInfoBox().updateBossEffect(Object.assign({}, effectData, { effectID: effectID }))
        }
    }

    return AbstractRLReelWidget(x, y, width, height, component, overrides)

}