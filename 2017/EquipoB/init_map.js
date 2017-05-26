setTimeout(initmap, 200);

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

    var earthquakeFill = new ol.style.Fill({
        color: 'rgba(0, 0, 255, 0.8)'
    });
    var earthquakeStroke = new ol.style.Stroke({
        color: 'rgba(255, 204, 0, 0.2)',
        width: 1
    });
    var textFill = new ol.style.Fill({
        color: '#fff'
    });
    var textStroke = new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 0.6)',
        width: 3
    });
    var invisibleFill = new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.01)'
    });

    var earthquakeFill2 = new ol.style.Fill({
        color: 'rgba(50, 205, 50, 0.8)'
    });
    var earthquakeStroke2 = new ol.style.Stroke({
        color: 'rgba(255, 0,100, 0.2)',
        width: 1
    });
    var textFill2 = new ol.style.Fill({
        color: '#eee'
    });
    var textStroke2 = new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 0.6)',
        width: 3
    });
    var invisibleFill2 = new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.01)'
    });

    /*-------------------------------Layers-----------------------------------*/
    var layers = [];
    var geoJSONFormat = new ol.format.GeoJSON();
    var source = new ol.source.Vector({
        projection: 'EPSG:3857'
    });
    var vectorCustomLayer = new ol.layer.Vector({
        source: source,
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
        })
    });
    aeriallayer.set("name", "aerialview");
    var roadlayer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });
    roadlayer.set("name", "roadview");

    function createEarthquakeStyle(feature) {
        // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
        // standards-violating <magnitude> tag in each Placemark.  We extract it
        // from the Placemark's name instead.
        var name = feature.get('name');
        var radius = 5 + 20;

        return new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 0.5],
                size: [1000, 520],
                offset: [52, 0],
                opacity: 1,
                scale: 0.08,
                src: '../pix/fuentes.png'
            })
        });
    }

    var maxFeatureCount, fuentesVector;

    function calculateClusterInfo(resolution) {
        maxFeatureCount = 0;
        var features = fuentesVector.getSource().getFeatures();
        var feature, radius;
        for (var i = features.length - 1; i >= 0; --i) {
            feature = features[i];
            var originalFeatures = feature.get('features');
            var extent = ol.extent.createEmpty();
            var j, jj;
            for (j = 0, jj = originalFeatures.length; j < jj; ++j) {
                ol.extent.extend(extent, originalFeatures[j].getGeometry().getExtent());
            }
            maxFeatureCount = Math.max(maxFeatureCount, jj);
            radius = 0.25 * (ol.extent.getWidth(extent) + ol.extent.getHeight(extent)) /
                resolution;
            feature.set('radius', radius);
        }
    }

    var currentResolution;

    function styleFunction(feature, resolution) {
        if (resolution != currentResolution) {
            calculateClusterInfo(resolution);
            currentResolution = resolution;
        }
        var style;
        var size = feature.get('features').length;
        if (size > 1) {
            style = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: feature.get('radius'),
                    fill: new ol.style.Fill({
                        color: [0, 0, 255, 0.5]
                    })
                }),
                text: new ol.style.Text({
                    text: size.toString(),
                    fill: textFill,
                    stroke: textStroke
                })
            });
        } else {
            var originalFeature = feature.get('features')[0];
            style = createEarthquakeStyle(originalFeature);
        }
        return style;
    }

    function selectStyleFunction(feature) {
        var styles = [new ol.style.Style({
            image: new ol.style.Circle({
                radius: feature.get('radius'),
                fill: invisibleFill
            })
        })];
        var originalFeatures = feature.get('features');
        var originalFeature;
        for (var i = originalFeatures.length - 1; i >= 0; --i) {
            originalFeature = originalFeatures[i];
            styles.push(createEarthquakeStyle(originalFeature));
        }
        return styles;
    }

    var fuentesVector = new ol.layer.Vector({
        title: 'Fuentes',
        source: new ol.source.Cluster({
            distance: 40,
            source: new ol.source.Vector({
                url: 'http://localhost:8080/geoserver/wfs?&service=wfs&version=1.1.0&request=GetFeature&typeNames=Prototype:fuentes',
                format: new ol.format.WFS({
                })
            })
        }),
        style: styleFunction
    });

    function createEarthquakeStyle1(feature) {
        // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
        // standards-violating <magnitude> tag in each Placemark.  We extract it
        // from the Placemark's name instead.
        var name = feature.get('name');
        var radius = 5 + 20;

        return new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 0.5],
                size: [256, 256],
                offset: [0, 0],
                opacity: 1,
                scale: 0.15,
                src: '../pix/parques.png'
            })
        });
    }

    var maxFeatureCount2, parquesVector;

    function calculateClusterInfo2(resolution) {
        maxFeatureCount2 = 0;
        var features = parquesVector.getSource().getFeatures();
        var feature, radius;
        for (var i = features.length - 1; i >= 0; --i) {
            feature = features[i];
            var originalFeatures = feature.get('features');
            var extent = ol.extent.createEmpty();
            var j, jj;
            for (j = 0, jj = originalFeatures.length; j < jj; ++j) {
                ol.extent.extend(extent, originalFeatures[j].getGeometry().getExtent());
            }
            maxFeatureCount2 = Math.max(maxFeatureCount2, jj);
            radius = 0.25 * (ol.extent.getWidth(extent) + ol.extent.getHeight(extent)) /
                resolution;
            feature.set('radius', radius);
        }
    }

    var currentResolution2;

    function styleFunction2(feature, resolution) {
        if (resolution != currentResolution2) {
            calculateClusterInfo2(resolution);
            currentResolution2 = resolution;
        }
        var style;
        var size = feature.get('features').length;
        if (size > 1) {
            style = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: feature.get('radius'),
                    fill: new ol.style.Fill({
                        color: [50, 205, 50, 0.4],
                    })
                }),
                text: new ol.style.Text({
                    text: size.toString(),
                    fill: textFill2,
                    stroke: textStroke2
                })
            });
        } else {
            var originalFeature = feature.get('features')[0];
            style = createEarthquakeStyle1(originalFeature);
        }
        return style;
    }

    function selectstyleFunction2(feature) {
        var styles = [new ol.style.Style({
            image: new ol.style.Circle({
                radius: feature.get('radius'),
                fill: invisibleFill2
            })
        })];
        var originalFeatures = feature.get('features');
        var originalFeature;
        for (var i = originalFeatures.length - 1; i >= 0; --i) {
            originalFeature = originalFeatures[i];
            styles.push(createEarthquakeStyle1(originalFeature));
        }
        return styles;
    }
    
    var parquesVector = new ol.layer.Vector({
        title: 'Parques',
        source: new ol.source.Cluster({
            distance: 40,
            source: new ol.source.Vector({
                url: 'http://localhost:8080/geoserver/wfs?&service=wfs&version=1.1.0&request=GetFeature&typeNames=Prototype:parques',
                format: new ol.format.WFS({
                })
            })
        }),
        style: styleFunction2
    });

    var layergroup = new ol.layer.Group({ layers: [aeriallayer, roadlayer, fuentesVector, parquesVector] });
    var view = new ol.View({
        projection: 'EPSG:4326',
        center: [-3.703790, 40.416775], //https://epsg.io/
        zoom: 14,
        minZoom: 2
    });
    
    var drag_rotate = ol.interaction.defaults().extend([
        new ol.interaction.DragRotateAndZoom()
    ]);
    
    geolocation = new ol.Geolocation({
        projection: view.getProjection(),
        trackingOptions: {
            enableHighAccuracy: true,
            maximumAge: 0
        },
        tracking: true
    });
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
    
    /////////////////////////
    
    var selectedStyle = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 40,
                fill: new ol.style.Fill({
                    color: 'rgba(255,150,200,1)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(20,30,100,1)',
                    width: 3
                })
            })
        });

    var notrepoint = new ol.layer.Vector({
        name:"pointi",
        source: new ol.source.Vector({ features: [new ol.Feature({ geometry: new ol.geom.Point([-3.70384, 40.41673])})] }),
        style: selectedStyle
    });
    
    /////////////////////////
    
    layers = [layergroup, userPosition, markerVector];
    
    // New Custom zoom.
    var zoom = new ol.control.Zoom({ target: "navigation", className: "custom-zoom" });
    
    map = new ol.Map({
        layers: layers,
        controls: ol.control.defaults({ rotate: true, attribution: true }),
        //interactions: drag_rotate,
        target: 'map',
        view: view
            /*loadTilesWhileAnimating: true,
             loadTilesWhileInteracting: true*/
    });
    
    // http://openlayers.org/en/latest/examples/select-features.html
    // select interaction working on "singleclick"
    var select = new ol.interaction.Select();

    map.addInteraction(select);
    select.on('select', function(e){
        if (e.selected.length === 1){
            var feature = e.target.getFeatures().getArray(),
                values = feature[0].values_,
                coordinates = values.geometry.flatCoordinates;
            $("#positionCoordinates").html('('+coordinates[0]+', '+coordinates[1]+')');
        }
        else $("#positionCoordinates").html('No feature selected.');
    });
    
    
    
    // Initialize the page layers.
    add_layergroup_to_list(layergroup);

    /*-------------------------------Events-----------------------------------*/
    geolocation.on('change:position', function() {
        var coordinates = this.getPosition();
        if (this.get("center")) {
            fly_to(map, coordinates);
        }
        positionFeature.setGeometry(coordinates ?
            new ol.geom.Point(coordinates) : null);
        if (this.get("validate_location")) {
            renew_source(true, false);
        }
    });
    geolocation.on('change:accuracyGeometry', function() {
        accuracyFeature.setGeometry(this.getAccuracyGeometry());
        this.setTracking(false);
        $.mobile.loading("hide");
    });
    geolocation.on('error', function(error) {
        this.setTracking(false);
        $.mobile.loading("hide");
        toast(error.message);
    });
    /**
     * Customize this function
     */
    map.on('click', function(evt) {
        var hasFeature = false;
        map.forEachFeatureAtPixel(map.getEventPixel(evt.originalEvent), function(feature, layer) {
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
    /**
     * Location searching panel
     */
    $("#autocomplete").on("filterablebeforefilter", function(e, data) {
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
            openStreetMapGeocoder.geocode(value, function(response) {
                if (response[0] === false) {
                    $ul.html("<li data-filtertext='" + value + "'>" + "noresults" + "</li>");
                } else {
                    $.each(response, function(i, place) {
                        $("<li data-filtertext='" + value + "'>")
                            .hide().append($("<a href='#'>").text(place.totalName)
                                .append($("<p>").text(place.type))
                            ).appendTo($ul).click(function() {
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
    $("#infopanel").on("collapsibleexpand", "[data-role='collapsible']", function(event, ui) {
        var innerinfopanel = $("#infopanel .ui-panel-inner");
        innerinfopanel.animate({
            scrollTop: parseInt($(this).offset().top - innerinfopanel.offset().top +
                innerinfopanel.scrollTop())
        }, 500);
    });
    // Set a max-height to make large images shrink to fit the screen.
    $(document).on("popupbeforeposition", function() {
        var maxHeight = $(window).height() - 200 + "px";
        $('.ui-popup [data-role="content"]').css("max-height", maxHeight);
    });
    // Remove the popup after it has been closed to manage DOM size
    $(document).on("popupafterclose", ".ui-popup:not(#popupdialog)", function() {
        $(this).remove();
        select.getFeatures().clear();
    });
    $(document).on("click", "#acceptupdates", function() {
        infomsgs = [];
    });
    // Redraw map
    // Customize this
    $(window).on("pagecontainershow resize", function(event, ui) {
        $.mobile.resetActivePageHeight();
        var pageId = $.mobile.pageContainer.pagecontainer('getActivePage').prop("id");
        if (pageId === 'mappage') {
            if (event.type === "resize") {
                setTimeout(function() {
                    map.updateSize();
                }, 200);
            } else {
                map.updateSize();
                // Do something smart in this update
                fit_map_to_layer(source);
            }
        } else if (pageId === 'historypage') {
            if (event.type === 'pagecontainershow') {
                set_attempts_history();
            }
        } else if (pageId === 'questionpage') {
            if (event.type === 'pagecontainershow') {
                if (lastsuccessfulstage.question === '') {
                    $.mobile.pageContainer.pagecontainer("change", "#mappage");
                } else {
                    set_question();
                }
            }
        }

    });
    //Buttons events
    $('#autolocate').on('click', function() {
        autolocate(true);
    });
    $('#infopanel').panel({
        beforeclose: function() {
            select.getFeatures().clear();
        }
    });

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
    if (validate) {
        if (markerFeature.getGeometry() !== null) {
            renew_source(true, false);
        } else {
            toast("nomarks");
        }
    } else {
        $.mobile.loading("show");
        geolocation.setProperties({ center: center, validate_location: validate });
        geolocation.setTracking(true);
    }
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

    var features = typeof(source.getFeatures) === 'undefined' ? null : source.getFeatures();
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
    layergroup.getLayers().forEach(function(layer) {
        var item = $('<li>', {
                "data-icon": "check",
                "class": layer.getVisible() ? "checked" : "unchecked"
            })
            .append($('<a />', {
                    text: layer.get("name"),
                    href: "#mappage"
                })
                .click(function() {
                    layergroup.getLayers().forEach(function(l) {
                        if (l === layer) {
                            l.setVisible(true);
                        } else {
                            l.setVisible(false);
                        }
                    });
                })
            );
        layer.on('change:visible', function() {
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
            .click(function() {
                layer.setVisible(!layer.getVisible());
            })
        );
    layer.on('change:visible', function() {
        $(item).toggleClass('checked unchecked');
    });
    item.insertAfter('#baseLayer');
}

/*-------------------------------Helper functions -------------*/
function toast(msg) {
    if ($(".toast").length > 0) {
        setTimeout(function() {
            toast(msg);
        }, 2500);
    } else {
        $("<div class='ui-loader ui-overlay-shadow  ui-corner-all toast'>" +
                "<p>" + msg + "</p></div>")
            .css({
                left: ($(window).width() - 284) / 2,
                top: $(window).height() / 2
            })
            .appendTo($.mobile.pageContainer).delay(2000)
            .fadeOut(400, function() {
                $(this).remove();
            });
    }
}

function create_popup(type, title, body) {
    var header = $('<div data-role="header"><h2>' + title + '</h2></div>'),
        content = $('<div data-role="content" class="ui-content ui-overlay-b">' + body +
            '</div>'),
        popup = $('<div data-role="popup" id="' + type + '"' +
            'data-theme="b" data-transition="slidedown"></div>');
    if (type === 'info') {
        $('<a href="#" data-rel="back" class="ui-btn ui-corner-all' +
            'ui-btn-b ui-icon-delete ui-btn-icon-notext ui-btn-right"></a>').appendTo(header);
    }
    if (type === 'displayupdates') {
        $('<p class="center-wrapper"><a id="acceptupdates" href="#" data-rel="back"' +
                'class="ui-btn center-button ui-mini ui-btn-inline">' +
                "continue" + '</a></p>')
            .appendTo(content);
        var attributes = { 'data-dismissible': false, 'data-overlay-theme': "b" };
        $(popup).attr(attributes);
    }
    if (type === 'displayerror') {
        $('<p class="center-wrapper"><a href="view.php?id=' + cmid +
                '" class="ui-btn  center-button ui-mini ui-icon-forward ui-btn-inline ui-btn-icon-left"' +
                'data-ajax="false">' + "continue" + '</a></p>')
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
        totalimg.one('load', function() {
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
        var fallback = setTimeout(function() {
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
        setTimeout(function() {
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