<!DOCTYPE html>
<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
        <title>Denuncia solucionada</title>
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
	
	<?php
	require_once('db.php');
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	
	
	$id_denuncia = $_GET['id'];
	
	
	$update = 'UPDATE estado_usuario SET estado = 1 WHERE id_denuncia = $1';
	$result = pg_prepare($db,"Mis denuncias", $update);
	$result = pg_execute($db, $update, array($id_denuncia));

	if(pg_affected_rows($result)==0){
		echo 'ERROR.';
	}
	else{
		echo 'Correcto.';
	}
	
?>
	
	
	
	</body>
</html>