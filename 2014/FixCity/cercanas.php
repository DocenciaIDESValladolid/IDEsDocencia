<?php
&query = SELECT gid, ST_Distance_Spheroid(
ST_GeomFromText('POINT(7.6287 51.95308)',4326), 
ST_GeomFromText('POINT(' || longitud || ' ' || latitud || ')',4326), 
'SPHEROID["WGS 84",6378137,298.257223563]') AS distancia
FROM mi_tabla
ORDER BY distancia ASC
LIMIT 1;

?>