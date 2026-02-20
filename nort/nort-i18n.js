/*!
 * NORT web UI component library
 * Copyright(c) 2019-2020 Stephane Potelle 
 * MIT Licensed
*/

import * as nort from "./nort.js"
import { Locale } from "./nort-i18n-dates.js"

let translations = []

export function setLocale(lang) {
    // Sets application locale (Language + country)
    currentLocale = new Locale(lang)
}

export function getBrowserLanguage () {
    // Returns the browser configured locale id. 
    let lang = window.navigator.languages ? window.navigator.languages[0] : null;
    lang = lang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
    lang = lang.substring(0,5)
    return lang
}

export function setTranslation(translationTable) {
    // Sets the translation table for use by translate()
    translations = translationTable
}

export function makeTranslatable(s) {
    return "[" + s + "]"
}

export function translate(s) {
    // Returns a translated version of s using the previously loaded translation table 
    let re = /\[((?:[a-z]|[0-9]|[_ .])*)\]/i
    let match=re.exec(s)
    let istr = s
    let b = []

    function getTr(tid) {
        let lang5 = getBrowserLanguage().substring(0,5)
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

        if (translations ) {
            if (translations[lang5] && translations[lang5][area] && translations[lang5][area][item]) return translations[lang5][area][item]
            else if (translations[lang2] && translations[lang2][area] && translations[lang2][area][item]) return translations[lang2][area][item]
            else if (translations.default && translations.default[area] && translations.default[area][item]) return translations.default[area][item]
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

export var currentLocale

export function dateToString(d) {
    // Returns a string representation of a date using current locale
    return currentLocale.dateToString(d)
}

export function stringToDate(str) {
    // Converts str to a date object using locale date format. 
   return currentLocale.stringToDate(str)
}

setLocale(getBrowserLanguage())