

<html>

<head>
  <title>Introducción de una Nueva Denuncia en la Base de Datos</title>
</head>

<body>
<?php

//@ $longitud=$_POST['longitud'];
//@ $latitud=$_POST['latitud'];
// Coordenadas de prueba
$longitud = 42.000000;
$latitud = -1.000000;
@ $texto=$_POST['texto'];

  $texto = trim($texto);

  if (!$latitud || !$longitud || !$texto)
  {
     echo 'No ha introducido toda la información requerida para el cliente.<br />'
          .'Por favor, vuelva a la página anterior e inténtelo de nuevo.';
     exit;
  }
  
  $texto = addslashes($texto);

  $db = pg_connect("host=postgresql.idelab.uva.es user=testDev password=testIDELAB dbname=idelab");

  if (!$db)
  {
     echo 'Error: No se ha podido realizar la conexión con la Base de Datos. Por favor, inténtelo de nuevo más tarde.';
		<?php
			echo "<input type='button' value='Atras' onClick='history.go(-1);'>";
		?>
     exit;
  }

	$query = "INSERT INTO denuncias (texto, localizacion, fecha) VALUES 
            ('".$texto."', ST_GeomFromText('POINT(".$longitud." ".$latitud.")',4326),current_date)"; 
	$result = pg_exec($db, $query);

 
	if ($resultado)
      echo  pg_affected_rows().' denuncias introducidas en la Base de Datos.'; 
?>

</body>
</html>