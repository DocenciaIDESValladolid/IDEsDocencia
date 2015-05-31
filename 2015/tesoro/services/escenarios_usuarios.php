<?php
	require_once('db.php');
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	

	$id_user = $_POST['id'];
	$query = "SELECT distinct id_path, name FROM current_stages c,stages s, paths p WHERE id_user = $1 and s.id=p.id_stage and p.id=c.id_path";
	$escenarios = pg_query_params($query,array($id_user));
	$num_resultados=pg_num_rows($escenarios);
	for($i=0;$i<$num_resultados;$i++)
	{
		$id_path [$i] = pg_fetch_array($escenarios,$i,PGSQL_ASSOC);
	}
	echo json_encode($id_path);
?>

