/*!
 * NORT web UI component library
 * Copyright(c) 2019 Stephane Potelle 
 * MIT Licensed
*/

import * as dom from "./nort-dom.js"

export class Component {
    // Base class for all Nort components. Although this class is fully functional, it does nothing but render a simple text message. 
    // The developer should at least override the render() method0

    constructor(properties) {
        this.element = null
        this.properties = properties != undefined ? properties : {}
        this.display = ""
        this.eventHandlers = {}
    }

    destroy(rootElt) {
        // Removes the component from the DOM. It also destroys any underlying elements or components.
        let relt = rootElt || this.element
        if (relt == this.element ) {
            if (this.element ) {
                dom.destroyElement(this.element)
            }
        }

        for (let k of Object.keys(this)) {
            if (this[k] && this[k].destroy) this[k].destroy(relt)
            //console.log(this.css)
            this[k] = undefined
        }
    }    

    on(eventName, handler) {
        // Attaches handler to event eventName. This allows communication between components. 
        // The event handler is attached to the component, and not to the underlying HTML element.
        if ( ! this.eventHandlers[eventName] ) this.eventHandlers[eventName] = []
        this.eventHandlers[eventName].push(handler)
    }

    fireEvent(eventName, data) {
        // Fires even eventName. Use data as the parameter for the handler.
        let handlers = this.eventHandlers[eventName]
        if (Array.isArray(handlers)) {
            for (let handler of handlers) {
                try {
                    setTimeout( function(){handler(this, data)}, 0)
                } catch(e) { } // Ignore errors 
            }
        }
    }

    refresh() {
        // Replaces the associated element in the DOM with a new rendering. Simplest way to refresh a component. May not be the most cost-efficient.
        if (this.element) {
            let v1 = this.element
            parent = v1.parentNode
            parent.replaceChild(this.element = this.render(), v1) 
        }
    }

    setRendered(bool) {
        // Shows / Hides a component. When bool is false, the component uses no space on the screen but its underlying DOM still exists.
        if ( this.element.style.display == "none" ) this.display = "inline-block"
        if (bool) this.element.style.display = this.display
        else this.element.style.display = "none"
        return this      
    }

    setVisible(bool) { 
        // Shows / Hides a component. When bool is false, the component is invisible but it still consumes space on the page.
        if (bool) this.style.visibility = "hidden"
        else this.style.visibility = "visible"        
        return e
    }    
    
    render() {
        // This method is where the rendering takes place. The component developer is responsible for creating it for his component.
        // The return value must ALWAYS be a HTML element.
        // Example from this base class: <code>return this.element = $p({}, "Nort Component base class must be extended ")</code>
        
        return this.element = $p({}, "Nort Component base class must be extended ")
    }
}

