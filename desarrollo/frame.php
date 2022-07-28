<?php
$conexion = mysqli_connect("190.60.174.157","cgil_conapi","Wuvm71_49");
$selectdb = mysqli_select_db($conexion, "conectividad_api");
$tildes = $conexion->query("SET NAMES 'utf8'");

echo $Nincidencia=$_GET['Nincidencia'];
echo $EstadoNuevo=$_GET['EstadoNuevo'];
$FechaHora=date('Y-m-d H:i:s');// OJO QUE VIENE DEL SERVER Y NUNCA ESTAN EN HORA
$Crear="INSERT INTO movimientos (incidencia_id,estado_id,fecha_mod) VALUES ('$Nincidencia','$EstadoNuevo','$FechaHora')";
$Guardar=mysqli_query($conexion,$Crear);
?>
