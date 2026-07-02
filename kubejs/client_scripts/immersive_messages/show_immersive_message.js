let $ImmersiveMessage = Java.loadClass("net.tysontheember.emberstextapi.immersivemessages.api.ImmersiveMessage")
let $TextAnchor = Java.loadClass("net.tysontheember.emberstextapi.immersivemessages.api.TextAnchor")
let $ClientMessageManager = Java.loadClass("net.tysontheember.emberstextapi.client.ClientMessageManager")
let $UUID = Java.loadClass("java.util.UUID")
let $MarkupParser = Java.loadClass("net.tysontheember.emberstextapi.immersivemessages.api.MarkupParser")
let $SlideMessageEffect = Java.loadClass("net.tysontheember.emberstextapi.immersivemessages.effects.message.SlideMessageEffect")
let $TextAlign = Java.loadClass("net.tysontheember.emberstextapi.immersivemessages.api.TextAlign")


NetworkEvents.dataReceived('immersive_message', (event) => {
    //console.log("WHAT DA HELL");
    /**@type {import("net.minecraft.nbt.Tag").$Tag$$Original}*/ let text = event.data.text, args = event.data.args, player = Client.player
    //text = Component.of("").append(text.getAsString())
    //console.log(Component.translate("milf.placers.notification2"))
    sendImmersiveMessage(text, player, args)

})

function I_HATE_COMPOUND_TAGS(/**@type {import("net.minecraft.nbt.CompoundTag").$CompoundTag$$Original}*/ stupidFreakingCompoundTag){
    let prettyJSObject = {}
    if (stupidFreakingCompoundTag.isEmpty()) return prettyJSObject
    for(let [key,  value] of Object.entries(stupidFreakingCompoundTag)){
        if(key == "content"){
            //console.log(value);
            prettyJSObject[key] = COMPOUND_TAGS_ME_ARSE(value)
            continue
        }
        switch (value.getType().getName()) {
            case "DOUBLE":
                prettyJSObject[key] = value.getAsDouble()
                break;
            case "INT":
                prettyJSObject[key] = value.getAsInt()
                break;
            case "BYTE":
                //console.log(key + " " + value);
                //console.log(value == true);
                prettyJSObject[key] = (value == true)
                break;
            case "STRING":
                prettyJSObject[key] = value.getAsString()
                break;
            case "COMPOUND":
                prettyJSObject[key] = I_HATE_COMPOUND_TAGS(value)
                break;
            default:
                //console.log(value.getType().getName());
                //console.log(value);
                break;
        }
    }
    
    return prettyJSObject
}

function COMPOUND_TAGS_ME_ARSE(tagLikeText){
    //console.log(tagLikeText.text);
    let text = Text.of(``)
    if (tagLikeText.text){
        text.append(tagLikeText.text.getAsString())
    }
    if (tagLikeText.translate){
        text.append(Text.translatable(tagLikeText.translate.getAsString()))
    }
    if (tagLikeText.extra){
        let extraArray = Array.isArray(tagLikeText.extra) ? tagLikeText.extra : [tagLikeText.extra]
        extraArray.forEach(compoundTag => {
            if (compoundTag.getAsString !== undefined && compoundTag.getType && compoundTag.getType().getName() === "STRING"){
                text.append(Text.of(compoundTag.getAsString()))
                return
            }
            for(let [key,  value] of Object.entries(compoundTag)){
                switch (key) {
                    case "translate":
                        text.append(Text.translatable(value.getAsString()))
                        break;
                    case "":
                        text.append(Text.of(value.getAsString()))
                        break;
                    case "text":
                        text.append(Text.of(value.getAsString()))
                        break;
                    default:
                        //console.log("whoao :( " + value.getAsString());
                        break;
                }
            }
        })
    }

    return text
}

let MilfMessagesManager = {
    isAnyTicking: false,
    messages : {},
    messageCount: 0,
    subsequentMessageCount: 0,
    addMessage(messageID, duration){
        this.messages[messageID] = duration
        this.isAnyTicking = true
        this.messageCount++
        this.subsequentMessageCount++

        milfPlayGUISound("minecraft:ui.toast.in")
    },

    removeMessage(messageID){
        delete this.messages[messageID]
        this.messageCount--
    }
}

ClientEvents.tick(event => {
    if (!MilfMessagesManager.isAnyTicking) return

    for (let [messageID, ticks] of Object.entries(MilfMessagesManager.messages)) {
        MilfMessagesManager.messages[messageID]--

        if (MilfMessagesManager.messages[messageID] <= 0){
            MilfMessagesManager.removeMessage(messageID)
        }
    }

    if (Object.keys(MilfMessagesManager.messages).length == 0) {
        MilfMessagesManager.isAnyTicking = false
        MilfMessagesManager.subsequentMessageCount = 0
    }

})

