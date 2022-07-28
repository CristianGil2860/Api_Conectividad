

//nacion
function getIndex(X) {


    var indice = X.rowIndex;
   
    var rows = document.getElementsByTagName('tr');

    document.getElementById('index').textContent = X.rowIndex;
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

    // window.alert(datotabla)
    var action = 'Searchincidencia';

    $.ajax({
        url: 'html/categorias.php',
        type: "POST",
        async: true,
        data: { action: action, categorias: datotabla },
        beforeSend: function () {

            // myModal.show();

        },

        success: function (response) {
            // mostrardatos(JSON.parse(response));

            console.log(response);
            // var info = JSON.parse(response);
            // window.alert(info);
            // var tbl = document.getElementById('tabladatos');


            $("#container").html(response)
            // myModal.toggle();
            // myModal.hide();



        },
        error: function (error) {
            $("#container").html(response);

        }

    });

}
// //coordinacion
// function getindice(X) {
//     var indice = X.rowIndex;

//     var categorias;

//     document.getElementById('index').textContent = X.rowIndex;
//     switch (indice) {
//         case 0:
//             categorias = 0;
//             document.getElementById('salida').textContent = categorias;
//             break;

//         case 1:
//             categorias = 1;
//             document.getElementById('salida').textContent = categorias;
//             break;
//         case 2:
//             categorias = 2;
//             document.getElementById('salida').textContent = categorias;
//             break;






