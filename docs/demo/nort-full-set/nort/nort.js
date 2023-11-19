/*!
 * NORT web UI component library
 * Copyright(c) 2019 Stephane Potelle 
 * MIT Licensed
*/

const nort = {}

nort.info= {
    version: "0.6",
    date: new Date( 2023, 11, 5 )
}

window.nort=nort
nort.scriptsToLoad = []
nort.appFiles = []
nort.appClass = null

nort.dirName = function(s) {
    let i = s.lastIndexOf("/")
    if (i >= 0 ) {
        return s.substring(0, i)
    } 
    return s
}

nort.versionString=function() {
    return `${nort.info.version}${nort.info.date.toJSON().substring(0,9)}`
}

nort.baseURL = nort.dirName(document.currentScript.src)

function initializeNort() {
    let currentScript = 0

    for (let f of nort.appFiles) {
        nort.scriptsToLoad.push(f)
    }

    function next() {
        if (currentScript < nort.scriptsToLoad.length) {
            let src = nort.scriptsToLoad[currentScript++]
            if (src.startsWith("./") || /http[s]{0,1}\:\/\//.test() ) {
                src = `${src}?version=${nort.versionString()}` 
                
            } else {
                src = `${nort.baseURL}/${src}?version=${nort.versionString()}`
            }            
            console.log("Load script " + src)
            let e = document.createElement('script')
            e.src = src
            e.addEventListener('load', next )
            e.addEventListener('error', next )
            document.head.appendChild(e)
        } else {
            nort.defaultMain()
        } 
    }
    next()
}

function loadJS(scriptName) {
    nort.scriptsToLoad.push(scriptName)
}


function loadStyleSheet(scriptName) {
    let src
    if (scriptName.startsWith("./") || /http[s]{0,1}\:\/\//.test() ) {
        src = `${scriptName}?version=${nort.version}`
    } else {
        src = `${nort.baseURL}/css/${scriptName}?version=${nort.version}`
    }
    let e = document.createElement('link')
    e.href = src
    e.rel = "stylesheet"
    document.head.appendChild(e)
}

nort.render = function(component, target ) {
    var e
    if (target) e = document.getElementById(target)
    else e = document.body
    if (Array.isArray(component)) {
        for (let c of component) {
            if ( typeof(c.render) == "function") { 
                let he = c.render()
                c.element = he
                e.appendChild(he)
            }
            else e.appendChild(c)            
        }

    } else {
        if (typeof(component.render) == "function") { 
            let he = component.render()
            component.element = he
            e.appendChild(he)
        }
        else e.appendChild(component)
    }
}

nort.defaultMain = function() {
    if ( typeof (Application) == "function" ) nort.applicationClass(Application)
    if (typeof( nort.appClass) == "function" ) {
        let app = new nort.appClass()
        if ( app.init ) app.init()
        nort.render(app.render())
        if ( app.activate ) app.activate()
        window.app = app
    } else if (typeof( nort.main) == "function") {
       nort.main()
    } else {
        nort.render( 
            $div( { style: "width: 1024px; margin:auto;  margin-top: 20px; margin-bottom: 20px;"},
                $div ({style: "display: flex; "}, $img({src:"css/nort-logo.png",style:"align-self: center;"} ), $h2({style:"align-self: center;"},"Welcome to Nort UI framework") ),
                $p({}, "Your application is not starting because you are missing an application class or nort.main() function."  ),
                $p({}, "To make your application functional you may do one of the following:" ),
                $ul({},
                    $li({},"Create a class Application that implements the render() function that return a HTML elemement (This is the preferred method)."),
                    $li({},"Assign to the nort.main property a function that initializes you application and calls the the nort.render() function.") 
                ),
                $p({}, "To lean more about how to use Nort, visit the documentation pages at",
                    $a({ href: "https://stefpo.github.io/nort/", target: "_doc"}, "https://stefpo.github.io/nort/")
                )
            )
        )
        
    }
}

nort.applicationClass = function(cls) {
    nort.appClass = cls
}

document.addEventListener("DOMContentLoaded",initializeNort)

loadJS("nort-object.js")
loadJS("nort-datetime.js")
loadJS("nort-html-tags.js")
loadJS("nort-dom.js")
loadJS("nort-elements.js")
loadJS("nort-elements-windows.js")
loadJS("nort-elements-menu.js")
loadJS("nort-components.js")
loadJS("nort-components-grid.js")
loadJS("nort-components-form.js")
loadJS("nort-i18n.js")
loadJS("nort-i18n-dates.js")
loadJS("nort-http-client.js")
loadJS("nort-elements-tabber.js")
loadJS("nort-elements-chart.js")
loadJS("nort-elements-dropdown.js")
loadJS("nort-elements-calendar.js")
loadJS("nort-elements-modal.js")

loadStyleSheet("nort-default.css") 
loadStyleSheet("nort-windows.css") 
loadStyleSheet("nort-menu.css") 




