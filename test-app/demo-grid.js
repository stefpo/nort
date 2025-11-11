
import * as elements from "../nort/nort-elements.js" 
import * as components from "../nort/nort-components-form.js" 
import * as grid from "../nort/nort-components-grid.js" 
import * as http from "../nort/nort-http-client.js" 
import * as i18n from "../nort/nort-i18n.js" 
import * as modal from "../nort/nort-elements-modal.js" 

export class GridDemo extends components.Form {
    constructor(properties) {
        super(properties)
        let me = this
        
        this.grid = new grid.Grid({class: "fix-first-col"},
            {   columns: {  
                    status: { visible: true, enableDropdown: true, transformFunc: statusTransform },
                    LocShortName: { visible: false },
                }, 
                options: { defaultHeaderTransform: i18n.makeTranslatable , rowLimit: 500 }
            })

        this.fields.add ($button({name:"btn1", type: "button"},"Get data"))
        this.fields.add ($button({name:"btn2", type: "button"},"Get data long"))
        this.fields.add ($button({name:"btn3", type: "button"},"Clear grid"))

        function statusTransform(s, forFilter) { 
            if (forFilter) return s!="" ? "["+s+"]":"" 
            else return s!="" ? "["+s+"]":"" 
        }

        this.fields.btn1.on("click", function() {
            http.jsonRequest("GET","wsdata.json",{},function(err, result){
                if (err) { modal.alert("Error "+ err) }
                else {
                    me.grid.setData(result.data )
                }
            })
        })

        this.fields.btn2.on("click", function() {
            http.jsonRequest("GET","wsdatalong.json",{},function(err, result){
                if (err) { modal.alert("Error "+ err) }
                else {
                    me.grid.setData(result.data )
                    }
            })
        })

        this.fields.btn3.onclick = function() {
            me.grid.setData()
        }
    }

    render() {
        return $div({ style:"padding: 1em; height: 100%; width: 100%; " },
            $div({style: "display: flex; flex-direction: column; height: 100%; width: 100%;"},
            [
            $div({},this.fields.btn1, " ", this.fields.btn2, " ", this.fields.btn3), 
                elements.scrollPane({style: "flex-grow: 1"}, this.grid )
            ])
        )
    }

}