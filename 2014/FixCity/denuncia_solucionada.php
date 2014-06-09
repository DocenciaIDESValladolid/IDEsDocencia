<?php
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	require('db.php');			// Fichero de conexión a la base de datos
	
	@ $id_denuncia = $_GET['id'];
	
	$update = "UPDATE estado_usuario SET estado = 1 WHERE id_denuncia = $1";
	
	$result = pg_prepare($db,'Mis denuncias', $update);
	$result = pg_exec($db, $update, array($id_denuncia));
	
	echo "HOLA CHAVALES";
	
	if(pg_affected_rows($result)==0){
		echo 'ERROR.';
	}
	else{
		echo 'Correcto.';
	}
	
?>