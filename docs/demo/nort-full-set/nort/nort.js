/*!
 * NORT web UI component library
 * Author: Stephane Potelle 
 * Code written as a personal research project between 2019 and 2025
 * MIT Licensed
*/

import * as version from "./version.js"
export const nort = {
    app: {}
}

window.setImmediate=function(f) {setTimeout(f,0)}

export function dirName(path) {
    // Returns the path to the parent folder of path
    let i = path.lastIndexOf("/")
    if (i >= 0 ) {
        return path.substring(0, i)
    } 
    return path
}

export function versionString() {
    // Returns the version and release date of the Nort package
    return `${nort.info.version}${nort.info.date.toJSON().substring(0,9)}`
}

function diffPath(srcPath, targetPath) {
    let src = srcPath.split("/").filter( r => r !=""? true: false)
    let target = targetPath.split("/").filter( r => r !=""? true: false)
    let diff=[]

    while (src.length > 0 && target.length > 0) {
        if (src[0] == target[0]) {
            src.shift()
            target.shift()
        } else {
            src.shift()
            diff.push("..")
        }
    }
    for (let r of target) {
        diff.push(r)
    }
    if (diff.length==0) diff.push(".")

    return diff.join("/")+"/"
}


export function loadStyleSheet(cssFileName) {
    // Loads a style sheet for your nort application (Assuming it was not done using the application HTML file)
    // cssFileName should be a relative path from your HTML page (starting with "./") or a cssFileName found in Nort css folder.
    let src
    if (cssFileName.startsWith("./") || /http[s]{0,1}\:\/\//.test() ) {
        src = `${cssFileName}?version=${version.info.version}`
    } else {
        let appDir=new URL( window.location.href).pathname 
        let nortDir=dirName(new URL(import.meta.url).pathname)
        if (! appDir.endsWith('/')) appDir=dirName(appDir)

        let relpath = diffPath(appDir, nortDir)
        src = `${relpath}css/${cssFileName}?version=${version.info.version}`
    }
    let e = document.createElement('link')
    e.href = src
    e.rel = "stylesheet"
    document.head.appendChild(e)
}

export function render(component, target ) {
    // Renders the component in the HTML page. The "component" must evaluate to a HTML element or a Nort Component.
    // By default, the rendered object replaces the page body. By specifying the Id of a HTML tag, you can have it replace the tag content, making it possible to create hybrid pages.
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

export function useDefaultStyleSheets() {
    // Tells Nort to use its default style sheets.
    loadStyleSheet("nort-default.css") 
    loadStyleSheet("nort-windows.css") 
    loadStyleSheet("nort-menu.css") 
}

import {} from "./nort-datetime.js"
import {} from "./nort-html-tags.js"
import {} from "./nort-elements.js"
import {} from "./nort-elements-windows.js"
import {} from "./nort-elements-menu.js"
import {} from "./nort-components.js"
import {}  from "./nort-components-grid.js"
import {}  from "./nort-components-form.js"
import {}  from "./nort-i18n.js"
import {}  from "./nort-http-client.js"
import {}  from "./nort-elements-tabber.js"
import {}  from "./nort-elements-chart.js"
import {}  from "./nort-elements-dropdown.js"
import {}  from "./nort-elements-calendar.js"
import {}  from "./nort-elements-modal.js"

