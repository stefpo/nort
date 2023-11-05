/*!
 * NORT web UI component library
 * Copyright(c) 2016-2020 Stephane Potelle 
 * MIT Licensed
*/

if ( typeof(atb) === 'undefined' ) atb = {}

nort.chart = new Object()


nort.chart.Scaler = class{
	constructor( data, viewPort ) {
		if ( data.lX == undefined || data.lY == undefined || data.uX == undefined || data.uY == undefined ) 
				 throw("data requires lX, lY, uX, uX properties")
	 if ( viewPort.left == undefined ||viewPort.right == undefined || viewPort.top == undefined || viewPort.bottom == undefined ) 
				 throw("viewPort requires top, left, right, bottom properties")

	 this.scaleY = ( viewPort.top - viewPort.bottom ) / (data.uY - data.lY)
	 this.offsetY = ( viewPort.bottom - (data.lY * this.scaleY))
	 this.scaleX = ( viewPort.right - viewPort.left ) / (data.uX - data.lX)
	 this.offsetX = ( viewPort.left - (data.lX * this.scaleX))    
 }

 pixelY (v) { return v* this.scaleY + this.offsetY }
 pixelX (v) { return v* this.scaleX + this.offsetX }   
 pixelXY( vX, vY) { return { vX, vY, pixelX: this.pixelX(vX), pixelY: this.pixelY(vY) } }

 static autoScale( min, max ) {
	 function mag(v) {
		 let lgt = Math.log(v)
		 if ( lgt < -9 ) lgt = -9
		 
		 return lgt / Math.log(10)
	 }

	 let ret = { min, max }

	 if ( min * max > 0 ) {
		 ret.magDiff = mag(max-min)
	 } else {
		 let m1 = mag(Math.abs(min))
		 ret.magDiff = mag(Math.abs(max))
		 ret.magDiff = m1 > ret.magDiff ? m1 : ret.magDiff
	 }


	 ret.magDiff = Math.round(ret.magDiff) 
	 ret.magLin = Math.pow(10, ret.magDiff)
	 ret.magLin=Math.round( ret.magLin * 1E9 ) / 1E9

	 let unit = ret.magLin / 10

	 while ( (max - min) / unit >= 10 ) unit = unit * 5
	 if ( (max - min) / unit < 4 ) unit = unit / 2

	 unit = Math.round(unit * 1E9 ) / 1E9

	 ret.lb = Math.floor(min / unit) * unit
	 ret.ub = Math.ceil(max / unit) * unit

	 if ( ret.lb == ret.ub ) {
		 ret.lb = ret.lb - unit
		 ret.ub = ret.ub + unit
	 }

	 ret.unit = unit
	 ret.steps = Math.round((ret.ub - ret.lb) / unit)

	 return ret
 }    
}

nort.chart.autoScale = function(minValue, maxValue) {
	let scl = nort.chart.Scaler.autoScale(minValue, maxValue) 

	let ret= {
		maxScale: scl.ub,
		minScale: scl.lb,
		vStepCount: scl.steps,
		magLin: scl.unit/10,
		vStepSize: scl.unit 
	}
	console.log(JSON.stringify(ret))
	return ret
}


//TODO: Complete line Graph
nort.chart.lineGraph = function( options, pData)  {
	let cv=$canvas()
	let div=$div({}, cv)
	
	cv.width=options.width ? options.width : 130
	cv.height=options.height ? options.height : 100
	let withLinks=options.withLinks ? true: false

	let xMin = 1E99
	let yMin = 1E99
	let xMax = -1E99
	let yMax = -1E99

	for (p of pData) {
		if (p[0] < xMin) xMin = p[0]
		if (p[0] > xMax) xMax = p[0]
	}
	

	return cv
}


