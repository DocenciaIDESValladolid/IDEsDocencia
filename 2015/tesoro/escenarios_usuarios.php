<?php
	require_once('db.php');
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	
	
	//$id_user = $_POST['id'];
	$id_user= "123456789";
	$query = "SELECT distinct id_path FROM current_stages WHERE id_user = '$id_user'";
	$escenarios = pg_exec($query);
	$num_resultados=pg_num_rows($escenarios);
	for($i=0;$i<$num_resultados;$i++)
	{
		$id_path [$i] = pg_fetch_array($escenarios,$i,PGSQL_ASSOC);
	}
	echo json_encode($id_path);
?>

