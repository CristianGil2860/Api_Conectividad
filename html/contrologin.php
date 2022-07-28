<?php

session_start();
if (isset($_SESSION['nombredeluser'])) {

    $usuarioingreso = $_SESSION['nombredeluser'];
    $Rta=json_encode(1,$usuarioingreso);
    // echo "<h3>Usuario: $usuarioingreso</h3>";
   // header('location:asignadosINTERIOR.html');
   
}  else {
    //header('HTTP/1.0 204 No Content');
    $Rta=json_encode(0);
} 
//echo $Rta;
return $Rta;


?>
