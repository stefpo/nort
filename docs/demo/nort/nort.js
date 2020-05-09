/*!
 * NORT web UI component library
 * Copyright(c) 2019 Stephane Potelle 
 * MIT Licensed
*/

const nort = {}
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

function loadStyleSheet(scriptName) {
    let src
    if (scriptName.startsWith("./") || /http[s]{0,1}\:\/\//.test() ) {
        document.write (`<link rel=\"stylesheet\" href=\"${scriptName}?version=${nort.version}\"></script>`)
    } else {
        document.write (`<link rel=\"stylesheet\" href=\"${nort.baseURL}/css/${scriptName}?version=${nort.version}\"></script>`)
    }
}

loadJS("nort-base.js")


