<?php
	
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	include('db.php');			// Fichero de conexi�n a la base de datos
	
	// Variables de formulario
	@ $pregunta = filter_var($_POST['textarea'],FILTER_SANITIZE_STRING);	// Texto de la denuncia
	@ $tipo_respuesta = filter_var($_POST['radio-choice-v-2'],FILTER_SANITIZE_STRING);  // tipo de respuesta
	@ $respuesta1 = filter_var($_POST['text-basic1'],FILTER_SANITIZE_STRING); 
	@ $respuesta2 = filter_var($_POST['text-basic2'],FILTER_SANITIZE_STRING); 
	@ $respuesta3 = filter_var($_POST['text-basic3'],FILTER_SANITIZE_STRING);  
	@ $riddle_geom = filter_var($_POST['riddle_geom'],FILTER_SANITIZE_NUMBER_FLOAT);
	@ $riddle_iduser = filter_var($_POST['riddle_iduser'],FILTER_SANITIZE_NUMBER_FLOAT);
	@ $riddle_stage = filter_var($_POST['riddle_stage'],FILTER_SANITIZE_NUMBER_FLOAT);
	@ $riddle_path = filter_var($_POST['riddle_path'],FILTER_SANITIZE_NUMBER_FLOAT);
	// Formateamos textos para introducir en la base de datos.
	$pregunta = trim($pregunta);		
	$tipo_respuesta = trim ($tipo_respuesta);
	$respuesta1 = trim($respuesta1);
	$respuesta2 = trim($respuesta2);
	$respuesta3 = trim($respuesta3);
	
	
	$id_creator = "select id_creator from stages where id ='".$riddle_stage."'";
	
	if ($id_creator == $riddle_iduser)
	{
		
		
		$peticion = "insert into riddles (id_path, num_riddle, description, answers, date, geom) values ('".$riddle_path."' , select count (num_riddle) from riddles where id_path ='".$riddle_path."','".$pregunta."','".$respuesta_final."', (select now()), '".$riddle_geom."')"; //peticion a la base de datos para introducir en la tabla correspondiente
		$id_riddle=pg_query($peticion);
		
		$result = array ("idRiddle"=> $id_riddle);
		
		
	}else{
		$result= array("status"=>"Error","Cause"=>"User is not creator");
	}	
	
	//comprobar longitud
	
	echo json_encode($result);
	/*if (strlen ($pregunta >= 120))
	{
?>
		<script type="txt/javascrip">
		window.alert("pregunta demasiado larga");
		</script>
<?PHP
		exit;
	}	
		if (strlen ($respuesta_final >= 120))
	{
?>
		<script type="txt/javascrip">
		window.alert("resultado demasiado larga");
		</script>
<?PHP
		exit;
	}	*/
/*	
        $result=new stdClass();
        $result->idRiddle=23;
//        $result->name = $name;
        $result->description = $description;
        
		
        echo json_encode($result);*/
        