SELECT id_ayto, 
	SUM(CASE WHEN estado=1 THEN 1 ELSE 0 END)*100/SUM(CASE WHEN estado=0 THEN 1 ELSE 0 END) AS Percentage,
	SUM(CASE WHEN estado=1 THEN 1 ELSE 0 END) AS Resolved,
	SUM(CASE WHEN estado=0 THEN 1 ELSE 0 END) AS Total
	FROM estado_ayto
	GROUP BY id_ayto
	ORDER BY Percentage DESC
	LIMIT 10;


SELECT id_ayto, 
	(SUM(CASE WHEN estado=0 THEN 1 ELSE 0 END)-SUM(CASE WHEN estado=1 THEN 1 ELSE 0 END))*100/SUM(CASE WHEN estado=0 THEN 1 ELSE 0 END) AS Percentage,
	SUM(CASE WHEN estado=1 THEN 1 ELSE 0 END) AS Resolved,
	SUM(CASE WHEN estado=0 THEN 1 ELSE 0 END) AS Total
	FROM estado_ayto GROUP BY id_ayto
	ORDER BY Percentage DESC LIMIT 10;

SELECT * FROM denuncias;