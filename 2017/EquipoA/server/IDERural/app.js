/**
 * Demo functions
 */
setTimeout(function() {

  var demoFunctions=[
  //mostar las capas con los distintos tipos de zonas
  {title:'Paisajes Protegidos',function:'addWMSLayer(\'paisajes_protegidos\')'},
	{title:'Monumentos Naturales',function:'addWMSLayer(\'monumentos_naturales\')'},
	{title:'Parques Nacionales',function:'addWMSLayer(\'parques_nacionales\')'},
	{title:'Parques Naturales',function:'addWMSLayer(\'parques_naturales\')'},
	{title:'Reservas Naturales',function:'addWMSLayer(\'reservas_naturales\')'},
	{title:'Otros',function:'addWMSLayer(\'otros\')'},
  ];

  //Para poder trabajar con el SRS EPSG:4258
  ol.proj.setProj4(proj4);
  proj4.defs("EPSG:4258","+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs");


  var liststring ='';
  demoFunctions.forEach(function(element) {
      liststring = liststring +  '<li><a href="#" onclick="'+element.function+'">'+ element.title +'</a></li>';
  }, this);
  var list = $('#listdemos');
  var listcontent = $(liststring);
  list.html(liststring);
  list.trigger('create');
  }, 100);

  
  //WMS para añadir las capas a la lista de capas.
  function addWMSLayer(nombre){
      var wms =new ol.layer.Image({
            //extent: [-13884991, 2870341, -7455066, 6338219],
            name: nombre+' de la península',
            source: new ol.source.ImageWMS({
              url: 'http://localhost:8081/geoserver/wms',
              params: {'LAYERS': 'p_casas_rurales:'+nombre+'_esp','STYLES':'parques_naturales'},
              serverType: 'geoserver'
            })
          });
      map.addLayer(wms);
      add_layer_to_list(wms);
      var wms =new ol.layer.Image({
            //extent: [-13884991, 2870341, -7455066, 6338219],
            name: nombre+' de las Islas Canarias',
            source: new ol.source.ImageWMS({
              url: 'http://localhost:8081/geoserver/wms',
              params: {'STYLES':'parques_naturales','LAYERS': 'p_casas_rurales:'+nombre+'_canarias'},
              serverType: 'geoserver'
            })
          });
      map.addLayer(wms);
      add_layer_to_list(wms);
      
  }


  //WFS par obtener la Feature de la provincia a partir de unas coordenadas
  function addWFSFeatureProvincia(coord,riesgoMax,distMax){
      var vectorSource = new ol.source.Vector();
        var vector = new ol.layer.Vector({
            name: 'GetFeature Provincia',
          source: vectorSource,
          style: new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'rgba(0, 0, 0, 1.0)',
              width: 2
            })
          })
        });
        // generate a GetFeature request
        var coordenadas = new ol.geom.Point(coord);
        var featureRequest = new ol.format.WFS().writeGetFeature({
          srsName: 'EPSG:3857',
          featureNS: 'p_casas_rurales',
          featurePrefix: 'p_casas_rurales',
          featureTypes: ['provincias'],
          outputFormat: 'application/json',//'text/xml; subtype=gml/3.1.1',
          filter: ol.format.filter.intersects('the_geom', coordenadas,'EPSG:3857')
        });
        var featuresRiesgo=null;
        // then post the request and add the received features to a layer
        fetch('http://localhost:8081/geoserver/wfs', {
          method: 'POST',
          body: new XMLSerializer().serializeToString(featureRequest)
        })
        .then(function(response) {
        return response.json();
      }).then(function(json) {
        var features = new ol.format.GeoJSON().readFeatures(json);    
          vectorSource.addFeatures(features);
          map.addLayer(vector);
          add_layer_to_list(vector);
          //Para hacer zoom a la provincia
          map.getView().fit(vectorSource.getExtent());
          return features;
       }).then(function(features) {
         var cod_prov=features[0].get('codigo');
          var the_geom=features[0].getGeometry();
          console.log('DIST-MAX:'+distMax);
          addWFSFeatureRiesgos(riesgoMax,cod_prov,distMax,the_geom);
        });
        
  }

