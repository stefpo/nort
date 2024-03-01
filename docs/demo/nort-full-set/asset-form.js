class AssetForm extends nort.components.Form {
    constructor (properties) {
        super(properties)
        let me = this
        this.fields.add (nort.elements.textbox({name: "manuf", placeholder: "manufacturer", value: "" }))
                   .add (nort.elements.textbox({class: "required-field", style: "background-image: none", name: "model", value: "" }))
                   .add (nort.elements.textbox({style: "background-image: none", name: "serial", value: "" }))
                   .add (nort.elements.datebox({name: "srvdate", class:"required-field", value: "" }))                       
                   .add (nort.elements.datebox({name: "bottom_date", value: "" }))                       

                   .add (nort.elements.textbox({name: "integer", class:"required-field type-int", value: "" }))                       
                   .add (nort.elements.textbox({name: "decimal", class:"required-field type-decimal2", value: "" }))                       
                   .add (nort.elements.textbox({name: "float", class:"required-field type-float", value: "" }))                       
                   .add (nort.elements.textbox({name: "domain", class:"required-field type-domain", value: "" }))                       
                   .add (nort.elements.textbox({name: "email", class:"required-field type-email", value: "" }))                       

                   .add (nort.elements.select({name: "location", value:"L1"},{ null:"Undefined", L1:"Location 1", L2:"Location 2", L3: "Location3"} ))
                   .add (nort.elements.select({name: "status"},{NEW:"New",ACTIVE:"Active",DISPOSED:"Disposed"}))
                   .add (nort.elements.select({name: "type"},{ EE:"Electrical", ME:"Mechanical"} ))
                   .add (nort.elements.button({name:"btn", type: "button", class: "main"},"[UPDATE]"))
                   .add (nort.elements.button({name:"btn2", type: "button"},"[ACTIVATE]"))
                   .add (nort.elements.button({name:"btn3", type: "button", disabled: 1},"[INACTIVE]"))
                   .add (nort.elements.button({name:"btn4", type: "button"},"[Add tab Page]"))
                   .add (nort.elements.button({name:"btn5", type: "button"},"[Show alert]"))
                   .add (nort.elements.button({name:"btn6", type: "button"},"[Choice box]"))
                   .add (nort.elements.button({name:"btn7", type: "button"},"[New window]"))
                   .add (nort.elements.buttonMenu({name:"mnu1" },"Menu", 
                            [{text: "Entry1", callback: function() { nort.alert("Entry 1")}},
                             {text: "Entry2", callback: function() { nort.alert("Entry 2")}},
                             { menu: { text: "Submenu", items: [ { text: "Sub1", callback: function() { nort.alert("Sub1 2")} } ] } },
                             {text: "Entry3", callback: function() { nort.alert("Entry 3")}}]))
                   .add (nort.elements.textbox({name:"browser"}))
                   .add (nort.elements.checkbox({name:"cb1" }))


        //this.fields.location.setValue("L2")
        this.fields.btn.on("click", function() {  me.onUpdate() })
        this.fields.btn2.on("click", function() {  me.fields.btn3.setDisabled(false); me.fields.btn3.setText("[ACTIVE]") })

        this.fields.cb1.on("click", function() {  me.fields.btn3.setRendered( this.checked) })
        this.fields.btn3.setRendered( this.fields.cb1.checked) 

        this.fields.btn4.on("click", function() { me.tabber.addPage({label: "New tab",page: new tb, removable: true })  })

        this.fields.btn5.on("click", function() { nort.alert("Clicked ! ") }) 

        this.fields.btn6.on("click", function() { nort.choiceBox("", "Pick a choice", [
            { text: "Choice 1", callback: function(){ nort.alert("Choice 1", 10 )} },
            { text: "Choice 2", callback: function(){ nort.alert("Choice 2", 10 )} },
            { text: "Choice 3", callback: function(){ nort.alert("Choice 3", 10 )} },
            { text: "Choice 4", callback: function(){ nort.alert("Choice 4", 10 )} },
            { text: "Choice 5", callback: function(){ nort.alert("Choice 5", 10 )} },
            { text: "Choice 6", callback: function(){ nort.alert("Choice 6", 10 )} }
            ])
        }) 

        this.fields.btn7.on("click", function () { nort.WM.createWindow( { title: "Form in a window", resizable: 1, content: $div({style:"width: 850px;"},new AssetForm()) }).pack() }) 

        this.fields.browser.value = navigator.userAgent     
    }

    render() {

        return $div({style: "padding: 1em;"},
                nort.elements.fieldBox({class: "horizontal"}, this.fields.manuf),
                nort.elements.fieldBox({class: "horizontal"}, this.fields.model),
                nort.elements.fieldBox({class: "horizontal"}, this.fields.serial),
                $br(),
                nort.elements.fieldBox({class: "horizontal"}, this.fields.srvdate),
                nort.elements.fieldBox({class: "horizontal"}, this.fields.integer),
                nort.elements.fieldBox({class: "horizontal"}, this.fields.decimal),
                nort.elements.fieldBox({class: "horizontal"}, this.fields.float),
                nort.elements.fieldBox({class: "horizontal size-2"}, this.fields.domain),
                nort.elements.fieldBox({class: "horizontal size-2"}, this.fields.email),
                nort.elements.fieldBox({class: "horizontal size-2"}, this.fields.location),
                $br(),  
                nort.elements.fieldBox({class: "size-3"}, this.fields.browser),
                $br(),
                this.fields.btn," ",  this.fields.btn2," Visible ",  this.fields.cb1, " ",  
                this.fields.btn3," ", this.fields.btn5,  " ", this.fields.btn6, " ", 
                this.fields.btn7, " ", this.fields.mnu1,
                $div({style: "height: 10px;"}),
                $div({ style: "width: 720px; height: 200px; margin-bottom: 0.5em"},
                    this.tabber = nort.elements.tabber({ style: "height: 100%;"}, 
                        [{ label:"[STATUS]", 
                            page: $div({style: "padding: 4px;"}, 
                                nort.elements.fieldBox({}, this.fields.status),
                                nort.elements.fieldBox({}, this.fields.type),
                                $br(),
                                nort.elements.fieldBox({}, nort.elements.comboBox({},"Option 1;Option 2;Option 3; Option 4")),
                                 ),
                            },
                         { label:"[CONDITION]", page:   
                            nort.elements.scrollPane({style: "padding: 4px;"},[ $h1({},"Page2"), "L1", $br(), "L1", 
                                $div({style:"width:1000px; background-color: silver"},"A div"), "L1", $br(), "L1", $br(), "L1", $br(), "L1", $br(), "L1", $br(), "L1", $br(), "L1", $br() ])},
                         { label:"[ALLOCATION]", page: $div({style: "padding: 4px;"},"Page3") },
                         { label:"More", page: "one more page" }
                        ])
                    ),
                this.fields.btn4,
                nort.elements.fieldBox({}, this.fields.bottom_date)
        )
    }

    onUpdate(){
        let o = this.toObject()
        nort.alert($textarea({style: "resize: none; width: 650px; height: 525px;"},JSON.stringify(o, undefined, 4)))
        this.fields.btn3.setDisabled(true)
        this.fields.btn3.setText("[INACTIVE]")        
    }
}
