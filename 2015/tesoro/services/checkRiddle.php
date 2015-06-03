<?php
	require_once('db.php');
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	

	//recojo las variables que necesito
	@$lat = $_POST['lat'];
	@$long = $_POST['long']; 
	@$id_user = $_POST['id_user'];
	@$id_path = $_POST['id_path'];
	@$respuesta= $_POST['resp'];

	//Recupero la última pista descubierta por el usuario para ese escenario
	$query ="SELECT max(num_riddle) from riddles r, current_stages c where c.id_riddle=r.id and id_user=$1 and c.id_path=r.id_path and c.id_path=$2" ;
	$pista_actual=pg_query_params($query,array($id_user,$id_path));
	$pista_actual= pg_fetch_array($pista_actual,0,PGSQL_NUM);
	$pista_siguiente= $pista_actual[0]+1;

	//Compruebo si la geometría está dentro
	$query ="SELECT *,ST_Intersects(geom,ST_SetSRID(ST_MakePoint($2,$1),4326)) as insite from riddles where num_riddle=$3 and id_path=$4" ;
	$acierto=pg_query_params($query,array($lat,$long,$pista_siguiente,$id_path));
	$acierto= pg_fetch_array($acierto,NULL,PGSQL_ASSOC);
	//si es cierto consulto si hay preguntas
	if($acierto['insite']=='t')
	{
		$query ="SELECT * from riddles where num_riddle=$1 and id_path=$2" ;
		$pregunta=pg_query_params($query,array($pista_actual[0],$id_path));
		$pregunta= pg_fetch_array($pregunta,NULL,PGSQL_ASSOC);
		//si hay preguntas devuelvo las preguntas y las respuestas
		if ($pregunta['question']){
			$resultado= array("status"=>'challenge',
				"question"=>$pregunta['question'],
				"answer1"=>$pregunta['answer1'],
				"answer2"=>$pregunta['answer2'],
				"answer3"=>$pregunta['answer3'],"msg"=>'Conteste a la siguiente pregunta');
			if($respuesta)
			{
				if($pregunta['correct_answer']==$respuesta)
				{
					guardarPunto($id_path,$id_user,$lat,$long,$acierto);
					$resultado= array("status"=>'success_answer',"msg"=>'¡¡¡Has acertado, a por la siguiente pista!!!');
				}
				else
				{
					$resultado= array("status"=>'fail',"msg"=>'Has fallado, inténtalo de nuevo');
				}
				
			}
		}
		//si no hay preguntas devuelvo que todo bien y guardo el punto en current_stages
		else
		{
			guardarPunto($id_path,$id_user,$lat,$long,$acierto);
			$resultado= array("status"=>'success',"msg"=>'¡¡¡Enhorabuena, a por la siguiente pista!!!');
		}
		if($resultado['status']=='success' || $resultado['status']=='success_answer'){
			//Compruebo si era el último punto, si lo es guardo todo lo referente a ese camino en stages_performed
			$query ="SELECT max(num_riddle) as num_riddle from riddles where id_path=$1" ;
			$ultimo=pg_query_params($query,array($id_path));
			$ultimo= pg_fetch_array($ultimo,NULL,PGSQL_ASSOC);
			if($ultimo['num_riddle']==$pista_siguiente)
			{
				$query ="INSERT INTO stages_performed (id_path, id_user, time, distance, date)
				VALUES ($1,$2,0,0,now());" ;
				pg_query_params($query,array($id_path,$id_user));
				$resultado= array("status"=>'success',"msg"=>'¡¡¡Enhorabuena, has completado el escenario!!!');
			}
		}
		
	}
	//Si no lo es, devuelvo que no es el lugar correcto y lo registro como fallo
	else
	{
		guardarPunto($id_path,$id_user,$lat,$long);
		$resultado= array("status"=>'miss',"msg"=>'No es el lugar correcto');
	}
	echo json_encode($resultado);

	function guardarPunto($id_path,$id_user,$lat,$long,$acierto=null)
	{
			$query ="INSERT INTO current_stages (id_path, id_user, accum_time, accum_distance,date, locations, id_riddle) 
			VALUES ($1,$2,0,0,now(),ST_SetSRID(ST_MakePoint($4,$3),4326), $5);" ;
			pg_query_params($query,array($id_path,$id_user,$lat,$long,$acierto['id']));
	}
?>