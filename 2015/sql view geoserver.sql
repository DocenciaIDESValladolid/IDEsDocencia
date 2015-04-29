--Mostrar únicamente los caminos pertenecientes a cada usuario---
--Para consultarlo, sería &viewparam=param_user:id al final del todo.
select id,id_path,accum_time,accum_distance,last_riddle,date,id_riddle,locations,  (select count(*) 
from stages_performed where current_stages.id_path=stages_performed.id_path) as finished from current_stages where id_user = '%param_user%'
--Mostrar únicamente el paso 0 de todos los caminos incluyendo una nueva columna de puntos---
--Para ello creo una capa de los puntos con el sql view siguiente--
select id,id_path,description,date, (select ST_Centroid(geom)) as point from riddles where num_riddle = 0
--Y luego otro sql view con los polígonos--
select id,id_path,description,date,geom from riddles where num_riddle = 0