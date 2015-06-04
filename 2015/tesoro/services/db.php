<?php
	$db = pg_connect("host=localhost user=tesoro password=tesoro dbname=tesoro");
	if (!$db)
	{
		echo 'Error: No se ha podido realizar la conexi�n con la Base de Datos. Por favor, int�ntelo de nuevo m�s tarde.';		
		echo "<input type='button' value='Back' onClick='history.go(-1);'>";		
		exit;
	}
?>