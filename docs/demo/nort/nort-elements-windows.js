/*!
 * NORT 
 * Copyright(c) 2019 Stephane Potelle 
 * MIT Licensed
*/

nort.WM = {
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

nort.WM.getWindowElement = function(elt) {
    if ( (elt.className+' ').indexOf('wm-window')>-1 ) return elt
    else if ( elt===document.body) return null
    else return nort.WM.getWindowElement (elt.parentElement)
}

nort.WM.reduceZindex = function() {
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
        nort.WM.zIndex = nort.WM.zIndex - reduceBy
    }
}

nort.WM.setFocusTo = function (elt) {
    w = nort.WM.getWindowElement(elt)
    
    if (w != nort.WM.activeWindow && nort.WM.activeWindow )  { 
        nort.WM.activeWindow.removeClass('wm-focus')
    } 

    if (w != nort.WM.activeWindow) {
        w.addClass('wm-focus')

        if (! w.modal)  nort.WM.reduceZindex(); // Do not let zIndex increase indefinitely
        
        w.style.zIndex = ++nort.WM.zIndex
        nort.WM.activeWindow = w
    }    
    w.setTitle(w.title )
}

nort.WM.delayedSetFocusTo = function (elt) {
    var x = elt
    t = window.setTimeout( function() {nort.WM.setFocusTo(x)}, 1000)
    return t
}

nort.WM.stopContextMenu = function(event) {
    event = event || window.event

    if (event.stopPropagation) event.stopPropagation()

    event.cancelBubble = true
    return false;        
}

nort.WM.onWindowButton = function (elt,cmd) {
    nort.WM.button = cmd
    nort.WM.currentWindow = nort.WM.getWindowElement(elt)
    nort.WM.currentWindow.mode=''
}

nort.WM.OnMouseDown = function(elt, evt, mt) {
    if (evt.buttons==1) {
        nort.WM.currentWindow = nort.WM.getWindowElement(elt)
        if ( nort.WM.currentWindow != null &&  nort.WM.currentWindow !== undefined  ) {
            nort.WM.currentWindow.Y = nort.WM.currentWindow.offsetTop
            nort.WM.currentWindow.X = nort.WM.currentWindow.offsetLeft
            nort.WM.currentWindow.W = nort.WM.currentWindow.offsetWidth
            nort.WM.currentWindow.H = nort.WM.currentWindow.offsetHeight
            
            nort.WM.currentWindow.mouseX = nort.WM.mouseX
            nort.WM.currentWindow.mouseY = nort.WM.mouseY
            nort.WM.currentWindow.mode=mt

            if (! nort.WM.veilDiv) {
                nort.WM.veilDiv = $div()
                nort.WM.addClass(document.body,'wm-'+nort.WM.currentWindow.mode)
                nort.WM.veilDiv.id = 'wm-veil'
                nort.WM.veilDiv.style.zIndex = '9999'
                document.body.appendChild(nort.WM.veilDiv)
            }

            if (nort.WM.currentWindow.clicked && nort.WM.currentWindow.resizable) { nort.WM.currentWindow.setMaximized(! nort.WM.currentWindow.maximized );}
            else {
                nort.WM.currentWindow.clicked = true
                var xw = nort.WM.currentWindow
                setTimeout(function() { xw.clicked = false }, 300 )
            }

            if ( nort.WM.activeWindow !== nort.WM.currentWindow ) { 
                nort.WM.setFocusTo(nort.WM.currentWindow)
            }

        }
    }
}

nort.WM.onMouseUp = function(event) { 
    console.log("mouse up")
    if (document.body && nort.WM.currentWindow) {
        console.log("Got current window")
        nort.WM.removeClass(document.body,'wm-'+nort.WM.currentWindow.mode)
        nort.WM.removeClass(nort.WM.currentWindow,'wm-moving')
        if (nort.WM.veilDiv ) { //&& nort.WM.veilDiv.isConnected) { 
            console.log("remove veil")
                nort.destroyElement(nort.WM.veilDiv) 
        } //document.body.removeChild(nort.WM.veilDiv)
        if (nort.WM.button =='close') nort.WM.currentWindow.close()
        if (nort.WM.button =='max' ) nort.WM.currentWindow.setMaximized( ! nort.WM.currentWindow.maximized)
        nort.WM.button=''
        nort.WM.currentWindow = null; 
    }
}

