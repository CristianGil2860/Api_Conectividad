
function panelMostrar(data){
    console.log(data);
}

async function tablaAsignados(rta){

    let incidenciasCreadas = JSON.parse(sessionStorage.getItem('incidenciasCreadas'));
    
    let provisorio = rta; 
    
    //console.log(provisorio);
    //compare(rta['data'], incidenciasCreadas);
    let incidenciasCreadas2;

  // COMENTO ESTO PARA QUE NO ELIMINE LOS TKT QUE TIENEN INCIDENCIAAS ABIERTAS - POR QUE NO COMENTARON NADA LCDSM
/*    for(var i = 0; i < incidenciasCreadas.length; i++){
      for(var j = 0; j < provisorio['data'].length; j++){

        //console.log(rta['data'][j].nro_ticket); 
             
        if(provisorio['data'][j].nro_ticket == incidenciasCreadas[i]){

            provisorio['data'].splice(j,1);
            //delete provisorio['data'][j];
        }
        
     }
    }
*/    

let data = provisorio['data'];

//////////////////////////// recibo las incidencias abiertas 
 await fetch('https://api-conectividad.herokuapp.com/incidencias')
 .then(res => res.json())
 .then(data => incidenciasCreadas2 = data)
 incidenciasCreadas2= incidenciasCreadas2.resultados;

//console.log("INCIDENCIAS");  // MARCADOR 
//console.log(incidenciasCreadas2);
///////

//console.log(data);

    let cuerpo = document.getElementById('bodyAsignadosCAPITAL');   

    data.sort((a,b) =>{

        if(convertFromStringToDate(a.fecha_ult_act) < convertFromStringToDate(b.fecha_ult_act) ){
            return -1
        } 
        if(convertFromStringToDate(a.fecha_ult_act)  > convertFromStringToDate(b.fecha_ult_act) ){
            return 1
        }

        return 0
    }); 

    let casoItop = {};
//console.log (data);
     data.forEach(ITOP => {
        var incidenciaAct

        incidenciaAct=000
        // METO UN forEach para recorrer lo que hay en incidencias para agregarlo al CasoITOP
        // Calculo que hay una mejor forma pero funciona por ahora
        
        incidenciasCreadas2.forEach(INC =>{
            
            if (INC.ticket_itop == ITOP.nro_ticket)
             {
                //console.log("SI " + INC.ticket_itop );
                incidenciaAct = INC.id; } 
            else {
//                console.log (INC.ticket_itop + " NO  " + ITOP.nro_ticket );
              }
        }
            )
            


/////////////////////////////////////////////////////////////////////////////////////////////////////////////

        casoItop = {

            'ESCUELA': ITOP.asistencia != null ? ITOP.asistencia.id_escuela : 000,
            'Nro': ITOP.nro_ticket,
            'TITULO' : ITOP.titulo,
            'CREACION' : ITOP.fecha_creacion,
            'ACTUALIZACION' : ITOP.fecha_ult_act,
            'DIAS' : tiempoTranscurrido(ITOP.fecha_creacion),
            'INC' : incidenciaAct
         }
        
         console.log(casoItop);

      let fila =  crearFila(casoItop);
      cuerpo.appendChild(fila);   
    
    });   
   
    let ultimaCol = document.createElement('tr');
    ultimaCol.setAttribute('class','noSearch hide text-center');
    let ultimaFila = document.createElement('td');
    ultimaFila.setAttribute('colspan', '10');

    ultimaCol.appendChild(ultimaFila);
    cuerpo.appendChild(ultimaCol);   

        }

  
function tiempoTranscurrido(creacion){

    let nacimiento = convertFromStringToDate(creacion);
    let hoy = new Date()
    
    tiempoPasado =  hoy - nacimiento;


    var segs = 1000;
    var mins = segs * 60;
    var hours = mins * 60;
    var days = hours * 24;
    var months = days * 30.416666666666668;
    var years = months * 12;

    
    var anos = Math.floor(tiempoPasado / years);
    tiempoPasado = tiempoPasado - (anos * years);

    var meses = Math.floor(tiempoPasado / months)

    tiempoPasado = tiempoPasado - (meses * months);
    var dias = Math.floor(tiempoPasado / days)

    return dias;
}        


