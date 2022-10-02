<?php
include("../controller/categorias.php");
include("../controller/ctrlmodal.php");

session_start();
if (isset($_SESSION['nombredeluser'])) {

    $usuarioingreso = $_SESSION['nombredeluser'];
} else {
    header('location:login.php');
}
function ConsultarNombre($idEscuela)
{
    $UrlConsulta = "https://escuelas.sit.net.ar/api/escuela/id/";
    $UrlConsulta = $UrlConsulta . $idEscuela;
    $ctx = stream_context_create(array(
        'http' =>
        array(
            'timeout' => 30 
        )
    ));
    $RtaJson = file_get_contents($UrlConsulta, false, $ctx);
    $datos = json_decode($RtaJson, true);
    $NombreEsc = $datos['data'][0]['cue']['nombre'];
    echo $NombreEsc;
}
function ConsultarCUE($idEscuela)
{
    $UrlConsulta = "https://escuelas.sit.net.ar/api/escuela/id/";
    $UrlConsulta = $UrlConsulta . $idEscuela;
    $ctx = stream_context_create(array(
        'http' =>
        array(
            'timeout' => 30
        )
    ));
    $RtaJson = file_get_contents($UrlConsulta, false, $ctx);
    $datos = json_decode($RtaJson, true);
    $Cue = $datos['data'][0]['cue']['cue'];
    echo $Cue;
}

?>

<div class="row">
    <form action="../controller/validationlogin.php" method="POST">
        <div class="row">
            <!-- <h6 id="usuarioinicio">usuario:<?= $usuarioingreso; ?></h6> -->
            <input style="display: none;" class="col-3" type="submit" value="cerrar sesion" name="btncerrarsesion" id="btncerrarsesion">
        </div>
    </form>
</div>

<div class="row">
    <div class="col-12 d-flex justify-content-left">
        <h3>Casos Abiertos</h3>
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
                <h5 class="card-header">M. Coordinación :<td><?= $sumacordinacion; ?></td>
                </h5>
                <div class="card-body">
                    <!-- <h1 class="card-title text-center" id="cantCoordinacion"></h1> -->

                    <table class="table table-bordered" id="tbcoordinacion">
                        <!-- evento obtiene index row -->
                        <tr id="nvovinc" onclick="getindice(this)">
                            <td>Nuevo Vinculo</td>
                            <td><?= $contador7; ?></td>
                        </tr>
                        <tr id="trasl" onclick="getindice(this)">
                            <td>Traslado</td>
                            <td><?= $contador6; ?></td>
                        </tr>
                        <tr id="reparac" onclick="getindice(this)">
                            <td>Reparacion</td>
                            <td><?= $contador8; ?></td>
                        </tr>
                    </table>

                    <span id="index" style="display: none;"></span>
                    <p id="salida" style="display: none;"></p>
                </div>
            </div>
        </div>

        <div class="col-12 col-lg-4">
            <div class="card">
                <h5 class="card-header">Telecom :<td><?= $sumatelecom; ?></td>
                </h5>
                <div class="card-body">
                    <!-- <h1 class="card-title text-center" id="cantNacion"></h1> -->
                    <table class="table table-bordered" id="tbnacion">
                        <!-- evento obtiene index row -->
                        <tr id="tras" onclick="getIndex(this)">
                            <td>Traslados de linea</td>
                            <td><?= $contador3; ?></td>
                        </tr>
                        <tr id="ped" onclick="getIndex(this)">
                            <td>Pedidos de linea</td>
                            <td><?= $contador2; ?></td>
                        </tr>
                        <tr id="ges" onclick="getIndex(this)">
                            <td>Reparacion Linea</td>
                            <td><?= $contador1; ?></td>
                        </tr>
                    </table>

                </div>
            </div>
        </div>

        <div class="col-12 col-lg-4">
            <div class="card">
                <h5 class="card-header">Educarse:<td><?= $sumaeducar; ?></td>
                </h5>
                <div class="card-body">
                    <!-- <h1 class="card-title text-center" id="cantTelecom"></h1> -->
                    <table class="table table-bordered" id=tbeducarse>
                        <!-- evento obtiene index row -->
                        <tr id="piso" onclick="getIndexx(this)">
                            <td>Problemas de piso</td>
                            <td><?= $contador4; ?></td>
                        </tr>
                        <tr id="vinculo" onclick="getIndexx(this)">
                            <td>Reparacion Vinculo</td>
                            <td><?= $contador5; ?></td>
                        </tr>
                    </table>

                </div>
            </div>
        </div>
    </div>
    <!--fin Row dashboard-->

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
    <!-- fin row buscar -->
