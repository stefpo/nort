
function extractDocComments(funcStr){
    let lines=funcStr.split("\n")
        .map(x => x.replace("\t","").trim())

    let docComments = []

    let i = lines.findIndex( x=> x.endsWith("{"))

    while(i>=0) {
        i++
        if ( i >= lines.length ) break
        if (! lines[i].startsWith("//")) break
        else {
            docComments.push(lines[i])
        }
    }

    return docComments.map(x => x.replace("//","").trim()).join("\n")
}

function extractFunctionDocumentation(func) {
    // 1. Convert the function to a string
    const funcString = func.toString();
    let args
    let argsString

    // 2. Regex to reliably extract the content inside the first parenthesis pair of the function definition.
    // Example: 'function calculateArea(width, height) { ... }' -> captures 'width, height'
    // Example: 'constructor(id, name = "Anon")' -> captures 'id, name = "Anon"'
    const ARGS_MATCH = funcString.match(/\(([^)]*)\)/);

    //const docComments = funcString.match(/[{]\s+\/\/(.+\n\s*)+/);
    const docComments = extractDocComments(funcString)

    // If the regex fails to find parentheses (e.g., single-argument arrow function without parentheses, or heavy minification)
    if (!ARGS_MATCH || ARGS_MATCH.length < 2) {
        // Fallback to generic names based on arity (number of defined arguments)
        argsString= Array.from({ length: func.length }, (_, i) => `arg${i + 1}`).join(", ")
    } else {
        argsString = ARGS_MATCH[1]; // The captured argument list string
    }

    if (argsString.trim().length === 0) {
        args=[]
    } else {
    // 3. Clean up the argument string to remove defaults and rest parameters
    args= argsString.split(',')
        .map(arg => arg.trim())
        .map(arg => {
            // Remove everything after '=' (default values: 'name = "Anon"' -> 'name')
            let name = arg.split('=')[0].trim();
            // Remove '...' for rest parameters ('...messages' -> 'messages')
            if (name.startsWith('...')) {
                name = name.substring(3);
            }
            // Keep destructuring as-is for display (e.g., {a, b})
            if (name.startsWith('{') || name.startsWith('[')) {
                return name; 
            }
            return name;
        })
        .filter(name => name.length > 0);
    }

    let type

    if (funcString.startsWith("class")) type="class"
    else type="function"


    return {name: func.name, type: type, signature: `${type} ${func.name}(${args.join(", ")})`, doc: docComments, object: func}
}

function getModuleObjects(mod) {
    let moduleObjects=[]
    for (let x of Object.keys(mod)) {
        let f=mod[x]
        if (typeof(f) == "function" ) {
            let fi = extractFunctionDocumentation(f)
            moduleObjects.push(fi)
        }
    }
    return moduleObjects
}

function getClassMethods(cls){
    let ret={ constructor: null, name: null, doc: null, staticMethods: [], methods: [] }
    const excludedKeys = ['length', 'prototype', 'name', 'arguments', 'caller']
    for ( let mn of Object.getOwnPropertyNames(cls)) {
        if (excludedKeys.includes(mn)) continue
        
        let func = cls[mn]
        let methodInfo = extractFunctionDocumentation(func)
        methodInfo.signature = methodInfo.signature.replace("function ","static ")
        ret.staticMethods.push(methodInfo)
    }      
    for ( let mn of Object.getOwnPropertyNames(cls.prototype)) {
        let func = cls.prototype[mn]
        let methodInfo = extractFunctionDocumentation(func)
        if (methodInfo.type == "class") {
            ret.constructor=methodInfo.signature
            ret.name=methodInfo.name
            ret.doc=methodInfo.doc
        } else {
            methodInfo.signature = methodInfo.signature.replace("function ","")
            ret.methods.push(methodInfo)
        }
        
    }    
    return ret
}

async function getModuleInfo(modName, rootDir) {
    let ret = { name: modName, classes: [], functions: [] } 
    let modFile = `${rootDir}/${modName}.js`
    let mod = await import(modFile)
    let moduleObjects=getModuleObjects(mod)

    ret.functions = moduleObjects.filter(x => x.type== 'function' )
    ret.classes = moduleObjects.filter(x => x.type== 'class' ).map(x => getClassMethods(x.object))
    return ret
}

export async function getInfo(modules, rootDir) {
    if (! rootDir ) rootDir = "."
    let ret = []
    for (let mod of modules ) {
        ret.push( await getModuleInfo(mod, rootDir) )
    }
    return ret
}