<?php
        error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	require('db.php');
        $id_denuncia = $_GET['id_denuncia'];
        $query = 'SELECT id_post FROM denuncias WHERE id_denuncia = $1';
        $result = pg_prepare($db, "Select id_post", $query);
        
        $result = pg_execute($db, "Select id_post", array($id_denuncia));
        
        header('Content-Type: application/json');
	$array = array();
	
	while($row = pg_fetch_array($result)) {
		$array[]=array('id_post'=>$row['id_post']);
		}
        echo json_encode($array);
?>

