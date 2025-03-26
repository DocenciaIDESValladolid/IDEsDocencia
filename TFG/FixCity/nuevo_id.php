<?php

	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	require('db.php');			// Fichero de conexi�n a la base de datos
	
        $id_denuncia = $_GET['id_denuncia'];
        $id_post = $_GET['id_post'];
        
        $update = 'UPDATE denuncias SET id_post=$1 WHERE id_denuncia = $2;';
        $result = pg_prepare($db, "update denuncia", $update );
        $result = pg_execute($db, "update denuncia", array($id_post,$id_denuncia));

?>