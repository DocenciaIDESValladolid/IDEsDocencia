

<html>

<head>
  <title>Introducción de una Nueva Denuncia en la Base de Datos</title>
</head>

<body>
<?php

error_reporting(E_ALL);

//@ $longitud=$_POST['longitud'];
//@ $latitud=$_POST['latitud'];
// Coordenadas de prueba
//$longitud = 42.000000;
//$latitud = -1.000000;
//@ $texto=$_POST['texto'];

  $texto = trim($texto);

 /* if (!$latitud || !$longitud || !$texto)
  {
     echo 'No ha introducido toda la información requerida para el cliente.<br />'
          .'Por favor, vuelva a la página anterior e inténtelo de nuevo.';
	 echo "<br><br><br><br><br><br><br><br><br><br>";		
	 echo "<input type='button' value='Back' onClick='history.go(-1);'>";
     exit;
  }*/
  
  //$texto = addslashes($texto);

  $db = pg_connect("host=postgres.idelab.uva.es user=testDev password=testIDELAB dbname=idelab");

  if (!$db)
  {
     echo 'Error: No se ha podido realizar la conexión con la Base de Datos. Por favor, inténtelo de nuevo más tarde.';		
	 echo "<input type='button' value='Back' onClick='history.go(-1);'>";		
     exit;
  }

	/*$query = "INSERT INTO denuncias (texto, localizacion, fecha) VALUES 
            ('".$texto."', ST_GeomFromText('POINT(".$longitud." ".$latitud.")',4326),current_date)"; */
			
	$query = "SELECT * FROM denuncias;";
	$result = pg_exec($db, $query);

	
	while($row = pg_fetch_array($result)) {
	  echo $row;
	  echo "<br>";
	}

	mysqli_close($con);
 
	//if ($resultado)
    echo  pg_affected_rows().' denuncias introducidas en la Base de Datos.';
	echo "<input type='button' value='Volver a Inicio' onClick='index.html';'>";
?>

</body>
</html>