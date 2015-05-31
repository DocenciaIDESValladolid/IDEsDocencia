<?php
	
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	include('db.php');			// Fichero de conexi�n a la base de datos
	
	// Variables de formulario
	@ $pista = filter_var($_POST['riddle'],FILTER_SANITIZE_STRING);	// Texto de la pista
	@ $pregunta = filter_var($_POST['question'],FILTER_SANITIZE_STRING);	// Texto de la denuncia
	@ $respuesta_correcta = $_POST['checkbox-correct'];  // tipo de respuesta
	@ $respuesta1 = filter_var($_POST['text-basic1'],FILTER_SANITIZE_STRING); 
	@ $respuesta2 = filter_var($_POST['text-basic2'],FILTER_SANITIZE_STRING); 
	@ $respuesta3 = filter_var($_POST['text-basic3'],FILTER_SANITIZE_STRING);  
	@ $riddle_geom = filter_var($_POST['geometry'],FILTER_SANITIZE_STRING);
	@ $riddle_iduser = filter_var($_POST['iduser'],FILTER_SANITIZE_STRING);
	@ $riddle_stage = filter_var($_POST['idstage'],FILTER_SANITIZE_NUMBER_INT);
	@ $riddle_path = filter_var($_POST['idpath'],FILTER_SANITIZE_NUMBER_INT);
	// Formateamos textos para introducir en la base de datos./*

	$pista = trim($pista);
	$pista = addslashes($pista);
	$pregunta = trim($pregunta);
	$pregunta = addslashes($pregunta);
	$respuesta_correcta = trim ($respuesta_correcta);
	$respuesta_correcta = addslashes($respuesta_correcta);
	$respuesta1 = trim($respuesta1);
	$respuesta1 = addslashes($respuesta1);
	$respuesta2 = trim($respuesta2);
	$respuesta2 = addslashes($respuesta2);
	$respuesta3 = trim($respuesta3);
	$respuesta3 = addslashes($respuesta3);
	$riddle_geom = trim($riddle_geom);
	$riddle_geom = addslashes($riddle_geom);
	$riddle_iduser = trim($riddle_iduser);
	$riddle_iduser = addslashes($riddle_iduser);
	$riddle_stage = trim($riddle_stage);
	$riddle_stage = addslashes($riddle_stage);
	$riddle_path = trim ($riddle_path);
	$riddle_path = addslashes($riddle_path);
	

	// Comprobamos que las variables imprescindibles no están vacías.
	if (!$pista || !$riddle_geom || !$riddle_iduser || !$riddle_stage || !$riddle_path){

		$result= array("status"=>'miss',"msg"=>'Alguno de los campos se encuentra vacio');
	}
	else{
		//Compruebo si el que intenta añadir es el usuario correcto
	 	$query ="SELECT id_creator from stages s, paths p where s.id =$1 and p.id=$2 and p.id_stage=s.id";
		$resultado=pg_query_params($query,array($riddle_stage,$riddle_path));
		$id_creator= pg_fetch_array($resultado,NULL,PGSQL_ASSOC);
		if (trim($id_creator['id_creator']) == $riddle_iduser)
		{
			//compruebo si existe la pregunta, dado que es opcional. Si existe la incluyo
			if($pregunta && $respuesta1 && $respuesta2 && $respuesta3 && $respuesta_correcta){

				$query ="INSERT INTO riddles (id_path, num_riddle, description,date,geom,answer1,answer2,answer3,question,correct_answer) 
				VALUES ($1,(select count(id) from riddles where id_path =$1),$2,now(),st_transform(st_GeomFromText($3,900913),4326),$4,$5,
					$6,$7,$8) returning num_riddle;";
				$resultado=pg_query_params($query,array($riddle_path,$pista,$riddle_geom,
					$respuesta1,$respuesta2,$respuesta3,$pregunta,$respuesta_correcta));
				$num_riddle= pg_fetch_array($resultado,NULL,PGSQL_ASSOC);
				$result= array("status"=>"success","msg"=>"Pista con pregunta creada","numRiddle"=>$num_riddle['num_riddle']);
			}
			//Si no, no las incluyo
			else{

				$query ="INSERT INTO riddles (id_path, num_riddle, description,date,geom) 
				VALUES ($1,(select count(id) from riddles where id_path =$1),$2,now(),st_transform(st_GeomFromText($3,900913),4326)) 
				returning num_riddle;";
				$resultado=pg_query_params($query,array($riddle_path,$pista,$riddle_geom));
				$num_riddle= pg_fetch_array($resultado,NULL,PGSQL_ASSOC);
				$result= array("status"=>"success","msg"=>"Pista sin pregunta creada","numRiddle"=>$num_riddle['num_riddle']);
			}
		}
		else{

			$result= array("status"=>"fail","msg"=>"El usuario no es el creador");
		}	
	
	}
		
	echo json_encode($result);
