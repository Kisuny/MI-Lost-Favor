/** @type {typeof import("net.minecraft.world.item.ItemStack").$ItemStack } */
let $ItemStack  = Java.loadClass("net.minecraft.world.item.ItemStack")
let $Registries = Java.loadClass("net.minecraft.core.registries.Registries")
let $ResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey')
let $ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
let $DisabledEnchantmentsConfig = Java.loadClass("me.pajic.enchantmentdisabler.ED").CONFIG
let $DataComponents = Java.loadClass("net.minecraft.core.component.DataComponents")
let $Tool = Java.loadClass("net.minecraft.world.item.component.Tool")
let $TagKey = Java.loadClass("net.minecraft.tags.TagKey")
let $CompoundTag = Java.loadClass("net.minecraft.nbt.CompoundTag")

const ORBCRAFT_BLACK_LIST = [  

]

const ORBCRAFT_CURSES = [
    "vanishing_curse", "binding_curse"
]

const ENCHANTMENT_REGISTRY_KEY = $ResourceKey.createRegistryKey($ResourceLocation.parse('minecraft:enchantment'))

function addRandomEnchantment(/**@type { import("dev.latvian.mods.kubejs.item.ItemClickedKubeEvent").$ItemClickedKubeEvent$$Original}*/ event, /**@type { import("net.minecraft.world.item.ItemStack").$ItemStack$$Original}*/ item, level, /**@type { (id: import("net.minecraft.resources.ResourceLocation").$ResourceLocation, enchantment: import("net.minecraft.world.item.enchantment.Enchantment").$Enchantment$$Original) => boolean}*/ additionalEnchantmentConditions){
    /**@type {import("net.minecraft.world.item.enchantment.Enchantment").$Enchantment$$Original[]}*/
    let applicableEnchantments = []
    /**@type {import("java.util.ArrayList").$ArrayList}*/
    let disabledEnchantments = $DisabledEnchantmentsConfig.disabler.disabledEnchantments

    if(additionalEnchantmentConditions == undefined){
        additionalEnchantmentConditions = () => { return true}
    }

    let enchantmentRegistry = event.server.registryAccess().registryOrThrow(ENCHANTMENT_REGISTRY_KEY)

    enchantmentRegistry.entrySet().forEach((entry) => {
        /**@type {import("net.minecraft.world.item.enchantment.Enchantment").$Enchantment$$Original}*/ 
        let enchantment = entry.getValue()
        let id = entry.getKey()
        let fullEnchantmentName =  `${id.getNamespace()}:${id.getPath()}`
        if(disabledEnchantments.stream().anyMatch(e => e == fullEnchantmentName)) {
            //console.log(`Disabled:${fullEnchantmentName}`);
            return
        }
        if(id.getNamespace() == "minecraft" && item.canBeEnchantedWith(enchantment, "primary") && !item.enchantments.keySet().contains(enchantmentRegistry.wrapAsHolder(enchantment)) && additionalEnchantmentConditions(id, enchantment)){
            //vanillaEnchantments.set(id, enchantment)
            applicableEnchantments.push(enchantment)
        }
        //console.log(id.getNamespace())
    })
    
    if(applicableEnchantments.length > 0){
        let randomEnchantment = applicableEnchantments[Math.floor(Math.random() * applicableEnchantments.length)]
        let enchantmentLVL = 1
        switch (level) {
            case -1:
                enchantmentLVL = randomEnchantment.getMaxLevel()
                break;
            case -2:
                enchantmentLVL = randomEnchantment.getMaxLevel() + 2
                break;
            default:
                enchantmentLVL = level || 1
                break;
        }
        item.enchant(randomEnchantment, enchantmentLVL)
        //item.enchantments.enchantments["put(java.lang.Object,int)"](randomEnchantment, 1)
        orbChangesMessage(event)
        event.player.tell(Text.translatable("milf.orbcraft.added").append(randomEnchantment.description()))
    } else {
        sendImmersiveMessage(Text.translatable("milf.orbcraft.error.enchantments"), event.player, DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
        let orb = event.player.getMainHandItem()
        orb.count++
        //event.player.tell("This item has no more applicable enchantments")
    }
}

function addSpecificEnchantment(/**@type { import("dev.latvian.mods.kubejs.item.ItemClickedKubeEvent").$ItemClickedKubeEvent$$Original}*/ event, /**@type { import("net.minecraft.world.item.ItemStack").$ItemStack$$Original}*/ item, level, enchantmentId, /**@type { (id: import("net.minecraft.resources.ResourceLocation").$ResourceLocation, enchantment: import("net.minecraft.world.item.enchantment.Enchantment").$Enchantment$$Original) => boolean}*/ additionalEnchantmentConditions){
    let enchantmentRegistry = event.server.registryAccess().registryOrThrow(ENCHANTMENT_REGISTRY_KEY)
    let enchantment = enchantmentRegistry.get(enchantmentId)
    let enchantmentLVL = 1
    switch (level) {
        case -1:
            enchantmentLVL = enchantment.getMaxLevel()
            break;
        case -2:
            enchantmentLVL = enchantment.getMaxLevel() + 2
            break;
        default:
            enchantmentLVL = level || 1
            break;
    }
    item.enchant(enchantment, enchantmentLVL)
}

/**@returns { import("net.minecraft.resources.ResourceLocation").$ResourceLocation}*/
function getEnchantmentIdFromRegistry(enchantmentRegistry, enchantment){
    return enchantmentRegistry.getKey(enchantment)
}

function removeRandomEnchantment(event, /**@type { import("net.minecraft.world.item.ItemStack").$ItemStack$$Original}*/ item){
    let {randomEnchantment} = getAllEnchantments(item)
    item.enchantments.enchantments.remove(randomEnchantment)
    orbChangesMessage(event)
    event.player.tell(Text.translatable("milf.orbcraft.orb_removed").append(randomEnchantment.value().description()))
}

function applyOrb(/**@type { import("dev.latvian.mods.kubejs.item.ItemClickedKubeEvent").$ItemClickedKubeEvent$$Original}*/ event, /**@type { (item: import("net.minecraft.world.item.ItemStack").$ItemStack$$Original) => boolean }*/ condition, /**@type { (item: import("net.minecraft.world.item.ItemStack").$ItemStack$$Original) => boolean }*/ effect){
    if (event.hand == "OFF_HAND") return false
    if (event.level.isClientSide()) return false
    let item = event.player.getOffHandItem()
    if (item.id == "minecraft:air") {
        sendImmersiveMessage(Text.translatable("milf.orbcraft.error.offhand"), event.player, DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
        return false
    }
    if(!item.enchantable && !item.enchanted){ 
        sendImmersiveMessage(Text.translatable("milf.orbcraft.error.enchantments"), event.player, DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
        return false
    }
    if(ORBCRAFT_BLACK_LIST.includes(item.id)) return false

    if(condition(item)){
        if(effect(item) != false){
            if(!event.player.creative){
                let orb = event.player.getMainHandItem()
                orb.count--
            }
        }
        event.player.inventoryMenu.broadcastFullState()
    } else {        
        sendImmersiveMessage(Text.translatable("milf.orbcraft.error.type"), event.player, DEFAULT_WARN_NOTIFICATION_STYLE, event.server)
    }
    return true

}

function getAllEnchantments(/**@type { import("net.minecraft.world.item.ItemStack").$ItemStack$$Original}*/ item){
    return getAllEnchantmentsWithCondition(item, (enchantment, level) => {return true})
}

function getAllEnchantmentsWithCondition(/**@type { import("net.minecraft.world.item.ItemStack").$ItemStack$$Original}*/ item, /**@type { (enchantment: import("net.minecraft.core.Holder").$Holder<import("net.minecraft.world.item.enchantment.Enchantment").$Enchantment$$Original>, level: number) => boolean}*/ condition){
    /**@type {import("net.minecraft.core.Holder").$Holder<import("net.minecraft.world.item.enchantment.Enchantment").$Enchantment$$Original>[]}*/
    let enchantments = []
    /** @type {Map<import("net.minecraft.core.Holder").$Holder<import("net.minecraft.world.item.enchantment.Enchantment").$Enchantment$$Original>, number>} */
    let enchantmentsMap = new Map()
    let totalLVL = 0, totalCLVL = 0
    item.enchantments.enchantments.forEach((enchantment, level) => {
        if(condition(enchantment, level)){
            enchantments.push(enchantment)
            totalCLVL += level
            enchantmentsMap.set(enchantment, level)
        }
        totalLVL += level
    })
    return { enchantments:enchantments, enchantmentsMap:enchantmentsMap, totalLVL:totalLVL, totalCLVL:totalCLVL, enchantmentsCount:enchantments.length, randomEnchantment:enchantments[Math.floor(Math.random() * enchantments.length)]}
}

function getExponentialSuccessChance(enchantmentsSize, baseSize, baseChance, decayFactor) {
    if (enchantmentsSize <= baseSize) {
        return baseChance;
    }
    
    const excessSize = enchantmentsSize - baseSize;
    return baseChance * Math.pow(1 / decayFactor, excessSize);
}

function orbChangesMessage(event){
    //sendImmersiveMessage(Text.translatable("milf.orbcraft.changes"), event.player, DEFAULT_CENTER_MESSAGE_STYLE(1.5), event.server)
    event.player.tell(Text.translatable("milf.orbcraft.changes"))
}