<html>
<head>
	<title>Introducción de una Nueva Denuncia en la Base de Datos</title>
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
	//@ $email_ayto = $_POST['email_ayto'];
	$email_ayto = "josuesbla@gmail.com";
	@ $id_facebook = $_POST['id_facebook'];	// Gestión de usuarios
	@ $email = $_POST['email'];
	
	// Comprobamos que las variables que hemos pasado no están vacías.
	if (!$latitud || !$longitud || !$texto || !$codigoine || !$municipio || !$provincia || !$id_facebook || !$email )//|| $email_ayto)
	{
		echo 'No ha introducido toda la información requerida para el cliente.<br/>'
			.'Por favor, vuelva a la página anterior e inténtelo de nuevo.';
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
	echo "Acaba de añadir una nueva denuncia en $municipio, provincia de $provincia.<br>";
	echo 'Localización geográfica: '.$latitud.' LAT y '.$longitud.'LON<br>';
	echo '<h1>'.$texto.'</h1><br>';
	echo "Recibirá en su correo $email los distintos detalles sobre posibles modificaciones en su denuncia.";
	
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
	 * 			GESTIÓN DE USUARIOS			*
	 * ------------------------------------ */
	 
	// Comprobamos que el usuario que introduce la denuncia se encuentra registrado en la aplicación
	$query = "SELECT * FROM usuarios WHERE id_facebook LIKE '".$id_facebook."'";
	$result = pg_exec($db, $query);
	if($result){
		// El usuario se encuentra registrado.
		// Dado que el email del usuario puede haber cambiado desde el momento en el que se 
		// almacenó el usuario por primera vez, actualizamos el emai.
		$update = "UPDATE usuarios SET email='$email' WHERE id_facebook LIKE '$id_facebook';";
		pg_exec($db, $update);
	}
	else{
		// Si el usuario no se encuentra registrado, insertamos una nueva fila en la BD.
		$insert = "INSERT INTO usuarios (id_facebook, email) VALUES ('$id_facebook','$email');";
		pg_exec($db, $insert);
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
		
	}
	else{
		// Obtenemos el ID que se ha generado de la denuncia introducida, para usarlo en las posteriores sentencias.
		$row = pg_fetch_row($result);
		$id_denuncia = $row[0];
	}
	
	// Inserción de la denuncia en la tabla de denunciantes.
	//$denunciante = "SELECT _id FROM usuarios WHERE id_facebook LIKE '$id_facebook';";
	$insert = "INSERT INTO denunciantes (id_denuncia, id_denunciante, fecha) VALUES ($id_denuncia,
				(SELECT _id FROM usuarios WHERE id_facebook LIKE '$id_facebook'), '".date("Y-m-d")."');";
	$result = pg_exec($db, $insert);
	
	// Inserción en estado_usuario
	$estado_usuario = "INSERT INTO estado_usuario (id_denuncia, id_usuario, fecha, estado)
		VALUES ($id_denuncia, (SELECT _id FROM usuarios WHERE id_facebook LIKE '$id_facebook'), '".date("Y-m-d")."', 0);";
	$result = pg_exec($db, $estado_usuario);
	
	// Inserción en estado_ayto
	$estado_ayto = "INSERT INTO estado_ayto (id_denuncia, fecha, estado, id_ayto)
		VALUES ($id_denuncia, '".date("Y-m-d")."', 0, '$codigoine');";
	$result = pg_exec($db, $estado_ayto);
	
	
	/* ------------------------------------ *
	 * 			GESTIÓN DE IMÁGENES 		*
	 * ------------------------------------ */
	/*
	echo "<br><br>";
	echo "<br><br>";
	echo "<br><br>";
	echo "<br><br>";
	echo "<br><br>";
	echo "<br><br>";
	echo "<br><br>";
	
	if(isset($_POST['submit'])){
		$name = $_FILES["file1"]["name"];
		$tmp_name = $_FILES["file1"]["tmp_name"];
		
		echo $name;
		echo $tmp_name;
		
		if (!empty($name)) {
			$location = 'uploads/';
			if  (move_uploaded_file($tmp_name, $location.$name.$id_denuncia)){
				echo 'Uploaded';    
			}

		} 
		
		if ($_FILES["file1"]["error"] > 0) {
			echo "Error: " . $_FILES["file1"]["error"] . "<br>";
		} 
		else {
			//echo "Upload: " . $_FILES["file1"]["name"] . "<br>";
			//echo "Type: " . $_FILES["file1"]["type"] . "<br>";
			//echo "Size: " . ($_FILES["file1"]["size"] / 1024) . " kB<br>";
			//echo "Stored in: " . $_FILES["file1"]["tmp_name"];
		}
	}
	*/
	
	
	/*
	$uploadedfileload="true";
	$uploadedfile_size = $_FILES['file1'][size];
	echo $_FILES[file1][name];
	if ($_FILES[file1][size]>2000000){
		$msg=$msg."El archivo es mayor que 2000KB, debes reduzcirlo antes de subirlo<BR>";
		$uploadedfileload="false";
	}

	if (!($_FILES[file1][type] == "image/pjpeg" OR $_FILES[file1][type] == "image/gif")){
		$msg=$msg." Tu archivo tiene que ser JPG o GIF. Otros archivos no son permitidos<BR>";
		$uploadedfileload="false";
	}

	$file_name=$_FILES[file1][name];
	$add="uploads/$file_name";
	
	if($uploadedfileload=="true"){
		if(move_uploaded_file ($_FILES[file1][tmp_name], $add)){
			echo "Ha sido subido satisfactoriamente";
		}
		else{
			echo "Error al subir el archivo";
		}
	}
	else{echo $msg;}


	/*
	$query = "SELECT * FROM denuncias;";
	$result = pg_exec($db, $query);
	while($row = pg_fetch_array($result)) {
	  var_dump($row);
	  echo "<br>";
	}*/
	
	
	/* ------------------------------------ *
	 *	    	GESTIÓN DE MUNICIPIOS		*
	 * ------------------------------------ */
	
	echo "<br><br>";
	echo "<br><br>";
	
	// Comprobamos que el municipio se encuentra en la base de datos
	$query_municipios = "SELECT codigoine FROM municipios WHERE codigoine='$codigoine'";
	$existe_municipio = pg_exec($db, $query_municipios);
	
	if($existe_municipio){
		echo $municipio." se encuentra en nuestra base de datos de municipios. <br>"; 
		$query_emails = "SELECT email FROM email WHERE id_municipio='$codigoine'";
		$existe_email = pg_exec($db, $query_emails);
		// Mostramos por pantalla la consulta
		if($existe_email){
			echo "Tenemos en nuestra base de datos los siguientes emails. "
			while($row = pg_fetch_array($existe_email) ) {
				echo $row[0];
				echo "<br>";
			}
		}
		else{
			echo "En nuestra base de datos no tenemos ningun email almacenado para contactar con este ayuntamiento. 
				Por favor, introduce uno si quieres que esta denuncia pueda ser solucionada con mayor agilidad."
		}
	}
	else{
		// Si el municipio no existe en la tabla, lo creamos.
		$nuevo_municipio = "INSERT INTO municipios (codigoine, nombre, provincia) 
								VALUES ($codigoine, '$nombre', (
									SELECT id_provincia FROM provincias WHERE nombre LIKE \"$provincia\"));";
		pg_exec($db, $nuevo_municipio);
	}
	
	
	
	
	
	
	
	
	
	
	// Nota JOSU:
	// -- EMAILY CYRUS --
	// Habrá que gestionar aquí lo de los emails.
	// IDEA:
	// Crear aquí un formulario pasando el codigoine, y en una nueva página, dar al usuario a elegir
	// entre seleccionar un email (si hay disponibles) o introducir uno nuevo.
?>

</body>
</html>