<?php
	require_once('db.php');
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	

	//recojo las variables que necesito
	@$lat = $_POST['lat'];
	@$long = $_POST['long'];
	$lat=  41.6594475177284;
	$long= -4.71600622908816;
	@$id_user = $_POST['id_user'];
	@$id_path = $_POST['id_path'];

	//Compruebo si la geometría está dentro
	$query ="SELECT id,ST_Intersects(geom,ST_SetSRID(ST_MakePoint($2,$1),4326)) as insite from riddles where num_riddle=0 and id_path=$3" ;
	$acierto=pg_query_params($query,array($lat,$long,$id_path));
	$acierto= pg_fetch_array($acierto,NULL,PGSQL_ASSOC);
	//si es cierto muestro la pista inicial cargando en current_stages la pista 0
	if($acierto['insite']=='t')
	{
		$query ="INSERT INTO current_stages (id_path, id_user, accum_time, accum_distance,date, locations, id_riddle) 
		VALUES ($1,$2,0,0,now(),ST_SetSRID(ST_MakePoint($4,$3),4326), $5);" ;
		pg_query_params($query,array($id_path,$id_user,$lat,$long,$acierto['id']));
		$resultado= array("status"=>'success',"msg"=>'¡Escenario comenzado, buena suerte!');
	}				
	//Si no lo es, devuelvo que no es el lugar correcto y que vaya al inicio
	else
	{
		$resultado= array("status"=>'miss',"msg"=>'No es el lugar correcto para iniciar el escenario');
	}
	echo json_encode($resultado);

?>