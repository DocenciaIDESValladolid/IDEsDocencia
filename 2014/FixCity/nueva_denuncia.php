

<html>

<head>
  <title>Introducción de una Nueva Denuncia en la Base de Datos</title>
</head>

<body>
<h2>Resultado de la Introducción de Clientes en el Catálogo de Mi Empresa</h2>
<?php

@ $nombre=$_POST['nombre'];
@ $email=$_POST['email'];
@ $telefono=$_POST['telefono'];
@ $direccion=$_POST['direccion'];
@ $ciudad=$_POST['ciudad'];

  $nombre = trim($nombre);
  $email = trim($email);
  $telefono = trim($telefono);
  $direccion = trim($direccion);
  $ciudad = trim($ciudad);

  if (!$nombre || !$email || !$telefono || !$direccion || !$ciudad)
  {
     echo 'No ha introducido toda la información requerida para el cliente.<br />'
          .'Por favor, vuelva a la página anterior e inténtelo de nuevo.';
     exit;
  }
  
  $nombre = addslashes($nombre);
  $email = addslashes($email);
  $telefono = addslashes($telefono);
  $direccion = addslashes($direccion);
  $ciudad = addslashes($ciudad);

  @ $db = mysql_pconnect('servidor', 'login_BD', 'pass_BD');

  if (!$db)
  {
     echo 'Error: No se ha podido realizar la conexión con la Base de Datos. Por favor, inténtelo de nuevo más tarde.';
     exit;
  }

  mysql_select_db('nombre_BD');
  $query = "insert into clientes values 
            (NULL, '$nombre', '$email', '$telefono', '$direccion', '$ciudad')"; 
			
			/*
	INTO denuncias (texto, localizacion, fecha) 
	VALUES ('Farola deteriorada', ST_GeomFromText('POINT(-4.68651 41.61355)',4326), current_date);
*/
//   	En caso de problemas: concatenación
//		$query = "insert into clientes values 
//             (NULL, '". $nombre ."', '". $email ."', '". $telefono ."', '". $direccion ."', '" . $ciudad ."')"; 
  $resultado = mysql_query($query);
  if ($resultado)
      echo  mysql_affected_rows().' clientes introducidos en la Base de Datos.'; 
?>

</body>
</html>