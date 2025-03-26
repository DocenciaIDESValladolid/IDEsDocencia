/**
 * FUNCIONES DE LA APLICACIÓN
 * 
*/

/**
 * Funciones iniciales
 */
$('#mappage').on("pageinit", function(){
  initmap();
  initApp();
  mostrarFuegos(f_fuente,f_tiempo);
  $("#f_snapp").css('background-color', '#9d0c0c');
  $("#f_24h").css('background-color', '#9d0c0c');
});


/**
 * Medidor de peligrosidad para el informe
 */
let gauge = Gauge(
      document.getElementById("gauge"),
      {
        min: 0,
        max: 100,
        dialStartAngle: 0,
        dialEndAngle: 180,
        value: 0,
        viewBox: "0 0 100 57",
        color: function(value) {
          if(value < 20) {
            return "#5ee432";
          }else if(value < 40) {
            return "#fffa50";
          }else if(value < 60) {
            return "#f7aa38";
          }else {
            return "#ef4655";
          }
        }
      }
    );



/**
 * Función auxiliar para genear unas coordenadas BBox de NxN
 * centrada en un punto.
 */
function generateBbox(coor,n){
    return (coor[0]-n).toString()+","+(coor[1]-n).toString()+","+(coor[0]+n).toString()+","+(coor[1]+n).toString();
}


/**
 * Recoge los fuegos de la nasa y los carga en la capa
 * 
 * Tipos:
 *    0 - Europe VIIRS SNAPP  
 *    1 - Europe VIIRS NOAA
 *    2 - Europe MODIS
 * Tiempo:
 *    0 - 24 horas
 *    1 - 7 dias
*/
window.onload = function(){showloader()};
function mostrarFuegos(tipo,tiempo) {
  showloader();
  //Por defecto
  var sour="fires_snpp_24hrs"
  switch(tipo){
    case 0:
      if (tiempo == 0){
        sour="fires_snpp_24hrs"
      } else{
        sour="fires_snpp_7days"
      }
      break;
    case 1:
      if (tiempo == 0){
        sour="fires_noaa20_24hrs"
      } else{
        sour="fires_noaa20_7days"
      }
      break;
    case 2:
      if (tiempo == 0){
        sour="fires_modis_24hrs"
      } else{
        sour="fires_modis_7days"
      }
      break;
  }

  fuegosSource.clear();
  //Para la peninsula
  var url='https://firms.modaps.eosdis.nasa.gov/mapserver/wfs/Europe/908c3830b255434f23c9fb1ee4362eb4/?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=ms:'+sour+'&BBOX=536942,4176813,-1235978,5548413,EPSG:3857&outputFormat=application/json';
  fetch(url, {
       method: "GET"
    }).then(function(response) {
    return response.json();
    }).then(function(json){
      var fuegos = new ol.format.GeoJSON({featureProjection:'EPSG:3857'}).readFeatures(json);
      for (var i in fuegos){
        if(filtroSpain(fuegos[i].getGeometry().flatCoordinates)){
          fuegosSource.addFeature(fuegos[i]);
        }
      }
      aplicarEstiloFuegos();
      hideloader();
    });
  //Para las islas canarias
  var url='https://firms.modaps.eosdis.nasa.gov/mapserver/wfs/Europe/908c3830b255434f23c9fb1ee4362eb4/?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAMES=ms:fires_snpp_24hrs&BBOX=-1386262,3084613,-2117782,3501173,EPSG:3857&outputFormat=application/json';
  fetch(url, {
       method: "GET"
    }).then(function(response) {
    return response.json();
    }).then(function(json){
      var fuegos = new ol.format.GeoJSON({featureProjection:'EPSG:3857'}).readFeatures(json);
      fuegosSource.addFeatures(fuegos);
      aplicarEstiloFuegos();
    });
}

function aplicarEstiloFuegos(){
  var fuegos=fuegosSource.getFeatures()
  for (var i = 0 in fuegos) {
    if (fuegos[i].getProperties()['brightness'] < 300){
      var imag = 'pix/fuego1.png';
    }else if(fuegos[i].getProperties()['brightness'] < 320){
      var imag = 'pix/fuego2.png';
    }else{
      var imag = 'pix/fuego3.png';
    }

    var estilo = new ol.style.Style({
                        image: new ol.style.Icon({
                            anchor: [0.5, 1],
                            opacity: 1,
                            scale: 0.08,
                            zIndex: 100,
                            src: imag
                        })                               
                    });
    fuegos[i].setStyle(estilo)
  }
}



