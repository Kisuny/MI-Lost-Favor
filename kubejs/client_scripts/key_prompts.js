const PromptUtils = Java.loadClass('com.mafuyu404.smartkeyprompts.util.PromptUtils');
const PlayerUtils = Java.loadClass('com.mafuyu404.smartkeyprompts.util.PlayerUtils');
const KeyUtils = Java.loadClass('com.mafuyu404.smartkeyprompts.util.KeyUtils');
const $CuriosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');
const BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');
const $Minecraft = Java.loadClass('net.minecraft.client.Minecraft');

ClientEvents.tick(event => {
    let player = event.player;
    let mainHand = player.mainHandItem;
    let item_id = mainHand.id;

    // console.log(PlayerUtils.getVehicleType());
    const vehicleType = String(PlayerUtils.getVehicleType());
    const inVehicle = vehicleType.startsWith('immersive_aircraft:') || vehicleType.startsWith('smallships:') || vehicleType.startsWith('immersive_machinery:');

    if ($Minecraft.getInstance().screen === null) {
        if (!inVehicle) {
            PromptUtils.show('general', 'key.ezactions.open');
            PromptUtils.show('general', 'zume.zoom');
            PromptUtils.show('general', 'key.crawl');
            if (hasCurioEquipped(player, 'sophisticatedbackpacks:')) {
                PromptUtils.custom('equipment', KeyUtils.getKeyByDesc("key.ezactions.open"), 'Open Backpack');
            }
            if (hasCurioEquipped(player, 'travelertoolbelt:')) {
                PromptUtils.show('equipment', 'key.travelertoolbelt.open_toolbelt');
            }

            if (PlayerUtils.getTargetedBlockId() === 'minecraft:chest') {
                PromptUtils.addDesc('Test Block Prompt').forKey('key.keyboard.r').withCustom(true).atPosition('crosshair').toGroup('test_block');
            }
            if (PlayerUtils.getTargetedEntityType() === 'minecraft:villager') {
                PromptUtils.addDesc('To refresh trades').forKey('key.keyboard.c').withCustom(true).atPosition('crosshair').toGroup('test_entity');
            }
        }

        if (item_id === 'mechtrowel:mech_trowel') {
            PromptUtils.show('mech_trowel', 'key.mechtrowel.toggle_build_mode');
            PromptUtils.show('mech_trowel', 'key.mechtrowel.open_palette');
        }
        if (item_id === 'minecraft:lantern') {
            PromptUtils.custom('beltborne_lanterns', 'key.keyboard.ctrl+key.keyboard.b', 'key.beltborne_lanterns.toggle_lantern');
        }


        if (vehicleType.startsWith('smallships:')) {
            PromptUtils.custom('smallships', KeyUtils.getKeyByDesc("key.ezactions.open"), 'key.smallships.ship_sail');
            PromptUtils.custom('smallships', "key.keyboard.shift", 'Dismount');
        }

        if (vehicleType.startsWith('immersive_machinery:')) {
            PromptUtils.custom('immersive_machinery', KeyUtils.getKeyByDesc("key.inventory"), "immersive_aircraft.slot.upgrade");
            PromptUtils.show('immersive_machinery', "key.immersive_aircraft.dismount");
        }
    }

});

function hasCurioEquipped(player, itemId) {
    let inv = $CuriosApi.getCuriosInventory(player);
    if (!inv.isPresent()) return false;
    const prefix = itemId.endsWith(':');
    let found = false;
    inv.get().getCurios().forEach((slotId, handler) => {
        if (found) return;
        let stacks = handler.getStacks();
        for (let i = 0; i < stacks.getSlots(); i++) {
            let stack = stacks.getStackInSlot(i);
            if (stack.isEmpty()) continue;
            const id = BuiltInRegistries.ITEM.getKey(stack.getItem()).toString();
            if (prefix ? id.startsWith(itemId) : id === itemId) {
                found = true;
                return;
            }
        }
    });
    return found;
}