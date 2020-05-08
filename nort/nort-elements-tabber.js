/*!
 * NORT web UI component library
 * Copyright(c) 2019-2020 Stephane Potelle 
 * MIT Licensed
*/

nort.elements.tabber = function (attributes, tabPages) { 
    let tabs = []
    let hb, th, tp, pp, np
    let currentPage = -1
    let hscroll = 0;

    let tabberElement = (
        $div(attributes,
            hb = $div({}, 
                th = $div({}, [] ),
                pp = $div({}, "\u25c2"),
                np = $div({}, "\u25b8"), 
                ),
            tp = $div({}, [] )
        ).addClass("tabber") 
    )

    tabberElement.addPage = function addPage(tab) {    
        let delButton

        let removable =  tab.removable || false
        let he = $div({},nort.translate(tab.label), 
            ! removable ? undefined: delButton= $button({type: "button"},"x"))
        let pe
        let i = tabs.length

        he.tabberPageNo = i
        he.on("click", function() { tabberElement.setPage(this.tabberPageNo) })        
        if (delButton)  delButton.on("click", function(){tabberElement.delPage(this.parentElement.tabberPageNo)})

        if (tab.page.tagName == "DIV") pe = tab.page
        else pe = $div({},tab.page)
        tabs.push({heading: he, delButton: delButton, page: pe, removable: removable})

        th.appendChild(he)
        tp.appendChild(pe)
        pe.addClass("content-pane")
        tabberElement.setPage(tabs.length-1)
    }

    tabberElement.delPage = function(n) {
        if (tabs.length >0 ) {
            th.removeChild(tabs[n].heading)
            tp.removeChild(tabs[n].page)
            tabs.splice(n,1)
            for (let i = 0 ; i< tabs.length; i++) {
                tabs[i].heading.removeClass("tabber-active")
                tabs[i].page.removeClass("tabber-active")
                tabs[i].heading.tabberPageNo = i
            }

            tabberElement.setPage(n) 
        }
    }

    tabberElement.setAttribute("nort-element","tabber")



    tabberElement.setPage = function(n){
        //console.log ("SetPage:" + n)
        if (tabs.length >0 ) {
            if ( n >= tabs.length ) n = tabs.length-1
            if ( n <0 ) n=0
            if (currentPage >= 0 && tabs[currentPage]) { 
                tabs[currentPage].heading.removeClass("tabber-active")
                tabs[currentPage].page.removeClass("tabber-active")
            }
            currentPage = n
            tabs[currentPage].heading.addClass("tabber-active")
            tabs[currentPage].page.addClass("tabber-active")
            
            let ct 

            ct = tabs[currentPage].heading         

            if (ct.offsetLeft - hscroll < 0  ) 
                hscroll = ct.offsetLeft
                
            if (ct.offsetLeft + ct.offsetWidth > ct.parentElement.offsetWidth ) 
                hscroll = ct.offsetLeft + ct.offsetWidth -ct.parentElement.offsetWidth

            if (hscroll < 0 ) hscroll = 0 
            ct.parentElement.style.left = -hscroll + "px"
        }
    }        

    tabberElement.nextPage = function(){
        tabberElement.setPage(currentPage+1)
    }

    tabberElement.prevPage = function(){
        tabberElement.setPage(currentPage-1)
    }    

    for (let i = 0; i< tabPages.length; i++ ){
        tabberElement.addPage(tabPages[i])
    }

    np.on("click",tabberElement.nextPage)
    pp.on("click",tabberElement.prevPage)

   tabberElement.setPage(0)

   return tabberElement
}


nort.elements.scrollPane = function() {
        return nort.createElement("div", { class: "scroll-pane", "nort-element":"scrollPane"}, arguments )
}