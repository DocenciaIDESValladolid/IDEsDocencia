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
<div data-role="page" data-theme="b">
<div data-role="header"><h2>Nueva denuncia</h2></div>
<div data-role="content">
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
//	@ $thumbnail_urls = $_POST['thumbnail_urls'];
	// Para el email del ayuntamiento comprobamos primero el primer input.
	// Si el usuario no ha escrito nada, leemos el correo seleccionado en el "select"
	@ $email_ayto = $_POST['emailMunicipality'];
	if(!$email_ayto){
		@ $email_ayto = $_POST['emailMunicipalitySelect'];
	}
	@ $id_facebook = $_POST['id_facebook'];	// Gestión de usuarios
	@ $name_facebook = $_POST['name_facebook'];	// Notificación de email
	@ $email = $_POST['email'];
	
	// Formateamos textos para introducir en la base de datos.
	$texto = trim($texto);		
	$texto = addslashes($texto);
	$municipio = trim($municipio);
	$municipio = addslashes($municipio);
	$provincia = trim($provincia);
	$provincia = addslashes($provincia);
	$email_ayto = trim($email_ayto);
	$email_ayto = addslashes($email_ayto);
	$id_facebook = trim($id_facebook);
	$id_facebook = addslashes($id_facebook);
	$name_facebook = trim($id_facebook);
	$name_facebook = addslashes($id_facebook);
	$email = trim($email);
	$email = addslashes($email);
	$photo_urls = trim($photo_urls);
	
	
	// Comprobamos que las variables que hemos pasado no están vacías.
	if (!$latitud || !$longitud || !$texto || !$codigoine || !$municipio 
		|| !$provincia || !$id_facebook || !$email || !$email_ayto || !$photo_urls)
	{
		echo "Faltan campos del formulario.";
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
	
	}
