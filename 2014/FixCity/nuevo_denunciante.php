<html>
<head>
	<title>Añadir denunciante extra a una denuncia ya notificada</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=1">
	<meta name="apple-mobile-web-app-capable" content="yes">
	
	<link rel="stylesheet" href="jquery.mobile-1.4.2.min.css">
	<link rel="stylesheet" href="theme/default/style.mobile.css" type="text/css">
	<link rel="stylesheet" href="style.mobile-jq.css" type="text/css">
	<script src="lib/OpenLayers.js"></script>

	<script src="jquery-1.9.0.js"></script>
	<script src="jquery.mobile-1.4.2.min.js"></script>

	<script src="AnimatedCluster.js"></script>
	<script src="thematicLayers.js"></script>
	<script src="reportingLayers.js"></script>
  
	<script src="mobile-base.js"></script>
	<script src="mobile-jq.js"></script>	
</head>
<body>
<?php

	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	require('db.php');			// Fichero de conexión a la base de datos

	@ $id_facebook = $_POST['id_facebook'];	// Gestión de usuarios
 
	// Inserción de la denunciante en la tabla de denunciantes
	$query = "INSERT INTO denunciantes (id_denuncia, id_denunciante, fecha) VALUES 
            ('"$id_denuncia"', '"$id_facebook"','".date("Y-m-d")."')";
	
	$result = pg_exec($db, $query);
?>
</body>
</html>