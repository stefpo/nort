/*!
 * NORT web UI component library
 * Copyright(c) 2019-2020 Stephane Potelle 
 * MIT Licensed
*/

nort.components.Grid =  class extends nort.Component{
    constructor(properties) {
        super(properties)
        this.rowLimit = 1000
        this.clear()
    }

    clear() {
        function identity(s) {return s}

        this.filters = []
        this.groupValues = []
        this.rowVisible = []
        this.columnDefs = []
        this.data = new  nort.data.DataTable()
        this.initialWidthSaved = false
        this.defaultTransform = identity
        this.defaultHeaderTransform = identity
    }

    setData(o, columns) {
        this.clear()
        if (columns == undefined) columns={}
        if ( typeof(columns._defaultTransform) =="function" ) this.defaultTransform = columns._defaultTransform 
        if ( typeof(columns._defaultHeaderTransform) =="function" ) this.defaultHeaderTransform = columns._defaultHeaderTransform 
        if (Array.isArray(o)) {
            for (let i in o) {
                let r = o[i]
                for (let c in r) {
                    this.data.addColumn(c)
                }
                let nr = this.data.newRow() 
                for (let c in r) {
                    let cix=this.data.getColumnIndex(c)
                    let v = r[c]
                    if (v == null || v == undefined) v ="" 
                    else v = v.toString()
                    nr[cix] = v
                }
                this.data.addRow(nr)
                this.rowVisible.push(true)
            }
        } else if( o && Array.isArray(o.columns) && Array.isArray(o.rows) ) {
            this.data = o
        }

        /* Initialize group values and filters*/
        this.groupValues = new Array(this.data.columns.length)
        this.columnDefs = new Array(this.data.columns.length)
        this.data.ColumnTypes = new Array(this.data.columns.length)

        for (let c in this.data.columns ) {
            this.columnDefs[c]= { visible: true, 
                transformFunc: this.defaultTransform,
                headerTransformFunc: this.defaultHeaderTransform,
               }
            this.groupValues[c] = [""]
            this.data.ColumnTypes[c] = null
        } 

        for(let r in this.data.rows) {
            let row = this.data.rows[r]
            for (let c in this.data.columns ) {
                let v = row[c]
                if (v == null || v == undefined) v ="" 
                else v = v.toString()
                if ( this.groupValues[c].length<20 && ! this.groupValues[c].includes(v)) this.groupValues[c].push(v)
            }
        }

        if ( typeof(columns) == "object") {
            for (let k in columns) {
                if (typeof(columns[k] == "object"))  this.setColumnDef(k, columns[k])
            }
        }        
        this.refresh()
    }

    setColumnDef(col, columnDef) {
        let ci = this.data.getColumnIndex(col)
        if (columnDef.visible == undefined ) columnDef.visible = true
        if (columnDef.transformFunc == undefined) columnDef.transformFunc = this.defaultTransform
        if (columnDef.headerTransformFunc == undefined) columnDef.headerTransformFunc = this.defaultHeaderTransform
        this.columnDefs[ci] = columnDef
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

    applyFilters(me) {
        me.saveInitialColumnWidth()

        for( let r=0; r < me.data.rows.length; r++) {
            this.rowVisible[r] = true
        }            
        for( let c in me.data.columns) {
            if (this.columnDefs[c].visible) {
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
                    if (this.columnDefs[c].visible) {
                        let v = this.data.rows[r][c]
                        let newTableRow = $td({}, this.columnDefs[c].transformFunc(v))
                        newTableRow.onclick = function() { me.onClickCell(r, c) }
                        row.push(newTableRow)
                    }
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

    getColumnHeader(c) {
        return nort.translate(this.columnDefs[c].headerTransformFunc(this.data.columns[c]))
    }

    render() {
        document.body.style.cursor = "progress"
        let row=[]
        let rows = []
        let me = this
        let css = (" " + this.properties.class ) || ""
        for (let c in this.data.columns ) {
            let f
            if (this.columnDefs[c].visible) {
                if (this.groupValues[c].length<20) {
                    f = nort.elements.select({style:"width: 100%"},this.getFilterOptions(this.groupValues[c], this.columnDefs[c].transformFunc))
                    f.onchange = function() { me.applyFilters(me) }
                    f.setValue("")
                } else {
                    f = nort.elements.textbox({style:"width: 100%"} )
                    f.onchange = function() { me.applyFilters(me) }
                }
                this.filters.push(f)            
                row.push($th({}, this.getColumnHeader(c), f))
            } else {
                this.filters.push(null) 
            }
        }
        let thead = $thead({}, $tr({},row))

        this.tbody = this.renderBody()
        this.table = $table({}, thead, this.tbody )

        document.body.style.cursor = "default"

        return $div({ class: "nort-grid" + css},this.table)
    }
}