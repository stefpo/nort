    // declare our component
    class myGeneratedList extends nort.Component {
        constructor( attributes, items ) {
            super(attributes)
            let me = this   // We make a copy of "this" to make sure we can us it in callbacks
            this.items = items
            // Add a textbox and a button
            this.textbox = $input({ type: "text" })
            this.button  = $input({ type: "button", value:"Add to list"  })
            
            // Add a callback to the button
            this.button.onclick = function() {
                // Note we use "me" and not "this"
                me.addItem( me.textbox.value)
            }
        }
        
        // Modify the component's data and refresh it.
        addItem(item) {
            this.items.push(item)
            this.refresh()
        }
        

        render() {
            let list=[]
            // Generate an array of LI elements.
            for ( let item of this.items ) {
                list.push( $li(this.properties, item ))
            }
            
            // Return a UL element containing the collection of LI element.
            return $div({}, 
                $ul({}, list),
                this.textbox, this.button )
        }
    }

    var aListOnthePage

    // This is the entry point of your application
    nort.main = function() {          
        aListOnthePage = new myGeneratedList({}, [ 'First item', 'Second item', 'Third item'] )
        
        // You need to render something.
        nort.render(
            $div({ style: "padding: 30px"},
                [
                $h1({ style: "color: red"}, "Your first NORT application" ),
                $p({}, "The next item is component" ),
                aListOnthePage
                ])
        )
    }
