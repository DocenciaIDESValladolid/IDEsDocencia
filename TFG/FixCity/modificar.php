<?php
    error_reporting(E_ALL);	
    require('db.php');
    $cod = $_GET['cod'];
    $query = 'SELECT denuncias.*, municipios.nombre as nombre_municipio, provincias.nombre as nombre_provincia '
            . 'FROM denuncias, provincias, municipios '
            . 'WHERE denuncias.cod like $1 '
            . 'AND municipios.codigoine like denuncias.codigoine '
            . 'AND provincias.id_provincia = municipios.provincia';
    
    $result = pg_prepare($db, "seleccionar denuncia", $query );
    $result = pg_execute($db, "seleccionar denuncia", array($cod));
    if(!pg_fetch_array($result)){
        header('Location: error.html');
    }
    while ($row = pg_fetch_array($result)){
        $municipio = $row['nombre_municipio'];
        $provincia = $row['nombre_provincia'];
        $fecha = $row['fecha'];
        $texto = $row['texto'];
        $resuelta = $row['"Resuelta"'];
        $id_denuncia = $row['id_denuncia'];
    }
    $query_imagenes = 'SELECT * FROM imagenes WHERE id_denuncia = $1';
    $result_imagenes = pg_prepare($db,'Imagenes', $query_imagenes);
    $result_imagenes = pg_execute($db, 'Imagenes',array($id_denuncia));
?>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
        <title>Modificar estado de la denuncia - FixCity</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=1">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta http-equiv="Content-Language" content="es"/>
        <link rel="stylesheet" href="jquery.mobile-1.4.2.min.css">
	<link rel="stylesheet" href="theme/default/style.mobile.css" type="text/css">
	<link rel="stylesheet" href="style.mobile.css" type="text/css">
        <link rel="stylesheet" href="style.mobile-jq.css" type="text/css">
        <script src="jquery-1.9.0.js"></script>
        <script src="jquery.mobile-1.4.2.min.js"></script>
	<script src="lib/OpenLayers.js"></script>
    </head>
	
    <body>
        <div data-role="page" data-theme="b">
        <div data-role="header" >
                <h1><img src="images/marker-icon-fixit.png" height="24">Cambiar estado denuncia</h1>
        </div>
        <div data-role="content">
            <table border="1">
		<thead><tr>
                    <th>Denuncia</th>
                    <th>Municipio</th>
                    <th>Fecha</th>
                    <th>Solucionado</th>
		</tr></thead>
		<tbody>
                    <tr>
                        <td>
                            <a href="detalle.php?id=<?php echo $id_denuncia;?>" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-btn-inline ui-icon-grid">Detalle</a>
                        </td>
                        <td>
                            <?php echo $municipio. '(' .$provincia. ')';?>
                        </td>
                        <td>
                            <?php echo $fecha;?>
                        </td>
                        <td align="center">
                            <?php if ($resuelta == FALSE){
                                echo 'NO';
                                echo '<a href="denuncia_solucionada.php?id='.$id_denuncia.'&res=no" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-btn-inline ui-icon-grid">Solucionar</a>';
                            }
                            else{
                                echo 'SI</td>';
                                echo '<a href="denuncia_solucionada.php?id='.$id_denuncia.'&res=si" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-btn-inline ui-icon-grid">Cambiar estado denuncia</a>';
                            }?>
                        </td>
                    <tr>
                        <td colspan="5">
                            Descripción: <?php echo $texto;?>
                        </td>                        
                    </tr>
                    <tr>
                        <td colspan="5">
                            <?php
                                while($imagen = pg_fetch_array($result_imagenes) ) {
                                    echo '<img style="max-height:100px;max-width:100px" src="'.$imagen['ruta'].'"/>';
                                }
                            ?>
                        </td>
                    </tr>
                </tbody></table>
                    
            
        </div>
    </body>
</html>