else
{	

	/* ------------------------------------ *
	 * 			GESTIÓN DE USUARIOS			*
	 * ------------------------------------ */
	 
	// Comprobamos que el usuario que introduce la denuncia se encuentra registrado en la aplicación
	$query = 'SELECT * FROM usuarios WHERE id_facebook LIKE $1';
	$result = pg_prepare($db, "Select user", $query );
	$result = pg_execute($db, "Select user", array($id_facebook));
	
	$row = pg_fetch_array($result);
	
	if($row == false){
		echo "Registro de nuevo usuario. Bienvenido.";
		// Si el usuario no se encuentra registrado, insertamos una nueva fila en la BD.
		$insert = 'INSERT INTO usuarios (id_facebook, email) VALUES ($1,$2);';
		$result = pg_prepare($db, "insert user", $insert );
		$result = pg_execute($db, "insert user", array($id_facebook,$email));
	}
	else{
		// El usuario se encuentra registrado.
		// Dado que el email del usuario puede haber cambiado desde el momento en el que se 
		// almacenó el usuario por primera vez, actualizamos el email.
		
		echo "Bienvenido de nuevo.";
		
		$update = 'UPDATE usuarios SET email=$1 WHERE id_facebook LIKE $2;';
		$result = pg_prepare($db, "update user", $update );
		$result = pg_execute($db, "update user", array($email,$id_facebook));
	}


	/* ------------------------------------ *
	 * 			GESTIÓN DE DENUNCIAS		*
	 * ------------------------------------ */
	// Inserción de la denuncia en la tabla de denuncias
	$query = 'INSERT INTO denuncias (texto, the_geom, fecha, codigoine) VALUES 
            ($1, ST_Transform(ST_SetSRID(ST_Point($2,$3),900913),4326),$4,$5) RETURNING id_denuncia';
	$result = pg_prepare($db, "insert denuncias", $query );
	$result = pg_execute($db, "insert denuncias", array($texto,$longitud, $latitud,date("Y-m-d"),$codigoine));		
	

    if($result==false){
		echo 'Error al introducir la denuncia en la base de datos.';
		echo '<a href="#" data-role="button" data-rel="back" data-icon="arrow-l">Back</a>';
		exit;
	}
	else{
		// Obtenemos el ID que se ha generado de la denuncia introducida, para usarlo en las posteriores sentencias.
		$row = pg_fetch_row($result);
		$id_denuncia = $row[0];
	}
	
	// Inserción de la denuncia en la tabla de denunciantes.
	$insert = 'INSERT INTO denunciantes (id_denuncia, id_denunciante, fecha) VALUES ($1,$2,$3);';
	$result = pg_prepare($db, "insert denunciantes",$insert );
	$result = pg_execute($db, "insert denunciantes", array($id_denuncia,$id_facebook,date("Y-m-d")));
	
	// Inserción en estado_usuario
	$estado_usuario = "INSERT INTO estado_usuario (id_denuncia, fecha, estado, id_usuario, codigoine) VALUES ($1,$2,$3,$4,$5);";
	$result = pg_prepare($db, "insert estado",$estado_usuario );
	$result = pg_execute($db, "insert estado", array($id_denuncia,date("Y-m-d"),0,$id_facebook,$codigoine));
	
	/* ------------------------------------ *
	 * 			GESTIÓN DE MUNICIPIOS		*
	 * ------------------------------------ */
	
	$query_municipios = 'SELECT nombre FROM municipios WHERE nombre LIKE $1';
	$result = pg_prepare($db, "select municipio",$query_municipios );
	$result = pg_execute($db, "select municipio", array($municipio));
	$row = pg_fetch_array($result);
	if($row == false)
	{
		echo "<p>Aún no teníamos ningún informe de $municipio ($provincia). Gracias por colaborar.</p>";
		$nuevo_municipio = "INSERT INTO municipios VALUES ($1, 
				(SELECT id_provincia FROM provincias WHERE nombre LIKE $2),$3)"; // TODO!! OJO no está garantizado que exista el registro en Provincias
		$result = pg_prepare($db, "insert municipio",$nuevo_municipio );
		$result = pg_execute($db, "insert municipio", array($municipio,$provincia,$codigoine));
	}

	$query_email = 'SELECT email FROM email WHERE id_municipio LIKE $1 and email LIKE $2';
	$result = pg_prepare($db, "check email",$query_email );
	$result = pg_execute($db, "check email", array($codigoine,$email_ayto));
	$row = pg_fetch_array($result);
	
	if($row == false){
		$nuevo_email = 'INSERT INTO email VALUES ($1,$2,1)';
		$result = pg_prepare($db, "insert email",$nuevo_email );
		$result = pg_execute($db, "insert email", array($email_ayto,$codigoine));
	}
	else
	{ // incrementa el contador de popularidad.
		$popular_email = 'update email set popularity=popularity+1 where email like $1 and id_municipio=$2';
		$result = pg_prepare($db, "increase email popularity",$popular_email );
		$result = pg_execute($db, "increase email popularity", array($email_ayto,$codigoine));
	}
	
	
	/*
	CREATE TABLE municipios
	(
	  nombre text,
	  provincia integer NOT NULL,
	  codigoine text NOT NULL,
	  CONSTRAINT municipios_pkey PRIMARY KEY (codigoine)
	)
	*/
	
	/* ------------------------------------ *
	 * 			GESTIÓN DE IMÁGENES 		*
	 * ------------------------------------ */	
	$query_url = 'INSERT INTO imagenes (id_denuncia, ruta) VALUES ($1,$2);';
	$result = pg_prepare($db, "insert image",$query_url );
	$array_url = explode(',' , $photo_urls);
	for($i=1;$i<count($array_url);$i++){
		$result = pg_execute($db, "insert image", array($id_denuncia,$array_url[$i]));
	}
	
	/*Texto que mostrará la información de la nueva denuncia y las imagenes que acompañan la queja.*/
	
	echo "<br>Acaba de añadir una nueva denuncia en $municipio, provincia de $provincia.<br>";
	echo 'La localización geográfica de la denuncia añadida es: '.$latitud.' LAT y '.$longitud.'LON<br>';
	echo "El texto de la denuncia es:";
	echo '<h1>'.$texto.'</h1><br>';
	echo "Recibirá en su correo $email los distintos detalles sobre posibles modificaciones en su denuncia.<br>";
	echo "Su denuncia irá acompañada de las siguientes imagenes.<br>"; 
	//echo $html;
	for($i=1;$i<count($array_url);$i++){
		/*Funcion HTML que permite visualizar la galeria de imagenes que se envian.*/
			echo "
			<a href=\"#popupPhotoLandscape$i\" data-rel=\"popup\" data-position-to=\"window\" class=\"ui-btn ui-corner-all ui-shadow ui-btn-inline\">Imagen $i</a>
			<div data-role=\"popup\" id=\"popupPhotoLandscape$i\" class=\"photopopup\" data-overlay-theme=\"a\" data-corners=\"false\" data-tolerance=\"30,15\">
				<a href=\"#\" data-rel=\"back\" class=\"ui-btn ui-corner-all ui-shadow ui-btn-right\"><img src=\"$array_url[$i]\"></a>
			</div>";
			/*FIN de Funcion HTML */
			}
	echo ' <script>
	$( document ).on( "pagecreate", function() 
			{
				$( ".photopopup" ).on({
				popupbeforeposition: function() {
				var maxHeight = $( window ).height() - 60 + "px";
				$( ".photopopup img" ).css( "max-height", maxHeight );
				}
				});
			});
			</script>';
}// HabÃ­a datos para la denuncia
echo  '<a  href="detalle.php?id='.$id_denuncia.'" class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-grid">Detalle</a>';
echo '<a class="ui-btn ui-shadow ui-corner-all ui-btn-icon-left ui-icon-mail" href="mailto:'.$email_ayto.'?subject=Ciudadano informa de un problema en '+ "$municipio($provincia)" +'&body=Estimado ayuntamiento,\n he encontrado un problema en la vía pública que supongo que le interesará por ser de su competencia. Se trata de: '.$texto.'\n\n He puesto más detalles, situación exacta y fotografías en http://itastdevserver.tel.uva.es/docenciaIDEs/2014/FixCity/detalle.php?id='+$id_denuncia+'\n\n Espero haber colaborado a tener entre todos un mejor municipio. Un saludo, atentamente:\n\n '.name_facebook.'" > Avisar con un email</a>';
?>

	</div>
	<div data-role="footer">
			<a href="#" data-role="button" data-rel="back" data-icon="arrow-l">Back</a>
	</div>
	</div>
</body>
</html>
