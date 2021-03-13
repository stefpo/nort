Date.prototype.addMilliseconds = function(n) {
    return new Date(this.getTime() + n)
}
Date.prototype.addSeconds = function(n) {
    return new Date(this.getTime() + n *1000 )
}    
Date.prototype.addMinutes = function(n) {
    return new Date(this.getTime() + n *60000 )
}  
Date.prototype.addHours = function(n) {
    return new Date(this.getTime() + n * 3600000 )
}      
Date.prototype.addDays = function(n) {
    return new Date(this.getTime() + n * 86400000 )
}         
Date.prototype.addWeeks = function(n) {
    return new Date(this.getTime() + n * 86400000 * 7  )
} 

Date.prototype.addMonths = function(n) {
    let d = new Date(this)
    let m = d.getUTCMonth() + n
    let y = d.getUTCFullYear() + Math.trunc(m/12)
    m = m %12 
    if (m < 0 ) {
        m = m + 12
        y--
    }

    d.setMonth( m )
    d.setUTCFullYear( y )
    return d
}

Date.prototype.addYears = function(n) {
    let d = new Date(this)
    d.setUTCFullYear( d.getUTCFullYear() + n)
    return d
}

Date.prototype.diffMilliseconds = function(fromDate) {
    return Math.trunc( this.getTime() - fromDate.getTime() )
}
Date.prototype.diffSeconds = function(fromDate) {
    return Math.trunc( (this.getTime() - fromDate.getTime()) / 1000 )
}    
Date.prototype.diffMinutes = function(fromDate) {
    return Math.trunc( (this.getTime() - fromDate.getTime()) / 60000 )
}       
Date.prototype.diffHours = function(fromDate) {
    return Math.trunc( (this.getTime() - fromDate.getTime()) / 3600000 )
}    
Date.prototype.diffDays = function(fromDate) {
    return Math.trunc( (this.getTime() - fromDate.getTime()) / 86400000 )
}     

Date.prototype.diffWeeks = function(fromDate) {
    return Math.trunc( (this.getTime() - fromDate.getTime()) / 86400000 / 7 )
}  

Date.prototype.diffMonths = function(fromDate) {
    return ( this.getUTCFullYear() * 12 + this.getMonth() )  - (fromDate.getUTCFullYear() * 12 + fromDate.getMonth())
}

Date.prototype.diffYears = function(fromDate) {
    return Math.trunc( this.getUTCFullYear() - fromDate.getUTCFullYear() )
}
