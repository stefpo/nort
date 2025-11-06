class GridDemo extends nort.components.Form {
    constructor(properties) {
        super(properties)
        let me = this
        
        this.grid = new nort.components.Grid({class: "fix-first-col"},
            {   columns: {  
                    status: { visible: true, enableDropdown: true, transformFunc: statusTransform },
                    LocShortName: { visible: false },
                }, 
                options: { defaultHeaderTransform: nort.makeTranslatable , rowLimit: 500 }
            })

        this.fields.add ($button({name:"btn1", type: "button"},"Get data"))
        this.fields.add ($button({name:"btn2", type: "button"},"Get data long"))
        this.fields.add ($button({name:"btn3", type: "button"},"Clear grid"))

        function statusTransform(s, forFilter) { 
            if (forFilter) return s!="" ? "["+s+"]":"" 
            else return s!="" ? "["+s+"]":"" 
        }

        this.fields.btn1.on("click", function() {
            nort.http.jsonRequest("GET","wsdata.json",{},function(err, result){
                if (err) { nort.alert("Error "+ err) }
                else {
                    me.grid.setData(result.data )
                }
            })
        })

        this.fields.btn2.on("click", function() {
            nort.http.jsonRequest("GET","wsdatalong.json",{},function(err, result){
                if (err) { nort.alert("Error "+ err) }
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
                nort.elements.scrollPane({style: "flex-grow: 1"}, this.grid )
            ])
        )
    }

}