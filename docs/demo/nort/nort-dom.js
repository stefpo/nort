/*!
 * NORT web UI component library
 * Author: Stephane Potelle 
 * Code written as a personal research project between 2019 and 2025
 * MIT Licensed
*/

import { translate } from "./nort-i18n.js"

export function createElement (tn, fixedAttr, rest) {
    // This function is the core of Nort. It replaces the DOM createElement function and returns a HTML element by tag name.
    // Attributes can be supplied as an object. The "rest" is the element inner contents and can be either a HTML element or a Nort Component, or an array mixing both types.

    let oArgs = Object.values(rest)

    let attributes = oArgs[0] || {}
    let elements = oArgs.slice(1) || []

    let elt = document.createElement(tn)
    let s = []

    for (let k of Object.keys(attributes)) {
        elt.setAttribute(k,attributes[k])
    }

    for (let k of Object.keys(fixedAttr)) {
        elt.setAttribute(k,fixedAttr[k])
    }

    for (let k of Object.keys(elements)) {
        let e = elements[k]
        addElement(elt, e) 
    }

    elt.listeners = {}

    elt.addClass = function(className) { return addCssClass(elt, className) }
    elt.removeClass = function(className) { return removeCssClass(elt, className)}        
    elt.hasClass = function(className) { return hasCssClass(elt, className)}        

    elt.off = function(evt){
        let h = elt.listeners[evt]
        if ( h ) {
            elt.removeEventListener(evt, h)
            elt.listeners[evt] = undefined
        }
    }

    elt.on = function(evt,handler,c,d,e) { 
        elt.off(evt)
        elt.addEventListener(evt,handler,c,d,e)
        elt.listeners[evt] = handler
        return elt 
    }    
    
    elt.nortProps = {}

    elt.nort = function(k,v) {
        if (v) { elt.nortProps[k] = v }
        else return elt.nortProps[k]
    }

    elt.setInnerContent = function(c) { setInnerContent(elt,c)}

    return elt
}


export function addElement(elt, newElt) {
    // Appends newElt to elt children 
    let t = typeof(newElt)
    if (newElt == null ) return
    if (t == "object" && typeof(newElt.render) == "function") {
        let he = newElt.render()
        elt.appendChild(newElt.element = he)
        newElt.nortParent = elt
    } else if (t == "string" || t == "number") {
        elt.appendChild(document.createTextNode(translate(newElt) +" "))
    } else if (Array.isArray(newElt)) {
        for (let i =0; i < newElt.length; i++ ) {
            addElement(elt, newElt[i])
        }
    } else if (t.startsWith("object")) {
        elt.appendChild(newElt)
    } else {
    }
}

export function replaceElement(elt, newElt) {
    // Replaces DOM element elt with newElt
    if (elt) {
        if (elt.parentNode ) { 
            elt.parentNode.replaceChild(newElt, elt) 
            return newElt
        } else {
            return elt
        }
    } else {    
        return null
    }
}

export function emptyElement(elt) {
    // Removes all inner contents of elt.
    elt.innerHTML = ""
}

export function setInnerContent(elt, contents) {
    // Sets the inner contents of an element. Contents can be a HTML element, a Nort component, or an array of both types mixed.
    emptyElement(elt)
    addElement(elt,contents)
}


export function destroyElement(elt) {
    // Removes an element from the DOM and destroys it.
    if (elt) {
        delete elt.nortProps
        elt.textContent = ''
        if (elt.parentNode ) elt.parentNode.removeChild(elt)
        elt = undefined
    }
}

export function getClasses(elt) {
    // Gets the list of CSS classes of an element as an array.
    let items = elt.className.split(" ").filter( x => x !='')
    return items
}

export function hasCssClass(elt, className) {
    // Returns true if elt CSS classes include className.
    let c = getClasses(elt)
    return c.includes(className)
}

export function addCssClass(elt, className) {
    // Add className to elt CSS classes. Returns elt.
    let c = getClasses(elt)
    if (!c.includes(className)) c.push(className)
    elt.className = c.join(' ')
    return(elt)
}

export function removeCssClass(elt, className) {
    // Removes className from elt CSS classes. Returns elt.
    elt.className = getClasses(elt).filter( x => x != className ).join(' ')
    return(elt) 
}

