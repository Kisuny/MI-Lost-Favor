if (Platform.isClientEnvironment()) {


    let $DimensionSpecialEffects = Java.loadClass("net.minecraft.client.renderer.DimensionSpecialEffects")
    let $RegisterDimensionSpecialEffectsEvent = Java.loadClass("net.neoforged.neoforge.client.event.RegisterDimensionSpecialEffectsEvent")
    let $SkyType = Java.loadClass("net.minecraft.client.renderer.DimensionSpecialEffects$SkyType")
    let $Float = Java.loadClass("java.lang.Float")

    NativeEvents.onEvent($RegisterDimensionSpecialEffectsEvent, event => {

        event.register($ResourceLocation.fromNamespaceAndPath("milf", "abstraction"), new JavaAdapter($DimensionSpecialEffects, {
            getBrightnessDependentFogColor(fogColor, brightness) {
                return fogColor
            },

            isFoggyAt(x, y) {
                return false
            }

        }, $Float.NaN, false, $SkyType.NORMAL, false, false))
    })

}
