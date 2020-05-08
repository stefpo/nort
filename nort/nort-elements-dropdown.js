/*!
 * NORT web UI component library
 * Copyright(c) 2019-2020 Stephane Potelle 
 * MIT Licensed
*/

nort.elements.listMenu = function(attributes, optionList) {
    if (! attributes) attributes = {}

    //if ( ! attributes.size ) attributes.size = options.length < 8 ? options.length : 8
    if ( attributes.size < 2 ) attributes.size = 2
    let element = $select(attributes) 


    element.setValue = function(v) {
        element.value = v
        return element
    }

    element.getValue = function() {
        return element.value 
    }    

    element.addOption = function(p1, p2) {
        if (p2) {
            element.appendChild ($option({value: p1}, nort.translate(p2)))
        } else {
            element.appendChild ($option({}, nort.translate(p1)))
        }
        return element
    }

    element.setOptions = function (optionList) {
        let v = element.value || attributes.value
        element.textContent = ""
        if (typeof(optionList) == "object") {
            for (let k of Object.keys(optionList)) {
                element.addOption(k,optionList[k] )
            }
    
        } else if (Array.isArray(optionList)) {
            let p = optionList
            for (let i=0; i< p.length; i++) {
                element.addOption(p[i] )
            }
        } else if (typeof (optionList) == "string") {
            let p = optionList.split(';')
            for (let i=0; i< p.length; i++) {
                element.addOption(p[i] )
            }
        }
        element.value = v
        
        let sz = element.options.length || 0 
        if (sz < 2) sz = 2 
        if (sz > 5) sz = 4
        element.size = sz

        return element 
    }

    element.setOptions(optionList)

    element.onSelect = function(d) {
        alert(d)
    }

    element.onclick = function(){ element.onSelect(element.value)}
    element.onkeypress = function(evt){ if (evt.charCode == 13) element.onSelect(element.value)}

    element.setAttribute("nort-element","select")            
    return nort.elements.lib.bindFieldMethods(element)
}

nort.elements.comboBox = function(attributes, optionList) {
    let attClass = " " + attributes.class || ""

    let e = nort.elements.lib.bindFieldMethods(nort.createElement("input", {class: "combobox"+ attClass, type: "text", "nort-element":"combobox"}, [attributes]))
    let cal
    let hoveringPopup = false
    let justFocused = false
    let inhibitFocusEvent = false

    e.setValue = function(v) {
        e.value = v
        return e
    }

    e.isValid = function() {
        return true
    }        

    e.getValue = function() {
        return e.value
    }        
    
    function showPopup () { 
        cal = nort.elements.listMenu()
            .on("mouseover", function() { 
                hoveringPopup = true 
                } )
            .on("mouseout", function() { 
                hoveringPopup = false 
                } )  

        hoveringPopup = false
        cal.setOptions(optionList)

        nort.showFieldPopup(e, cal, "sw")
        
        cal.onSelect = function(v) {
            e.value = v
            e.hidePopup()
            inhibitFocusEvent = true
            e.focus()
        }
    }

    e.on("focus", function() { 
        if (!inhibitFocusEvent) { justFocused=true; showPopup() }
        inhibitFocusEvent = false
        } 
    )

    e.on("blur", function() {
        if (! hoveringPopup)  e.hidePopup()
    })

    e.on("click", function() { 
        if ( ! justFocused ) {
            if (e.popupAnchorDiv) { e.hidePopup() }
            else showPopup()
        }
        justFocused = false
    } )

    return e
}