//WFS para obtener los municipios de la provincia seleccionada con menor riesgo de incendio del introduccido por el usuario 
  function addWFSFeatureRiesgos(riesgo,cod_prov,distMax,the_geom){
      var vectorSource = new ol.source.Vector();
        var vector = new ol.layer.Vector({
            name: 'GetFeature Riesgos',
          source: vectorSource,
          style: new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'rgba(0, 0, 0, 1.0)',
              width: 1
            }),
              fill: new ol.style.Fill({
              color: 'rgba(255, 0, 0, 1.0)'
            })
          })
        });
       
        //Provincias sin datos de incendios
        if(cod_prov==6 || cod_prov==4 ||cod_prov==3 ||cod_prov==8 ||cod_prov==1 ||cod_prov==9 ||cod_prov==2 ||cod_prov==7 ||cod_prov==5){
            create_popup('info','No existen datos del riesgo de incendio','No se tendrá en cuenta el riesgo de incendio de las zonas obtenidas.');
            // generate a GetFeature request
            var featureRequest = new ol.format.WFS().writeGetFeature({
              srsName: 'EPSG:3857',
              featureNS: 'p_casas_rurales',
              featurePrefix: 'p_casas_rurales',
              featureTypes: ['incendios_por_municipios'],
              outputFormat: 'application/json',
              filter: ol.format.filter.like('cod_prov', cod_prov)
            });
          }
       //Provincias con datos de incendios 
        else{
           // generate a GetFeature request
          var featureRequest = new ol.format.WFS().writeGetFeature({
            srsName: 'EPSG:3857',
            featureNS: 'p_casas_rurales',
            featurePrefix: 'p_casas_rurales',
            featureTypes: ['incendios_por_municipios'],
            outputFormat: 'application/json',
            filter: ol.format.filter.and(
              ol.format.filter.like('cod_prov', cod_prov),
              ol.format.filter.lessThan('total', riesgo)
            )
          });
        }
          // then post the request and add the received features to a layer
          fetch('http://localhost:8081/geoserver/wfs', {
            method: 'POST',
            body: new XMLSerializer().serializeToString(featureRequest)
          }).then(function(response) {
            return response.json();
          }).then(function(json) {
            featuresRiesgo= new ol.format.GeoJSON().readFeatures(json);
            
            vectorSource.addFeatures(featuresRiesgo);
            map.addLayer(vector);
            add_layer_to_list(vector);
            return featuresRiesgo;
          }).then(function(featuresRiesgo) {
            if(featuresRiesgo.length<1){
              create_popup('error','Riesgo máximo demasiado bajo','Dentro de la provincia seleccionada no existe ningún municipio con un riesgo menor al introduccido como máximo')
            }
            else{
            addWFSFeatureDistancias(distMax,the_geom);
            }
        });    
  }

//WFS para obtener los polígonos, dentro de la provincia seleccionada, con una distancia máxima a las zonas naturales introduccida por el usario 
  function addWFSFeatureDistancias(distMax,the_geom){
      var vectorSource = new ol.source.Vector();
        var vector = new ol.layer.Vector({
            name: 'GetFeature distancias',
          source: vectorSource,
          style: new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'rgba(0, 255, 0, 1.0)',
              width: 2
              }),
          })
        });
        
        // generate a GetFeature request
        var featureRequest = new ol.format.WFS().writeGetFeature({
          srsName: 'EPSG:3857',
          featureNS: 'p_casas_rurales',
          featurePrefix: 'p_casas_rurales',
          featureTypes: ['distancias_zonas'],
          outputFormat: 'application/json',
          filter: ol.format.filter.and(
            ol.format.filter.greaterThan('distancia', distMax),
            ol.format.filter.intersects('the_geom', the_geom,'EPSG:3857')
            
          )
        });

        // then post the request and add the received features to a layer
        fetch('http://localhost:8081/geoserver/wfs', {
          method: 'POST',
          body: new XMLSerializer().serializeToString(featureRequest)
        }).then(function(response) {
          return response.json();
        }).then(function(json) {
          var features = new ol.format.GeoJSON().readFeatures(json);
          vectorSource.addFeatures(features);
          map.addLayer(vector);
          add_layer_to_list(vector);
          return features;
         }).then(function(features) {
           if(features.length<1){
              create_popup('error','Distancia máxima demasiado baja','Dentro de la provincia seleccionada no existe ningún municipio con una distancia tan baja a ninguna zona natural')
            }
            else{
              WPSIntersect(featuresRiesgo,features);
            }
        });

  }

  //WPS para obtener los municipios que cumplen las restricciones impuestas por el usuario, distancia máxima y riesgo máximo.
  function WPSIntersect(feature1,feature2){
    $.ajax({url:'http://localhost:8081/geoserver/wps',
    dataType:'text',
    type:'post',
    data: getWPSRequest(feature1,feature2),
    contentType:'application/json; charset=utf-8',
    success:function(response, status, xhr){
      WPSGeometry(response);
    }});
  }

