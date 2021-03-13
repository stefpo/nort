/*!
 * NORT web UI component library
 * Copyright(c) 2019 Stephane Potelle 
 * MIT Licensed
*/

class nortComponent {
    constructor(properties) {
        this.element = null
        this.properties = properties != undefined ? properties : {}
        this.display = ""
        this.eventHandlers = {}
    }

    destroy(rootElt) {
        let relt = rootElt || this.element
        if (relt == this.element ) {
            if (this.element ) {
                nort.destroyElement(this.element)
            }
        }

        for (let k of Object.keys(this)) {
            if (this[k] && this[k].destroy) this[k].destroy(relt)
            //console.log(this.css)
            this[k] = undefined
        }
    }    

    on(event, handler) {
        if ( ! this.eventHandlers[event] ) this.eventHandlers[event] = []
        this.eventHandlers[event].push(handler)
    }

    fireEvent(event, data) {
        let handlers = this.eventHandlers[event]
        if (Array.isArray(handlers)) {
            for (let handler of handlers) {
                try {
                    handler(this, data)
                } catch(e) { } // Ignore errors 
            }
        }
    }

    refresh() {
        if (this.element) {
            let v1 = this.element
            parent = v1.parentNode
            parent.replaceChild(this.element = this.render(), v1) 
        }
    }

    setRendered(b) {
        if ( this.element.style.display == "none" ) this.display = "inline-block"
        if (b) this.element.style.display = this.display
        else this.element.style.display = "none"
        return this      
    }

    setVisible(b) { 
        if (b) this.style.visibility = "hidden"
        else this.style.visibility = "visible"        
        return e
    }    
    
    render() {
        return this.element = $p({}, "Nort Component base class must be extended ")
    }
}

nort.Component = nortComponent

nort.render = function(component, target ) {
    var e
    if (target) e = document.getElementById(target)
    else e = document.body
    if (Array.isArray(component)) {
        for (let c of component) {
            if ( typeof(c.render) == "function") { 
                let he = c.render()
                c.element = he
                e.appendChild(he)
            }
            else e.appendChild(c)            
        }

    } else {
        if (typeof(component.render) == "function") { 
            let he = component.render()
            component.element = he
            e.appendChild(he)
        }
        else e.appendChild(component)
    }
}



nort.components = {}
nort.elements = {}
nort.components.containers = {}

nort.main = function() {
    alert("NORT main function not defined")
}

document.addEventListener("DOMContentLoaded",function() { nort.main() })


loadJS("nort-object.js")
loadJS("nort-datetime.js")
loadJS("nort-dom.js")
loadJS("nort-html-tags.js")
loadJS("nort-elements.js")
loadJS("nort-elements-windows.js")
loadJS("nort-elements-menu.js")
loadJS("nort-components-grid.js")
loadJS("nort-containers.js")
loadJS("nort-i18n.js")
loadJS("nort-i18n-dates.js")
loadJS("nort-http.js")
loadJS("nort-data.js")

loadStyleSheet("nort-default.css") 
loadStyleSheet("nort-windows.css") 
loadStyleSheet("nort-menu.css") 

