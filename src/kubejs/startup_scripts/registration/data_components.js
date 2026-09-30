// let $DeferredRegister  = Java.loadClass("net.neoforged.neoforge.registries.DeferredRegister")
// let $Registries  = Java.loadClass("net.minecraft.core.registries.Registries")
// let $DataComponentType  = Java.loadClass("net.minecraft.core.component.DataComponentType")
// let $BlockState = Java.loadClass("net.minecraft.world.level.block.state.BlockState")

// const DATA_COMPONENT_TYPES = $DeferredRegister["create(net.minecraft.resources.ResourceKey,java.lang.String)"]($Registries.DATA_COMPONENT_TYPE, "milf")
// const STORED_BLOCKSTATE_COMPONENT = DATA_COMPONENT_TYPES["register(java.lang.String,java.util.function.Function)"]("stored_blockstate", function() {
//     return $DataComponentType.builder().codec($BlockState.CODEC).build()
// })

// global.STORED_BLOCKSTATE_COMPONENT = STORED_BLOCKSTATE_COMPONENT
