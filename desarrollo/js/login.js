$(window).ready(function () {
    // $('#formlogin').on('submit', function (e) {
    //     //para evitar que se recarge la pag
    //     e.preventDefault();


    // })
    let Rta
async function Logeado(){
        await fetch("../controller/contrologin.php",)
            .then(res => res.json())
            .then(datacaca => Rta=datacaca)
 //   .then(console.log(data+"CC"))
    if (Rta)
    {
        document.getElementById("Menu").classList.remove("ocultar");
        console.log("LOGUEADO")
    }
    else
    {
        document.getElementById("Menu").classList.add("ocultar");
        console.log("SIN LOGIN")
    }
    }
    Logeado();
    let nombre = $('#nombre_usuario').val();
    let pass = $('#contrasena').val();

//     $.ajax({
//         type: form.attr('method'),
//         url: form.attr('action'),
//         data: form.serialize(),
//         beforeSend: function(){
//             success: function (data){

//             }

//         }
//     });
});