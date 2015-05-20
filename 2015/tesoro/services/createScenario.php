<?php
	
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	include('db.php');			// Fichero de conexi�n a la base de datos
	
	// Variables de formulario
	@ $description = filter_var($_POST['description'],FILTER_SANITIZE_STRING);	// Texto de la denuncia
	@ $name = filter_var($_POST['name'],FILTER_SANITIZE_STRING);	// Texto de la denuncia
	@ $longitud = filter_var($_POST['lon'],FILTER_SANITIZE_NUMBER_FLOAT);
	@ $latitud = filter_var($_POST['lat'],FILTER_SANITIZE_NUMBER_FLOAT); //necesaria esta linea y la anterior?
	@ $iduser = filter_var($_POST['iduser'],FILTER_SANITIZE_NUMBER_FLOAT);
	
	
	// Formateamos textos para introducir en la base de datos.
	$description = trim($description);		
	$description = addslashes($description);
	$name = trim($name);
	$name = addslashes($name);
	$longitud = trim($longitud);
	$latitud = trim($latitud)
	$iduser = trim($iduser);
	
	//comprobar longitud
	
	echo "el nombre es $nombre";
/*
	if (strlen ($descripcion >= 120))
	{
?>
		<script type="txt/javascrip">
		window.alert("descripcion demasiado larga");
		</script>
<?PHP
		exit;
	}	
	if (strlen ($nombre >= 20))
	{
?>
		<script type="txt/javascrip">
		window.alert("nombre demasiado larga");
		</script>
<?PHP
		exit;
	}	
	/*
        $result=new stdClass();
        $result->newId=23;
        $result->name = $name;
        $result->description = $description;
        
		$peticion = "insert into stages (id, id_creator,name,description, date, uri) values (3, 1542, '".$name."', '".$description."',(select now()) ,'uri')"; 
		//peticion a la base de datos para introducir en la tabla correspondiente
		//el id no se autoincrementa. valor de id_creator?
		//usar getdate() o dejar select now()?
	$resultado=mysql_query($peticion);

        echo json_encode($result);
        */