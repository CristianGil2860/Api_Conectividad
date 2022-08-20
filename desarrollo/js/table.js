

//nacion
function paginador(x) {
    var pagina = x;
    document.getElementById('page').textContent = pagina;
    console.log(pagina);
    var pagess = x;
    page = document.getElementById('pagess').textContent;
    console.log(pagess);
    var datotabla = document.getElementById('catepagina').textContent;

    botontocado(datotabla,page);
}
function getIndex(X) {


    var indice = X.rowIndex;

    var rows = document.getElementsByTagName('tr');

    document.getElementById('index').textContent = X.rowIndex;
    var pagina = 0;
    pagina = document.getElementById('page').textContent;
    console.log(pagina);
    // var pagess = 0;
    // page = document.getElementById('pagess').textContent;
    // console.log(pagess);

    switch (indice) {

        case 0:
            var categorias = 3;
            document.getElementById('salida').textContent = categorias;
            $('#trasl').removeClass('selected-row');
            $('#nvovinc').removeClass('selected-row');
            $('#vinculo').removeClass('selected-row');
            $('#piso').removeClass('selected-row');
            $('#reparac').removeClass('selected-row');
            $('#ges').removeClass('selected-row');
            $('#ped').removeClass('selected-row');
            $('#tras').addClass('selected-row');
            botontocado()
            break;

        case 1:
            var categorias = 4;
            document.getElementById('salida').textContent = categorias;
            $('#trasl').removeClass('selected-row');
            $('#nvovinc').removeClass('selected-row');
            $('#vinculo').removeClass('selected-row');
            $('#piso').removeClass('selected-row');
            $('#reparac').removeClass('selected-row');
            $('#tras').removeClass('selected-row');
            $('#ges').removeClass('selected-row');
            $('#ped').addClass('selected-row');
            botontocado()
            break;
        case 2:
            var categorias = 5;
            document.getElementById('salida').textContent = categorias;
            $('#trasl').removeClass('selected-row');
            $('#nvovinc').removeClass('selected-row');
            $('#vinculo').removeClass('selected-row');
            $('#piso').removeClass('selected-row');
            $('#reparac').removeClass('selected-row');
            $('#tras').removeClass('selected-row');
            $('#ped').removeClass('selected-row');
            $('#ges').addClass('selected-row');
            botontocado()
            break;

    }

    console.log(categorias);

}
function getindice(X) {

    var indice = X.rowIndex;

    document.getElementById('index').textContent = X.rowIndex;
    switch (indice) {

        case 0:
            var categorias = 0;
            document.getElementById('salida').textContent = categorias;
            $('#tras').removeClass('selected-row');
            $('#ges').removeClass('selected-row');
            $('#ped').removeClass('selected-row');
            $('#vinculo').removeClass('selected-row');
            $('#piso').removeClass('selected-row');
            $('#reparac').removeClass('selected-row');
            $('#trasl').removeClass('selected-row');
            $('#nvovinc').addClass('selected-row');
            botontocado()
            break;

        case 1:
            var categorias = 1;
            document.getElementById('salida').textContent = categorias;
            $('#tras').removeClass('selected-row');
            $('#ges').removeClass('selected-row');
            $('#ped').removeClass('selected-row');
            $('#vinculo').removeClass('selected-row');
            $('#piso').removeClass('selected-row');
            $('#reparac').removeClass('selected-row');
            $('#nvovinc').removeClass('selected-row');
            $('#trasl').addClass('selected-row');
            botontocado()
            break;
        case 2:
            var categorias = 2;
            document.getElementById('salida').textContent = categorias;
            $('#tras').removeClass('selected-row');
            $('#ges').removeClass('selected-row');
            $('#ped').removeClass('selected-row');
            $('#vinculo').removeClass('selected-row');
            $('#piso').removeClass('selected-row');
            $('#reparac').removeClass('selected-row');
            $('#trasl').removeClass('selected-row');
            $('#nvovinc').removeClass('selected-row');
            $('#reparac').addClass('selected-row');
            botontocado()
            break;
    }
    console.log(categorias);
}
function getIndexx(X) {
    var indice = X.rowIndex;


    document.getElementById('index').textContent = X.rowIndex;
    switch (indice) {

        case 0:
            var categorias = 6;
            document.getElementById('salida').textContent = categorias;
            $('#tras').removeClass('selected-row');
            $('#ges').removeClass('selected-row');
            $('#ped').removeClass('selected-row');
            $('#trasl').removeClass('selected-row');
            $('#nvovinc').removeClass('selected-row');
            $('#vinculo').removeClass('selected-row');
            $('#reparac').removeClass('selected-row');
            $('#piso').addClass('selected-row');
            botontocado()
            break;

        case 1:
            var categorias = 7;
            document.getElementById('salida').textContent = categorias;
            $('#tras').removeClass('selected-row');
            $('#ges').removeClass('selected-row');
            $('#ped').removeClass('selected-row');
            $('#trasl').removeClass('selected-row');
            $('#nvovinc').removeClass('selected-row');
            $('#vinculo').removeClass('selected-row');
            $('#reparac').removeClass('selected-row');
            $('#piso').removeClass('selected-row');
            $('#vinculo').addClass('selected-row');
            botontocado()
            break;

    }
    console.log(categorias);

}
function botontocado() {

    var datotabla = document.getElementById('salida').textContent;
    if (datotabla == ''){
      datotabla =  document.getElementById('catepagina').textContent;
    }
  
    var page = document.getElementById('page').textContent;;
   
    // window.alert(datotabla)
    console.log(page);
    var action = 'Searchincidencia';

    $.ajax({
        // dataType : "json",
        url: './controller/categorias.php',
        type: "POST",
        async: true,
        data: { action: action, categorias: datotabla, pagina: page },
        beforeSend: function () {

            //  myModal.show();

        },

        success: function (response) {

            console.log(response);
            //  var info = JSON.parse(response);


            $("#container").html(response);
            //  myModal.toggle();




        },
        error: function (error) {
            $("#container").html(response);

        }

    });

}

async function obteneridincidencia(incidencia) {
    var incidencias = incidencia;

    $.ajax({
        // dataType: "json",
        url: './controller/ctrlmodal.php',
        type: "POST",
        async: true,
        data: { Idinc: incidencias },
        // contentType: "application/json",
        beforeSend: function () {

        },

        success: function (respuesta) {
            //aca recibe una respuesta completa con html 
            console.log(respuesta);
            //paso a cadena y extraigo el tramo del array
            const cadena = respuesta.toString();
            const indice = cadena.indexOf("<");
            const extr = cadena.substring(0, indice);
            //extraigo caracteres inecesarios y limpio salida
            str1 = extr.replaceAll(/[{}""]/g, '');
            str2 = str1.replaceAll('[', '');
            str3 = str2.replaceAll(']', '');
            //envio al textarea del modal.php
            $("#descripcion").val(str3);

        },
        error: function (error) {
            $("#container").html(respuesta);
        }

    });

}








