/*!
 * NORT web UI component library
 * Copyright(c) 2019 Stephane Potelle 
 * MIT Licensed
*/

const nort = {}
nort.app = {}

const notDevMode = true
window.nort=nort

nort.version = notDevMode ? 1: Date.now().toString(16)

nort.dirName = function(s) {
    let i = s.lastIndexOf("/")
    if (i >= 0 ) {
        return s.substring(0, i)
    } 
    return s
}

nort.baseURL = nort.dirName(document.currentScript.src)

function loadJS(scriptName) {
    let src
    if (scriptName.startsWith("./") || /http[s]{0,1}\:\/\//.test() ) {
        document.write (`<script src=\"${scriptName}?version=${nort.version}\"></script>`)
    } else {
        document.write (`<script src=\"${nort.baseURL}/${scriptName}?version=${nort.version}\"></script>`)
    }
}

function loadJSx(scriptName) {
    let src
    if (scriptName.startsWith("./") || /http[s]{0,1}\:\/\//.test() ) {
        loadJSReal(`${scriptName}?version=${nort.version}`)
    } else {
        loadJSReal (`${nort.baseURL}/${scriptName}?version=${nort.version}`)
    }
}

function loadJSReal(FILE_URL) {
    let scriptEle = document.createElement("script");
  
    scriptEle.setAttribute("src", FILE_URL);
    scriptEle.setAttribute("type", "text/javascript");
    scriptEle.setAttribute("async", "false");
  
    document.body.appendChild(scriptEle);
  
    // success event 
    scriptEle.addEventListener("load", () => {
      console.log("File loaded: " + FILE_URL)
    });
     // error event
    scriptEle.addEventListener("error", (ev) => {
      console.log("Error on loading file", ev);
    });
  }


function loadStyleSheet(scriptName) {
    let src
    if (scriptName.startsWith("./") || /http[s]{0,1}\:\/\//.test() ) {
        document.write (`<link rel=\"stylesheet\" href=\"${scriptName}?version=${nort.version}\"></script>`)
    } else {
        document.write (`<link rel=\"stylesheet\" href=\"${nort.baseURL}/css/${scriptName}?version=${nort.version}\"></script>`)
    }
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

nort.main = function() {
    alert("NORT main function not defined")
}

document.addEventListener("DOMContentLoaded",function() { nort.main() })


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




