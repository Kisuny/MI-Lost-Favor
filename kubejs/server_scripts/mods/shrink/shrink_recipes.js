// requires: shrink
ServerEvents.recipes(event => {
    event.remove({output: "shrink:shrinking_device"})
    event.recipes.modern_industrialization.assembler(8, 200)
        .itemIn('3x modern_industrialization:analog_circuit')
        .fluidIn('500x modern_industrialization:ethylene')
        .itemIn('9x modern_industrialization:aluminum_ingot')
        .itemIn('ae2:quartz_vibrant_glass')
        .itemOut('shrink:shrinking_device')
        .id('milf:shrinking_device')

});
