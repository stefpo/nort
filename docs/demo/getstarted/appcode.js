
// First you need to import the Nort library. 
// This will also initialize the framework.
import * as nort from "./nort/nort.js"

export class Application {
    init() {
        // Place here your pre-rendering initialization code
    }

    render() {
        // This is your page layout.
        return $div({ style: "padding: 30px"},
            [
            $h1({ style: "color: red"}, "Your first NORT application" ),
            $p({}, "Some text here" )
            ]) 
    }

    activate() {
        // Place here your post-rendering initialization code
    }                        
}

// This will add Nort default look and feel to your page
nort.useDefaultStyleSheets() 
// Don't forget to render your application
nort.render( new Application() ) 