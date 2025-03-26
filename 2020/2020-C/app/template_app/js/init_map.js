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
    var rutaLayerStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: '#3366ff',
          width: 2
        })
    });
    /*-------------------------------Layers-----------------------------------*/
    var layers = [];
    var geoJSONFormat = new ol.format.GeoJSON();
    sourceLayer = new ol.source.Vector({
        projection: 'EPSG:3857'
    });
    var vectorCustomLayer = new ol.layer.Vector({
        source: sourceLayer,
        style: style_function
        /*updateWhileAnimating: true,
         updateWhileInteracting: true*/
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
        minZoom: 2,
        projection: "EPSG:4326" //podriamos cambiar proyeccion pero 4258 no la soporta openlayers y 4326 no la soporta cartociudad
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
    markerFeature = new ol.Feature();
    markerFeature.setGeometry(null);
    markerFeature.setStyle(markerFeatureStyle);
    markerVector = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [markerFeature]
        })
    });
    
    rutaLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: []
        })
    });
    rutaLayer.setStyle(rutaLayerStyle);
    
    vectorSource = new ol.source.Vector();

    var clusterSource = new ol.source.Cluster({
        distance: parseInt(40, 10),
        source: vectorSource
      });

    var styleCache = {};

    var incidenciasRuta = new ol.layer.Vector({
        name: 'GetFeature result',
      source: clusterSource,
      style: function(feature) {
          var size = feature.get('features').length;
          var style = styleCache[size];
          if (!style) {
            if(size>1)
              {
                  style = new ol.style.Style({
                  image: new ol.style.Circle({
                    radius: 10,
                    stroke: new ol.style.Stroke({
                      color: '#fff'
                    }),
                    fill: new ol.style.Fill({
                      color: '#3399CC'
                    })
                  }),
                  text: new ol.style.Text({
                    text: size.toString(),
                    fill: new ol.style.Fill({
                      color: '#fff'
                    })
                  })
                });
                styleCache[size] = style;
              }
              else
              {
                  var src='';
                  switch(feature.get('features')[0].values_.causa)
                  {
                      case "ACCESOS CERRADOS": src='pix/accesoscerrados.png';
                      break;
                      case "ACCIDENTE": src='pix/accidente.png';
                      break;
                      case "CARRETERA CERRADA DE FORMA PERMANENTE POR INVIERN": src='pix/invierno.png';
                      break;
                      case "CARRETERA CERRADA EN AMBOS SENTIDOS": src='pix/ambossentidos.png';
                      break;
                      case "CARRETERA CORTADA EN ESTE SENTIDO": src='pix/cortada.png';
                      break;
                      case "CARRIL EN SENTIDO CONTRARIO": src='pix/contrario.jpg';
                      break;
                      case "CARRIL LENTO CERRADO": src='pix/carrillento.png';
                      break;
                      case "DESVÍO OPERATIVO": src='pix/desvio.png';
                      break;
                      case "ITINERARIO ALTERNATIVO": src='pix/alternativo.png';
                      break;
                      case "LLUVIA": src='pix/lluvia.png';
                      break;
                      case "MANTENIMIENTO DE PUENTES": src='pix/puente.png';
                      break;
                      case "NIEBLA": src='pix/niebla.png';
                      break;
                      case "NIEVE": src='pix/nieve.png';
                      break;
                      case "OBRAS EN GENERAL": src='pix/obras.png';
                      break;
                      case "REASFALTADO": src='pix/reasfaltado.png';
                      break;
                      case "RESTRICCIONES EN ACCESOS": src='pix/restriccionaccesos.png';
                      break;
                      case "SEÑALIZACION DE LA CALZADA": src='pix/señalizacion.png';
                      break;
                      case "TRABAJOS DE MANTENIMIENTO": src='pix/mantenimiento.png';
                      break;
                      case "VIENTO": src='pix/viento.png';
                      break;
                      case "CARRIL INCORPORACION": src='pix/incorporacion.png';
                      break;
                      case "CARRIL(ES) CERRADO(S)": src='pix/carrilcerrado.png';
                      break;
                      default: src='pix/default.png';
                      break;
                  }
                  style=new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    scale: 0.05,
                    src: src
                    }))
                  });
              }
          }
          return style;
        }
    });

    vectorIncidencias = new ol.source.Vector();

    var clusterIncidencias = new ol.source.Cluster({
        distance: parseInt(40, 10),
        source: vectorIncidencias
      });

    causa = [];

    var todasIncidencias = new ol.layer.Vector({
      name: 'GetFeature result',
      source: clusterIncidencias,
      style: function(feature) {
          var size = feature.get('features').length;
          var style = styleCache[size];
          if (!style) {
              if(size>1)
              {
                  style = new ol.style.Style({
                  image: new ol.style.Circle({
                    radius: 10,
                    stroke: new ol.style.Stroke({
                      color: '#fff'
                    }),
                    fill: new ol.style.Fill({
                      color: '#3399CC'
                    })
                  }),
                  text: new ol.style.Text({
                    text: size.toString(),
                    fill: new ol.style.Fill({
                      color: '#fff'
                    })
                  })
                });
                styleCache[size] = style;
              }
              else
              {
                  var src='';
                  switch(feature.get('features')[0].values_.causa)
                  {
                      case "ACCESOS CERRADOS": src='pix/accesoscerrados.png';
                      break;
                      case "ACCIDENTE": src='pix/accidente.png';
                      break;
                      case "CARRETERA CERRADA DE FORMA PERMANENTE POR INVIERN": src='pix/invierno.png';
                      break;
                      case "CARRETERA CERRADA EN AMBOS SENTIDOS": src='pix/ambossentidos.png';
                      break;
                      case "CARRETERA CORTADA EN ESTE SENTIDO": src='pix/cortada.png';
                      break;
                      case "CARRIL EN SENTIDO CONTRARIO": src='pix/contrario.jpg';
                      break;
                      case "CARRIL LENTO CERRADO": src='pix/carrillento.png';
                      break;
                      case "DESVÍO OPERATIVO": src='pix/desvio.png';
                      break;
                      case "ITINERARIO ALTERNATIVO": src='pix/alternativo.png';
                      break;
                      case "LLUVIA": src='pix/lluvia.png';
                      break;
                      case "MANTENIMIENTO DE PUENTES": src='pix/puente.png';
                      break;
                      case "NIEBLA": src='pix/niebla.png';
                      break;
                      case "NIEVE": src='pix/nieve.png';
                      break;
                      case "OBRAS EN GENERAL": src='pix/obras.png';
                      break;
                      case "REASFALTADO": src='pix/reasfaltado.png';
                      break;
                      case "RESTRICCIONES EN ACCESOS": src='pix/restriccionaccesos.png';
                      break;
                      case "SEÑALIZACION DE LA CALZADA": src='pix/señalizacion.png';
                      break;
                      case "TRABAJOS DE MANTENIMIENTO": src='pix/mantenimiento.png';
                      break;
                      case "VIENTO": src='pix/viento.png';
                      break;
                      case "CARRIL INCORPORACION": src='pix/incorporacion.png';
                      break;
                      case "CARRIL(ES) CERRADO(S)": src='pix/carrilcerrado.png';
                      break;
                      default: src='pix/default.png';
                      break;
                  }
                  style=new ol.style.Style({
                    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    scale: 0.05,
                    src: src
                    }))
                  });
              }
          }
          return style;
        }
    });

    /**
       * Create an overlay to anchor the popup to the map.
       */
       var container = document.getElementById('popup');
      overlay = new ol.Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
        duration: 250
        }
      });

        
    layers = [layergroup, rutaLayer, incidenciasRuta, todasIncidencias, userPosition, markerVector];
    // New Custom zoom.
    var zoom = new ol.control.Zoom({ target: "navigation", className: "custom-zoom" });
    map = new ol.Map({
        layers: layers,
        controls:  ol.control.defaults({rotate: true, attribution: true}),
        //interactions: drag_rotate,
        overlays: [overlay],
        target: 'map',
        view: view
        /*loadTilesWhileAnimating: true,
         loadTilesWhileInteracting: true*/
    });
    map.addInteraction(select);

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
    map.on('click', function (evt) {
        var hasFeature = false;
        map.forEachFeatureAtPixel(map.getEventPixel(evt.originalEvent), function (feature, layer) {
            if (feature.get('stageposition') === 0) {
                return false;
            }
            hasFeature = true;
        });
        if (!hasFeature) {
            var coordinates = map.getEventCoordinate(evt.originalEvent);
            markerFeature.setGeometry(coordinates ?
                new ol.geom.Point(coordinates) : null);
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

