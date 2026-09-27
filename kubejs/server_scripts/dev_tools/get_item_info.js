const trusted_players = [] //['Optimal', 'Kisuny', 'Sipep', 'error1number404', 'saeta_']

function list_all_inventory(player) {
    let items_str = ''
    for (let item of player.inventory.getAllItems()) {
        if (item.id == "minecraft:bedrock" || item.id === undefined) {
            continue;
        }
        let item_str = `${item.id}`
        if (item.count > 1) {
            item_str = `${item.count}x ` + item_str
        }
        items_str += `["${item_str}"],\n`;
    };
    items_str = items_str.slice(0, -1)
    player.tell([
        Text.gray('- Items: '),
        Text.darkAqua(items_str).clickCopy(items_str).hover('Click to copy items'),
    ]);
}

ItemEvents.rightClicked(event => {

    if (event.hand == 'main_hand') return;
    if (!trusted_players.includes(event.player.getName().getString())) return;
    const { item, player } = event;
    let lang_key = item.item.getDescriptionId();
    let item_name = Text.translate(lang_key);
    let item_id = item.id;
    let player_hand_item = event.player.offHandItem.componentString
    if (item_id === "minecraft:golden_shovel") return
    if (item_id === "minecraft:bedrock") {
        return list_all_inventory(player)
    }

    player.tell([
        Text.gold('---Item in Hand---\n'),
        Text.of(item_name)//.clickCopy(item_name).hover('Click to copy Name'),
    ]);
    player.tell([
        Text.gray('- Item ID: '),
        Text.darkAqua(item_id).clickCopy(item_id).hover('Click to copy ID'),
    ]);
    player.tell([
        Text.gray('- Lang Key: '),
        Text.green(lang_key).clickCopy(lang_key).hover('Click to copy Key'),
    ]);
    player.tell([
        Text.gray('- Components: '),
        Text.green(player_hand_item).clickCopy(player_hand_item).hover('Click to copy NBT'),
    ]);
})

ItemEvents.rightClicked(event => {

    if (event.hand == 'main_hand') return;
    if (!trusted_players.includes(event.player.getName().getString())) return;
    const { item, player, target } = event;
    let item_id = item.id;
    if (item_id !== "minecraft:golden_shovel") return
    let x = target.block.x
    let y = target.block.y
    let z = target.block.z
    player.runCommand(`/data get block ${x} ${y} ${z}`)
    


})