/*!
 * NORT 
 * Copyright(c) 2019 Stephane Potelle 
 * MIT Licensed
*/

import * as dom from "./nort-dom.js"

window.WM = {
    mouseX : 0,
    mouseY : 0,
    currentWindow :  null,
    zIndex : 100,
    veilDiv: null,
    positionCounter: 0,
    button: '',
    minTop:0,
    minLeft:0,
    windowId: 1000,
    started: false
}

WM.getWindowElement = function(elt) {
    if ( dom.getClasses(elt).includes('wm-window') ) return elt
    else if ( elt===document.body) return null
    else return WM.getWindowElement (elt.parentElement)
}

WM.getTabberElement = function(elt) {
    if ( dom.getClasses(elt).includes('tabber') ) return elt
    else if ( elt===document.body) return null
    else return WM.getTabberElement (elt.parentElement)
}

WM.reduceZindex = function() {
    var wl=document.getElementsByClassName("wm-window")
    var minZindex=9999
    var reduceBy=0
    for (var i=0; i<wl.length; i++) {
        if (wl[i].style.zIndex < minZindex) minZindex=wl[i].style.zIndex 
    }

    if ( minZindex > 100 && minZindex != 9999 ) {
        reduceBy = minZindex-100
        for (var i=0; i<wl.length; i++) {
            wl[i].style.zIndex = wl[i].style.zIndex - reduceBy
        }        
        WM.zIndex = WM.zIndex - reduceBy
    }
}

WM.setFocusTo = function (elt) {
    let w = WM.getWindowElement(elt)
    
    if (w != WM.activeWindow && WM.activeWindow )  { 
        WM.activeWindow.removeClass('wm-focus')
    } 

    if (w != WM.activeWindow) {
        w.addClass('wm-focus')

        if (! w.modal)  WM.reduceZindex(); // Do not let zIndex increase indefinitely
        
        w.style.zIndex = ++WM.zIndex
        WM.activeWindow = w
    }    
    w.setTitle(w.windowTitle )
}

WM.delayedSetFocusTo = function (elt) {
    let x = elt
    let t = window.setTimeout( function() {WM.setFocusTo(x)}, 1000)
    return t
}

WM.stopContextMenu = function(event) {
    event = event || window.event

    if (event.stopPropagation) event.stopPropagation()

    event.cancelBubble = true
    return false;        
}

WM.onWindowButton = function (elt,cmd) {
    WM.button = cmd
    WM.currentWindow = WM.getWindowElement(elt)
    WM.currentWindow.mode=''
}

WM.OnMouseDown = function(elt, evt, mt) {
    if (evt.buttons==1) {
        WM.currentWindow = WM.getWindowElement(elt)
        if ( WM.currentWindow != null &&  WM.currentWindow !== undefined  ) {
            WM.currentWindow.Y = WM.currentWindow.offsetTop
            WM.currentWindow.X = WM.currentWindow.offsetLeft
            WM.currentWindow.W = WM.currentWindow.offsetWidth
            WM.currentWindow.H = WM.currentWindow.offsetHeight
            
            WM.currentWindow.mouseX = WM.mouseX
            WM.currentWindow.mouseY = WM.mouseY
            WM.currentWindow.mode=mt

            if (! WM.veilDiv) {
                WM.veilDiv = $div()
                dom.addCssClass(document.body,'wm-'+WM.currentWindow.mode)
                WM.veilDiv.id = 'wm-veil'
                WM.veilDiv.style.zIndex = '9999'
                document.body.appendChild(WM.veilDiv)
            }

            if (WM.currentWindow.clicked && WM.currentWindow.resizable) { WM.currentWindow.setMaximized(! WM.currentWindow.maximized );}
            else {
                WM.currentWindow.clicked = true
                var xw = WM.currentWindow
                setTimeout(function() { xw.clicked = false }, 300 )
            }

            if ( WM.activeWindow !== WM.currentWindow ) { 
                WM.setFocusTo(WM.currentWindow)
            }

        }
    }
}

