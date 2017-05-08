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
    
    var fuentesLayer = new ol.layer.Image({
            name: 'Fuentes',
            source: new ol.source.ImageWMS({
                url: 'http://localhost:8080/geoserver/wms',
                params: {'LAYERS': 'prototype:fuentes', 'VERSION': '1.1.0'},
                serverType: 'geoserver'
            })
        });
        
    var parquesLayer = new ol.layer.Image({
            name: 'Parques',
            source: new ol.source.ImageWMS({
                url: 'http://localhost:8080/geoserver/wms',
                params: {'LAYERS': 'prototype:parques', 'VERSION': '1.1.0'},
                serverType: 'geoserver'
            })
        });
    
    var layergroup = new ol.layer.Group({ layers: [aeriallayer, roadlayer, fuentesLayer, parquesLayer] });
    var view = new ol.View({
        center: [-413065.700853, 4928659.583828],
        zoom: 12,
        minZoom: 2
    });
    
    var select = new ol.interaction.Select({
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
    geolocation = new ol.Geolocation({
        projection: view.getProjection(),
        trackingOptions: {
            enableHighAccuracy: true,
            maximumAge: 0
        },
        tracking: false
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

    /*-------------------------------Events-----------------------------------*/
    geolocation.on('change:position', function () {
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
    $('#autolocate').on('click', function () {
        autolocate(true);
    });
    $('#infopanel').panel({
        beforeclose: function () {
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

/*-------------------------------Helper functions -------------*/
function toast(msg) {
    if ($(".toast").length > 0) {
        setTimeout(function () {
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
            .fadeOut(400, function () {
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