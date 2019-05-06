function initmap() {

    openStreetMapGeocoder = GeocoderJS.createGeocoder('openstreetmap');
    /*-------------------------------Styles-----------------------------------*/
    var text = new ol.style.Text({
        textAlign: 'center',
        scale: 1.3,
        fill: new ol.style.Fill({
            color: '#fff'
        }),
        stroke: new ol.style.Stroke({
            color: '#000',
            width: 3.5
        })
    });
    var selectText = new ol.style.Text({
        textAlign: 'center',
        scale: 1.4,
        fill: new ol.style.Fill({
            color: '#fff'
        }),
        stroke: new ol.style.Stroke({
            color: '#3399CC',
            width: 3.5
        })
    });

    var positionFeatureStyle = new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({
                color: [0, 0, 0, 1]
            }),
            stroke: new ol.style.Stroke({
                color: [255, 255, 255, 1],
                width: 2
            })
        })
    });
    var accuracyFeatureStyle = new ol.style.Style({
        fill: new ol.style.Fill({
            color: [255, 255, 255, 0.3]
        }),
        stroke: new ol.style.Stroke({
            color: [0, 0, 0, 0.5],
            width: 1
        }),
        zIndex: -1
    });
    var markerFeatureStyle = new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            opacity: 1,
            scale: 0.3,
            src: 'pix/flagmarker.png'
        })
    });
    /*-------------------------------Layers-----------------------------------*/
    var layers = [];
    var geoJSONFormat = new ol.format.GeoJSON();
    sourceLayer = new ol.source.Vector({
        projection: 'EPSG:3857'
    });
	var vectorCustomLayer;
    vectorCustomLayer = new ol.layer.Vector({
        source: sourceLayer,
    });
    var aeriallayer = new ol.layer.Tile({
        visible: false,
        source: new ol.source.BingMaps({
            key: 'AmC3DXdnK5sXC_Yp_pOLqssFSaplBbvN68jnwKTEM3CSn2t6G5PGTbYN3wzxE5BR',
            imagerySet: 'AerialWithLabels',
            maxZoom: 19
            // use maxZoom 19 to see stretched tiles instead of the BingMaps
            // "no photos at this zoom level" tiles
            // maxZoom: 19
        })
    });
    aeriallayer.set("name", "aerialview");
    var roadlayer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });
    roadlayer.set("name", "roadview");
    var layergroup = new ol.layer.Group({ layers: [aeriallayer, roadlayer] });
    var view = new ol.View({
        center: [0, 0],
        zoom: 2,
        minZoom: 2
    });
    select = new ol.interaction.Select({
        layers: [vectorCustomLayer],
        style: select_style_function,
        filter: function (feature, layer) {
            // Do something with marker
            if (feature.get('attr') === 0) {
                return false;
            }
            return true;
        }
    });
    var drag_rotate =ol.interaction.defaults().extend([
          new ol.interaction.DragRotateAndZoom()
        ]);
    
    var accuracyFeature = new ol.Feature();
    accuracyFeature.setStyle(accuracyFeatureStyle);
    var positionFeature = new ol.Feature();
    positionFeature.setStyle(positionFeatureStyle);
    var userPosition = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [accuracyFeature, positionFeature]
        })
    });
   
	//variables para las interacciones de ruta
	var draw;
	var modify;
	var typeSelect;
	var snap;
	var selectInteraction;
	//var gg = new OpenLayers.Projection("EPSG:4326");
	

    layers = [layergroup, userPosition,vectorCustomLayer];
    // New Custom zoom.
    var zoom = new ol.control.Zoom({ target: "navigation", className: "custom-zoom" });
    map = new ol.Map({
        layers: layers,
        controls:  ol.control.defaults({rotate: true, attribution: true}),
        //interactions: drag_rotate,
        target: 'map',
        view: view
        /*loadTilesWhileAnimating: true,
         loadTilesWhileInteracting: true*/
    });


    // Initialize the page layers.
    add_layergroup_to_list(layergroup);
    geolocation = new ol.Geolocation({
        projection: view.getProjection(),
        trackingOptions: {
            enableHighAccuracy: true,
            maximumAge: 0
        },
        tracking: true
    });
    /*-------------------------------Events-----------------------------------*/
    geolocation.on('change:position', function () {
        var coordinates = this.getPosition();
        positionFeature.setGeometry(coordinates ?
            new ol.geom.Point(coordinates) : null);
    });
    geolocation.on('change:accuracyGeometry', function () {
        accuracyFeature.setGeometry(this.getAccuracyGeometry());
        this.setTracking(false);
        $.mobile.loading("hide");
    });
    geolocation.on('error', function (error) {
        this.setTracking(false);
        $.mobile.loading("hide");
        toast(error.message);
    });
    /**
     * Customize this function
     */
    select.on("select", function (features) {
        if (features.selected.length === 1) {
            if (lastsuccessfulstage.position === features.selected[0].get('stageposition')
                && features.selected[0].get('geometrysolved') && !roadfinished && available) {
                $("#infopanel").panel("open");
                $("#lastsuccessfulstage").collapsible("expand");
            } else {
                var title, stagename = features.selected[0].get('name'),
                    stageclue = features.selected[0].get('clue'),
                    info = features.selected[0].get('info'), body = '';
                if (features.selected[0].get('geometrysolved')) {
                    if (stagename && stageclue) {
                        title = "stageovercome";
                        body = get_block_text("stagename", stagename);
                        body += get_block_text("stageclue", stageclue);
                    } else {
                        title = "discoveredlocation";
                    }
                } else {
                    title = "failedlocation";
                }
                if (info) {
                    body += '<p>' + info + '</p>';
                }
                create_popup('infostage', title, body);
            }
        }
    });

}
/*-------------------------------Functions-----------------------------------*/
function style_function(feature, resolution) {
    // Get the income level from the feature properties
    var stageposition = feature.get('stageposition');
    if (stageposition === 0) {
        var fill = new ol.style.Fill({
            color: 'rgba(255,255,255,0.4)'
        });
        var stroke = new ol.style.Stroke({
            color: '#3399CC',
            width: 1.25
        });
        var styles = new ol.style.Style({
            image: new ol.style.Circle({
                fill: fill,
                stroke: stroke,
                radius: 5
            }),
            fill: fill,
            stroke: stroke,
            text: new ol.style.Text({
                text: "startfromhere",
                textAlign: 'center',
                fill: new ol.style.Fill({
                    color: 'rgb(255,255,255)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#3399CC',
                    width: 5
                })
            })
        });
        return [styles];
    }
    if (!feature.get('geometrysolved')) {
        failstageStyle.getImage().setScale((view.getZoom() / 50));
        failstageStyle.getText().setText('' + stageposition);
        return [failstageStyle];
    }
    defaultstageStyle.getImage().setScale((view.getZoom() / 110));
    defaultstageStyle.getText().setText('' + stageposition);
    return [defaultstageStyle];
}
function select_style_function(feature, resolution) {
    var stageposition = feature.get('stageposition');
    if (!feature.get('geometrysolved')) {
        failSelectstageStyle.getText().setText('' + stageposition);
        return [failSelectstageStyle];
    }
    defaultSelectstageStyle.getText().setText('' + stageposition);
    return [defaultSelectstageStyle];
}
function autolocate(center, validate) {
    center = center || false;
    validate = validate || false;
    
    $.mobile.loading("show");
    geolocation.setProperties({ center: center, validate_location: validate });
    var position= geolocation.getPosition();
    $.mobile.loading("hide");
    fly_to(map, position);
}