//WPS para transformar una colección de features en una geometría
 function WPSGeometry(feauturesIntersect){
    $.ajax({url:'http://localhost:8081/geoserver/wps',
    dataType:'text',
    type:'post',
    data: getWPSTransform(feauturesIntersect),
    contentType:"application/json; charset=utf-8",
    success:function(response, status, xhr){
      var responseStr = response.toString();
      if(responseStr.indexOf('size=0')!=-1){
        create_popup('error','Valores demasiado bajos','No existe ninguna zona que cumpla los valores introduccidos en el formulario, por favor introduzca valores mayores.');
      }
      else{
        var start=response.indexOf("<gml:MultiPolygon");
        var end=response.indexOf("</gml:MultiPolygon>");
        var geomStr = response.substring(start,end+19);
        var geomStr=geomStr.replace(/NaN/gi, '');
        WFSSuelo(geomStr,feauturesIntersect);
      }
    }});  
  }

  //WFS para obtener el suelo urbanizable que cumple las condiciones impuestas por el usuario
  function WFSSuelo(geometry,featuresIntersect){
    $.ajax({url:'http://visorsiu.fomento.es/geoserver/wfs',
          dataType:'text',
          type:'post',
          data: getWFSSuelorequest(geometry),
          contentType:'application/json; charset=utf-8',
          success:function(response, status, xhr){
            var responseStr=response.toString();
            if(responseStr.indexOf('Exception')!=-1){
              create_popup('error','Problema con el servidor','El servidor no puede procesar tantos datos, por favor introduce unos valores más restrictivos en el formulario.')
            }
            else if(responseStr.indexOf('numberOfFeatures="0"')!=-1){
              create_popup('error','Valores demasiado bajos','No existe ningun zona con suelo urbanizable que cumpla los valores introduccidos en el formulario, por favor introduzca valores mayores.')
            }
            else{       
              WPSReproject(featuresIntersect,response);
            }
        }});
  }

  //WPS para transformar la geometría de las features de suelo urbanizable devueltas por la petición anterior
  function WPSReproject(featuresIntersect,featuresSuelo){
    $.ajax({url:'http://localhost:8081/geoserver/wps',
      dataType:'text',
      type:'post',
      data: getWPSReproject(featuresSuelo),
      contentType:"application/json; charset=utf-8",
      success:function(response, status, xhr){ 
        WPSIntersect2(featuresIntersect,response);
      }});
  }

  //WPS para poder asociar a cada feature de suelo urbanizable un valor de riesgo de incendio y de distancia a la zona natural más cercana
  function  WPSIntersect2(featuresIntersect,featuresSuelo){
       var vectorSourceResult = new ol.source.Vector();
          var vectorResult = new ol.layer.Vector({
              name: 'Result',
              source: vectorSourceResult,
              style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                  color: 'rgba(0, 0, 0, 1.0)',
                  width: 1
                })                  
              })
          });
     $.ajax({url:'http://localhost:8081/geoserver/wps',
        dataType:'text',
        type:'post',
        data: getWPSRequest2(featuresIntersect,featuresSuelo),
        contentType:'application/json',
        success:function(response, status, xhr){   
          var responseStr = response.toString();
          if(responseStr.indexOf('Exception')!=-1){
            create_popup('error','Valores demasiado bajos','No existe ninguna zona urbanizable que cumpla los valores introduccidos en el formulario, por favor introduzca valores mayores.');
          }
          else{ 
            var features = new ol.format.WFS().readFeatures(response);
              for(var i=0; i<features.length; i++) {
                  vectorSourceResult.addFeature(features[i]);
                  var riesgo=features[i].get('feat1_feat1_total');
                  var distancia=features[i].get('feat1_INTERSECTION_ID');
                  var cod_prov=features[i].get('feat1_feat1_cod_prov');
                  var sinRiesgo=false;
                  if(cod_prov==6 || cod_prov==4 ||cod_prov==3 ||cod_prov==8 ||cod_prov==1 ||cod_prov==9 ||cod_prov==2 ||cod_prov==7 ||cod_prov==5){
                    var sinRiesgo=true;
                  }
                  var valor=capturarDatos(riesgo,distancia,sinRiesgo);
                  features[i].set('feat1_feat1_gid',valor);
                  features[i].setStyle(stylefunction(valor));
              }  
            map.addLayer(vectorResult);
            add_layer_to_list(vectorResult);
            map.getView().fit(vectorSourceResult.getExtent()); 
          } 
    }});
    // GetFeatureInfo
      map.on('singleclick', function(evt) {
        map.forEachFeatureAtPixel(map.getEventPixel(evt.originalEvent),function(feature,layer){
          if(layer.get('name')=='Result'){
            var municipio= feature.get('feat1_feat1_texto');
            var riesgo= feature.get('feat1_feat1_total');
            var distancia= feature.get('feat1_INTERSECTION_ID');
             var valoracion= feature.get('feat1_feat1_gid');
             var cod_prov=feature.get('feat1_feat1_cod_prov');
             if(cod_prov==6 || cod_prov==4 ||cod_prov==3 ||cod_prov==8 ||cod_prov==1 ||cod_prov==9 ||cod_prov==2 ||cod_prov==7 ||cod_prov==5){
               riesgo='(Sin información)';
             }
            if(distancia==11){
              var rango_distancia='0';
            }
            else{
            var rango_distancia= '['+(100-(distancia*10))+'-'+(110-(distancia*10))+']';
            }
            create_popup('info','Información de zona seleccionada','Municipio:'+municipio+'<br>Riesgo de incendio:'+riesgo+'<br>Distancia a la zona natural:'+rango_distancia+'Km<br>VALORACIÓN:'+valoracion);
          }
        });
      });
   
  }

