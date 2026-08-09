ClientEvents.lang('en_us', event => {
    event.add('mia.tooltip.strainer.how.to.use', 'There will be text on how to use the strainer.')
    event.add('milf.text.entity.interact.part0', 'At this moment, ')
    event.add('milf.text.entity.interact.part1', ' doesn\'t want to interact with you')
    event.add('milf.text.entity.interact.part2', 'Something magical prevents you from using ')
    event.add('milf.text.block.interact.part0', 'Strange magic prevents you from using this block')
    event.add('milf.text.first_join', `Welcome to the ${MilfEffects.GRAD.MILF("MI:Lost Favor")}!`)
    event.add('milf.text.recommendation_1', `<warning>Important:</warning> CurseForge and Prism Launcher may automatically create their own <keyword>options.txt</keyword> file, which overrides the modpack settings. Unfortunately, we cannot prevent this. If the file already exists, <keyword>delete</keyword> it from your <keyword>.minecraft</keyword> folder. The next time you launch the game, it will be recreated with the correct settings, and all modpack settings will work properly.`)
    event.add('milf.text.curios.already_equipped', 'You already have equipped: ')
    event.add('milf.tooltip.enchanted_book.max_level', '<magic>Max lvl</magic>:')

    const foodCategoryNamesEn = { fruit: 'fruit', cooked_meats: 'cooked meats', bread: 'bread' }
    Object.keys(foodCategoryNamesEn).forEach(priority => {
        Object.keys(foodCategoryNamesEn).forEach(intolerance => {
            if (priority === intolerance) return
            event.add(`milf.food.traits_rolled.${priority}.${intolerance}`, `Your body handles <positive>${foodCategoryNamesEn[priority]}</positive> better, but tolerates <warning>${foodCategoryNamesEn[intolerance]}</warning> worse`)
        })
    })
    event.add('desc.immersiveengineering.info.mineral.nether_silt', 'Strange magic prevents you from using this block')
    event.add('block.paganbless.chalice', 'Chalice')
    event.add('block.immersivepetroleum.crudeoil_fluid_block', 'Crude Oil')
    

    event.add('milf.stage.congratulations', `${MilfEffects.WAVE_C("Congratulations!!!")}`)
    event.add('milf.stage.something_changed', `${MilfEffects.WIGGLE("You feel like something has changed...")}`)
    event.add('milf.stage.bronze_age', `You have passed into the ${MilfEffects.GRAD.custom("Bronze Age", "#CD7F32", "#F6BA7D")}`)
    event.add('milf.stage.monsterplus_mobs', `You began to hear the ${MilfEffects.GRAD.custom("cries of the dead", "#D12F0E", "#841B4C")} at night`)
    event.add('milf.stage.eidolon_mobs', `You can feel a ${MilfEffects.GRAD.custom("chill run down your spine", "#2E57BE", "#2EBFD8")}`)
    event.add('milf.stage.mythsandlegends_mobs', `Mythical creatures ${MilfEffects.GRAD.custom("can hear you", "#F00B0B", "#DA502D")} at night, be careful`)
    event.add('milf.stage.mowziesmobs_mobs', `New ${MilfEffects.GRAD.custom("dangers", "#F00B0B", "#CF0F4C")} have appeared on your path`)
    event.add('milf.stage.cataclysm_mobs', `Something ancient stirs in the ${MilfEffects.GRAD.custom("darkened depths", "#093BE0", "#3B13B3")}...`)
    event.add('milf.stage.grimoireofgaia_mobs', `The world now teems with ${MilfEffects.GRAD.custom("creatures beyond count", "#8A5CCF", "#CEBCFF")}`)
    event.add('milf.stage.tier_1_access_ore', `The mines have been blessed with ${MilfEffects.GRAD.custom("new ores", "#55A2FA", "#8DDBFF")}...`)
    event.add('milf.stage.tier_2_access_ore', 'Unlocked: iridium / platinum / titanium / tungsten / uranium ore')
    event.add('milf.stage.xaeromap', 'Unlocked: mini-map, radar, waypoints')
    event.add('milf.how_to_seed.tooltip', 'Can be found in a bird\'s nest or bought in a market')
    event.add('milf.how_to_get_blaze_core.tooltip', 'You have a 50% chance of obtaining if you kill with the any wrench: Sacred Pontiff, Lord Pumpking, The Black Charro, Umvuthi, Frostmaw, Ferrous Wroughtnaut, Amethyst Crab')
    event.add('milf.how_to_get_electronice_ender_core.tooltip', 'You have a 50% chance of obtaining if you kill with the wrench: Nether Gauntlet, Night Lich, Obsidilith, Void Blossom, Geburah, Chesed, Malkuth')
    event.add('milf.buy_from_goblin_and_wanderer.tooltip', 'You can buy it from a <keyword>wandering trader</keyword> or a <keyword>goblin trader</keyword>')
    event.add('milf.stage.minecraft_mobs', `You started hearing ${MilfEffects.GRAD.custom("strange noises", "#ED1A1A", "#B62651")} at night...`)
    event.add('milf.stage.early_items', `This world no longer ${MilfEffects.GLITCH("rejects")} you...`)

    event.add('gateways.basic/deer', "Deer Gateway")
    event.add('gateways.basic/villager', "Villager Gateway")
    event.add('gateways.tiered/haven', 'Haven Gateway')
    event.add('wave_entity.apotheosis.amethyst_crab', 'Reinforced Amethest Crab')
    event.add('wave_entity.apotheosis.ferrous_wroughtnaut', 'Reinforced Ferrous Wroughtnaut')
    event.add('wave_entity.apotheosis.black_charro', 'Reinforced Black Charro')
    event.add('wave_entity.apotheosis.sacred_pontiff', 'Reinforced Sacred Pontiff')
    event.add('wave_entity.apotheosis.mowziesmobs_umvuthi', 'Reinforced Umvuthi')
    event.add('wave_entity.apotheosis.mowziesmobs_frostmaw', 'Reinforced Frostmaw')


    const rarity = ['uncommon', 'rare', 'epic', 'mythic']
    const worlds_tier = ['frontier', 'ascent', 'summit', 'pinnacle']
    worlds_tier.forEach(worlds_tier => {
        rarity.forEach(rarity => {
            event.add(`advancements.apotheosis.progression.${worlds_tier}.criteria.${rarity}_legs`, `Equip ${rarity.charAt(0).toUpperCase() + rarity.slice(1)} Leggings`)
            event.add(`advancements.apotheosis.progression.${worlds_tier}.criteria.${rarity}_chest`, `Equip ${rarity.charAt(0).toUpperCase() + rarity.slice(1)} Chestplate`)
            event.add(`advancements.apotheosis.progression.${worlds_tier}.criteria.${rarity}_hand`, `Equip ${rarity.charAt(0).toUpperCase() + rarity.slice(1)} Weapon`)
            event.add(`advancements.apotheosis.progression.${worlds_tier}.criteria.${rarity}_helm`, `Equip ${rarity.charAt(0).toUpperCase() + rarity.slice(1)} Helmet`)
            event.add(`advancements.apotheosis.progression.${worlds_tier}.criteria.${rarity}_feet`, `Equip ${rarity.charAt(0).toUpperCase() + rarity.slice(1)} Boots`)
        });
    });

    event.add('advancements.apotheosis.progression.frontier.criteria.complete_haven_gate', 'Complete the Haven Gateway')

    // ascent (rare) kill criteria
    event.add('advancements.apotheosis.progression.ascent.criteria.kill_ender_dragon', 'Slay the Ender Dragon')
    event.add('advancements.apotheosis.progression.ascent.criteria.kill_wither', 'Slay the Wither')
    event.add('advancements.apotheosis.progression.ascent.criteria.kill_elder_guardian', 'Slay an Elder Guardian')
    event.add('advancements.apotheosis.progression.ascent.criteria.kill_warden', 'Slay a Warden')

    // summit (epic) kill criteria
    event.add('advancements.apotheosis.progression.summit.criteria.kill_lich', 'Slay the Night Lich')
    event.add('advancements.apotheosis.progression.summit.criteria.kill_obsidilith', 'Slay the Obsidilith')
    event.add('advancements.apotheosis.progression.summit.criteria.kill_void_blossom', 'Slay the Void Blossom')
    event.add('advancements.apotheosis.progression.summit.criteria.kill_gauntlet', 'Slay the Nether Gauntlet')
    event.add('advancements.apotheosis.progression.summit.criteria.kill_geburah', 'Slay Geburah')
    event.add('advancements.apotheosis.progression.summit.criteria.kill_malkuth', 'Slay Malkuth')
    event.add('advancements.apotheosis.progression.summit.criteria.kill_chesed', 'Slay Chesed')
    event.add('advancements.apotheosis.progression.summit.criteria.kill_lunar_monstrosity', 'Slay the Lunar Monstrosity')
    event.add('advancements.apotheosis.progression.summit.criteria.kill_azazel_human', 'Slay The True Azazel')
    event.add('advancements.apotheosis.progression.summit.criteria.kill_azazel', 'Slay The Divine Chariot Azazel')

    // pinnacle (mythic) kill criteria
    event.add('advancements.apotheosis.progression.pinnacle.criteria.kill_wilden_boss', 'Slay the Wilden Chimera')
    event.add('advancements.apotheosis.progression.pinnacle.criteria.kill_the_harbinger', 'Slay the Harbinger')
    event.add('advancements.apotheosis.progression.pinnacle.criteria.kill_ancient_remnant', 'Slay the Ancient Remnant')
    event.add('advancements.apotheosis.progression.pinnacle.criteria.kill_ignis', 'Slay Ignis')
    event.add('advancements.apotheosis.progression.pinnacle.criteria.kill_netherite_monstrosity', 'Slay the Netherite Monstrosity')
    event.add('advancements.apotheosis.progression.pinnacle.criteria.kill_maledictus', 'Slay Maledictus')
    event.add('advancements.apotheosis.progression.pinnacle.criteria.kill_ender_guardian', 'Slay the Ender Guardian')
    event.add('advancements.apotheosis.progression.pinnacle.criteria.kill_scylla', 'Slay Scylla')
    event.add('advancements.apotheosis.progression.pinnacle.criteria.kill_the_leviathan', 'Slay the Leviathan')
   
    event.add('milf.credit.mi_part', `${MilfEffects.GRAD.MILF('MI:LF™ Certified MI Part')}`)
    event.add('milf.credit.mi_machine', `${MilfEffects.GRAD.MILF('MI:LF™ Certified MI Machine')}`)

    event.add('milf.credit.item', `${MilfEffects.GRAD.MILF('MI:LF™ Certified Item')}`)
    event.add('milf.credit.block', `${MilfEffects.GRAD.MILF('MI:LF™ Certified Block')}`)
    event.add('milf.credit.fluid', `${MilfEffects.GRAD.MILF('MI:LF™ Certified Fluid')}`)

    event.add('tag.item.milf.knives', 'Knives')

    event.add('milf.cannot.mine.block', 'You cannot mine this block for now')
    event.add('milf.press_button', 'Hold ')
    event.add('milf.for_details', 'for more information')
    event.add('milf.amber_visage.tooltip', 'Used as fuel in the transmogrification table to change the appearance of items without modifying their behavior at all')
    event.add('milf.orb_of_the_forest.tooltip', 'To apply this orb to an axe, hold the orb in your main hand and any axe in your off hand and click RMB')
    event.add('milf.money_pouch.tooltip', `Can be opened with ${MilfEffects.UP_DOWN("radial menu")} while in the curio slot`)
    event.add('milf.mi_pipe_recolor.tooltip', `You can change the type using ${MilfEffects.UP_DOWN("Chisel")}`)
    event.add('milf.curio_bag.tooltip', `Can be opened with ${MilfEffects.UP_DOWN("radial menu")} while in the hotbar or in a curio slot`)

    event.add('milf.mi_condition.quarry', `Requires %s below the quarry!`)

    event.add('milf.notification.missing_energy.fe', `Requires %s FE!`)
    event.add('milf.notification.missing_items.to_upgrade', `Requires %s to upgrade!`)
    event.add('milf.notification.missing_items.to_use', `Requires %s to use!`)

    event.add('milf.mi_upgrade_notification_1', `Requires `)
    event.add('milf.mi_upgrade_notification_2', ` to upgrade!`)

    event.add('milf.pet_rock.notification1', `Looking around...`)
    event.add('milf.pet_rock.notification2', `In search of rocks...`)
    event.add('milf.pet_rock.notification3', `Eating gravel...`)
    event.add('milf.pet_rock.notification4', `Seducing the worms...`)
    event.add('milf.pet_rock.notification5', `Petting the stones...`)

    event.add('milf.pet_rock.notification1.f', `...To find nothing`)
    event.add('milf.pet_rock.notification2.f', `...But there are none`)
    event.add('milf.pet_rock.notification3.f', `...To no avail`)
    event.add('milf.pet_rock.notification4.f', `...For them to scatter`)
    event.add('milf.pet_rock.notification5.f', `...Just for fun`)

    event.add('milf.stone_nose.ore_type', `of %s Sniffing`)

    event.add('milf.divine_mint.tooltip', `Within the walls of one's domain,
Or in a completely abstract plane,

At third bell strike will foe arise,
To wreak havoc till its demise,

The foe will feed on rival's greed,
To gain the strength beyond the need,

But those who match this power will
Receive reward far greater still.`)

    event.add('milf.ms_s_second_order.tooltip', `When diplomacy fails and foes give no ground,
The only solution is to make them less sound.`)

    event.add('milf.divine_mint.gui.possible_loot', `Possible loot:`)
    event.add('milf.divine_mint.gui.no_effect', `No effect`)
    event.add('milf.divine_mint.gui.difficulty.hard', `Hard difficulty`)
    event.add('milf.divine_mint.gui.difficulty.normal', `Normal difficulty`)

    event.add('milf.divine_coin.tooltip.loot_modifier', `Loot modifier: `)
    event.add('milf.divine_coin.tooltip.to_check_resurrection_toll', `to check ${MilfEffects.GLITCH("resurrection toll")}`)
    event.add('milf.divine_coin.gui.resurrection_toll', `Resurrection toll`)

    event.add('milf.divine_coin.error.structure_exclusive', `This boss can only be resurrected within the corresponding structure`)
    event.add('milf.divine_coin.error.spawn_conditions', `This boss can only be resurrected within the corresponding structure or in the Abstraction dimension`)

    event.add('milf.clunky_drill.horizontal', `(horizontal)`)
    event.add('milf.clunky_drill.vertical', `(vertical)`)
    event.add('milf.clunky_drill.mode', `Drill mode changed!`)

    event.add('milf.big_bulky_drill.tooltip', `Works similarly to the normal drill, but ${MilfEffects.GRAD.NEGATIVE("doesn't") } count as a shovel. The mining area is only increased if ALL of the blocks in said area are stone-like.`)

    event.add('milf.mi_upgrader.tooltip', `RMB on the placed block with it to ${MilfEffects.GRAD.UPGRADE("upgrade")} it. Preserves ${MilfEffects.WAVE_C("all")} the content. Not consumed on use, even when used as a crafting ingredient.`)

    event.add('milf.recall_concoction.new_pos', `New recall position saved!`)

    event.add('milf.grecall_concoction.t1.tooltip', `Retrieves the content of the last grave you "intentionally" leave in this world. Only works within the same dimension and within a radius of 1000 blocks around the grave.`)
    event.add('milf.grecall_concoction.t2.tooltip', `The gnomegraded version of the Grecall Concoction! Works the same, omitting all the conditions!`)

    event.add('milf.grecall_concoction.no_grave', `No ${MilfEffects.GLITCH("suitable")} graves found!`)
    event.add('milf.grecall_concoction.wrong_dimension', `The grave's ${MilfEffects.GLITCH("dimension")} does not match the ${MilfEffects.GLITCH("dimension")} you are currently in!`)
    event.add('milf.grecall_concoction.grave_too_far', `You must be within ${MilfEffects.GLITCH("1000 blocks")} of the grave!`)

    event.add('milf.placers.notification1', `Not enough space to place ${textAnimatorString("this", "bounce")} one`)
    event.add('milf.placers.notification2', `You have to choose a ${MilfEffects.GLITCH("valid direction")} first`)
    event.add('milf.placers.notification3', `Structure has to be ${textAnimatorString("EXACTLY", "shake")} the same`)

    event.add('milf.placers.gui1', `Use any type of ${MilfEffects.BOUNCE_FULL("HAMMER")} to build structure!`)
    event.add('milf.placers.gui2', `Right click with an empty hand to preview`)
    event.add('milf.placers.gui3', ` + RMB with an empty hand to remove preview`)
    event.add('milf.empty_box.gui1', `You can still get your structure back!`)
    event.add('milf.empty_box.gui2_1', `Just `)
    event.add('milf.empty_box.gui2_2', ` + RMB with an empty hand to put it back`)
    event.add('milf.empty_box.gui3_1', `Attention, breaking this box will `)
    event.add('milf.empty_box.gui3_2', `${MilfEffects.GLITCH("DESTROY")}`)
    event.add('milf.empty_box.gui3_3', " it")

    event.add('milf.orbcraft.changes', `${MilfEffects.WAVE_C("Item altered!")}`)
    event.add('milf.orbcraft.added', `Orb energy infuses the item with `)
    event.add('milf.orbcraft.removed', `${MilfEffects.GLITCH(" REMOVED")}`)
    event.add('milf.orbcraft.orb_removed', `Orb energy cleanses the item from `)
    event.add('milf.orbcraft.absorbed', ` ${textAnimatorString("absorbed", "shake")} the strength of all the other enchantments!`)
    event.add('milf.orbcraft.destroyed', `The orb's energy overwhelms the item, ${MilfEffects.GLITCH("destroying")} it utterly!`)
    event.add('milf.orbcraft.overenchantment', `You feel ${MilfEffects.GLITCH("otherworldly")} power stemming from the item!`)
    event.add('milf.orbcraft.maxed', ` already ${MilfEffects.UP_DOWN("maxed out")}`)

    event.add('milf.orbcraft.error.type', `${MilfEffects.GLITCH("Inappropriate")} item for this type of orb!`)
    event.add('milf.orbcraft.error.no_valid', `Item has no more ${MilfEffects.GLITCH("valid")} enchantments to alter!`)
    event.add('milf.orbcraft.error.enchantments', `This item has no more ${MilfEffects.GLITCH("applicable")} enchantments!`)
    event.add('milf.orbcraft.error.offhand', `The target item has to be in your ${MilfEffects.GLITCH("offhand")}!`)

    event.add('milf.orbcraft.tooltip.transmutation_orb', `Adds up to ${MilfEffects.GRAD.UPGRADE("two")} enchantments to an item.`)
    event.add('milf.orbcraft.tooltip.regal_orb', `Adds up to ${MilfEffects.GRAD.UPUPGRADE("four")} enchantments to an item that already has at least two.`)
    event.add('milf.orbcraft.tooltip.divine_orb', `Randomly alters all enchantments, either ${MilfEffects.GRAD.POSITIVE("upgrading")} or ${MilfEffects.GRAD.NEGATIVE("downgrading")} each one. Does not affect ${MilfEffects.GRAD.UPGRADE("overenchanted")} or ${MilfEffects.GLITCH("curse-based")} enchantments.`)
    event.add('milf.orbcraft.tooltip.orb_of_regret', `Removes all but one random enchantment. That enchantment is ${MilfEffects.UP_DOWN("maximized")}. Can only be used on an item with 4 or more enchantments.`)
    event.add('milf.orbcraft.tooltip.orb_of_chance', `Either ${MilfEffects.GLITCH("destroys")} an item or ${MilfEffects.GRAD.UPGRADE("overenchants")} one of the level 3+ enchantments. Requires 10+ total levels of enchantments on an item. The chance of success is reduced for each enchantment beyond the 4th one.`)
    event.add('milf.orbcraft.tooltip.orb_of_annulment', `Removes one ${textAnimatorString("random", "shake")} enchantment from an item.`)
    event.add('milf.orbcraft.tooltip.orb_of_corruption', `Adds one ${MilfEffects.GRAD.UPGRADE("overenchanted")} enchantment to an item, along with the ${MilfEffects.GLITCH("Curse of Vanishing")}. Can only be used on an item with 4 or more enchantments that doesn't already have the ${MilfEffects.GLITCH("Curse of Vanishing")}.`)
    event.add('milf.orbcraft.tooltip.orb_of_alchemy', `Absorbs up to 4 enchantments from an item, ${MilfEffects.GLITCH("destroying")} it in the process. Using the enchanted orb on another item ${textAnimatorString("replaces", "fade")} all of that item's enchantments with the absorbed ones.`)
    event.add('milf.orbcraft.tooltip.orb_of_the_forest', `Infuses the axe item with the ${MilfEffects.GRAD.custom("Essence Of The Forest", "#1DEB6C", "#6AFFC3")}, allowing it to chop the ${MilfEffects.GRAD.POSITIVE("whole tree")} in one go in exchange for being only a ${MilfEffects.GRAD.NEGATIVE("tenth as effective")} as before. It can be applied only once, with no ability to revert downsides`)

    event.add('milf.cursed_ring_tooltip.remaining', `${MilfEffects.GRAD.UPUPGRADE("%1$s hours")} and ${MilfEffects.GRAD.UPUPGRADE("%2$s minutes")} remaining until the curse ${MilfEffects.GRAD.custom("seeps through your bones", "#712F6C", "#D93667")}`)



    event.add('desc.immersiveengineering.info.mineral.ametrine_geode', "Ametrine Geode")
    event.add('desc.immersiveengineering.info.mineral.zinkenite', "Zinkenite")
    event.add('desc.immersiveengineering.info.mineral.stannite', "Stannite")
    event.add('desc.immersiveengineering.info.mineral.brindleyite', "Brindleyite")
    event.add('desc.immersiveengineering.info.mineral.hematite', "Hematite")
    event.add('milf.emi_info.concrete', "Wait for the <keyword>Liquid Concrete</keyword> to set - it will harden into this block on its own over time.")
    event.add('milf.emi_info.gem_dust', "<keyword>The Anvil Method</keyword>: Drop a gem on the ground and let an <property>anvil</property> fall straight down onto it to crush it into dust. <warning>Note that this early-game method only yields one dust per gem</warning>")


    event.add('milf.text.dim.cant_visit', `${MilfEffects.GLITCH("Some kind of magic is stopping you")}`)

    event.add('milf.flags.claimed', "Chunk claimed")
    event.add('milf.flags.unclaimed', "Chunk unclaimed")
    event.add('milf.flags.occupied', "Chunk already claimed by: ")

    event.add("jade.theme.jade.dark_original", "Dark (original)")

    event.add("curios.identifier.tool_belt", "Tool Belt")
    event.add("curios.identifier.pocket_lamp", "Pocket lamp")
    event.add("curios.identifier.time_sand_pouch", "Temporal Pouch")
    event.add("curios.identifier.backpack", "Backpack")
    event.add("curios.identifier.atlas", "Atlas")

    event.add('rei_categories.modern_industrialization.blast_furnace', "Steam Blast Furnace")

    event.add("rite.milf.archwood_broom", "Ritual of Formation")
    event.add("rite.milf.willow_broom", "Ritual of Formation")
    event.add("rite.milf.witch_hazel_broom", "Ritual of Formation")
    event.add("rite.milf.mahogany_broom", "Ritual of Formation")

    event.add("text.apotheosis.world_tier_tutorial.2", `Press radial menu button and activate ${MilfEffects.UP_DOWN("World Tier: Haven")} to unlock it`)
    event.add("dimension.spectrum.deeper_down", `Deeper Down`)
    event.add("milf.crimson_veil_elixir.tooltip", `Drink this and ${MilfEffects.WIGGLE("sleep")} - and only in your dreams will the path open to the ${MilfEffects.GRAD.custom("Blood Wastes", "#8A0303", "#D12F0E")}, beyond the ${MilfEffects.GLITCH("crimson veil")}, where the ${MilfEffects.GRAD.custom("horrors of the dead", "#D12F0E", "#841B4C")} rest`)
    event.add('milf.crimson_veil.enter', "<blood>The Crimson Veil remembers every soul")
    event.add('dimension.milf.crimson_veil', "Crimson Veil")
    event.add('biome.milf.blood_wastes', "Blood Wastes")
    event.add('biome.milf.crimson_mangrove_swamp', "Crimson Mangrove Swamp")
    event.add('milf.cursed_drops', "This item drops from mobs only if you are under the effect of a <blood>cursed ring</blood>")

    //#region Food tweak
    event.add("milf.food.feel_bit_better", "You feel a bit better after eating something other than fruits and vegetables.")
    event.add("milf.food.poison_1", "You have eaten too many fruits and vegetables and are now poisoned!")
    event.add("milf.food.poison_2", "You feel sick after eating too many fruits and vegetables. Be careful!")
    event.add("milf.food.poison_3", "You feel a bit sick after eating too many fruits and vegetables. Try to eat something else.")
    event.add("milf.food.poison_4", "You have eaten way too many fruits and vegetables and are feeling very sick! Consider eating something else for a while.")
    event.add("milf.food.poison_5", "You have eaten an extreme amount of fruits and vegetables and are now critically poisoned! Please eat something else immediately to recover. If you continue to eat fruits or vegetables while poisoned, you may die from the poison!")
    //#region


    //#region hostile networks

    // 36 characters on line 1 before it clips into the drop stats
    // 48 characters on other lines before it spills out of the UI
    // 4 lines before it leaves the UI

    //Ars Nouveau
    event.add('custom.trivia.drygmy', "A friendly forest spirit.")
    event.add('custom.trivia.starbuncle', "Squirrels infused with Star Magic\nsometimes transform into Starbuncles.")
    event.add('custom.trivia.whirlisprig', "A friendly forest spirit\nthat loves to hover around the place.")
    event.add('custom.trivia.wilden_chimera', "A pack of Wildens that have combined into one.\n\nDoesn't seem to be made with alchemy,\nbut you never know...")
    event.add('custom.trivia.wilden_guardian', "A strong forest beast,\ninfused with magic through unknown means.\n\nThis variant has tough shell, lined with spikes.")
    event.add('custom.trivia.wilden_hunter', "A strong forest beast,\ninfused with magic through unknown means.\n\nThis variant tends to prefer close combat.")
    event.add('custom.trivia.wilden_stalker', "A strong forest beast,\ninfused with magic through unknown means.\n\nThis variant has wings, which makes attacks more agile.")

    //Bosses of Mass Destruction
    event.add('custom.trivia.nether_gauntlet', "A hand with an eye on it,\nhell-bent on slaying you.\n\nSeems oddly familiar, somehow...")
    event.add('custom.trivia.night_lich', "Doesn't guard a twilight tower,\nbut still wants you dead.")
    event.add('custom.trivia.obsidilith', "A tall obsidian tower,\nemanating a menacing aura...")
    event.add('custom.trivia.void_blossom', "A flower of power,\ndetermined to kill you where you stand.\n\nNo bulbs need to be broken to summon it.")
    //Ender Zoology 
    event.add('custom.trivia.concussion_creeper', "This variant of the Creeper\nis not an inverse architect,\nbut rather a concussive blow to the head.")
    event.add('custom.trivia.enderminy', "Technology has sadly regressed,\nand now prevents you from\ntransforming into one of these.")
    event.add('custom.trivia.fallen_knight', "Zombies in advanced stages of decay\nbecome Fallen, and those skilled in combat\nbecome Fallen Knights.")
    event.add('custom.trivia.infested_zombie', "Infested by enderic forces,\nthis Zombie now bears Books and Ender Shards,\nattempting to remedy its mutation by any means.")
    event.add('custom.trivia.owl', "I heard that Owls are a hoot at night.")
    event.add('custom.trivia.wither_cat', "When Wither Witches take a liking to a Cat,\nthey will convert it with their dark magic.\n*Evil loaf!*")
    event.add('custom.trivia.wither_witch', "Like the regular Witch,\nWither Witches employ a variety of spells\nto hinder your progress.\nOften enters battle with their feline friends.")
    //Eternal Starlight
    event.add('custom.trivia.aurora_deer', "Native to Permafrost Starlight Forests,\nthese Deer don't taste quite like you'd expect.")
    event.add('custom.trivia.crystallized_moth', "A multi-colored moth,\npartially composed of magical crystals.")
    event.add('custom.trivia.ent', "A diminutive forest dweller,\nunique to the Starlight Realm.\nSmaller than its Overworldian counterparts\ndue to the lack of sunlight.")
    event.add('custom.trivia.freeze', "A distant relative of the Breeze, this\nfloating construct employs ice to slay its foes.")
    event.add('custom.trivia.gatekeeper', "Sworn to guard the Starlight Gateway,\nthis Gatekeeper only lets victorious challengers pass.\n\n...and it seems like you've come out on top.")
    event.add('custom.trivia.grimstone_golem', "Golems constructed out of Grimstone\nare protective, yet diminutive.")
    event.add('custom.trivia.lonestar_skeleton', "Wandering through the twisting caves\nof the Starlight Realm takes a toll on all,\nand a few unlucky souls\nget converted into this shell.")
    event.add("custom.trivia.luminaris", "These lunar fish mainly inhabit the Abyss,\nbut may occasional swim to a nearby Starlight Sea.\n\nThey use their horns during mating rituals.");
    event.add("custom.trivia.luminofish", "These lunar fish mainly inhabit the Abyss,\nbut may occasional swim to a nearby Starlight Sea.\nTheir sensory organs are positioned\nabove their head to keep a look out for predators.");
    event.add("custom.trivia.lunar_monstrosity", "Twisted by the fallout of the Great Starlight War,\nthis floral aberration has taken up residence\nin the Cursed Garden, consuming the souls of all\nunfortunate enough to cross its roots.");
    event.add("custom.trivia.nightfall_spider", "These Spiders share their omnipresent\ninhabitation with the regular variety -\nbut they're more aggressive than you'd think.");
    event.add("custom.trivia.ratlin", "A giant rodent,\nnative to the Starlight Realm.\nIt looks so soft...");
    event.add("custom.trivia.rookfish", "A strange sub-species of the Squid,\nwhich seems to be shaped like a tower.\nAs for why, it is unknown.");
    event.add("custom.trivia.tower_squid", "A strange sub-species of the Squid,\nwhich seems to be shaped like a tower.\nAs for why, it is unknown.");
    event.add("custom.trivia.starfire_bird", "A crimson red flying fowl.\nNot the most useful of species...");
    event.add("custom.trivia.starlight_golem", "One of the last remnants of\nthe Great Starlight War, these Golems\nspring to life when detecting an intruder.");
    event.add("custom.trivia.tangled", "When a Lunar Monstrosity consumes one's soul,\nit begins converting it into a Tangled.\nPart man and part plant, it is\nforced to protect the Garden by its floristic master.");
    event.add("custom.trivia.tangled_hatred", "Extensions of a Lunar Monstrosity's will,\nthese vines will flail about the place\nin an attempt to stop trespassers.\nAttack their roots to dispatch them.");
    event.add("custom.trivia.thirst_walker", "Eternally damned\nto wander the Crystallized Desert,\nthese mere husks of men\ncan never sate their dehydration.");
    event.add("custom.trivia.yeti", "Rolling around Permafrost Starlight Forests,\nthese small Yetis are quite playful.\nDo they guard a Snowy Hill, a Mansion, or a Needle?\nIf it's the latter, do they snowboard at all?");
    // Friends & Foes
    event.add("custom.trivia.copper_golem", "This diminutive cousin of the Iron Golem\nwill accomplish whatever menial task you assign to it.");
    event.add("custom.trivia.crab_friend", "Found on Beaches, the humble Crab\nyields claws with reach-altering properties when slain.");
    event.add("custom.trivia.glare", "These floating clumps of moss and leaves seek out well-lit areas.\nGlow Berries are their favorite foods.");
    event.add("custom.trivia.iceologer", "A distant relative of the Evoker,\nthe Iceologer deploys its frosty force\nagainst all who encroach upon its domain.");
    event.add("custom.trivia.illusioner", "A relative of the Evoker,\nthis master of illusionary magic\nis sure to confused and befuddle everyone.");
    event.add("custom.trivia.tuff_golem", "This diminutive cousin of the Iron Golem\ndisplays anything you give it - just ensure it doesn't wander away from its post.");
    event.add("custom.trivia.wildfire", "Master of all Blazes, the Wildfire\nis incredibly tough for unprepared adventurers.\n\nEnsure you can resist its firey wrath.");

    // cataclysm
    event.add("custom.trivia.amethyst_crab", "When giant crabs encounter an\nAmethyst Geode, a few of them get too curious\nand transform into an ambulatory Geode.");
    event.add("custom.trivia.ancient_remnant", "Ancient remains of a long-dead dinosaur,\nreanimated by unknown magic.");
    event.add("custom.trivia.aptrgangr", "The undead leader of the Draugrs,\nAptrgangr wields his oversized battleaxe with great dexterity.");
    event.add("custom.trivia.cindaria", "A strange fighter,\nevokative of a Jelllyfish.");
    event.add("custom.trivia.clawdian", "Some crustaceans\nevolve past the peak of crabhood,\nforming their own warrior caste in the process.");
    event.add("custom.trivia.coral_golem_cataclysm", "Guardians of Coral Reefs,\nthese Golems are even deadlier than iron ones\ndue to their sharp coral protrusions.");
    event.add("custom.trivia.coralssus", "A veteran Coral Golem.\nNot as sharp, but still deadlier.");
    event.add("custom.trivia.deepling", "Strange residents of aquatic dungeons.\nLittle is known about them.");
    event.add("custom.trivia.draugr", "Rarely, a Viking who perishes\ndoes not go to Valhalla or Hel -\ninstead, they are doomed to wander the Earth\nas an undead warrior.\nTheir search for peace in the afterlife is neverending.");
    event.add("custom.trivia.drowned_host", "The unwilling host of a Symbiocto.\nIt's best to put them out of their misery before\ntheir anguished cries dominate your psyche.");
    event.add("custom.trivia.elite_draugr", "A veteran Viking spirit,\nhardened by decades of battle.");
    event.add("custom.trivia.endermaptera", "These bothersome beetles\nare native to the End.\nAs with all ankle-biters,\nthe only good bug is a dead bug.");
    event.add("custom.trivia.hippocamtus", "Guardians of a sunken treasure,\nonce thought to be lost forever.");
    event.add("custom.trivia.ignis", "Ruler of the fiery realm of the Nether,\nIgnis is a challenging adversary.\nEnsure you're as close to fireproof\nas one can be before taking on his challenge.");
    event.add("custom.trivia.ignited_berserker", "Cousin to the Blaze,\nthis armored adversary will defend\nits domain to the death.");
    event.add("custom.trivia.ignited_revenant", "Cousin to the Blaze,\nthis reinforced warrior will offer quite the fight\nto defend its fortified abode.\nIt kind of reminds you of something...");
    event.add("custom.trivia.kobolediator", "A Kobold Gladiator's skeleton.\nWatch out for its giant sword.");
    event.add("custom.trivia.koboleton", "A swift, skeletal Kobold.\nTry to re-kill it before it stabs you to death.");
    event.add("custom.trivia.lionfish_cataclysm", "A deep sea hunter,\nLionfish will venomize their prey before eating it.");
    event.add("custom.trivia.maledictus", "A ghostly king who's sworn\nto kill you where you stand -\nbut is his fury righteous, or vindictive?");
    event.add("custom.trivia.netherite_monstrosity", "Guardian of all that is hellish,\nthis amalgamation of Netherite and will\nis bound to destroy all\nwho are foolish enough to challenge it.");
    event.add("custom.trivia.royal_draugr", "A royal Viking spirit who possessed great wealth in life.");
    event.add("custom.trivia.scylla", "A monstrous warrior,\ndead-set on eradicating you.");
    event.add("custom.trivia.symbiocto", "Some Octopodes desire control,\nand will find a host to overtake.\n\nUsually, it's crabs that do this...");
    event.add("custom.trivia.the_harbinger", "An advanced form of the Wither,\nmade far deadlier with several augmentations.");
    event.add("custom.trivia.the_prowler", "This mechanical monstrosity\nis hellbent on hunting you down.\n\nHunt it before it hunts you.");
    event.add("custom.trivia.the_watcher", "An autonomous scanner,\ndispatched to spy on you.\n\nWill defend itself if needed.");
    event.add("custom.trivia.urchinkin", "Evil urchins that seek to destroy you.");
    event.add("custom.trivia.wadjet", "The remains of\nan ancient serpentine warrior,\nsworn to defend its master.");


    //minecraft
    event.add("custom.trivia.bee", "Floating about the forest,\nBees work tirelessly to produce Honeycombs\nyou can centrifuge into a variety of items.\nWait a minute, that's not quite right...");
    event.add("custom.trivia.salmon", "Regularly migrates upstream to lay its eggs.");
    event.add("custom.trivia.llama", "Often found in Savanna‌s,\nLlamas are known for their hostility to all who dare touch them.");
    event.add("custom.trivia.pufferfish", "An annoying inhabitant of the Ocean.\nDispatch before it becomes bothersome.");
    event.add("custom.trivia.sniffer", "Meanders around, searching for food\n- or maybe something else entirely?");
    event.add("custom.trivia.tropical_fish", "Like a fish, but more tropical-y.");
    event.add("custom.trivia.turtle", "Wearing this may make you turtly enough for the turtle club.\n(or make you some kind of ninja, perchance?)");
    event.add("custom.trivia.pillager", "The archers of the raider tribes\nthat wanders the Overworld,\nsearching for their next target.");
    event.add("custom.trivia.ravager", "An incredibly strong battle beast,\ndeployed only during the raids on villages\ncursed by calloused adventurers.");
    event.add("custom.trivia.vindicator", "The front-line fighter of the\nraider tribes that wanders the Overworld,\nsearching for their next target.\n\nBe wary of their powerful swings.");

    //goblintraders
    event.add("custom.trivia.vein_goblin_trader", "A mysterious trader who dwells in the depths of The Nether,\nseeking to trade in rare and valuable materials.");
    event.add("custom.trivia.goblin_trader", "A mysterious trader who dwells in the depths of Overworld,\nseeking to trade in rare and valuable materials.");

    //#endregion

    // esoteric reaping tooltips
    event.add('milf.esoteric_reaping.wind_nucleus', "Drops from <wind>Breeze</wind> when killed with a <keyword>Crude Scythe</keyword>")
    event.add('milf.esoteric_reaping.grim_talc', "Drops from <bone>Skeletons</bone> when killed with a <keyword>Crude Scythe</keyword>")
    event.add('milf.esoteric_reaping.astral_weave', "Drops from <soul>Phantoms</soul> when killed with a <keyword>Crude Scythe</keyword>")
    event.add('milf.esoteric_reaping.rotting_essence', "Drops from <blood>Undead</blood> when killed with a <keyword>Crude Scythe</keyword>")
    event.add('milf.esoteric_reaping.warp_flux', "Drops from <magic>Endermen</magic> when killed with a <keyword>Crude Scythe</keyword>")

    // ore_tooltips
    event.add('milf.ore_tooltip.overworld', '☀ Overworld')
    event.add('milf.ore_tooltip.nether', '⬛ Nether')
    event.add('milf.ore_tooltip.eternal_starlight', '✦ Eternal Starlight')
    event.add('milf.ore_tooltip.deeper_down', '▼ Deeper Down')
    event.add('milf.ore_tooltip.the_end', '🌌 The End')
    event.add('milf.ore_tooltip.crimson_veil', '🥀 Crimson Veil')
    event.add('milf.ore_tooltip.quarry_only', 'Can only be mined in the Electric Quarry')
    event.add('milf.ore_tooltip.silver_byproduct', 'Can be obtained as a byproduct from lead ore processing')

    // key_prompts
    event.add('milf.key_prompts.slow_down', 'Slow down')
    event.add('milf.key_prompts.villager_refresh', 'To refresh trades')
    event.add('milf.key_prompts.dismount', 'Dismount')
    event.add('milf.key_prompts.go_up', 'Go up')
    event.add('milf.key_prompts.go_down', 'Go down')
    event.add('key.hexerei.broomActivate', 'Viewing angle (F5 for work)')
    event.add('milf.key_prompts.horn', 'Enable the horn')
})

