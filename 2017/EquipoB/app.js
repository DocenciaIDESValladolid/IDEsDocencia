$(document).bind('pageinit', function(){

    $( "#slider-3" ).slider(); // jquery ui slider init not working apparently
    
    // Insert variable into an array at a specific index
    Array.prototype.insert = function (index, item) {
      this.splice(index, 0, item);
    };
    
    // El calculo de nuestra ruta
    $("#apptst").click(function(){
        tst();
    });
    
    tst();
        
    function tst(){ //TODO: add training parameters when called

        var waypoints = [],
            routeSections = [],
            distance = 0.01;
        
        console.log(waypoints); // Ya esta lleno en vez de vacio este punto, lo que hace que los valores cambian cada vez que se recarga la página??
        
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(getOriginCoordinates);
        } else {
            waypoints.push({ x: -3.703790, y: 40.41675 });
        }
        
        function getOriginCoordinates(position){
            waypoints.push({ x: position.coords.longitude, y: position.coords.latitude });
            dWithin(waypoints[0], distance, dWithinReturn); // http://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call
        }
        // Requests callbacks start here
        function dWithinReturn(returnedCoordinates){
            waypoints.push({ x: returnedCoordinates[1], y: returnedCoordinates[0] }); // Coordinates of destination parc
            waypointsCalc(waypoints[0], waypoints[1], waypointsReturn);
        }
        
        function waypointsReturn(returnedLineString){
            var newLineString = reformLineString(returnedLineString);
            dWithinRoute(newLineString, distance, dWithinRouteReturn);
        }
        
        function dWithinRouteReturn(returnedCoordinate1, returnedCoordinate2){ // Hay que invertirlas porque .readFeatures no las lee al revez 
            waypoints.insert(1, { x: returnedCoordinate1[1], y: returnedCoordinate1[0] });
            waypoints.insert(2, { x: returnedCoordinate2[1], y: returnedCoordinate2[0] });
            
            // Aquí tenemos todos los waypoints que podemos añadir al mapa
            var sourcePoints = new ol.source.Vector();
            
            for (i=0; i<waypoints.length; i++){
                var points = waypoints[i],
                    feature = new ol.Feature({ geometry: new ol.geom.Point([points.x, points.y])});
                
                sourcePoints.addFeature(feature);
            }
            
            var visibilePoints = new ol.layer.Vector({
                name:"Puntos Visibiles",
                source: sourcePoints,
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
            
            map.addLayer(visibilePoints);
            add_layer_to_list(visibilePoints);
            
            /* Luego hay que calcular la ruta con todos los puntos de waypoints[]
             * 0 → 1; 
             * 1 → 2; 
             * 2 → 3;
             */
            for(i=0; i<waypoints.length-1; i++){
                waypointsCalc(waypoints[i], waypoints[i+1], waypointsReturnBis);
            }
        }
        
        function waypointsReturnBis(returnedLineString){
            
            // Operations for the final route
            var onlyNumbers = returnedLineString.substring(13), // <gml:posList>
                fullCoordinates = onlyNumbers.split(' ');
            
            routeSections.push(fullCoordinates);
            
            if(routeSections.length == waypoints.length-1){ // cuando la ruta por cada waypoint esta almacenada
                drawRoute(routeSections);
            }
        }
        
        function drawRoute(routeSections){
        
            var allCoordinates = [];
            
            for(j=0; j<routeSections.length; j++){
                for(i=0; i<routeSections[j].length; i=i+2){
                    
                    var coordinate = [];
                    coordinate.push(routeSections[j][i]);
                    coordinate.push(routeSections[j][i+1]);
                    allCoordinates.push(coordinate);
                } 
            }
            // JPC: Workaround for a problem with tolerances in this app.
            // Linestrings are over-simplified (maybe some resolution/pixel ratio issue)
            // this patch overrides simplification for LineStrings
            ol.geom.LineString.prototype.getSimplifiedGeometry = function(squaredTolerance){return this;}; 
            var fullRoute = new ol.geom.LineString(allCoordinates),
                routeStyle = new ol.style.Style({ 
                    stroke: new ol.style.Stroke({ 
                        color: 'rgba(142, 68, 173,.8',
                        width: 4
                    })
                }),
                routeVector = new ol.layer.Vector({
                    name: "Ruta",
                    style: routeStyle,
                    source: new ol.source.Vector({
                        features: [new ol.Feature({
                            geometry: fullRoute
                            })]
                        })
                });

            map.addLayer(routeVector);
            add_layer_to_list(routeVector);
            fly_to(map, null, routeVector.getSource().getExtent());
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
          <wfs:Query typeName="IDES_B17:parques">
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
                     chosenParc = allFeatures[1].values_.parque_geom,
                     coordinates = chosenParc.getCoordinates();

                dWithinCallback(coordinates);
            }
        }
        dWithinRequest.open("POST",wfsServerUrl,true);
        dWithinRequest.send(dWithinXML);
    }
    
    // Get route
    function waypointsCalc(from, to, waypointsCallback){

        var waypointsXML = `<?xml version="1.0"?>
        <wps:Execute xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" service="WPS" version="1.0.0" outputFormat="GML3" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsExecute_request.xsd">
        <ows:Identifier>org.cnig.cartociudad.wps.RouteFinder</ows:Identifier>
        <wps:DataInputs>
            <wps:Input>
                <ows:Identifier>waypoints</ows:Identifier>
                <wps:Data>
                    <wps:ComplexData mimeType="text/xml">
                    <wfs:FeatureCollection xmlns:ogc="http://www.opengis.net/ogc" xmlns:wfs="http://www.opengis.net/wfs" xmlns:ows="http://www.opengis.net/ows" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:wp="http://localhost/waypoint" xmlns:gml="http://www.opengis.net/gml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://localhost http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-basic.xsd http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/base/feature.xsd http://localhost:8080/wps/schemas/waypoint.xsd">
                    <gml:featureMembers>
                            <wp:waypoint gml:id="1">
                                <wp:geom>
                                    <gml:Point srsDimension="2" srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">
                                        <gml:pos>
                                            ${from.x} ${from.y}
                                        </gml:pos>
                                    </gml:Point>
                                </wp:geom>
                            </wp:waypoint>
                            <wp:waypoint gml:id="2">
                                <wp:geom>
                                    <gml:Point srsDimension="2" srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">
                                        <gml:pos>
                                            ${to.x} ${to.y}
                                        </gml:pos>
                                    </gml:Point>
                                </wp:geom>
                            </wp:waypoint>
                                    </gml:featureMembers>
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
                //console.log(this.responseText);
                var start = this.responseText.indexOf("<gml:posList>"),
                    end = this.responseText.indexOf("</gml:posList>"),
                    lineString = this.responseText.substring(start, end);
                
                    waypointsCallback(lineString);
            }
            
        }
        waypointsRequest.open("POST",wpsCartociudadUrl,true);
        waypointsRequest.send(waypointsXML);
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
          <wfs:Query typeName="IDES_B17:fuentes">
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
                
                var fuente1 = features[0].values_.fuente_geom,
                    fuente1Coord = fuente1.getCoordinates(),
                    fuente2 = features[1].values_.fuente_geom,
                    fuente2Coord = fuente2.getCoordinates();
                
                dWithinRouteCallback(fuente1Coord, fuente2Coord);
            }
        }
        dWithinRouteRequest.open("POST",wfsServerUrl,true);
        dWithinRouteRequest.send(dWithinRouteXML);
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
