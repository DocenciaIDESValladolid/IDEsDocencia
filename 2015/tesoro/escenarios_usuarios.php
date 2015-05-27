<?php
	require_once('db.php');
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	

	$id_user = $_POST['id'];
	$query = "SELECT distinct id_path, name FROM current_stages c,stages s, paths p WHERE id_user = '$id_user' and s.id=p.id_stage and p.id=c.id_path";
	$escenarios = pg_exec($query);
	$num_resultados=pg_num_rows($escenarios);
	for($i=0;$i<$num_resultados;$i++)
	{
		$id_path [$i] = pg_fetch_array($escenarios,$i,PGSQL_ASSOC);
	}
      //  $id_path=array(1,2);
	echo json_encode($id_path);
?>