/**
 * Función para mostrar el area afectada del fuego
 */
 function getAreaFuego(feature){
  var coord = feature.getGeometry().flatCoordinates;
  //Construir nombre del servidor
  var sour="fires_snpp_24hrs"
  switch(f_fuente){
    case 0:
      if (f_tiempo == 0){
        sour="fires_snpp_24hrs"
      } else{
        sour="fires_snpp_7days"
      }
      break;
    case 1:
      if (f_tiempo == 0){
        sour="fires_noaa20_24hrs"
      } else{
        sour="fires_noaa20_7days"
      }
      break;
    case 2:
      if (f_tiempo == 0){
        sour="fires_modis_24hrs"
      } else{
        sour="fires_modis_7days"
      }
      break;
  }
  //Bounding box suficientemente ancha 10Km
  var bbox = generateBbox(coord,10000);
  //Estilo para area afectada
  var estilo_area = new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(255, 0, 0, 0.2)',
        }),
        stroke: new ol.style.Stroke({
          color: 'red',
          width: 3,
        }),
        zIndex: -1
    });
  var url = "http://localhost:8080/geoserver/ows?";
  var data = '<?xml version="1.0" encoding="UTF-8"?> \
<wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd"> \
  <ows:Identifier>gs:BufferFeatureCollection</ows:Identifier> \
  <wps:DataInputs> \
    <wps:Input> \
      <ows:Identifier>features</ows:Identifier> \
      <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wps" method="POST"> \
        <wps:Body> \
          <wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd"> \
  <ows:Identifier>gs:Transform</ows:Identifier> \
  <wps:DataInputs> \
    <wps:Input> \
      <ows:Identifier>features</ows:Identifier> \
      <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wps" method="POST"> \
        <wps:Body> \
          <wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd"> \
  <ows:Identifier>vec:Reproject</ows:Identifier> \
  <wps:DataInputs> \
    <wps:Input> \
      <ows:Identifier>features</ows:Identifier> \
      <wps:Reference mimeType="text/xml; subtype=wfs-collection/1.1" xlink:href="https://firms.modaps.eosdis.nasa.gov/mapserver/wfs/Europe/908c3830b255434f23c9fb1ee4362eb4/?SERVICE=WFS\&amp;REQUEST=GetFeature\&amp;VERSION=1.0.0\&amp;TYPENAMES=ms:'+sour+'\&amp;BBOX='+bbox+',urn:ogc:def:crs:EPSG::3857" method="GET"/> \
    </wps:Input> \
    <wps:Input> \
      <ows:Identifier>forcedCRS</ows:Identifier> \
      <wps:Data> \
        <wps:LiteralData>EPSG:4326</wps:LiteralData> \
      </wps:Data> \
    </wps:Input> \
    <wps:Input> \
      <ows:Identifier>targetCRS</ows:Identifier> \
      <wps:Data> \
        <wps:LiteralData>EPSG:3857</wps:LiteralData> \
      </wps:Data> \
    </wps:Input> \
  </wps:DataInputs> \
  <wps:ResponseForm> \
    <wps:RawDataOutput mimeType="text/xml; subtype=wfs-collection/1.1"> \
      <ows:Identifier>result</ows:Identifier> \
    </wps:RawDataOutput> \
  </wps:ResponseForm> \
</wps:Execute> \
        </wps:Body> \
      </wps:Reference> \
    </wps:Input> \
    <wps:Input> \
      <ows:Identifier>transform</ows:Identifier> \
      <wps:Data> \
        <wps:LiteralData> \
      br=115*exp(brightness/300) \n \
            br2=brightness \n \
            geo=points \n \
            time=acq_date \n \
    </wps:LiteralData> \
      </wps:Data> \
    </wps:Input> \
  </wps:DataInputs> \
  <wps:ResponseForm> \
    <wps:RawDataOutput mimeType="text/xml; subtype=wfs-collection/1.1"> \
      <ows:Identifier>result</ows:Identifier> \
    </wps:RawDataOutput> \
  </wps:ResponseForm> \
</wps:Execute> \
        </wps:Body> \
      </wps:Reference> \
    </wps:Input> \
    <wps:Input> \
      <ows:Identifier>distance</ows:Identifier> \
      <wps:Data> \
        <wps:LiteralData>1</wps:LiteralData> \
      </wps:Data> \
    </wps:Input> \
    <wps:Input> \
      <ows:Identifier>attributeName</ows:Identifier> \
      <wps:Data> \
        <wps:LiteralData>br</wps:LiteralData> \
      </wps:Data> \
    </wps:Input> \
  </wps:DataInputs> \
  <wps:ResponseForm> \
    <wps:RawDataOutput mimeType="application/json"> \
      <ows:Identifier>result</ows:Identifier> \
    </wps:RawDataOutput> \
  </wps:ResponseForm> \
</wps:Execute>';
  fetch(url, {
       method: "POST",
       body: data
    }).then(function(response) {
      return response.json();
    }).then(function(json){
      var fuegosArea = new ol.format.GeoJSON().readFeatures(json);
      //Pasamos por todos los fuegos
      var area = 0;
      var brillo = 0;
      var n = 0;
      for (var i = 0 in fuegosArea){
        fuegosArea[i].setStyle(estilo_area);
        resultSource.addFeature(fuegosArea[i]);
        area+=fuegosArea[i].getGeometry().getArea()/1000000;
        brillo+=parseInt(fuegosArea[i].get('br2'));
        n++;
      }
      /*Lo guarda en las variables generales*/
      DATOS_INFORME['fu_coor']=coord;
      DATOS_INFORME['fu_puntos']=n;
      DATOS_INFORME['fu_brillo']=(brillo/n).toFixed(2);
      DATOS_INFORME['fu_area']=area.toFixed(2);
      DATOS_INFORME['gen_fuentes']+=1;
      actDatosInforme();
    });

 }



