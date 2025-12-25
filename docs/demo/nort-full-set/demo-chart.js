import * as components from "./nort/nort-components-form.js" 
import * as charts from "./nort/nort-elements-chart.js" 

export class GraphDemo extends components.Form {
    constructor(properties) {
        super(properties)
    }

    renderFormContent() {
        var pieData = [
            ['Part 1', 12, '#ff0000','javascript:alert(1)'],
            ['Part 2', 33, '#00ff00','javascript:alert(2)'],
            ['Part 3', 52, '#0000ff','javascript:alert(3)'],
            ['Part 4', 41, '#C0C0ff','javascript:alert(4)'],
            ['Part 1', 12, '#ff0000','javascript:alert(1)'],
            ['Part 1', 12, '#ff0000','javascript:alert(1)'],
            ['Part 1', 8, '#ff0000','javascript:alert(1)'],
            ['Part 1', 2, '#ff0000','javascript:alert(1)'],
            ['Part 1', 12, '#ff0000','javascript:alert(1)']]
        
        var cumBarData={
            bars:['Volume1','Volume2','volume3'],
            data:[['Jan', 13],
                ['Feb', 18,34],
                ['Mar', 43,78,12],
                ['Apr', 8],
                ['May', 52],
                ['Jun', 68],
                ['Jul', 6, 4],
                ['Aug', 33,17,67],
                ['Sep', 86],
                ['Oct', 16],
                ['Nov', 32],
                ['Dec', 48]]
        }

        var barData={
            bars:['Volume1','Volume2','volume3'],
            data:[['Jan', 13],
                ['Feb', 18,34],
                ['Mar', 43,78,12],
                ['Apr', -8],
                ['May', 52],
                ['Jun', 68],
                ['Jul', 6, -4],
                ['Aug', 33,17,67],
                ['Sep', 86],
                ['Oct', -16],
                ['Nov', 32],
                ['Dec', 48]]
        }        
    return [
        charts.pieChart({ 'title':'A pie chart','size': 210   ,'withLinks': true, 'onclick': function(a){ alert(a); } }, pieData ),
        charts.barGraph({ 'title':'A bar chart','height': 200, 'width': 350 ,'withLinks': true, colors: ['blue','orange','#00ff00'], 'onclick': function(b,r){ alert(b+' '+r) } }, barData ),
        charts.cumulatedBarGraph({ 'title':'A stack chart','height': 200, 'width': 350 ,'withLinks': true, colors: ['blue','orange','#00ff00'] , 'onclick': function(b,r){ alert(b+' '+r) } },cumBarData ),
        charts.pieChart({ 'title':'A pie chart','size': 210,'withLinks': true, 'onclick': function(a){ alert(a); } }, pieData )
    ]
    }
}