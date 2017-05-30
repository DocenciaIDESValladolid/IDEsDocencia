UPDATE zonas 
SET tipo = b.figura_cca  
FROM reservas_naturales_esp b
WHERE zonas.sitecode = b.sitecode;

UPDATE zonas 
SET tipo = b.figura_cca  
FROM reservas_naturales_canarias b
WHERE zonas.sitecode = b.sitecode;

UPDATE zonas 
SET tipo = b.figura_cca  
FROM parques_naturales_esp b
WHERE zonas.sitecode = b.sitecode;

UPDATE zonas 
SET tipo = b.figura_cca  
FROM parques_naturales_canarias b
WHERE zonas.sitecode = b.sitecode;

UPDATE zonas 
SET tipo = b.figura_cca  
FROM parques_nacionales_esp b
WHERE zonas.sitecode = b.sitecode;

UPDATE zonas 
SET tipo = b.figura_cca  
FROM parques_nacionales_canarias b
WHERE zonas.sitecode = b.sitecode;

UPDATE zonas 
SET tipo = b.figura_cca  
FROM paisajes_protegidos_esp b
WHERE zonas.sitecode = b.sitecode;

UPDATE zonas 
SET tipo = b.figura_cca  
FROM paisajes_protegidos_canarias b
WHERE zonas.sitecode = b.sitecode;

UPDATE zonas 
SET tipo = b.figura_cca  
FROM monumentos_naturales_esp b
WHERE zonas.sitecode = b.sitecode;

UPDATE zonas 
SET tipo = b.figura_cca  
FROM monumentos_naturales_canarias b
WHERE zonas.sitecode = b.sitecode;

UPDATE zonas 
SET tipo = b.figura_cca  
FROM otros_esp b
WHERE zonas.sitecode = b.sitecode;