nort.WM.start = function() {
    if (! nort.WM.started) {
        document.addEventListener("mousemove",function(event) {
            var evt = event || window.event
            var cw
            nort.WM.mouseX = evt.clientX
            nort.WM.mouseY = evt.clientY

            if ( (cw=nort.WM.currentWindow) !=null ) {

                if (cw.mode == 'mv' && cw.moveable) {
                    cw.place(cw.X + nort.WM.mouseX- cw.mouseX,cw.Y + nort.WM.mouseY - cw.mouseY)
                    nort.WM.addClass( nort.WM.currentWindow,'wm-moving')
                }	
                else if (cw.mode == 'rn' && cw.resizable  && cw.moveable) {
                    cw.place(undefined,cw.Y + nort.WM.mouseY - cw.mouseY,undefined,cw.H - nort.WM.mouseY + cw.mouseY)
                }	
                else if (cw.mode == 'rs' && cw.resizable) {
                    cw.place(undefined,undefined,undefined, cw.H + nort.WM.mouseY - cw.mouseY)
                }	
                else if (cw.mode == 'rw' && cw.resizable && cw.moveable) {
                    cw.place(cw.X + nort.WM.mouseX- cw.mouseX,undefined, cw.W - nort.WM.mouseX + cw.mouseX,undefined)
                }	
                else if (cw.mode == 're' && cw.resizable) {
                    cw.place(undefined,undefined,cw.W + nort.WM.mouseX- cw.mouseX,undefined)
                }	
                else if (cw.mode == 'rnw' && cw.resizable && cw.moveable) {
                    cw.place(cw.X + nort.WM.mouseX- cw.mouseX,cw.Y + nort.WM.mouseY - cw.mouseY,cw.W - nort.WM.mouseX + cw.mouseX,cw.H - nort.WM.mouseY + cw.mouseY)
                }	
                else if (cw.mode == 'rne' && cw.resizable && cw.moveable) {
                    cw.place(undefined,cw.Y + nort.WM.mouseY - cw.mouseY,cw.W + nort.WM.mouseX- cw.mouseX,cw.H - nort.WM.mouseY + cw.mouseY)
                }	
                else if (cw.mode == 'rsw' && cw.resizable  && cw.moveable) {
                    cw.place(cw.X + nort.WM.mouseX- cw.mouseX,undefined,cw.W - nort.WM.mouseX + cw.mouseX,cw.H + nort.WM.mouseY - cw.mouseY)
                }	
                else if (cw.mode == 'rse' && cw.resizable) {
                    cw.place(undefined,undefined,cw.W + nort.WM.mouseX- cw.mouseX,cw.H + nort.WM.mouseY - cw.mouseY)
                }
           
            }
        } )

        document.addEventListener("mouseup", nort.WM.onMouseUp)
        
        top.addEventListener("resize", function(event) {
            var cw
            var wl=document.getElementsByClassName("wm-window")
            for (var i=0; i<wl.length; i++) {
                if (wl[i].maximized) wl[i].setMaximized(true)
            }

        })
        nort.WM.started = true
    }

    return(this)
}

nort.WM.addClass=function (elt, className) {
    var c = ' ' + elt.className + ' '
    if ( c.indexOf(' '+className + ' ') < 0) elt.className = (c + className).trim()
}

nort.WM.removeClass=function (elt, className) {
    var c = ' ' + elt.className + ' '
    elt.className = (c.replace(className+' ','')).trim()
}

nort.WM.onWindowClose = function(elt) {
    var w = nort.WM.getWindowElement(elt)
    if (w !=null)  w.close()
}

