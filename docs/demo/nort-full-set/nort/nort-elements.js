/*!
 * NORT web UI component library
 * Copyright(c) 2019-2020 Stephane Potelle 
 * MIT Licensed
*/

import * as dom from "./nort-dom.js"
import * as i18n from "./nort-i18n.js"

export function bindFieldMethods(e) {
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

export function textBox(attributes) {
    let e= bindFieldMethods(dom.createElement("input", {type: "text", "nort-element":"textbox"}, [attributes])) 
    

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
        e.title =  i18n.translate(`[${e.validationErrorMsg}]`)
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

export function textarea(attributes) {
    let e= bindFieldMethods(dom.createElement("textarea", {type: "text", "nort-element":"textbox"}, [attributes])) 

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
        e.title =  i18n.translate(`[${e.validationErrorMsg}]`)
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

export function passwordBox(attributes) {
    let e = bindFieldMethods(dom.createElement("input", {type: "password", "nort-element":"textbox"}, [attributes])) 

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


export function checkBox(attributes) {
    let e = bindFieldMethods(dom.createElement("input", {type: "checkbox", "nort-element":"checkbox"}, [attributes])) 

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

export function button(attributes) { 
    let e =  bindFieldMethods( dom.createElement( "button" , { "nort-element" : "button"}, arguments)  ) 

    e.setText = function(s) {
        e.innerText = i18n.translate(s)
    }
    return e    
}


export function select(attributes, optionList) {
 
    let fieldValue = ""

    if (! attributes) attributes = {}

    let e = bindFieldMethods( $select(attributes) )

    e.isKVList = false 

    e.setValueOrig = function(v) {
        e.value = v
        return e
    }

    e.isValid = function() {
        e.validationErrorMsg = ""
        fieldValue = e.value
        if (e.isRequired() && e.value =="") {
            e.validationErrorMsg = "REQUIRED"
        } else if (typeof( e.validate) == "function" ) {
            e.validationErrorMsg = e.validate(fieldValue)
        }      
        if (e.validationErrorMsg != "" ) {
            e.addClass ("missing-field")
            e.title =  i18n.translate(`[${e.validationErrorMsg}]`)
            return false
        } else {
            e.removeClass ("missing-field")
            e.title = ""
            return true
        }
    }          

    e.setValue = function(v) {
        for (let i=0; i< e.options.length; i++) {
            if ( v == e.options[i].value ) {
                e.selectedIndex = i
                break
            }
        }
        e.initialValue = e.value
        return e
    }    

    e.getValue = function() {
        if (e.isKVList && e.value == "") return null
        else return e.value 
    }    

    e.addOption = function(p1, p2) {
        if (p2) {
            e.appendChild ($option({value: p1}, i18n.translate(p2)))
        } else {
            e.appendChild ($option({}, i18n.translate(p1)))
        }
        return e
    }

    e.setOptions = function (optionList) {
        let v = e.value || attributes.value
        e.textContent = ""
        if (Array.isArray(optionList)) {
            for (let p of optionList) {
                if (p || p!="") {
                    if(typeof(p) == "object") {
                        let keys = Object.keys(p)
                        if (keys.length == 1 ) e.addOption(p[keys[0]] ) 
                        else {
                            e.addOption(p[keys[0]], i18n.translate(p[keys[1]])  ) 
                            e.isKVList = true
                        }

                    } else { e.addOption( i18n.translate(p) ) }
                }
            }
        } else  if (typeof(optionList) == "object") {
            e.isKVList = true
            for (let k of Object.keys(optionList)) {
                if ( k == "") e.addOption(k, i18n.translate(optionList[k]) )
            } 
            for (let k of Object.keys(optionList)) {
                if ( k != "") e.addOption(k, i18n.translate(optionList[k]) )
            }             
        } else if (typeof (optionList) == "string") {
            let p = optionList.split(';')
            for (let i=0; i< p.length; i++) {
                e.addOption(p[i] )
            }
        }
        e.value = v

        return e 
    }

    if (optionList) e.setOptions(optionList)
    e.setAttribute("nort-element","select")            
    return e
}

export function fieldBox(attributes, fieldElement) { 
    let css = attributes.class || ""
    let label
    if ( attributes["n-label"] ) label = attributes["n-label"]    
    else if ( fieldElement.attributes["n-label"] ) label = fieldElement.attributes["n-label"].value
    else label = "[" + (fieldElement.name || "Label") + "]"

    if ( fieldElement.placeholder ) fieldElement.placeholder = i18n.translate(fieldElement.placeholder )

    label = i18n.translate(label)
    let labelElt

    let element=$div( { class: css },
                labelElt =$label({}, label ), 
                $div({},  fieldElement ))
            .addClass("fieldBox")

    if (attributes.link != undefined) {
        labelElt.addClass("link")
        labelElt.onclick =  attributes.link
    }

    element.setAttribute("nort-element","fieldBox")     
    
    return bindFieldMethods(element)
}

export function scrollPane() {
        return dom.createElement("div", { class: "scroll-pane", "nort-element":"scrollPane"}, arguments )
}

export function popup(contentElement) {
    let source = document.activeElement
    let bg = $div({ style: "position: fixed; top: 0px; left: 0px;  height: 100%; width:100%; opacity: 0.1; background-color: silver"} )
    bg.on ("click", function() { dom.destroyElement(contentElement); dom.destroyElement(bg);/* source.focus() */})
    document.body.appendChild(bg)
    document.body.appendChild(contentElement)
    return contentElement
}

export function yesNoSelect(attributes) {
    let e = select(attributes, {'0': 'No', '1': 'Yes'})
    if (attributes.checked ) e.setValue(1) 
    else e.setValue(0)
    return e
}

