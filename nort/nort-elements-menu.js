

nort.elements.buttonMenu = function ( attributes, label, menuItems) {
    let popupItems = []

    for (let mi of menuItems) {
        let e = $button({ type: "button"},nort.translate(mi.text))
        e.on("mousedown",  mi.callback)
        popupItems.push(e)
    }

    let className = attributes.class == undefined ? '' : attributes.class

    menu = $button({ class: "dd-menu " + className },
        $label({},label),
        $div({}, popupItems)
    )

    return menu
}