<?php
	
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	require('db.php');			// Fichero de conexión a la base de datos
	
		
	/* ------------------------------------ *
	 *	    	GESTIÓN DE MUNICIPIOS		*
	 * ------------------------------------ */
	 
	@ $codigoine = $_GET['codigoine'];
	
	$query = 'SELECT * FROM email WHERE id_municipio = $1 order by popularity desc';
	// Prepare a query for execution
	$result = pg_prepare($db, "Select emails", $query );
	// Execute the prepared query.  Note that it is not necessary to escape the string $codigoine in any way
	$result = pg_execute($db, "Select emails", array($codigoine));
	//	$result = pg_exec($db, $query);
	
	header('Content-Type: application/json');
	$array = array();
	while($row = pg_fetch_array($result)) {
		$array[]=$row;
	}
echo json_encode($array);	
?>
