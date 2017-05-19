/**
 * Demo functions
 */
setTimeout(function() {

  var demoFunctions=[
  //mostar las capas con los distintos tipos de zonas
  {title:'Paisajes Protegidos',function:'addWMSLayer(\'p_casas_rurales:paisajes_protegidos_esp,paisajes_protegidos_canarias\')'},
	{title:'Monumentos Naturales',function:'addWMSLayer(\'p_casas_rurales:monumentos_naturales_esp,monumentos_naturales_canarias\')'},
	{title:'Parques Nacionales',function:'addWMSLayer(\'p_casas_rurales:parques_nacionales_esp,parques_nacionales_canarias\')'},
	{title:'Parques Naturales',function:'addWMSLayer(\'p_casas_rurales:parques_naturales_esp,parques_naturales_canarias\')'},
	{title:'Reservas Naturales',function:'addWMSLayer(\'p_casas_rurales:reservas_naturales_esp,reservas_naturales_canarias\')'},
	{title:'Otros',function:'addWMSLayer(\'p_casas_rurales:otros_esp\')'},

  //{title:'GetFeature Provincia',function:'peticionPrueba(\'-4.83386,38.08648\')'},//NO FUNCIONA

  //WFS(0):Obtener la Feature de la provincia a partir de unas coordenadas(falta cogerlas con la banderita)
  {title:'GetFeature Provincia 2',function:'addWFSFeatureProvincia(-4.83386,41.58648)'},

  //WFS(1), hay que pasarle el riesgo máximo, usuario, y el codigo de la provincia, WFS(0)
   {title:'WFS Riesgos',function:'addWFSFeatureRiesgos(3,47)'},
  
   //WFS(2), hay que pasarle la distancia máxima, usuario, y la geometría de la provincia, WFS(0)
	{title:'WFS Distancias',function:'addWFSFeatureDistancias(9)'},

   //WPS(3), Intersect WFS(1) y WFS(2)
	{title:'WPS Intersect',function:'WPSIntersect(null)'},

  //WPS(4), pasar una features collection a geometry
  {title:'WPS Geometry',function:'WPSGeometry()'},
  

  //Muestra las provincias en el mapa de España(Estilo mal y no hace el zoom a la capa añadida) 
  {title:'Provincias',function:"addWMSLayer('p_casas_rurales:provincias')"},

  //Pruebas Hector
    //{title:'Estados',function:'addWMSLayer(\'prueba:Provincias_ETRS89_30N\')'},
    //{title:'add Editable layer',function:'addEditableLayer()'},
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

  //Ejemplo profesor
  function addEditableLayer(){
        var features = new ol.Collection();
        var featureOverlay = new ol.layer.Vector({
          source: new ol.source.Vector({features: features}),
          style: new ol.style.Style({
            fill: new ol.style.Fill({
              color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
              color: '#ffcc33',
              width: 2
            }),
            image: new ol.style.Circle({
              radius: 7,
              fill: new ol.style.Fill({
                color: '#ffcc33'
              })
            })
          })
        });
        featureOverlay.setMap(map);

        var modify = new ol.interaction.Modify({
          features: features,
          // the SHIFT key must be pressed to delete vertices, so
          // that new vertices can be drawn at the same position
          // of existing vertices
          deleteCondition: function(event) {
            return ol.events.condition.shiftKeyOnly(event) &&
                ol.events.condition.singleClick(event);
          }
        });
        map.addInteraction(modify);

        var draw; // global so we can remove it later
        //TODO: use globals draw
        function activateDraw() {
          draw = new ol.interaction.Draw({
            features: features,
            type: /** @type {ol.geom.GeometryType} */ 'Polygon'
          });
          map.addInteraction(draw);
        }

        /**
         * Handle change event.
         */
        function deactivateDraw() {
          map.removeInteraction(draw);
        };   
        activateDraw();
  }

  //Ejemplo profesor
  function addWFSLayer() {
      var vectorSource = new ol.source.Vector({
          format: new ol.format.GeoJSON(),
          url: function (extent) {
              return 'https://ahocevar.com/geoserver/wfs?service=WFS&' +
                  'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
                  'outputFormat=application/json&srsname=EPSG:3857&' +
                  'bbox=' + extent.join(',') + ',EPSG:3857';
          },
          strategy: ol.loadingstrategy.bbox
      });
      var vector = new ol.layer.Vector({
          name: 'WFS example layer',
          source: vectorSource,
          style: new ol.style.Style({
              stroke: new ol.style.Stroke({
                  color: 'rgba(0, 0, 255, 1.0)',
                  width: 2
              })
          })
      });
      map.addLayer(vector);
      add_layer_to_list(vector);
  }


  //Para añadir las capas a la lista de capas.
  function addWMSLayer(nombre){
      var wms =new ol.layer.Image({
            //extent: [-13884991, 2870341, -7455066, 6338219],
            name: 'Provincias',
            source: new ol.source.ImageWMS({
              url: 'http://localhost:8081/geoserver/wms',
              params: {'LAYERS': nombre},
              serverType: 'geoserver'
            })
          });
      map.addLayer(wms);
      add_layer_to_list(wms);

      // GetFeatureInfo
      map.on('singleclick', function(evt) {
          var view = map.getView();
          var viewResolution = /** @type {number} */ (view.getResolution());
          var url = wms.getSource().getGetFeatureInfoUrl(
              evt.coordinate, viewResolution, 'EPSG:4258',
              {'INFO_FORMAT': 'text/plain'});
          if (url) {
              $.get(url,function(data){
                  create_popup('info','GetFeatureInfo',data);
              });
          }
        });
  }

  //Para añadir el mapa al inicio.
  function addWMSLayerInit(){
      var wms =new ol.layer.Image({
            //extent: [-13884991, 2870341, -7455066, 6338219],
            name: 'Provincias',
            source: new ol.source.ImageWMS({
              url: 'http://localhost:8081/geoserver/wms',
              params: {'LAYERS': 'p_casas_rurales:provincias',
                        'SRSName': 'EPSG:4258' },
              serverType: 'geoserver'
            })
          });
      map.addLayer(wms);
      add_layer_to_list(wms);
  }








  /***************************************************************/

  //WFS(0):Obtener la Feature de la provincia a partir de unas coordenadas
  function addWFSFeatureProvincia(coord,riesgoMax,distMax){
      var vectorSource = new ol.source.Vector();
        var vector = new ol.layer.Vector({
            name: 'GetFeature result',
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
          
          addWFSFeatureRiesgos(riesgoMax,cod_prov,distMax,the_geom);
        });
        
  }

  function addWFSFeatureRiesgos(riesgo,cod_prov,distMax,the_geom){
      var vectorSource = new ol.source.Vector();
        var vector = new ol.layer.Vector({
            name: 'GetFeature riesgos',
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

        // then post the request and add the received features to a layer
        
          fetch('http://localhost:8081/geoserver/wfs', {
          method: 'POST',
          body: new XMLSerializer().serializeToString(featureRequest)
        }).then(function(response) {
          return response.json();
        }).then(function(json) {
          featuresRiesgo= new ol.format.GeoJSON().readFeatures(json);
          /*vectorSource.addFeatures(featuresRiesgo);
          map.addLayer(vector);
          add_layer_to_list(vector);*/
          return featuresRiesgo;
        }).then(function(featuresRiesgo) {
          addWFSFeatureDistancias(distMax,the_geom);
        });
        
  }

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
           WPSIntersect(featuresRiesgo,features);
        });

  }

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

 function WPSGeometry(feauturesIntersect){

  $.ajax({url:'http://localhost:8081/geoserver/wps',
  dataType:'text',
  type:'post',
  data: getWPSTransform(feauturesIntersect),
  contentType:"application/json; charset=utf-8",
  success:function(response, status, xhr){ 
    var start=response.indexOf("<gml:MultiPolygon");
    var end=response.indexOf("</gml:MultiPolygon>");
    var geomStr = response.substring(start,end+19);
    var geomStr=geomStr.replace(/NaN/gi, '');
    WFSSuelo(geomStr,feauturesIntersect);
  }});
      
  }

  function WFSSuelo(geometry,featuresIntersect){

    $.ajax({url:'http://visorsiu.fomento.es/geoserver/wfs',
          dataType:'text',
          type:'post',
          data: getWFSSuelorequest(geometry),
          contentType:'application/json; charset=utf-8',
          success:function(response, status, xhr){       
          WPSReproject(featuresIntersect,response);
         }});
        
  }

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

  function  WPSIntersect2(featuresIntersect,featuresSuelo){
    
      var vectorSource = new ol.source.Vector();
          var vector = new ol.layer.Vector({
              name: 'Result',
              source: vectorSource,
              style: new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 255, 1.0)',
                width: 2
              })
            })
          });
     $.ajax({url:'http://localhost:8081/geoserver/wps',
        dataType:'text',
        type:'post',
        data: getWPSRequest2(featuresIntersect,featuresSuelo),
        contentType:'application/json',
        success:function(response, status, xhr){
          features=new ol.format.GML3().readFeatures(response);
          vectorSource.addFeatures(features);
          map.addLayer(vector);
          add_layer_to_list(vector);
          map.getView().fit(vectorSource.getExtent());     

    }});
  }


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
      <ows:Identifier>forcedCRS</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>EPSG:25830</wps:LiteralData>
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