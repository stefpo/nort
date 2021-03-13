class ClientDemo extends nort.components.containers.Form {
    constructor(properties) {
        super(properties)
        let me = this

        this.fields.add ($button({name:"btn1", type: "button"},"Get data"))
                    .add ($textarea({name: "data", style: "width: 100%; height: 350px;"}))

        this.fields.btn1.on("click", function() {
            nort.http.debug=true
            nort.http.jsonRequest("GET","wsdata.json",{},function(err, result){
                me.fields.data.value = JSON.stringify(result.data,undefined,4)
            })
            me.fields.data.value ="In progress"
            
        })
    }

    render() {
        return $div({style:"padding: 1em; height: 100%; width: 100%; " },[
            this.fields.btn1, 
            $br(),
            this.fields.data 
        ])

        //$htmldiv({}, "it works")
    }

}