<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8"/>
	<title>Panel de Administración</title>
	<link rel="stylesheet" type="text/css" href="styleSheet/estilo.css">
	<link rel="stylesheet" type="text/css" href="styleSheet/estilo_f.css">
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
	<script type="text/javascript"  href="../js/scripts.js"></script>
</head>
<body style="background-color:#fff">
	<section>
		<form action="validarLogin.php" method="post"  name="formulario" accept-charset="utf-8">
			<label for="login">Usuario</label><br>
			<input type="text" id="login" name="login"><br>
			<label for="pass">Password</label><br>
			<input type="password" id="password" name="password"><br>
			<input type="submit" name="aceptar" value="Aceptar" id="boton">
			<p>  </p>
		</form>
	</section>
</body>
</html>