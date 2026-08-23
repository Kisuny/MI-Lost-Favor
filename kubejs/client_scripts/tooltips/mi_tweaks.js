

//priority: 2


ItemEvents.modifyTooltips(event => {
    Object.entries(global.miTweaksTieredBatchMachineTooltips).forEach(([machineId, tooltipEntry]) => {

        if (Object.keys(tooltipEntry).length == 0) return

        //console.log(machineId, tooltipEntry);

        // event.add(
        //     `mi_tweaks:${machineId}`, 
        //     { shift: false }, 
        //     Text.translatable("text.modern_industrialization.TooltipsShiftRequired").gray()
        // )

        event.modify(
            `mi_tweaks:${machineId}`,
            // { shift: true },
            tooltip => tooltip.dynamic("milf:mi_tweaks_batch_tooltip")
        )
    })
})

ItemEvents.dynamicTooltips("milf:mi_tweaks_batch_tooltip", event => {

    let { item } = event
    if (!item) return
    let player = Client.player
    if (!player) return
    if (!event.shift) {
        //console.log(event.lines.get(2));

        //console.log(Text.translatable("text.modern_industrialization.TooltipsShiftRequired").getString());

        let holdShiftString = Text.translatable("text.modern_industrialization.TooltipsShiftRequired").getString()

        if (event.lines.stream()
            .map(component => component.string)
            .noneMatch(string => string == holdShiftString)
        ) {
            event.add(Text.translatable("text.modern_industrialization.TooltipsShiftRequired").gray())
        }
        
        return
    }

    let tooltipEntry = global.miTweaksTieredBatchMachineTooltips[item.idLocation.path]

    if (!tooltipEntry) return

    Object.entries(groupTiersByRecipeMachineId(tooltipEntry)).forEach(([machineLang, tierEntry]) => {

        let batchTooltip = Component.translatable(
            "milf.mi_tweaks.tooltip.batch",
            Component.translatable(machineLang)
        )

        event.add(
            batchTooltip.getString()
        )

        Object.entries(tierEntry).forEach(([tierId, tierData]) => {
            let tooltipComponent = Component.translatable(
                "milf.mi_tweaks.tooltip.tier_batch",
                Component.translatable(`rei_categories.mi_tweaks.${tierId}`),
                (tierData.batchSize | 0).toFixed(0),
                `${(tierData.euMultiplier * 100).toFixed(0)}%`
            )

            //console.log(tooltipComponent);


            event.add(
                tooltipComponent.getString()
            )
        })
    })

    function groupTiersByRecipeMachineId(tooltipEntry) {
        let result = {}

        Object.entries(tooltipEntry).forEach(([tierId, tierData]) => {
            let recipeMachineLangKey = tierData.recipeMachineId ?
                `rei_categories.${tierData.recipeMachineId.split(":")[0]}.${tierData.recipeMachineId.split(":")[1]}`
                : "milf.mi_tweaks.tooltip.own_recipe"

            if (!result[recipeMachineLangKey]) {
                result[recipeMachineLangKey] = {}
            }

            result[recipeMachineLangKey][tierId] = {
                batchSize: tierData.batchSize,
                euMultiplier: tierData.euMultiplier,
            }
        })


        return result
    }


})