
tb = nort.elements.textbox

class Application   {
    init() {
        nort.translations.default = {
            general: {
                manuf: "Manufacturer Name",
                model: "Model Number",
                serial: "Serial Number",
                allocation: "Ownership"
            }
        }
        
        nort.translations.fr = {
            general: {
                manuf: "Fabricant",
                model: "Modèle",
                serial: "No de série",
                update: "Envoi"
            }
        }    
        
        

        this.f1 = new AssetForm()
        this.f2 = new AssetForm()
        this.f3 = new GraphDemo()
    }

    activate() {
        this.f1.fill( {
            manuf : "HP", model: "34401A", serial: "US12345678", status: "ACTIVE", srvdate: new Date(Date.parse("2012-02-05"))
        })
    }

    render() {
        return  nort.elements.scrollPane({style: 'padding: 20px; display: flex; flex-direction:column; max-width: 1024px; margin:auto;'}, 
        $div ({style: "display: flex; "}, $img({src:"css/nort-logo.png",style:"align-self: center;"} ), $h2({style:"align-self: center;"}," Nort full set demo") ),
        nort.elements.tabber({ style: "flex-grow:1"}, [
                { label: "A form",  page: this.f1 },
                { label: "Another form",  page: this.f2 },
                { label: "The charting set",  page: this.f3 },
                { label: "HTTP Client",  page: new ClientDemo() },
                { label: "Grid",  page: new GridDemo() }
            ])
    )
    }
}



