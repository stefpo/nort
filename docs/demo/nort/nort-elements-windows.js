/*!
 * NORT 
 * Copyright(c) 2019 Stephane Potelle 
 * MIT Licensed
*/

import * as dom from "./nort-dom.js"

let windowManager = {
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
    started: false,

    getWindowElement: function(elt) {
        if ( dom.getClasses(elt).includes('wm-window') ) return elt
        else if ( elt===document.body) return null
        else return windowManager.getWindowElement (elt.parentElement)
    },

    getTabberElement: function(elt) {
        if ( dom.getClasses(elt).includes('tabber') ) return elt
        else if ( elt===document.body) return null
        else return windowManager.getTabberElement (elt.parentElement)
    },

    reduceZindex : function() {
        let wl=document.getElementsByClassName("wm-window")
        let minZindex=9999
        let reduceBy=0
        for (let i=0; i<wl.length; i++) {
            if (wl[i].style.zIndex < minZindex) minZindex=wl[i].style.zIndex 
        }

        if ( minZindex > 100 && minZindex != 9999 ) {
            reduceBy = minZindex-100
            for (let i=0; i<wl.length; i++) {
                wl[i].style.zIndex = wl[i].style.zIndex - reduceBy
            }        
            windowManager.zIndex = windowManager.zIndex - reduceBy
        }
    },

    setFocusTo: function (elt) {
        let w = windowManager.getWindowElement(elt)
        
        if (w != windowManager.activeWindow && windowManager.activeWindow )  { 
            windowManager.activeWindow.removeClass('wm-focus')
        } 

        if (w != windowManager.activeWindow) {
            w.addClass('wm-focus')

            if (! w.modal)  windowManager.reduceZindex(); // Do not let zIndex increase indefinitely
            
            w.style.zIndex = ++windowManager.zIndex
            windowManager.activeWindow = w
        }    
        w.setTitle(w.windowTitle )
    },

    delayedSetFocusTo: function (elt) {
        let x = elt
        let t = window.setTimeout( function() {windowManager.setFocusTo(x)}, 1000)
        return t
    },

    stopContextMenu: function(event) {
        event = event || window.event

        if (event.stopPropagation) event.stopPropagation()

        event.cancelBubble = true
        return false;        
    },

    onWindowButton: function (elt,cmd) {
        windowManager.button = cmd
        windowManager.currentWindow = windowManager.getWindowElement(elt)
        windowManager.currentWindow.mode=''
    },

    OnMouseDown: function(elt, evt, mt) {
        if (evt.buttons==1) {
            windowManager.currentWindow = windowManager.getWindowElement(elt)
            if ( windowManager.currentWindow != null &&  windowManager.currentWindow !== undefined  ) {
                windowManager.currentWindow.Y = windowManager.currentWindow.offsetTop
                windowManager.currentWindow.X = windowManager.currentWindow.offsetLeft
                windowManager.currentWindow.W = windowManager.currentWindow.offsetWidth
                windowManager.currentWindow.H = windowManager.currentWindow.offsetHeight
                
                windowManager.currentWindow.mouseX = windowManager.mouseX
                windowManager.currentWindow.mouseY = windowManager.mouseY
                windowManager.currentWindow.mode=mt

                if (! windowManager.veilDiv) {
                    windowManager.veilDiv = $div()
                    dom.addCssClass(document.body,'wm-'+windowManager.currentWindow.mode)
                    windowManager.veilDiv.id = 'wm-veil'
                    windowManager.veilDiv.style.zIndex = '9999'
                    document.body.appendChild(windowManager.veilDiv)
                }

                if (windowManager.currentWindow.clicked && windowManager.currentWindow.resizable) { windowManager.currentWindow.setMaximized(! windowManager.currentWindow.maximized );}
                else {
                    windowManager.currentWindow.clicked = true
                    let xw = windowManager.currentWindow
                    setTimeout(function() { xw.clicked = false }, 300 )
                }

                if ( windowManager.activeWindow !== windowManager.currentWindow ) { 
                    windowManager.setFocusTo(windowManager.currentWindow)
                }

            }
        }
    },

    onMouseUp: function(event) { 
        //console.log("mouse up")
        if (document.body && windowManager.currentWindow) {
            //console.log("Got current window")
            dom.removeCssClass(document.body,'wm-'+windowManager.currentWindow.mode)
            dom.removeCssClass(windowManager.currentWindow,'wm-moving')
            if (windowManager.veilDiv ) { //&& WM.veilDiv.isConnected) { 
                //console.log("remove veil")
                    dom.destroyElement(windowManager.veilDiv) 
            } //document.body.removeChild(WM.veilDiv)
            if (windowManager.button =='close') windowManager.currentWindow.close()
            if (windowManager.button =='max' ) windowManager.currentWindow.setMaximized( ! windowManager.currentWindow.maximized)
            windowManager.button=''
            windowManager.currentWindow = null; 
        }
    },

    start: function() {
        if (! windowManager.started) {
            document.addEventListener("mousemove",function(event) {
                let evt = event || window.event
                let cw
                windowManager.mouseX = evt.clientX
                windowManager.mouseY = evt.clientY

                if ( (cw=windowManager.currentWindow) !=null ) {

                    if (cw.mode == 'mv' && cw.moveable) {
                        cw.place(cw.X + windowManager.mouseX- cw.mouseX,cw.Y + windowManager.mouseY - cw.mouseY)
                        dom.addCssClass( windowManager.currentWindow,'wm-moving')
                    }	
                    else if (cw.mode == 'rn' && cw.resizable  && cw.moveable) {
                        cw.place(undefined,cw.Y + windowManager.mouseY - cw.mouseY,undefined,cw.H - windowManager.mouseY + cw.mouseY)
                    }	
                    else if (cw.mode == 'rs' && cw.resizable) {
                        cw.place(undefined,undefined,undefined, cw.H + windowManager.mouseY - cw.mouseY)
                    }	
                    else if (cw.mode == 'rw' && cw.resizable && cw.moveable) {
                        cw.place(cw.X + windowManager.mouseX- cw.mouseX,undefined, cw.W - windowManager.mouseX + cw.mouseX,undefined)
                    }	
                    else if (cw.mode == 're' && cw.resizable) {
                        cw.place(undefined,undefined,cw.W + windowManager.mouseX- cw.mouseX,undefined)
                    }	
                    else if (cw.mode == 'rnw' && cw.resizable && cw.moveable) {
                        cw.place(cw.X + windowManager.mouseX- cw.mouseX,cw.Y + windowManager.mouseY - cw.mouseY,cw.W - windowManager.mouseX + cw.mouseX,cw.H - windowManager.mouseY + cw.mouseY)
                    }	
                    else if (cw.mode == 'rne' && cw.resizable && cw.moveable) {
                        cw.place(undefined,cw.Y + windowManager.mouseY - cw.mouseY,cw.W + windowManager.mouseX- cw.mouseX,cw.H - windowManager.mouseY + cw.mouseY)
                    }	
                    else if (cw.mode == 'rsw' && cw.resizable  && cw.moveable) {
                        cw.place(cw.X + windowManager.mouseX- cw.mouseX,undefined,cw.W - windowManager.mouseX + cw.mouseX,cw.H + windowManager.mouseY - cw.mouseY)
                    }	
                    else if (cw.mode == 'rse' && cw.resizable) {
                        cw.place(undefined,undefined,cw.W + windowManager.mouseX- cw.mouseX,cw.H + windowManager.mouseY - cw.mouseY)
                    }
            
                }
            } )

            document.addEventListener("mouseup", windowManager.onMouseUp)
            
            top.addEventListener("resize", function(event) {
                let cw
                let wl=document.getElementsByClassName("wm-window")
                for (let i=0; i<wl.length; i++) {
                    if (wl[i].maximized) wl[i].setMaximized(true)
                }

            })
            windowManager.started = true
            window._nort_WM=windowManager        
        }

        return(this)
    },

    onWindowClose: function(elt) {
        let w = windowManager.getWindowElement(elt)
        if (w !=null)  w.close()
    },

    createWindow: function(options) {
        let w=$div()

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
            if (this.offsetTop < windowManager.minTop ) this.style.top = windowManager.minTop + "px"
        }

        w.resizeTo=function (width, height) {
            if (w.resizable) w.place(undefined,undefined,width,height)
        }     

        w.moveTo=function (left,top) {
            if (w.moveable) w.place(left,top,undefined,undefined)
        }  

        w.focus=function() {
            windowManager.setFocusTo(this)
        }

        w.place=function(left, top, width, height) {
            // No dragging outside of boundaries
            if ( ! this.maximized ) {
                if (this.mode.substring(0,1)=='r' && ( left<windowManager.minLeft || top < windowManager.minTop || width < this.minWidth || height < this.minHeight ) ) return

                if (left !== undefined) this.left=left
                if (top !== undefined) this.top=top
                if (width !== undefined) this.width=width
                if (height !== undefined) this.height=height

                // Check position and size
                if (this.left<windowManager.minLeft) this.left=windowManager.minLeft
                if (this.top<windowManager.minTop) this.top=windowManager.minTop
                if (this.width<w.minWidth) this.width=w.minWidth
                if (this.height<w.minHeight) this.height=w.minHeight

                // place
                let ifr=document.getElementsByTagName("iframe")
                
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
                this.top = (this.parentNode.offsetHeight-windowManager.minTop) /2 - this.height/2
                this.left = (this.parentNode.offsetWidth-windowManager.minLeft) /2 - this.width/2
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
                this.style.top = windowManager.minTop + "px"
                this.style.left = windowManager.minLeft + "px";   
                //this.style.width = (top.innerWidth-WM.minLeft) +"px"
                this.style.width = (this.parentNode.offsetWidth-windowManager.minLeft) +"px"
                this.style.height = (this.parentNode.offsetHeight-windowManager.minTop) +"px" 
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
            let ifr=document.getElementsByTagName("iframe")
            for (let i=0; i<ifr.length; i++) {
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
            windowManager.activeWindow = 0
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
        w.innerHTML=windowManager.windowTemplate(w)
        w.contentPane = w.getElementsByClassName("content-pane")[0]    

        if (windowManager.activeWindow)  if (windowManager.activeWindow.modal) w.modal = true

        //w.id=id
        w.addClass(w.cssClass)
        if (w.moveable) w.addClass('wm-moveable'); else w.addClass('wm-unmoveable')
        if (w.resizable) w.addClass('wm-resizable'); else w.addClass('wm-unresizable')
        w.setTitle(w.windowTitle)
        w.place(windowManager.minLeft +windowManager.positionCounter * 30,windowManager.minTop +windowManager.positionCounter * 30,w.width,w.height)

        windowManager.positionCounter++
        if (windowManager.positionCounter > 8 ) windowManager.positionCounter = 0
        if (w.modal) {
            let locker = $div()
            locker.className="wm-locker"

            locker.style.zIndex = ++windowManager.zIndex
            w.locker = locker
            document.body.appendChild(w.locker);    
        } else {
            w.locker = null
        }
        document.body.appendChild(w)

        windowManager.currentWindow = w
        if (0 || options.maximized) w.setMaximized(true) 
        if (options.src ) {
            w.setInnerContent('<iframe class="wm-iframe" style="border: none; overflow: auto;" src="'+ options.src +'">')
        } else if (options.content) {
            w.setInnerContent(options.content)
        }
        windowManager.setFocusTo(w)
        return w
    },
    
    windowTemplate: function (w){
        let maxBtn = ""
        if (w.resizable ) maxBtn=`<div class="wm-window-button" style="color: #00ff00;" onmousedown="_nort_WM.onWindowButton(this,&#39;max&#39;)">&#x2B24;&nbsp;</div>`

        return `
        <table cellpadding=0 cellspacing=0 onmouseover="this.fi=_nort_WM.delayedSetFocusTo(this);" onmouseout="window.clearTimeout(this.fi)" >
        <tbody>
        <tr><td onmousedown="_nort_WM.OnMouseDown(this,event,&#39;rnw&#39;)"></td><td onmousedown="_nort_WM.OnMouseDown(this,event,&#39;rn&#39;)"></td><td onmousedown="_nort_WM.OnMouseDown(this,event,&#39;rne&#39;)"></td></tr>
        <tr><td onmousedown="_nort_WM.OnMouseDown(this,event,&#39;rw&#39;)"></td><td>
        <table>
        <tr><td class="wm-title-bar"  onmousedown="_nort_WM.OnMouseDown(this,event,&#39;mv&#39;)"><div class="wm-title">Title bar</div>
        <div class="wm-window-button" style="color: #ff4040;" onmousedown="_nort_WM.onWindowButton(this,&#39;close&#39;)">&#x2B24;</div>
        ${maxBtn}
        </td></tr>
        <tr><td class="content-pane" id="content"></td></tr>
        </table>
        </td><td onmousedown="_nort_WM.OnMouseDown(this,event,&#39;re&#39;)"></td></tr>
        <tr><td onmousedown="_nort_WM.OnMouseDown(this,event,&#39;rsw&#39;)"></td><td onmousedown="_nort_WM.OnMouseDown(this,event,&#39;rs&#39;)"><td onmousedown="_nort_WM.OnMouseDown(this,event,&#39;rse&#39;)"></td></tr>
        </tbody>
        </table>
        `  
    }
}

export class WM {
    // Returns the window manager

    static createWindow(options) {
        let wm = windowManager.start()
        return wm.createWindow(options)
    }
}

