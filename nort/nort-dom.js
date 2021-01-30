/*!
 * NORT web UI component library
 * Copyright(c) 2019-2020 Stephane Potelle 
 * MIT Licensed
*/


nort.createElement = function (tn, fixedAttr, rest) {
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
        nort.addElement(elt, e) 
    }

    elt.listeners = {}

    elt.addClass = function(className) { return nort.addCssClass(elt, className) }
    elt.removeClass = function(className) { return nort.removeCssClass(elt, className)}        
    elt.hasClass = function(className) { return nort.hasCssClass(elt, className)}        

    elt.off = function (evt) {
        let h = elt.listeners[evt]
        if ( h ) {
            elt.removeEventListener(evt, h)
            elt.listeners[evt] = undefined
        }
    }

    elt.on = function(a,b,c,d,e) { 
        elt.off(a)
        elt.addEventListener(a,b,c,d,e)
        elt.listeners[a] = b
        return elt 
    }    
    
    elt.nortProps = {}

    elt.nort = function(k,v) {
        if (v) { elt.nortProps[k] = v }
        else return elt.nortProps[k]
    }

    return elt
}


nort.addElement = function (elt, e) {
    let t = typeof(e)
    if (e == null ) console.log(elt.tagName)
    if (t == "object" && typeof(e.render) == "function") {
        let he = e.render()
        elt.appendChild(e.element = he)
        e.nortParent = elt
    } else if (t == "string" || t == "number") {
        elt.appendChild(document.createTextNode(nort.translate(e) +" "))
    } else if (Array.isArray(e)) {
        for (let i =0; i < e.length; i++ ) {
            nort.addElement(elt, e[i])
        }
    } else if (t.startsWith("object")) {
        elt.appendChild(e)
    } else {
    }
}


nort.replaceElement = function(elt, newElt) {
    if (elt) {
        parent = elt.parentNode
        if (parent ) parent.replaceChild(newElt, elt) 
    }
}

nort.emptyElement = function(elt) {
    let remlist = []
    for (let i = 0; i<  elt.childNodes.length; i++) {
        remlist.push(elt.childNodes[i])
    }

    for (let i = 0; i<  remlist.length; i++) {
        elt.removeChild(remlist[i])
    }
}

nort.setInnerContent = function(elt, contents) {
    nort.emptyElement(elt)
    nort.addElement(elt,contents)
}

nort.destroyElement = function(elt) {
    if (elt) {
        delete elt.nortProps
        elt.textContent = ''
        if (elt.parentNode ) elt.parentNode.removeChild(elt)
    }
}

nort.getClasses = function(elt) {
    let items = elt.className.split(" ")
    let ix
    while ((ix = items.indexOf('')) > -1) {
        items.splice(ix, 1)
    }
    return items
}

nort.hasCssClass = function (elt, className) {
    let c = nort.getClasses(elt)
    return c.includes(className)
}

nort.addCssClass = function (elt, className) {
    let c = nort.getClasses(elt)
    if (!c.includes(className)) c.push(className)
    elt.className = c.join(' ')
    return(elt)
}

nort.removeCssClass = function (elt, className) {
    let c = nort.getClasses(elt)
    let ix
    while ((ix = c.indexOf(className)) > -1) {
        c.splice(ix, 1)
    }
    elt.className = c.join(' ')
    return(elt)
}

nort.getStyle = function (el,styleProp)
{
    if (window.getComputedStyle)
    {
        var y = document.defaultView.getComputedStyle(el,null).getPropertyValue(styleProp); 
    }  
    else if (x.currentStyle)
    {
        var y = el.currentStyle[styleProp];
    }                     

    return y;
}

nort.mergeAttributes = function (dest, attr) {
        for (let k of Object.keys(attr)) {
            dest[0][k] = attr[k]
        }
        return dest
    }


nort.absoluteY = function (ctl) {
    if (ctl.offsetParent==null) return ctl.offsetTop;
    else return ctl.offsetTop + nort.absoluteY(ctl.offsetParent) // - ctl.offsetParent.scrollTop;
}

nort.absoluteX = function (ctl) {
    if (ctl.offsetParent==null) return ctl.offsetTop;
    else return ctl.offsetLeft + nort.absoluteX(ctl.offsetParent) //- ctl.offsetParent.scrollLeft;
}   

nort.getDocumentScroll = function () {
    let Y = document.body.scrollTop + document.documentElement.scrollTop
    let X = document.body.scrollLeft + document.documentElement.scrollLeft
    return {scrollX: X, scrollY: Y}
}

nort.getParentPane = function(e) {
    if ( ! e.parentNode ) return document.documentElement
    else if ( nort.hasCssClass (e, "content-pane") || nort.hasCssClass (e, "scroll-pane") ) return e
    else return nort.getParentPane(e.parentNode)
}

nort.activePopup = undefined

nort.showFieldPopup = function(e, popup, location) {
    let cp = nort.getParentPane(e)
    let anchorDiv = $div({ style: `width: 0px; height: 0px; vertical-align: top; position: relative; overflow: visible; display: inline-block;`},
        popup
    )
    e.parentNode.insertBefore(anchorDiv, e); 
    e.popupAnchorDiv = anchorDiv

    if (nort.activePopup) nort.destroyElement(nort.activePopup)

    popup.style.visibility = "hidden"

    eRect = e.getBoundingClientRect()
    cpRect = cp.getBoundingClientRect()

    

    if (location == 'e') {
        if ( eRect.right + popup.offsetWidth > cpRect.width) anchorDiv.style.left = -popup.offsetWidth + "px"
        else anchorDiv.style.left = e.offsetWidth +"px"
        if ( eRect.bottom + popup.offsetHeight > cpRect.height) anchorDiv.style.top = e.offsetHeight - popup.offsetHeight + "px"
    } else {
        if (location .substr(0,1) == "n" ) {
            if ( eRect.top - popup.offsetHeight > cpRect.top )  anchorDiv.style.top = -popup.offsetHeight + "px"
            else anchorDiv.style.top = e.offsetHeight + "px"
        } else {
            if ( cpRect.height - eRect.bottom - popup.offsetHeight > 0 ) { anchorDiv.style.top = e.offsetHeight + "px"; }
            else anchorDiv.style.top = -popup.offsetHeight + "px"
        }

        if (location.substr(1,1) == "e" ) {
            anchorDiv.style.left = e.offsetWidth - popup.offsetWidth+"px"
        } else {
            anchorDiv.style.left = "0px"
        }
    }

    e.hidePopup = function () {
        nort.hideFieldPopup(e)
        e.anchorDiv = undefined
    }

    nort.activePopup = anchorDiv
    popup.style.visibility = "visible"
    //popup.style.position =  "fixed"
}

nort.hideFieldPopup = function(e) {
    nort.destroyElement(e.popupAnchorDiv)
    delete e.popupAnchorDiv
}