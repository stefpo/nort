// This is the entry point of your application
nort.main = function() {                    
    
    // You need to render something.
    nort.render(
        $div({ style: "padding: 30px"},
            [
            $h1({ style: "color: red"}, "Your first NORT application" ),
            $p({}, "Some text here" )
            ])
    )
}

