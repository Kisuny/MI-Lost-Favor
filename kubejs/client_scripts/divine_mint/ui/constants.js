//priority: 5

let $Screen = Java.loadClass("net.minecraft.client.gui.screens.Screen")
let $RenderGuiLayerEvent$Pre = Java.loadClass("net.neoforged.neoforge.client.event.RenderGuiLayerEvent$Pre")
let $VanillaGuiLayers = Java.loadClass("net.neoforged.neoforge.client.gui.VanillaGuiLayers")
let $BuiltInRegistries = Java.loadClass("net.minecraft.core.registries.BuiltInRegistries")
let $ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation")
let $HashMap = Java.loadClass("java.util.HashMap")
let $Button = Java.loadClass("net.minecraft.client.gui.components.Button")
let $AbstractWidget = Java.loadClass("net.minecraft.client.gui.components.AbstractWidget")
let $DataComponents = Java.loadClass("net.minecraft.core.component.DataComponents")
let $Component$Serializer = Java.loadClass("net.minecraft.network.chat.Component$Serializer")

const DIVINE_MINT_GUI_1 = $ResourceLocation.fromNamespaceAndPath("milf", "textures/gui/divine_mint_gui_1.png")
const DIVINE_MINT_GUI_2 = $ResourceLocation.fromNamespaceAndPath("milf", "textures/gui/divine_mint_gui_2.png")

const maxInt = 2 ** 32
const TWO_PI = Math.PI * 2

const REELS_WIDTH = 176
const REELS_HEIGHT = 102

const ONE_REEL_WIDTH = 50
const ONE_REEL_HEIGHT = 86

const LEVER_TOP_SIZE = 33
const LEVER_ROD_LENGTH = 56
const LEVER_OFFSET = -20
const LEVER_BG_WIDTH = 23
const LEVER_BG_HEIGHT = 62

const COIN_ACCEPTOR_WIDTH = 33
const COIN_ACCEPTOR_HEIGHT = 86

const Y_OFFSET_FROM_CENTER = -26