/*!
 * NORT web UI component library
 * Copyright(c) 2016-2020 Stephane Potelle 
 * MIT Licensed
*/

if ( typeof(atb) === 'undefined' ) atb = {}

nort.elements.graph = new Object()

nort.elements.graph.autoScale = function(minValue, maxValue) {

	var mag1=Math.floor(Math.log( Math.min(Math.abs(maxValue),Math.abs(minValue)))/Math.log(10)) |0
	var mag2=Math.floor(Math.log( Math.max(Math.abs(maxValue),Math.abs(minValue))/1.51 )/Math.log(10)) |0
	var magLin
	var vStepCount=0
	var maxScale
	var minScale
	
	var mag
	if (mag1 == mag2 ) {
		mag=Math.log(Math.abs(maxValue-minValue))/Math.log(10) |0
		magLin=Math.pow(10, mag)*5
		maxScale=Math.ceil(maxValue / magLin ) * magLin
		minScale=Math.floor(minValue / magLin ) * magLin
		vStepCount = ( maxScale - minScale ) / magLin | 0
		vStepSize = magLin/5 
	} else {
		mag = mag2
		magLin=Math.pow(10, mag)/2
		maxScale=Math.ceil(maxValue / magLin ) * magLin
		minScale=Math.floor(minValue / magLin ) * magLin
		vStepCount = ( maxScale - minScale ) / magLin /2 | 0
		vStepSize = magLin *2
	}

	while (vStepCount > 10 ) {
		vStepCount = vStepCount / 2 
		vStepSize = vStepSize * 2 
	}
	
	var ret={}
	ret.maxScale=maxScale
	ret.minScale=minScale
	ret.vStepCount=vStepCount
	ret.magLin=magLin
	ret.vStepSize = vStepSize 
	return ret
}



