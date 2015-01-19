<!DOCTYPE html>
<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
        <title>Denuncia solucionada</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=1">
        <meta name="apple-mobile-web-app-capable" content="yes">
		<meta http-equiv="Content-Language" content="es"/>
        <link rel="stylesheet" href="jquery.mobile-1.4.2.min.css">
	<link rel="stylesheet" href="theme/default/style.mobile.css" type="text/css">
	<link rel="stylesheet" href="style.mobile.css" type="text/css">
        <link rel="stylesheet" href="style.mobile-jq.css" type="text/css">
        <script src="jquery-1.9.0.js"></script>
        <script src="jquery.mobile-1.4.2.min.js"></script>
	<script src="lib/OpenLayers.js"></script>
        <script src="facebook.js"></script>
	</head>
	
        <body>
	
	<?php
	require_once('db.php');
	error_reporting(E_ALL);		// Sentencia para que se muestren los errores PHP por pantalla
	
	
	$id_denuncia = $_GET['id'];
        $res = $_GET['res'];
        $consulta = 'SELECT id_post FROM denuncias WHERE id_denuncia = $1';
        $result = pg_prepare($db, "id post", $consulta);
        $result = pg_execute($db, "id post", array($id_denuncia));
        while ($row = pg_fetch_array($result)){
            $id_post = $row['id_post'];
        }
	
        if ($res == 'no'){
            $mensaje = "Esta denuncia ha sido solucionada.";
            
            $resuelta = 'update denuncias set "Resuelta"=TRUE where id_denuncia = $1';
            $result1 = pg_prepare($db, "denuncia resuelta",$resuelta );
            $result1 = pg_execute($db, "denuncia resuelta", array($id_denuncia));
            
            $insert = "update estado_usuario SET estado=1 WHERE id_denuncia = $1";
            $result = pg_prepare($db,"Insert Resuelto", $insert);
            $result = pg_execute($db, "Insert Resuelto", array($id_denuncia));
        }
        else{
            $mensaje = "Esta denuncia vuelve a estar activa.";
            $resuelta = 'update denuncias set "Resuelta"=FALSE where id_denuncia = $1';
            $result1 = pg_prepare($db, "denuncia resuelta",$resuelta );
            $result1 = pg_execute($db, "denuncia resuelta", array($id_denuncia));
            
            $insert = "update estado_usuario SET estado=0 WHERE id_denuncia = $1";
            $result = pg_prepare($db,"Insert Resuelto", $insert);
            $result = pg_execute($db, "Insert Resuelto", array($id_denuncia));
        }
	
	?>
        <script>
            window.fbAsyncInit = function() { 
                if (fb.config.app_id) {
                    FB.init({appId: fb.config.app_id, status: true, cookie: true, xfbml: fb.config.use_xfbml});
                }
                fb.syncLogin(fb.launchReadyFuncs, "<?php echo $mensaje; ?>", "<?php echo $id_post; ?>");            
            };
        </script>
	<div data-role="page" data-theme="b">
	<div data-role="header"><h2>DENUNCIA SOLUCIONADA</h2></div>
	<div data-role="content">
		<h2>Gracias por su colaboración.</h2>
	</div>
	<div data-role="footer">
		<a href="#" data-role="button" data-rel="back" data-icon="arrow-l">Back</a>
	</div>
	
	</body>
</html>