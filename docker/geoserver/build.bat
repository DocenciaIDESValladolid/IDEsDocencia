docker build -t juacasides/geoserver .
docker stop geoserverjetty
docker rm geoserverjetty
docker run -d --restart=always --name geoserverjetty -p 8080:8080 -v C:\GIS\geoserver_datadir:/usr/share/geoserver/data_dir juacasides/geoserver