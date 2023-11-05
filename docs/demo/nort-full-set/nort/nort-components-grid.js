/*!
 * NORT web UI component library_defaultEnableDropdown
 * Copyright(c) 2019-2020 Stephane Potelle 
 * MIT Licensed
*/

nort.components.Grid =  class extends nort.Component{
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
        this.initialWidthSaved = false
    }

    setTabledef(tabledef) {
        function identity(s) {return s}

        this.conf = {
            columns : {},
            options : {
                defaultTransform : identity,
                defaultHeaderTransform : identity,
                defaultEnableDropdown : false,
                rowLimit : 1000,
                addSelectBox : false
            }
        }

        if (tabledef) {
            nort.object.merge(this.conf.columns, tabledef.columns, true )
            nort.object.merge(this.conf.options, tabledef.options, false )        
        }
    }

    refreshData(o, tabledef) {
        if (this.dataLoadedOnce ) {
            this.data = o

            this.loadGroupValues() 
            for ( let c in this.columns ) {
                let e
                let col = this.columns[c]
                if ( e = col.filterElement) {
                    e.setOptions(this.getFilterOptions(col.groupValues, col.transformFunc))
                } 
            }

            this.applyFilters()
        } else {
            this.setData(o, tabledef)
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
                    
                    nort.object.merge(col, this.conf.columns[k] || {}, true)
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
        document.body.style.cursor = "hourglass"
        setTimeout( function() {me.applyFiltersReal()},50 )
    }

    applyFiltersReal() {
        let me = this
        

        for( let r of me.data) {
            r._visible = true
            r._checked = false
            if ( this.fullTextSearch != "") {
                r._visible  = false
                for( let c in me.columns) {
                    if ( !r._visible && (""+r[c]).toUpperCase().includes(this.fullTextSearch.toUpperCase() )) {
                        r._visible = true
                    }
                }
            }
        }            
        for( let c in me.columns) {
            if (this.columns[c].visible) {
                let fltr = this.columns[c].filter
                let fv = fltr.getValue()

                let selected = false
                if (fv !="" ) {
                    if (fltr.tagName=="SELECT") {
                        for( let r=0; r < me.data.length; r++) { 
                            if (fv != me.data[r][c]) {
                                this.data[r]._visible = false
                            } 
                        }
                    } else {
                        for( let r=0; r < me.data.length; r++) { 
                                if (! (""+me.data[r][c]).toUpperCase().includes(fv.toUpperCase())) {
                                this.data[r]._visible = false
                            } 
                        }
                    }
                }
            }
        }
        this.sortData()
        
        let newBody = this.renderBody()
        this.table.replaceChild(newBody, this.tbody )
        this.tbody = newBody      
        document.body.style.cursor = ""  
    }    


    sort(column) {
        let me = this
        document.body.style.cursor = "hourglass"
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
            document.body.style.cursor = ""  
        } catch(e)       {
            document.body.style.cursor = ""  
            nort.alert(e.stack)
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
        nort.alert(`Clicked row ${r}, column ${c}`)
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
        //console.log(JSON.stringify(options))
        return options
    }

    getColumnHeader(c) {
        let postfix = ""
        if (c === this.sortColumn) postfix = this.sortDescending ? " \u25b4" : " \u25be"
        if (c.headerTransformFunc) return nort.translate(c.headerTransformFunc(c.name)) + postfix
        else return nort.translate( c.name )+ postfix
    }

    firecheckBoxEvent() {
        let me = this
        let selRows = []
        for ( let i in me.data) {
            if ( me.data[i]._checked) selRows.push(i)
        }
        me.fireEvent('checkBox', { selection: selRows})
    }

    renderBody() {
        let rows = []   
        let displayedRows = 0
        let me = this 
        for (let r=0; r< this.data.length && displayedRows < this.conf.options.rowLimit; r++) {
            let row=[]
            if (this.data[r]._visible) {
                if (this.conf.options.addSelectBox ) {
                    let cb = nort.elements.checkBox ({}).setValue(this.data[r]._checked || false)
                    cb.on("click", function(){
                        me.topcheckBox.checked = 0 
                        me.data[r]._checked = cb.getValue()
                        me.firecheckBoxEvent()
                    }) 
                    cb.setChecked = function(v) {
                        cb.checked = v
                        me.data[r]._checked = v
                    }
                    this.checkBoxes.push(cb)
                    row.push($td({}, cb))                    
                }
                for (let c in this.columns ) {
                    let col = this.columns[c]
                    if (col.visible) {
                        let v = this.data[r][c]
                        if ( v == null ) v=""
                        //let cell = $td({ class: col.css || "", style: `width: ${col.maxColTextLength*.3}em` }, col.transformFunc(v))
                        let cell = $td({ class: col.css || "" }, col.transformFunc(v))

                        cell.onclick = function() { me._onclickCell(r, c) }
                        row.push(cell)
                    }
                }
                displayedRows++
                rows.push($tr({},row))

            }
        }     
        return $tbody({}, rows)     
    }    

    renderHeader() {
        let row=[]

        let me = this
        let css = (" " + this.properties.class ) || ""

        if (this.conf.options.addSelectBox ) {
            this.checkBoxes = []
            let cb = nort.elements.checkBox ({})
            this.topcheckBox = cb
            cb.on("click", function() {
                for (let rcb of me.checkBoxes) {
                    rcb.setChecked(cb.checked)
                }
                me.firecheckBoxEvent()
            })
            row.push($th({}, cb))                    
        }             
        for (let c in this.columns ) {
            let f
            let col = this.columns[c]
       
            if (col.visible) {
                let enableDropdown = col.enableDropdown == undefined ? this.conf.options.defaultEnableDropdown : col.enableDropdown
                if ( col.groupValues.length<20 && enableDropdown ) {
                    f = nort.elements.select({style:`display: block; width: 100%`},this.getFilterOptions(col.groupValues, col.transformFunc))
                    col.filterElement = f
                    f.onchange = function() { me.applyFilters() }
                    f.setValue("")
                } else {
                    f = nort.elements.textBox({style: `display: block; width: 100%`, autocomplete: "off" } )
                    f.onchange = function() { me.applyFilters() }
                    f.setValue("")
                }
                col.filter=f
                col.labelElement = $label({},this.getColumnHeader(col) ).on("click", function(evt) { me.sort(col)} )
                row.push($th({}, col.labelElement , f, $div({style: `display: block; min-width: ${col.maxColTextLength*.6}em`})))
            } 
        }
        return $thead({}, $tr({},row))
    }

    render() {
        

        let css = (" " + this.properties.class ) || ""

        if ( this.data.length > 0 ) {
            document.body.style.cursor = "progress"

            let thead = this.renderHeader()

            this.tbody = this.renderBody()
            this.table = $table({}, thead, this.tbody )
            document.body.style.cursor = "default"

            return $div({ class: "nort-grid" + css},this.table)
        } else {
            return $div({  style: "margin: 8px;" },nort.translate('[NO_DATA]'))
        }
    }
}