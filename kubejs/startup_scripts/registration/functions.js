//priority: 1000
/** @type {typeof import("net.neoforged.neoforge.event.BlockEntityTypeAddBlocksEvent").$BlockEntityTypeAddBlocksEvent } */
let $BlockEntityTypeAddBlocksEvent  = Java.loadClass("net.neoforged.neoforge.event.BlockEntityTypeAddBlocksEvent")
/** @type {typeof import("net.minecraft.world.level.block.state.properties.EnumProperty").$EnumProperty } */
let $EnumProperty  = Java.loadClass("net.minecraft.world.level.block.state.properties.EnumProperty")
/** @type {typeof import("net.minecraft.world.level.block.state.properties.IntegerProperty").$IntegerProperty } */
let $IntegerProperty  = Java.loadClass("net.minecraft.world.level.block.state.properties.IntegerProperty")
/** @type {typeof import("net.minecraft.world.level.block.state.properties.BooleanProperty").$BooleanProperty } */
let $BooleanProperty  = Java.loadClass("net.minecraft.world.level.block.state.properties.BooleanProperty")
global.langCustomStuff = global.langCustomStuff || {}

const enabledProperty = $BooleanProperty.create("enabled")
//const activeMachineShapeProperty  = $EnumProperty.create("shape", "String",["0", "1", "2", "3", "4"])
const activeMachineShapeProperty  = $IntegerProperty.create("machine_shape", 0, 5)
const previewOffsetProperty = $IntegerProperty.create("preview_offset", 0, 5)


function createNewItem(id, args) {
    args = args || {}
    StartupEvents.registry('item', event => {
        let item = args.itemType ? event.create("milf:" + id, args.itemType) : event.create("milf:" + id)
        item.texture(args.texturePath || `milf:item/${id}`)
        itemBuilder(item, args)
    })
    global.langCustomStuff[`item.milf.${id}`] = Object.assign({ "en_us": idToName(id) }, args.lang)
}

function itemBuilder(/**@type {$ItemBuilder_} */ item, args) {
    args.stackSize && item.maxStackSize(args.stackSize)
    args.rarity && item.rarity(args.rarity)
    args.material && item.material(args.material)
    args.tag && (!Array.isArray(args.tag) ? item.tag(args.tag) : args.tag.forEach(tag => { item.tag(tag) }))
    args.maxDamage && item.maxDamage(args.maxDamage)
    args.useAnimation && item.useAnimation(args.useAnimation)
    args.food && item.food(food => {
        args.food.nutrition && food.nutrition(args.food.nutrition)
        args.food.saturation && food.saturation(args.food.saturation)
        args.food.effects && args.food.effects.forEach(effect => food.effect.apply(food, effect))
        args.food.alwaysEdible && food.alwaysEdible()
        args.food.eaten && food.eaten(ctx => global.get(args.food.eaten).call(global.get(args.food.eaten), ctx))
    })
    if (args.use){
        item.use((level, player, hand) => args.use.conditions ? args.use.conditions(level, player, hand)  : true)
        item.useDuration(itemStack => args.use.duration || 64)
        item.useAnimation(args.use.animation || "bow")
        item.finishUsing((itemstack, level, entity) => args.use.finishUsing ? args.use.finishUsing(itemstack, level, entity) : itemstack)
        args.use.releaseUsing && item.releaseUsing((itemstack, level, entity, tick) =>args.use.releaseUsing(itemstack, level, entity, tick))
    }
    if(args.itemProperties){
        let properties = item.createItemProperties()
        args.itemProperties.craftRemainder && properties.craftRemainder(args.itemProperties.craftRemainder)
    }
    if(args.dynamicName){
        item.name((itemStack) => args.dynamicName(itemStack))
    }
}

function createNewBlock(id, args) {
    args = args || {}
    StartupEvents.registry('block', event => {
        const block = args.blockType ? event.create("milf:" + id, args.blockType) : event.create("milf:" + id)
        block.texture(args.texturePath || `milf:block/${id}`)
        args.soundType && block.soundType(args.soundType)
        args.requiresTool && block.requiresTool(true)
        args.hardness && block.hardness(args.hardness)
        args.opaque && block.opaque(args.opaque)
        args.lightLevel && block.lightLevel(args.lightLevel)
        args.renderType && block.renderType(args.renderType)
        args.defaultCutout && block.defaultCutout()
        args.box && block.box.apply(block, args.box)
        args.tagBlock && (!Array.isArray(args.tagBlock) ? block.tagBlock(args.tagBlock) : args.tagBlock.forEach(tag => { block.tagBlock(tag) }))
        args.parentModel && block.parentModel(args.parentModel)
        args.noDrops && block.noDrops()
        args.notSolid && block.notSolid()
        args.waterlogged && block.waterlogged()
        //args.property && block.property(args.property)
        args.blockEntity && block.blockEntity(args.blockEntity)
        args.property && (!Array.isArray(args.property) ? block.property(args.property) : args.property.forEach(property => { block.property(property)}))
        if (args.defaultState) {
            block.defaultState(state => {
                args.defaultState.cycle && state.cycle(args.defaultState.cycle)
                args.defaultState.setProperty && state.set(args.defaultState.setProperty.property, args.defaultState.setProperty.value)
            })
        }
        block.item(item => {
            itemBuilder(item, args)
        })
    })
    global.langCustomStuff[`block.milf.${id}`] = Object.assign({ "en_us": idToName(id) }, args.lang)
}

function createNewFluid(id, args) {
    args = args || {}
    StartupEvents.registry('fluid', event => {
        let fluid = args.textureType ? event.create("milf:" + id, args.textureType) : event.create("milf:" + id)
        args.stillTexture && fluid.stillTexture(args.stillTexture)
        args.flowingTexture && fluid.flowingTexture(args.flowingTexture)
        args.color && fluid.tint.apply(fluid, [args.color])
        itemBuilder(fluid.bucketItem, args)
    })
    global.langCustomStuff[`fluid.milf.${id}`] = Object.assign({ "en_us": idToName(id) }, args.lang)
}

function idToName(id) {
    return id.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

function textAnimatorString(text, type){
    return `<${type}>${text}</${type}>`
}

function textAnimatorStringForEach(text, type){
	let newText = ""
	for(let char of text){
		newText += textAnimatorString(char, type)
	}
    return newText
}

global.setOnFire = ctx => {
    ctx.player.setRemainingFireTicks(200)
}