function crearFila(casoItop){

    //console.log("crearFila"+ casoItop['Nro']);

    let fila = document.createElement('tr');

    let col0 = document.createElement('td');
    col0.innerHTML = casoItop['Nro'];
    
    let col1 = document.createElement('td');
    col1.innerHTML = casoItop['TITULO'];

    let col2 = document.createElement('td');
    col2.innerHTML = casoItop.CREACION;
    

    let col3 = document.createElement('td');
    col3.innerHTML =  casoItop['ACTUALIZACION'];

    //DIAS

    let dias = casoItop.DIAS;

    if(dias == 0 ){
        fila.classList.add("table-primary");
    }else if( dias > 0 && dias < 10){
        fila.classList.add("table-success");
    }else if(dias >= 10 && dias < 20){
        fila.classList.add("table-warning");
    }else if(dias >= 20){
        fila.classList.add("table-danger");  
    }
    let col4 = document.createElement('td');
    col4.innerHTML = dias;

    let col5 = document.createElement('td');
    col5.classList.add("hide");
    col5.innerHTML = casoItop.ESCUELA;

    let col6 = document.createElement('td');
    col6.innerHTML = casoItop['INC'] ;

    fila.appendChild(col0);
    fila.appendChild(col1);
    fila.appendChild(col2);
    fila.appendChild(col3);
    fila.appendChild(col4);
    fila.appendChild(col5);
    fila.appendChild(col6);
    
    return fila
}

function convertFromStringToDate(responseDate) {

    //console.log("convertFromStringToDate"+ responseDate);
    
    let dateComponents = responseDate.split(' ');
    let datePieces = dateComponents[0].split("-");
    let timePieces = dateComponents[1].split(":");

    return(new Date(datePieces[2], (datePieces[1] - 1), datePieces[0], timePieces[0], timePieces[1], timePieces[2]))
  }


  document.getElementById("bodyAsignadosCAPITAL").addEventListener('click', function(e){
    
    myModal.show()

    setTimeout( async function() {

        var titulo = document.getElementById('tituloAsignadosCAPITAL');
        var tablaAsignados = document.getElementById('tablaAsignadosCAPITAL');
        var contBuscar = document.getElementById('contBuscar');
        var nuevaIncidencia = document.getElementById('nuevaIncidencia');
    
        const html = await fetch ('html/nuevaIncidencia.html')
        .then(response => response.text());
        nuevaIncidencia.innerHTML = html;
        
        titulo.classList.add("hide");
        contBuscar.classList.add("hide");
        tablaAsignados.classList.add("hide");
    
        for (let i = 0; i < e.path.length; ++i) {
            if (e.path[i].tagName == "TR") {
    
                let nroTicket = e.path[i].getElementsByTagName("td")[0];
                let id_escuela = e.path[i].getElementsByTagName("td")[5];
                console.log(id_escuela)
                 
    
                await fetch('https://api-conectividad.herokuapp.com/incidencias')
                .then(res => res.json())
                .then(data => incidenciasCreadas2 = data)
                console.log("INC");
                //console.log(incidenciasCreadas2);
   
                
                await fetch('https://api-itop-sit.herokuapp.com/tickets?nro_ticket='+nroTicket.textContent)
                .then(response => response.json()) 
                .then(data => cargarTicket(data,incidenciasCreadas2))  

                             
                 if(id_escuela.textContent == 0){
                    cargarEscuela(false)
                }else{
                    await fetch('https://escuelas.sit.net.ar/api/escuela/id/'+id_escuela.textContent)   
                    .then(response => response.json())
                    .then(respuesta =>cargarEscuela(respuesta))  
             
                }                 
                //await fetch('https://api-conectividad.herokuapp.com/incidencias?id'+id_escuela.textContent)   
                  //  .then(response => response.json())
                    //.then(respuesta =>cargarEscuela(respuesta))
            }
          }
    }, 2000);

           
});

