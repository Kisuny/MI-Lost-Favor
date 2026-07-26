//priority: 100

// let $ImmersiveFont = Java.loadClass("toni.immersivemessages.ImmersiveFont")
// let $ChatFormatting = Java.loadClass("net.minecraft.ChatFormatting")
// let $SoundEffect = Java.loadClass("toni.immersivemessages.api.SoundEffect")
// let $ImmersiveMessagesManager = Java.loadClass("toni.immersivemessages.ImmersiveMessagesManager")
// let $ToniBinding = Java.loadClass("toni.lib.animation.Binding")
// let $ToniEasingType = Java.loadClass("toni.lib.animation.easing.EasingType")

const DEFAULT_WARN_NOTIFICATION_STYLE = {
    anchor:"MIDDLE_RIGHT",
    slideIn:"right",
    slideInEasing:"ease_out_cubic",
    duration: 3,
    fadeIn:1,
    fadeOut:0.3,
    background:true,
    y:140,
    //queue:true,
    applyWarn:true,
    offsetGroup: "milfNotifications"
}

const DEFAULT_CENTER_MESSAGE_STYLE = (duration) => {
    let style = {
        anchor:"MIDDLE",
        fadeIn:0.2,
        fadeOut:0.2,
        background:true,
        y:40,
        queue:true,
        duration:duration
    }
    return style
}


const DEFAULT_CHUNK_CLAIM_NOTIFICATION_STYLE = {
    anchor:"MIDDLE",
    slideIn:"bottom",
    slideOut:"bottom",
    slideInDuration:0.7,
    slideOutDuration:0.4,
    //slideOut:"right",
    align:"CENTER",
    typewriter: { speed: 15, sound:"milf:reels_tick" },
    fadeIn:1,
    fadeOut:0.3,
    background:true,
    y:170,
    queue:false,
    size:2,
    duration:1.5
}

const DEFAULT_NEW_AGE_NOTIFICATION_STYLE = {
    anchor:"MIDDLE",
    slideIn:"left",
    y:-20,
    bold:true,
    fadeIn:1,
    fadeOut:0.3,
    queue:false,
    size:4,
    duration:7
}

const DEFAULT_NEW_AGE_SUBTEXT_STYLE = {
    delay:1.5,
    offset:28,
    anchor:"MIDDLE",
    slideIn:"bottom",
    slideInDuration:2,
    fadeIn:1,
    fadeOut:0.3,
    size:3,
    duration:7,
}

const DEFAULT_MILESTONE_NOTIFICATION_STYLE = {
    anchor:"MIDDLE",
    slideIn:"bottom",
    y:-20,
    bold:true,
    fadeIn:1,
    fadeOut:0.3,
    queue:false,
    size:3,
    duration:8
}

const DEFAULT_MILESTONE_SUBTEXT_STYLE = {
    delay:2.5,
    offset:48,
    anchor:"MIDDLE",
    slideIn:"top",
    fadeIn:1,
    fadeOut:0.3,
    size:3,
    duration:8,
}

function sendImmersiveMessage(text, /**@type {import("net.minecraft.server.level.ServerPlayer").$ServerPlayer$$Original}*/ player, args, /**@type {import("net.minecraft.server.MinecraftServer").$MinecraftServer$$Original}*/ server){
    if(player.persistentData.immersiveMessageQueue) {
        return
    }
    player.sendData("immersive_message", {
        text:text,
        args:args
    })
    if(args.queue){
        let duration = args.duration || 2.2
        player.persistentData.putBoolean("immersiveMessageQueue", true);
       (server).scheduleInTicks(duration * 20, _ =>  player.persistentData.remove("immersiveMessageQueue"))
    }
}

function sendImmersiveMessageWithSubtext(text, subtext, player, textArgs, subtextArgs, server){
    sendImmersiveMessage(text, player, Object.assign({}, textArgs, {subtext: Object.assign({}, subtextArgs, {content:subtext})}), server)
}

PlayerEvents.loggedOut(event => {
    if(event.player.persistentData.immersiveMessageQueue) event.player.persistentData.remove("immersiveMessageQueue")
})

function textAnimatorString(text, type, params){
    if (params){
        return `<${type} ${Object.entries(params).reduce((acc, [param, value]) => `${acc}${param}=${value} `, '').trim()}>${text}</${type}>`

    } else {
        return `<${type}>${text}</${type}>`
    }
}
