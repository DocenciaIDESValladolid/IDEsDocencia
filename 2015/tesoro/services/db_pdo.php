<?php
try{
	$db = new PDO('postgres:host=postgres.idelab.uva.es;dbname=idelab', 'testDev', 'testIDELAB');
	}catch (PDOException $e)
	{
	  print "Error!: " . $e->getMessage() . "<br/>";

		echo 'Error: No se ha podido realizar la conexi�n con la Base de Datos. Por favor, int�ntelo de nuevo m�s tarde.';		
		echo "<input type='button' value='Back' onClick='history.go(-1);'>";		
		exit;
	}
?>