/**
 * Función para recoger el parque de bomberos más cercano
 */
 function getBomberos(coord){
  //Estilo para bomberos
  var estilo_bomberos = new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                opacity: 1,
                scale: 0.07,
                zIndex: 100,
                src: 'pix/bomberos.png'
            })                               
        })
  //Estilo para lineas
  var estilo_linea = new ol.style.Style({
        fill: new ol.style.Fill({ color: '#d12710', weight: 3 }),
        stroke: new ol.style.Stroke({ color: '#d12710', width: 2 })
    });
  var url = "http://localhost:8080/geoserver/ows?";
  var data = '<?xml version="1.0" encoding="UTF-8"?> \
              <wps:Execute version="1.0.0" service="WPS"  \
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  \
              xmlns="http://www.opengis.net/wps/1.0.0"  \
              xmlns:wfs="http://www.opengis.net/wfs"  \
              xmlns:wps="http://www.opengis.net/wps/1.0.0"  \
              xmlns:ows="http://www.opengis.net/ows/1.1"  \
              xmlns:gml="http://www.opengis.net/gml"  \
              xmlns:ogc="http://www.opengis.net/ogc"  \
              xmlns:wcs="http://www.opengis.net/wcs/1.1.1"  \
              xmlns:xlink="http://www.w3.org/1999/xlink"  \
              xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd"> \
              <ows:Identifier>vec:Nearest</ows:Identifier> \
              <wps:DataInputs> \
                <wps:Input> \
                  <ows:Identifier>features</ows:Identifier> \
                  <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST"> \
                    <wps:Body> \
                      <wfs:GetFeature service="WFS" version="1.0.0" outputFormat="GML2" xmlns:fireQR="http://fireqr.tel.uva.es"> \
                        <wfs:Query typeName="fireQR:bomberos"/> \
                      </wfs:GetFeature> \
                    </wps:Body> \
                  </wps:Reference> \
                </wps:Input> \
                <wps:Input> \
                  <ows:Identifier>point</ows:Identifier> \
                  <wps:Data> \
                    <wps:ComplexData mimeType="application/json"> \
                      <![CDATA[{"coordinates":['+coord[0].toString()+','+coord[1].toString()+'],"type":"Point"}]]> \
                    </wps:ComplexData> \
                  </wps:Data> \
                </wps:Input> \
                <wps:Input> \
                  <ows:Identifier>crs</ows:Identifier> \
                  <wps:Data> \
                    <wps:LiteralData>EPSG:3395</wps:LiteralData> \
                  </wps:Data> \
                </wps:Input> \
              </wps:DataInputs> \
              <wps:ResponseForm> \
                <wps:RawDataOutput mimeType="application/json"> \
                  <ows:Identifier>result</ows:Identifier> \
                </wps:RawDataOutput> \
              </wps:ResponseForm> \
            </wps:Execute>';
  fetch(url, {
       method: "POST",
       body: data
    }).then(function(response) {
      return response.json();
    }).then(function(json){
      var bombero = new ol.format.GeoJSON().readFeatures(json)[0];
      bombero.setStyle(estilo_bomberos);
      resultSource.addFeature(bombero);
      //Dibuja un linea
      var linea = new ol.Feature({
          geometry: new ol.geom.LineString([coord,bombero.getGeometry().flatCoordinates])
      });
      linea.setStyle(estilo_linea);
      resultSource.addFeature(linea);
      //Ponemos los datos en el informe
      DATOS_INFORME['pb_coor']=bombero.getGeometry().flatCoordinates;
      DATOS_INFORME['pb_dist']=(linea.getGeometry().getLength()/1000).toFixed(2);
      DATOS_INFORME['pb_name']=bombero.get('name2');
      DATOS_INFORME['pb_addr']=bombero.get('address');
      DATOS_INFORME['pb_city']=bombero.get('ciudad');
      DATOS_INFORME['pb_prov']=bombero.get('provincia');
      DATOS_INFORME['pb_tel']=bombero.get('tlf');
      DATOS_INFORME['pb_email']=bombero.get('email');
      DATOS_INFORME['gen_fuentes']+=1;
      actDatosInforme();
    });
 }




