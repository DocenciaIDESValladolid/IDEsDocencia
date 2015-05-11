--Mostrar únicamente los caminos pertenecientes a cada usuario---
--Para consultarlo, sería &viewparam=param_user:id al final del todo.
select id,id_path,accum_time,accum_distance,last_riddle,date,id_riddle,locations,  (select count(*) 
from stages_performed where current_stages.id_path=stages_performed.id_path) as finished from current_stages where id_user = '%param_user%'
--Mostrar únicamente el paso 0 de todos los caminos incluyendo una nueva columna de puntos---
--Para ello creo una capa de los puntos con el sql view siguiente--
select id,id_path,description,date, (select ST_Centroid(geom)) as point from riddles where num_riddle = 0
--Mostrar el último escenario que jugó el usuario--
select id,id_path,accum_time,accum_distance,last_riddle,date,id_riddle,locations,  (select count(*) 
from stages_performed where current_stages.id_path=stages_performed.id_path) as finished from current_stages where id_path=(select id_path from current_stages where date=(select max(date) from current_stages)) and id_user = '123456789'


select id,accum_time,accum_distance,last_riddle,date,id_riddle,locations,  (select count(*) 
from stages_performed where current_stages.id_path=stages_performed.id_path) as finished from current_stages where id_user = '%param_user%' and id_path = '%param_path%'

--Hacer el heatmap de la última ubicación de los ususarios--
select locations from current_stages where date in (select max(date) from current_stages group by id_user) 