WM.onMouseUp = function(event) { 
    //console.log("mouse up")
    if (document.body && WM.currentWindow) {
        //console.log("Got current window")
        dom.removeCssClass(document.body,'wm-'+WM.currentWindow.mode)
        dom.removeCssClass(WM.currentWindow,'wm-moving')
        if (WM.veilDiv ) { //&& WM.veilDiv.isConnected) { 
            //console.log("remove veil")
                dom.destroyElement(WM.veilDiv) 
        } //document.body.removeChild(WM.veilDiv)
        if (WM.button =='close') WM.currentWindow.close()
        if (WM.button =='max' ) WM.currentWindow.setMaximized( ! WM.currentWindow.maximized)
        WM.button=''
        WM.currentWindow = null; 
    }
}

WM.start = function() {
    if (! WM.started) {
        document.addEventListener("mousemove",function(event) {
            var evt = event || window.event
            var cw
            WM.mouseX = evt.clientX
            WM.mouseY = evt.clientY

            if ( (cw=WM.currentWindow) !=null ) {

                if (cw.mode == 'mv' && cw.moveable) {
                    cw.place(cw.X + WM.mouseX- cw.mouseX,cw.Y + WM.mouseY - cw.mouseY)
                    dom.addCssClass( WM.currentWindow,'wm-moving')
                }	
                else if (cw.mode == 'rn' && cw.resizable  && cw.moveable) {
                    cw.place(undefined,cw.Y + WM.mouseY - cw.mouseY,undefined,cw.H - WM.mouseY + cw.mouseY)
                }	
                else if (cw.mode == 'rs' && cw.resizable) {
                    cw.place(undefined,undefined,undefined, cw.H + WM.mouseY - cw.mouseY)
                }	
                else if (cw.mode == 'rw' && cw.resizable && cw.moveable) {
                    cw.place(cw.X + WM.mouseX- cw.mouseX,undefined, cw.W - WM.mouseX + cw.mouseX,undefined)
                }	
                else if (cw.mode == 're' && cw.resizable) {
                    cw.place(undefined,undefined,cw.W + WM.mouseX- cw.mouseX,undefined)
                }	
                else if (cw.mode == 'rnw' && cw.resizable && cw.moveable) {
                    cw.place(cw.X + WM.mouseX- cw.mouseX,cw.Y + WM.mouseY - cw.mouseY,cw.W - WM.mouseX + cw.mouseX,cw.H - WM.mouseY + cw.mouseY)
                }	
                else if (cw.mode == 'rne' && cw.resizable && cw.moveable) {
                    cw.place(undefined,cw.Y + WM.mouseY - cw.mouseY,cw.W + WM.mouseX- cw.mouseX,cw.H - WM.mouseY + cw.mouseY)
                }	
                else if (cw.mode == 'rsw' && cw.resizable  && cw.moveable) {
                    cw.place(cw.X + WM.mouseX- cw.mouseX,undefined,cw.W - WM.mouseX + cw.mouseX,cw.H + WM.mouseY - cw.mouseY)
                }	
                else if (cw.mode == 'rse' && cw.resizable) {
                    cw.place(undefined,undefined,cw.W + WM.mouseX- cw.mouseX,cw.H + WM.mouseY - cw.mouseY)
                }
           
            }
        } )

        document.addEventListener("mouseup", WM.onMouseUp)
        
        top.addEventListener("resize", function(event) {
            var cw
            var wl=document.getElementsByClassName("wm-window")
            for (var i=0; i<wl.length; i++) {
                if (wl[i].maximized) wl[i].setMaximized(true)
            }

        })
        WM.started = true
    }

    return(this)
}

WM.onWindowClose = function(elt) {
    var w = WM.getWindowElement(elt)
    if (w !=null)  w.close()
}

