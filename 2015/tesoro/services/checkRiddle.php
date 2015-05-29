<?php
	require_once('db.php');
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	
	//recojo las variables que necesito
	/*$id_user = $_POST['id_user'];
	$id_path = $_POST['id_path'];
	$lat = $_POST['lat'];
	$long = $_POST['long'];
	$respuesta= $_POST['resp'];*/
	//Recupero la última pista descubierta
	$query ="SELECT max(num_riddle) from riddles, current_stages where current_stages.id_riddle=riddles.id" ;
	$num_riddle=pg_query($query);
	$num_riddle= pg_fetch_array($num_riddle,0,PGSQL_NUM);
	$num_riddle= $num_riddle[0]+1;
	//Compruebo si la geometría está dentro
	$query ="SELECT *,ST_Intersects(geom,ST_GeomFromText('SRID=4326;POINT($1 $2)')) as insite from riddles where num_riddle=$3 and id_path=$4" ;
	$acierto=pg_query_params($query,array($lat,$long,$num_riddle,$id_path));
	$acierto= pg_fetch_array($acierto,0,PGSQL_ASSOC);
	//si es cierto consulto si hay preguntas
	if($acierto['insite']==true)
	{
		//si hay preguntas devuelvo las preguntas y las respuestas
		if ($acierto['question']){
			$resultado= array("status"=>'challenge',
				"question"=>$acierto['question'],
				"answer1"=>$acierto['answer1'],
				"answer2"=>$acierto['answer2']
				"answer3"=>$acierto['answer3'],"msg"=>'Conteste a la siguiente pregunta');
			echo json_encode($resultado);
		}
		//si no hay preguntas devuelvo que todo bien y guardo el punto en current_stages
		else
		{
			$query ="INSERT INTO current_stages (id_path, id_user, accum_time, accum_distance, last_riddle, date, locations, id_riddle) 
			VALUES ($1,$2,0,0,$3,now(),ST_GeomFromText('SRID=4326;POINT($4 $5)'), $6);" ;
			$insertar=pg_query_params($query,array($id_path,$id_path,$lat,$long,$acierto['id']));
			$insertar= pg_fetch_array($acierto,0,PGSQL_ASSOC);
			$resultado= array("status"=>'success',"msg"=>'¡¡¡Enhorabuena!!!');
		}
		//Si hay respuesta
		if()
		//Compruebo si era el último punto, si lo es guardo todo lo referente a ese camino en stages_performed
		$query ="SELECT max(num_riddle) as num_riddle from riddles, current_stages where id_path=$1" ;
		$ultimo=pg_query_params($query,array($id_path));
		$ultimo= pg_fetch_array($acierto,0,PGSQL_ASSOC);
		if($ultimo['num_riddle']>$num_riddle)
	}
	//Si no lo es, devuelvo error
	else
	{
		$resultado= array("status"=>'miss',"msg"=>'No es el lugar correcto');
	}
	echo json_encode($resultado);
?>