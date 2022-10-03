<?php

session_start();
if (isset($_SESSION['nombredeluser'])) {
    header('location:../');
}
include("../config/database.php");
// $nombre = isset($_POST['nombre']) ? $_POST['nombre'] : '';
// $pass  = isset($_POST['pass']) ? $_POST['pass'] : '';
// header('Content-Type: application/json');
if (isset($_POST['nombre_usuario'], $_POST['contrasena'])) {
    //declaro variables recibidas por post  
    $usuario = $_POST['nombre_usuario'];
    $contra = $_POST['contrasena'];
    //ejecuto consulta a la tabla usuarios
    $sql = $conexionsit->prepare("SELECT * FROM usuarios WHERE nombre_usuario = '$usuario' and contrasena = '$contra'");

    $sql->execute();
    $usuariocont = $sql->fetch(PDO::FETCH_LAZY);

    //comparo los campos ingresados del login
    if ($usuariocont == null) {
        // header('location:../');
        echo json_encode(array('data' => 0));
    } else if ($usuariocont !== null) {
        $_SESSION['nombredeluser'] = $usuario;
        echo json_encode(array('data' => 1, 'user' => $usuario));
    }
    exit();
}


//cerrar sesion 
$botoncerrarsesion = ($_POST['btncerrarsesion']);
var_dump($botoncerrarsesion);
if (isset($_POST['btncerrarsesion'])) {

    session_destroy();
    header('location:../');
}
