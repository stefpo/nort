/*!
 * NORT web UI component library
 * Copyright(c) 2019-2020 Stephane Potelle 
 * MIT Licensed
*/

nort.translations = []

nort.getBrowserLanguage = function() {
    let lang = window.navigator.languages ? window.navigator.languages[0] : null;
    lang = lang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
    lang = lang.substring(0,5)
    return lang
}

nort.makeTranslatable = function(s) {
    return "[" + s + "]"
}

nort.translate = function(s) {
    let re = /\[([a-z]|[0-9]|[_ .])*\]/i
    let match=re.exec(s)
    let istr = s
    let b = []

    function getTr(tid) {
        let lang5 = nort.language.substring(0,5)
        let lang2 = lang5.substring(0,2)
        let key = tid.substring(1,tid.length-1)
        let kp = key.split(".")

        let item 
        let area
        if (kp.length == 2) { 
            area= kp[0] 
            item = kp[1]
        } else {
            area = 'general'
            item = key
        }

        if (nort && nort.translations ) {
            if (nort.translations[lang5] && nort.translations[lang5][area] && nort.translations[lang5][area][item]) return nort.translations[lang5][area][item]
            else if (nort.translations[lang2] && nort.translations[lang2][area] && nort.translations[lang2][area][item]) return nort.translations[lang2][area][item]
            else if (nort.translations.default && nort.translations.default[area] && nort.translations.default[area][item]) return nort.translations.default[area][item]
        }

        return pc(key)
    }

    function pc(tid) {
        return tid.substr(0,1).toUpperCase() + tid.substr(1).toLowerCase().replace(/[_]/g," ")
    }
    let depth=0
    while (re.test(istr) && depth < 5 ) {
        b=[]
        while (match = re.exec(istr) ) {
            let prefix = istr.substring(0,match.index)
            let tid = match[0].toLowerCase()
            b.push(prefix)
            b.push(getTr(tid))
            istr = istr.substring(match.index+tid.length)
        }
        b.push(istr)
        istr = b.join("")
        depth++
    }
    return istr
}

nort.translateX = function(key) {
    if (key.startsWith("[") && key.endsWith("]")) {
        key = key.substring(1,key.length-1).toLowerCase()
        let kp = key.split(".")
        let item
        let area
        if (kp.length == 2) { 
            area= kp[0] 
            item = kp[1]
        } else {
            area = 'general'
            item = key
        }

        let lang5 = nort.language.substring(0,5)
        let lang2 = lang5[0,2]

        if (nort.translations[lang5] && nort.translations[lang5][area] && nort.translations[lang5][area][item]) return nort.translations[lang5][area][item]
        else if (nort.translations[lang2] && nort.translations[lang2][area] && nort.translations[lang2][area][item]) return nort.translations[lang2][area][item]
        else if (nort.translations.default && nort.translations.default[area] && nort.translations.default[area][item]) return nort.translations.default[area][item]

        let out = []
        let ucase = true
        for (let i=0; i< item.length; i++ ) {
            let c = item.substring(i,i+1)
            if ( c=='_') {
                out.push(' ')
                ucase = true
            } else {
                if (ucase) out.push(c.toUpperCase())
                else out.push(c)
                ucase = false
            }
        }
        return out.join('')
    } else {
        return key
    }
}

nort.language = nort.getBrowserLanguage()