/**
 * Función para recoger el hospital más cercano
 */
 function getHospital(coord){
  //Proyección de las coordenadas
  var point = new ol.geom.Point([coord[0], coord[1]]).transform('EPSG:3857','EPSG:4326');
  coord2 = point.flatCoordinates;
  //Estilo para bomberos
  var estilo_hospital = new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                opacity: 1,
                scale: 0.07,
                zIndex: 100,
                src: 'pix/hospitales.png'
            })                               
        })
  //Estilo para lineas
  var estilo_linea = new ol.style.Style({
        fill: new ol.style.Fill({ color: '#00FF00', weight: 3 }),
        stroke: new ol.style.Stroke({ color: '#00FF00', width: 2 })
    });
  var url = "http://localhost:8080/geoserver/ows?";
  var data = '<?xml version="1.0" encoding="UTF-8"?> \
              <wps:Execute version="1.0.0" service="WPS"  \
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  \
              xmlns="http://www.opengis.net/wps/1.0.0"  \
              xmlns:wfs="http://www.opengis.net/wfs"  \
              xmlns:wps="http://www.opengis.net/wps/1.0.0"  \
              xmlns:ows="http://www.opengis.net/ows/1.1"  \
              xmlns:gml="http://www.opengis.net/gml"  \
              xmlns:ogc="http://www.opengis.net/ogc"  \
              xmlns:wcs="http://www.opengis.net/wcs/1.1.1"  \
              xmlns:xlink="http://www.w3.org/1999/xlink"  \
              xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd"> \
              <ows:Identifier>vec:Nearest</ows:Identifier> \
              <wps:DataInputs> \
                <wps:Input> \
                  <ows:Identifier>features</ows:Identifier> \
                  <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST"> \
                    <wps:Body> \
                      <wfs:GetFeature service="WFS" version="1.0.0" outputFormat="GML2" xmlns:fireQR="http://fireqr.tel.uva.es"> \
                        <wfs:Query typeName="fireQR:hospitales"/> \
                      </wfs:GetFeature> \
                    </wps:Body> \
                  </wps:Reference> \
                </wps:Input> \
                <wps:Input> \
                  <ows:Identifier>point</ows:Identifier> \
                  <wps:Data> \
                    <wps:ComplexData mimeType="application/json"> \
                      <![CDATA[{"coordinates":['+coord2[0].toString()+','+coord2[1].toString()+'],"type":"Point"}]]> \
                    </wps:ComplexData> \
                  </wps:Data> \
                </wps:Input> \
                <wps:Input> \
                  <ows:Identifier>crs</ows:Identifier> \
                  <wps:Data> \
                    <wps:LiteralData>EPSG:3395</wps:LiteralData> \
                  </wps:Data> \
                </wps:Input> \
              </wps:DataInputs> \
              <wps:ResponseForm> \
                <wps:RawDataOutput mimeType="application/json"> \
                  <ows:Identifier>result</ows:Identifier> \
                </wps:RawDataOutput> \
              </wps:ResponseForm> \
            </wps:Execute>';
  fetch(url, {
       method: "POST",
       body: data
    }).then(function(response) {
      return response.json();
    }).then(function(json){
      var hospital = new ol.format.GeoJSON({featureProjection:'EPSG:3857'}).readFeatures(json)[0];
      hospital.setStyle(estilo_hospital);
      resultSource.addFeature(hospital);
      //Dibuja un linea
      var linea = new ol.Feature({
          geometry: new ol.geom.LineString([coord,hospital.getGeometry().flatCoordinates])
      });
      linea.setStyle(estilo_linea);
      resultSource.addFeature(linea);
      //Ponemos los datos en el informe
      DATOS_INFORME['ho_coor']=hospital.getGeometry().flatCoordinates;
      DATOS_INFORME['ho_dist']=(linea.getGeometry().getLength()/1000).toFixed(2);
      DATOS_INFORME['ho_name']=hospital.get('nombre');
      DATOS_INFORME['ho_addr']=hospital.get('direccion');
      DATOS_INFORME['ho_city']=hospital.get('ciudad');
      DATOS_INFORME['ho_prov']=hospital.get('provincia');
      DATOS_INFORME['pb_tipo']=hospital.get('tipo');
      DATOS_INFORME['gen_fuentes']+=1;
      actDatosInforme();
    });
 }


 /**
  * Función para recoger la fuente de agua más cercana de manera recursiva (max 200Km)
  */
  let fuenteRadio=0;
  function getFuente(coor){
    //Estilo para linea
    var estilo_linea = new ol.style.Style({
        fill: new ol.style.Fill({ color: '#0000FF', weight: 3 }),
        stroke: new ol.style.Stroke({ color: '#0000FF', width: 2 })
    });
    //Estilo para fuente
    var estilo_fuente = new ol.style.Style({
                geometry: function(feature) {
                  let geometry = feature.getGeometry();
                  let geometryType = geometry.getType();
                  return (
                      geometryType == 'Polygon' ? geometry.getInteriorPoint() :
                      geometryType == 'MultiPolygon' ? geometry.getInteriorPoints() :
                      geometry
                  );
                },
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    opacity: 1,
                    scale: 0.07,
                    zIndex: 100,
                    src: 'pix/helicoptero.png',
                }),
              });
    fuenteRadio+=1000;
    var bbox = generateBbox(coor,fuenteRadio);
    var url = 'http://localhost:8080/geoserver/ows?';
    var data = '<?xml version="1.0" encoding="UTF-8"?> \
                  <wps:Execute version="1.0.0" \
                  service="WPS" \
                  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" \
                  xmlns="http://www.opengis.net/wps/1.0.0" \
                  xmlns:wfs="http://www.opengis.net/wfs" \
                  xmlns:wps="http://www.opengis.net/wps/1.0.0" \
                  xmlns:ows="http://www.opengis.net/ows/1.1" \
                  xmlns:gml="http://www.opengis.net/gml" \
                  xmlns:ogc="http://www.opengis.net/ogc" \
                  xmlns:wcs="http://www.opengis.net/wcs/1.1.1" \
                  xmlns:xlink="http://www.w3.org/1999/xlink" \
                  xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">\
                    <ows:Identifier>gs:Nearest</ows:Identifier> \
                    <wps:DataInputs> \
                      <wps:Input> \
                        <ows:Identifier>features</ows:Identifier> \
                        <wps:Reference mimeType="text/xml; subtype=wfs-collection/1.1" \
                          xlink:href="https://servicios.idee.es/wfs-inspire/hidrografia?SERVICE=WFS&amp;VERSION=1.1.0&amp;REQUEST=GetFeature&amp;TYPENAME=hy-p:StandingWater&amp;srsNAME=urn:ogc:def:crs:EPSG::3857&amp;BBOX='+bbox+',EPSG:3857" method="GET"/> \
                      </wps:Input> \
                      <wps:Input> \
                        <ows:Identifier>point</ows:Identifier> \
                        <wps:Data> \
                          <wps:ComplexData mimeType="application/wkt"><![CDATA[Point ('+coor[0].toString()+' '+coor[1].toString()+')]]></wps:ComplexData> \
                        </wps:Data> \
                      </wps:Input> \
                    </wps:DataInputs> \
                    <wps:ResponseForm> \
                      <wps:RawDataOutput mimeType="application/json"> \
                        <ows:Identifier>result</ows:Identifier> \
                      </wps:RawDataOutput> \
                    </wps:ResponseForm> \
                  </wps:Execute>'
    fetch(url, {
       method: "POST",
       body: data
    }).then(function(response) {
      return response.text();
    }).then(function(respuesta){
      if (respuesta.includes("ExceptionReport")){
        if (fuenteRadio < 200000){    //200 Km máx
          getFuente(coor);
        }
        return false;
      }
      try{
        respuesta=respuesta.replaceAll(' null', "");
        var resjson=JSON.parse(respuesta);
        var fuente = new ol.format.GeoJSON().readFeatures(resjson)[0];
        //Dibuja fuente
        fuente.setStyle(estilo_fuente);
        fuente.setId("fuente");
        resultSource.addFeature(fuente);
        //Dibuja un linea
        var linea = new ol.Feature({
            geometry: new ol.geom.LineString([coor,fuente.getGeometry().getClosestPoint(coor)])
        });
        linea.setStyle(estilo_linea);
        resultSource.addFeature(linea);
        fuenteRadio=0;
        //Guarda en el informe los datos
        DATOS_INFORME['fa_coor']=fuente.getGeometry().getClosestPoint(coor);
        DATOS_INFORME['fa_dist']=(linea.getGeometry().getLength()/1000).toFixed(2);
        DATOS_INFORME['fa_tipo']=fuente.get('origin');
        DATOS_INFORME['fa_elev']=fuente.get('elevation');
        DATOS_INFORME['fa_sup']=fuente.get('surfaceArea');
        DATOS_INFORME['gen_fuentes']+=1;
        actDatosInforme();
      } catch(error){
        console.error("[!] Error en la petición de la fuente hídrica");
        console.error(error);
      }
    });
  }





