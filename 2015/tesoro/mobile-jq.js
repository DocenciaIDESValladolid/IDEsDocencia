// Start with the map page
window.location.replace(window.location.href.split("#")[0] + "#mappage");

var selectedFeature = null;

function autolocate()
{
$.mobile.loading( "show", {
					text: "Localizando",
					textVisible: true});
 var control = map.getControlsBy("id", "locate-control")[0];
    if (control.active) {
        control.getCurrentLocation();
    } else {
        control.activate();
    }
$.mobile.loading("hide");
}
// fix height of content
function fixContentHeight() {
    var footer = $("div[data-role='footer']:visible"),
        content = $("div[data-role='content']:visible:visible"),
	header = $("div[data-role='header']:visible:visible"),
        viewHeight = $(window).height(),
        contentHeight = viewHeight - footer.outerHeight()- header.outerHeight();

    if ((content.outerHeight() + footer.outerHeight()+ header.outerHeight()) !== viewHeight) {
        contentHeight -= (content.outerHeight() - content.height() + 1);
        content.height(contentHeight);
    }

    if (window.map && window.map instanceof OpenLayers.Map) {
        map.updateSize();
    } else {
        // initialize map
        init(function(feature) { 
            selectedFeature = feature; 
            $.mobile.changePage("#popup", "pop"); 
        });
        initLayerList();
        var control = map.getControlsBy("id", "locate-control")[0];
        if (control.active) {
                control.getCurrentLocation();
        } else {
                control.activate();
        }
    }
}

// one-time initialisation of button handlers 

$("#plus").on('click',function(){
    map.zoomIn();
});

$("#minus").on('click',function(){
    map.zoomOut();
});

$("#locate").on('click',autolocate);



$(window).bind("orientationchange resize pageshow", fixContentHeight);


$('#popup').on('pageshow',function(event, ui){
    var li = "";
    for(var attr in selectedFeature.attributes){
        li += "<li><div style='width:25%;float:left'>" + attr + "</div><div style='width:75%;float:right'>" 
        + selectedFeature.attributes[attr] + "</div></li>";
    }
    $("ul#details-list").empty().append(li).listview("refresh");
});
var initialized=false;  
$(document).on("pageshow", function(event){
    if (event.target.id=='mappage' && initialized==false){
     setState("welcoming"); //INITIALIZE state
     initialized=true;
    }
});

$(document).on('pagecontainershow',function(event, ui){
    var pageId = $('body').pagecontainer('getActivePage').prop('id');
    if (pageId==='mappage'){//fix the content height AFTER jQuery Mobile has rendered the map page
        fixContentHeight();
    }else if (pageId==='searchpage')
    {
	$('#query').on('input propertychange paste', function(e){
        $('#search_results').empty();
        if ($('#query')[0].value === '') {
            return;
        }
       // $.mobile.showPageLoadingMsg();
        $.mobile.loading( "show", {
					text: "Buscando",
					textVisible: true});
        // Prevent form send
        e.preventDefault();

        var searchUrl = 'http://ws.geonames.org/searchJSON?featureClass=P&maxRows=10&username=IDE14';
        searchUrl += '&name_startsWith=' + $('#query')[0].value;
        $.getJSON(searchUrl, function(data) {
            $.each(data.geonames, function() {
                var place = this;
                $('<li>')
                    .hide()
                    .append($('<h2 />', {
                        text: place.name
                    }))
                    .append($('<p />', {
                        html: '<b>' + place.countryName + '</b> ' + place.fcodeName
                    }))
                    .appendTo('#search_results')
                    .click(function() {
                        $.mobile.changePage('#mappage');
                        var lonlat = new OpenLayers.LonLat(place.lng, place.lat);
                        map.setCenter(lonlat.transform(gg, sm), 10);
                    })
                    .show();
            });
            $('#search_results').listview('refresh');
           // $.mobile.hidePageLoadingMsg();
		   $.mobile.loading( "hide");
        });
    });
    // only listen to the first event triggered
 //   $('#searchpage').die('pageshow', arguments.callee);
	}
	
});

function initLayerList() {
    $('#layerspage').page();
    $('<li>', {
            "data-role": "list-divider",
            text: "Vista del Mapa"
        })
        .appendTo('#layerslist');
    var baseLayers = map.getLayersBy("isBaseLayer", true);
    $.each(baseLayers, function() {
		addLayerToList(this);
    });

    $('<li>', {
            "data-role": "list-divider",
            text: "Capas"
        })
        .appendTo('#layerslist');
    var overlayLayers = map.getLayersBy("isBaseLayer", false);
    $.each(overlayLayers, function() {
        switch(this.name){
            case 'vector':
            case 'Tesoro:Editable':
            case 'Markers':
                break;
            default:
                if (this.name.indexOf('OpenLayers_Control')==-1){
                   addLayerToList(this);
                }
        }
    });
    $('#layerslist').listview('refresh');
    
   map.events.register("addlayer", this, function(e) {
        switch(e.layer.name){
            case 'OpenLayers.Handler.Polygon':
            case 'Pistas nuevo escenario':
                break;
            default:
                if (e.layer.name.indexOf('OpenLayers_Control')==-1){
                   addLayerToList(e.layer);
                }
            }
        $("#layerslist").listview("refresh");
    });
}

function addLayerToList(layer) {
    var item = $('<li>', {
            "data-icon": "check",
            "class": layer.visibility ? "checked" : ""
        })
        .append($('<a />', {
            text: layer.name
        })
            .click(function() {
                //$.mobile.changePage('#mappage');
                if (layer.isBaseLayer) {
                    layer.map.setBaseLayer(layer);
                } else {
                    layer.setVisibility(!layer.getVisibility());
                }
            })
        )
        .appendTo('#layerslist');
    layer.events.on({
        'visibilitychanged': function() {
            $(item).toggleClass('checked');
        }
    });
}
function removeLayerToList(layer,name) {
    $("li").remove(":contains("+name+")");
}