function cargarTicket(rta,incidencias){

    let data = rta['data'];
    let Inc =incidencias.resultados;
    
    data.forEach(ticket => {

       // REPITO LA FUNCION DE ARRIBA NO SE COMO QUEDARA - FUNCIONA
       incidenciaAct=000
       Inc.forEach(INC =>{
           if (INC.ticket_itop == ticket.nro_ticket)
            {

                var descripcionInc = document.getElementById('inputDescripcionInc');
                var inputTipoInc = document.getElementById('inputTipoInc');
                var EstadoInc = document.getElementById('inputEstadoInc');
                var inputInc = document.getElementById('NIncidencia');
               inputInc.value = INC.id ;
               //console.log(INC.descripcion)
               inputTipoInc.value = INC.categoria.descripcion;
               descripcionInc.value = INC.descripcion;
               var Lmovimiento=INC.movimientos.length;
               EstadoInc.value = INC.movimientos[Lmovimiento-1].estado.descripcion ;
               console.log("TKT-INC")
           } 
           else {
               var inputInc = document.getElementById('NIncidencia');
                console.log(INC.ticket_itop + " "+ ticket.nro_ticket )
              }
        }
            )


         
          var inputTkt = document.getElementById('inputTkt');
         inputTkt.value = ticket.nro_ticket;

         var inputTitulo = document.getElementById('inputTitulo');
         inputTitulo.value = ticket.titulo; 

         var areaDescripcion = document.getElementById('areaDescripcion');
         areaDescripcion.innerHTML = ticket.descripcion;

         var inputTipo = document.getElementById('inputTipo');
         inputTipo.value = ticket.servicio;

         var inputSub = document.getElementById('inputSub');
         inputSub.value = ticket.subservicio;

         var ultimaActualizacion = document.getElementById('ultimaActualizacion');
         ultimaActualizacion.innerHTML = "Actualizacion: "+ticket.fecha_ult_act;

     });


}

function cargarEscuela(respuesta){
   
    cargarConectidadidCBA(respuesta.data[0].cue.conectividad_provincia[0]);
    cargarConectidadidNACION(respuesta.data[0].cue.conectividad_nacion[0]);

    var btnCUE = document.getElementById('btnCUE');
    var inputCUE = document.getElementById('inputCUE');
    var inputCUEInc = document.getElementById('inputCUEInc');
    var inputNIVEL = document.getElementById('inputNIVEL');
    var inputCODIGO_EMPRESA = document.getElementById('inputCODIGO_EMPRESA');
    var inputNOMBRE = document.getElementById('inputNOMBRE');
    var inputDEPARTAMENTO = document.getElementById('inputDEPARTAMENTO');
    var inputLOCALIDAD = document.getElementById('inputLOCALIDAD');

 
    var lblCODIGO_EMPRESA = document.getElementById('lblCODIGO_EMPRESA');
    var lblNOMBRE = document.getElementById('lblNOMBRE');
    var lblDEPARTARMENTO = document.getElementById('lblDEPARTARMENTO');
    var lblLOCALIDAD = document.getElementById('lblLOCALIDAD');

    if(respuesta == false)
    {
            
            btnCUE.classList.remove("hide");
            inputCUE.removeAttribute('disabled');
            inputCUE.classList.add('is-invalid');


            inputCODIGO_EMPRESA.classList.add("hide"); 
            inputNOMBRE.classList.add("hide"); 
            inputDEPARTAMENTO.classList.add("hide");
            inputLOCALIDAD.classList.add("hide");

            lblNIVEL.classList.add("hide"); 
            lblCODIGO_EMPRESA.classList.add("hide"); 
            lblNOMBRE.classList.add("hide"); 
            lblDEPARTARMENTO.classList.add("hide");
            lblLOCALIDAD.classList.add("hide");

            myModal.toggle();
            inputCUE.focus();

            

    }
    else{

        var escuela = respuesta['data'][0]; 

            inputCUE.value = escuela.cue.cue;            
            inputCUEInc.value=escuela.cue.cue;
            inputNIVEL.value = escuela.nivel.nombre;
            inputCODIGO_EMPRESA.value  = escuela.codigo_empresa;           
            inputNOMBRE.value  = escuela.cue.nombre;            
            inputDEPARTAMENTO.value  = escuela.ubicacion.departamento.nombre;            
            inputLOCALIDAD.value  = escuela.ubicacion.localidad.nombre;

            sessionStorage.setItem('id_escuela', escuela.id);
           
        cargarFormulario();  
    }  
}  