/**
 * Función para recoger el tipo de suelo en un punto determinado
 */
 function getCorineSuelo(coord){
  var bbox = generateBbox(coord,0.01);
  var url='https://servicios.idee.es/wms-inspire/ocupacion-suelo?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&BBOX='+bbox+'&CRS=EPSG:3857&WIDTH=1&HEIGHT=1&LAYERS=LC.LandCoverSurfaces&STYLES=&FORMAT=image/png&QUERY_LAYERS=LC.LandCoverSurfaces&INFO_FORMAT=application/json&I=0&J=0';
  fetch(url, {
       method: "GET"
    }).then(function(response) {
    return response.json();
    }).then(function(json){
      try {
          var out=json['features'][0]['properties']['GRAY_INDEX'];
          /*Tabla conversión*/
          var suelo="";
          switch(out){
            case 111:
              suelo="Tejido urbano continuo";
              break;
            case 112:
              suelo="Tejido urbano discontinuo";
              break;
            case 121:
              suelo="Zona industrial o comercial";
              break;
            case 122:
              suelo="Red viaria, ferroviaria o tereno asociado";
              break;
            case 123:
              suelo="Zona portuaria";
              break;
            case 124:
              suelo="Aeropuerto";
              break;
            case 131:
              suelo="Zona de extracción minera";
              break;
            case 132:
              suelo="Escombrera o vertedero";
              break;
            case 133:
              suelo="Zona en construcción";
              break;
            case 141:
              suelo="Zona verde urbana";
              break;
            case 142:
              suelo="Instalación deportiva o recreativa";
              break;
            case 211:
              suelo="Tierra de labor en secano";
              break;
            case 212:
              suelo="Terreno regado permanentemente";
              break;
            case 213:
              suelo="Cultivo arrozal";
              break;
            case 221:
              suelo="Cultivo viñedo";
              break;
            case 222:
              suelo="Cultivo frutales";
              break;
            case 223:
              suelo="Cultivo olivares";
              break;
            case 231:
              suelo="Prado o pradera";
              break;
            case 241:
              suelo="Zona de cultivo permanente";
              break;
            case 242:
              suelo="Mosaico de cultivos";
              break;
            case 243:
              suelo="Zona cultivo y natural";
              break;
            case 244:
              suelo="Sistema agroforestal heterogéneo";
              break;
            case 311:
              suelo="Bosque de frondosas";
              break;
            case 312:
              suelo="Bosque de coníferas";
              break;
            case 313:
              suelo="Bosque mixto";
              break;
            case 321:
              suelo="Pestizales naturales";
              break;
            case 322:
              suelo="Landas o matorrales mesófilos";
              break;
            case 323:
              suelo="Matorrales esclerófilos";
              break;
            case 324:
              suelo="Matorrales boscosos de transición";
              break;
            case 331:
              suelo="Playa, duna o arenal";
              break;
            case 332:
              suelo="Roquedo";
              break;
            case 333:
              suelo="Espacio de vegetación escasa";
              break;
            case 334:
              suelo="Zona quemada";
              break;
            case 335:
              suelo="Glaciar o nieve permanente";
              break;
            case 411:
              suelo="Humedal o zona pantanosa";
              break;
            case 412:
              suelo="Turbera o prado turboso";
              break;
            case 421:
              suelo="Marisma";
              break;
            case 422:
              suelo="Salina";
              break;
            case 423:
              suelo="Zona llana intermareal";
              break;
            case 511:
              suelo="Curso de agua";
              break;
            case 512:
              suelo="Láminas de agua";
              break;
            case 521:
              suelo="Laguna costera";
              break;
            case 522:
              suelo="Estuario";
              break;
            case 523:
              suelo="Mar o océano";
              break;
            default:
              suelo="No clasificado";
              break;
          }
          DATOS_INFORME['bi_tipo']=suelo;
          DATOS_INFORME['bi_tipoNum']=out;
          DATOS_INFORME['gen_fuentes']+=1;
          actDatosInforme();
        } catch(error){
          console.error("[!] Error en la petición de tipo de suelo de Corine");
          console.error(error);
        }
      });
 }


/**
 * Función para recoger las precipitaciones esperadas
 */
 function getPrecipitaciones(coord){
  var bbox = generateBbox(coord,0.01);
  var url='https://openwms.fmi.fi/geoserver/ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&BBOX='+bbox+'&CRS=EPSG:3857&WIDTH=1&HEIGHT=1&LAYERS=Weather:precipitation-forecast&FORMAT=image/png&QUERY_LAYERS=Weather:precipitation-forecast&INFO_FORMAT=application/json&I=0&J=0';
  fetch(url, {
       method: "GET"
    }).then(function(response) {
    return response.json();
    }).then(function(json){
      try {
        var out=json['features'][0]['properties']['GRAY_INDEX'];
        DATOS_INFORME['cl_precip']=out.toFixed(2);
        DATOS_INFORME['gen_fuentes']+=1;
        actDatosInforme();
      } catch(error){
        console.error("[!] Error en la petición de las precipitaciones");
        console.error(error);
      }
    });
 }


/**
 * Función para recoger la velocidad del viento
 */
 function getViento(coord){
  var bbox = generateBbox(coord,0.01);
  var url='https://openwms.fmi.fi/geoserver/ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&BBOX='+bbox+'&CRS=EPSG:3857&WIDTH=1&HEIGHT=1&LAYERS=Weather:wind-forecast&FORMAT=image/png&QUERY_LAYERS=Weather:wind-forecast&INFO_FORMAT=application/json&I=0&J=0';
  fetch(url, {
       method: "GET"
    }).then(function(response) {
    return response.json();
    }).then(function(json){
      try {
        var out=json['features'][0]['properties']['GRAY_INDEX'];
        DATOS_INFORME['cl_vient']=(out*0.1852).toFixed(2);
        DATOS_INFORME['gen_fuentes']+=1;
        actDatosInforme();
      } catch(error){
        console.error("[!] Error en la petición del viento");
        console.error(error);
      }
    });
 }


/**
 * Función para recoger la temperatura en el punto
 */
 function getTemperatura(coord){
  var bbox = generateBbox(coord,0.01);
  var url='https://openwms.fmi.fi/geoserver/ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&BBOX='+bbox+'&CRS=EPSG:3857&WIDTH=1&HEIGHT=1&LAYERS=Weather:temperature-forecast&FORMAT=image/png&QUERY_LAYERS=Weather:temperature-forecast&INFO_FORMAT=application/json&I=0&J=0';
  fetch(url, {
       method: "GET"
    }).then(function(response) {
    return response.json();
    }).then(function(json){
      try {
        var out=json['features'][0]['properties']['GRAY_INDEX'];
        DATOS_INFORME['cl_temp']=out.toFixed(2);
        DATOS_INFORME['gen_fuentes']+=1;
        actDatosInforme();
      } catch(error){
        console.error("[!] Error en la petición de la temperatura");
        console.error(error);
      }
    });
 }


