
autoScaleX = function(minValue, maxValue) {

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

autoScale = function(minValue, maxValue) {

    function lgt(x) {  return Math.log(x)/ Math.log(10) }
    /*function mag(x) {  return Math.floor(lgt(Math.abs(x))) | 0 } 
    function oom(x) { return Math.pow(10, Math.floor( lgt(Math.abs(x)))) }*/

	var mag1=Math.floor(lgt( Math.min(Math.abs(maxValue),Math.abs(minValue)))) |0
    var mag2=Math.floor(lgt( Math.max(Math.abs(maxValue),Math.abs(minValue))/1.51 )) |0
    
	var magLin
	var vStepCount=0
	var maxScale
	var minScale
	
	var mag
	if (mag1 == mag2 ) {
		mag=lgt(Math.abs(maxValue-minValue)) |0
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

autoScaleXX = function(minValue, maxValue) {
    function lgt(x) {  return Math.log(x)/ Math.log(10) }
    function oom(x) { return Math.pow(10, Math.floor( lgt(Math.abs(x)))) }

    let maxoom = oom( maxValue / 1.51 ) 
    let minoom = oom( minValue / 1.51 ) 
    let diffoom = oom( maxValue - minValue ) 
    let useoom 

    if ( minValue * maxValue >=0 ) {
        useoom = diffoom /2
    } else {
        useoom = Math.max(maxoom, minoom) /2 
    }

    var maxScale = Math.ceil( maxValue / useoom ) * useoom 
    var minScale = Math.floor( minValue / useoom ) * useoom
    var vStepCount =  (maxScale - minScale) / useoom
    while (vStepCount > 8 ) vStepCount = vStepCount / 2

    ret = {
        minValue: minValue,
        maxValue: maxValue,
        minScale: minScale,
        maxScale: maxScale,
        magLin: useoom,
        vStepCount: parseInt(vStepCount, 10),
        vStepSize: (maxScale - minScale) / vStepCount
    }
    
    return { ret }
    
}


autoScaleS1 = function(minValue, maxValue) {
    function lgt(x) {  return Math.log(x)/ Math.log(10) }
    function oom(x) { return Math.pow(10, Math.floor( lgt(Math.abs(x)))) }

    let useoom = oom( maxValue - minValue ) 
    let  vStepCount 


    while ( (vStepCount = (maxValue - minValue) / useoom ) <5 ) useoom = useoom / 2


    var maxScale = Math.ceil( maxValue / useoom ) * useoom 
    var minScale = Math.floor( minValue / useoom ) * useoom

    vStepCount = ( maxScale - minScale ) / useoom

    ret = {
        minValue: minValue,
        maxValue: maxValue,
        minScale: minScale,
        maxScale: maxScale,
        magLin: useoom,
        vStepCount: parseInt(vStepCount, 10),
        vStepSize: (maxScale - minScale) / vStepCount
    }
    
    return { ret }
    
}



console.log (JSON.stringify (autoScaleX(0, 65)))
console.log (JSON.stringify (autoScale(0, 65)))

console.log (JSON.stringify (autoScaleX(0, 130)))
console.log (JSON.stringify (autoScale(0, 130)))




