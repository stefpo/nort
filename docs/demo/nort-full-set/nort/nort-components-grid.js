/*!
 * NORT web UI component library_defaultEnableDropdown
 * Copyright(c) 2019-2020 Stephane Potelle 
 * MIT Licensed
*/

import { Component } from './nort-components.js'
import * as object from './nort-object.js'
import * as i18n from "./nort-i18n.js"
import * as elements from "./nort-elements.js"
import * as modal from "./nort-elements-modal.js"


export class Grid extends Component{
    constructor(properties, tabledef) {
        super(properties)
        this.clear()
        this.setTabledef(tabledef) 
    }

    clear() {
        this.data = []
        this.columns={}
        this.fullTextSearch = ""
        this.sortColumn = undefined
        this.sortDescending = false
        this.columnWidths = undefined
        this.dataCellDivs=[]
        this.headerCellDivs=[]
    }

    setTabledef(tabledef) {
        function identity(s) {return s}

        this.conf = {
            columns : {},
            options : {
                defaultTransform : identity,
                defaultHeaderTransform : identity,
                defaultEnableDropdown : false,
                showFilters: true,
                rowLimit : 1000,
                addSelectBox : false
            }
        }

        if (tabledef) {
            object.merge(this.conf.columns, tabledef.columns, true )
            object.merge(this.conf.options, tabledef.options, false )        
        }
    }

    loadGroupValues() {
        for ( let c in this.columns ) {
            let col = this.columns[c]
            col.groupValues=[]
            //if (col.enableDropdown)  {
                col.groupValues.push("")
                col.maxColTextLength = 4
                for (let r of this.data) {
                    let v = r[c] != null ? r[c] : ""
                    if ( col.enableDropdown && ! col.groupValues.includes(v)) col.groupValues.push(v)
                    if ( v.length > col.maxColTextLength ) col.maxColTextLength = v.length
                }
            //}
        }
    }

    setData(o, tabledef) {
        this.clear()
        if (o && o.length > 0 ) {
            this.columnWidths = undefined
            if (tabledef) this.setTabledef(tabledef)
            // Create columns
            if (Array.isArray(o) && o.length>0) {
                this.data = o
                this.dataLoadedOnce = true

                for (let k in o[0]) {
                    
                    let col = {
                        name: k,
                        visible: true,
                        groupValues: [],
                        visible: true,
                        transformFunc: this.conf.options.defaultTransform,
                        headerTransformFunc: this.conf.options.defaultHeaderTransform
                    }
                    
                    object.merge(col, this.conf.columns[k] || {}, true)
                    if ( ! this.sortColumn && col.visible )  this.sortColumn = col
                    this.columns[k] = col
                }
            }


            /* Collect group values */
            this.loadGroupValues()

            for (let r of this.data) {
                r._visible = true
                r._checked = false
            }
            
            this.sortData()   
        }     
        this.refresh()
    }

    clearFilters() {
        this.fullTextSearch = ""
        for (let c in this.columns ) {
            if (this.columns[c].filter) this.columns[c].filter.setValue("")
        }
        this.applyFilters()
    }

    setFullTextSearch(v) {
        this.fullTextSearch = v
        this.applyFilters() 
    }

    applyFilters() {
        let me = this
        document.body.style.cursor = "progress"
        setTimeout( function() {me.applyFiltersReal()},50 )
    }

    applyFiltersReal() {
        let me = this
        let filters = {}

        for( let c in me.columns) {
            if (this.columns[c].visible) {
                let v = String(this.columns[c].filter.getValue() || "").toUpperCase() 
                if (v != "" ) {
                    filters[c] = {
                        tagName: this.columns[c].filter.tagName,
                        value: v
                    }
                }
            } 
        }

        this.fullTextSearch = this.fullTextSearch.toUpperCase()

        for( let r of me.data) {
            r._visible = true
            r._checked = false
            if ( this.fullTextSearch != "") {
                r._visible = false
                for( let c in me.columns) {
                    if ( String(r[c]).toUpperCase().includes(this.fullTextSearch)) {
                        r._visible = true
                        break
                    }
                }
            } 

            for( let c in filters) {
                if (this.columns[c].visible && filters[c].value!= ""){
                    if (filters[c]=="SELECT") {
                        if ( (String(r[c])).toUpperCase() != filters[c].value) {
                            r._visible = false      
                            break              
                        }
                    } else {
                        if (! (String(r[c])).toUpperCase().includes(filters[c].value)) {
                            r._visible = false      
                            break              
                        }
                    }
                }
            }
        }            

        //this.sortData()
        
        let newBody = this.renderBody()
        this.table.replaceChild(newBody, this.tbody )
        this.setDOMColumnWidths()
        this.tbody = newBody      
        document.body.style.cursor = ""  
    }    


