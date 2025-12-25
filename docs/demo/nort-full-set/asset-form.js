import * as elements from "./nort/nort-elements.js" 
import * as elements2 from "./nort/nort-elements-menu.js" 
import * as elements3 from "./nort/nort-elements-dropdown.js" 
import * as calendar from "./nort/nort-elements-calendar.js" 
import * as tabs from "./nort/nort-elements-tabber.js" 
import * as components from "./nort/nort-components-form.js" 
import * as modal from "./nort/nort-elements-modal.js" 
import { WM } from "./nort/nort-elements-windows.js"


export class AssetForm extends components.Form {
    constructor (properties) {
        super(properties)
        console.log("New asset form")
        let me = this
        this.fields.add (elements.textBox({name: "manuf", placeholder: "manufacturer", value: "" }))
                   .add (elements.textBox({class: "required-field", style: "background-image: none", name: "model", value: "" }))
                   .add (elements.textBox({style: "background-image: none", name: "serial", value: "" }))
                   .add (calendar.dateBox({name: "srvdate", class:"required-field", value: "" }))                       
                   .add (calendar.dateBox({name: "bottom_date", value: "" }))                       

                   .add (elements.textBox({name: "integer", class:"required-field type-int", value: "" }))                       
                   .add (elements.textBox({name: "decimal", class:"required-field type-decimal2", value: "" }))                       
                   .add (elements.textBox({name: "float", class:"required-field type-float", value: "" }))                       
                   .add (elements.textBox({name: "domain", class:"required-field type-domain", value: "" }))                       
                   .add (elements.textBox({name: "email", class:"required-field type-email", value: "" }))                       

                   .add (elements.select({name: "location", value:"L1"},{ null:"Undefined", L1:"Location 1", L2:"Location 2", L3: "Location3"} ))
                   .add (elements.select({name: "status"},{NEW:"New",ACTIVE:"Active",DISPOSED:"Disposed"}))
                   .add (elements.select({name: "type"},{ EE:"Electrical", ME:"Mechanical"} ))
                   .add (elements.button({name:"btn", type: "button", class: "main"},"[UPDATE]"))
                   .add (elements.button({name:"btn2", type: "button"},"[ACTIVATE]"))
                   .add (elements.button({name:"btn3", type: "button", disabled: 1},"[INACTIVE]"))
                   .add (elements.button({name:"btn4", type: "button"},"[Add tab Page]"))
                   .add (elements.button({name:"btn5", type: "button"},"[Show alert]"))
                   .add (elements.button({name:"btn6", type: "button"},"[Choice box]"))
                   .add (elements.button({name:"btn7", type: "button"},"[New window]"))
                   .add (elements2.buttonMenu({name:"mnu1" },"Menu", 
                            [{text: "Entry1", callback: function() { modal.alert("Entry 1")}},
                             {text: "Entry2", callback: function() { modal.alert("Entry 2")}},
                             { menu: { text: "Submenu", items: [ { text: "Sub1", callback: function() { modal.alert("Sub1 2")} } ] } },
                             {text: "Entry3", callback: function() { modal.alert("Entry 3")}}]))
                   .add (elements.textBox({name:"browser"}))
                   .add (elements.checkBox({name:"cb1" }))


        //this.fields.location.setValue("L2")
        this.fields.btn.on("click", function() {  me.onUpdate() })
        this.fields.btn2.on("click", function() {  me.fields.btn3.setDisabled(false); me.fields.btn3.setText("[ACTIVE]") })

        this.fields.cb1.on("click", function() {  me.fields.btn3.setRendered( this.checked) })
        this.fields.btn3.setRendered( this.fields.cb1.checked) 

        this.fields.btn4.on("click", function() { me.tabber.addPage({label: "New tab",page: new elements.textBox(), removable: true })  })

        this.fields.btn5.on("click", function() { modal.alert("Clicked ! ") }) 

        this.fields.btn6.on("click", function() { modal.choiceBox("", "Pick a choice", [
            { text: "Choice 1", callback: function(){ modal.alert("Choice 1", 10 )} },
            { text: "Choice 2", callback: function(){ modal.alert("Choice 2", 10 )} },
            { text: "Choice 3", callback: function(){ modal.alert("Choice 3", 10 )} },
            { text: "Choice 4", callback: function(){ modal.alert("Choice 4", 10 )} },
            { text: "Choice 5", callback: function(){ modal.alert("Choice 5", 10 )} },
            { text: "Choice 6", callback: function(){ modal.alert("Choice 6", 10 )} }
            ])
        }) 

        this.fields.btn7.on("click", function () { WM().createWindow( { title: "Form in a window", resizable: 1, content: $div({style:"width: 850px;"},new AssetForm()) }).pack() }) 

        this.fields.browser.value = navigator.userAgent     
    }

    render() {

        return $div({style: "padding: 1em;"},
                elements.fieldBox({class: "horizontal"}, this.fields.manuf),
                elements.fieldBox({class: "horizontal"}, this.fields.model),
                elements.fieldBox({class: "horizontal"}, this.fields.serial),
                $br(),
                elements.fieldBox({class: "horizontal"}, this.fields.srvdate),
                elements.fieldBox({class: "horizontal"}, this.fields.integer),
                elements.fieldBox({class: "horizontal"}, this.fields.decimal),
                elements.fieldBox({class: "horizontal"}, this.fields.float),
                elements.fieldBox({class: "horizontal size-2"}, this.fields.domain),
                elements.fieldBox({class: "horizontal size-2"}, this.fields.email),
                elements.fieldBox({class: "horizontal size-2"}, this.fields.location),
                $br(),  
                elements.fieldBox({class: "size-3"}, this.fields.browser),
                $br(),
                this.fields.btn," ",  this.fields.btn2," Visible ",  this.fields.cb1, " ",  
                this.fields.btn3," ", this.fields.btn5,  " ", this.fields.btn6, " ", 
                this.fields.btn7, " ", this.fields.mnu1,
                $div({style: "height: 10px;"}),
                $div({ style: "width: 720px; height: 200px; margin-bottom: 0.5em"},
                    this.tabber = tabs.tabber({ style: "height: 100%;"}, 
                        [{ label:"[STATUS]", 
                            page: $div({style: "padding: 4px;"}, 
                                elements.fieldBox({}, this.fields.status),
                                elements.fieldBox({}, this.fields.type),
                                $br(),
                                elements.fieldBox({}, elements3.comboBox({},"Option 1;Option 2;Option 3; Option 4")),
                                 ),
                            },
                         { label:"[CONDITION]", page:   
                            elements.scrollPane({style: "padding: 4px;"},[ $h1({},"Page2"), "L1", $br(), "L1", 
                                $div({style:"width:1000px; background-color: silver"},"A div"), "L1", $br(), "L1", $br(), "L1", $br(), "L1", $br(), "L1", $br(), "L1", $br(), "L1", $br() ])},
                         { label:"[ALLOCATION]", page: $div({style: "padding: 4px;"},"Page3") },
                         { label:"More", page: "one more page" }
                        ])
                    ),
                this.fields.btn4,
                elements.fieldBox({}, this.fields.bottom_date)
        )
    }

    onUpdate(){
        let o = this.toObject()
        modal.alert($textarea({style: "resize: none; width: 650px; height: 525px;"},JSON.stringify(o, undefined, 4)))
        this.fields.btn3.setDisabled(true)
        this.fields.btn3.setText("[INACTIVE]")        
    }
}
