/* 
This file generate nort module documentation
*/

import * as nort from '../nort.js'
import * as version from '../version.js'
import * as packageInfo from '../package-info.js'

let contentHTML=[]

function functionDoc(fn) {
    let out=[]
    out.push(`<p><b>${fn.signature}</b>`)
    if(fn.doc != "") {
        out.push(`<blockquote><p>${fn.doc.replace("\n","<br>")}</p></blockquote>`)    
    }
    out.push("</p>")
    return out
}

async function documentAll() {
    const moduleList=["nort",
            "nort-dom",
            "nort-object",
            "nort-components",
            "nort-i18n",
            "nort-elements", 
            "nort-elements-calendar",
            "nort-elements-menu",
            "nort-elements-tabber",
            "nort-elements-modal",
            "nort-elements-windows",
            "nort-elements-chart"
        ]
    //const moduleList=["test-class"]
    let modInfo = await packageInfo.getInfo(moduleList)
    contentHTML.push("<h1>Nort package reference</h1>")
    contentHTML.push(`Version ${version.info.version} released ${JSON.stringify(version.info.date).substring(1,11)}`)
    for (let mod of modInfo) {
        contentHTML.push(`<h2>Module ${mod.name}</h2>`)
        contentHTML.push("<blockquote>")
        if ( mod.classes.length >0 ) {
            //contentHTML.push(`<h3>Classes</h3>`)
            //contentHTML.push("<blockquote>")
            for (let cls of mod.classes) {
                //contentHTML.push(`<h4>${cls.name}</h4>`)
                contentHTML.push(`<h3>${cls.constructor.replace("class ","Class ")}</h3>`)
                contentHTML.push("<blockquote>")
                if (cls.doc != "")  contentHTML.push(`<p>${cls.doc.replace("\n","<br>")}</p>`)
                for (let fn of cls.staticMethods) {
                    let fd = functionDoc(fn)
                    contentHTML = [...contentHTML, ...fd ]
                }                
                for (let fn of cls.methods) {
                    let fd = functionDoc(fn)
                    contentHTML = [...contentHTML, ...fd ]
                }  
                contentHTML.push("</blockquote>")
            }
            //contentHTML.push("</blockquote>")
        }
        if ( mod.functions.length >0 ) {
            contentHTML.push(`<h3>Functions</h3>`)
            for (let fn of mod.functions) {
                let fd = functionDoc(fn)
                contentHTML = [...contentHTML, ...fd ]
            }
        }
        contentHTML.push("</blockquote>")
    }
//    contentHTML.push(`<pre>${JSON.stringify(modInfo, undefined,"  ")}</pre>`)

    let tartgetDiv = $div({ id: "contents"},"Test")
    nort.render($section({}, 
        $div({class: "container"},
            $h1({}, "Nort API reference"),
            $div({id:"toc"}, $h2({},"Content")), 
            tartgetDiv))
        )
    tartgetDiv.innerHTML =contentHTML.join("\n")
}

async function main() {
    await documentAll()
    insertToc("toc", "contents", "h2")
}

main()