WM.createWindow = function(options) {
    var w=$div()
    WM.start()

    //if (id=='') id = 'wm-window' + WM.windowId++
    w.mode=''
    w.maximized=false
    w.clicked=false

    w.setTitle=function(title) { this.getElementsByClassName("wm-title")[0].innerHTML=title; }

    w.setInnerContent = function(content) { dom.setInnerContent(w.contentPane, content) }
    w.setContent = w.setInnerContent
    

    w.addClass=function(className) { dom.addCssClass(this, className); }
    w.removeClass=function(className) { dom.removeCssClass(this, className); }

    w.checkMinSize = function(){
        if (this.offsetWidth < this.minWidth ) this.style.width = this.minWidth + "px"
        if (this.offsetHeight < this.minHeight ) this.style.height = this.minHeight + "px"
        if (this.offsetTop < WM.minTop ) this.style.top = WM.minTop + "px"
    }

    w.resizeTo=function (width, height) {
        if (w.resizable) w.place(undefined,undefined,width,height)
    }     

    w.moveTo=function (left,top) {
        if (w.moveable) w.place(left,top,undefined,undefined)
    }  

    w.focus=function() {
        WM.setFocusTo(this)
    }

    w.place=function(left, top, width, height) {
        // No dragging outside of boundaries
        if ( ! this.maximized ) {
            if (this.mode.substring(0,1)=='r' && ( left<WM.minLeft || top < WM.minTop || width < this.minWidth || height < this.minHeight ) ) return

            if (left !== undefined) this.left=left
            if (top !== undefined) this.top=top
            if (width !== undefined) this.width=width
            if (height !== undefined) this.height=height

            // Check position and size
            if (this.left<WM.minLeft) this.left=WM.minLeft
            if (this.top<WM.minTop) this.top=WM.minTop
            if (this.width<w.minWidth) this.width=w.minWidth
            if (this.height<w.minHeight) this.height=w.minHeight

            // place
            var ifr=document.getElementsByTagName("iframe")
            
            w.setFrameSize(false)
            this.style.top = this.top + "px"
            this.style.left = this.left + "px";   
            this.style.width = this.width + "px"
            this.style.height = this.height + "px";   
            w.setFrameSize(true)
        } 
        return w
    }

    w.pack = function() {
        let ct
        if ( this.contentPane.childNodes.length > 0  ) {
            ct = this.contentPane.childNodes[0]
            this.style.width = ""
            this.style.height = ""
            this.width = this.offsetWidth
            this.height = this.offsetHeight
            this.minWidth = this.width
            this.minHeight = this.height
        }
        if ( this.width  > window.innerWidth || this.height > window.innerHeight ) this.setMaximized(true)
        return w
    }

    w.center = function() {
        if (! this.maximized) {
            this.top = (this.parentNode.offsetHeight-WM.minTop) /2 - this.height/2
            this.left = (this.parentNode.offsetWidth-WM.minLeft) /2 - this.width/2
            if ( this.top < 0 ) this.top = 0
            if ( this.left < 0 ) this.left = 0
            this.style.top = this.top + "px"
            this.style.left = this.left + "px"
        }
        return w
    }

    w.onClose = function( handler ) {
        w.onCloseHandler = handler
        return w
    }

    w.setMaximized = function(state) {
        w.maximized = state
        if (state) {
            w.setFrameSize(false)
            this.style.top = WM.minTop + "px"
            this.style.left = WM.minLeft + "px";   
            //this.style.width = (top.innerWidth-WM.minLeft) +"px"
            this.style.width = (this.parentNode.offsetWidth-WM.minLeft) +"px"
            this.style.height = (this.parentNode.offsetHeight-WM.minTop) +"px" 
            this.contentPane.style.overflow = "scroll"
            w.addClass('wm-maximized')
            w.setFrameSize(true)
        }
        else {
            w.removeClass('wm-maximized')
            this.contentPane.style.overflow = "initial"
            w.place(undefined, undefined, undefined, undefined)
        }
        return w
    } 

    /* Sets/unsets the size of the Iframe */ 
    w.setFrameSize=function(set) {
        var ifr=document.getElementsByTagName("iframe")
        for (var i=0; i<ifr.length; i++) {
            if (set) {
                ifr[i].style.width = ifr[i].parentNode.offsetWidth+'px'
                ifr[i].style.height = ifr[i].parentNode.offsetHeight+'px'
            } else { // Default to style sheet
                ifr[i].style.width = '100%'
                ifr[i].style.height = '100%'
                
            }
        }              
    }

    w.close = function() {
        if (this.locker && this.parentNode) this.parentNode.removeChild(this.locker)
        this.parentNode.removeChild(this)
        WM.activeWindow = 0
        if (typeof(w.onCloseHandler) == "function") {
            w.onCloseHandler()
        }
    }

    if ( !options ) options={}


    w.cssClass = options.cssClass || ''
    w.resizable = options.resizable != undefined ? options.resizable : true
    w.moveable = options.moveable != undefined ? options.moveable : true
    w.width = options.width || top.innerWidth *.7
    w.height = options.height || top.innerHeight *.7
    w.minWidth =options.minWidth || 400
    w.minHeight = options.minHeight || 250       
    w.modal = options.modal != undefined ? options.modal : false
    w.windowTitle = options.title || options.title || ""

    w.className='wm-window'
    w.innerHTML=WM.windowTemplate(w)
    w.contentPane = w.getElementsByClassName("content-pane")[0]    

    if (WM.activeWindow)  if (WM.activeWindow.modal) w.modal = true

    //w.id=id
    w.addClass(w.cssClass)
    if (w.moveable) w.addClass('wm-moveable'); else w.addClass('wm-unmoveable')
    if (w.resizable) w.addClass('wm-resizable'); else w.addClass('wm-unresizable')
    w.setTitle(w.windowTitle)
    w.place(WM.minLeft +WM.positionCounter * 30,WM.minTop +WM.positionCounter * 30,w.width,w.height)

    WM.positionCounter++
    if (WM.positionCounter > 8 ) WM.positionCounter = 0
    if (w.modal) {
        let locker = $div()
        locker.className="wm-locker"

        locker.style.zIndex = ++WM.zIndex
        w.locker = locker
        document.body.appendChild(w.locker);    
    } else {
        w.locker = null
    }
    document.body.appendChild(w)

    WM.currentWindow = w
    if (0 || options.maximized) w.setMaximized(true) 
    if (options.src ) {
        w.setInnerContent('<iframe class="wm-iframe" style="border: none; overflow: auto;" src="'+ options.src +'">')
    } else if (options.content) {
        w.setInnerContent(options.content)
    }
    WM.setFocusTo(w)
    return w
}