/**
 * Función para recoger la humedad en el punto
 */
 function getHumeadad(coord){
  var bbox = generateBbox(coord,0.01);
  var url='https://openwms.fmi.fi/geoserver/ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&BBOX='+bbox+'&CRS=EPSG:3857&WIDTH=1&HEIGHT=1&LAYERS=Weather:humidity-forecast&FORMAT=image/png&QUERY_LAYERS=Weather:humidity-forecast&INFO_FORMAT=application/json&I=0&J=0';
  fetch(url, {
       method: "GET"
    }).then(function(response) {
    return response.json();
    }).then(function(json){
      try {
        var out=json['features'][0]['properties']['GRAY_INDEX'];
        DATOS_INFORME['cl_humed']=out.toFixed(2);
        DATOS_INFORME['gen_fuentes']+=1;
        actDatosInforme();
      } catch(error){
        console.error("[!] Error en la petición de la humedad");
        console.error(error);
      }
    });
 }


/**
 * Función para recoger el tipo de suelo forestal
 */
 function getTipoSuelo(coord){
  var bbox = generateBbox(coord,0.01);
  var url='https://wms.mapama.gob.es/sig/Biodiversidad/MFE/wms.aspx?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&BBOX='+bbox+'&CRS=EPSG:3857&WIDTH=1&HEIGHT=1&LAYERS=LC.LandCoverSurfaces&STYLES=&FORMAT=image/png&QUERY_LAYERS=LC.LandCoverSurfaces&INFO_FORMAT=text/xml&I=0&J=0';
  fetch(url, {
       method: "GET"
    }).then(function(response) {
      return response.text();
    }).then(function(xml){
      try{
        var docum = new window.DOMParser().parseFromString(xml, "text/xml");
        var att = docum.getElementsByTagName('FIELDS')[0].getAttributeNames();
        var info={};
        for (var i = 0 in att){
          info[att[i]]=docum.getElementsByTagName('FIELDS')[0].getAttribute(att[i]);
        }
        DATOS_INFORME['bi_bosque']=info['Tipodebosquepredominante'];
        DATOS_INFORME['bi_cubiert']=info['Fraccióndecabidacubiertadelasuperficieforestalconvegetación'].replace('%','').replace('NULL','');
        DATOS_INFORME['bi_eprin']=info['Especieprincipal'];
        DATOS_INFORME['bi_eprinarea']=info['deocupacióndelaespecieprincipal'].replace('%','').replace('NULL','');
        DATOS_INFORME['bi_esec']=info['Segundaespecieprincipal'];
        DATOS_INFORME['bi_esecarea']=info['deocupacióndelasegundaespecieprincipal'].replace('%','').replace('NULL','');
        DATOS_INFORME['bi_eter']=info['Terceraespecieprincipal'];
        DATOS_INFORME['bi_eterarea']=info['deocupacióndelaterceraespecieprincipal'].replace('%','').replace('NULL','');
        DATOS_INFORME['bi_farbo']=info['Fraccióndecabidacubiertaarbórea'].replace('%','').replace('NULL','');
        DATOS_INFORME['bi_farbu']=info['Fraccióndecabidacubierta'].replace('%','').replace('NULL','');
        DATOS_INFORME['bi_fherb']=info['Fraccióndecabidacubiertaherbácea'].replace('%','').replace('NULL','');
        DATOS_INFORME['bi_comb']=info['Modelodecombustible'];
        DATOS_INFORME['gen_fuentes']+=1;
        actDatosInforme();
      } catch(error){
        console.error("[!] Error en la petición de la biodiversidad");
        console.error(error);
      }
    });
 }



/**
 * Función para recoger la frecuencia de incendios forestales
 */
 function getFrecuenciaIncendio(coord){
  var bbox = generateBbox(coord,0.01);
  var url='https://wms.mapama.gob.es/sig/Biodiversidad/Incendios/1996_2005/wms.aspx?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&BBOX='+bbox+'&CRS=EPSG:3857&WIDTH=1&HEIGHT=1&LAYERS=NZ.Fires&FORMAT=image/png&QUERY_LAYERS=NZ.Fires&INFO_FORMAT=text/plain&I=0&J=0';
  fetch(url, {
       method: "GET"
    }).then(function(response) {
      return response.text();
    }).then(function(txt){
      try {
        var aux=txt.split(";")
        var info={};
        info['municipio']=aux[13];
        info['provincia']=aux[14];
        info['comunidadAutonoma']=aux[15];
        info['numConatos']=aux[16];
        info['numIncendios']=aux[17];
        info['frecuencia']=aux[18];
        info['SuperficieArbolada']=aux[19];
        info['SuperficieNoArbolada']=aux[20];
        info['SuperficieIncendiada']=aux[21];
        /*Puede no devolver nada*/
        DATOS_INFORME['te_flag']=true;
        DATOS_INFORME['te_comu']=info['comunidadAutonoma'];
        DATOS_INFORME['te_muni']=info['municipio'];
        DATOS_INFORME['te_prov']=info['provincia'];
        DATOS_INFORME['te_incen']=info['numIncendios'];
        DATOS_INFORME['te_freq']=info['frecuencia'];
        DATOS_INFORME['gen_fuentes']+=1;
        actDatosInforme();
      } catch(error){
        console.error("[!] Error en la petición de la freq de incendios");
        console.error(error);
      }
    });
 }