nort.WM.createWindow = function(options) {
    var w=$div()
    nort.WM.start()


    //if (id=='') id = 'wm-window' + nort.WM.windowId++
    w.mode=''
    w.maximized=false
    w.clicked=false

    w.setTitle=function(title) { this.getElementsByClassName("wm-title")[0].innerHTML=title; }

    w.setContent=function(content) { 
        if (typeof(content) == "string" ) w.contentPane.innerHTML=content; 
        else if (content instanceof HTMLElement) {
            w.contentPane.contentText = ""
            w.contentPane.appendChild(content)
        } else if  (typeof(content.render) == "function") { 
            w.contentPane.contentText = ""
            w.contentPane.appendChild(content.render())
        }
    }

    w.addClass=function(className) { nort.WM.addClass(this, className); }
    w.removeClass=function(className) { nort.WM.removeClass(this, className); }

    w.checkMinSize = function(){
        if (this.offsetWidth < this.minWidth ) this.style.width = this.minWidth + "px"
        if (this.offsetHeight < this.minHeight ) this.style.height = this.minHeight + "px"
        if (this.offsetTop < nort.WM.minTop ) this.style.top = nort.WM.minTop + "px"
    }

    w.resizeTo=function (width, height) {
        if (w.resizable) w.place(undefined,undefined,width,height)
    }     

    w.moveTo=function (left,top) {
        iw (w.moveable) .place(left,top,undefined,undefined)
    }  

    w.focus=function() {
        nort.WM.setFocusTo(this)
    }

    w.place=function(left, top, width, height) {
        // No dragging outside of boundaries
        if ( ! this.maximized ) {
            if (this.mode.substring(0,1)=='r' && ( left<nort.WM.minLeft || top < nort.WM.minTop || width < this.minWidth || height < this.minHeight ) ) return

            if (left !== undefined) this.left=left
            if (top !== undefined) this.top=top
            if (width !== undefined) this.width=width
            if (height !== undefined) this.height=height

            // Check position and size
            if (this.left<nort.WM.minLeft) this.left=nort.WM.minLeft
            if (this.top<nort.WM.minTop) this.top=nort.WM.minTop
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
        return w
    }

    w.center = function() {
        if (! this.maximized) {
            this.top = (this.parentNode.offsetHeight-nort.WM.minTop) /2 - this.height/2
            this.left = (this.parentNode.offsetWidth-nort.WM.minLeft) /2 - this.width/2
            this.style.top = this.top + "px"
            this.style.left = this.left + "px"
        }
        return w
    }

    w.setMaximized = function(state) {
        w.maximized = state
        if (state) {
            w.setFrameSize(false)
            this.style.top = nort.WM.minTop + "px"
            this.style.left = nort.WM.minLeft + "px";   
            this.style.width = (top.innerWidth-nort.WM.minLeft) +"px"
            this.style.height = (this.parentNode.offsetHeight-nort.WM.minTop) +"px"
            this.style.bottom = "100%";  
            w.addClass('wm-maximized')
            w.setFrameSize(true)
        }
        else {
            w.removeClass('wm-maximized')
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
        if (this.locker != null ) this.parentNode.removeChild(this.locker)
        this.parentNode.removeChild(this)
        nort.WM.activeWindow = 0
    }

    if ( !options ) options={}
    w.className='wm-window'
    w.innerHTML=nort.WM.windowTemplate()
    w.contentPane = w.getElementsByClassName("content-pane")[0]

    w.cssClass = options.cssClass || ''
    w.resizable = options.resizable != undefined ? options.resizable : true
    w.moveable = options.moveable != undefined ? options.moveable : true
    w.width = options.width || top.innerWidth *.7
    w.height = options.height || top.innerHeight *.7
    w.minWidth =options.minWidth || 400
    w.minHeight = options.minHeight || 250       
    w.modal = options.modal != undefined ? options.modal : false
    w.title = options.title || options.title || ""


    if (nort.WM.activeWindow)  if (nort.WM.activeWindow.modal) w.modal = true

    //w.id=id
    w.addClass(w.cssClass)
    if (w.moveable) w.addClass('wm-moveable'); else w.addClass('wm-unmoveable')
    if (w.resizable) w.addClass('wm-resizable'); else w.addClass('wm-unresizable')
    w.setTitle(w.title)
    w.place(nort.WM.minLeft +nort.WM.positionCounter * 30,nort.WM.minTop +nort.WM.positionCounter * 30,w.width,w.height)

    nort.WM.positionCounter++
    if (nort.WM.positionCounter > 8 ) nort.WM.positionCounter = 0
    if (w.modal) {
        locker = $div()
        locker.className="wm-locker"

        locker.style.zIndex = ++nort.WM.zIndex
        w.locker = locker
        document.body.appendChild(w.locker);    
    } else {
        w.locker = null
    }
    document.body.appendChild(w)

    nort.WM.currentWindow = w
    if (0 || options.maximized) w.setMaximized(true)
    if (options.src ) {
        w.setContent('<iframe class="wm-iframe" style="border: none; overflow: auto;" src="'+ options.src +'">')
    } else if (options.content) {
        w.setContent(options.content)
    }
    nort.WM.setFocusTo(w)
    return w
}

nort.WM.windowTemplate = function (){
    return `
    <table cellpadding=0 cellspacing=0 onmouseover="this.fi=nort.WM.delayedSetFocusTo(this);" onmouseout="window.clearTimeout(this.fi)" >
    <tbody>
    <tr><td onmousedown="nort.WM.OnMouseDown(this,event,&#39;rnw&#39;)"></td><td onmousedown="nort.WM.OnMouseDown(this,event,&#39;rn&#39;)"></td><td onmousedown="nort.WM.OnMouseDown(this,event,&#39;rne&#39;)"></td></tr>
    <tr><td onmousedown="nort.WM.OnMouseDown(this,event,&#39;rw&#39;)"></td><td>
    <table>
    <tr><td class="wm-title-bar"  onmousedown="nort.WM.OnMouseDown(this,event,&#39;mv&#39;)"><div class="wm-title">Title bar</div>
    <input class="wm-close-button" type=button value="X" onmousedown="nort.WM.onWindowButton(this,&#39;close&#39;)">
    <input class="wm-max-button" type=button value="O" onmousedown="nort.WM.onWindowButton(this,&#39;max&#39;)">
    </td></tr>
    <tr><td class="content-pane" id="content"></td></tr>
    </table>
    </td><td onmousedown="nort.WM.OnMouseDown(this,event,&#39;re&#39;)"></td></tr>
    <tr><td onmousedown="nort.WM.OnMouseDown(this,event,&#39;rsw&#39;)"></td><td onmousedown="nort.WM.OnMouseDown(this,event,&#39;rs&#39;)"><td onmousedown="nort.WM.OnMouseDown(this,event,&#39;rse&#39;)"></td></tr>
    </tbody>
    </table>
    `  
}

nort.WM.start()

