//priority: 701

let $EnigmaticHandler = Java.loadClass("auviotre.enigmatic.legacy.handlers.EnigmaticHandler")
let $FinalizeSpawnEvent = Java.loadClass("net.neoforged.neoforge.event.entity.living.FinalizeSpawnEvent")

let $BlockState = Java.loadClass("net.minecraft.world.level.block.state.BlockState")
let $TagParser = Java.loadClass("net.minecraft.nbt.TagParser")

let $ActiveShapeComponent = Java.loadClass("aztech.modern_industrialization.machines.components.ActiveShapeComponent")
let $CompoundTag = Java.loadClass("net.minecraft.nbt.CompoundTag")
let $IntArrayTag = Java.loadClass("net.minecraft.nbt.IntArrayTag")
let $StringTag = Java.loadClass("net.minecraft.nbt.StringTag")
let $ArrayList = Java.loadClass("java.util.ArrayList")
let $StructureTemplate = Java.loadClass("net.minecraft.world.level.levelgen.structure.templatesystem.StructureTemplate")
let $StructurePlaceSettings = Java.loadClass("net.minecraft.world.level.levelgen.structure.templatesystem.StructurePlaceSettings")
let $StructureBlockInfo = Java.loadClass("net.minecraft.world.level.levelgen.structure.templatesystem.StructureTemplate$StructureBlockInfo")
let $Mirror = Java.loadClass("net.minecraft.world.level.block.Mirror")
let $NbtOps = Java.loadClass("net.minecraft.nbt.NbtOps")

let $FTBTeamsAPI = Java.loadClass("dev.ftb.mods.ftbteams.api.FTBTeamsAPI").api()

let $AdvancementProgressEvent = Java.loadClass("net.neoforged.neoforge.event.entity.player.AdvancementEvent$AdvancementProgressEvent")
let $AdvancementEarnEvent = Java.loadClass("net.neoforged.neoforge.event.entity.player.AdvancementEvent$AdvancementEarnEvent")

let $String = Java.loadClass("java.lang.String")

let $DeathInfoManager = Java.loadClass("com.b1n_ry.yigd.data.DeathInfoManager")
let $ResolvableProfile = Java.loadClass("net.minecraft.world.item.component.ResolvableProfile")
let $GraveStatus = Java.loadClass("com.b1n_ry.yigd.data.GraveStatus")

let $ChunkPos = Java.loadClass("net.minecraft.world.level.ChunkPos")

let $Component$Serializer = Java.loadClass("net.minecraft.network.chat.Component$Serializer")
let $HashSet = Java.loadClass("java.util.HashSet")
let $Attributes = Java.loadClass("net.minecraft.world.entity.ai.attributes.Attributes")
let $MobEffectInstance = Java.loadClass("net.minecraft.world.effect.MobEffectInstance")
let $MobEffects = Java.loadClass("net.minecraft.world.effect.MobEffects")
let $Float = Java.loadClass("java.lang.Float")
let $ItemEntity = Java.loadClass("net.minecraft.world.entity.item.ItemEntity")
let $ListTag = Java.loadClass("net.minecraft.nbt.ListTag")

let $BuiltInRegistries = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries")
let $ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation")
let $MobSpawnType = Java.loadClass("net.minecraft.world.entity.MobSpawnType")

let $NodeUtils = Java.loadClass("com.yanny.ali.plugin.common.NodeUtils")
let $Collections = Java.loadClass("java.util.Collections")
let $List = Java.loadClass("java.util.List")

let $PluginManager = Java.loadClass("com.yanny.ali.manager.PluginManager")
let $IItemNode = Java.loadClass("com.yanny.ali.api.IItemNode")
let $ListNode = Java.loadClass("com.yanny.ali.api.ListNode")
let $LootTableNode = Java.loadClass("com.yanny.ali.plugin.common.nodes.LootTableNode")

let $Collectors = Java.loadClass("java.util.stream.Collectors")
let $ILootModifier = Java.loadClass("com.yanny.ali.api.ILootModifier")
let $FakeLootDataManager = Java.loadClass("com.yanny.ali.manager.FakeLootDataManager")

let $ItemCollectorUtils = Java.loadClass("com.yanny.ali.plugin.server.ItemCollectorUtils")
let $Stream = Java.loadClass("java.util.stream.Stream")

let $ChainKnotEntity = Java.loadClass("com.evandev.connectiblechains.entity.ChainKnotEntity")
let $Chainable = Java.loadClass("com.evandev.connectiblechains.entity.Chainable")

let $SteamDrillItem = Java.loadClass("aztech.modern_industrialization.items.SteamDrillItem")

let $ItemStack = Java.loadClass("net.minecraft.world.item.ItemStack")
let $Registries = Java.loadClass("net.minecraft.core.registries.Registries")
let $ResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey')
let $DisabledEnchantmentsConfig = Java.loadClass("me.pajic.enchantmentdisabler.ED").CONFIG
let $DataComponents = Java.loadClass("net.minecraft.core.component.DataComponents")
let $Tool = Java.loadClass("net.minecraft.world.item.component.Tool")
let $TagKey = Java.loadClass("net.minecraft.tags.TagKey")

let $HitResult$Type = Java.loadClass("net.minecraft.world.phys.HitResult$Type")

let $WorldTargets = Java.loadClass("com.endertech.minecraft.mods.adlods.world.WorldTargets")
let $AdLods = Java.loadClass("com.endertech.minecraft.mods.adlods.AdLods")

let $NbtUtils = Java.loadClass("net.minecraft.nbt.NbtUtils")
let $Tag = Java.loadClass("net.minecraft.nbt.Tag")

let $FTBChunksAPI = Java.loadClass("dev.ftb.mods.ftbchunks.api.FTBChunksAPI").api()
let $ChunkDimPos = Java.loadClass("dev.ftb.mods.ftblibrary.math.ChunkDimPos")
let $NbtIo = Java.loadClass("net.minecraft.nbt.NbtIo")
let $NbtAccounter = Java.loadClass("net.minecraft.nbt.NbtAccounter")
let $Rotation = Java.loadClass("net.minecraft.world.level.block.Rotation")
let $Direction = Java.loadClass("net.minecraft.core.Direction")
let $HashMap = Java.loadClass("java.util.HashMap")
let $Integer = Java.loadClass("java.lang.Integer")
let $Boolean = Java.loadClass("java.lang.Boolean")

let $Block = Java.loadClass("net.minecraft.world.level.block.Block")

let $LivingDropsEvent = Java.loadClass("net.neoforged.neoforge.event.entity.living.LivingDropsEvent")

let $BlockPos = Java.loadClass("net.minecraft.core.BlockPos")
let $HeightmapTypes = Java.loadClass("net.minecraft.world.level.levelgen.Heightmap$Types")
let $BedBlock = Java.loadClass("net.minecraft.world.level.block.BedBlock")

let $SoundSource = Java.loadClass("net.minecraft.sounds.SoundSource")

let $patternJavaClass = Java.loadClass("java.util.regex.Pattern")
let $matcherJavaClass = Java.loadClass("java.util.regex.Matcher")

let $LinkedHashMap = Java.loadClass("java.util.LinkedHashMap")