//FUNCION PARA DIBUJAR RUTA
function dibujar(){
	if (typeof(draw) !='undefined') {
		map.removeInteraction(draw);
	}
	//map.removeInteraction(modify);
	if (typeof(modify) !='undefined') {
		map.removeInteraction(modify);
	}
	
	     draw = new ol.interaction.Draw({
            source: sourceLayer,
            type: "LineString"
          });
		  draw.on("drawend", function(event){
			  map.removeInteraction(draw);
		  });
     map.addInteraction(draw);
	 
	 
}

//FUNCION PARA EDITAR RUTA
function editar(){
	
	if (typeof(modify) !='undefined') {
		map.removeInteraction(modify);
	}
	
	 var selectInteraction = new ol.interaction.Select({
        condition: ol.events.condition.singleClick,
        toggleCondition: ol.events.condition.shiftKeyOnly
        //layers: function (vectorCustomLayer) {
        //return layer.get('id') == 'europa';
        //},
        //style: selectEuropa
      });
	
	 modify = new ol.interaction.Modify({
		 source: sourceLayer,
		 features: selectInteraction.getFeatures()
		 });
     
	 modify.on('modifyend',function(e){
		map.removeInteraction(modify);
	});
	  
	map.addInteraction(modify);	  
	map.getInteractions().extend([selectInteraction, modify]);  
	  
}
//Funcion obtener coordenadas
function getCoord(){

var vectorSource = new ol.source.Vector();
var vectorLayer = new ol.layer.Vector({	

			source: vectorSource });
			
map.addLayer(vectorLayer);

var coords_length = 0;
var num = 0;

/*Genero nuevo lineString, acumulo los puntos con las coordenadas en 4326 y las muestro con alert. Todas las coordenadas de los puntos están en lnsPoinst[].

Problemas: 
-No consigo "finalizar" el lineString
- Consulta php INSERT INTO public.rutasdron( name, geom)
	VALUES (pointNameCount, st_GeomFromText('LINESTRING(-4.7512 41.6045, -4.5894 41.7836)', 4326)); Al ser String con más de dos puntos no funcionaría.
	
	
*/
var draw = new ol.interaction.Draw({
    source: vectorSource,
    type: "LineString",
    geometryFunction: function(coords, geom) {
        if (!geom) {
            geom = new ol.geom.LineString(null);
        }        
        geom.setCoordinates(coords);
        
        
        if(coords.length !== coords_length){
        	coords_length = coords.length;
            var Coordactual = $(coords).get(-1);
            var coordTrans = ol.proj.transform(Coordactual, 'EPSG:3857', 'EPSG:4326');
			//Vector de puntos del LineString
            var lnsPoints = [];     
					//Metemos la coordenada al final del vector
            lnsPoints.push(coordTrans);
            for (var i = 0; lnsPoints.length > i; i++) {
                
            // Creamos los nombres: Punto 1, 2...
            function nameGen() {
                pointName = "Point ";
                function counter() {
                    num++;
                }
                counter();
                pointNameCount = pointName + num;
                return pointNameCount;
            }
                var pointCoor = lnsPoints[i];
                var lon = pointCoor[1];
                var lat = pointCoor[0];
                var name = nameGen();
				alert(name + ':' + lat + ', ' + lon);	
				
            }
        }
        return geom;
    }
});
draw.on("drawend", function(event){
			  map.removeInteraction(draw);
		  });
map.addInteraction(draw);
}



