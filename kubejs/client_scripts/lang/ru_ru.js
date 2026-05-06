ClientEvents.lang('ru_ru', event => {
    event.add('mia.tooltip.strainer.how.to.use', 'Тут будет текст о том как использовать strainer')
    event.add('milf.text.entity.interact.part0', 'На данный момент, ')
    event.add('milf.text.entity.interact.part1', ' не хочет взаимодействовать с тобой')
    event.add('milf.text.entity.interact.part2', 'Что-то магическое запрещает вам использовать ')
    event.add('milf.text.block.interact.part0', 'Странная магия мешает вам использовать этот блок')
    event.add('milf.text.first_join', `Добро пожаловать в ${textAnimatorString("MI:Lost Favor", "grad", {from:"#848dcb", to:"#45509d", f:0.5})}!`)
    
    event.add('milf.stage.congratulations', `${textAnimatorString("Поздравляем!!!", "wave", {a:0.25, w:0.25, f:0.5})}`)
    event.add('milf.stage.something_changed', `${textAnimatorString("Вы чувствуете, что что-то изменилось...", "wiggle", {a:0.25, f:0.35})}`)

    event.add('milf.stage.bronze_age', `Вы перешли в ${textAnimatorString("Бронзовую Эпоху", "grad", {from:"#CD7F32", to:"#F6BA7D", f:0.5})}`)
    event.add('milf.stage.monsterplus_mobs', `Вы начали слышать ${textAnimatorString("крики мертвых", "grad", {from:"#F00B0B", to:"#7A0F0B", f:0.5})} ночью`)
    event.add('milf.stage.mowziesmobs_mobs', `новые ${textAnimatorString("опасности", "grad", {from:"#F00B0B", to:"#7A0F0B", f:0.5})} появились на вашем пути`)
    event.add('milf.stage.eidolon_mobs', `Вы чувствуете как по вашему телу пробежал ${textAnimatorString("холодок", "grad", {from:"#353DCA", to:"#52B5C4", f:0.5})}!`)
    event.add('milf.stage.mythsandlegends_mobs', `Мифические существа ${textAnimatorString("могут вас услышать", "grad", {from:"#F00B0B", to:"#7A0F0B", f:0.5})} ночью, будьте осторожны!`)
    event.add('milf.stage.cataclysm_mobs', `Что-то древнее шевелится в ${textAnimatorString("тёмных глубинах", "grad", {from:"#1A4FFF", to:"#0A1A7A", f:0.5})}...`)
    event.add('milf.stage.grimoireofgaia_mobs', `Мир кишит ${textAnimatorString("существами, которым нет числа", "grad", {from:"#9B59B6", to:"#E8D5FF", f:0.5})}`)
    event.add('milf.stage.tier_1_access_ore', `Шахты были благословлены ${textAnimatorString("новыми рудами", "grad", {from:"#55A2FA", to:"#8DDBFF", f:0.5})}...`)
    event.add('milf.stage.tier_2_access_ore', 'Unlocked: iridium / platinum / titanium / tungsten / uranium ore')
    event.add('milf.stage.xaeromap', 'Разблокированы: мини-карта, радар, метки')
    event.add('milf.stage.minecraft_mobs', `Вы начали слышать ${textAnimatorString("странные звуки", "grad", {from:"#ED1A1A", to:"#B62651", f:0.5})} ночью...`)
    event.add('milf.stage.early_items', `Этот мир больше не ${textAnimatorString("отвергает", "glitch")} вас...`)
    event.add('milf.how_to_seed.tooltip', 'Можно найти в птичьем гнезде или купить на рынке')
    event.add('milf.how_to_get_blaze_core.tooltip', 'Можно получить с шансом 50% если убить ключом: Sacred Pontiff, Lord Pumpking, The Black Charro, Umvuthi, Frostmaw, Ferrous Wroughtnaut, Amethyst Crab')
    event.add('milf.how_to_get_electronice_ender_core.tooltip', 'Можно получить с шансом 50% если убить ключом: Nether Gauntlet, Night Lich, Obsidilith, Void Blossom, Geburah, Chesed, Malkuth')

    event.add('desc.immersiveengineering.info.mineral.nether_silt', 'Странная магия мешает вам использовать этот блок')

    event.add('advancements.apotheosis.progression.ascent.criteria.nether_gauntlet', 'Убить Перчатку Незера')

    event.add('milf.cannot.mine.block', 'Вы не можете добыть блок на данный момент')
    event.add('milf.press_button', 'Зажми ')
    event.add('milf.for_details', 'для подробной информации')
    event.add('milf.amber_visage.tooltip', 'Используется как топливо в Transmogrification Table для изменения внешнего вида предметов, не влияя на их функциональность')
    event.add('milf.orb_of_the_forest.tooltip', 'Для применения сферы к топору держите сферу в основной руке, а любой топор — во второй и нажмите ПКМ')
    event.add('milf.beltborne_lanterns.tooltip', 'Нажмите CTRL + B, держа фонарь — он прикрепится к твоему поясу. Нужно вернуть его в руки? Нажмите CTRL + B снова')
    event.add('milf.money_pouch.tooltip', `Можно открыть с помощью ${textAnimatorString("радиального меню", "wave", {a:0.2})}, находясь в слоте для безделушек.`)
    event.add('milf.mi_pipe_recolor.tooltip', 'Можно поменять тип используя Chisel')
    event.add('milf.curio_bag.tooltip', `Можно открыть с помощью ${textAnimatorString("радиального меню", "wave", {a:0.2})} если мешок на панели быстрого доступа или в слоте для безделушек`)

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

    event.add('milf.placers.notification1', `Не хватает места, чтобы ${textAnimatorString("это", "bounce")} разместить`)
    event.add('milf.placers.notification2', `Сначала необходимо выбрать ${textAnimatorString("правильное направление", "glitch")}`)
    event.add('milf.placers.notification3', `Структура должна быть ${textAnimatorString("ТОЧНО", "shake")} такой же`)

    event.add('milf.placers.gui1', `Используйте любой тип ${textAnimatorStringForEach("МОЛОТКА", "bounce")} для создания структуры!`)
    event.add('milf.placers.gui2', `Щелкните правой кнопкой мыши пустой рукой, чтобы просмотреть предварительный вариант`)
    event.add('milf.placers.gui3', ` + ПКМ с пустой рукой, чтобы удалить предварительный просмотр`)
    event.add('milf.empty_box.gui1', `Вы все еще можете вернуть свою структуру!`)
    event.add('milf.empty_box.gui2_1', `Просто `)
    event.add('milf.empty_box.gui2_2', ` + ПКМ с пустой рукой, чтобы вернуть её обратно`)
    event.add('milf.empty_box.gui3_1', `Обратите внимание, что разбивание этой коробки приведет к `)
    event.add('milf.empty_box.gui3_2', `${textAnimatorString("РАЗРУШЕНИЮ", "glitch")}`)
    event.add('milf.empty_box.gui3_3', " этой коробки")
    
    event.add('milf.orbcraft.changes', `${textAnimatorString("Предмет изменён!", "wave", {a:0.25, w:0.25, f:0.5})}`)
    event.add('milf.orbcraft.added', `Энергия сферы наполняет предмет `)
    event.add('milf.orbcraft.removed', `${textAnimatorString(" УДАЛЕНО", "glitch")}`)
    event.add('milf.orbcraft.orb_removed', `Энергия сферы очищает предмет от `)
    event.add('milf.orbcraft.absorbed', ` ${textAnimatorString("поглотила", "shake")} силу всех остальных зачарований!`)
    event.add('milf.orbcraft.destroyed', `Энергия сферы переполняет предмет, ${textAnimatorString("полностью уничтожая", "glitch")} его!`)
    event.add('milf.orbcraft.overenchantment', `Вы чувствуете ${textAnimatorString("потустороннюю", "glitch")} силу, исходящую от предмета!`)
    event.add('milf.orbcraft.maxed', ` уже ${textAnimatorStringForEach("на максимуме", "wave", {a:0.2})}`)

    event.add('milf.orbcraft.error.type', `${textAnimatorString("Неподходящий", "glitch")} предмет для этого типа сферы!`)
    event.add('milf.orbcraft.error.no_valid', `У предмета больше нет ${textAnimatorString("подходящих", "glitch")} зачарований для изменения!`)
    event.add('milf.orbcraft.error.enchantments', `На этот предмет больше нельзя наложить ${textAnimatorString("зачарования", "glitch")}!`)
    event.add('milf.orbcraft.error.offhand', `Целевой предмет должен быть во ${textAnimatorString("второй руке", "glitch")}!`)

    event.add('milf.orbcraft.tooltip.transmutation_orb', `Добавляет до ${textAnimatorString("двух", "grad", {from:"#55A2FA", to:"#8DDBFF", f:0.5})} зачарований к предмету.`)
    event.add('milf.orbcraft.tooltip.regal_orb', `Добавляет до ${textAnimatorString("четырёх", "grad", {from:"#E4C549", to:"#FDE49A", f:0.5})} зачарований к предмету, у которого уже есть хотя бы два.`)
    event.add('milf.orbcraft.tooltip.divine_orb', `Случайно изменяет все зачарования, либо ${textAnimatorString("улучшая", "grad", {from:"#55E408", to:"#D3FFAA", f:0.5})}, либо ${textAnimatorString("ухудшая", "grad", {from:"#E40808", to:"#FFAAAA", f:0.5})} каждое. Не влияет на ${textAnimatorString("сверхзачарованные", "grad", {from:"#55A2FA", to:"#8DDBFF", f:0.5})} и ${textAnimatorString("основанные на проклятиях", "glitch")} зачарования.`)
    event.add('milf.orbcraft.tooltip.orb_of_regret', `Удаляет все чары, кроме одного случайного. Это чар ${textAnimatorStringForEach("максимизируется", "wave", {a:0.2})}. Можно использовать только на предмете с 4 и более чарами.`)
    event.add('milf.orbcraft.tooltip.orb_of_chance', `Либо ${textAnimatorString("уничтожает", "glitch")} предмет, либо ${textAnimatorString("сверхзачаровывает", "grad", {from:"#55A2FA", to:"#8DDBFF", f:0.5})} одно из зачарований уровня 3+. Требует 10+ суммарных уровней зачарования на предмете. Шанс успеха снижается за каждое зачарование сверх четвёртого.`)
    event.add('milf.orbcraft.tooltip.orb_of_annulment', `Удаляет одно ${textAnimatorString("случайное", "shake")} зачарование с предмета.`)
    event.add('milf.orbcraft.tooltip.orb_of_corruption', `Добавляет одно ${textAnimatorString("сверхзачарованное", "grad", {from:"#55A2FA", to:"#8DDBFF", f:0.5})} зачарование к предмету вместе с ${textAnimatorString("Проклятьем утраты", "glitch")}. Можно использовать только на предмете с 4 и более зачарованиями, у которого ещё нет ${textAnimatorString("Проклятия утраты", "glitch")}`)
    event.add('milf.orbcraft.tooltip.orb_of_alchemy', `Поглощает до 4 зачарований с предмета, ${textAnimatorString("уничтожая", "glitch")} его в процессе. Использование зачарованной сферы на другом предмете ${textAnimatorString("заменяет", "fade")} все его зачарования поглощёнными.`)
    event.add('milf.orbcraft.tooltip.orb_of_the_forest', `Наполняет топор ${textAnimatorString("Сущностью Леса", "grad", {from:"#1DEB6C", to:"#6AFFC3", f:0.5})}, позволяя срубать ${textAnimatorString("целое дерево", "grad", {from:"#55E408", to:"#D3FFAA", f:0.5})} за один удар в обмен на снижение эффективности до ${textAnimatorString("одной десятой", "grad", {from:"#E40808", to:"#FFAAAA", f:0.5})}. Можно применить только один раз без возможности отмены.`)

    event.add('milf.text.dim.cant_visit', `${textAnimatorString("Какая-то магия останавливает вас", "glitch")}`)

    event.add('milf.flags.claimed', "Чанк запривачен")
    event.add('milf.flags.unclaimed', "Чанк распривачен")
    event.add('milf.flags.occupied', "Чанк уже запривачен: ")

    event.add('gateways.basic/deer', "Врата Оленя")
    event.add('rei_categories.modern_industrialization.blast_furnace', "Паровая Доменная Печь")

    event.add('desc.immersiveengineering.info.mineral.ametrine_geode', "Аметриновая Жеода")
    event.add('desc.immersiveengineering.info.mineral.zinkenite', "Цинкенит")
    event.add('desc.immersiveengineering.info.mineral.stannite', "Станнит")
    event.add('desc.immersiveengineering.info.mineral.brindleyite', "Бриндлейит")
    event.add('desc.immersiveengineering.info.mineral.hematite', "Гематит")

    event.add("curios.identifier.tool_belt", "Пояс")
    event.add("curios.identifier.backpack", "Рюкзак")
    event.add("curios.identifier.atlas", "Атлас")

    event.add("rite.milf.archwood_broom", "Ритуал Формирования")
    event.add("rite.milf.willow_broom", "Ритуал Формирования")
    event.add("rite.milf.witch_hazel_broom", "Ритуал Формирования")
    event.add("rite.milf.mahogany_broom", "Ритуал Формирования")

    event.add("text.apotheosis.world_tier_tutorial", "Этот предмет имеет неизвестную силу")
    event.add("text.apotheosis.world_tier_tutorial.2", `Нажмите кнопку радиального меню и активируйте ${textAnimatorString("World Tier: Haven", "wave", {a:0.2})}, чтобы разблокировать её`)

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

    // ore_tooltips
    event.add('milf.ore_tooltip.overworld', '☀ Оверворлд')
    event.add('milf.ore_tooltip.nether', '⬛ Ад')
    event.add('milf.ore_tooltip.eternal_starlight', '✦ Eternal Starlight')
    event.add('milf.ore_tooltip.deeper_down', '▼ Deeper Down')
    event.add('milf.ore_tooltip.the_end', '🌌 Энд')
    event.add('milf.ore_tooltip.quarry_only', 'Добывается только в Electric Quarry')
    event.add('milf.ore_tooltip.silver_byproduct', 'Можно получить как побочный продукт при переработке свинцовой руды')
})