const PATHS = {
    login: {
        template: 'html/login.php',
        script: async () => {

            myModal.show()

            sessionStorage['paginaActual'] = 'login';
          
        },
    },
    contrologin: {
        template: 'controller/contrologin.php',
        script: async () => {

            myModal.show()

            sessionStorage['paginaActual'] = 'contrologin';
            document.getElementById("Menu").classList.remove("ocultar");

            const tag = document.getElementById('asignadosCAPITAL')

            if (tag) {
                const padre = tag.parentNode
                padre.removeChild(tag)
            }

            let script = document.createElement("script");
            script.src = "js/asignadosCAPITAL.js";
            script.id = 'asignadosCAPITAL'
            document.body.appendChild(script);
            const url = 'https://api-itop-sit.herokuapp.com/tickets?id_grupo=98&estado=asignado';



            await fetch(url)
                .then(response => response.json())
                .then(data => tablaAsignados(data))
            myModal.toggle()
        

        }
    },

    inicio: {
        template: 'html/inicio.php',
        script: async () => {

            myModal.show()
//            document.getElementById("Menu").classList.remove("ocultar");
            sessionStorage['paginaActual'] = 'inicio';

            const tag = document.getElementById('inicio')
            if (tag) {
                const padre = tag.parentNode
                padre.removeChild(tag)
            }

            let script = document.createElement("script");
            script.src = "js/inicio.js";
            script.id = 'inicio'
            document.body.appendChild(script);

            await fetch('https://api-conectividad.herokuapp.com/incidencias')
                .then(response => response.json())
                .then(data => cargaTablero(data))
        }
    },

    asignadosCAPITAL: {
        template: 'html/asignadosCAPITAL.html',
        script: async () => {
            myModal.show()

            sessionStorage['paginaActual'] = 'asignadosCAPITAL';

            const tag = document.getElementById('asignadosCAPITAL')

            if (tag) {
                const padre = tag.parentNode
                padre.removeChild(tag)
            }

            let script = document.createElement("script");
            script.src = "js/asignadosCAPITAL.js";
            script.id = 'asignadosCAPITAL'
            document.body.appendChild(script);

            const url = 'https://api-itop-sit.herokuapp.com/tickets?id_grupo=127&estado=asignado';            

            let Paginado;
            let TotalCasos=Array();

            await fetch(url)
                .then(response => response.json())
                .then(data=> Paginado=data)
                if (Paginado.total_paginas != 1)
                {
                    let Casos;
                    let PaginaAct=1;
                //    console.log("EN IF" +PaginaAct+"//"+Paginado.total_paginas )

                    while (PaginaAct != Paginado.total_paginas) 
                    {
                        await fetch(url+'&pagina='+PaginaAct)
                        .then(response => response.json())
                        .then(data => Casos=data)
                        if (TotalCasos.length!=0) 
                        {
                            Largo=TotalCasos.data.length-1;
                            let i=0;
                            Casos.data.forEach(Casos =>
                                {
                  //                  console.log(Casos);
                                    Largo++;
                                    TotalCasos.data[Largo]=Casos
                                    

                                })
                        }
                        else
                        {
                            TotalCasos=Casos;
                        }
                        PaginaAct ++;
                    //    console.log(TotalCasos);
                      //  console.log("EN while");

                    }
                tablaAsignados(TotalCasos);

            }    
            else
            {
                await fetch(url)
                .then(response => response.json())
                .then(data => tablaAsignados(data))
            }    
                
                //.then(data => tablaAsignados(data))
            myModal.toggle()
        }
    },

    asignadosINTERIOR: {

        template: 'html/asignadosINTERIOR.html',
        script: async () => {
//            document.getElementById("Menu").classList.remove("ocultar");
            myModal.show()

            sessionStorage['paginaActual'] = 'asignadosINTERIOR';

            const tag = document.getElementById('asignadosCAPITAL')

            if (tag) {
                const padre = tag.parentNode
                padre.removeChild(tag)
            }

            let script = document.createElement("script");
            script.src = "js/asignadosCAPITAL.js";
            script.id = 'asignadosCAPITAL'
            document.body.appendChild(script);
            const url = 'https://api-itop-sit.herokuapp.com/tickets?id_analista=101&estado=asignado';


            let Paginado;
            let TotalCasos=Array();

            await fetch(url)
                .then(response => response.json())
                .then(data=> Paginado=data)
                if (Paginado.total_paginas != 1)
                {
                    let Casos;
                    let PaginaAct=1;
                //    console.log("EN IF" +PaginaAct+"//"+Paginado.total_paginas )

                    while (PaginaAct != Paginado.total_paginas) 
                    {
                        await fetch(url+'&pagina='+PaginaAct)
                        .then(response => response.json())
                        .then(data => Casos=data)
                        if (TotalCasos.length!=0) 
                        {
                            Largo=TotalCasos.data.length-1;
                            let i=0;
                            Casos.data.forEach(Casos =>
                                {
                  //                  console.log(Casos);
                                    Largo++;
                                    TotalCasos.data[Largo]=Casos
                                    

                                })
                        }
                        else
                        {
                            TotalCasos=Casos;
                        }
                        PaginaAct ++;
                    //    console.log(TotalCasos);
                      //  console.log("EN while");

                    }
                tablaAsignados(TotalCasos);

            }    
            else
            {
                await fetch(url)
                .then(response => response.json())
                .then(data => tablaAsignados(data))
            }    
                
                //.then(data => tablaAsignados(data))
            myModal.toggle()
        }
    },

    infoConectividad: {
        template: 'html/infoConectividad.html',
        script: () => {
//            document.getElementById("Menu").classList.remove("ocultar");
            sessionStorage['paginaActual'] = 'infoConectividad';

            const tag = document.getElementById('infoConectividad')
            if (tag) {
                const padre = tag.parentNode
                padre.removeChild(tag)
            }
            let script = document.createElement("script");
            script.src = "js/infoConectividad.js";
            script.id = 'infoConectividad'
            document.body.appendChild(script);
        }
    }
    asignadosTELEFONIA: {
        //        template: 'html/contrologin.php',
        
        
        template: 'html/asignadosCAPITAL.html',
        script: async () => {
            //            document.getElementById("Menu").classList.remove("ocultar");
            myModal.show()

            sessionStorage['paginaActual'] = 'asignadosCAPITAL';

            const tag = document.getElementById('asignadosCAPITAL')

            if (tag) {
                const padre = tag.parentNode
                padre.removeChild(tag)
            }

            let script = document.createElement("script");
            script.src = "js/asignadosCAPITAL.js";
            script.id = 'asignadosCAPITAL'
            document.body.appendChild(script);

            const url = 'https://api-itop-sit.herokuapp.com/tickets?id_grupo=172&estado=asignado';

            let TotalCasos = Array();

            await fetch(url)
                .then(response => response.json())
                .then(data => TotalCasos = data)
            if (TotalCasos.total_paginas == 0) {
                tablaAsignados(TotalCasos);

            }
            else {
                let ARRespuesta;
                let Largo = TotalCasos.length;;
                ARRespuesta = await LlamarApi(url, TotalCasos.total_paginas)

                console.log("ACA")
                console.log(ARRespuesta)
                ARRespuesta.forEach(Rta => {
                    Largo = TotalCasos.data.length - 1;
                    let i = 0;
                    Rta.data.forEach(Casos => {
                        //                  console.log(Casos);
                        Largo++;
                        TotalCasos.data[Largo] = Casos


                    })
                })
            }
            //    console.log(TotalCasos)
            tablaAsignados(TotalCasos);
            myModal.toggle()
        }
    },





}  