<?php
	
	function municipio_con_mas_denuncias(){
		/*
			SELECT id_ayto, (COUNT(estado))
			FROM estado_ayto
			WHERE estado = 0
			GROUP BY id_ayto 
			ORDER BY COUNT(estado) DESC
			LIMIT 10;
		*/
	}

	function municipio_mas_resuelve(){
	/*	SELECT id_ayto, 
			SUM(CASE WHEN estado=1 THEN 1 ELSE 0 END)*100/SUM(CASE WHEN estado=0 THEN 1 ELSE 0 END) AS Percentage,
			SUM(CASE WHEN estado=1 THEN 1 ELSE 0 END) AS Resolved,
			SUM(CASE WHEN estado=0 THEN 1 ELSE 0 END) AS Total
		FROM estado_ayto
		GROUP BY id_ayto
		ORDER BY Percentage DESC
		LIMIT 10; */
	}
	
	function municipio_menos_resuelve(){
	
	}

?>