function cargarConectidadidCBA(conectividad){

    console.log(conectividad);

    let inputTecnologia = document.getElementById('inputTecnologia');
    let inputEstado = document.getElementById('inputEstado');
    let inputCalidad = document.getElementById('inputCalidad');
    let inputSubida = document.getElementById('inputSubida');
    let inputBajada = document.getElementById('inputBajada');
    let inputPagador = document.getElementById('inputPagador');
    let inputProyecto = document.getElementById('inputProyecto');


    inputTecnologia.value = conectividad.tecnologia;
    inputEstado.value = conectividad.estado_escuela;
    inputCalidad.value = conectividad.calidad_de_servicio;
    inputSubida.value = conectividad.c_subida;
    inputBajada.value = conectividad.c_bajada;
    inputPagador.value = conectividad.pagador;
    inputProyecto.value = conectividad.proyecto;

}

function cargarConectidadidNACION(conectividad)
{   
        //let inputPredio = document.getElementById('inputPredio');
        //let inputProveedor = document.getElementById('inputProveedor');
        //let inputPiso = document.getElementById('inputPiso');
    
        //inputPredio.value = conectividad.id;
        //inputProveedor.value = conectividad.proveedor_internet_nacion.nombre;
        //inputPiso.value = conectividad.proveedor_piso_nacion.nombre


    

}

function cargarCategorias(categorias){
    
    var formulario = document.getElementById('formCarga');
    formulario.classList.remove("hide");

    sessionStorage.setItem('categorias', JSON.stringify(categorias));

    var selectCategorias = document.getElementById('selectCategoria');
    var seleccion = document.createElement('option');
    seleccion.innerHTML = "Seleccione una Categoria";

    selectCategorias.appendChild(seleccion);

    categorias['resultados'].forEach(categorias => {
        
        var option = document.createElement('option');
        option.value = categorias.id;
        option.innerHTML = categorias.descripcion;
       
        selectCategorias.appendChild(option);
    })

    myModal.toggle()

    }

    async function cargarFormulario(){
    
        await fetch('https://api-conectividad.herokuapp.com/categorias')   
        .then(response => response.json())
        .then(data => cargarCategorias(data))       
    
    }
    
    function cargarCategorias(categorias){
        
        var formulario = document.getElementById('formCarga');
        formulario.classList.remove("hide");
    
        sessionStorage.setItem('categorias', JSON.stringify(categorias));
    
        var selectCategorias = document.getElementById('selectCategoria');
        var seleccion = document.createElement('option');
        seleccion.value = 'select';
        seleccion.innerHTML = "Seleccione una Categoria";
    
        selectCategorias.appendChild(seleccion);
    
        categorias['resultados'].forEach(categorias => {
            
            var option = document.createElement('option');
            option.value = categorias.id;
            option.innerHTML = categorias.descripcion;
           
            selectCategorias.appendChild(option);
        })
    
        myModal.toggle()
    
        }

        function cargarProveedor(seleccion){

            var selectProveedor = document.getElementById('selectProveedor');
            selectProveedor.innerHTML = '';
            var selectEstado = document.getElementById('selectEstado');
            selectEstado.innerHTML = '';
        
            var resultado = JSON.parse(sessionStorage.getItem('categorias'));
            
            resultado['resultados'].forEach(categorias => {
        
                if(categorias.id == seleccion){
        
                    var selectProveedor = document.getElementById('selectProveedor');
                    var op_proveedor = document.createElement('option');
                    op_proveedor.value = 'select';
                    op_proveedor.innerHTML = "Seleccione un Proveedor";
                
                    selectProveedor.appendChild(op_proveedor);
                
                    categorias.proveedores.forEach( proveedores => {
                        
                        //console.log(proveedores.id);
        
                        var option = document.createElement('option');
                        option.value = proveedores.id;
                        option.innerHTML = proveedores.nombre;
                       
                        selectProveedor.appendChild(option);
                    })
        
                    var selectEstados = document.getElementById('selectEstado');
                    var op_estados = document.createElement('option');
                    op_estados.value = 'select';
                    op_estados.innerHTML = "Seleccione un Estado";
                
                    selectEstados.appendChild(op_estados);
                
                    categorias.estados.forEach(estados => {
                        
                        var option = document.createElement('option');
                        option.value = estados.id;
                        option.innerHTML = estados.descripcion;
                       
                        selectEstados.appendChild(option);
                    })
                }  
            })
        }

