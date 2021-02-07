nort.elements.buttonMenu = function(attributes, label, menuItems) {
    let attClass = " " + attributes.class || ""
    attributes = attributes || {}
    attributes.type = "button"

    let e = $button( attributes, label )
    let cal
    let popupIsActive = false
    let anchoring = attributes.anchoring || "sw"


    function popupDiv() {
        let popupItems = []
        let e
        for (let mi of menuItems) {
            if ( mi.menu ) {
                let mnuAttr = mi.menu.attributes || {}
                let mnuText = mi.menu.text || "Submenu (undef)"
                let mnuItems = mi.menu.items || []
                e = nort.elements.buttonMenu( mnuAttr, mnuText, mnuItems )
            } else {
                e = $button({ type: "button", style:"white-space: nowrap; text-align: left;"}, mi.text)
                e.on("mousedown",  mi.callback)
            }

            if (e) {
                popupItems.push(e)
            }

        }
        
        return $div({ style: "display: inline-block"}, $div({ style: "display: flex; flex-flow: column wrap; "}, popupItems))
    }

    
    function showPopup () { 
        cal = popupDiv()
        popupIsActive = true

        nort.showFieldPopup(e, cal, anchoring)
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