function sendImmersiveMessage(text, player, args){

    args = args || {}
    let textComponent = COMPOUND_TAGS_ME_ARSE(text)
    let argsJS = I_HATE_COMPOUND_TAGS(args)
    let duration = ((argsJS.duration || 2.2)) * 20 | 0
    
    argsJS.applyWarn && (textComponent = Component.of("⚠ ").append(textComponent))
    //console.log(duration);
    
    let message = new $ImmersiveMessage["(net.minecraft.network.chat.Component,int)"](textComponent, duration)
    
    let messageId = $UUID.randomUUID()

    applyArgsToImmersiveMessage(message, argsJS)

    if (argsJS.offsetGroup) {
        MilfMessagesManager.addMessage(messageId, duration + (argsJS.fadeIn * 20 | 0 || 0) + (argsJS.fadeOut * 20 | 0 || 0))
        //message.offset(0, MilfMessagesManager.messageCount * -16)
    }

    $ClientMessageManager.open(messageId, message)



}

function applyArgsToImmersiveMessage(message, args){

    args.size && message.scale(args.size)
    //if (args.align) { message.align($TextAlign[args.align])}
    if (args.fadeIn){ message["fadeInTicks(int)"](args.fadeIn * 20 | 0) }
    if (args.fadeOut){ message["fadeOutTicks(int)"](args.fadeOut * 20 | 0) }
    
    //args.color && message["color(net.minecraft.ChatFormatting)"]($ChatFormatting.WHITE)
    //args.font && message["font(toni.immersivemessages.ImmersiveFont)"]('minecrafter') // incompatible with Text Animator :(
    if (args.x || args.y)  {
        let xOffset = args.x || 0
        let yOffset = args.y || 0
        if (args.offsetGroup) yOffset += MilfMessagesManager.subsequentMessageCount * -18
        message.offset(xOffset, yOffset)
    }
    args.anchor && message.anchor($TextAnchor[args.anchor])

    if(args.vibrate){
        let markupString = `[vibrate${args.vibrateAmp !== undefined ? ` amp=${args.vibrateAmp}` : ""}${args.vibrateFreq !== undefined ? ` freq=${args.vibrateFreq}` : ""}]`
        applyMarkup(message, markupString)
    }
    if(args.drip){
        let markupString = `[drip${args.freq !== undefined ? ` freq=${args.freq}` : ""}${args.len !== undefined ? ` len=${args.len}` : ""}${args.col ? ` col=${args.col}` : ""}${args.fade !== undefined ? ` fade=${args.fade}` : ""}${args.snd ? ` snd=${args.snd}` : ""}${args.vol !== undefined ? ` vol=${args.vol}` : ""}${args.pitch !== undefined ? ` pitch=${args.pitch}` : ""}]`
        applyMarkup(message, markupString)
    }
    if(args.slideIn){
        let markupString = `[slide mode=in from=${args.slideIn} dur=${args.slideInDuration || "1"} easing=${args.slideInEasing || "ease_in_out_cubic"}]`
        
        applyMarkup(message, markupString)
    }
    if(args.slideOut){
        let markupString = `[slide mode=out from=${args.slideOut} dur=${args.slideOutDuration || "1"} easing=${args.slideOutEasing || "ease_in_out_cubic"}]`
        applyMarkup(message, markupString)
    }
    if(args.background){
        message.background(true)
        if (args.background.borderTopColor || args.background.borderBottomColor){
            
            let bottomColor = args.background.borderBottomColor ? "#" + (Number(args.background.borderBottomColor) >>> 0).toString(16).padStart(8, "0"): null
            let topColor = args.background.borderTopColor ? "#" + (Number(args.background.borderTopColor) >>> 0).toString(16).padStart(8, "0") : null

            let markupString = `[bg borderstart=${bottomColor || "#AAFFFFFF"} borderend=${topColor || "#AAFFFFFF"}]`
            applyMarkup(message, markupString)
        }
    }
    if (args.typewriter) {
        let speed = args.typewriter.speed || 12
        let center = args.typewriter.notCenterAligned ? "false" : "true"
        let markupString = `<type s="${speed}" center="${center}">`
        applyMarkup(message, markupString)
    }
    if (args.subtext){
        Client.scheduleInTicks(args.subtext.delay * 20 | 0, callback => {
            let subtextComponent = COMPOUND_TAGS_ME_ARSE(args.subtext.content)
            let subtextMessage = new $ImmersiveMessage["(net.minecraft.network.chat.Component,int)"](args.subtext.content, (args.duration * 20 | 0 || 44) - (args.subtext.delay * 20 | 0 || 0))
            applyArgsToImmersiveMessage(subtextMessage, args.subtext)            

            $ClientMessageManager.open($UUID.randomUUID(), subtextMessage)
            
        })
    }
    //args.subtext && message.subtext(args.subtext.delay || 0, args.subtext.content.string, args.subtext.offset || 8, (subtext) => applyArgsToImmersiveMessage(subtext, args.subtext))
    // args.animation && message.animation.transition(args.animation.bindingType, args.animation.inTime || 0, args.animation.outTime || args.duration || 2.2, args.animation.inValue || 0, args.animation.outValue || 5, args.animation.easingFunction || $ToniEasingType.EaseOutCubic)
}

function applyMarkup(message, markupString){
    let markup = $MarkupParser.parseFull(markupString)
    for (let effect of markup.messageEffects()) {
        message.messageEffect(effect)
    }

    for (let attribute of markup.messageAttributes()) {
        attribute.apply(message)
    }
    //console.log(markup);
    
}
