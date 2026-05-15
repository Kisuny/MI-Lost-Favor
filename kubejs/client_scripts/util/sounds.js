let $SimpleSoundInstance = Java.loadClass("net.minecraft.client.resources.sounds.SimpleSoundInstance")
let $SoundSource = Java.loadClass("net.minecraft.sounds.SoundSource")
let $SoundInstance = Java.loadClass("net.minecraft.client.resources.sounds.SoundInstance")

function milfPlayGUISound(resourceLocation, args) {
    args = args || {}

    let soundEvent = $BuiltInRegistries.SOUND_EVENT.get(resourceLocation)
    let source = args.source ? $SoundSource[args.source] : $SoundSource.MASTER

    Client.getSoundManager().play(
        new $SimpleSoundInstance(
            $ResourceLocation.parse(resourceLocation),
            source,
            args.volume || 1,
            args.pitch || 1,
            $SoundInstance.createUnseededRandom(),
            args.looping || false,
            args.delay || 0,
            $SoundInstance.Attenuation.NONE,
            0,0,0,
            true
        )
    )
}