//export function getStyle(elt,styleProp)
function getStyle(elt,styleProp) // TODO: Consider removing
{
    if (window.getComputedStyle)
    {
        var y = document.defaultView.getComputedStyle(elt,null).getPropertyValue(styleProp); 
    }  
    else if (x.currentStyle)
    {
        var y = elt.currentStyle[styleProp];
    }                     

    return y;
}

//export function mergeAttributes(dest, attr) {
function mergeAttributes(dest, attr) { // TODO: Probably useless and not really working
    for (let k of Object.keys(attr)) {
        dest[0][k] = attr[k]
    }
    return dest
}


//export function absoluteY(elt) {
function absoluteY(elt) {
    if (elt.offsetParent==null) return elt.offsetTop;
    else return elt.offsetTop + absoluteY(elt.offsetParent) // - ctl.offsetParent.scrollTop;
}

//export function absoluteX(elt) {
function absoluteX(elt) {
    if (elt.offsetParent==null) return elt.offsetTop;
    else return elt.offsetLeft + absoluteX(elt.offsetParent) //- ctl.offsetParent.scrollLeft;
}   

//export function getDocumentScroll() {
function getDocumentScroll() {
    let Y = document.body.scrollTop + document.documentElement.scrollTop
    let X = document.body.scrollLeft + document.documentElement.scrollLeft
    return {scrollX: X, scrollY: Y}
}

export function getParentPane(elt) {
    // returns the parent content pane of elt
    if ( ! elt.parentNode ) return document.documentElement
    else if ( hasCssClass (elt, "content-pane") || hasCssClass (elt, "scroll-pane") ) return elt
    else return getParentPane(elt.parentNode)
}

if ( window ) window.activePopup = undefined

export function showFieldPopup(elt, popupContent, location) {
    // Displays a popup next to elt and display popupContent in it. PopupContent can be any a HTML element, a nort Component, or an array of both types mixed.
    // Preferred location can be specified as "n" (above the field), "e" (anchored to the right). Default location is bottom-right.
    let cp = getParentPane(elt)
    let anchorDiv = $div({ style: `width: 0px; height: 0px; vertical-align: top; position: relative; overflow: visible; display: inline-block; z-index: 10`},
        popupContent
    )
    elt.parentNode.insertBefore(anchorDiv, elt); 
    elt.popupAnchorDiv = anchorDiv

    if (activePopup) destroyElement(activePopup)

    popupContent.style.visibility = "hidden"

    let eRect = elt.getBoundingClientRect()
    let cpRect = cp.getBoundingClientRect()


    if (location == 'e') {
        if ( eRect.right + popupContent.offsetWidth > cpRect.width) anchorDiv.style.left = -popupContent.offsetWidth + "px"
        else anchorDiv.style.left = elt.offsetWidth +"px"
        if ( eRect.bottom + popupContent.offsetHeight > cpRect.height) anchorDiv.style.top = elt.offsetHeight - popupContent.offsetHeight + "px"
    } else {
        if (location .substr(0,1) == "n" ) {
            if ( eRect.top - popupContent.offsetHeight > cpRect.top )  anchorDiv.style.top = -popupContent.offsetHeight + "px"
            else anchorDiv.style.top = elt.offsetHeight + "px"
        } else {
            if ( cpRect.height - eRect.bottom - popupContent.offsetHeight > 0 ) { anchorDiv.style.top = elt.offsetHeight + "px"; }
            else anchorDiv.style.top = -popupContent.offsetHeight + "px"
        }

        if (location.substr(1,1) == "e" ) {
            anchorDiv.style.left = ( elt.offsetWidth - popupContent.offsetWidth)  +"px"
        } else {
            anchorDiv.style.left = "0px"
        }
    }

    elt.hidePopup = function() {
        hideFieldPopup(elt)
        elt.anchorDiv = undefined
        elt.hasActivePopup = false
    }

    activePopup = anchorDiv
    popupContent.style.visibility = "visible"
    elt.hasActivePopup = true
}

export function hideFieldPopup(elt) {
    // Removes the popup attached to elt
    destroyElement(elt.popupAnchorDiv)
    delete elt.popupAnchorDiv
}