async function cargarIncidencia(){

    let controlCargar = controlContenido();
    let incidencia_cargar; // LA DECLARO ACA PARA QUE SEA DE LA FUNCION ODIO JAVA!!!

    if(controlCargar){

        myModal.show()

            var inputTkt = document.getElementById('inputTkt'); 
            var areaDIncidencia = document.getElementById('areaDIncidencia');
            var selectCategoria = document.getElementById('selectCategoria');
            var selectProveedor = document.getElementById('selectProveedor');
            var selectselectEstado = document.getElementById('selectEstado');
            var inputNReclamo = document.getElementById('inputNReclamo');
            var inputInc = document.getElementById('NIncidencia');
            console.log(inputInc.value);

        if (inputInc.value == 000)
        {
            incidencia_cargar = {
    
                id_escuela: sessionStorage.getItem('id_escuela'), 
                ticket_itop: inputTkt.value,
                descripcion: areaDIncidencia.value,
                id_categoria: selectCategoria.options[selectCategoria.selectedIndex].value ,
                id_proveedor: selectProveedor.options[selectProveedor.selectedIndex].value, 
                nro_reclamo: inputNReclamo.value,
                id_estado: selectselectEstado.options[selectselectEstado.selectedIndex].value,
            };


                const respuesta_POST = await fetch('https://api-conectividad.herokuapp.com/incidencias', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(incidencia_cargar)
                  });
        
                  const content = await respuesta_POST.json();
    


            
            console.log(incidencia_cargar);

        }
        else {
            let incidencia_cargar ={
                    movimiento: {
                        estado: {id: selectselectEstado.options[selectselectEstado.selectedIndex].value},
                }};

            let  EstadoNuevo = selectselectEstado.options[selectselectEstado.selectedIndex].value;
            let  Nincidencia=inputInc.value;
            // ME CANSE DE RENEGAR CON EL POST UNO UN GET DESPUES VER BIEN ESTA PARTE
                fetch('frame.php?EstadoNuevo='+EstadoNuevo+'&Nincidencia='+Nincidencia,{
                    method: 'GET',
                });
                console.log("ELSE");
            };

    
//    console.log(incidencia_cargar);
/*
            const respuesta_POST = await fetch('https://api-conectividad.herokuapp.com/incidencias', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(incidencia_cargar)
              });
    
              const content = await respuesta_POST.json();
              
*/              
                await ROUTER.load('inicio'); 
    
              myModal.toggle()
        } 
        
    
    }

    function controlContenido(){

  
        var selectCategoria = document.getElementById('selectCategoria');
        let categoria = selectCategoria.options[selectCategoria.selectedIndex].value;

        if(categoria === 'select'){
            selectCategoria.focus();
                     
            return false;

          }else{

            let selectProveedor = document.getElementById('selectProveedor');
            let proveedor = selectProveedor.options[selectProveedor.selectedIndex].value;
    
            var areaDIncidencia = document.getElementById('areaDIncidencia');
    
            var selectselectEstado = document.getElementById('selectEstado');
            let estado = selectselectEstado.options[selectEstado.selectedIndex].value;

          if(proveedor === 'select'){
             selectProveedor.classList.add('is-invalid');
             selectProveedor.focus();
              return false;  
            }else if(areaDIncidencia.value == ''){
                selectProveedor.classList.remove('is-invalid');
                areaDIncidencia.classList.add('is-invalid');
                areaDIncidencia.focus();
                 return false; 
              }else if(estado === 'select'){
                selectProveedor.classList.remove('is-invalid');
                areaDIncidencia.classList.remove('is-invalid');
                selectselectEstado.classList.add('is-invalid');
                selectselectEstado.focus();
                  return false; 
              }else{
                 return true;
              }

          } 
          
   }

   async function cargarComentario(){

    let nro_ticket = document.getElementById("numTicket");  
    let txtPublica = document.getElementById("txtBPublica");
  
    instance.open();
  
    let url = 'https://api-itop-sit.herokuapp.com/tickets';
  
      if(txtPublica.value == ""){
        txtPublica.focus();
      }else{
       
     await fetch(url , {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
              {
                nro_ticket: nro_ticket.value,
                bit_publica: txtPublica.value
              }
          ),
        })
        .then(result => result.json())
        .then(respuesta => cargarBitacora(respuesta));
      }
   
    }