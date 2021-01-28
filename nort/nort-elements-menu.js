

nort.elements.buttonMenu = function ( attributes, label, menuItems) {
    let popupItems = []

    for (let mi of menuItems) {
        let e = $button({ type: "button"}, mi.text)
        e.on("mousedown",  mi.callback)
        popupItems.push(e)
    }

    menu = $button( attributes,
        $label({},label),
        $div({}, popupItems)
    ).addClass("dd-menu")

    return menu
}
