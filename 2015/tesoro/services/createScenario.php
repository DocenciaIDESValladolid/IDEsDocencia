<?php
	
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	include('db.php');			// Fichero de conexi�n a la base de datos
	
	// Variables de formulario
	@ $description = filter_var($_POST['description'],FILTER_SANITIZE_STRING);	
	@ $name = filter_var($_POST['name'],FILTER_SANITIZE_STRING);	
	@ $iduser = filter_var($_POST['iduser'],FILTER_SANITIZE_STRING);
	// Formateamos textos para introducir en la base de datos.
	$description = trim($description);		
	$description = addslashes($description);
	$name = trim($name);
	$name = addslashes($name);
	$iduser = trim($iduser);
	$iduser = addslashes($iduser);
	// Comprobamos que las variables que hemos pasado no están vacías.
	if (!$description || !$name || !$iduser)
	{
		$return= array("status"=>'miss',"msg"=>'Alguno de los campos se encuentra vacío');
	}
	else{
		//comprobar longitud de la descripción
		if (strlen($description)> 350)
		{
	        $return= array("status"=>'over',"msg"=>'La descripción es demasiado larga');
		}
		//comprobar longitud del nombre
		else if (strlen($name)> 20)
		{
			$return= array("status"=>'over',"msg"=>'El nombre es demasiado largo');
		}	
		else{
			//Creo el nuevo escenario, recuperando su id para crear el nuevo camino
	        $query ="INSERT INTO stages (id_creator,name,description, date, uri) 
			VALUES ($1,$2,$3,now(),'URI') returning id;";
			$resultado=pg_query_params($query,array($iduser,$name,$description));
			$id_stage= pg_fetch_array($resultado,NULL,PGSQL_ASSOC);

			//Creo el nuevo camino
			$query ="INSERT INTO paths (id_stage) 
			VALUES ($1) returning id;";
			$resultado=pg_query_params($query,array($id_stage['id']));
			$id_path= pg_fetch_array($resultado,NULL,PGSQL_ASSOC);
	        
	        $return= array("status"=>'success',"msg"=>'Escenario creado',"idPath"=>$id_path['id'],"idStage"=>$id_stage['id']);
		}

	}
	
		
    echo json_encode($return);
?>