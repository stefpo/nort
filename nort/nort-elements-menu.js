

nort.elements.buttonMenuOK = function ( attributes, label, menuItems) {
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

nort.elements.buttonMenu = function(attributes, label, menuItems) {
    let attClass = " " + attributes.class || ""

    let e = $button( attributes, label )
    let cal
    let popupIsActive = false


    function popupDiv() {
        let popupItems = []
        for (let mi of menuItems) {
            let e = $button({ type: "button", style:"white-space: nowrap; text-align: left;"}, mi.text)
            e.on("mousedown",  mi.callback)
            popupItems.push(e)
        }
        
        return $div({ style: "display: flex; flex-flow: column wrap; "}, popupItems)
    }

    
    function showPopup () { 
        cal = popupDiv()
        popupIsActive = true

        nort.showFieldPopup(e, cal, "sw")
    }

    e.on("click", function() { 
        if ( ! popupIsActive ) showPopup() 
        else { e.hidePopup() ; popupIsActive = false }
    }   
    )

    e.on("blur", function() {
        e.hidePopup()
        popupIsActive = false
    })


    return e.addClass("dd-menu")
}