//OBTENER LA GEOMETRIA DE LA RUTA DIBUJADA
/*
var point=feature.geometry.getBounds().getCenterLonLat();

var pointProj=new OpenLayers.LonLat(point.lon,point.lat);
pointProj.transform(map.getProjectionObject(), gg);
var latlonString = formatDegrees(pointProj.lat, pointProj.lon);


//TRASNFORMACION DE LAS COORDEANADAS A GRADOS
function formatDegrees(lonDecimal, latDecimal){
		var signlat=1;
		var signlon=1;
	
	 if(lonDecimal < 0)  { signlon = -1; }
      var lonAbs = Math.abs(Math.round(lonDecimal * 1000000.));

	 //Math.round is used to eliminate the small error caused by rounding in the computer:
	 //e.g. 0.2 is not the same as 0.20000000000284

     //Error checks
     if(lonAbs > (180 * 1000000)) {  alert(' Degrees Longitude must be in the range of -180 to 180. '); lonDecimal='';  lonAbs=0; }

	 if(latDecimal < 0)  { signlat = -1; }
      var latAbs = Math.abs( Math.round(latDecimal * 1000000.));

	 //Math.round is used to eliminate the small error caused by rounding in the computer:
	 //e.g. 0.2 is not the same as 0.20000000000284

     //Error checks
     if(latAbs > (90 * 1000000)) { alert(' Degrees Latitude must be in the range of -90. to 90. '); latDecimal = '';  latAbs=0; }
	
	var latvalue = ((Math.floor(latAbs / 1000000) * signlat) + '&deg; ' + Math.floor(  ((latAbs/1000000) - Math.floor(latAbs/1000000)) * 60)  + '\' ' +  ( Math.floor(((((latAbs/1000000) - Math.floor(latAbs/1000000)) * 60) - Math.floor(((latAbs/1000000) - Math.floor(latAbs/1000000)) * 60)) * 100000) *60/100000 ) + '&quot;'  );
	var lonvalue = ((Math.floor(lonAbs / 1000000) * signlon) + '&deg; ' + Math.floor(  ((lonAbs/1000000) - Math.floor(lonAbs/1000000)) * 60)  + '\' ' +  ( Math.floor(((((lonAbs/1000000) - Math.floor(lonAbs/1000000)) * 60) - Math.floor(((lonAbs/1000000) - Math.floor(lonAbs/1000000)) * 60)) * 100000) *60/100000 ) + '&quot;'  );

	return latvalue+' , '+lonvalue;
}

*/


