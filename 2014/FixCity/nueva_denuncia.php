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
	
	// Variables de formulario
	@ $texto = $_POST['texto'];				// Texto de la denuncia
	@ $longitud = $_POST['longitud'];		// Gestión de municipios
	@ $latitud = $_POST['latitud'];
	@ $codigoine = $_POST['codigoine'];
	@ $municipio = $_POST['municipio'];
	@ $provincia = $_POST['provincia'];
	@ $photo_urls = $_POST['photo_urls'];
	// Para el email del ayuntamiento comprobamos primero el primer input.
	// Si el usuario no ha escrito nada, leemos el correo seleccionado en el "select"
	@ $email_ayto = $_POST['emailMunicipality'];
	if(!$email_ayto){
		@ $email_ayto = $_POST['emailMunicipalitySelect'];
	}
	@ $id_facebook = $_POST['id_facebook'];	// Gestión de usuarios
	@ $email = $_POST['email'];
	
	
	// Comprobamos que las variables que hemos pasado no están vacías.
	if (!$latitud || !$longitud || !$texto || !$codigoine || !$municipio 
		|| !$provincia || !$id_facebook || !$email || !$email_ayto || !$photo_urls)
	{
		echo "	<table>
					<tr>
					  <td>Latitud</td>
					  <td>$latitud</td>
					</tr>
					<tr>
					  <td>Longitud</td>
					  <td>$longitud</td>
					</tr>
					<tr>
					  <td>Texto</td>
					  <td>$texto</td>
					</tr>
					<tr>
					  <td>Codigo</td>
					  <td>$codigoine</td>
					</tr>
					<tr>
					  <td>Municipio</td>
					  <td>$municipio</td>
					</tr>
					<tr>
					  <td>Provincia</td>
					  <td>$provincia</td>
					</tr>
					<tr>
					  <td>ID Facebook</td>
					  <td>$id_facebook</td>
					</tr>
					<tr>
					  <td>Email de denunciante</td>
					  <td>$email</td>
					</tr>
					<tr>
					  <td>Email Ayuntamiento</td>
					  <td>$email_ayto</td>
					</tr>
					<tr>
					  <td>URLs para las imágenes</td>
					  <td>$photo_urls</td>
					</tr>
					";
		echo "<input type='button' value='Back' onClick='history.go(-1);'>";
		exit;
		
	}

	// Formateamos textos para introducir en la base de datos.
	$texto = trim($texto);		
	$texto = addslashes($texto);
	$municipio = trim($municipio);
	$municipio = addslashes($municipio);
	$provincia = trim($provincia);
	$email_ayto = trim($email_ayto);
	$id_facebook = trim($id_facebook);
	$email = trim($email);
	$photo_urls = trim($photo_urls);
	

	/* ------------------------------------ *
	 * 			GESTIÓN DE USUARIOS			*
	 * ------------------------------------ */
	 
	// Comprobamos que el usuario que introduce la denuncia se encuentra registrado en la aplicación
	$query = "SELECT * FROM usuarios WHERE id_facebook LIKE '".$id_facebook."'";
	$result = pg_exec($db, $query);
	if(count(pg_fetch_row($result))>=1){
		// El usuario se encuentra registrado.
		// Dado que el email del usuario puede haber cambiado desde el momento en el que se 
		// almacenó el usuario por primera vez, actualizamos el emai.
		$update = "UPDATE usuarios SET email='$email' WHERE id_facebook LIKE '$id_facebook';";
		pg_exec($db, $update);
	}
	else{
		echo "QUE te pasaaa";
		// Si el usuario no se encuentra registrado, insertamos una nueva fila en la BD.
		$insert = "INSERT INTO usuarios (id_facebook, email) VALUES (\"$id_facebook\",\"$email\");";
		pg_exec($db, $insert);
		echo "pg_affected_rows()";
	}
	
	
	/* ------------------------------------ *
	 * 			GESTIÓN DE DENUNCIAS		*
	 * ------------------------------------ */

	// Inserción de la denuncia en la tabla de denuncias
	$query = "INSERT INTO denuncias (texto, the_geom, fecha, codigoine) VALUES 
            ('".$texto."', ST_Transform(ST_SetSRID(ST_Point(".$longitud.", ".$latitud."),900913),4326),'".date("Y-m-d")."' , '$codigoine') 
			RETURNING id_denuncia";
	$result = pg_exec($db, $query);

    if(pg_affected_rows($result)<1){
		echo 'Error al introducir la denuncia en la base de datos.';
		echo "<input type='button' value='Back' onClick='history.go(-1);'>";
		exit;
	}
	else{
		// Obtenemos el ID que se ha generado de la denuncia introducida, para usarlo en las posteriores sentencias.
		$row = pg_fetch_row($result);
		$id_denuncia = $row[0];
	}
	
	// Inserción de la denuncia en la tabla de denunciantes.
	$insert = "INSERT INTO denunciantes (id_denuncia, id_denunciante, fecha) VALUES ($id_denuncia,
				'$id_facebook', '".date("Y-m-d")."');";
	$result = pg_exec($db, $insert);
	
	// Inserción en estado_usuario
	$estado_usuario = "INSERT INTO estado_usuario (id_denuncia, fecha, estado, id_usuario)
		VALUES ($id_denuncia, '".date("Y-m-d")."', 0, '$id_facebook');";
	$result = pg_exec($db, $estado_usuario);
	
	
	/* ------------------------------------ *
	 * 			GESTIÓN DE IMÁGENES 		*
	 * ------------------------------------ */	

	/*Texto que mostrará la información de la nueva denuncia y las imagenes que acompañan la queja.*/
	
	echo "<br>Acaba de añadir una nueva denuncia en $municipio, provincia de $provincia.<br>";
	echo 'La localización geográfica de la denuncia añadida es: '.$latitud.' LAT y '.$longitud.'LON<br>';
	echo '<h1>'.$texto.'</h1><br>';
	echo "Recibirá en su correo $email los distintos detalles sobre posibles modificaciones en su denuncia.<br>";
	echo "Su denuncia irá acompañada de las siguientes imagenes.<br>"; 
	 
	$array_url = explode(',' , $photo_urls);
	for($i=1;$i<count($array_url);$i++){
		echo "<img src='$array_url[$i]'><br>";  
		$query_url = "INSERT INTO imagenes (id_denuncia, ruta) VALUES ($id_denuncia, '$array_url[$i]');";
		pg_exec($db, $query_url);
	}
	
		
?>

</body>
</html>