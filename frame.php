<?php
$conexion = mysqli_connect("190.60.174.157","cgil_conapi","Wuvm71_49");
$selectdb = mysqli_select_db($conexion, "conectividad_api");
$tildes = $conexion->query("SET NAMES 'utf8'");


// TOMO VARIABLES 


// SOLO GUARDA SI VIENE UN NUMERO DE INCIDENCIA
if (isset($_GET['Nincidencia'])) 
{
    $Nincidencia=$_GET['Nincidencia'];
    $EstadoNuevo=$_GET['EstadoNuevo'];
    $FechaHora=date('Y-m-d H:i:s');// OJO QUE VIENE DEL SERVER Y NUNCA ESTAN EN HORA
    $Crear="INSERT INTO movimientos (incidencia_id,estado_id,fecha_mod) VALUES ('$Nincidencia','$EstadoNuevo','$FechaHora')";
    $Guardar=mysqli_query($conexion,$Crear);
}

if (isset($_GET['ticket_itop']
))
{
$ticket_itop=$_GET['ticket_itop'];
$descripcion=$_GET['descripcion'];
$url = "https://api-itop-sit.herokuapp.com/tickets";
$datosTKT = [
    "nro_ticket" => $ticket_itop,
    "bit_publica" => "[Gestion Conectividad]\n\r".$descripcion
];
    
    $opciones = array(
        "http" => array(
            "header" => "Content-type: application/json\r\n",
            "method" => "PUT",
            "content" => json_encode($datosTKT), # Agregar el contenido definido antes
        ),
    );
    

# Preparar petición
$contexto = stream_context_create($opciones);
# Hacerla
$resultado = file_get_contents($url, false, $contexto);
if ($resultado === false) {
    echo "Error haciendo petición";
    exit;
}

# si no salimos allá arriba, todo va bien
var_dump($resultado);
}

?>

