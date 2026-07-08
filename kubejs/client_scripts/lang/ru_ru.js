ClientEvents.lang('ru_ru', event => {
    event.add('mia.tooltip.strainer.how.to.use', 'Тут будет текст о том как использовать strainer')
    event.add('milf.text.entity.interact.part0', 'На данный момент, ')
    event.add('milf.text.entity.interact.part1', ' не хочет взаимодействовать с тобой')
    event.add('milf.text.entity.interact.part2', 'Что-то магическое запрещает вам использовать ')
    event.add('milf.text.block.interact.part0', 'Странная магия мешает вам использовать этот блок')
    event.add('milf.text.first_join', `Добро пожаловать в ${MilfEffects.GRAD.MILF("MI:Lost Favor")}!`)
    event.add('milf.text.recommendation_1', `<warning>Важно:</warning> CurseForge и Prism Launcher могут автоматически создавать собственный файл <keyword>options.txt</keyword>, который перезаписывает настройки модпака. К сожалению, мы не можем предотвратить это. Если файл уже существует, <keyword>удалите</keyword> его из папки <keyword>.minecraft</keyword>. При следующем запуске он будет создан заново с правильными настройками, и все настройки модпака будут работать корректно`)
    event.add('milf.text.curios.already_equipped', 'У вас уже надето: ')

    const foodCategoryNamesRu = { fruit: 'фрукты', cooked_meats: 'мясные блюда', bread: 'хлеб' }
    Object.keys(foodCategoryNamesRu).forEach(priority => {
        Object.keys(foodCategoryNamesRu).forEach(intolerance => {
            if (priority === intolerance) return
            event.add(`milf.food.traits_rolled.${priority}.${intolerance}`, `Твой организм лучше принимает <positive>${foodCategoryNamesRu[priority]}</positive>, но хуже переносит <warning>${foodCategoryNamesRu[intolerance]}</warning>`)
        })
    })

    event.add('milf.stage.congratulations', `${MilfEffects.WAVE_C("Поздравляем!!!")}`)
    event.add('milf.stage.something_changed', `${MilfEffects.WIGGLE("Вы чувствуете, что что-то изменилось...")}`)

    event.add('milf.stage.bronze_age', `Вы перешли в ${MilfEffects.GRAD.custom("Бронзовую Эпоху", "#CD7F32", "#F6BA7D")}`)
    event.add('milf.stage.monsterplus_mobs', `Вы начали слышать ${MilfEffects.GRAD.custom("крики мертвых", "#F00B0B", "#7A0F0B")} ночью`)
    event.add('milf.stage.mowziesmobs_mobs', `новые ${MilfEffects.GRAD.custom("опасности", "#F00B0B", "#7A0F0B")} появились на вашем пути`)
    event.add('milf.stage.eidolon_mobs', `Вы чувствуете как по вашему телу пробежал ${MilfEffects.GRAD.custom("холодок", "#353DCA", "#52B5C4")}!`)
    event.add('milf.stage.mythsandlegends_mobs', `Мифические существа ${MilfEffects.GRAD.custom("могут вас услышать", "#F00B0B", "#7A0F0B")} ночью, будьте осторожны!`)
    event.add('milf.stage.cataclysm_mobs', `Что-то древнее шевелится в ${MilfEffects.GRAD.custom("тёмных глубинах", "#1A4FFF", "#0A1A7A")}...`)
    event.add('milf.stage.grimoireofgaia_mobs', `Мир кишит ${MilfEffects.GRAD.custom("существами, которым нет числа", "#9B59B6", "#E8D5FF")}`)
    event.add('milf.stage.tier_1_access_ore', `Шахты были благословлены ${MilfEffects.GRAD.UPGRADE("новыми рудами")}...`)
    event.add('milf.stage.tier_2_access_ore', 'Unlocked: iridium / platinum / titanium / tungsten / uranium ore')
    event.add('milf.stage.xaeromap', 'Разблокированы: мини-карта, радар, метки')
    event.add('milf.stage.minecraft_mobs', `Вы начали слышать ${MilfEffects.GRAD.custom("странные звуки", "#ED1A1A", "#B62651")} ночью...`)
    event.add('milf.stage.early_items', `Этот мир больше не ${MilfEffects.GLITCH("отвергает")} вас...`)

    event.add('gateways.tiered/haven', 'Haven Gateway')
    event.add('wave_entity.apotheosis.amethyst_crab', 'Усиленный Amethest Crab')
    event.add('wave_entity.apotheosis.ferrous_wroughtnaut', 'Усиленный Ferrous Wroughtnaut')
    event.add('wave_entity.apotheosis.black_charro', 'Усиленный Black Charro')
    event.add('wave_entity.apotheosis.sacred_pontiff', 'Усиленный Sacred Pontiff')
    event.add('wave_entity.apotheosis.mowziesmobs_umvuthi', 'Усиленный Umvuthi')
    event.add('wave_entity.apotheosis.mowziesmobs_frostmaw', 'Усиленный Frostmaw')

    const rarityRu = { uncommon: 'Необычн', rare: 'Редк', epic: 'Эпическ', mythic: 'Мифическ' }
    const rarityRuEndings = { legs: 'ых Поножей', chest: 'ого Нагрудника', hand: 'ого Оружия', helm: 'ого Шлема', feet: 'их Ботинок' }
    const worlds_tier = ['frontier', 'ascent', 'summit', 'pinnacle']
    const rarity = ['uncommon', 'rare', 'epic', 'mythic']
    worlds_tier.forEach(tier => {
        rarity.forEach(rar => {
            Object.entries(rarityRuEndings).forEach(([slot, ending]) => {
                event.add(`advancements.apotheosis.progression.${tier}.criteria.${rar}_${slot}`, `Надеть ${rarityRu[rar]}${ending}`)
            })
        })
    })

    event.add('advancements.apotheosis.progression.frontier.criteria.complete_haven_gate', 'Завершить Врата Haven')

    // ascent (редкий) — убийства
    event.add('advancements.apotheosis.progression.ascent.criteria.kill_ender_dragon', 'Убить Эндер-Дракона')
    event.add('advancements.apotheosis.progression.ascent.criteria.kill_wither', 'Убить Иссушителя')
    event.add('advancements.apotheosis.progression.ascent.criteria.kill_elder_guardian', 'Убить Старшего Стража')
    event.add('advancements.apotheosis.progression.ascent.criteria.kill_warden', 'Убить Хранителя')

    // summit (эпический) — убийства
    event.add('advancements.apotheosis.progression.summit.criteria.kill_lich', 'Убить Ночного Лича')
    event.add('advancements.apotheosis.progression.summit.criteria.kill_obsidilith', 'Убить Обсидилита')
    event.add('advancements.apotheosis.progression.summit.criteria.kill_void_blossom', 'Убить Бездонный Цветок')
    event.add('advancements.apotheosis.progression.summit.criteria.kill_gauntlet', 'Убить Незерскую Перчатку')
    event.add('advancements.apotheosis.progression.summit.criteria.kill_geburah', 'Убить Гебуру')
    event.add('advancements.apotheosis.progression.summit.criteria.kill_malkuth', 'Убить Малькут')
    event.add('advancements.apotheosis.progression.summit.criteria.kill_chesed', 'Убить Хесед')
    event.add('advancements.apotheosis.progression.summit.criteria.kill_lunar_monstrosity', 'Убить Лунное Чудовище')

    // pinnacle (мифический) — убийства
    event.add('advancements.apotheosis.progression.pinnacle.criteria.kill_wilden_boss', 'Убить Химеру Вилден')
    event.add('advancements.apotheosis.progression.pinnacle.criteria.kill_the_harbinger', 'Убить Предвестника')
    event.add('advancements.apotheosis.progression.pinnacle.criteria.kill_ancient_remnant', 'Убить Древний Остаток')
    event.add('advancements.apotheosis.progression.pinnacle.criteria.kill_ignis', 'Убить Игниса')
    event.add('advancements.apotheosis.progression.pinnacle.criteria.kill_netherite_monstrosity', 'Убить Незеритовое Чудовище')
    event.add('advancements.apotheosis.progression.pinnacle.criteria.kill_maledictus', 'Убить Малeдиктуса')
    event.add('advancements.apotheosis.progression.pinnacle.criteria.kill_ender_guardian', 'Убить Стража Края')
    event.add('advancements.apotheosis.progression.pinnacle.criteria.kill_scylla', 'Убить Сциллу')
    event.add('advancements.apotheosis.progression.pinnacle.criteria.kill_the_leviathan', 'Убить Левиафана')

    event.add('milf.how_to_seed.tooltip', 'Можно найти в птичьем гнезде или купить на рынке')
    event.add('milf.how_to_get_blaze_core.tooltip', 'Можно получить с шансом 50% если убить ключом: Sacred Pontiff, Lord Pumpking, The Black Charro, Umvuthi, Frostmaw, Ferrous Wroughtnaut, Amethyst Crab')
    event.add('milf.how_to_get_electronice_ender_core.tooltip', 'Можно получить с шансом 50% если убить ключом: Nether Gauntlet, Night Lich, Obsidilith, Void Blossom, Geburah, Chesed, Malkuth')
    event.add('milf.buy_from_goblin_and_wanderer.tooltip', 'Можно купить у <keyword>Странствующего торговца</keyword> или <keyword>Гоблина Трейдера</keyword>')

    event.add('desc.immersiveengineering.info.mineral.nether_silt', 'Странная магия мешает вам использовать этот блок')



    event.add('milf.cannot.mine.block', 'Вы не можете добыть блок на данный момент')
    event.add('milf.press_button', 'Зажми ')
    event.add('milf.for_details', 'для подробной информации')
    event.add('milf.amber_visage.tooltip', 'Используется как топливо в Transmogrification Table для изменения внешнего вида предметов, не влияя на их функциональность')
    event.add('milf.orb_of_the_forest.tooltip', 'Для применения сферы к топору держите сферу в основной руке, а любой топор — во второй и нажмите ПКМ')
    event.add('milf.money_pouch.tooltip', `Можно открыть с помощью ${MilfEffects.UP_DOWN("радиального меню")}, находясь в слоте для безделушек.`)
    event.add('milf.mi_pipe_recolor.tooltip', `Можно поменять тип используя ${MilfEffects.UP_DOWN("Chisel")}`)
    event.add('milf.curio_bag.tooltip', `Можно открыть с помощью ${MilfEffects.UP_DOWN("радиального меню")} если мешок на панели быстрого доступа или в слоте для безделушек`)

    event.add('milf.mi_upgrade_notification_1', `Требуется `)
    event.add('milf.mi_upgrade_notification_2', ` для улучшения!`)

    event.add('milf.pet_rock.notification1', `Осматривается...`)
    event.add('milf.pet_rock.notification2', `В поисках камней...`)
    event.add('milf.pet_rock.notification3', `Поедает гравий...`)
    event.add('milf.pet_rock.notification4', `Соблазняет червей...`)
    event.add('milf.pet_rock.notification5', `Гладит камни...`)

    event.add('milf.pet_rock.notification1.f', `...Ничего не нашёл`)
    event.add('milf.pet_rock.notification2.f', `...Но их нет`)
    event.add('milf.pet_rock.notification3.f', `...Без толку`)
    event.add('milf.pet_rock.notification4.f', `...Но они разбежались`)
    event.add('milf.pet_rock.notification5.f', `...Просто так`)

    event.add('milf.divine_mint.tooltip', `В пределах стен твоих владений
Иль в плоскости совсем абстрактной,
    
С третьим боем, в миг явлений,
Враг восстанет беспощадный.
    
Он алчность соперника в пищу возьмёт,
И силу добудет — сверх всякой нужды,
    
Но тот, кто ту силу с ним вровень сведёт,
Получит награду куда выше, чем ты.`)

    event.add('milf.divine_mint.gui.possible_loot', `Возможная награда:`)
    event.add('milf.divine_mint.gui.no_effect', `Нет эффекта`)
    event.add('milf.divine_mint.gui.difficulty.hard', `Сложная сложность`)
    event.add('milf.divine_mint.gui.difficulty.normal', `Нормальная сложность`)

    event.add('milf.divine_coin.tooltip.loot_modifier', `Модификатор лута: `)
    event.add('milf.divine_coin.tooltip.to_check_resurrection_toll', `чтобы проверить ${MilfEffects.GLITCH("штраф воскрешения")}`)
    event.add('milf.divine_coin.gui.resurrection_toll', `Штраф воскрешения`)

    event.add('milf.divine_coin.error.structure_exclusive', `Этого босса можно воскресить только внутри соответствующей структуры`)
    event.add('milf.divine_coin.error.spawn_conditions', `Этого босса можно воскресить только внутри соответствующей структуры или в измерении Абстракция`)

    event.add('milf.mi_upgrader.tooltip', `ПКМ на размещённый блок с этим предметом, чтобы ${MilfEffects.GRAD.UPGRADE("улучшить")} его. Сохраняет ${MilfEffects.WAVE_C("все")} содержимое. Не расходуется при использовании, даже когда используется как ингредиент для крафта.`)
    event.add('milf.recall_concoction.new_pos', `Новая позиция для возвращения сохранена!`)

    event.add('milf.grecall_concoction.t1.tooltip', `Извлекает содержимое последней могилы, которую вы "намеренно" оставили в этом мире. Работает только в том же измерении и в радиусе 1000 блоков от могилы.`)
    event.add('milf.grecall_concoction.t2.tooltip', `Улучшенная версия Grecall Concoction! Работает так же, но без каких-либо условий!`)

    event.add('milf.grecall_concoction.no_grave', `Подходящих ${MilfEffects.GLITCH("могил")} не найдено!`)
    event.add('milf.grecall_concoction.wrong_dimension', `${MilfEffects.GLITCH("Измерение")} могилы не совпадает с ${MilfEffects.GLITCH("измерением")}, в котором вы находитесь!`)
    event.add('milf.grecall_concoction.grave_too_far', `Вы должны находиться в ${MilfEffects.GLITCH("1000 блоках")} от могилы!`)

    event.add('milf.placers.notification1', `Не хватает места, чтобы ${textAnimatorString("это", "bounce")} разместить`)
    event.add('milf.placers.notification2', `Сначала необходимо выбрать ${MilfEffects.GLITCH("правильное направление")}`)
    event.add('milf.placers.notification3', `Структура должна быть ${textAnimatorString("ТОЧНО", "shake")} такой же`)

    event.add('milf.placers.gui1', `Используйте любой тип ${MilfEffects.BOUNCE_FULL("МОЛОТКА")} для создания структуры!`)
    event.add('milf.placers.gui2', `Щелкните правой кнопкой мыши пустой рукой, чтобы просмотреть предварительный вариант`)
    event.add('milf.placers.gui3', ` + ПКМ с пустой рукой, чтобы удалить предварительный просмотр`)
    event.add('milf.empty_box.gui1', `Вы все еще можете вернуть свою структуру!`)
    event.add('milf.empty_box.gui2_1', `Просто `)
    event.add('milf.empty_box.gui2_2', ` + ПКМ с пустой рукой, чтобы вернуть её обратно`)
    event.add('milf.empty_box.gui3_1', `Обратите внимание, что разбивание этой коробки приведет к `)
    event.add('milf.empty_box.gui3_2', `${MilfEffects.GLITCH("РАЗРУШЕНИЮ")}`)
    event.add('milf.empty_box.gui3_3', " этой коробки")

    event.add('milf.orbcraft.changes', `${MilfEffects.WAVE_C("Предмет изменён!")}`)
    event.add('milf.orbcraft.added', `Энергия сферы наполняет предмет `)
    event.add('milf.orbcraft.removed', `${MilfEffects.GLITCH(" УДАЛЕНО")}`)
    event.add('milf.orbcraft.orb_removed', `Энергия сферы очищает предмет от `)
    event.add('milf.orbcraft.absorbed', ` ${textAnimatorString("поглотила", "shake")} силу всех остальных зачарований!`)
    event.add('milf.orbcraft.destroyed', `Энергия сферы переполняет предмет, ${MilfEffects.GLITCH("полностью уничтожая")} его!`)
    event.add('milf.orbcraft.overenchantment', `Вы чувствуете ${MilfEffects.GLITCH("потустороннюю")} силу, исходящую от предмета!`)
    event.add('milf.orbcraft.maxed', ` уже ${MilfEffects.UP_DOWN("на максимуме")}`)

    event.add('milf.orbcraft.error.type', `${MilfEffects.GLITCH("Неподходящий")} предмет для этого типа сферы!`)
    event.add('milf.orbcraft.error.no_valid', `У предмета больше нет ${MilfEffects.GLITCH("подходящих")} зачарований для изменения!`)
    event.add('milf.orbcraft.error.enchantments', `На этот предмет больше нельзя наложить ${MilfEffects.GLITCH("зачарования")}!`)
    event.add('milf.orbcraft.error.offhand', `Целевой предмет должен быть во ${MilfEffects.GLITCH("второй руке")}!`)

    event.add('milf.orbcraft.tooltip.transmutation_orb', `Добавляет до ${MilfEffects.GRAD.UPGRADE("двух")} зачарований к предмету.`)
    event.add('milf.orbcraft.tooltip.regal_orb', `Добавляет до ${MilfEffects.GRAD.UPUPGRADE("четырёх")} зачарований к предмету, у которого уже есть хотя бы два.`)
    event.add('milf.orbcraft.tooltip.divine_orb', `Случайно изменяет все зачарования, либо ${MilfEffects.GRAD.POSITIVE("улучшая")}, либо ${MilfEffects.GRAD.NEGATIVE("ухудшая")} каждое. Не влияет на ${MilfEffects.GRAD.UPGRADE("сверхзачарованные")} и ${MilfEffects.GLITCH("основанные на проклятиях")} зачарования.`)
    event.add('milf.orbcraft.tooltip.orb_of_regret', `Удаляет все чары, кроме одного случайного. Это чар ${MilfEffects.UP_DOWN("максимизируется")}. Можно использовать только на предмете с 4 и более чарами.`)
    event.add('milf.orbcraft.tooltip.orb_of_chance', `Либо ${MilfEffects.GLITCH("уничтожает")} предмет, либо ${MilfEffects.GRAD.UPGRADE("сверхзачаровывает")} одно из зачарований уровня 3+. Требует 10+ суммарных уровней зачарования на предмете. Шанс успеха снижается за каждое зачарование сверх четвёртого.`)
    event.add('milf.orbcraft.tooltip.orb_of_annulment', `Удаляет одно ${textAnimatorString("случайное", "shake")} зачарование с предмета.`)
    event.add('milf.orbcraft.tooltip.orb_of_corruption', `Добавляет одно ${MilfEffects.GRAD.UPGRADE("сверхзачарованное")} зачарование к предмету вместе с ${MilfEffects.GLITCH("Проклятьем утраты")}. Можно использовать только на предмете с 4 и более зачарованиями, у которого ещё нет ${MilfEffects.GLITCH("Проклятия утраты")}`)
    event.add('milf.orbcraft.tooltip.orb_of_alchemy', `Поглощает до 4 зачарований с предмета, ${MilfEffects.GLITCH("уничтожая")} его в процессе. Использование зачарованной сферы на другом предмете ${textAnimatorString("заменяет", "fade")} все его зачарования поглощёнными.`)
    event.add('milf.orbcraft.tooltip.orb_of_the_forest', `Наполняет топор ${MilfEffects.GRAD.custom("Сущностью Леса", "#1DEB6C", "#6AFFC3")}, позволяя срубать ${MilfEffects.GRAD.POSITIVE("целое дерево")} за один удар в обмен на снижение эффективности до ${MilfEffects.GRAD.NEGATIVE("одной десятой")}. Можно применить только один раз без возможности отмены.`)

    event.add('milf.text.dim.cant_visit', `${MilfEffects.GLITCH("Какая-то магия останавливает вас")}`)

    event.add("jade.theme.jade.dark_original", "Тёмный (оригинальный)")

    event.add('milf.flags.claimed', "Чанк запривачен")
    event.add('milf.flags.unclaimed', "Чанк распривачен")
    event.add('milf.flags.occupied', "Чанк уже запривачен: ")

    event.add('gateways.basic/deer', "Врата Оленя")
    event.add('gateways.basic/villager', "Врата Жителей")
    event.add('rei_categories.modern_industrialization.blast_furnace', "Паровая Доменная Печь")

    event.add('desc.immersiveengineering.info.mineral.ametrine_geode', "Аметриновая Жеода")
    event.add('desc.immersiveengineering.info.mineral.zinkenite', "Цинкенит")
    event.add('desc.immersiveengineering.info.mineral.stannite', "Станнит")
    event.add('desc.immersiveengineering.info.mineral.brindleyite', "Бриндлейит")
    event.add('desc.immersiveengineering.info.mineral.hematite', "Гематит")
    event.add('milf.emi_info.concrete', "Дождитесь, пока <keyword>Жидкий цемент</keyword> застынет - со временем он сам затвердеет в этот блок.")

    event.add("curios.identifier.tool_belt", "Пояс")
    event.add("curios.identifier.pocket_lamp", "Карманный фонарь")
    event.add("curios.identifier.time_sand_pouch", "Мешок с временем")
    event.add("curios.identifier.backpack", "Рюкзак")
    event.add("curios.identifier.atlas", "Атлас")

    event.add("rite.milf.archwood_broom", "Ритуал Формирования")
    event.add("rite.milf.willow_broom", "Ритуал Формирования")
    event.add("rite.milf.witch_hazel_broom", "Ритуал Формирования")
    event.add("rite.milf.mahogany_broom", "Ритуал Формирования")

    event.add("text.apotheosis.world_tier_tutorial", "Этот предмет имеет неизвестную силу")
    event.add("text.apotheosis.world_tier_tutorial.2", `Нажмите кнопку радиального меню и активируйте ${MilfEffects.UP_DOWN("World Tier: Haven")}, чтобы разблокировать её`)

    event.add("dimension.spectrum.deeper_down", `Глубокие Низины`)
    event.add("milf.crimson_veil_elixir.tooltip", `Выпей это и ${MilfEffects.WIGGLE("усни")} - и лишь во сне откроется путь в ${MilfEffects.GRAD.custom("Кровавые Пустоши", "#8A0303", "#D12F0E")}, за ${MilfEffects.GLITCH("багровую завесу")}, где покоятся ${MilfEffects.GRAD.custom("ужасы мёртвых", "#D12F0E", "#841B4C")}`)
    event.add('milf.crimson_veil.enter', "<blood>Багровая Завеса помнит каждую душу")
    event.add('dimension.milf.crimson_veil', "Багровая Завеса")
    event.add('biome.milf.blood_wastes', "Кровавые Пустоши")
    event.add('biome.milf.crimson_mangrove_swamp', "Багровое Мангровое Болото")

    //#region fix forbidden_arcanus langs
    event.add("block.forbidden_arcanus.clibano_center", "Клибан")
    event.add("block.forbidden_arcanus.clibano_corner", "Клибан")
    event.add("block.forbidden_arcanus.clibano_side_horizontal", "Клибан")
    event.add("block.forbidden_arcanus.clibano_side_vertical", "Клибан")
    event.add("gui.forbidden_arcanus.clibano.residue_fullness", "Заполненность остатками")
    event.add("jei.forbidden_arcanus.clibanoCombustion.residue", "Остаток")
    event.add("residue.forbidden_arcanus.coal", "Уголь")
    event.add("residue.forbidden_arcanus.iron", "Железо")
    event.add("residue.forbidden_arcanus.arcane_crystal", "Мистический кристалл")
    event.add("residue.forbidden_arcanus.rune", "Rune")
    event.add("residue.forbidden_arcanus.gold", "Золото")
    event.add("residue.forbidden_arcanus.copper", "Медь")
    event.add("residue.forbidden_arcanus.diamond", "Алмаз")
    event.add("residue.forbidden_arcanus.lapis_lazuli", "Лазурит")
    event.add("residue.forbidden_arcanus.emerald", "Изумруд")
    //#endregion

    //#region Food tweak
    event.add("milf.food.feel_bit_better", "Вы чувствуете себя немного лучше после того, как съели что-то, кроме фруктов и овощей.")
    event.add("milf.food.poison_1", "Вы съели слишком много фруктов и овощей и теперь чувствуете себя плохо!")
    event.add("milf.food.poison_2", "После употребления большого количества фруктов и овощей вы чувствуете себя плохо. Будьте осторожны!")
    event.add("milf.food.poison_3", "После того, как вы съели слишком много фруктов и овощей, вам стало ещё хуже. Попробуйте съесть что-нибудь другое.")
    event.add("milf.food.poison_4", "Вы съели слишком много фруктов и овощей вы чувствуете себя очень плохо! Подумайте о том, чтобы какое-то время есть что-нибудь другое.")
    event.add("milf.food.poison_5", "Вы съели чрезмерное количество фруктов и овощей и теперь находитесь в критическом состоянии от отравления! Пожалуйста, немедленно съешьте что-нибудь другое, чтобы прийти в себя. Если вы продолжите есть фрукты или овощи во время отравления, вы можете умереть от яда!")
    //#region

    //#region hostile networks

    //Ars Nouveau
    event.add('custom.trivia.drygmy', "Дружелюбный лесной дух.")
    event.add('custom.trivia.starbuncle', "Белки, наполненные Звёздной Магией,\nиногда превращаются в Стардинок.")
    event.add('custom.trivia.whirlisprig', "Дружелюбный лесной дух,\nлюбящий порхать туда-сюда.")
    event.add('custom.trivia.wilden_chimera', "Стая Вилденов, слившихся в одно.\n\nНе похоже, что это сделано с помощью алхимии,\nно кто знает...")
    event.add('custom.trivia.wilden_guardian', "Могучий лесной зверь,\nнаполненный магией неизвестным образом.\n\nЭтот вариант имеет прочный панцирь с шипами.")
    event.add('custom.trivia.wilden_hunter', "Могучий лесной зверь,\nнаполненный магией неизвестным образом.\n\nЭтот вариант предпочитает ближний бой.")
    event.add('custom.trivia.wilden_stalker', "Могучий лесной зверь,\nнаполненный магией неизвестным образом.\n\nЭтот вариант имеет крылья, делая атаки более ловкими.")

    //Bosses of Mass Destruction
    event.add('custom.trivia.nether_gauntlet', "Рука с глазом,\nодержимая желанием вас убить.\n\nКажется почему-то знакомой...")
    event.add('custom.trivia.night_lich', "Не охраняет сумеречную башню,\nно всё равно хочет вашей смерти.")
    event.add('custom.trivia.obsidilith', "Высокая обсидиановая башня,\nисточающая грозную ауру...")
    event.add('custom.trivia.void_blossom', "Цветок силы,\nрешивший убить вас на месте.\n\nДля призыва не нужно разрушать луковицы.")

    //Ender Zoology
    event.add('custom.trivia.concussion_creeper', "Этот вариант Крипера\nне обратный архитектор,\nа скорее — сильный удар по голове.")
    event.add('custom.trivia.enderminy', "Технологии, к сожалению, деградировали,\nи теперь не позволяют вам\nпревратиться в одного из них.")
    event.add('custom.trivia.fallen_knight', "Зомби на продвинутых стадиях разложения\nстановятся Падшими, а те из них, кто владел оружием,\nстановятся Падшими Рыцарями.")
    event.add('custom.trivia.infested_zombie', "Заражённый эндерическими силами,\nэтот Зомби теперь носит Книги и Осколки Края,\nпытаясь любыми способами исправить свою мутацию.")
    event.add('custom.trivia.owl', "Говорят, Совы — настоящий хохот по ночам.")
    event.add('custom.trivia.wither_cat', "Когда Иссушающие Ведьмы привязываются к Кошке,\nони превращают её с помощью тёмной магии.\n*Злобный хлебушек!*")
    event.add('custom.trivia.wither_witch', "Как и обычная Ведьма,\nИссушающие Ведьмы используют множество заклинаний,\nчтобы мешать вашему прогрессу.\nЧасто вступают в бой вместе со своими кошачьими друзьями.")

    //Eternal Starlight
    event.add('custom.trivia.aurora_deer', "Обитатели Вечномёрзлых Звёздных Лесов,\nэти Олени на вкус совсем не такие, как можно ожидать.")
    event.add('custom.trivia.crystallized_moth', "Разноцветная моль,\nчастично состоящая из магических кристаллов.")
    event.add('custom.trivia.ent', "Небольшой лесной житель,\nуникальный для Звёздного Мира.\nМеньше своих аналогов из Верхнего Мира\nиз-за отсутствия солнечного света.")
    event.add('custom.trivia.freeze', "Дальний родственник Бриза,\nэтот летающий конструкт использует лёд, чтобы уничтожить врагов.")
    event.add('custom.trivia.gatekeeper', "Поклявшись охранять Звёздный Портал,\nэтот Страж пропускает лишь победивших испытателей.\n\n...Похоже, вы справились.")
    event.add('custom.trivia.grimstone_golem', "Големы из Мрачного Камня\nзащищают, но они невелики.")
    event.add('custom.trivia.lonestar_skeleton', "Блуждание по извилистым пещерам\nЗвёздного Мира оставляет след на каждом,\nи несколько несчастных душ\nпревращаются в эту оболочку.")
    event.add("custom.trivia.luminaris", "Эти лунные рыбы в основном обитают в Бездне,\nно иногда заплывают в соседнее Звёздное Море.\n\nОни используют рога во время брачных ритуалов.")
    event.add("custom.trivia.luminofish", "Эти лунные рыбы в основном обитают в Бездне,\nно иногда заплывают в соседнее Звёздное Море.\nИх сенсорные органы расположены\nнад головой, чтобы следить за хищниками.")
    event.add("custom.trivia.lunar_monstrosity", "Искажённая последствиями Великой Звёздной Войны,\nэта растительная аберрация обосновалась\nв Проклятом Саду, поглощая души всех,\nкто несчастен настолько, чтобы ступить на её корни.")
    event.add("custom.trivia.nightfall_spider", "Эти Пауки разделяют повсеместное\nраспространение с обычным видом —\nно они агрессивнее, чем кажется.")
    event.add("custom.trivia.ratlin", "Огромный грызун,\nобитающий в Звёздном Мире.\nВыглядит таким мягким...")
    event.add("custom.trivia.rookfish", "Странный подвид Кальмара,\nформой напоминающий башню.\nПочему — неизвестно.")
    event.add("custom.trivia.tower_squid", "Странный подвид Кальмара,\nформой напоминающий башню.\nПочему — неизвестно.")
    event.add("custom.trivia.starfire_bird", "Ярко-алая летающая птица.\nНе самый полезный вид...")
    event.add("custom.trivia.starlight_golem", "Один из последних остатков\nВеликой Звёздной Войны, эти Големы\nоживают при обнаружении нарушителя.")
    event.add("custom.trivia.tangled", "Когда Лунное Чудовище поглощает чью-то душу,\nоно начинает превращать её в Спутанного.\nПолучеловек-полурастение, вынужден\nохранять Сад по приказу своего цветущего хозяина.")
    event.add("custom.trivia.tangled_hatred", "Щупальца воли Лунного Чудовища,\nэти лозы мечутся повсюду,\nпытаясь остановить нарушителей.\nАтакуйте их корни, чтобы уничтожить.")
    event.add("custom.trivia.thirst_walker", "Вечно проклятые\nбродить по Кристаллической Пустыне,\nэти жалкие оболочки людей\nникогда не могут утолить жажду.")
    event.add("custom.trivia.yeti", "Катаясь по Вечномёрзлым Звёздным Лесам,\nэти маленькие Йети весьма игривы.\nОхраняют ли они снежный холм, особняк или вершину?\nЕсли последнее — катаются ли они на сноуборде?")

    // Friends & Foes
    event.add("custom.trivia.copper_golem", "Этот небольшой кузен Железного Голема\nвыполнит любое мелкое поручение, которое вы ему дадите.")
    event.add("custom.trivia.crab_friend", "Встречаемый на Пляжах, скромный Краб\nдаёт клешни, изменяющие дальность захвата, после гибели.")
    event.add("custom.trivia.glare", "Эти летающие комки мха и листьев ищут хорошо освещённые места.\nСветоягоды — их любимая еда.")
    event.add("custom.trivia.iceologer", "Дальний родственник Призывателя,\nЛедолог применяет свою ледяную силу\nпротив всех, кто вторгается на его территорию.")
    event.add("custom.trivia.illusioner", "Родственник Призывателя,\nэтот мастер иллюзорной магии\nнепременно запутает и введёт в заблуждение всех.")
    event.add("custom.trivia.tuff_golem", "Этот небольшой кузен Железного Голема\nпокажет всё, что вы ему дадите — только убедитесь, что он не уйдёт со своего поста.")
    event.add("custom.trivia.wildfire", "Повелитель всех Блейзов, Дикий Огонь\nнеимоверно крепок для неподготовленных авантюристов.\n\nУбедитесь, что вы максимально устойчивы к огню.")

    // cataclysm
    event.add("custom.trivia.amethyst_crab", "Когда гигантские крабы встречают\nАметистовую Жеоду, некоторые из них проявляют излишнее любопытство\nи превращаются в живую Жеоду.")
    event.add("custom.trivia.ancient_remnant", "Древние останки давно умершего динозавра,\nоживлённые неизвестной магией.")
    event.add("custom.trivia.aptrgangr", "Мёртвый предводитель Драугров,\nАптрганг владеет своим огромным боевым топором с невероятной ловкостью.")
    event.add("custom.trivia.cindaria", "Странный боец,\nнапоминающий Медузу.")
    event.add("custom.trivia.clawdian", "Некоторые ракообразные\nэволюционируют за пределы вершины краборазвития,\nформируя собственную воинскую касту.")
    event.add("custom.trivia.coral_golem_cataclysm", "Стражи Коралловых Рифов,\nэти Големы ещё опаснее железных\nблагодаря острым коралловым выростам.")
    event.add("custom.trivia.coralssus", "Ветеран среди Коралловых Големов.\nНе такой острый, но всё равно смертоноснее.")
    event.add("custom.trivia.deepling", "Странные обитатели водных подземелий.\nО них известно немного.")
    event.add("custom.trivia.draugr", "Изредка викинг, погибший в бою,\nне попадает в Вальхаллу или Хель —\nвместо этого он обречён бродить по Земле\nкак мёртвый воин.\nЕго поиски покоя в загробной жизни бесконечны.")
    event.add("custom.trivia.drowned_host", "Невольный носитель Симбиокта.\nЛучше положить конец их страданиям, пока\nих мучительные крики не завладели вашей психикой.")
    event.add("custom.trivia.elite_draugr", "Дух ветерана-викинга,\nзакалённый десятилетиями сражений.")
    event.add("custom.trivia.endermaptera", "Эти надоедливые жуки\nобитают в Крае.\nКак и все мелкие вредители,\nединственный хороший жук — мёртвый жук.")
    event.add("custom.trivia.hippocamtus", "Стражи затонувшего сокровища,\nкогда-то считавшегося навсегда потерянным.")
    event.add("custom.trivia.ignis", "Правитель огненного мира Незера,\nИгнис — серьёзный противник.\nУбедитесь, что вы максимально\nзащищены от огня, прежде чем принять его вызов.")
    event.add("custom.trivia.ignited_berserker", "Кузен Блейза,\nэтот бронированный противник будет защищать\nсвою территорию до смерти.")
    event.add("custom.trivia.ignited_revenant", "Кузен Блейза,\nэтот укреплённый воин даст серьёзный бой,\nзащищая своё укреплённое логово.\nОн чем-то напоминает вам кое-что...")
    event.add("custom.trivia.kobolediator", "Скелет Гладиатора-Кобольда.\nОстерегайтесь его огромного меча.")
    event.add("custom.trivia.koboleton", "Быстрый, костлявый Кобольд.\nПопытайтесь убить его снова, прежде чем он заколет вас до смерти.")
    event.add("custom.trivia.lionfish_cataclysm", "Охотник глубин,\nРыба-лев отравляет добычу перед тем, как съесть.")
    event.add("custom.trivia.maledictus", "Призрачный король, поклявшийся\nубить вас на месте —\nно праведен ли его гнев, или это жажда мести?")
    event.add("custom.trivia.netherite_monstrosity", "Страж всего адского,\nэто соединение незерита и воли\nобречено уничтожать всех,\nкто достаточно безрассуден, чтобы бросить ему вызов.")
    event.add("custom.trivia.royal_draugr", "Дух королевского викинга, обладавшего большим богатством при жизни.")
    event.add("custom.trivia.scylla", "Чудовищный воин,\nнастроенный на ваше уничтожение.")
    event.add("custom.trivia.symbiocto", "Некоторые осьминоги жаждут контроля\nи находят носителя, которого можно захватить.\n\nОбычно это делают крабы...")
    event.add("custom.trivia.the_harbinger", "Продвинутая форма Иссушителя,\nставшая куда смертоноснее благодаря нескольким улучшениям.")
    event.add("custom.trivia.the_prowler", "Это механическое чудовище\nодержимо желанием вас найти.\n\nОхотьтесь на него, прежде чем оно начнёт охоту на вас.")
    event.add("custom.trivia.the_watcher", "Автономный сканер,\nотправленный шпионить за вами.\n\nПри необходимости защитится.")
    event.add("custom.trivia.urchinkin", "Злобные ежи, стремящиеся вас уничтожить.")
    event.add("custom.trivia.wadjet", "Останки\nдревнего змееподобного воина,\nпоклявшегося защищать своего хозяина.")

    // occultism
    event.add("custom.trivia.afrit", "Блуждающий дух,\nготовый к использованию.")
    event.add("custom.trivia.possessed_endermite", "Даже эндерические существа не застрахованы\nот влияния оккультизма.")

    //minecraft
    event.add("custom.trivia.bee", "Порхая по лесу,\nПчёлы неустанно производят Соты,\nкоторые можно перегнать в центрифуге в разные вещи.\nПодождите, это не совсем так...")
    event.add("custom.trivia.salmon", "Регулярно мигрирует вверх по течению, чтобы отложить икру.")
    event.add("custom.trivia.llama", "Часто встречаемые в Саваннах,\nЛамы известны своей враждебностью ко всем, кто осмеливается их тронуть.")
    event.add("custom.trivia.pufferfish", "Надоедливый обитатель Океана.\nУничтожьте до того, как станет помехой.")
    event.add("custom.trivia.sniffer", "Бродит вокруг в поисках еды\n— а может, чего-то ещё?")
    event.add("custom.trivia.tropical_fish", "Как рыба, только тропичнее.")
    event.add("custom.trivia.turtle", "Ношение этого сделает вас достаточно черепашьими для клуба черепах.\n(или сделает из вас своего рода ниндзя, возможно?)")
    event.add("custom.trivia.pillager", "Лучники разбойничьих племён,\nбродящих по Верхнему Миру\nв поисках следующей жертвы.")
    event.add("custom.trivia.ravager", "Невероятно сильный боевой зверь,\nиспользуемый только во время набегов на деревни,\nпроклятые чёрствыми авантюристами.")
    event.add("custom.trivia.vindicator", "Боец переднего края\nразбойничьих племён, бродящих по Верхнему Миру\nв поисках следующей жертвы.\n\nОпасайтесь их мощных ударов.")

    //goblintraders
    event.add("custom.trivia.vein_goblin_trader", "Загадочный торговец, обитающий в глубинах Нижнего мира,\nищущий возможность обменять редкие и ценные материалы.");
    event.add("custom.trivia.goblin_trader", "Загадочный торговец, обитающий в глубинах мира,\nищущий возможность обменять редкие и ценные материалы.");

    //#endregion

    //#region rituals
    event.add('ritual.occultism.craft_curio_bag.started', "Starting the ritual: Craft Trinkets Pouch.")
    event.add('ritual.occultism.craft_curio_bag.conditions', "Not all requirements for this ritual are met.")
    event.add('ritual.occultism.craft_curio_bag.finished', "Ritual completed successfully: Craft Trinkets Pouch.")
    event.add('ritual.occultism.craft_curio_bag.interrupted', "Interruption in the ritual: Craft Trinkets Pouch.")

    event.add('ritual.occultism.craft_vial_of_liquid_confidence.started', "Starting the ritual: Craft Vial Of Liquid Confidence.")
    event.add('ritual.occultism.craft_vial_of_liquid_confidence.conditions', "Not all requirements for this ritual are met.")
    event.add('ritual.occultism.craft_vial_of_liquid_confidence.finished', "Ritual completed successfully: Craft Vial Of Liquid Confidence.")
    event.add('ritual.occultism.craft_vial_of_liquid_confidence.interrupted', "Interruption in the ritual: Craft Vial Of Liquid Confidence.")
    //#endregion

    // esoteric reaping tooltips
    event.add('milf.esoteric_reaping.wind_nucleus', "Выпадает с <wind>Бриза</wind> при убийстве <keyword>Примитивной Косой</keyword>")
    event.add('milf.esoteric_reaping.grim_talc', "Выпадает со <bone>Скелетов</bone> при убийстве <keyword>Примитивной Косой</keyword>")
    event.add('milf.esoteric_reaping.astral_weave', "Выпадает с <soul>Фантомов</soul> при убийстве <keyword>Примитивной Косой</keyword>")
    event.add('milf.esoteric_reaping.rotting_essence', "Выпадает с <blood>Нежити</blood> при убийстве <keyword>Примитивной Косой</keyword>")
    event.add('milf.esoteric_reaping.warp_flux', "Выпадает с <magic>Эндерменов</magic> при убийстве <keyword>Примитивной Косой</keyword>")

    // ore_tooltips
    event.add('milf.ore_tooltip.overworld', '☀ Оверворлд')
    event.add('milf.ore_tooltip.nether', '⬛ Ад')
    event.add('milf.ore_tooltip.eternal_starlight', '✦ Eternal Starlight')
    event.add('milf.ore_tooltip.deeper_down', '▼ Deeper Down')
    event.add('milf.ore_tooltip.the_end', '🌌 Энд')
    event.add('milf.ore_tooltip.crimson_veil', '🥀 Кровавые Пустоши')
    event.add('milf.ore_tooltip.quarry_only', 'Добывается только в Electric Quarry')
    event.add('milf.ore_tooltip.silver_byproduct', 'Можно получить как побочный продукт при переработке свинцовой руды')

    // key_prompts
    event.add('milf.key_prompts.slow_down', 'Замедлить ход')
    event.add('milf.key_prompts.villager_refresh', 'Обновить сделки')
    event.add('milf.key_prompts.dismount', 'Слезть')
    event.add('milf.key_prompts.go_up', 'Вверх')
    event.add('milf.key_prompts.go_down', 'Вниз')
    event.add('key.hexerei.broomActivate', 'Угол обзора (F5 для работы)')
    event.add('milf.key_prompts.horn', 'Активировать сигнал')
})
