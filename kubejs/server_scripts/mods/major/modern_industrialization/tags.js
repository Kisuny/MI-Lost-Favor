
ServerEvents.tags('item', event => {
    event.removeAllTagsFrom([
        'modern_industrialization:netherite_hammer', 
        //'modern_industrialization:steel_hammer', 
        'modern_industrialization:diamond_hammer', 
        //'modern_industrialization:iron_hammer',
    ])

    const modIngredient = Ingredient.of(`@modern_industrialization | @extended_industrialization`)
    const unTaggedParts = ["bolt", "wire", "curved_plate", "large_plate", "ring", "double_ingot"].join("|")

    const pattern = $patternJavaClass.compile(`^modern_industrialization:(?<material>.*)(?<![_:](me|fine))_(?<partName>${unTaggedParts})$`)
    modIngredient.stacks.toList().forEach((itemStack) => {
        let matcher = pattern.matcher(itemStack.id)
        if (matcher.matches()){
            //console.log(matcher.group("material") + "   " + matcher.group("partName") + "   " + matcher.group())
            event.add(`c:${matcher.group("partName")}s`, matcher.group())
            event.add(`c:${matcher.group("partName")}s/${matcher.group("material")}`, matcher.group())
        }
    })

    event.add('milf:coke_coal', [
        'modern_industrialization:coke', 
        'modern_industrialization:coke_block', 
        'modern_industrialization:coke_dust', 
    ])

    event.add('c:hammers', [
        'modern_industrialization:iron_hammer',
        'modern_industrialization:steel_hammer'
    ])

    event.add('c:storage_blocks/coal_coke', 'modern_industrialization:coke_block')
    event.add('c:coal_coke', 'modern_industrialization:coke')
    event.add('c:dusts/coal_coke', 'modern_industrialization:coke_dust')
    event.add('c:dusts/wood', 'modern_industrialization:wood_pulp')

    // let boltsRegExp = new RegExp(/modern_industrialization:.*_bolt/)
    // event.add('c:bolts', boltsRegExp)

    // let curvedPlatesRegExp = new RegExp(/modern_industrialization:.*_curved_plate/)
    // event.add('c:curved_plates', curvedPlatesRegExp)

    // const mi_material_for_tags = ['gold', 'copper', 'invar', 'iron', 'stainless_steel', 'steel', 'tin', 'titanium', 'aluminum', 'bronze', 'lead']

    // mi_material_for_tags.forEach(element => {
    //     event.add(`c:bolts/${element}`, `modern_industrialization:${element}_bolt`)
    // });
    

    // event.add('c:wires', /modern_industrialization:.*_wire/)
    // event.add('c:wires/copper', 'modern_industrialization:copper_wire')
    // event.add('c:wires/electrum', 'modern_industrialization:electrum_wire')
    // event.add('c:wires/aluminum', 'modern_industrialization:aluminum_wire')
    // event.add('c:wires/lead', 'modern_industrialization:lead_wire')
    // event.add('c:wires/steel', 'modern_industrialization:steel_wire')
    // event.add('c:nuggets/netherite', 'modern_industrialization:netherite_nugget')
    // event.add('c:rods/netherite', 'modern_industrialization:stick_netherite')


})