<?php
include("../config/database.php");

include_once("../html/inicio.php");
// if ($diff->days  > 20) {
//   $bgcolor = "#FF0000";
// } elseif ($diff->days < 20) {
//   $bgcolor = "#ffff00";
// }  
//contadores de casos por provedores
$contadorcase1 = $conexionsit->prepare("SELECT *  FROM incidencias Where incidenciaPorProveedor_id=1 ");
$contadorcase1->execute();
$contador1 = $contadorcase1->rowCount();
$contadorcase2 = $conexionsit->prepare("SELECT *  FROM incidencias Where incidenciaPorProveedor_id=2 ");
$contadorcase2->execute();
$contador2 = $contadorcase2->rowCount();
$contadorcase3 = $conexionsit->prepare("SELECT *  FROM incidencias Where incidenciaPorProveedor_id=3 ");
$contadorcase3->execute();
$contador3 = $contadorcase3->rowCount();
$contadorcase4 = $conexionsit->prepare("SELECT *  FROM incidencias Where incidenciaPorProveedor_id=4 ");
$contadorcase4->execute();
$contador4 = $contadorcase4->rowCount();
$contadorcase5 = $conexionsit->prepare("SELECT *  FROM incidencias Where incidenciaPorProveedor_id=5 ");
$contadorcase5->execute();
$contador5 = $contadorcase5->rowCount();
$contadorcase6 = $conexionsit->prepare("SELECT *  FROM incidencias Where incidenciaPorProveedor_id=6 ");
$contadorcase6->execute();
$contador6 = $contadorcase6->rowCount();
$contadorcase7 = $conexionsit->prepare("SELECT *  FROM incidencias Where incidenciaPorProveedor_id=7 ");
$contadorcase7->execute();
$contador7 = $contadorcase7->rowCount();
$contadorcase8 = $conexionsit->prepare("SELECT *  FROM incidencias Where incidenciaPorProveedor_id=8 ");
$contadorcase8->execute();
$contador8 = $contadorcase8->rowCount();

$sumatelecom = $contador3 + $contador2 + $contador1;
$sumacordinacion = $contador7 + $contador8 + $contador6;
$sumaeducar = $contador5 + $contador4;
/////////////////////////////////////////////

$categorias = isset($_POST['categorias']) ? $_POST['categorias'] : "";