function initApp() {
     /**
     * Location searching panel
     */
    $("#autocomplete").on("filterablebeforefilter", function (e, data) {
      var $ul = $(this),
          value = $(data.input).val(),
          html = "";
      $ul.html(html);
      if (value && value.length > 2) {
          $.mobile.loading("show", {
              text: 'searching',
              textVisible: true,
              theme: "b"
          });
          openStreetMapGeocoder.geocode(value, function (response) {
              if (response[0] === false) {
                  $ul.html("<li data-filtertext='" + value + "'>" + "noresults" + "</li>");
              } else {
                  $.each(response, function (i, place) {
                      $("<li data-filtertext='" + value + "'>")
                          .hide().append($("<a href='#'>").text(place.totalName)
                              .append($("<p>").text(place.type))
                          ).appendTo($ul).click(function () {
                              var extent = [];
                              extent[0] = parseFloat(place.boundingbox[2]);
                              extent[1] = parseFloat(place.boundingbox[0]);
                              extent[2] = parseFloat(place.boundingbox[3]);
                              extent[3] = parseFloat(place.boundingbox[1]);
                              extent = ol.proj.transformExtent(extent, 'EPSG:4326', 'EPSG:3857');
                              fly_to(map, null, extent);
                              $('#searchpanel').panel("close");
                          }).show();
                  });
              }
              $ul.listview("refresh");
              $ul.trigger("updatelayout");
              $.mobile.loading("hide");
          });
      }
  });
  // Scroll to collapsible expanded
  $("#infopanel").on("collapsibleexpand", "[data-role='collapsible']", function (event, ui) {
      var innerinfopanel = $("#infopanel .ui-panel-inner");
      innerinfopanel.animate({
          scrollTop: parseInt($(this).offset().top - innerinfopanel.offset().top
              + innerinfopanel.scrollTop())
      }, 500);
  });
  // Set a max-height to make large images shrink to fit the screen.
  $(document).on("popupbeforeposition", function () {
      var maxHeight = $(window).height() - 200 + "px";
      $('.ui-popup [data-role="content"]').css("max-height", maxHeight);
  });
  // Remove the popup after it has been closed to manage DOM size
  $(document).on("popupafterclose", ".ui-popup:not(#popupdialog)", function () {
      $(this).remove();
      select.getFeatures().clear();
  });
  $(document).on("click", "#acceptupdates", function () {
      infomsgs = [];
  });
  // Redraw map
  // Customize this
  $(window).on("pagecontainershow resize", function (event, ui) {
      $.mobile.resetActivePageHeight();
      var pageId = $.mobile.pageContainer.pagecontainer('getActivePage').prop("id");
      if (pageId === 'mappage') {
          if (event.type === "resize") {
              setTimeout(function () {
                  map.updateSize();
              }, 200);
          } else {
              map.updateSize();
              // Do something smart in this update
              fit_map_to_layer(sourceLayer);
          }
      } else if (pageId === 'historypage') {
          if (event.type === 'pagecontainershow') {
              alert("show something");
          }
      } else if (pageId === 'questionpage') {
          if (event.type === 'pagecontainershow') {
              if (lastsuccessfulstage.question === '') {
                  $.mobile.pageContainer.pagecontainer("change", "#mappage");
              } else {
                  alert("set something");
              }
          }
      }

  });

  //Toggle para analisis en el punto
    $('#analisisPunto').on('click', function () {
      if(inform_gen){
        toast("Existe ya un informe ya creado",1);
        return;
      }
      if(select_mode){
        //Apagar
        $("#analisisPunto").animate({"background-color": "#121212"}, 500).blur();
        //Borra el marcador
        markerFeature.setGeometry(null);
        select_mode=false;
      }else{
        //Encender
        aplicarEstiloFuegos();
        $("#analisisPunto").animate({"background-color": "#22d1c9"}, 1000).delay(2000);
        toast("Seleccione un punto a analizar",2);
        select_mode=true;
      }
    });

  //Boton fuego source1
  $("#f_snapp").on("click", function (e) {
    f_fuente=0;
    $("#f_snapp").animate({"background-color": "#9d0c0c"}, 800);
    $("#f_noaa").css('background-color', '');
    $("#f_modis").css('background-color', '');
    mostrarFuegos(f_fuente,f_tiempo);
  });
  //Boton fuego source2
  $("#f_noaa").on("click", function (e) {
    f_fuente=1;
    $("#f_snapp").css('background-color', '');
    $("#f_noaa").animate({"background-color": "#9d0c0c"}, 800);
    $("#f_modis").css('background-color', '');
    mostrarFuegos(f_fuente,f_tiempo);
  });
  //Boton fuego source3
  $("#f_modis").on("click", function (e) {
    f_fuente=2;
    $("#f_snapp").css('background-color', '');
    $("#f_noaa").css('background-color', '');
    $("#f_modis").animate({"background-color": "#9d0c0c"}, 800);
    mostrarFuegos(f_fuente,f_tiempo);
  });


  //Boton fuego 24horas
  $("#f_24h").on("click", function (e) {
    f_tiempo=0;
    $("#f_24h").animate({"background-color": "#9d0c0c"}, 800);
    $("#f_7d").css('background-color', '');
    mostrarFuegos(f_fuente,f_tiempo);
  });
  //Boton fuego 7dias
  $("#f_7d").on("click", function (e) {
    f_tiempo=1;
    $("#f_24h").css('background-color', '');
    $("#f_7d").animate({"background-color": "#9d0c0c"}, 800);
    mostrarFuegos(f_fuente,f_tiempo);
  });

  //Botón de leer informe
  $('#infopanel').panel({
      beforeclose: function () {
          select.getFeatures().clear();
      }
  });

  //Botón para borrar el informe
  $("#borrarInforme").on("click", function (e) {
    create_popup('option','borrar informe','');
  });

  //Botón para ver el informe
  $('#BotonInforme').on("click", function (e) {
    if(!inform_gen){
      toast("No hay ningún informe disponible",1);
    }
  });


  //Botón para ayuda
  $('#boton_informacion').on("click", function (e) {
    var titulo = "info";
    var html = "<p> \
                   → Genera un informe seleccionando uno de los incendios activos que se muestran. \
                </p> \
                <p>  \
                  → Una vez generado puedes visualizarlo pulsando en el botón inferior derecho de la barra inferior <b>(i)</b>. \
                </p> \
                <p> \
                  → Para borrar el informe haga click en el botón inferior derecho que aparecerá <b>(✘)</b>. \
                </p>"
    create_popup('info',titulo,html);
  })


  /*-------------------------------Initialize page -------------*/
  if ($.mobile.autoInitializePage === false) {
      $("#container").show();
      $("#loader").remove();
      $.mobile.initializePage();
      var viewport = document.querySelector("meta[name=viewport]");
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, ' +
          'maximum-scale=1.0, user-scalable=0,target-densitydpi=medium-dpi');
  }
}

  //Botón para imprimir el informe
  $('#botonImprimirInforme').on("click", function (e) {
    $(".ui-collapsible").collapsible("expand");
    print();
  });


  //Botón para borrar definitivamente
 function borrarInforme()
 {
      $("#borrarInforme").fadeOut(600);
      borrarAnalisis();
      toast("Informe eliminado",2);
      fly_back();
 };

