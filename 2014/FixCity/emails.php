<?php
	
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	require('db.php');			// Fichero de conexión a la base de datos
	
		
	/* ------------------------------------ *
	 *	    	GESTIÓN DE MUNICIPIOS		*
	 * ------------------------------------ */
	 
	@ $codigoine = $_GET['codigoine'];
	
	$query = "SELECT email FROM email WHERE id_municipio = '$codigoine'";
	$result = pg_exec($db, $query);
	
	if(pg_numrows($result)<1){
	
	}
	else{
		echo "[";
		while($row = pg_fetch_array($existe_email)) {
			echo "\"$row[0]\",";
		}
		echo "]";
	}
	
?>