let MilfEffects = {
    GRAD: {
        custom(text, from, to) {
            return textAnimatorString(text, "grad", { colors: `${from.slice(1)},${to.slice(1)}`, frequency: 0.5 })
        },
        UPGRADE(text) {
            return this.custom(text, "#55A2FA", "#8DDBFF")
        },
        UPUPGRADE(text) {
            return this.custom(text, "#E4C549", "#FDE49A")
        },
        POSITIVE(text) {
            return this.custom(text, "#55E408", "#D3FFAA")
        },
        NEGATIVE(text) {
            return this.custom(text, "#E40808", "#FFAAAA")
        },
        MILF(text) {
            return this.custom(text, "#9ea5d6", "#848dcb")
        }
    },
    WAVE_C(text) {
        return textAnimatorString(text, "wave", { amplitude: 0.25, wavelength: 0.25, frequency: 0.2 })
    },
    GLITCH(text) {
        return textAnimatorString(text, "glitch")
    },
    BOUNCE_FULL(text) {
        return textAnimatorStringForEach(text, "bounce")
    },
    UP_DOWN(text) {
        return textAnimatorStringForEach(text, "wave", { amplitude: 0.5 })
    },
    WIGGLE(text) {
        return textAnimatorString(text, "wiggle", { amplitude: 0.5, frequency: 0.35 })
    }
}

function textAnimatorString(text, type, params) {
    if (params) {
        return `<${type} ${Object.entries(params).reduce((acc, [param, value]) => `${acc}${param}=${value} `, '').trim()}>${text}</${type}>`

    } else {
        return `<${type}>${text}</${type}>`
    }
}

function textAnimatorStringForEach(text, type, params) {
    let newText = ""

    for (let char of text) {
        newText += textAnimatorString(char, type, params)
    }

    return newText
}
