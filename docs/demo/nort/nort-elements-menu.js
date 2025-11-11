import * as dom from './nort-dom.js'

export function buttonMenu(attributes, label, menuItems) {
    let attClass = " " + attributes.class || ""
    attributes = attributes || {}
    attributes.type = "button"

    let mainButton = $button( attributes, label )
    let cal
    let anchoring = attributes.anchoring || "sw"
    mainButton.ignoreBlurEvent = false


    function popupDiv() {
        let popupItems = []
        let popupButton
        for (let mi of menuItems) {
            if ( mi.menu ) {
                let mnuAttr = mi.menu.attributes || {}
                let mnuText = mi.menu.text || "Submenu (undef)"
                let mnuItems = mi.menu.items || []
                popupButton = buttonMenu( mnuAttr, mnuText, mnuItems )
            } else {
                popupButton = $button({ type: "button", style:"white-space: nowrap; text-align: left;"}, mi.text)
                popupButton.on("mousedown",  function(evt) { mainButton.ignoreBlurEvent = true })
                popupButton.on("click",  function(evt) { mainButton.ignoreBlurEvent = false ; mi.callback() ; mainButton.hidePopup()})
            }

            if (popupButton) {
                popupItems.push(popupButton)
            }

        }
        
        return $div({ style: "display: inline-block"}, $div({ style: "display: flex; flex-flow: column wrap; "}, popupItems))
    }

    
    function showPopup () { 
        cal = popupDiv()

        dom.showFieldPopup(mainButton, cal, anchoring)
    }

    mainButton.on("click", function() { 
        if ( ! mainButton.hasActivePopup ) showPopup() 
        else { mainButton.hidePopup() }
    }   
    )

    mainButton.on("blur", function() {
        if (! mainButton.ignoreBlurEvent) {
            mainButton.hidePopup()
        }
    })


    return mainButton.addClass("dd-menu")
}