nort.elements.graph.cumulatedBarGraph = function ( options, pData ) {
	var cv=$canvas()
	var div=$div({}, cv)
	var sensitiveArea=[]
	var i,j
	var title=""
	var negativeValue = false
	
	var colors=['blue','orange','green','yellow']
	var data=pData.data
	var onclick
	
	div.style.border="none"
	
	cv.width=options.width ? options.width : 130
	cv.height=options.height ? options.height : 100
	var withLinks=options.withLinks ? true: false
	
	

	if (options.colors) colors=options.colors
	if (options.onclick) onclick=options.onclick
	if (options.title) title=options.title

	
	cv.style.display="inline-block"
	
	var ctx = cv.getContext("2d")
	
	var minValue=0
	var maxValue=0
	var barSum = 0
	
	for ( i in data ) {
		var barSum = 0
		for ( j = 1; j < data[i].length; j++ ) {
			barSum += data[i][j]
			if ( data[i][j]<0 ) negativeValue = true
		}
		if (barSum > maxValue ) maxValue = barSum
	}
	var hScale = cv.width*.8/data.length
	var barWidth=hScale*.8
	var barOffset=hScale*.1
	
	var asdata = nort.elements.graph.autoScale(minValue, maxValue)
	var maxScale = asdata.maxScale
	var minScale = asdata.minScale
	var vStepCount = asdata.vStepCount
	var magLin=asdata.magLin
	
	var vScale=-cv.height*.7/(maxScale-minScale)
	
	var ox=(cv.width/10) |0
	var oy=(cv.height*.85-minScale*vScale) |0
	
	
	var txtSize = cv.height/20
	if (txtSize> 15) txtSize=15
	ctx.textAlign="center"
	ctx.textBaseline="middle";		
	ctx.font=txtSize*1.3+'px arial'
	ctx.fillText(title,cv.width/2,cv.height*0.05)
		
	
	ctx.translate(ox,oy)
	ctx.textAlign="right"
	ctx.font=txtSize*.7+'px arial'

	//ctx.fillText(maxScale, -txtSize, maxScale*vScale)
	ctx.fillText(minScale, -txtSize, minScale*vScale);		
	
	for ( var i=0; i<=vStepCount; i++) {
		if ( i==0 ) { ctx.strokeStyle='black'; }
		else { ctx.strokeStyle='#D0D0D0'; }
		ctx.beginPath()
		ctx.moveTo(0,asdata.vStepSize * i*vScale)
		ctx.lineTo(cv.width*.8,asdata.vStepSize * i*vScale)
		ctx.stroke()
		ctx.fillText( Math.round((minScale + asdata.vStepSize * i) / magLin) * magLin , -txtSize, 
			(minScale + asdata.vStepSize * i)*vScale);	
	}

	ctx.strokeStyle='black'
	ctx.beginPath()
	ctx.moveTo(0,minScale*vScale)
	ctx.lineTo(0,maxScale*vScale)
	ctx.stroke()

	ctx.textAlign="center"
	ctx.textBaseline="top"
	ctx.font=txtSize*.7+'px arial'
				
	for (i in data) {
		var barSum = 0
		for (j=1; j<data[i].length && j<= pData.bars.length; j++) {
			ctx.fillStyle=colors[j-1]
			x1= (i*hScale+barOffset ) 
			y1= barSum * vScale 
			w1=(barWidth-2) 
			h1=((data[i][j])*vScale) 
			barSum = barSum + data[i][j]
			ctx.fillRect(x1,y1,w1,h1)
			
			if (onclick) sensitiveArea.push([ox+x1,oy+y1,ox+x1+w1,oy+y1+h1,data[i][0],pData.bars[j-1]]) 
		}
		ctx.fillStyle='black'
		ctx.save()
		ctx.translate(i*hScale+hScale/3, minScale*vScale+txtSize/3)
		ctx.rotate(-Math.PI/4)
		ctx.textAlign = "right"
		ctx.fillText( data[i][0],0,0)
		ctx.rotate(Math.PI/4)
		ctx.restore();		
	}

	
	if (withLinks) {
		divlinks=$div()
		divlinks.style.font=txtSize+"pt arial"
		divlinks.style.verticalAlign="top"
		divlinks.style.paddingTop=cv.height/10+'px'
		divlinks.style.display="inline-block"
		div.appendChild(divlinks)
		var out=""
		var fontSize = txtSize
		if (fontSize > 12 ) fontSize=12
		for ( i in pData.bars ) {
			l="<div style=\"display: inline-block;height:"+ txtSize +"px; width: "+txtSize*2 + "px; background-color: "+ colors[i] +"\"></div> "
			l+=pData.bars[i]
			l="<span style=\"text-decoration:none; font-size: "+ fontSize+"pt;\">"+ l +"</span>"
			out+=l+"<br>"
			
			
		}
		divlinks.innerHTML=out
	}
	
	var cumulativeOffset = function(element) {
		var top = 0, left = 0
		do {
			top += element.offsetTop  || 0
			left += element.offsetLeft || 0
			element = element.offsetParent
		} while(element)

		return {
		top: top,
		left: left
		}
	}
	
	var getAreaId = function(ev) {
		
		var x=ev.pageX
		var y=ev.pageY
		var o=cumulativeOffset(ev.target); 
		x-= o.left; 
		y-= o.top; 				
		for(i in sensitiveArea){
			pt=sensitiveArea[i]
			
			if ( 
				( x>=pt[0] && x<=pt[2] || x>=pt[2] && x<=pt[0] ) && 
				( y>=pt[1] && y<=pt[3] || y>=pt[3] && y<=pt[1])
				) return i
		}
		return -1
	}
	
	if (onclick) {
		var xclick = function(ev) {
			var a
			if(onclick) {
				if (( a=getAreaId(ev)) >=0)  {
					var area=sensitiveArea[a]
					onclick(area[4],area[5])
				}
			}
		}
		
		var xmousemove = function(ev) {
			if (getAreaId(ev) >=0) cv.style.cursor="pointer"
			else cv.style.cursor="auto"
		};			
		
		cv.addEventListener("click", xclick, false)
		cv.addEventListener("mousemove", xmousemove, false)
	}
	
	if (negativeValue) { 
		div=$div({}, "Error: Negative value for bar") 
		div.style.width = cv.width + "px"
		div.style.height = cv.height + "px"
	} 

	if (options.divStyle) div.setAttribute('style',options.divStyle)
	if (options.id) div.setAttribute('style',options.id)	
	div.style.display="inline-block"
	div.style.whiteSpace='nowrap'

	return div
}


