<!doctype html>
<html>
	<head>
		<title>Registro</title>
		<meta charset="utf-8"/>
		<link rel="stylesheet" type="text/css" href="styleSheet/estilo.css">
		<link rel="stylesheet" type="text/css" href="styleSheet/estilo_f.css">
		<link rel="stylesheet" type="text/css" href="styleSheet/avada1.css">		
		<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
		<script type="text/javascript"  href="../js/scripts.js"></script>
	</head>
	
	<body>
	
<!-- HEADER -->
		<a><form id="separacion" name="formLogin" action="index.php" onsubmit="" method="post" >
						<button id="botonazo" name="login" value="Loguearse" type="submit">LOGUEARSE</button> 
						</form>
						<form id="separacion" name="formRegistro" action="formulIntroCliente.php" onsubmit="" method="post" >
						<button id="botonazo" name="Registrar" value="Formulario de Registro" type="submit">REGISTRARSE</button>
						</form></a>
		
	<!-- IMAGEN PRINCIPAL -->
		
	
<!-- PAGINA ENTERA -->

		<center>
			<div id="Tform">FORMULARIO DE ALERGIAS</div>
			<div id="Tdescpricion"><p>·Rellene el siguiente formulario para poder realizar compras y mantenerse informado de todas las novedades de la tienda·</div>
		</center>
				<center><section>
					<aside> </aside>
					<form method="post" action="introClientes.php" onsubmit="return validar();">
						<fieldset id="form1">
							<legend id="Tdescpricion">INFORMACION DEL CLIENTE</legend>
							<br>Nombre: <input id="name" type="text" maxlength="20" name="nombre" value="Nombre" onclick="this.value= ''"><br>
							<br>Apellidos:   <input id="apellido" type="text" maxlength="40" name="apellidos" value="Apellidos" onclick="this.value= ''"><br>
							<br>Email: <input type="text" id="email" name="email" maxlength="50" value="Correo electrónico" onclick="this.value= ''"><br>
							<br>Alergias: <input id="text" maxlength="50" type="text" name="alergias" value="Alergias" onclick="this.value= ''"><br>
							<br>Introduzca un nombre de usuario y su contraseña:<br>
							<br>Login: <input id="name" maxlength="20" type="text" name="login" value="Login" onclick="this.value= ''"><br>
							<br>Contraseña: <input id="name" maxlength="20" type="text" name="password" value="Contraseña" onclick="this.value= ''"><br>
						</fieldset>
					<button id="boton" name="enviar" value="ENVIAR" type="submit">Enviar</button> 
					<button id="boton" name="reiniciar" type="RESET">Reset</button>
				</form> 
</section></center>
		
	</body>
</html>