function fly_to(map, point, extent) {
    var duration = 700;
    var view = map.getView();
    if (extent) {
        view.fit(extent, {
            duration: duration
        });
    } else {
        view.animate({
            zoom: 19,
            center: point,
            duration: duration
        });
    }
}
function fit_map_to_layer(source) {

    var features = typeof (source.getFeatures) === 'undefined' ? null : source.getFeatures();
    if (features && features.length === 1 && features[0].getGeometry() instanceof ol.geom.Point) {
        fly_to(map, features[0].getGeometry().getCoordinates());
    } else if (features && features.length > 1) {
        fly_to(map, null, source.getExtent());
    }
}
/**
 * Add a layergroup to the interface. Layers in the group are mutually exclusive, i.e. only one of them can be active
 * @param {*} layergroup 
 */
function add_layergroup_to_list(layergroup) {
    layergroup.getLayers().forEach(function (layer) {
    var item = $('<li>', {
        "data-icon": "check",
        "class": layer.getVisible() ? "checked" : "unchecked"
    })
        .append($('<a />', {
            text: layer.get("name"),
            href: "#mappage"
        })
            .click(function () {
                layergroup.getLayers().forEach(function (l) {
                    if (l === layer) {
                        l.setVisible(true);
                    } else {
                        l.setVisible(false);
                    }
                });
            })
        );
    layer.on('change:visible', function () {
        $(item).toggleClass('checked unchecked');
    });
    item.insertAfter('#baseLayer');
});

}
function add_layer_to_list(layer) {
    var item = $('<li>', {
        "data-icon": "check",
        "class": layer.getVisible() ? "checked" : "unchecked"
    })
        .append($('<a />', {
            text: layer.get("name"),
            href: "#mappage"
        })
            .click(function () {
                layer.setVisible(!layer.getVisible());
            })
        );
    layer.on('change:visible', function () {
        $(item).toggleClass('checked unchecked');
    });
    item.insertAfter('#baseLayer');
}

