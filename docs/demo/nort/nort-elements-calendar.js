/*!
 * NORT web UI component library
 * Copyright(c) 2019-2020 Stephane Potelle 
 * MIT Licensed
*/

import * as dom from "./nort-dom.js"
import * as element from "./nort-elements.js"
import * as i18n from "./nort-i18n.js"


export class Calendar {
    constructor(e) {
        this.div = e
        let dt = new Date(Date.now())
        this.calYear = dt.getFullYear()
        this.calMonth = dt.getMonth()
    }

    refresh() {
        dom.setInnerContent(this.div, this.content())
    }

    addMonth(change) {
        this.calMonth = this.calMonth + change
        if (this.calMonth > 11 ) { this.calMonth = this.calMonth -12; this.calYear = this.calYear +1; }
        if (this.calMonth <0 ) { this.calMonth = this.calMonth + 12; this.calYear = this.calYear -1; }
        this.refresh()
    }    
    
    addYear(change) {
        this.calYear = this.calYear + change
        this.refresh()
    }      

    monthYearNav() {
        let me = this
        let nextMonth, prevMonth, nextYear, prevYear
        let e = $div({},
            prevMonth = $div({}, "< "),
            $div({}, i18n.currentLocale.months[this.calMonth]),
            nextMonth = $div({}, " >"),
            prevYear = $div({}, "< "),
            $div({}, this.calYear),
            nextYear = $div({}, " >"),
            )
           
        nextMonth.on("click", function() { me.addMonth(1) })
        prevMonth.on("click", function() { me.addMonth(-1) })
        nextYear.on("click", function() { me.addYear(1) })
        prevYear.on("click", function() { me.addYear(-1) })
        return e
    }
       
    content() {
        let me = this
        
        let weekday = 10;    

        let monthArr = []
        let weekArr = []

        let contents = []

        for (let i=1 ; i<=35; i++) {
            let fd = new Date(this.calYear, this.calMonth, i)
            if (fd.getDay() < weekday) {
                weekArr = new Array()
                monthArr[monthArr.length] = weekArr
            }
            weekday=fd.getDay()
            if (fd.getMonth() == this.calMonth) {
            weekArr[weekday] = i
            }
        }

        let table = $table({})
        let tr = $tr({})
        
        for ( let  wd = 0 ; wd <7; wd ++) {
            dom.addElement(tr, $th({}, i18n.currentLocale.days[wd] ))
        }
        dom.addElement(table, tr)

        for ( let w=0 ; w <monthArr.length; w++) {
            let tr = $tr({})
            for ( let wd = 0 ; wd <7; wd ++) {
                let td = $td({},"")
                let className =""
                let today = new Date(Date.now()) 
                if (this.calYear == today.getFullYear() && this.calMonth == today.getMonth() && monthArr[w][wd] == today.getDate() ){
                    className = "cal-today"
                }
                
                if (monthArr[w][wd]) {
                    td = $td({class: className}, monthArr[w][wd] )
                    td.on("click", function (){
                        me.onSelectDay(new Date(me.calYear, me.calMonth, monthArr[w][wd]))
                    })
                }

                dom.addElement(tr,td)
            }
            dom.addElement(table, tr)
        }

        contents.push(this.monthYearNav())
        contents.push(table)

        return contents
    }    

    setCalYear(y) {
        this.calYear = parseInt(y,10)
        this.refresh()
    }

    setCalMonth(m) {
        this.calMonth = parseInt(m,10)
        this.refresh()
    }    
    
    onSelectDay(d) {
        alert(d)
    }
}    

export function calendar() {
    let e = $div({class: "calendar"})
    e.nortCal = new Calendar(e) 
    e.refreshCalendar = function () {
        e.nortCal.refresh()
    }
    e.refreshCalendar()
    return e
}


export function dateBox(attributes) {
    let attClass = " " + attributes.class || ""

    let e = element.bindFieldMethods(dom.createElement("input", {class: "calendar"+ attClass, type: "text", "nort-element":"datebox", "n-type": "date", placeholder: i18n.currentLocale.datePlaceholder()}, [attributes]))
    let cal
    let hoveringPopup = false
    let justFocused = false
    let inhibitFocusEvent = false

    e.setValue = function(v) {
        try {
            let x = new Date(Date.parse(v))
            v = x
        } catch(e) {}
        if (v.getDate ) e.value = i18n.currentLocale.dateToString(v)
        else e.value = v
        e.initialValue = e.value
        return e
    }

    let dateValue

    e.isValid = function() {
        e.value = e.value.trim()
        if (e.value != "" ) {
            dateValue = i18n.currentLocale.stringToDate(e.value)
            
            if (! dateValue ) {
                e.addClass ("missing-field"); 
                e.validationErrorMsg = "INVALID_DATE"
            } else {
                e.removeClass ("missing-field")
                dateValue.setTime(dateValue.getTime() + 12*3600*1000)
                e.validationErrorMsg = ""
                return true
            }
        } else {
            if (e.isRequired()) {
                e.addClass ("missing-field"); 
                e.validationErrorMsg = "REQUIRED_VALUE"
            } else {
                dateValue = null
            }
        }       
        return false
    }        

    e.getValue = function() {
        e.isValid() 
        return dateValue
    }        
    
    function showPopup () { 
        cal = calendar()
            .on("mouseover", function() { 
                hoveringPopup = true 
                } )
            .on("mouseout", function() { 
                hoveringPopup = false 
                } )  

        hoveringPopup = false

        dom.showFieldPopup(e, cal, "ne")
        
        let d = i18n.currentLocale.stringToDate(e.value)
        if ( d ==null ) d = new Date()
		cal.nortCal.setCalYear(d.getFullYear())
        cal.nortCal.setCalMonth(d.getMonth())
        
        cal.nortCal.onSelectDay = function(d) {
            e.value = i18n.currentLocale.dateToString(d)
            e.hidePopup()
            inhibitFocusEvent = true
            e.focus()
        }

    }

    e.on("focus", function() { 
        if ( ! e.getAttribute("readonly") && ! e.getAttribute("locked")) {
            if (!inhibitFocusEvent ) { justFocused=true; showPopup() }
            inhibitFocusEvent = false
            } 
        }
    )

    e.on("blur", function() {
        if (! hoveringPopup)  e.hidePopup()
    })

    e.on("click", function() { 
        if ( ! e.getAttribute("readonly") && ! e.getAttribute("locked")) {
            if ( ! justFocused ) {
                if (e.popupAnchorDiv) { e.hidePopup() }
                else showPopup()
            }
            justFocused = false
        }
    } )

    return e
}

