/*!
 * NORT web UI component library
 * Copyright(c) 2019-2020 Stephane Potelle 
 * MIT Licensed
*/

nort.elements = {}
nort.elements.lib = {}

nort.elements.lib.bindFieldMethods = function(e) {
    e.validationErrorMsg = ""

    e.setRendered = function(b) { 
        if (b) e.style.display = "inline-block"
        else e.style.display = "none"
        return e        
    }

    e.setVisible = function(b) { 
        if (b) e.style.visibility = "hidden"
        else e.style.visibility = "visible"        
        return e
    }

    e.setDisabled = function(b) { 
        if (b) e.setAttribute("disabled","1")
        else e.removeAttribute("disabled") 
        return e
    }

    e.setRequired = function(b) { 
        if (b) e.addClass("required-field") 
        else e.removeClass("required-field")
        return e
    }    

    e.isRequired = function() { 
        return e.hasClass("required-field") 
    }    


    e.isValid = function() {
        e.validationErrorMsg = ""
        return true
    }

    e.getValidationError = function() {
        return e.validationErrorMsg 
    }

    e.on("blur",  function() { if ( e.isValid ) e.isValid()} )
    return e
}

nort.elements.textbox = function(attributes) {
    let e= nort.elements.lib.bindFieldMethods(nort.createElement("input", {type: "text", "nort-element":"textbox"}, [attributes])) 
    

    if (e.hasClass ("type-uint")) e.validRegexp = /^[0-9]+$/
    else if (e.hasClass ("type-int")) e.validRegexp = /^[+-]{0,1}[0-9]+$/
    else if (e.hasClass ("type-decimal") || e.hasClass ("type-decimal2") || e.hasClass ("type-decimal4") ) e.validRegexp = /^[+-]{0,1}[0-9]+(?:[.][0-9]+){0,1}$/
    else if (e.hasClass ("type-float")) e.validRegexp = /^[+-]{0,1}[0-9]+(?:[.][0-9]+){0,1}(?:[eE][+-]{0,1}[0-9]+){0,1}$/
    else if (e.hasClass ("type-domain")) e.validRegexp = /^(?:[a-z]|[A-Z]|[0-9]|-)+(?:[.](?:[a-z]|[A-Z]|[0-9]|-)+)*$/
    else if (e.hasClass ("type-email")) e.validRegexp = /^(?:[a-z]|[A-Z]|[0-9]|-|_|[.])+@(?:[a-z]|[A-Z]|[0-9]|-)+(?:[.](?:[a-z]|[A-Z]|[0-9]|-)+)*$/
    else e.validRegexp = e.attributes.validRegexp ||  null
    let fieldValue = ""

    e.validate = function(value) {
        return ""
    }

    e.isValid = function() {
        e.value = e.value.trim()
        fieldValue = e.value
        if (e.isRequired() && e.value =="") {
            e.addClass ("missing-field")
            e.validationErrorMsg = "REQUIRED"
        } else if ( e.validRegexp && ! e.validRegexp.test(fieldValue)) {
            e.addClass ("missing-field")
            e.validationErrorMsg = "INCORRECT_FORMAT"            
        }
        else {
            e.removeClass ("missing-field"); 
            e.validationErrorMsg = e.validate(fieldValue)
            if ( e.hasClass ("type-decimal2") ) e.value = parseFloat(e.value, 10).toFixed(2) 
            if ( e.hasClass ("type-decimal4") ) e.value = parseFloat(e.value, 10).toFixed(4) 
            e.title = ""
            return true
        }      
        e.title =  nort.translate(`[${e.validationErrorMsg}]`)
        return false
    }        

    e.setValue = function(v) {
        e.value = v
        e.initialValue = e.value
        return e
    }

    e.getValue = function() {
        e.isValid()
        if (e.hasClass ("type-uint")) return parseInt(fieldValue)
        else if (e.hasClass ("type-int")) return parseInt(fieldValue)
        else if (e.hasClass ("type-decimal")) return parseFloat(fieldValue)
        else if (e.hasClass ("type-float")) return parseFloat(fieldValue)
        else return fieldValue
    }
    
    return e
}

nort.elements.multilineBox = function(attributes) {
    let e= nort.elements.lib.bindFieldMethods(nort.createElement("textarea", {type: "text", "nort-element":"textbox"}, [attributes])) 

    let fieldValue = ""

    e.validate = function(value) {
        return ""
    }

    e.isValid = function() {
        e.value = e.value.trim()
        fieldValue = e.value
        if (e.isRequired() && e.value =="") {
            e.addClass ("missing-field")
            e.validationErrorMsg = "REQUIRED"
        } else if ( e.validRegexp && ! e.validRegexp.test(fieldValue)) {
            e.addClass ("missing-field")
            e.validationErrorMsg = "INCORRECT_FORMAT"            
        }   
        e.title =  nort.translate(`[${e.validationErrorMsg}]`)
        return false
    }        

    e.setValue = function(v) {
        e.value = v
        e.initialValue = e.value
        return e
    }

    e.getValue = function() {
        e.isValid()
        return fieldValue
    }
    
    return e
}

nort.elements.passwordbox = function(attributes) {
    let e = nort.elements.lib.bindFieldMethods(nort.createElement("input", {type: "password", "nort-element":"textbox"}, [attributes])) 

    e.setValue = function(v) {
        e.value = v
        e.initialValue = e.value
        return e
    }

    e.getValue = function() {
        return e.value
    }
    
    return e
}


