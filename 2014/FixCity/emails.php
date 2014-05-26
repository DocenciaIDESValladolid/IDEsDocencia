<html>
<head>
	<title>Introducción de una Nueva Denuncia en la Base de Datos</title>
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
	
		
	/* ------------------------------------ *
	 *	    	GESTIÓN DE MUNICIPIOS		*
	 * ------------------------------------ */
	
	echo "<br><br>";
	echo "<br><br>";
	
	// Comprobamos que el municipio se encuentra en la base de datos
	$query_municipios = "SELECT codigoine FROM municipios WHERE codigoine='$codigoine'";
	$existe_municipio = pg_exec($db, $query_municipios);
	
	if(pg_numrows($existe_municipio)!=0){
		echo $municipio." se encuentra en nuestra base de datos de municipios. <br>"; 
		$query_emails = "SELECT email FROM email WHERE id_municipio='$codigoine'";
		$existe_email = pg_exec($db, $query_emails);
		// Mostramos por pantalla la consulta
		if(pg_numrows($existe_email)!=0){
			echo "Tenemos en nuestra base de datos los siguientes emails. ";
			while($row = pg_fetch_array($existe_email)) {
				echo $row[0];
				echo "<br>";
			}
		}
		else{
			echo "En nuestra base de datos no tenemos ningun email almacenado para contactar con este ayuntamiento. 
				Por favor, introduce uno si quieres que esta denuncia pueda ser solucionada con mayor agilidad.";
		}
	}
	else{
	
		$nuevo_municipio = "INSERT INTO municipios VALUES ('$municipio', 
							(SELECT id_provincia FROM provincias WHERE nombre = '$provincia') ,'$codigoine')";
		echo "<br>Acabamos de añadir a nuestra base de datos el municipio ".$municipio.".";
		echo "<br>Para cumplir con los objetivos de esta plataforma, por favor, introduzca un email de contacto para este municipio,
				de cara a que la aplicación pueda contactar con los organismos pertinentes y poder solucionar este conflicto.
				<br>Email:<br>
				<>
				<input type=\"email\" name=\"email\" onClick=\"\">";

		
	}
	
?>

</body>
</html>