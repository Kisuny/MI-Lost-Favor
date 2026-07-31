let $AqueductBlock = Java.loadClass("com.yanny.ytech.configuration.block.AqueductBlock")
let $Shapes = Java.loadClass("net.minecraft.world.phys.shapes.Shapes")
let $MaterialType = Java.loadClass("com.yanny.ytech.configuration.MaterialType")
let $BlockBehaviour$Properties = Java.loadClass("net.minecraft.world.level.block.state.BlockBehaviour$Properties")
let $BlockItem = Java.loadClass("net.minecraft.world.item.BlockItem")
let $BlockStateProperties = Java.loadClass("net.minecraft.world.level.block.state.properties.BlockStateProperties")
let $Fluids = Java.loadClass("net.minecraft.world.level.material.Fluids")
let $BlockPlaceContext = Java.loadClass('net.minecraft.world.item.context.BlockPlaceContext')


// cursed (‾◡◝)

// createNewJavaBlock("aqueduct_pump_connector", {},
//     () => new JavaAdapter($AqueductBlock, {

//         FULL_CUBE: $Shapes.block(),

//         getShape(state, level, pos, context){
//             return this.FULL_CUBE
//         },


//         // canBeReplaced(state, context){

//         //     // console.log(state);
//         //     // console.log(context);

//         //     if (context instanceof $BlockPlaceContext) {
//         //         let item = context.getItemInHand().getItem()

//         //         if (item instanceof $BlockItem){
//         //             let block = item.getBlock()
//         //             return block.defaultBlockState().hasProperty($BlockStateProperties.WATERLOGGED)
//         //         }
//         //     }
            



//         //     return false
//         // },

//         getFluidState(state){
//             return $Fluids.WATER.defaultFluidState()
//         },


//     }, $MaterialType.MUDBRICK)
// )