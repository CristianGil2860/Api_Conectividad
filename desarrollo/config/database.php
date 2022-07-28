<?php
// para conectar a la base escuela
$host = "190.60.174.157";
$db = "escuelas";
$usuario = "cgil_escuelas";
$contrasenia = "mUl1_b254";
//OJOOO CON PONER ESPACION DENTRO DE ELEMENTOS DEL PARENTESIS DE 'PDO'
try {
    $conexionescuela = new PDO("mysql:host=$host;dbname=$db",$usuario,$contrasenia);
    //la linea de abajo solo es para probar conexion
    // if($conexion){echo "conectado..a sistema";}
} catch (Exception  $ex) {
    echo $ex->getMessage();
}

//para conectar la base sit
$host2 = "190.60.174.157";
$db2 = "conectividad_api";
$usuario2 = "cgil_conapi";
$contrasenia2 = "Wuvm71_49";
//OJOOO CON PONER ESPACION DENTRO DE ELEMENTOS DEL PARENTESIS DE 'PDO'
try {
    $conexionsit = new PDO("mysql:host=$host2;dbname=$db2",$usuario2,$contrasenia2);
    //la linea de abajo solo es para probar conexion
    //  if($conexionsit){echo "conectado..a sistema";}
} catch (Exception  $ex) {
    echo $ex->getMessage();
}