nort.chart.cumulatedBarGraph = function ( options, pData ) {
	let cv=$canvas()
	let div=$div({}, cv)
	let sensitiveArea=[]
	let i,j
	let title=""
	let negativeValue = false
	
	let colors=['blue','orange','green','yellow']
	let data=pData.data
	let onclick
	
	cv.width=options.width ? options.width : 130
	cv.height=options.height ? options.height : 100
	let withLinks=options.withLinks ? true: false
	
	

	if (options.colors) colors=options.colors
	if (options.onclick) onclick=options.onclick
	if (options.title) title=options.title

	
	cv.style.display="inline-block"
	
	let ctx = cv.getContext("2d")
	
	let minValue=0
	let maxValue=0
	let barSum = 0
	
	for ( i in data ) {
		let barSum = 0
		for ( j = 1; j < data[i].length; j++ ) {
			barSum += data[i][j]
			if ( data[i][j]<0 ) negativeValue = true
		}
		if (barSum > maxValue ) maxValue = barSum
	}
	let hScale = cv.width*.8/data.length
	let barWidth=hScale*.8
	let barOffset=hScale*.1
	
	let asdata = nort.chart.autoScale(minValue, maxValue)
	let maxScale = asdata.maxScale
	let minScale = asdata.minScale
	let vStepCount = asdata.vStepCount
	let magLin=asdata.magLin
	
	let vScale=-cv.height*.7/(maxScale-minScale)
	
	let ox=(cv.width/10) |0
	let oy=(cv.height*.85-minScale*vScale) |0
	
	
	let txtSize = cv.height/20
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
	
	for ( let i=0; i<=vStepCount; i++) {
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
		let barSum = 0
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
		let out=""
		let fontSize = txtSize
		if (fontSize > 12 ) fontSize=12
		for ( i in pData.bars ) {
			l="<div style=\"display: inline-block;height:"+ txtSize +"px; width: "+txtSize*2 + "px; background-color: "+ colors[i] +"\"></div> "
			l+=pData.bars[i]
			l="<span style=\"text-decoration:none; font-size: "+ fontSize+"pt;\">"+ l +"</span>"
			out+=l+"<br>"
			
			
		}
		divlinks.innerHTML=out
	}
	
	let cumulativeOffset = function(element) {
		let top = 0, left = 0
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
	
	let getAreaId = function(ev) {
		
		let x=ev.pageX
		let y=ev.pageY
		let o=cumulativeOffset(ev.target); 
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
		let xclick = function(ev) {
			let a
			if(onclick) {
				if (( a=getAreaId(ev)) >=0)  {
					let area=sensitiveArea[a]
					onclick(area[4],area[5])
				}
			}
		}
		
		let xmousemove = function(ev) {
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


nort.chart.barGraph = function( options, pData ) {
	let cv=$canvas()
	let div=$div({}, cv)

	let sensitiveArea=[]
	let i,j
	let title=""
	
	let colors=['blue','orange','green','yellow']
	let data=pData.data
	let onclick
	
	cv.width=options.width ? options.width : 130
	cv.height=options.height ? options.height : 100
	let withLinks=options.withLinks ? true: false
	
	
	if (options.divStyle) div.setAttribute('style',options.divStyle)
	if (options.id) div.setAttribute('style',options.id)
	if (options.colors) colors=options.colors
	if (options.onclick) onclick=options.onclick
	if (options.title) title=options.title
	div.style.display="inline-block"
	div.style.whiteSpace='nowrap'
	
	cv.style.display="inline-block"
	
	let ctx = cv.getContext("2d")
	
	let minValue=0
	let maxValue=0
	
	for ( i in data ) {
		for ( j = 1; j < data[i].length; j++ ) {
			if (data[i][j]>maxValue) maxValue=data[i][j]
			if (data[i][j]<minValue) minValue=data[i][j]
		}
	}
	let hScale = cv.width*.8/data.length
	let barWidth=hScale*.8
	let barOffset=hScale*.1
	
	let asdata = nort.chart.autoScale(minValue, maxValue)
	let maxScale = asdata.maxScale
	let minScale = asdata.minScale
	let vStepCount = asdata.vStepCount
	let magLin=asdata.magLin
	
	let vScale=-cv.height*.7/(maxScale-minScale)
	
	let ox=(cv.width/10) |0
	let oy=(cv.height*.85-minScale*vScale) |0
	
	
	let txtSize = cv.height/20
	if (txtSize> 15) txtSize=15
	ctx.textAlign="center"
	ctx.textBaseline="middle";		
	ctx.font=txtSize*1.3+'px arial'
	ctx.fillText(title,cv.width/2,cv.height*0.05)
		
	
	ctx.translate(ox+.5,oy+.5)
	ctx.textAlign="right"
	ctx.font=txtSize*.7+'px arial';			
	
	ctx.fillText(maxScale, -txtSize, maxScale*vScale)
	ctx.fillText(minScale, -txtSize, minScale*vScale);			
				
	for ( let i=0; i<=vStepCount; i++) {
		if ( i==0 ) { ctx.strokeStyle='black'; }
		else { ctx.strokeStyle='#D0D0D0'; }
		ctx.beginPath()
		ctx.moveTo(0,asdata.vStepSize * i*vScale + minScale*vScale)
		ctx.lineTo(cv.width*.8,asdata.vStepSize * i*vScale + minScale*vScale )
		ctx.stroke()
		ctx.fillText( Math.round((minScale + asdata.vStepSize * i) / magLin) * magLin , -txtSize, 
			(minScale + asdata.vStepSize * i)*vScale);	
	}

	ctx.strokeStyle='#808080'
	ctx.beginPath()
	ctx.moveTo(0,0)
	ctx.lineTo(cv.width*.8,0 )
	ctx.stroke()

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
		let out=""
		let fontSize = txtSize
		if (fontSize > 12 ) fontSize=12
		for ( i in pData.bars ) {
			l="<div style=\"display: inline-block;height:"+ txtSize +"px; width: "+txtSize*2 + "px; background-color: "+ colors[i] +"\"></div> "
			l+=pData.bars[i]
			l="<span style=\"text-decoration:none; font-size: "+ fontSize+"pt;\">"+ l +"</span>"
			out+=l+"<br>"
			
			
		}
		divlinks.innerHTML=out
	}
	
	let cumulativeOffset = function(element) {
		let top = 0, left = 0
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
	
	let getAreaId = function(ev) {
		
		let x=ev.pageX
		let y=ev.pageY
		let o=cumulativeOffset(ev.target); 
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
		let xclick = function(ev) {
			let a
			if(onclick) {
				if (( a=getAreaId(ev)) >=0)  {
					let area=sensitiveArea[a]
					onclick(area[4],area[5])
				}
			}
		}
		
		let xmousemove = function(ev) {
			if (getAreaId(ev) >=0) cv.style.cursor="pointer"
			else cv.style.cursor="auto"
		};			
		
		cv.addEventListener("click", xclick, false)
		cv.addEventListener("mousemove", xmousemove, false)
	}
	
	return div
}
		
nort.chart.pieChart = function( options, pData ) {
	let sorterFunc = function(v2,v1) {
		if (v1[1] == v2[1]) return 0
		else if (v1[1] >= v2[1]) return 1
		else return -1
	}
	
	let cv=$canvas()
	let div=$div({}, cv)
	
	let sensitiveArea=[]
	let onclick
	let title=""
	
	cv.width=options.size ? options.size : 100
	cv.height=options.size ? options.size : 100
	let withLinks=options.withLinks ? true: false
	let maxSlices=options.maxSlices ? options.maxSlices : 12
	
	if (options.divStyle) div.setAttribute('style',options.divStyle)
	if (options.id) div.setAttribute('style',options.id)
	if (options.onclick) onclick=options.onclick
	if (options.title) title=options.title
	div.style.display="inline-block"
	div.style.whiteSpace='nowrap'
	
	cv.style.display="inline-block"
	let ox=cv.width*0.5
	let oy=cv.height*0.55
	
	ctx = cv.getContext("2d")
	let txtSize = cv.height/20
	if (txtSize> 15) txtSize=15
	ctx.textAlign="center"
	ctx.textBaseline="middle";		
	ctx.font=txtSize*1.3+'px arial'
	ctx.fillText(title,cv.width/2,cv.height*0.05)
		
	
	ctx.textAlign="right"
	ctx.font=txtSize*.7+'px arial';				
	ctx.translate (ox, oy)
				
	let denom = 0
	let begin = 0
	let other = 0
	pData=pData.sort(sorterFunc)
	let data=Array()
	for ( i in pData ) {
		denom += pData[i][1]
		if (i >=maxSlices || pData[i][1]/denom < 0.02) { other+=pData[i][1]; }
		else { data[i]=pData[i]}
	}
	if (other > 0)  data[i+1]=['Other',other, 'purple']
	
	//data=pData
	
	begin=denom/2
	
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
			let tx=cv.height*.4*Math.cos((begin+data[i][1]/2)*2*Math.PI/denom)
			let ty=cv.height*.4*Math.sin((begin+data[i][1]/2)*2*Math.PI/denom)
			ctx.fillText(Math.floor(data[i][1]/denom*100) +"%", tx, ty )
			if (onclick) {
				sensitiveArea.push([ox+tx-txtSize,oy+ty-txtSize/2,ox+tx+txtSize,oy+ty+txtSize/2,data[i][0]]) 
			}		
		}
		begin = begin + data[i][1]
	}

	ctx.moveTo(0,0)
	ctx.fillStyle='white'
	ctx.arc(0,0,cv.height/2*.3,0,2*Math.PI )
	ctx.fill()


	
	if (withLinks) {
		divlinks=$div()
		divlinks.style.font=txtSize+"pt arial"
		divlinks.style.verticalAlign="top"
		divlinks.style.paddingTop=cv.height/10+'px'
		divlinks.style.display="inline-block"
		div.appendChild(divlinks)
		let out=""
		let l
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
	
	let cumulativeOffset = function(element) {
		let top = 0, left = 0
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
	
	let getAreaId = function(ev) {
		
		let x=ev.pageX
		let y=ev.pageY
		let o=cumulativeOffset(ev.target); 
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
		let xclick = function(ev) {
			let a
			if(onclick) {
				if (( a=getAreaId(ev)) >=0)  {
					let area=sensitiveArea[a]
					onclick(area[4])
				}
			}
		}
		
		let xmousemove = function(ev) {
			if (getAreaId(ev) >=0) cv.style.cursor="pointer"
			else cv.style.cursor="auto"
		};			
		
		cv.addEventListener("click", xclick, false)
		cv.addEventListener("mousemove", xmousemove, false)
	}
	
	return div
}