</div>
<?php $fechaactual = new DateTime('now');
$fechastringhoy = $fechaactual->format('d-m-Y'); ?>
<!--fin col contendor acciones-->
<h3 id="TituloTabla"></h3>
<div class="row mt-3">
    <div class="col-12 p-2 bd-highlight " id="">
        <table id="tablaIncidencias" class="table table-hover" id="">
            <thead class="table-light">
                <tr>
                    <small>
                        <th scope="col-1">Cue</th>
                        <th scope="col-2">TKT</th>
                        <th scope="col-1">INC</th>
                        <th scope="col-2">Nombre</th>
                        <th scope="col-2">Fecha de solicit</th>
                        <th scope="col-2">Estado</th>
                        <th scope="col-2">Dias de Gestion</th>
                        <th scope="col-2">Ver</th>
                    </small>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($tablasit as $sit) : ?>
                    <tr <?php
                        $datopasado =  new DateTime($sit['fecha_mod']);
                        $diff = date_diff($datopasado, $fechaactual);
                        if ($diff->days > 19) {
                            $bgcolor = "#ff3f3f";
                        }
                        if ($diff->days < 10) {
                            $bgcolor = "#90ee90";
                        }
                        if ($diff->days > 9 && $diff->days < 20) {
                            $bgcolor = "#ffffe0";
                        }    ?>>

                        <td style="background-color:<?= $bgcolor ?>;"><?= ConsultarCUE($sit['id_escuela']); ?></td>
                        <td style="background-color:<?= $bgcolor ?>;"><?= $sit['ticket_itop']; ?></td>
                        <td style="background-color:<?= $bgcolor ?>;"><?= $sit['incidencia_id']; ?></td>
                        <td style="background-color:<?= $bgcolor ?>;"><?= ConsultarNombre($sit['id_escuela']); ?></td>
                        <td style="background-color:<?= $bgcolor ?>;"><?php $datopasado =  new DateTime($sit['fecha_mod']);
                                                                        echo $datobd = $datopasado->format('d-m-Y'); ?></td>
                        <td style="background-color:<?= $bgcolor ?>;"><?= $sit['descripcion']; ?></td>
                        <td style="background-color:<?= $bgcolor ?>;"><?php $diff = date_diff($datopasado, $fechaactual);
                                                                        echo  $diff->days; ?></td>
                        <td style="background-color:<?= $bgcolor ?>;">
                            <button class="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#modal_casos_inc" onclick="obteneridincidencia(<?= $sit['incidencia_id']; ?>)"><i class="fa fa-eye"></i></button>
                        </td>
                    </tr>
                <?php endforeach; ?>

            </tbody>

        </table>

    </div>
    <nav aria-label="Page navigation example">
        <div class="row">
            <div class="col-xs-12 col-sm-6">

                <p>mostrando&nbsp;<?php echo  $totalincidencias; ?>&nbsp;incidencias disponibles</p>
            </div>
            <div class="columna col-sm-6">
                <p id="page"><?php echo $pagina ?></p>
                <p>de<?php echo $paginas ?>Página/</p>&nbsp;&nbsp;&nbsp;
                <p>max x pag:<?php echo  $incxpagina ?></p>
            </div>

        </div>


        <ul class="pagination">
            <?php if ($pagina > 1) {
            } ?>

            <?php for ($x = 0; $x < $paginas; $x++) : ?>
                <li class="page-item "><a class="page-link" id="pagess" onclick="paginador( <?php echo $x + 1 ?>)">
                        <?php echo $x + 1 ?>

                    </a>
                </li>
                <p id="catepagina" style="display: none;"> <?php echo $categorias; ?></p>
            <?php endfor; ?>
        </ul>
    </nav>
</div>

<?php include('modalform.php'); ?>



<!--fin Row contendor acciones->