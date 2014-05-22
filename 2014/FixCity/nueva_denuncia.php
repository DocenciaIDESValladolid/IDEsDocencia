<html>
<head>
	<title>Introducci�n de una Nueva Denuncia en la Base de Datos</title>
</head>
<body>
<?php
	
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	require('db.php');			// Fichero de conexi�n a la base de datos
	
	// Variables de formulario
	@ $texto = $_POST['texto'];				// Texto de la denuncia
	@ $longitud = $_POST['longitud'];		// Gesti�n de municipios
	@ $latitud = $_POST['latitud'];
	@ $codigoine = $_POST['codigoine'];
	@ $municipio = $_POST['municipio'];
	@ $provincia = $_POST['provincia'];
	//@ $email_ayto = $_POST['email_ayto'];
	$email_ayto = "josuesbla@gmail.com";
	@ $id_facebook = $_POST['id_facebook'];	// Gesti�n de usuarios
	@ $email = $_POST['email'];
	
	// Comprobamos que las variables que hemos pasado no est�n vac�as.
	if (!$latitud || !$longitud || !$texto || !$codigoine || !$municipio || !$provincia || !$id_facebook || !$email )//|| $email_ayto)
	{
		echo 'No ha introducido toda la informaci�n requerida para el cliente.<br/>'
			  .'Por favor, vuelva a la p�gina anterior e int�ntelo de nuevo.';
		echo "<br><br>";
		echo '<h1>'.$latitud.'</h1><br>';
		echo '<h1>'.$longitud.'</h1><br>';
		echo '<h1>'.$texto.'</h1><br>';
		echo '<h1>'.$codigoine.'</h1><br>';
		echo '<h1>'.$municipio.'</h1><br>';
		echo '<h1>'.$provincia.'</h1><br>';
		echo '<h1>'.$id_facebook.'</h1><br>';
		echo '<h1>'.$email.'</h1><br>';
		echo "<br><br>";
		echo "<input type='button' value='Back' onClick='history.go(-1);'>";
		exit;
	}
	
	// Mostramos por pantalla los datos que hemos pasado.
	echo "Acaba de a�adir una nueva denuncia en $municipio, provincia de $provincia.<br>";
	echo 'Localizaci�n geogr�fica: '.$latitud.' LAT y '.$longitud.'LON<br>';
	echo '<h1>'.$texto.'</h1><br>';
	echo "Recibir� en su correo $email los distintos detalles sobre posibles modificaciones en su denuncia.";
	
	// Formateamos textos para introducir en la base de datos.
	$texto = trim($texto);		
	$texto = addslashes($texto);
	$municipio = trim($municipio);
	$municipio = addslashes($municipio);
	$provincia = trim($provincia);
	$email_ayto = trim($email_ayto);
	$id_facebook = trim($id_facebook);
	$email = trim($email);


	/* ------------------------------------ *
	 * 			GESTI�N DE USUARIOS			*
	 * ------------------------------------ */
	 
	// Comprobamos que el usuario que introduce la denuncia se encuentra registrado en la aplicaci�n
	$query = "SELECT * FROM usuarios WHERE id_facebook LIKE '".$id_facebook."'";
	$result = pg_exec($db, $query);
	while($row = pg_fetch_array($result)) {
	  var_dump($row);
	  echo "<br> EY";
	}
	if($result){
		// El usuario se encuentra registrado.
		// Dado que el email del usuario puede haber cambiado desde el momento en el que se 
		// almacen� el usuario por primera vez, actualizamos el emai.
		$update = "UPDATE usuarios SET email=\"$email\" WHERE id_facebook LIKE \"$id_facebook\";";
		pg_exec($db, $update);
	}
	else{
		// Si el usuario no se encuentra registrado, insertamos una nueva fila en la BD.
		$insert = "INSERT INTO usuarios (id_facebook, email) VALUES (\"$id_facebook\",\"$email\");";
		pg_exec($db, $insert);
	}

	
	/* ------------------------------------ *
	 *	    	GESTI�N DE MUNICIPIOS		*
	 * ------------------------------------ */
	
	// Comprobamos que el municipio se encuentra en la base de datos
	$query_municipios = "SELECT codigoine FROM municipios WHERE codigoine=$codigoine";
	$existe_municipio = pg_exec($db, $query_municipios);
	
	if($existe_municipio){
		// Proseguimos ...
	}
	else{
		// Si el municipio no existe en la tabla, lo creamos.
		$nuevo_municipio = "INSERT INTO municipios (codigoine, nombre, provincia) 
								VALUES ($codigoine, \"$nombre\", (
									SELECT id_provincia FROM provincias WHERE nombre LIKE \"$provincia\"));";
		pg_exec($db, $nuevo_municipio);
	}
	
	// Nota JOSU:
	// -- EMAILY CYRUS --
	// Habr� que gestionar aqu� lo de los emails.
	// IDEA:
	// Crear aqu� un formulario pasando el codigoine, y en una nueva p�gina, dar al usuario a elegir
	// entre seleccionar un email (si hay disponibles) o introducir uno nuevo.
	
	
	/* ------------------------------------ *
	 * 			GESTI�N DE DENUNCIAS		*
	 * ------------------------------------ */
  
	// Inserci�n de la denuncia en la tabla de denuncias
	$query = "INSERT INTO denuncias (texto, the_geom, fecha) VALUES 
            ('".$texto."', ST_Transform(ST_SetSRID(ST_Point(".$longitud.", ".$latitud."),900913),4326),\"".date("Y-m-d")."\") RETURNING foo_id";
	$result = pg_exec($db, $query);

    if(pg_affected_rows($result)<1){
		echo 'Error al introducir la denuncia en la base de datos.';
		echo "<input type='button' value='Back' onClick='history.go(-1);'>";
	}
	else{
		// Obtenemos el ID que se ha generado de la denuncia introducida, para usarlo en las posteriores sentencias.
		$row = pg_fetch_row($result);
		$id_denuncia = $row[0];
	}
	
	// Inserci�n de la denuncia en la tabla de denunciantes.
	$denunciante = "SELECT _id FROM usuarios WHERE id_facebook LIKE \"$id_facebook\";";
	$insert = "INSERT INTO denunciantes (id_denuncia, id_denunciante, fecha) VALUES ($id_denuncia,$denunciante, \"".date("Y-m-d")."\");";
	$result = pg_exec($db, $insert);
	
	// Inserci�n en estado_usuario
	$estado_usuario = "INSERT INTO estado_usuario (id_denuncia, id_usuario, fecha, estado)
		VALUES ($id_denuncia, $denunciante, \"".date("Y-m-d")."\", 0);";
	$result = pg_exec($db, $estado_usuario);
	
	// Inserci�n en estado_ayto
	$estado_ayto = "INSERT INTO estado_ayto (id_denuncia, id_ayto, fecha, estado)
		VALUES ($id_denuncia, $codigoine, \"".date("Y-m-d")."\", 0);";
	$result = pg_exec($db, $estado_ayto);
	
	
	/*
	$query = "SELECT * FROM denuncias;";
	$result = pg_exec($db, $query);
	while($row = pg_fetch_array($result)) {
	  var_dump($row);
	  echo "<br>";
	}*/
?>

</body>
</html>