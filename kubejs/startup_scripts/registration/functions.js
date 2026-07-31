//priority: 1000

let $BlockEntityTypeAddBlocksEvent  = Java.loadClass("net.neoforged.neoforge.event.BlockEntityTypeAddBlocksEvent")
let $EnumProperty  = Java.loadClass("net.minecraft.world.level.block.state.properties.EnumProperty")
let $IntegerProperty  = Java.loadClass("net.minecraft.world.level.block.state.properties.IntegerProperty")
let $BooleanProperty  = Java.loadClass("net.minecraft.world.level.block.state.properties.BooleanProperty")

global.langCustomStuff = global.langCustomStuff || {}
global.creditCustomStuff = global.creditCustomStuff || {}

function createNewItem(id, args) {
    args = args || {}
    StartupEvents.registry('item', event => {
        let item = args.itemType ? event.create("milf:" + id, args.itemType) : event.create("milf:" + id)
        item.texture(args.texturePath || `milf:item/${id}`)
        itemBuilder(item, args)
    })
    milfData.ITEM(id, args)
    //global.langCustomStuff[`item.milf.${id}`] = Object.assign({ "en_us": idToName(id) }, args.lang)
}

function createNewJavaItem(id, args, itemFactory) {
    args = args || {}
    StartupEvents.registry('item', event => {
        let builder = event.createCustom(`milf:${id}`, () => {
            return itemFactory()
        })
        itemBuilder(builder, args)
    })
    milfData.ITEM(id, args)
}

let milfData = {

    addAllMilf(id, args, type) {
        this.addMilfLang(id, args, type)
        this.addMilfCredit(id, type)
    },

    addMilfLang(id, args, type) {
        this.addLang(id, args, type, "milf")
        //global.langCustomStuff[`${type}.milf.${id}`] = Object.assign({ "en_us": idToName(id) }, args.lang)
    },

    addLang(id, args, type, modId){
        global.langCustomStuff[`${type}.${modId}.${id}`] = Object.assign({ "en_us": idToName(id) }, args.lang)
    },

    addMilfCredit(id, type){
        this.addCredit(id, type, "milf")
    },

    addCredit(id, type, modId){
        if (type == "fluid") {
            global.creditCustomStuff[`${modId}:${id}_bucket`] = `milf.credit.${type}`
            return
        }
        global.creditCustomStuff[`${modId}:${id}`] = `milf.credit.${type}`
    },

    ITEM(id, args) { this.addAllMilf(id, args, "item")},
    BLOCK(id, args) { this.addAllMilf(id, args, "block")},
    FLUID(id, args) { this.addAllMilf(id, args, "fluid")}

}

function itemBuilder(/**@type {$DiggerItemBuilder$Pickaxe} */ builder, args) {
    args.modelGenerator && builder.modelGenerator(args.modelGenerator)
    args.stackSize && builder.maxStackSize(args.stackSize)
    args.rarity && builder.rarity(args.rarity)
    args.material && builder.material(args.material)
    args.tag && (!Array.isArray(args.tag) ? builder.tag(args.tag) : args.tag.forEach(tag => { builder.tag(tag) }))
    args.maxDamage && builder.maxDamage(args.maxDamage)
    args.useAnimation && builder.useAnimation(args.useAnimation)
    args.food && builder.food(food => {
        args.food.nutrition && food.nutrition(args.food.nutrition)
        args.food.saturation && food.saturation(args.food.saturation)
        args.food.effects && args.food.effects.forEach(effect => food.effect.apply(food, effect))
        args.food.alwaysEdible && food.alwaysEdible()
        args.food.eaten && food.eaten(ctx => global.get(args.food.eaten).call(global.get(args.food.eaten), ctx))
    })
    if (args.use){
        builder.use((level, player, hand) => args.use.conditions ? args.use.conditions(level, player, hand)  : true)
        builder.useDuration(itemStack => args.use.duration || 64)
        builder.useAnimation(args.use.animation || "bow")
        builder.finishUsing((itemstack, level, entity) => args.use.finishUsing ? args.use.finishUsing(itemstack, level, entity) : itemstack)
        args.use.releaseUsing && builder.releaseUsing((itemstack, level, entity, tick) =>args.use.releaseUsing(itemstack, level, entity, tick))
    }
    if(args.itemProperties){
        let properties = builder.createItemProperties()
        args.itemProperties.craftRemainder && properties.craftRemainder(args.itemProperties.craftRemainder)
    }
    if(args.dynamicName){
        builder.name((itemStack) => args.dynamicName(itemStack))
    }
    if(args.tool){
        args.tool.tier && builder.tier(args.tool.tier)
        args.tool.attackDamageBonus && builder.attackDamageBonus(args.tool.attackDamageBonus)
        args.tool.speed && builder.speed(args.tool.speed)
        args.tool.attackDamageBaseline && builder.attackDamageBaseline(args.tool.attackDamageBaseline)
        args.tool.speedBaseline && builder.speedBaseline(args.tool.speedBaseline)
        args.tool.modifyTier && builder.modifyTier(args.tool.modifyTier())
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
    milfData.BLOCK(id, args)
}

function createNewJavaBlock(id, args, blockFactory) {
    args = args || {}
    StartupEvents.registry('block', event => {
        let builder = event.createCustom(`milf:${id}`, () => {
            return blockFactory()
        })
        
    })
    createNewJavaItem(id, args, () => new $BlockItem(`milf:${id}`, new $Item$Properties()))
    milfData.BLOCK(id, args)
}

function createNewFluid(id, args) {
    args = args || {}
    StartupEvents.registry('fluid', event => {
        let fluid = args.textureType ? event.create("milf:" + id, args.textureType) : event.create("milf:" + id)
        args.stillTexture && fluid.stillTexture(args.stillTexture)
        args.flowingTexture && fluid.flowingTexture(args.flowingTexture)
        args.color && fluid.tint.apply(fluid, [args.color])
        args.levelDecreasePerBlock && fluid.levelDecreasePerBlock(args.levelDecreasePerBlock)
        args.fluidTag && fluid.tag(args.fluidTag)
        args.noBucket && fluid.noBucket()
        args.noBlock && fluid.noBlock()

        itemBuilder(fluid.bucketItem, args)
    })
    milfData.FLUID(id, args)
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