    sort(column) {
        let me = this
        document.body.style.cursor = "progress"
        setTimeout( function() {me.sortReal(column)},50 )
    }    

    sortReal(column) {
        try {
            let prevCol = this.sortColumn

            if ( this.sortColumn === column ) {
                this.sortDescending = ! this.sortDescending
                this.sortColumn.labelElement.innerHTML = this.getColumnHeader(this.sortColumn)
            } else {
                
                this.sortColumn = column
                this.sortDescending = false
                prevCol.labelElement.innerHTML = this.getColumnHeader(prevCol)
                this.sortColumn.labelElement.innerHTML = this.getColumnHeader(this.sortColumn)
            }
            
            this.sortData()
            
            let newBody = this.renderBody()
            this.table.replaceChild(newBody, this.tbody )
            this.tbody = newBody    
            this.setDOMColumnWidths()
            document.body.style.cursor = ""  
        } catch(e)       {
            document.body.style.cursor = ""  
            modal.alert(e.stack)
        }
    }
    
    sortData() {
        let sc = this.sortColumn.name
        if (this.sortDescending) {
            this.data = this.data.sort( function (a,b) { return a[sc] < b[sc] ? 1 : -1 })
        } else {
            this.data = this.data.sort( function (a,b) { return a[sc] > b[sc] ? 1 : -1 })
        }
    }

    onClickCell(r, c) {
        modal.alert(`Clicked row ${r}, column ${c}`)
    }

    _onclickCell(r,c) {
        if (this.columns[c].onclick) { this.columns[c].onclick(this.data[r])}
        else this.onClickCell(r, c) 
    }

    getFilterOptions(values, transformFunc) {
        let options = {}
        for (let i=0; i<values.length; i++) {
            options[values[i]] = transformFunc(values[i], true)
        }
        return options
    }

    getColumnHeader(c) {
        let postfix = ""
        if (c === this.sortColumn) postfix = this.sortDescending ? " \u25b4" : " \u25be"
        if (c.headerTransformFunc) return i18n.translate(c.headerTransformFunc(c.name)) + postfix
        else return i18n.translate( c.name )+ postfix
    }

    firecheckboxEvent() {
        let me = this
        let selRows = []
        for ( let i in me.data) {
            if ( me.data[i]._checked) selRows.push(i)
        }
        me.fireEvent('checkbox', { selection: selRows})
    }

    setDOMColumnWidths() {
        if ( this.columnWidths ) {
            for (let c in this.headerCellDivs ) {
                this.setSingleDOMColumnWidth(c, this.columnWidths[c] )
            }
        }
    }

    setSingleDOMColumnWidth(c,w) {
        let me = this
        this.columnWidths[c] = w

        // Synchronous version
        this.headerCellDivs[c].style.width = `${w}px`
        for (let r in this.dataCellDivs ) {
          this.dataCellDivs[r][c].style.width = `${w}px`
        }
        
        /*
        let r = 0
        me.headerCellDivs[c].style.width = `${w}px`
          
        function loop() {
            if (r < me.headerCellDivs.length) {
                me.dataCellDivs[r][c].style.width = `${w}px`
                r++
                setTimeout(loop,0)
            }
        }
        setTimeout(loop,0)
        */
    }    

    renderBody() {
        let rows = []   
        let displayedRows = 0
        this.dataCellDivs=[]
        let me = this 

        for (let r=0; r< this.data.length && displayedRows < this.conf.options.rowLimit; r++) {
            let row=[]
            if (this.data[r]._visible) {
                if (this.conf.options.addSelectBox ) {
                    let cb = elements.checkBox ({}).setValue(this.data[r]._checked || false)
                    cb.on("click", function(){
                        me.topcheckbox.checked = 0 
                        me.data[r]._checked = cb.getValue()
                        me.firecheckboxEvent()
                    }) 
                    cb.setChecked = function(v) {
                        cb.checked = v
                        me.data[r]._checked = v
                    }
                    this.checkboxes.push(cb)
                    row.push($td({}, cb))                    
                }
                let rowCellDivs = []
                for (let c in this.columns ) {
                    let col = this.columns[c]
                    if (col.visible) {
                        let v = this.data[r][c]
                        if ( v == null ) v=""
                        let dc
                        //let cell = $td({ class: col.css || "", style: `width: ${col.maxColTextLength*.3}em` }, col.transformFunc(v))
                        let cell = $td({ class: col.css || "" }, 
                                dc = $div({},col.transformFunc(v)))

                        cell.onclick = function() { me._onclickCell(r, c) }
                        row.push(cell)
                        rowCellDivs.push(dc)
                    }
                }
                displayedRows++
                rows.push($tr({},row))
                this.dataCellDivs.push(rowCellDivs)
            }
        }     
        return $tbody({}, rows)     
    }    