/**
 * @param {*} cdemo 
 * @param {*} cvalue 
 * @param {*} exdays 
 */
function setCookie(cdemo, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cdemo + "=" + cvalue + "; " + expires;
}


function getCookie(cdemo) {
    var demo = cdemo + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(demo) == 0) {
            return c.substring(demo.length, c.length);
        }
    }
    return "";
}


function checkCookie(cookiename, redirect) {
    var demo = getCookie(cookiename);
    if (demo == "false") {
        document.location.href = redirect;
    }
    setCookie(cookiename, false, 1000);
}

function showloader(){
    $.mobile.loading( "show", {
            text: "Cagando Fuegos...",
            textVisible: "Cagando Fuegos...",
            theme: 'b',
            textonly: false,
            html: ""
    });
}

function hideloader(){
  $.mobile.loading( "hide" );
}

/*-------------------------------Helper functions -------------*/
function toast(msg,tipo=0) {
  if ($(".toast").length > 0) {
      /*setTimeout(function () {
          toast(msg);
      }, 2500);*/
      return;
  } else {
      var bkgcolor = "black";
      switch(tipo){
        case 0:
          bkgcolor = "black";
          break;
        case 1:
          bkgcolor = "#f72727";
          break;
        case 2:
          bkgcolor = "#0c6e06";
          break;
      }
      $("<div class='ui-loader ui-overlay-shadow  ui-corner-all toast'>" +
          "<p>" + msg + "</p></div>")
          .css({
              left: $(window).width() - 300,
              top: 70,
              backgroundColor: bkgcolor
          })
          .fadeIn(500).appendTo($.mobile.pageContainer).delay(2000)
          .slideUp(400, function () {
              $(this).remove();
          });
  }
}

function create_popup(type, title, body) {
  var header = $('<div data-role="header"><h2>' + title + '</h2></div>'),
      content = $('<div data-role="content" class="ui-content ui-overlay-b">' + body
          + '</div>'),
      popup = $('<div data-role="popup" id="' + type + '"' +
          'data-theme="b" data-transition="slidedown"></div>');
  if (type === 'info') {
      $('<a href="#" data-rel="back" class="ui-btn ui-corner-all' +
          'ui-btn-b ui-icon-delete ui-btn-icon-notext ui-btn-right"></a>').appendTo(header);
  }
  if (type === 'displayupdates') {
      $('<p class="center-wrapper"><a id="acceptupdates" href="#" data-rel="back"'
          + 'class="ui-btn center-button ui-mini ui-btn-inline">'
          + "continue" + '</a></p>')
          .appendTo(content);
      var attributes = { 'data-dismissible': false, 'data-overlay-theme': "b" };
      $(popup).attr(attributes);
  }
  if (type === 'displayerror') {
      $('<p class="center-wrapper"><a href="view.php?id=' + cmid +
          '" class="ui-btn  center-button ui-mini ui-icon-forward ui-btn-inline ui-btn-icon-left"'
          + 'data-ajax="false">' + "continue" + '</a></p>')
          .appendTo(content);
      var attributes = { 'data-dismissible': false, 'data-overlay-theme': "b" };
      $(popup).attr(attributes);
  }
  if (type == 'option') {
    $('<p class="center-wrapper"><a id="borrarInformeAceptar" onclick="borrarInforme()" href="#" data-rel="back"'
          + 'class="ui-btn center-button ui-mini ui-btn-inline">'
          + "Aceptar" + '</a>'+'<a id="borrarInformeCancelar" href="#" data-rel="back"'
          + 'class="ui-btn center-button ui-mini ui-btn-inline">'
          + "Cancelar" + '</a>'+'</p>')
          .appendTo(content);
      var attributes = { 'data-dismissible': false, 'data-overlay-theme': "b" };
      $(popup).attr(attributes);
  }
  // Create the popup.
  $(header)
      .appendTo($(popup)
          .appendTo($.mobile.activePage)
          .popup())
      .toolbar()
      .after(content);
  // Need it for calculate popup's dimesions when popup contents an image.
  totalimg = $(content).find('img');
  if (totalimg.length > 0) {
      $.mobile.loading("show");
      totalimg.one('load', function () {
          imgloaded++;
          if (totalimg.length === imgloaded) {
              open_popup(popup);
              imgloaded = 0;
              // Clear the fallback
              clearTimeout(fallback);
              $.mobile.loading("hide");
          }
      });
      // Fallback in case the browser doesn't fire a load event
      var fallback = setTimeout(function () {
          open_popup(popup);
          $.mobile.loading("hide");
      }, 2000);
  } else {
      open_popup(popup);
  }


}
function open_popup(popup) {
  // Because chaining of popups not allowed in jquery mobile.
  if ($(".ui-popup-active").length > 0) {
      $(".ui-popup").popup("close");
      setTimeout(function () {
          $(popup).popup("open", { positionTo: "window" });
      }, 1000);
  } else {
      $(popup).popup("open", { positionTo: "window" });
  }

}
function get_block_text(title, body) {
  return '<div class="ui-bar ui-bar-a">' + title +
      '</div><div class="ui-body ui-body-a">' + body +
      '</div>';
}