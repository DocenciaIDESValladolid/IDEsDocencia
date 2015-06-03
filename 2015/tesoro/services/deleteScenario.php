<?php
	require_once('db.php');
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	
	@$id_stage = $_GET['id'];
	$query = "DELETE FROM stages WHERE id = $1";
	$escenarios = pg_query_params($query,array($id_stage));
	
?>
