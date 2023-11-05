/*!
 * NORT web UI component library
 * Copyright(c) 2019 Stephane Potelle 
 * MIT Licensed
*/

nort.components = {}

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
                    setTimeout( function(){handler(this, data)}, 0)
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