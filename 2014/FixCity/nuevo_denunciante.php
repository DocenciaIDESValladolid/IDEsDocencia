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
	
					
		if(isset($_POST['submit'])){
		$file = $_FILES['file'];
		// Si es una imagen continuamos, si no, mandamos el error :3
		if($file['type'] == 'image/jpg' || $file['type'] == 'image/png' || $file['type'] == 'image/gif' || $file['type'] == 'image/jpeg' || $file['type'] == 'image/ico')
			   {
			$data = file_get_contents($file['tmp_name']);
			$pvars = array('image' => base64_encode($data), 'key' => 'b0e52afb3ea0d34035cce1db10ddb40b');
			$curl = curl_init();
			curl_setopt($curl, CURLOPT_URL, 'http://api.imgur.com/2/upload.xml');
			curl_setopt($curl, CURLOPT_TIMEOUT, 30);
			curl_setopt($curl, CURLOPT_POST, 1);
			curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($curl, CURLOPT_POSTFIELDS, $pvars);
			$xml = curl_exec($curl);
			preg_match ("/<original>(.*)<\/original>/xsmUi", $xml, $matches);
			echo '<img src="'.$matches[1].'"><br />'.$matches[1];
			curl_close ($curl); 
		} else { echo '0: No es un archivo de imagen.'; };  }
		else
		{
			?>
			<form action="" method="post" enctype="multipart/form-data">
				<input type="file" name="file" id="file" accept="image/*" /> 
				<input type="hidden" name="key" value="b0e52afb3ea0d34035cce1db10ddb40b"/> 
				<input type="submit" name="submit" value="Subir" />
			</form>
			<?php
		};
					
	
?>

</body>
</html>