    renderHeader() {
        let row=[]
        this.headerCellDivs = []

        let me = this
        let css = (" " + this.properties.class ) || ""

        if (this.conf.options.addSelectBox ) {
            this.checkboxes = []
            let cb = elements.checkBox ({})
            this.topcheckbox = cb
            cb.on("click", function() {
                for (let rcb of me.checkboxes) {
                    rcb.setChecked(cb.checked)
                }
                me.firecheckboxEvent()
            })
            row.push($th({}, cb))                    
        }
        
        for (let c in this.columns ) {
            let f
            let col = this.columns[c]
       
            if (col.visible) {
                if (this.conf.options.showFilters) {
                    let enableDropdown = col.enableDropdown == undefined ? this.conf.options.defaultEnableDropdown : col.enableDropdown
                    if ( col.groupValues.length<20 && enableDropdown ) {
                        f = elements.select({style:`display: block; width: 100%; text-overflow: ellipsis;`},this.getFilterOptions(col.groupValues, col.transformFunc))
                        col.filterElement = f
                        f.onchange = function() { me.applyFilters() }
                        f.setValue("")
                    } else {
                        f = elements.textBox({style: `display: block; width: 100%`, autocomplete: "off" } )
                        f.on("keydown", function(event) { if (event.key === 'Enter') me.applyFilters() } )
                        f.setValue("")
                    }
                    col.filter=f
                } else {
                    col.filters = ''
                }
                let hc 
                let colsep
                col.labelElement = $label({},this.getColumnHeader(col) ).on("click", function(evt) { me.sort(col)} )
                // row.push($th({}, col.labelElement , f, $div({style: `display: block; min-width: ${col.maxColTextLength*.6}em`})))
                row.push( $th({}, $div({}, hc = $div({},col.labelElement,f), colsep=$div({class: "colsep"}))))

                let ix = this.headerCellDivs.length

                colsep.on("mousedown", function (evt) {
                    me.enterColumnWidthAdjust(evt, ix)
                })

                this.headerCellDivs.push(hc)
            } 
        }
        return  $thead({}, $tr({},row))
    }

    enterColumnWidthAdjust(evt, c) {
        let me=this

        let initialColumnWidth = this.headerCellDivs[c].offsetWidth //this.columnWidths[c]
        let initialPos=evt.clientX

        function muListener(muEvt) {
            document.removeEventListener("mouseup", muListener)
            document.removeEventListener("mousemove", mvListener)
            let newWidth = muEvt.clientX - initialPos + initialColumnWidth
            me.setSingleDOMColumnWidth(c, newWidth)            
        }

        function mvListener(mvEvt) {
            let newWidth = mvEvt.clientX - initialPos + initialColumnWidth
            me.setSingleDOMColumnWidth(c, newWidth)
        }

        document.addEventListener("mouseup", muListener)
        document.addEventListener("mousemove", mvListener)
    }




    render() {
        let css = (" " + this.properties.class ) || ""
        let me = this

        function captureInitialColumnWidths(){
            if (! me.columnWidths ) me.columnWidths = []
            for (let h in me.headerCellDivs ) {
                me.columnWidths.push(me.headerCellDivs[h].offsetWidth)
            }
        }        

        if ( this.data.length > 0 ) {
            document.body.style.cursor = "progress"

            let thead = this.renderHeader()

            this.tbody = this.renderBody()
            this.table = $table({style: "table-layout: fixed"}, thead, this.tbody )
            document.body.style.cursor = ""

            // This must be call once synchronous rendering is complete
            setTimeout( captureInitialColumnWidths , 0 ) 

            return $div({ class: "nort-grid" + css},this.table)
        } else {
            return $div({  style: "margin: 8px;" },i18n.translate('[NO_DATA]'))
        }
    }
}