WM.windowTemplate = function (w){
    let maxBtn = ""
    if (w.resizable ) maxBtn=`<div class="wm-window-button" style="color: #00ff00;" onmousedown="WM.onWindowButton(this,&#39;max&#39;)">&#x2B24;&nbsp;</div>`

    return `
    <table cellpadding=0 cellspacing=0 onmouseover="this.fi=WM.delayedSetFocusTo(this);" onmouseout="window.clearTimeout(this.fi)" >
    <tbody>
    <tr><td onmousedown="WM.OnMouseDown(this,event,&#39;rnw&#39;)"></td><td onmousedown="WM.OnMouseDown(this,event,&#39;rn&#39;)"></td><td onmousedown="WM.OnMouseDown(this,event,&#39;rne&#39;)"></td></tr>
    <tr><td onmousedown="WM.OnMouseDown(this,event,&#39;rw&#39;)"></td><td>
    <table>
    <tr><td class="wm-title-bar"  onmousedown="WM.OnMouseDown(this,event,&#39;mv&#39;)"><div class="wm-title">Title bar</div>
    <div class="wm-window-button" style="color: #ff4040;" onmousedown="WM.onWindowButton(this,&#39;close&#39;)">&#x2B24;</div>
    ${maxBtn}
    </td></tr>
    <tr><td class="content-pane" id="content"></td></tr>
    </table>
    </td><td onmousedown="WM.OnMouseDown(this,event,&#39;re&#39;)"></td></tr>
    <tr><td onmousedown="WM.OnMouseDown(this,event,&#39;rsw&#39;)"></td><td onmousedown="WM.OnMouseDown(this,event,&#39;rs&#39;)"><td onmousedown="WM.OnMouseDown(this,event,&#39;rse&#39;)"></td></tr>
    </tbody>
    </table>
    `  
}

WM.start()


export function noexport(){}