nort.elements.checkbox = function(attributes) {
    let e = nort.elements.lib.bindFieldMethods(nort.createElement("input", {type: "checkbox", "nort-element":"checkbox"}, [attributes])) 

    e.isValid = function() {
        return true
    }

    e.setValue = function(v) {
        v = v || false
        e.checked = [true, 1, '1', 'Y','y'].includes(v)
        return e
    }

    e.getValue = function() {
        return e.checked ? 1 : 0
    }            
    return e
}

nort.elements.button = function(attributes) { 
    let e =  nort.elements.lib.bindFieldMethods( nort.createElement( "button" , { "nort-element" : "button"}, arguments)  ) 

    e.setText = function(s) {
        e.innerText = nort.translate(s)
    }
    return e    
}


nort.elements.select = function(attributes, optionList) {
 
    let fieldValue = ""

    if (! attributes) attributes = {}

    let element = nort.elements.lib.bindFieldMethods( $select(attributes) )

    element.setValueOrig = function(v) {
        element.value = v
        return element
    }

    element.isValid = function() {
        element.validationErrorMsg = ""
        fieldValue = element.value
        if (element.isRequired() && element.value =="") {
            element.validationErrorMsg = "REQUIRED"
        } else if (typeof( element.validate) == "function" ) {
            element.validationErrorMsg = element.validate(fieldValue)
        }      
        if (element.validationErrorMsg != "" ) {
            element.addClass ("missing-field")
            element.title =  nort.translate(`[${element.validationErrorMsg}]`)
            return false
        } else {
            element.removeClass ("missing-field")
            element.title = ""
            return true
        }
    }          

    element.setValue = function(v) {
        for (let i=0; i< element.options.length; i++) {
            if ( v == element.options[i].value ) {
                element.selectedIndex = i
                break
            }
        }
        element.initialValue = element.value
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
        if (Array.isArray(optionList)) {
            for (let p of optionList) {
                if (p || p=="") {
                    if(typeof(p) == "object") {
                        let keys = Object.keys(p)
                        if (keys.length == 1 ) element.addOption(p[keys[0]] ) 
                        else element.addOption(p[keys[0]], nort.translate(p[keys[1]])  ) 

                    } else { element.addOption( nort.translate(p) ) }
                }
            }
        } else  if (typeof(optionList) == "object") {
            for (let k of Object.keys(optionList)) {
                if ( k == "") element.addOption(k, nort.translate(optionList[k]) )
            } 
            for (let k of Object.keys(optionList)) {
                if ( k != "") element.addOption(k, nort.translate(optionList[k]) )
            }             
        } else if (typeof (optionList) == "string") {
            let p = optionList.split(';')
            for (let i=0; i< p.length; i++) {
                element.addOption(p[i] )
            }
        }
        element.value = v

        return element 
    }

    if (optionList) element.setOptions(optionList)
    element.setAttribute("nort-element","select")            
    return element
}

nort.elements.fieldbox = function (attributes, fieldElement) { 
    let css = attributes.class || ""
    let label
    if ( attributes["n-label"] ) label = attributes["n-label"]    
    else if ( fieldElement.attributes["n-label"] ) label = fieldElement.attributes["n-label"].value
    else label = "[" + (fieldElement.name || "Label") + "]"

    if ( fieldElement.placeholder ) fieldElement.placeholder = nort.translate(fieldElement.placeholder )

    label = nort.translate(label)
    let labelElt

    let element=$div( { class: css },
                labelElt =$label({}, label ), 
                $div({},  fieldElement ))
            .addClass("fieldbox")

    if (attributes.link != undefined) {
        labelElt.addClass("link")
        labelElt.onclick =  attributes.link
    }

    element.setAttribute("nort-element","fieldbox")     
    
    return nort.elements.lib.bindFieldMethods(element)
}

nort.elements.scrollPane = function() {
        return nort.createElement("div", { class: "scroll-pane", "nort-element":"scrollPane"}, arguments )
}

nort.elements.popup = function (element) {
    let source = document.activeElement
    let bg = $div({ style: "position: fixed; top: 0px; left: 0px;  height: 100%; width:100%; opacity: 0.1; background-color: silver"} )
    bg.on ("click", function() { nort.destroyElement(element); nort.destroyElement(bg);/* source.focus() */})
    document.body.appendChild(bg)
    document.body.appendChild(element)
    return element
}

nort.elements.yesNoSelect = function(attributes) {
    let e = nort.elements.select(attributes, {'0': 'No', '1': 'Yes'})
    if (attributes.checked ) e.setValue(1) 
    else e.setValue(0)
    return e
}

document.write (`<script src=\"${nort.baseURL}/nort-elements-tabber.js?version=${nort.version}\"></script>`)
document.write (`<script src=\"${nort.baseURL}/nort-elements-graph.js?version=${nort.version}\"></script>`)
document.write (`<script src=\"${nort.baseURL}/nort-elements-dropdown.js?version=${nort.version}\"></script>`)
document.write (`<script src=\"${nort.baseURL}/nort-elements-calendar.js?version=${nort.version}\"></script>`)
document.write (`<script src=\"${nort.baseURL}/nort-elements-modal.js?version=${nort.version}\"></script>`)

