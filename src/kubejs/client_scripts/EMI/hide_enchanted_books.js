// Hide enchanted book duplicates in EMI: only keep level 1 books (the real max level is
// shown via a tooltip instead, see kubejs/client_scripts/tooltips/enchanted_book_max_level.js)
RecipeViewerEvents.removeEntries('item', event => {
    event.remove(item => {
        let hide = false
        item.getEnchantments().entrySet().forEach(entry => {
            if (entry.getIntValue() !== 1) hide = true
        })
        return hide
    })
});
