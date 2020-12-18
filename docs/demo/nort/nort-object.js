/*!
 * NORT web UI component library
 * Copyright(c) 2019 Stephane Potelle 
 * MIT Licensed
*/

/*!
 * $modulename
 * Copyright(c) 2019 Stephane Potelle 
 * MIT Licensed
*/

nort.object={}

nort.object.merge = function(dest, source, createProperties, intersect) {
    if (typeof(source)=='object') {
        for (const k of Object.keys(source)) {
            let d=dest[k];
            if (d != undefined || createProperties) {
                let s=source[k];

                if (typeof(d)==typeof(s) || d ==undefined ) {
                    if (Array.isArray(source[k])) {
                        d=[];
                        for (let i=0; i<s.length; i++) d.push(s[i]);
                        dest[k]=d;
                    } else {
                        dest[k]=s;
                    }
                } 
            }
        }
        if (intersect) intersect(dest, source) 
        return true;
    } else {
        return false;
    }
}

nort.object.intersect = function(dest, source) {
    for (const k of Object.keys(dest)) {
        if ( source[k] === undefined ) {
            delete dest[k]
        }
    }
}

nort.object.clone = function(v) {
    n = {};
    Object.setPrototypeOf(n,Object.getPrototypeOf(v));
    merge(n,v,true);
    return n;
}




