ServerEvents.tags('item', event => {
    event.add('immersiveengineering:shaders', [/^immersiveengineering:shader_[a-z_]+$/])
    event.add('immersiveengineering:chutes', [/^immersiveengineering:chute_[a-z_]+$/])
})
