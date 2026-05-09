const PromptUtils = Java.loadClass('com.mafuyu404.smartkeyprompts.util.PromptUtils');
const PlayerUtils = Java.loadClass('com.mafuyu404.smartkeyprompts.util.PlayerUtils');
const KeyUtils = Java.loadClass('com.mafuyu404.smartkeyprompts.util.KeyUtils');
const $CuriosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');
const BuiltInRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries');
const $Minecraft = Java.loadClass('net.minecraft.client.Minecraft');

ClientEvents.tick(event => {
    let player = event.player;
    let mainHand = player.mainHandItem;
    let itemId = mainHand.id;

    // console.log(PlayerUtils.getVehicleType());
    const vehicleType = String(PlayerUtils.getVehicleType());
    const inVehicle = vehicleType.startsWith('immersive_aircraft:')
        || vehicleType.startsWith('smallships:')
        || vehicleType.startsWith('hexerei:')
        || vehicleType.startsWith('immersive_machinery:');

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
            if (hasCurioEquipped(player, 'relics:')) {
                PromptUtils.show('equipment', 'key.relics.active_abilities_list');
            }
            if (hasCurioEquipped(player, 'simplemagnets:')) {
                PromptUtils.show('equipment', 'simplemagnets.keys.toggle');
            }
            if (hasCurioEquipped(player, 'occultism:satchel')) {
                PromptUtils.show('equipment', 'key.occultism.backpack');
            }
            if (hasCurioEquipped(player, 'occultism:storage_remote')) {
                PromptUtils.show('equipment', 'key.occultism.storage_remote');
            }
            if (hasCurioEquipped(player, 'hostilenetworks:deep_learner')) {
                PromptUtils.show('equipment', 'key.hostilenetworks.open_deep_learner');
            }
            if (hasCurioEquipped(player, 'map_atlases:atlas')) {
                PromptUtils.show('equipment', 'key.map_atlases.open_minimap');
                PromptUtils.show('equipment', 'key.map_atlases.place_pin');
                PromptUtils.show('equipment', 'key.map_atlases.zoom_out_minimap');
                PromptUtils.show('equipment', 'key.map_atlases.zoom_in_minimap');
            }
            if (hasCurioEquipped(player, 'devices:')) {
                PromptUtils.custom('equipment', KeyUtils.getKeyByDesc("key.ezactions.open"), 'Open Devices Pouch');
            }

            // if (PlayerUtils.getTargetedBlockId() === 'minecraft:chest') {
            //     PromptUtils.addDesc('Test Block Prompt').forKey('key.keyboard.r').withCustom(true).atPosition('crosshair').toGroup('test_block');
            // }

            if (PlayerUtils.getTargetedEntityType() === 'minecraft:villager') {
                PromptUtils.addDesc('milf.key_prompts.villager_refresh').forKey('key.keyboard.c').withCustom(true).atPosition('crosshair').toGroup('general');
            }
        }

        if (itemId === 'mechtrowel:mech_trowel') {
            PromptUtils.show('mech_trowel', 'key.mechtrowel.toggle_build_mode');
            PromptUtils.show('mech_trowel', 'key.mechtrowel.open_palette');
            PromptUtils.show('mech_trowel', 'key.mechtrowel.toggle_replace');
            PromptUtils.show('mech_trowel', 'key.mechtrowel.open_radial_menu');
        }
        if (itemId === 'modern_industrialization:steam_mining_drill') {
            PromptUtils.show('modern_industrialization', 'key.modern_industrialization.toggle_3x3');
        }
        if (itemId === 'minecraft:lantern') {
            PromptUtils.custom('beltborne_lanterns', 'key.keyboard.ctrl+key.keyboard.b', 'key.beltborne_lanterns.toggle_lantern');
        }

        const constructionWands = [
            'constructionwand:stone_wand',
            'constructionwand:iron_wand',
            'constructionwand:diamond_wand',
            'constructionwand:infinity_wand'
        ];
        if (constructionWands.includes(itemId)) {
            PromptUtils.custom('constructionwand', 'key.keyboard.ctrl+key.mouse.right', 'key.constructionwand.wand_option');
        }

        const grapplingHooks = [
            'yo_hooks:iron_grappling_hook',
            'yo_hooks:gold_grappling_hook',
            'yo_hooks:diamond_grappling_hook',
            'yo_hooks:netherite_grappling_hook'
        ];

        if (grapplingHooks.includes(itemId)) {
            PromptUtils.show('yo_hooks', 'key.yo_hooks.jump');
            PromptUtils.show('yo_hooks', 'key.yo_hooks.climb');
            PromptUtils.show('yo_hooks', 'key.yo_hooks.climb_down');
        }

        const tanks = [
            'tankstorage:tank_1',
            'tankstorage:tank_2',
            'tankstorage:tank_3',
            'tankstorage:tank_4',
            'tankstorage:tank_5',
            'tankstorage:tank_6',
            'tankstorage:tank_7',
            'bankstorage:bank_1',
            'bankstorage:bank_2',
            'bankstorage:bank_3',
            'bankstorage:bank_4',
            'bankstorage:bank_5',
            'bankstorage:bank_6',
            'bankstorage:bank_7'
        ];
        if (tanks.includes(itemId)) {
            PromptUtils.custom('tankstorage', "key.keyboard.alt+key.mouse.left", 'key.tankstorage.lockslot');
        }

        const spellBooks = ['ars_nouveau:novice_spell_book', 'ars_nouveau:apprentice_spell_book', 'ars_nouveau:archmage_spell_book'];
        if (spellBooks.includes(itemId)) {
            PromptUtils.show('ars_nouveau', 'key.ars_nouveau.open_book');
            PromptUtils.show('ars_nouveau', 'key.ars_nouveau.selection_hud');
            PromptUtils.show('ars_nouveau', 'key.ars_nouveau.next_slot');
            PromptUtils.show('ars_nouveau', 'key.ars_nouveau.previous_slot');
        }

        if (vehicleType.startsWith('smallships:')) {
            PromptUtils.custom('smallships', KeyUtils.getKeyByDesc("key.ezactions.open"), 'key.smallships.ship_sail');
            PromptUtils.custom('smallships', "key.keyboard.shift", 'milf.key_prompts.dismount');
        }

        if (vehicleType.startsWith('immersive_machinery:')) {
            PromptUtils.custom('immersive_machinery', "key.keyboard.space", "milf.key_prompts.go_up");
            PromptUtils.custom('immersive_machinery', "key.keyboard.shift", "milf.key_prompts.go_down");
            PromptUtils.custom('immersive_machinery', KeyUtils.getKeyByDesc("key.inventory"), "immersive_aircraft.slot.upgrade");
            PromptUtils.show('immersive_machinery', "key.immersive_aircraft.dismount");
            PromptUtils.custom('immersive_machinery', KeyUtils.getKeyByDesc("key.immersive_machinery.horn"), "milf.key_prompts.horn");
        }

        if (vehicleType.startsWith('immersive_aircraft:')) {
            PromptUtils.custom('immersive_machinery', "key.keyboard.shift", "milf.key_prompts.slow_down");
        }
        if (vehicleType.startsWith('hexerei:')) {
            PromptUtils.show('hexerei', "key.hexerei.broomUp");
            PromptUtils.show('hexerei', "key.hexerei.broomDown");
            PromptUtils.show('hexerei', "key.hexerei.broomDismount");
            PromptUtils.show('hexerei', "key.hexerei.broomActivate");
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
