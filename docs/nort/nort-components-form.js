/*!
 * NORT web UI component library
 * Copyright(c) 2019-2020 Stephane Potelle 
 * MIT Licensed
*/

nort.components.Form =  class Form extends nort.Component{
    constructor(properties) {
        super(properties)
        this.cssRequiredField = "required-field"
        this.cssMissingField = "missing-field"
        this.css = this.properties.class
        this.fields = {}
        this.form = null

        let me = this

        this.fields.add = function(e) {
            let k
            if (e.name) k = e.name
            else k = "o_"+ me.fields.length  
            me.fields[k] = e
            return me.fields
        }
    }

    render() {
        return $div({},
            this.form = $form({}, this.renderFormContent() )
        ).addClass("form")
    }

    renderFormContent() {
        let elements=[]
        for ( let k of Object.keys(this.fields )) {
            if ( ["INPUT","SELECT"].includes( this.fields[k].tagName) )    
                elements.push( $fieldBox({},this.fields[k]) )
            else 
                elements.push( this.fields[k]) 
        }
        return elements
    }

    toObject() {
        let fo = new Object()
        let errors = []
        
        this.isValid = true
        for ( let i in this.fields) {
            if (this.fields[i].getValue ) {
                let e = this.fields[i]
                let id = e.getAttribute("name")
                if (id !=null && id != "") {
                    
                    fo[id] = e.getValue()
                    e.isValid()
                    if (e.getValidationError() !="" ) { 
                        this.isValid = false
                        errors.push({field: id, label: e.name, msg: e.getValidationError()})
                    }                
                }
            }
        }

        fo['$valid']=this.isValid
        fo['$errors'] = errors
        return (fo)
    }

    fill( fo ) {
        for ( let i in this.fields) {
            let e = this.fields[i]
            //console.log(e.name)
            let id
            if ( (id = e.name) != undefined ) {
                if (id !=null && id != "") {
                    if (fo[id] != undefined) {
                        if (e.setValue) {
                            e.setValue(fo[id])
                        }
                    }
                }
            }
        }
        return (fo)
    }
            
}

