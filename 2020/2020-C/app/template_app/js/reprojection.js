function reproject() {
  var geoprojection = geolocation.getProjection();
  var epsgcode = 'EPSG:3857';

  var prevcoords = geolocation.getPosition();
  var location = new ol.geom.Point(prevcoords);
  var destProjection = ol.proj.get(epsgcode);
  location.transform(geoprojection, destProjection);
  var newcoords = location.getCoordinates();
  
  alert(geoprojection.getCode()+'Coords: ' + prevcoords[0] + ' , ' + prevcoords[1] + ' -> ' + destProjection.getCode() + ' Coords: ' + newcoords[0] + ' , ' + newcoords[1]);
}

