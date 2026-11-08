RecipeViewerEvents.addInformation('item', event => {
	event.add('immersiveengineering:concrete', [
		Text.translate('milf.emi_info.concrete')
	])
	event.add('apotheosis:gem_dust', [
		Text.translate('milf.emi_info.gem_dust')
	])
	event.add([
		'milf:everburning_roots',
		'milf:everburning_roots_veins',
		'milf:everburning_roots_heart',
		'milf:everburning_roots_vine',
		'milf:everburning_roots_vine_block'
	], [
		Text.translate('milf.emi_info.everburning_roots')
	])
	event.add(['enigmaticlegacyplus:evil_essence', 'enigmaticlegacyplus:abyssal_heart', 'milf:soul_of_the_helpless'], [
		Text.translate('milf.cursed_drops')
	])
})