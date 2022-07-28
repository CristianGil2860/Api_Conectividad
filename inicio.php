<?php
include("categorias.php");
session_start();
if (isset($_SESSION['nombredeluser'])) {

    $usuarioingreso = $_SESSION['nombredeluser'];
} else {
    header('location:login.php');
}
function ConsultarNombre($idEscuela)
{
$UrlConsulta="https://escuelas.sit.net.ar/api/escuela/id/";
$UrlConsulta=$UrlConsulta.$idEscuela;
$RtaJson=file_get_contents($UrlConsulta);
$datos=json_decode($RtaJson,true);
$NombreEsc=$datos['data'][0]['cue']['nombre'];
echo $NombreEsc;
}
function ConsultarCUE($idEscuela) 
{ $UrlConsulta="https://escuelas.sit.net.ar/api/escuela/id/"; 
$UrlConsulta=$UrlConsulta.$idEscuela; $RtaJson=file_get_contents($UrlConsulta); 
$datos=json_decode($RtaJson,true); 
$Cue=$datos['data'][0]['cue']['cue']; 
echo $Cue; }

?>

<div class="row">
    <form action="../model/validationlogin.php" method="POST">
        <div class="row">
            <h6>usuario:<?= $usuarioingreso; ?></h6>
            <div class="col-12 d-flex justify-content-end">
                <input  class="col-12 d-flex justify-content-end" type="submit" value="cerrar sesion" name="btncerrarsesion" />
            </div>
        </div>
    </form>
</div>

<div class="row">
    <div class="col-12 d-flex justify-content-left">
        <h3>Casos abiertos</h3>
    </div>
</div>
<!--fin Row titulo-->
<!-- DESACTIVO GRAFICO
<div class="row d-flex justify-content-between bd-highlight ">

    <div class="col-xl-3 col-lg-5 col-md-8 p-2 bd-highlight" id="contGrafico">

        <div class="row">
            <div class="col-12">
                <canvas id="graphCasos" class="my-4 ms-xl-3 ms-lg-1 ms-md-5" style="width:100%;max-width:700px"></canvas>
            </div>
        </div>
    </div>
    fin Row grafico-->

    <div class="col-xl-12 col-lg-12 col-md-12 p-2 bd-highlight ">
       
        <div class="row mt-3 mb-2">

            <div class="col-12 col-lg-4">
                <div class="card">
                    <h5 class="card-header">M. Coordinación :<td><?=$sumacordinacion;?></td></h5>
                    <div class="card-body">
                        <!-- <h1 class="card-title text-center" id="cantCoordinacion"></h1> -->

                        <table class="table table-bordered" id="tbcoordinacion">
                            <!-- evento obtiene index row -->
                            <tr id="nvovinc" onclick="getindice(this)">
                                <td>Nuevo Vinculo</td><td><?=$contador7;?></td>
                            </tr>
                            <tr id="trasl" onclick="getindice(this)">
                                <td>Traslado</td><td><?=$contador6;?></td>
                            </tr>
                            <tr id="reparac" onclick="getindice(this)">
                                <td>Reparacion</td><td><?=$contador8;?></td>
                            </tr>
                        </table>

                        <span id="index" style="display: none;"></span>
                        <p id="salida" style="display: none;"></p>
                    </div>
                </div>
            </div>

            <div class="col-12 col-lg-4">
                <div class="card">
                    <h5 class="card-header">Telecom :<td><?=$sumatelecom;?></td></h5>
                    <div class="card-body">
                        <!-- <h1 class="card-title text-center" id="cantNacion"></h1> -->
                        <table class="table table-bordered" id="tbnacion">
                            <!-- evento obtiene index row -->
                            <tr id="tras" onclick="getIndex(this)">
                                <td>Traslados de linea</td><td><?=$contador3;?></td>
                            </tr>
                            <tr id="ped" onclick="getIndex(this)">
                                <td>Pedidos de linea</td><td><?=$contador2;?></td>
                            </tr>
                            <tr id="ges" onclick="getIndex(this)">
                                <td>Reparacion Linea</td><td><?=$contador1;?></td>
                            </tr>
                        </table>

                    </div>
                </div>
            </div>

            <div class="col-12 col-lg-4">
                <div class="card">
                    <h5 class="card-header">Educarse:<td><?=$sumaeducar;?></td></h5>
                    <div class="card-body">
                        <!-- <h1 class="card-title text-center" id="cantTelecom"></h1> -->
                        <table class="table table-bordered" id=tbeducarse>
                            <!-- evento obtiene index row -->
                            <tr id="piso" onclick="getIndexx(this)">
                            <td>Problemas de piso</td><td><?=$contador4;?></td>
                            </tr>
                            <tr id="vinculo" onclick="getIndexx(this)">
                            <td>Reparacion Vinculo</td><td><?=$contador5;?></td>
                            </tr>
                        </table>

                    </div>
                </div>
            </div>
        </div>
        <!--fin Row dashboard-->
        <!--
        <div class="row mt-4 mb-2" id="contBuscar">
            <div class="col-2 col-md-1 text-center">
                <label for="buscarAsignados" class="form-label ">Buscar</label>
            </div>
            <div class="col-10 col-md-6">
                <div class="">
                    <input class="form-control" id="buscarIncidencia" type="text" placeholder="" onkeyup="doSearch(this)">
                </div>
            </div>
            <div class="col-6">
                <span id="pBuscar" class="d-inline-block" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Escriba palabras o numero a buscar">
                </span>
            </div>
        </div>
        fin row buscar -->
    </div>
    <?php $fechaactual = new DateTime('now');
    $fechastringhoy = $fechaactual->format('d-m-Y'); ?>
    <!--fin col contendor acciones-->
    <div class="row mt-3">
        <div class="col-12 p-2 bd-highlight " id="">
            <table id="tabladatos" class="table table-hover" id="">
                <thead class="table-light">
                    <tr>
                        <small>
                            <th scope="col-1">Cue</th>
                            <th scope="col-2">Nombre</th>
                            <th scope="col-2">Fecha de solicit</th>
                            <th scope="col-2">Estado</th>
                            <th scope="col-2">Dias de Gestion</th>
                        </small>
                    </tr>
                </thead>
                <tbody>

                    <tr>
                        
                        <?php foreach ($tablasit as $sit) : ?>
                            <td><?= ConsultarCUE($sit['id_escuela']); ?></td>
                            <td><?= ConsultarNombre($sit['id_escuela']); ?></td>
                            <td><?php $datopasado =  new DateTime($sit['fecha_mod']);
                                echo $datobd = $datopasado->format('d-m-Y'); ?></td>
                            <td><?= $sit['descripcion']; ?></td>
                            <td><?php $diff = date_diff($datopasado, $fechaactual);;
                                echo  $diff->days; ?></td>
                        
                    </tr>
                <?php endforeach;  ?>

                </tbody>
            </table>

        </div>

    </div>

</div>


<!--fin Row contendor acciones->