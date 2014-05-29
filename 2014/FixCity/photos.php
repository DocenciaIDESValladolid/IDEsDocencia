<?php
	
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	require('db.php');			// Fichero de conexión a la base de datos
	
		
	/* ------------------------------------ *
	 *	 LISTADO DE FOTOSS		*
	 * ------------------------------------ */
	 
	@ $id = $_GET['id'];
	
	$query = 'SELECT ruta FROM imagenes WHERE id_denuncia = $1';
	// Prepare a query for execution
	$result = pg_prepare($db, "Select fotos", $query );
	// Execute the prepared query.  Note that it is not necessary to escape the string $codigoine in any way
	$result = pg_execute($db, "Select fotos", array($id));
	//	$result = pg_exec($db, $query);
	header('Content-Type: application/json');
	$array = array();
	
	while($row = pg_fetch_array($result)) {
		$array[]=array('thumbnail'=>$row['ruta'],'original'=>$row['ruta']);
		}
echo json_encode($array);	
?>
