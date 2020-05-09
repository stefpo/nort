/*!
 * NORT web UI component library
 * Copyright(c) 2019-2020 Stephane Potelle 
 * MIT Licensed
*/

console.log("Loaded grid")

nort.components.Grid =  class extends nort.Component{
    constructor(properties) {
        super(properties)
        this.rowLimit = 1000
        this.clear()
    }

    clear() {
        this.filters = []
        this.groupValues = []
        this.rowVisible = []
        this.transformFuncs = []
        this.data = new  nort.data.DataTable()
        this.initialWidthSaved = false
    }

    setData(o, transforms) {
        this.clear()
        if (Array.isArray(o)) {
            for (let i in o) {
                let r = o[i]
                for (let c in r) {
                    if (this.data.addColumn(c)) {
                        this.groupValues.push([""])
                        this.transformFuncs.push(  function( s ) { return s } )
                    }
                }
                let nr = this.data.newRow() 
                for (let c in r) {
                    let cix=this.data.getColumnIndex(c)
                    let v = r[c]
                    if (v == null || v == undefined) v ="" 
                    else v = v.toString()

                    if ( this.groupValues[cix].length<20 && ! this.groupValues[cix].includes(v)) this.groupValues[cix].push(v)
                    nr[cix] = v
                }
                this.data.addRow(nr)
                this.rowVisible.push(true)
            }
        } else if( o && Array.isArray(o.columns) && Array.isArray(o.rows) ) {
            this.data = o
        }

        if ( typeof(transforms) == "object") {
            for (let k in transforms) {
                if (typeof(transforms[k] == "function"))  this.setColumnTransform(k, transforms[k])
            }
        }        
        this.refresh()
    }

    setColumnTransform(col, transformFunc) {
        let ci = this.data.getColumnIndex(col)
        this.transformFuncs[ci] = transformFunc
    }

    saveInitialColumnWidth() {
        let theadr = this.table.childNodes[0].childNodes[0]

        if ( ! this.initialWidthSaved) {
            this.table.style.width = this.table.offsetWidth + "px"
            
            for (let c=0; c < theadr.childNodes.length; c++ ){
                theadr.childNodes[c].style.width = theadr.childNodes[c].offsetWidth + "px"
                theadr.childNodes[c].style.boxSizing = "border-box"
            }
            this.table.style.tableLayout = "fixed"
            this.initialWidthSaved = true
        }
    }

    applyFiltersGood(me) {
        me.saveInitialColumnWidth()

        for( let r=0; r < me.data.rows.length; r++) {
            this.rowVisible[r] = true
            //console.log(`filter row ${r}`)
            for( let c in me.data.columns) {
                let fltr = me.filters[c]
                let fv = fltr.getValue()
                if (fv !="") {
                    if (fltr.tagName=="SELECT") {
                        if (fv != me.data.rows[r][c]) {
                            this.rowVisible[r] = false
                        } 
                    } else {
                        if (! (""+me.data.rows[r][c]).toUpperCase().includes(fv.toUpperCase())) {
                            this.rowVisible[r] = false
                        } 
                    }
                }
            }
        }
        let newBody = this.renderBody()
        this.table.replaceChild(newBody, this.tbody )
        this.tbody = newBody        
    }    

    applyFilters(me) {
        me.saveInitialColumnWidth()

        for( let r=0; r < me.data.rows.length; r++) {
            this.rowVisible[r] = true
        }            
            //console.log(`filter row ${r}`)
        for( let c in me.data.columns) {
            let fltr = me.filters[c]
            let fv = fltr.getValue()
            if (fv !="") {
                if (fltr.tagName=="SELECT") {
                    for( let r=0; r < me.data.rows.length; r++) { 
                        if (fv != me.data.rows[r][c]) {
                            this.rowVisible[r] = false
                        } 
                    }
                } else {
                    for( let r=0; r < me.data.rows.length; r++) { 
                            if (! (""+me.data.rows[r][c]).toUpperCase().includes(fv.toUpperCase())) {
                            this.rowVisible[r] = false
                        } 
                    }
                }
            }
        }
        let newBody = this.renderBody()
        this.table.replaceChild(newBody, this.tbody )
        this.tbody = newBody        
    }       

    onClickCell(r, c) {
        nort.alert(`Clicked row ${r}, column ${c}`)
    }

    renderBody() {
        let rows = []   
        let displayedRows = 0
        let me = this 
        for (let r=0; r< this.data.rows.length && displayedRows< this.rowLimit; r++) {
            let row=[]
            if ( this.rowVisible[r]) {
                for (let c in this.data.columns ) {
                    let v = this.data.rows[r][c]
                    let newTableRow = $td({}, this.transformFuncs[c](v))
                    newTableRow.onclick = function() { me.onClickCell(r, c) }
                    row.push(newTableRow)
                }
                displayedRows++
                rows.push($tr({},row))
            }
        }     
        return $tbody({}, rows)     
    }

    getFilterOptions(values, transformFunc) {
        let options = {}
        for (let i=0; i<values.length; i++) {
            options[values[i]] = transformFunc(values[i], true)
        }
        return options
    }

    render() {
        document.body.style.cursor = "progress"
        let row=[]
        let rows = []
        let me = this
        let css = (" " + this.properties.class ) || ""
        for (let c in this.data.columns ) {
            let f
            if (this.groupValues[c].length<20) {
                f = nort.elements.select({style:"width: 100%"},this.getFilterOptions(this.groupValues[c], this.transformFuncs[c]))
                f.onchange = function() { me.applyFilters(me) }
                f.setValue("")
            } else {
                f = nort.elements.textbox({style:"width: 100%"} )
                f.onchange = function() { me.applyFilters(me) }
            }
            this.filters.push(f)            
            row.push($th({}, nort.translate(this.data.columns[c]), f))
        }
        let thead = $thead({}, $tr({},row))

        this.tbody = this.renderBody()
        this.table = $table({}, thead, this.tbody )

        document.body.style.cursor = "default"

        return $div({ class: "nort-grid" + css},this.table)
    }
}