
function enviar() {
    var nombre_usuario = document.getElementById('nombre_usuario').textContent;
    var contrasena = document.getElementById('contrasena').textContent;
    var logeado = document.getElementById('formlogin');
    var iconologin = document.getElementById('usuariologiname');
    logeado.addEventListener('submit', function (e) {
        e.preventDefault();
        let datos = new FormData(logeado);

      
        fetch('./controller/validationlogin.php', {
            method: 'POST',
            body: datos,
           
        }).then(Response => Response.json())
            .then(({ data, user }) => {
             
                if (data === 1) {
                

                    var usuario = iconologin.innerHTML;
                    usuario = user;
                    console.log(usuario);
                    localStorage.setItem('user', JSON.stringify(usuario));

                    console.log(data);
                    location.href = './';
                    elementoslogin();
                    menuinicio.style.display = 'block';
                    
                    // var recuperarlog = sessionStorage.getItem('user');
                    // console.log(recuperarlog);

                } else if (data === 0) {
                    document.getElementById('logincard').style.display = 'block';
                  
                    iconologin.innerHTML = 'usuario o contraseña incorrecto';
                    setTimeout(()=>{
                    console.log(data);
                    document.getElementById('logincard').style.display = 'none';
                    iconologin.innerHTML = '';
                },3000)
                
                }
             
            })
    })

}

