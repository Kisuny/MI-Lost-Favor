// Shows the real max level of the stored enchantment on enchanted books, since EMI now
// only lists level 1 books (see kubejs/client_scripts/EMI/hide_enchanted_books.js)
function getRealMaxLevel(holder) {
    const info = $ApothicEnchanting.getEnchInfo(holder)
    if (info) return info.maxLevel()
    return holder.value().getMaxLevel()
}

ItemEvents.modifyTooltips(event => {
    event.modify("minecraft:enchanted_book", tooltip => {
        tooltip.dynamic("milf:enchanted_book_max_lvl_tooltip")
    })
})

ItemEvents.dynamicTooltips("milf:enchanted_book_max_lvl_tooltip", event => {
    const { item } = event

    item.getEnchantments().entrySet().forEach(entry => {
        const maxLevel = getRealMaxLevel(entry.getKey())
        event.add(Text.translate('milf.tooltip.enchanted_book.max_level').append(Text.of(` <positive>${maxLevel}</positive>`)))
    })
})
