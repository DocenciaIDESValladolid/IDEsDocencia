$(document).bind('pageinit', function(){

    $( "#slider-3" ).slider(); // jquery ui slider init not working apparently

    setTimeout(function() {
        var demoFunctions=[
        {title:'add WFS layer BBOX',function:'addWFSLayer'},
        {title:'add WFS Feature',function:'addWFSFeature'},
        {title:'add WMS layer',function:'addWMSLayer'},
        {title:'add Editable layer',function:'addEditableLayer'},
    ];
    var liststring ='';
    demoFunctions.forEach(function(element) {
        liststring = liststring +  '<li><a href="#" onclick="'+element.function+'()">'+ element.title +'</a></li>';
    }, this);
    var list = $('#listdemos');
    var listcontent = $(liststring);
    list.html(liststring);
    list.trigger('create');
    }, 100);


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
              type: 'Polygon' // @type {ol.geom.GeometryType}
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
    function addWFSFeature(){
         var vectorSource = new ol.source.Vector();
          var vector = new ol.layer.Vector({
              name: 'GetFeature result',
            source: vectorSource,
            style: new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 255, 1.0)',
                width: 2
              })
            })
          });
          // generate a GetFeature request
          var featureRequest = new ol.format.WFS().writeGetFeature({
            srsName: 'EPSG:3857',
            featureNS: 'http://openstreemap.org',
            featurePrefix: 'osm',
            featureTypes: ['water_areas'],
            outputFormat: 'application/json',
            filter: ol.format.filter.and(
              ol.format.filter.like('name', 'Pisuerga*'),
              ol.format.filter.equalTo('waterway', 'riverbank')
            )
          });

          // then post the request and add the received features to a layer
          fetch('https://ahocevar.com/geoserver/wfs', {
            method: 'POST',
            body: new XMLSerializer().serializeToString(featureRequest)
          }).then(function(response) {
            return response.json();
          }).then(function(json) {
            var features = new ol.format.GeoJSON().readFeatures(json);
            vectorSource.addFeatures(features);
            map.addLayer(vector);
            add_layer_to_list(vector);
            map.getView().fit(vectorSource.getExtent());
          });
    }
    function addWMSLayer(){
        var wms =new ol.layer.Image({
              extent: [-13884991, 2870341, -7455066, 6338219],
              name: 'Test WMS',
              source: new ol.source.ImageWMS({
                url: 'https://ahocevar.com/geoserver/wms',
                params: {'LAYERS': 'topp:states'},
                serverType: 'geoserver'
              })
            });
        map.addLayer(wms);
        add_layer_to_list(wms);
    }
    
    
    // El calculo de nuestra ruta
    $("#apptst").click(function(){
        tst();
    });
        
    function tst(){ //TODO: add parameters when called
        
        var waypoints = {
                origin: { x: -3.703790, y: 40.41675 }
            },
            distance = 0.01;
        
        dWithin(waypoints.origin, distance, dWithinReturn); // http://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call
        
        function dWithinReturn(result){
            waypoints.destination = { x: result[1], y: result[0] }; // Coordinates of destination parc
            waypointsCalc(waypoints, waypointsReturn); 
        }
        
        function waypointsReturn(result){
            dWithinRoute(result, distance, dWithinRouteReturn);
        }
        
        function dWithinRouteReturn(result1, result2){ // Hay que invertirlas porque .readFeatures no las lee al revez 
            waypoints.fuente1 = { x: result1[1], y: result1[0] };
            waypoints.fuente2 = { x: result2[1], y: result2[0] };
            
            waypointsCalc(waypoints, waypointsReturnBis);
        }
        
        function waypointsReturnBis(result){
            
            // Se añaden los waypoints visibles
            var puntosSource = new ol.source.Vector();
            
            for (var key in waypoints){
                if (!waypoints.hasOwnProperty(key)) continue;

                var punto = waypoints[key],
                    feature = new ol.Feature({ geometry: new ol.geom.Point([punto.x, punto.y])});
                
                puntosSource.addFeature(feature);
            }
            
            var puntosVisibiles = new ol.layer.Vector({
                name:"Puntos Visibiles",
                source: puntosSource,
                style: new ol.style.Style({
                      image: new ol.style.Circle({
                        fill: new ol.style.Fill({
                          color: 'rgba(0,255,0,1)'
                        }),
                        radius: 10,
                        stroke: new ol.style.Stroke({
                          color: 'rgba(0,255,255,1)',
                          width: 2
                        })
                      })
                    })
            });
            
            map.addLayer(puntosVisibiles);
            add_layer_to_list(puntosVisibiles);
            
            // Operations for the final route
            var onlyNumbers = result.substring(13), // <gml:posList>
                fullCoordinates = onlyNumbers.split(' ');
            
            var source = new ol.source.Vector();
            
            var pointlayer = new ol.layer.Vector({
                name: "pointLayer",
                style: selectedpointStyle,
                source: source
            });
            
            var coords=[];
            for(i=0; i<fullCoordinates.length; i=i+2){
                
                var coord = [];
                
                coord.push(fullCoordinates[i]);
                coord.push(fullCoordinates[i+1]);
                coords.push(coord);
                
                var feature = new ol.Feature({
                  geometry: new ol.geom.Point(coord),
                  name: 'My points'
                });
                
                source.addFeature(feature);
            }
            
           var rutaCompleta = new ol.geom.LineString(coords);
                
            
            var selectedStyle = new ol.style.Style({
                    stroke: new ol.style.Stroke({
                      color: 'rgba(255,0,0,0.4)',
                      width: 3
                    })
                });
            
            var selectedpointStyle = new ol.style.Style({
                  image: new ol.style.Circle({
                    fill: new ol.style.Fill({
                      color: 'rgba(255,255,0,0.4)'
                    }),
                    radius: 5,
                    stroke: new ol.style.Stroke({
                      color: '#ff0',
                      width: 1
                    })
                  })
                });

            var rutaVector = new ol.layer.Vector({
                            name: "Ruta",
                            style: selectedStyle,
                            source: new ol.source.Vector({
                                features: [new ol.Feature({
                                    geometry: rutaCompleta
                                    //geometry: new ol.geom.LineString([[-3.70384, 40.41673], [-3.7039, 40.41683], [-3.70432, 40.4168]])
                                    })]
                                })
            });

            map.addLayer(rutaVector);
            add_layer_to_list(rutaVector);
            
            map.addLayer(pointlayer);
            add_layer_to_list(pointlayer);
        }
    }
    
    // Get Distance from origin radius
    function dWithin(origin, distance, dWithinCallback){
        
        var dWithinXML = `<?xml version="1.0"?>
        <wfs:GetFeature service="WFS" version="1.0.0"
          outputFormat="GML3"
          xmlns:wfs="http://www.opengis.net/wfs"
          xmlns:ogc="http://www.opengis.net/ogc"
          xmlns:gml="http://www.opengis.net/gml"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd">
          <wfs:Query typeName="prototype:parques">
            <ogc:Filter>
              <ogc:DWithin>
                    <ogc:PropertyName>parque_geom</ogc:PropertyName>
                    <Literal>
                      <gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">
                        <gml:coordinates xmlns:gml="http://www.opengis.net/gml">${origin.x},${origin.y}</gml:coordinates>
                      </gml:Point>
                    </Literal>
                    <ogc:Distance>${distance}</ogc:Distance>
            </ogc:DWithin>
            </ogc:Filter>
            </wfs:Query>
        </wfs:GetFeature>`;
        
        var dWithinRequest = new XMLHttpRequest();

        dWithinRequest.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                var allFeatures = (new ol.format.GML3()).readFeatures(this.responseText, 'EPSG:4326'), // https://github.com/openlayers/openlayers/issues/2999
                     chosenParc = allFeatures[0].values_.parque_geom,
                     coordinates = chosenParc.getCoordinates();

                dWithinCallback(coordinates);
            }
        }
        dWithinRequest.open("POST","http://localhost:8080/geoserver/wfs",true);
        dWithinRequest.send(dWithinXML);
    }
    
    // Get route
    function waypointsCalc(waypoints, waypointsCallback){

        var waypointsXML = `<?xml version="1.0"?>
        <wps:Execute xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" service="WPS" version="1.0.0" outputFormat="GML3" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsExecute_request.xsd">
        <ows:Identifier>org.cnig.cartociudad.wps.RouteFinder</ows:Identifier>
        <wps:DataInputs>
            <wps:Input>
                <ows:Identifier>waypoints</ows:Identifier>
                <wps:Data>
                    <wps:ComplexData mimeType="text/xml">
                    <wfs:FeatureCollection xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs" xmlns:ows="http://www.opengis.net/ows" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:wp="http://localhost/waypoint" xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://localhost http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/base/feature.xsd http://localhost:8080/wps/schemas/waypoint.xsd">
                    <gml:featureMembers>`;
        
        var gmlID = 0;
        for (var key in waypoints){
            gmlID++;
            if (!waypoints.hasOwnProperty(key)) continue; // skip loop if the property is from prototype
            
            var obj = waypoints[key];

            waypointsXML += '<wp:waypoint gml:id="'+gmlID+'">'+
                                '<wp:geom>'+
                                    '<gml:Point srsDimension="2" srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">'+
                                        '<gml:pos>'+
                                            obj.x+' '+obj.y+
                                        '</gml:pos>'+
                                    '</gml:Point>'+
                                '</wp:geom>'+
                            '</wp:waypoint>';
        }
            waypointsXML += `</gml:featureMembers>
                                </wfs:FeatureCollection>
                            </wps:ComplexData>
                        </wps:Data>
                    </wps:Input>
                </wps:DataInputs>
                <wps:ResponseForm>
                    <wps:ResponseDocument>
                        <wps:Output schema="http://schemas.opengis.net/gml/3.1.1/base/feature.xsd" mimeType="text/xml" encoding="UTF-8">
                            <ows:Identifier>routeResult</ows:Identifier>
                        </wps:Output>
                    </wps:ResponseDocument>
                </wps:ResponseForm>
            </wps:Execute>`;

        var waypointsRequest = new XMLHttpRequest();

        waypointsRequest.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                
                var start = this.responseText.indexOf("<gml:posList>"),
                    end = this.responseText.indexOf("</gml:posList>"),
                    lineString = this.responseText.substring(start, end);
                
                    if(waypoints.fuente1){ // TODO: change this
                        waypointsCallback(lineString);
                    }
                    else {
                        var newLineString = reformLineString(lineString);
                        waypointsCallback(newLineString);
                    }
            }
            
        }
        waypointsRequest.open("POST","http://www.cartociudad.es/wps/WebProcessingService",true);
        waypointsRequest.send(waypointsXML);
    }
    
    // <gml:posList> to <gml:coordinates>
    function reformLineString(lineString){
        var string = lineString.substring(13),
            myarray = string.split(' '),
            reformed = '<gml:LineString srsDimension="2" srsName="http://www.opengis.net/gml/srs/epsg.xml#4326"><gml:coordinates xmlns:gml="http://www.opengis.net/gml" decimal="." cs="," ts=" ">';
        
        for(i=0; i<myarray.length; i=i+2){
            reformed += myarray.slice(i,i+2).join(",")+' ';
        }
        
        reformed += '</gml:coordinates></gml:LineString>';

        return reformed;
    }
    
    // Get Distance from route radius
    function dWithinRoute(originRoute, distance, dWithinRouteCallback){
        
        var dWithinRouteXML = `<?xml version="1.0"?>
        <wfs:GetFeature service="WFS" version="1.0.0"
          outputFormat="GML3"
          xmlns:wfs="http://www.opengis.net/wfs"
          xmlns:ogc="http://www.opengis.net/ogc"
          xmlns:gml="http://www.opengis.net/gml"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd">
          <wfs:Query typeName="prototype:fuentes">
            <ogc:Filter>
              <ogc:DWithin>
                    <ogc:PropertyName>fuente_geom</ogc:PropertyName>
                    <Literal>
                      ${originRoute}
                    </Literal>
                    <ogc:Distance>${distance}</ogc:Distance>
            </ogc:DWithin>
            </ogc:Filter>
            </wfs:Query>
        </wfs:GetFeature>`;
        
        var dWithinRouteRequest = new XMLHttpRequest();

        dWithinRouteRequest.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                
                var features = (new ol.format.GML3()).readFeatures(this.responseText);
                
                var fuente1 = features[2].values_.fuente_geom,
                    fuente1Coord = fuente1.getCoordinates(),
                    fuente2 = features[3].values_.fuente_geom,
                    fuente2Coord = fuente2.getCoordinates();
                
                dWithinRouteCallback(fuente1Coord, fuente2Coord);
            }
        }
        dWithinRouteRequest.open("POST","http://localhost:8080/geoserver/wfs",true);
        dWithinRouteRequest.send(dWithinRouteXML);
    }

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
    
}); // End of document init