//Función que devuelve el estilo en función de la valoración
function stylefunction(valor){
  return  new ol.style.Style({
                stroke: new ol.style.Stroke({
                  color: 'rgba(0, 0, 0, 1.0)',
                  width: 1
                }),
                  fill: new ol.style.Fill({
                  color: 'rgba('+(440-(valor*40))+','+(440-(valor*40))+',255 , 1.0)'
                })
              })  

}

  //Petición de interseción
  function getWPSRequest(feature1,feature2){
    var featurecoll1 = new ol.format.GML3({featureType:'feat1',featureNS:'IDEs',srsName:'EPSG:3857'}).writeFeatures(feature1);
    var featurecoll2 = new ol.format.GML3({featureType:'feat2',featureNS:'IDEs',srsName:'EPSG:3857'}).writeFeatures(feature2);
    return `<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
  <ows:Identifier>vec:IntersectionFeatureCollection</ows:Identifier>
  <wps:DataInputs>
    <wps:Input>
      <ows:Identifier>first feature collection</ows:Identifier>
      <wps:Data>
        <wps:ComplexData mimeType="text/xml; subtype=wfs-collection/1.1"><![CDATA[<wfs:FeatureCollection xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs" xmlns:ows="http://www.opengis.net/ows" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:gml="http://www.opengis.net/gml" xmlns:opengeo="http://opengeo.org" xmlns:usa="http://census.gov" xmlns:semana6="semana6" xmlns:semana7="semana7" xmlns:p_casas_rurales="p_casas_rurales" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wfs http://localhost:8081/geoserver/schemas/wfs/1.1.0/wfs.xsd">
`+featurecoll1+`</wfs:FeatureCollection>]]></wps:ComplexData>
      </wps:Data>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>second feature collection</ows:Identifier>
      <wps:Data>
        <wps:ComplexData mimeType="text/xml; subtype=wfs-collection/1.1"><![CDATA[<wfs:FeatureCollection xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs" xmlns:ows="http://www.opengis.net/ows" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:gml="http://www.opengis.net/gml" xmlns:opengeo="http://opengeo.org" xmlns:usa="http://census.gov" xmlns:semana6="semana6" xmlns:semana7="semana7" xmlns:p_casas_rurales="p_casas_rurales" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xsi:schemaLocation="http://www.opengis.net/wfs http://localhost:8081/geoserver/schemas/wfs/1.1.0/wfs.xsd">
`+featurecoll2+`</wfs:FeatureCollection>]]></wps:ComplexData>
      </wps:Data>
    </wps:Input>
  </wps:DataInputs>
  <wps:ResponseForm>
    <wps:RawDataOutput mimeType="text/xml; subtype=wfs-collection/1.0">
      <ows:Identifier>result</ows:Identifier>
    </wps:RawDataOutput>
  </wps:ResponseForm>
</wps:Execute>`;
  }

