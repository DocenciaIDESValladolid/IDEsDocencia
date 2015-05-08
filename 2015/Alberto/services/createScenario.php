<?php
	
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
//	require('db.php');			// Fichero de conexi�n a la base de datos
	
	// Variables de formulario
	@ $description = filter_var($_POST['description'],FILTER_SANITIZE_STRING);	// Texto de la denuncia
	@ $name = filter_var($_POST['name'],FILTER_SANITIZE_STRING);	// Texto de la denuncia
	@ $longitud = filter_var($_POST['lon'],FILTER_SANITIZE_NUMBER_FLOAT);
	@ $latitud = filter_var($_POST['lat'],FILTER_SANITIZE_NUMBER_FLOAT);
	@ $iduser = filter_var($_POST['iduser'],FILTER_SANITIZE_NUMBER_FLOAT);;
	
	// Formateamos textos para introducir en la base de datos.
	$description = trim($description);		
	$description = addslashes($description);
	$name = trim($name);
	$name = addslashes($name);
	
        $result=new stdClass();
        $result->newId=23;
        $result->name = $name;
        $result->description = $description;
        
        echo json_encode($result);
        