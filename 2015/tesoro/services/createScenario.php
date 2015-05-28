<?php
	
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	include('db.php');			// Fichero de conexi�n a la base de datos
	
	// Variables de formulario
	@ $description = filter_var($_POST['description'],FILTER_SANITIZE_STRING);	
	@ $name = filter_var($_POST['name'],FILTER_SANITIZE_STRING);	
	@ $iduser = filter_var($_POST['iduser'],FILTER_SANITIZE_NUMBER_FLOAT);
	@ $riddle_geom = filter_var($_POST['riddle_geom'],FILTER_SANITIZE_NUMBER_FLOAT);
	
	// Formateamos textos para introducir en la base de datos.
	$description = trim($description);		
	$description = addslashes($description);
	$name = trim($name);
	$name = addslashes($name);
	$iduser = trim($iduser);
	
	//comprobar longitud
	
	
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
	}	*/
	
        $result=new stdClass();
        $result->newId=23;
        $result->name = $name;
        $result->description = $description;
        
		$peticion = "insert into stages (id_creator,name,description, date, uri) values ('".$iduser."', '".$name."', '".$description."',(select now()) ,'uri') returning id"; 
		//peticion a la base de datos para introducir en la tabla correspondiente
	$resultado=mysql_query($peticion);
	$peticion2 = "insert into paths (id_stage) values (".$peticion.")";
	$resultado2 = mysql_query($peticion2);
        
        $return= array("idStage"=>$resultado2->id,"numRiddles"=>$count);
        echo json_encode($return);