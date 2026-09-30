//Your AI slop bores me, Kisu ￣へ￣

// global.langRenames = global.langRenames || {}

// /**
//  * Register localized rename data for an item / block / entity.
//  *
//  * Saves the mapping into the global object `global.langRenames` using `itemId` as key:
//  *   global.langRenames[itemId] = { langs: { "en_us": "Name", ... }, types: [...] }
//  *
//  * ## Behavior:
//  * - If `itemId` is falsy, the function returns early and does nothing.
//  * - `langMap` may contain:
//  *     - `langs` (object) — translations in the form { "en_us": "Name", "ru_ru": "Название", ... }.
//  *       For convenience the function also supports passing the translations directly
//  *       (i.e. `langMap` itself can be the translations object), and will merge with any
//  *       existing entry.
//  *     - `types` (array, optional) — indicates which kinds of rename to apply.
//  *         strings "Item" / "Block" / "entity" (case-insensitive).
//  *       If `types` is omitted or empty the code that consumes `global.langRenames`
//  *       may treat the entry as an Item rename
//  *
//  * The function merges with any previously registered names for the same itemId.
//  *
//  * ## Examples:
//  *   ```js 
//  * addRename("sophisticatedbackpacks:copper_backpack", {
//  *     langs: { "en_us": "Bronze Backpack", "ru_ru": "Бронзовый рюкзак" },
//  *     types: ["Item", "Block"]
//  *   });
//  *   ```
//  *
//  *     (no `langs` wrapper)
//  * ```jsor passing translations directly only for item rename
//  *   addRename("mod:some_item", { "en_us": "Some Item", "ru_ru": "Какой-то предмет" });
//  * ```
//  *
//  * After calling, consumer code can check `entry.types` to decide whether to call
//  * `event.renameItem(...)` / `event.renameBlock(...)` / `event.renameEntity(...)` for each language.
//  *
//  * @param {string} itemId - Identifier of the item/block/entity (e.g. "mod:item_name"). If falsy, nothing happens.
//  * @param {Object} langMap - Map with translations and optional types.
//  * @param {Object} [langMap.langs] - Optional wrapper object of translations: { "en_us": "Name", ... }.
//  *                                   If omitted, `langMap` itself is treated as the translations object.
//  * @param {Array.<(string)>} [langMap.types] - Optional array specifying types to apply to.
//  *                                                     Elements can be constructors (Item, Block) or strings ("Item"/"Block").
//  * @returns {void}
//  */
// function addRename(itemId, langMap) {
//   if (!itemId) return
//   global.langRenames[itemId] = Object.assign(global.langRenames[itemId] || {}, langMap)
// }
// // client restart is required for working
// addRename(
//   "sophisticatedbackpacks:copper_backpack",
//   {
//     langs: { "en_us": "Bronze Backpack", "ru_ru": "Бронзовый рюкзак" },
//     types: ["Block", "Item"]
//   }
// )
// addRename(
//   "sophisticatedbackpacks:iron_backpack",
//   {
//     langs: { "en_us": "Steel Backpack", "ru_ru": "Стальной рюкзак" },
//     types: ["Block", "Item"]
//   }
// )
// addRename(
//   "sophisticatedbackpacks:gold_backpack",
//   {
//     langs: { "en_us": "Aluminum Backpack", "ru_ru": "Алюминиевый рюкзак" },
//     types: ["Block", "Item"]
//   }
// )
// addRename(
//   "sophisticatedbackpacks:diamond_backpack",
//   {
//     langs: { "en_us": "Stainless Steel Backpack", "ru_ru": "Рюкзак из нержавеющей стали" },
//     types: ["Block", "Item"]
//   }
// )
// addRename(
//   "sophisticatedbackpacks:netherite_backpack",
//   {
//     langs: { "en_us": "Blastproof Backpack", "ru_ru": "Взрывостойкий рюкзак" },
//     types: ["Block", "Item"]
//   }
// )

// addRename(
//   "travelertoolbelt:netherite_belt",
//   {
//     langs: { "en_us": "Blastproof Belt", "ru_ru": "Взрывостойкий пояс" },
//     types: ["Item"]
//   }
// )

// addRename(
//   "travelertoolbelt:diamond_belt",
//   {
//     langs: { "en_us": "Stainless Steel Belt", "ru_ru": "Пояс из нержавеющей стали" },
//     types: ["Item"]
//   }
// )

// addRename(
//   "travelertoolbelt:gold_belt",
//   {
//     langs: { "en_us": "Aluminum Belt", "ru_ru": "Алюминиевый пояс" },
//     types: ["Item"]
//   }
// )

// addRename(
//   "travelertoolbelt:iron_belt",
//   {
//     langs: { "en_us": "Steel Belt", "ru_ru": "Стальной пояс" },
//     types: ["Item"]
//   }
// )

// addRename(
//   "travelertoolbelt:copper_belt",
//   {
//     langs: { "en_us": "Bronze Belt", "ru_ru": "Бронзовый пояс" },
//     types: ["Item"]
//   }
// )

// addRename(
//   "eidolon_repraised:raven_feather",
//   {
//     langs: { "en_us": "Crow Feather", "ru_ru": "Перо ворона" },
//     types: ["Item"]
//   }
// )
