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
		projection: 'EPSG:4326',
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
    var markerFeature = new ol.Feature();
    markerFeature.setGeometry(null);
    markerFeature.setStyle(markerFeatureStyle);
    var markerVector = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [markerFeature]
        })
    });
    layers = [layergroup, userPosition, markerVector];
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

