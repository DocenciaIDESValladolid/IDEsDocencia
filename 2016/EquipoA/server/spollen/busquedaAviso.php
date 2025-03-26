<!DOCTYPE html>
<?php
date_default_timezone_set('Europe/Madrid');
?>
<html lang="es">
<head>
	<meta charset="utf-8"/>
	<title>Buscador de Avisos</title>
	<link rel="stylesheet" type="text/css" href="style.css">
	<link rel="stylesheet" type="text/css" href="estilo_f.css">
	<link rel="stylesheet" type="text/css" href="avada1.css">
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
</head>
<?php
		include 'conexion_db.php';
		@ $terminoClave= $_POST['terminoClave'];
		@ $terminoClave=trim($terminoClave);

		//no se ha introduicido ningun termino de búsqueda
		if (!$terminoClave)
		{
			 echo 'No ha introducido ningún término.<br/>';
			 exit;
		}

		$query=pg_query("select * from avisos where geom like  '%".$terminoClave."%'");

		while ($row=pg_fetch_array($query)) {
		?>
			<div class="pagina_entera">
				<center>
					<table class="col" border="2" width=20%> 
					<tr>
						<article class="col"><td colspan=1 rowspan=5 style="text-align: center;"><?php echo "<img src='productos/". $row['imagen'] ."'><br>"; ?></td>
						<td style="text-align: center;"><?php echo '<p><strong> Identificador: '; echo stripslashes($row['id_producto']); ?></td>
						</tr>
						<tr>
						<td style="text-align: center;"><?php echo '</strong><br>Marca: '; echo stripslashes($row['marca']); ?></td>
						</tr>
						<br>
					</table>
				</center>
			</div>

		<?php }
		?>
</html>