nort.elements.graph.barGraph = function( options, pData ) {
	var cv=$canvas()
	var div=$div({}, cv)

	var sensitiveArea=[]
	var i,j
	var title=""
	
	var colors=['blue','orange','green','yellow']
	var data=pData.data
	var onclick
	
	div.style.border="none"
	
	
	
	cv.width=options.width ? options.width : 130
	cv.height=options.height ? options.height : 100
	var withLinks=options.withLinks ? true: false
	
	
	if (options.divStyle) div.setAttribute('style',options.divStyle)
	if (options.id) div.setAttribute('style',options.id)
	if (options.colors) colors=options.colors
	if (options.onclick) onclick=options.onclick
	if (options.title) title=options.title
	div.style.display="inline-block"
	div.style.whiteSpace='nowrap'
	
	cv.style.display="inline-block"
	
	var ctx = cv.getContext("2d")
	
	var minValue=0
	var maxValue=0
	
	for ( i in data ) {
		for ( j = 1; j < data[i].length; j++ ) {
			if (data[i][j]>maxValue) maxValue=data[i][j]
			if (data[i][j]<minValue) minValue=data[i][j]
		}
	}
	var hScale = cv.width*.8/data.length
	var barWidth=hScale*.8
	var barOffset=hScale*.1
	
	var asdata = nort.elements.graph.autoScale(minValue, maxValue)
	var maxScale = asdata.maxScale
	var minScale = asdata.minScale
	var vStepCount = asdata.vStepCount
	var magLin=asdata.magLin
	
	var vScale=-cv.height*.7/(maxScale-minScale)
	
	var ox=(cv.width/10) |0
	var oy=(cv.height*.85-minScale*vScale) |0
	
	
	var txtSize = cv.height/20
	if (txtSize> 15) txtSize=15
	ctx.textAlign="center"
	ctx.textBaseline="middle";		
	ctx.font=txtSize*1.3+'px arial'
	ctx.fillText(title,cv.width/2,cv.height*0.05)
		
	
	ctx.translate(ox,oy)
	ctx.textAlign="right"
	ctx.font=txtSize*.7+'px arial';			
	
	ctx.fillText(maxScale, -txtSize, maxScale*vScale)
	ctx.fillText(minScale, -txtSize, minScale*vScale);			
				
	for ( var i=0; i<=vStepCount; i++) {
		if ( i==0 ) { ctx.strokeStyle='black'; }
		else { ctx.strokeStyle='#D0D0D0'; }
		ctx.beginPath()
		ctx.moveTo(0,asdata.vStepSize * i*vScale)
		ctx.lineTo(cv.width*.8,asdata.vStepSize * i*vScale)
		ctx.stroke()
		ctx.fillText( Math.round((minScale + asdata.vStepSize * i) / magLin) * magLin , -txtSize, 
			(minScale + asdata.vStepSize * i)*vScale);	
		
	}

	ctx.strokeStyle='black'
	ctx.beginPath()
	ctx.moveTo(0,minScale*vScale)
	ctx.lineTo(0,maxScale*vScale)
	ctx.stroke()

	ctx.textAlign="center"
	ctx.textBaseline="top"
	ctx.font=txtSize*.7+'px arial'
	for (i in data) {
		for (j=1; j<data[i].length && j<= pData.bars.length; j++) {
			ctx.fillStyle=colors[j-1]
			x1= (i*hScale+barOffset +barWidth/(pData.bars.length)*(j-1)) |0
			y1=0
			w1=(barWidth/(pData.bars.length)-2) |0
			h1=(data[i][j]*vScale) |0
			ctx.fillRect(x1,y1,w1,h1)
			if (onclick) sensitiveArea.push([ox+x1,oy+y1,ox+x1+w1,oy+y1+h1,data[i][0],pData.bars[j-1]]) 
		}
		ctx.fillStyle='black'
		ctx.save()
		ctx.translate(i*hScale+hScale/3, minScale*vScale+txtSize/3)
		ctx.rotate(-Math.PI/4)
		ctx.textAlign = "right"
		ctx.fillText( data[i][0],0,0)
		ctx.rotate(Math.PI/4)
		ctx.restore()
	}

	
	if (withLinks) {
		divlinks=$div()
		divlinks.style.font=txtSize+"pt arial"
		divlinks.style.verticalAlign="top"
		divlinks.style.paddingTop=cv.height/10+'px'
		divlinks.style.display="inline-block"
		div.appendChild(divlinks)
		var out=""
		var fontSize = txtSize
		if (fontSize > 12 ) fontSize=12
		for ( i in pData.bars ) {
			l="<div style=\"display: inline-block;height:"+ txtSize +"px; width: "+txtSize*2 + "px; background-color: "+ colors[i] +"\"></div> "
			l+=pData.bars[i]
			l="<span style=\"text-decoration:none; font-size: "+ fontSize+"pt;\">"+ l +"</span>"
			out+=l+"<br>"
			
			
		}
		divlinks.innerHTML=out
	}
	
	var cumulativeOffset = function(element) {
		var top = 0, left = 0
		do {
			top += element.offsetTop  || 0
			left += element.offsetLeft || 0
			element = element.offsetParent
		} while(element)

		return {
		top: top,
		left: left
		}
	}
	
	var getAreaId = function(ev) {
		
		var x=ev.pageX
		var y=ev.pageY
		var o=cumulativeOffset(ev.target); 
		x-= o.left; 
		y-= o.top; 				
		for(i in sensitiveArea){
			pt=sensitiveArea[i]
			
			if ( 
				( x>=pt[0] && x<=pt[2] || x>=pt[2] && x<=pt[0] ) && 
				( y>=pt[1] && y<=pt[3] || y>=pt[3] && y<=pt[1])
				) return i
		}
		return -1
	}
	
	if (onclick) {
		var xclick = function(ev) {
			var a
			if(onclick) {
				if (( a=getAreaId(ev)) >=0)  {
					var area=sensitiveArea[a]
					onclick(area[4],area[5])
				}
			}
		}
		
		var xmousemove = function(ev) {
			if (getAreaId(ev) >=0) cv.style.cursor="pointer"
			else cv.style.cursor="auto"
		};			
		
		cv.addEventListener("click", xclick, false)
		cv.addEventListener("mousemove", xmousemove, false)
	}
	
	return div
}
		