//Petición de la geometría de una colección de features
function getWPSTransform(feature){
    return `<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
  <ows:Identifier>gs:CollectGeometries</ows:Identifier>
  <wps:DataInputs>
    <wps:Input>
      <ows:Identifier>features</ows:Identifier>
      <wps:Data>
        <wps:ComplexData mimeType="text/xml; subtype=wfs-collection/1.0"><![CDATA[`+feature+`]]></wps:ComplexData>
      </wps:Data>
    </wps:Input>
  </wps:DataInputs>
  <wps:ResponseForm>
    <wps:RawDataOutput mimeType="text/xml; subtype=gml/3.1.1">
      <ows:Identifier>result</ows:Identifier>
    </wps:RawDataOutput>
  </wps:ResponseForm>
</wps:Execute>`;
}

//Petición del suelo urbanizable en una geometría
function getWFSSuelorequest(geometry){
  return `<wfs:GetFeature service="WFS" version="1.1.0"
  xmlns:wfs="http://www.opengis.net/wfs"
  xmlns:s="http://visorsiu.fomento.es"
  xmlns="http://www.opengis.net/ogc"
  xmlns:gml="http://www.opengis.net/gml"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/wfs
                      http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
	<wfs:Query typeName="s:su">
		<Filter>
			<And>
				<PropertyIsNotEqualTo>
					<PropertyName>clasesuelo</PropertyName>
					<Literal>SUELO NO URBANIZABLE</Literal>              	
				</PropertyIsNotEqualTo>
				<Intersects>
					<PropertyName>the_geom</PropertyName>
					<Literal>`+geometry+`</Literal>
				</Intersects>
			</And>
		</Filter>   
	</wfs:Query>
</wfs:GetFeature>`;
}

//Petición para cambiar el SRS de una colección de features
function getWPSReproject(featuresSuelo){
  return `<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
  <ows:Identifier>gs:Reproject</ows:Identifier>
  <wps:DataInputs>
    <wps:Input>
      <ows:Identifier>features</ows:Identifier>
      <wps:Data>
        <wps:ComplexData mimeType="text/xml; subtype=wfs-collection/1.1"><![CDATA[`+featuresSuelo+`]]></wps:ComplexData>
      </wps:Data>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>targetCRS</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>EPSG:3857</wps:LiteralData>
      </wps:Data>
    </wps:Input>
  </wps:DataInputs>
  <wps:ResponseForm>
    <wps:RawDataOutput mimeType="text/xml; subtype=wfs-collection/1.1">
      <ows:Identifier>result</ows:Identifier>
    </wps:RawDataOutput>
  </wps:ResponseForm>
</wps:Execute>`;
}

//Petción de intersección
function getWPSRequest2(feature1,feature2){
    return `<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
  <ows:Identifier>vec:IntersectionFeatureCollection</ows:Identifier>
  <wps:DataInputs>
    <wps:Input>
      <ows:Identifier>first feature collection</ows:Identifier>
      <wps:Data>
        <wps:ComplexData mimeType="text/xml; subtype=wfs-collection/1.0"><![CDATA[`+feature1+`]]></wps:ComplexData>
      </wps:Data>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>second feature collection</ows:Identifier>
      <wps:Data>
        <wps:ComplexData mimeType="text/xml; subtype=wfs-collection/1.1"><![CDATA[`+feature2+`]]></wps:ComplexData>
      </wps:Data>
    </wps:Input>
  </wps:DataInputs>
  <wps:ResponseForm>
    <wps:RawDataOutput mimeType="text/xml; subtype=wfs-collection/1.1">
      <ows:Identifier>result</ows:Identifier>
    </wps:RawDataOutput>
  </wps:ResponseForm>
</wps:Execute>`;
  }





/****************************************************************************************/

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