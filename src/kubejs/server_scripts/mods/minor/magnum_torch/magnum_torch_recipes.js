ServerEvents.recipes(event => {

    event.replaceInput( { input: 'minecraft:fire_charge', mod: 'magnumtorch' },'minecraft:fire_charge','hexerei:dried_sage_bundle')
    event.replaceInput( { mod: 'magnumtorch' },'minecraft:diamond','minecraft:copper_ingot')
    event.replaceInput( { mod: 'magnumtorch' },'minecraft:emerald','modern_industrialization:lead_ingot')
    event.replaceInput( { mod: 'magnumtorch' },'minecraft:gold_ingot','modern_industrialization:bronze_ingot')
    
})