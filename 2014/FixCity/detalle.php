<!DOCTYPE html>
<?php
require_once('db.php');
$id=$_GET['id'];
	$query = 'SELECT st_x(st_centroid(st_transform(the_geom,3857))) as x, st_y(st_centroid(st_transform(the_geom,3857))) as y , * FROM denuncias WHERE id_denuncia = $1';
	// Prepare a query for execution
	$result = pg_prepare($db, "Select denuncias", $query );
	// Execute the prepared query.  Note that it is not necessary to escape the string $id in any way
	$result = pg_execute($db, "Select denuncias", array($id));
	$row=pg_fetch_array($result);
	if ($row==false)
	{
	header($_SERVER['SERVER_PROTOCOL'] . 'Bad Request', true, 400);
	die;
	}
?>
<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
        <title>FixCity Authors</title>
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
<div data-role="page" id="detalleFichaDenuncia" data-theme="b">
			<div data-role="header">
				<h1>DetalleDenuncia</h1>
			</div>	
			<div  role="content" >
			
            <img src="images/cono.png" align="left" width="50px"/><h1>Incidencia</h1>
			<div id="nuevo_denunciante"></div>
			<div class="ui-corner-all custom-corners">
			  <div class="ui-bar ui-bar-a"><h3>Denuncia de incidencia en</h3>
			  </div>
			  <div class="ui-body ui-body-a">
			<p><b id="reportLocationLabel"></b>
<div id="minimap"></div>
<script>
{
var sm = new OpenLayers.Projection("EPSG:3857");
mapmini = new OpenLayers.Map({
        div: "minimap",
        theme: null,
        projection: sm,
        numZoomLevels: 22,
	size: new OpenLayers.Size(400,200),//para evitar null al inicializar
        controls: [
            new OpenLayers.Control.Attribution(),
			new OpenLayers.Control.Navigation({enableKinetic: true}),
        ],
        layers: [
		   new OpenLayers.Layer.OSM("Vista Callejero", null, {
                transitionEffect: 'resize'
            }),
            ],
        center: new OpenLayers.LonLat(<?php echo $row["x"].','.$row["y"]; ?>),	
        zoom: 20
    });

mapmini.updateSize();
var markersmini = new OpenLayers.Layer.Markers( "Markers" );
mapmini.addLayer(markersmini);

var size = new OpenLayers.Size(56,56);
var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
var icon = new OpenLayers.Icon('images/marker-icon-fixit.png', size, offset);
markersmini.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(<?php echo $row["x"].','.$row["y"]; ?>),icon));
mapmini.zoomToExtent(markersmini.getDataExtent());
}
</script>



</p>
</div>
</div>
			
			<div class="ui-corner-all custom-corners">
			  <div class="ui-bar ui-bar-a"><h3>Denunciantes que apoyan la denuncia</h3>
			  </div>
			  <div class="ui-body ui-body-a">
			<p id="reportDescription">
<?php
	$query = 'SELECT COUNT(id_denuncia) FROM denunciantes WHERE id_denuncia = $1';
	$result = pg_prepare($db, "Denunciantes", $query );
	$result = pg_execute($db, "Denunciantes", array($id));
	while($num = pg_fetch_array($result)) {
		echo 'Número de denunciantes: '.$num[0].'.';
	}
?></p>
			
		</div>	
		</div>	
			
			<div class="ui-corner-all custom-corners">
			  <div class="ui-bar ui-bar-a"><h3>Descripción del ciudadano</h3>
			  </div>
			  <div class="ui-body ui-body-a">
			<p id="reportDescription">
<?php
	$query = 'SELECT fecha FROM estado_usuario WHERE id_denuncia = $1';
		$result = pg_prepare($db, "Fecha", $query );
		$result = pg_execute($db, "Fecha", array($id));
		while($fecha = pg_fetch_array($result)) {
			echo "El día ".$fecha[0]." se ha informado del problema: <br>". $row['texto'];
		}
?></p>

			<p id="reportImageList">
<?php
	$query = 'SELECT * FROM imagenes WHERE id_denuncia = $1';
	// Prepare a query for execution
	$result = pg_prepare($db, "Select imagenes", $query );
	// Execute the prepared query.  Note that it is not necessary to escape the string $codigoine in any way
	$result = pg_execute($db, "Select imagenes", array($id));
	while($row = pg_fetch_array($result)) {
		echo '<a href="'.$row['ruta'].'"><img src="'.$row['ruta'].'" style="max-width:100%"></img></a>';
		}
?>
			</p>
			</div>
			</div>
			
		</div>
	<div data-role="footer" data-position="fixed" >
	<a href="#"  data-rel="back" data-icon="arrow-l">Back</a>
	</div>
	</div>
</body>
</html>
