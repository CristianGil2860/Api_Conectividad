<?php
include("../config/database.php");

include_once("../html/inicio.php");

// AGREGO EL IF PARA QUE SOLO LO EJECUTE SI LE PASO INCIDENCIA Y NO EN LA PRIMERA CARGA
if(isset($_POST['Idinc']))

{
$Idinc = isset($_POST['Idinc']) ? $_POST['Idinc'] : "";

$consultsit = $conexionsit->prepare("SELECT date_format(fecha_mod,'%d-%m-%Y')AS fecha,estados.descripcion 
  FROM movimientos INNER JOIN estados ON  movimientos.estado_id=estados.id WHERE incidencia_id=$Idinc");
$consultsit->execute();
$modalinci = $consultsit->fetchAll(PDO::FETCH_ASSOC);


if (!$modalinci) {
  echo "";
} else {
  echo json_encode($modalinci);

}
} 
 ?> 