nort.elements.graph.pieChart = function( options, pData ) {
	var sorterFunc = function(v2,v1) {
		if (v1[1] == v2[1]) return 0
		else if (v1[1] >= v2[1]) return 1
		else return -1
	}
	
	var cv=$canvas()
	var div=$div({}, cv)
	
	var sensitiveArea=[]
	var onclick
	var title=""
	
	div.style.border="none"
	
	cv.width=options.size ? options.size : 100
	cv.height=options.size ? options.size : 100
	var withLinks=options.withLinks ? true: false
	var maxSlices=options.maxSlices ? options.maxSlices : 12
	
	if (options.divStyle) div.setAttribute('style',options.divStyle)
	if (options.id) div.setAttribute('style',options.id)
	if (options.onclick) onclick=options.onclick
	if (options.title) title=options.title
	div.style.display="inline-block"
	div.style.whiteSpace='nowrap'
	
	cv.style.display="inline-block"
	var ox=cv.width*0.5
	var oy=cv.height*0.55
	
	ctx = cv.getContext("2d")
	var txtSize = cv.height/20
	if (txtSize> 15) txtSize=15
	ctx.textAlign="center"
	ctx.textBaseline="middle";		
	ctx.font=txtSize*1.3+'px arial'
	ctx.fillText(title,cv.width/2,cv.height*0.05)
		
	
	ctx.textAlign="right"
	ctx.font=txtSize*.7+'px arial';				
	ctx.translate (ox, oy)
				
	var denom = 0
	var begin = 0
	var other = 0
	pData=pData.sort(sorterFunc)
	var data=Array()
	for ( i in pData ) {
		denom += pData[i][1]
		if (i >=maxSlices || pData[i][1]/denom < 0.02) { other+=pData[i][1]; }
		else { data[i]=pData[i]}
	}
	if (other > 0)  data[i+1]=['Other',other, 'purple']
	
	//data=pData
	
	var begin=denom/2
	
	for ( i in data ) {
		ctx.beginPath()
		ctx.fillStyle = data[i][2]
		ctx.moveTo(0,0)
		ctx.arc(0,0,cv.height/2*.7,begin*2*Math.PI/denom,(begin + data[i][1])*2*Math.PI/denom)
		ctx.lineTo(0,0)
		ctx.fill()
		ctx.textAlign="center"
		ctx.textBaseline="middle"
		txtSize = cv.height/20
		if (txtSize> 15) txtSize=15
		if (txtSize>7) {
			ctx.font=txtSize+"px arial"
			ctx.fillStyle="black"
			var tx=cv.height*.4*Math.cos((begin+data[i][1]/2)*2*Math.PI/denom)
			var ty=cv.height*.4*Math.sin((begin+data[i][1]/2)*2*Math.PI/denom)
			ctx.fillText(Math.floor(data[i][1]/denom*100) +"%", tx, ty )
			if (onclick) {
				sensitiveArea.push([ox+tx-txtSize,oy+ty-txtSize/2,ox+tx+txtSize,oy+ty+txtSize/2,data[i][0]]) 
			}		
		}
		begin = begin + data[i][1]
	}
	
	if (withLinks) {
		divlinks=$div()
		divlinks.style.font=txtSize+"pt arial"
		divlinks.style.verticalAlign="top"
		divlinks.style.paddingTop=cv.height/10+'px'
		divlinks.style.display="inline-block"
		div.appendChild(divlinks)
		var out=""
		var l
		fontSize = txtSize
		if (fontSize > 12 ) fontSize=12
		for ( i in data ) {
			l="<div style=\"display: inline-block;height:"+ txtSize +"px; width: "+txtSize*2 + "px; background-color: "+ data[i][2]+"\"></div> "
			l+=data[i][0]
			if (data[i].length>3) {
				l="<a style=\"text-decoration:none; font-size: "+ fontSize+"pt;\" href=\""+ data[i][3]+"\">"+ l +"</a>"
			}
			else {
				l="<span style=\"text-decoration:none; font-size: "+ fontSize+"pt;\">"+ l +"</span>"
			}
			
			out+=l+"<br>"
			
			
		}
		divlinks.innerHTML=out
	}
	
	var cumulativeOffset = function(element) {
		var top = 0, left = 0
		do {
			top += element.offsetTop  || 0
			left += element.offsetLeft || 0
			element = element.offsetParent
		} while(element)

		return {
		top: top,
		left: left
		}
	}
	
	var getAreaId = function(ev) {
		
		var x=ev.pageX
		var y=ev.pageY
		var o=cumulativeOffset(ev.target); 
		x-= o.left; 
		y-= o.top; 				
		for(i in sensitiveArea){
			pt=sensitiveArea[i]
			
			if ( 
				( x>=pt[0] && x<=pt[2] || x>=pt[2] && x<=pt[0] ) && 
				( y>=pt[1] && y<=pt[3] || y>=pt[3] && y<=pt[1])
				) return i
		}
		return -1
	}
	
	if (onclick) {
		var xclick = function(ev) {
			var a
			if(onclick) {
				if (( a=getAreaId(ev)) >=0)  {
					var area=sensitiveArea[a]
					onclick(area[4])
				}
			}
		}
		
		var xmousemove = function(ev) {
			if (getAreaId(ev) >=0) cv.style.cursor="pointer"
			else cv.style.cursor="auto"
		};			
		
		cv.addEventListener("click", xclick, false)
		cv.addEventListener("mousemove", xmousemove, false)
	}
	
	return div
}
