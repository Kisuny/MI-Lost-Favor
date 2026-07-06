//priority: 10

let $RenderLevelStageEvent = Java.loadClass("net.neoforged.neoforge.client.event.RenderLevelStageEvent")
let $InputEvent$MouseButton$Pre = Java.loadClass("net.neoforged.neoforge.client.event.InputEvent$MouseButton$Pre")
let $ViewportEvent$ComputeCameraAngles = Java.loadClass("net.neoforged.neoforge.client.event.ViewportEvent$ComputeCameraAngles")
let $ViewportEvent$RenderFog = Java.loadClass("net.neoforged.neoforge.client.event.ViewportEvent$RenderFog")
let $RenderFrameEvent$Post = Java.loadClass("net.neoforged.neoforge.client.event.RenderFrameEvent$Post")


let $ClipContext = Java.loadClass("net.minecraft.world.level.ClipContext")
let $ClipContext$Block = Java.loadClass("net.minecraft.world.level.ClipContext$Block")
let $ClipContext$Fluid = Java.loadClass("net.minecraft.world.level.ClipContext$Fluid")
let $MultiBufferSource = Java.loadClass("net.minecraft.client.renderer.MultiBufferSource")
let $PostChain = Java.loadClass("net.minecraft.client.renderer.PostChain")