switch ($categorias) {
  case 0:

    $provedores = 7;

    //inner join base con_sit

    $consultsit = $conexionsit->prepare("SELECT incidencias.id_escuela,incidencias.ticket_itop,movimientos.fecha_mod,movimientos.incidencia_id,movimientos.id,estados.descripcion FROM movimientos  INNER JOIN incidencias INNER JOIN estados ON  movimientos.estado_id=estados.id AND incidencias.id=movimientos.incidencia_id  WHERE incidencias.incidenciaPorProveedor_id=$provedores ORDER BY movimientos.incidencia_id ");
    $consultsit->execute();
    $tablasit = $consultsit->fetchAll(PDO::FETCH_ASSOC);

    break;
  case 1:

    $provedores = 6;

    //inner join base con_sit
    $consultsit = $conexionsit->prepare("SELECT incidencias.id_escuela,incidencias.ticket_itop,movimientos.fecha_mod,movimientos.incidencia_id,movimientos.id,estados.descripcion FROM movimientos  INNER JOIN incidencias INNER JOIN estados ON  movimientos.estado_id=estados.id AND incidencias.id=movimientos.incidencia_id  WHERE incidencias.incidenciaPorProveedor_id=$provedores ORDER BY movimientos.incidencia_id ");
    $consultsit->execute();
    $tablasit = $consultsit->fetchAll(PDO::FETCH_ASSOC);
    break;
  case 2:

    $provedores = 8;

    //inner join base con_sit
    $consultsit = $conexionsit->prepare("SELECT incidencias.id_escuela,incidencias.ticket_itop,movimientos.fecha_mod,movimientos.incidencia_id,movimientos.id,estados.descripcion FROM movimientos  INNER JOIN incidencias INNER JOIN estados ON  movimientos.estado_id=estados.id AND incidencias.id=movimientos.incidencia_id  WHERE incidencias.incidenciaPorProveedor_id=$provedores ORDER BY movimientos.incidencia_id ");
    $consultsit->execute();
    $tablasit = $consultsit->fetchAll(PDO::FETCH_ASSOC);
    break;
  case 3:

    $provedores = 3;

    //inner join base con_sit
    $consultsit = $conexionsit->prepare("SELECT incidencias.id_escuela,incidencias.ticket_itop,movimientos.fecha_mod,movimientos.incidencia_id,movimientos.id,estados.descripcion FROM movimientos  INNER JOIN incidencias INNER JOIN estados ON  movimientos.estado_id=estados.id AND incidencias.id=movimientos.incidencia_id  WHERE incidencias.incidenciaPorProveedor_id=$provedores ORDER BY movimientos.incidencia_id ");
    $consultsit->execute();
    $tablasit = $consultsit->fetchAll(PDO::FETCH_ASSOC);
    

    break;


  case 4:
    $provedores = 2;

    //inner join base con_sit
    $consultsit = $conexionsit->prepare("SELECT incidencias.id_escuela,incidencias.ticket_itop,movimientos.fecha_mod,movimientos.incidencia_id,movimientos.id,estados.descripcion FROM movimientos  INNER JOIN incidencias INNER JOIN estados ON  movimientos.estado_id=estados.id AND incidencias.id=movimientos.incidencia_id  WHERE incidencias.incidenciaPorProveedor_id=$provedores ORDER BY movimientos.incidencia_id ");
    $consultsit->execute();
    $tablasit = $consultsit->fetchAll(PDO::FETCH_ASSOC);

    break;

  case 5:
    $provedores = 1;


    //inner join base con_sit
    $consultsit = $conexionsit->prepare("SELECT incidencias.id_escuela,incidencias.ticket_itop,movimientos.fecha_mod,movimientos.incidencia_id,movimientos.id,estados.descripcion FROM movimientos  INNER JOIN incidencias INNER JOIN estados ON  movimientos.estado_id=estados.id AND incidencias.id=movimientos.incidencia_id  WHERE incidencias.incidenciaPorProveedor_id=$provedores ORDER BY movimientos.incidencia_id ");
    $consultsit->execute();
    $tablasit = $consultsit->fetchAll(PDO::FETCH_ASSOC);



    break;
  case 6:
    $provedores = 4;


    //inner join base con_sit
    $consultsit = $conexionsit->prepare("SELECT incidencias.id_escuela,incidencias.ticket_itop,movimientos.fecha_mod,movimientos.incidencia_id,movimientos.id,estados.descripcion FROM movimientos  INNER JOIN incidencias INNER JOIN estados ON  movimientos.estado_id=estados.id AND incidencias.id=movimientos.incidencia_id  WHERE incidencias.incidenciaPorProveedor_id=$provedores ORDER BY movimientos.incidencia_id ");
    $consultsit->execute();
    $tablasit = $consultsit->fetchAll(PDO::FETCH_ASSOC);
    break;
  case 7:
    $provedores = 5;


    //inner join base con_sit
    $consultsit = $conexionsit->prepare("SELECT incidencias.id_escuela,incidencias.ticket_itop,movimientos.fecha_mod,movimientos.incidencia_id,movimientos.id,estados.descripcion FROM movimientos  INNER JOIN incidencias INNER JOIN estados ON  movimientos.estado_id=estados.id AND incidencias.id=movimientos.incidencia_id  WHERE incidencias.incidenciaPorProveedor_id=$provedores ORDER BY movimientos.incidencia_id ");
    $consultsit->execute();
    $tablasit = $consultsit->fetchAll(PDO::FETCH_ASSOC);
    break;
}

