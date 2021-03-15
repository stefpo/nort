    // declare our component
    class myGeneratedList extends nort.Component {
        constructor( attributes, items ) {
            super(attributes)
            this.items = items
        }

        render() {
            let list=[]
            // Generate and array of LI elements.
            for ( let item of this.items ) {
                list.push( $li(this.properties, item ))
            }
            // Return a UL element containing the collection of LI element.
            return $ul({}, list)                             
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
