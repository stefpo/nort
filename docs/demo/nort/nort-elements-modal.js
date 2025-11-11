/*!
 * NORT web UI component library
 * Copyright(c) 2019-2020 Stephane Potelle 
 * MIT Licensed
*/

import * as elements from "./nort-elements.js"
//import { WM } from "./nort-elements-windows.js"

export function alert(s, timeout) {
    choiceBox("", s, [ {text: "OK"}], timeout)
}

export function choiceBox(title, msg, buttons, timeout) {
    let btns = []
    let w
    let firstBtn = null
    for (let i in buttons) {
        let b = elements.button({},buttons[i].text)
        if ( ! firstBtn ) firstBtn = b 
        b.on("click", function () {
            w.close()
            if (buttons[i].callback) setTimeout(buttons[i].callback, 100)
        })
        btns.push (b)
        btns.push(" ")
    }

    if (timeout) {
        setTimeout(function() {
            w.close()      
        }, timeout*1000)
    }

    w = WM.createWindow( { title: title , resizable: false, maximizable: false, modal: true } )
    w.setInnerContent (
            $div({class: "inform"},
            $div({}, $div({},msg)),
            $div({}, btns))
            )   
    w.pack()
    w.center()
    w.focus()
    if (firstBtn) firstBtn.focus()
}




