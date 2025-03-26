<?php

error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	require('db.php');			// Fichero de conexi�n a la base de datos
	
        $id_post = $_GET['id_post'];
        $likes = $_GET['likes'];
        $update = 'UPDATE denuncias SET likes=$1 WHERE id_post = $2;';
        $result = pg_prepare($db, "update likes", $update );
        $result = pg_execute($db, "update likes", array($likes,$id_post));
?>

