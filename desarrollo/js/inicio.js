
async function cargaTablero(data) {
//aparecer menu y avatarlog si esta logeado, o no
  var btncerrar = document.getElementById('btncerrarsesion');
  if (btncerrar !== null) {
    var avatarlogeado = document.getElementById('usuariologiname');
    var recuperarlog = JSON.parse(localStorage.getItem('user'));
    avatarlogeado.innerHTML = recuperarlog;
    var menuinicio = document.getElementById('Menuboton');
    menuinicio.style.display = 'block';
    
  } else {
    document.getElementById('logincard').style.display = 'none';
  }
 
  var incidencias = data.resultados

  let cantTelecom = document.getElementById('cantTelecom');
  let cantNacion = document.getElementById('cantNacion');
  let cantCoordinacion = document.getElementById('cantCoordinacion');

  var cant_telecom = 0;
  var cant_nacion = 0;
  var cant_coordinacion = 0;


  var incidenciasCREADAS = [];

  var cuerpo = document.getElementById('bodyIncidencias');

  incidencias.forEach(incidencia => {

    // cuerpo.appendChild(nuevaFila(incidencia));       //comentarie por que me tiro error

    /*
    const url = 'https://api-itop-sit.herokuapp.com/tickets?nro_ticket='+incidencia.ticket_itop;

      fetch(url)
      .then(response => response.json()) 
      .then(respuesta => console.log(respuesta.data[0]))
      .catch(error => console.log(error, key))  
    */

    incidenciasCREADAS.push(
      incidencia.ticket_itop.fe
    )

    if (incidencia.proveedor.id == 1) {
      cant_telecom++;
    } else if (incidencia.proveedor.id == 2) {
      cant_nacion++;
    } else if (incidencia.proveedor.id == 3) {
      cant_coordinacion++;
    }
  });

  let ultimaCol = document.createElement('tr');
  ultimaCol.setAttribute('class', 'noSearch hide text-center');
  let ultimaFila = document.createElement('td');
  ultimaFila.setAttribute('colspan', '10');

  ultimaCol.appendChild(ultimaFila);

  // cuerpo.appendChild(ultimaCol);             //comentarie por que me tiro error


  sessionStorage.setItem('incidenciasCreadas', JSON.stringify(incidenciasCREADAS));

  // cantTelecom.innerHTML = cant_telecom;          //comentarie por que me tiro error
  // cantNacion.innerHTML = cant_nacion;           //comentarie por que me tiro error
  // cantCoordinacion.innerHTML = cant_coordinacion;         //comentarie por que me tiro error

  // cargarGrafico(cant_telecom, cant_nacion, cant_coordinacion);       //comentarie por que me tiro error

  myModal.toggle()

}



function nuevaFila(incidencia) {

  console.log(incidencia.movimientos);


  let fila = document.createElement('tr');

  let col0 = document.createElement('td');
  col0.innerHTML = incidencia.ticket_itop;

  let col1 = document.createElement('td');
  col1.innerHTML = incidencia.proveedor.nombre;


  let col2 = document.createElement('td');
  col2.innerHTML = incidencia.categoria.descripcion;

  let col3 = document.createElement('td');
  col3.innerHTML = incidencia.id_escuela;

  let col4 = document.createElement('td');
  col4.innerHTML = new Date(incidencia.movimientos[0].fecha_mod).toLocaleDateString("es-AR");

  fila.appendChild(col0);
  fila.appendChild(col1);
  fila.appendChild(col2);
  fila.appendChild(col3);
  fila.appendChild(col4);


  return fila


}


function cargarGrafico(cant_telecom, cant_nacion, cant_coordinacion) {

  var casos = document.getElementById('graphCasos').getContext('2d');

  var grafico = new Chart(casos, {
    type: 'doughnut', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
      labels: [
        'Telecom',
        'Nación',
        'Min. Coordinación'
      ],
      datasets: [{
        label: 'Proveedores',
        data: [cant_telecom, cant_nacion, cant_coordinacion],
        backgroundColor: [
          'rgb(203, 204, 206)', //gris 'secondary'
          'rgb(207, 244, 252)', //celeste 'info'
          'rgb(248,249,250)' //gris claro 'light'
        ],

      }]
    },
    options: {
      responsive: true,
      tooltips: {
        enabled: false
      },
      legend: {
        display: true,
        position: 'bottom',

        labels: {
          boxWidth: 15,
          fontColor: '#474747'
        }
      },

      onClick: function (e) {
        var activePoints = grafico.getElementsAtEvent(e);
        var selectedIndex = activePoints[0]._index;
        console.log(this.data.labels[selectedIndex]); //proveedor
        //console.log(this.data.datasets[0].data[selectedIndex]); // cant de casos x proveedor
      }
    }
  });

 

 
  

}






