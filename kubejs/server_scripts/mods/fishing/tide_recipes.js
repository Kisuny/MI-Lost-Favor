// Mod compat with starcatcher
ServerEvents.recipes(event => {
    const removeById = [
        "farmersdelight:cutting/fish_slice_cutting",
    ]

    removeById.forEach(id => {
        event.remove({ id: id });
    });

    event.remove({
        output: [
        ]
    })







});

