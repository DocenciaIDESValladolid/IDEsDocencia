
$('#mappage').on("pageinit", function(){
  add_demo_functions();
  initmap();
  initApp();
});

// El calculo de nuestra ruta
$("#apptst").click(function(){
     tst();
});
    
	
function tst(){
	toast("Ejemplo de calculo de ruta");
	

	var origen=new ol.geom.Point([-524447.14,4637888.47]);
	var destino=new ol.geom.Point([-410927.12,4503102.50]);
	
	origen.transform("EPSG:3857","EPSG:4258");
	destino.transform("EPSG:3857","EPSG:4258");
	
	console.log(origen)
	console.log(destino)
	
	
	/**
	JPC: Esto no se puede programar así en Javascript porque todo es asíncrono.
	Hay que meterlo todo en los métodos then() de los "Promises"
	*/
	var ruta = CalculoRuta(origen, destino);
	
/**
JPC: Movido a function procesaruta 

	ruta.transform("EPSG:4258","EPSG:3857");
	
	var sourcePoints = new ol.source.Vector();
	
	 for (i=0; i<ruta.length; i++){
                var points = ruta[i],
                    feature = new ol.Feature({ geometry: new ol.geom.Point([points.x, points.y])});
                
                sourcePoints.addFeature(feature);
            }
	        
    sourcePoints.addFeature(feature);
	            var visibilePoints = new ol.layer.Vector({
                name:"Puntos Visibiles",
                source: sourcePoints,
                style: new ol.style.Style({
                      image: new ol.style.Circle({
                        fill: new ol.style.Fill({
                          color: 'rgba(0,255,0,1)'
                        }),
                        radius:2,
                        stroke: new ol.style.Stroke({
                          color: 'rgba(0,255,255,1)',
                          width: 2
                        })
                      })
                    })
            });
            
            map.addLayer(visibilePoints);
            add_layer_to_list(visibilePoints);
	*/
	
}


function CalculoRuta(from, to){
var layerWPS=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<wps:Execute service="WPS" version="1.0.0" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsExecute_request.xsd">
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
              <gml:Point srsDimension="2" srsName="http://www.opengis.net/gml/srs/epsg.xml#4258">
                <gml:pos>
				`+from +`
				</gml:pos>
              </gml:Point>
            </wp:geom>
          </wp:waypoint>
          <wp:waypoint gml:id="2">
            <wp:geom>
              <gml:Point srsDimension="2" srsName="http://www.opengis.net/gml/srs/epsg.xml#4258">
                <gml:pos>
				`+to+`
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
      <wps:Output schema="http://schemas.opengis.net/gml/3.1.1/base/feature.xsd" mimeType="text/xml" encoding="UTF-8">
        <ows:Identifier>instructionsResult</ows:Identifier>
      </wps:Output>
    </wps:ResponseDocument>
  </wps:ResponseForm>
</wps:Execute>
`;
    
fetch("http://www.cartociudad.es/wps/WebProcessingService", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/xml"
                    },
                    body: layerWPS
                }).then(function(response){
					return response.text();
				}).then(function(gml){
					var posInicial = gml.search("<n52:GEOMETRY>");
					var posFinal = gml.search("</n52:GEOMETRY>");
					var ruta = gml.substring(posInicial,posFinal+15);
					console.log(ruta);
					procesaruta(ruta);
				});
				
}
/**
JPC: Hay que meter en una función el procesado para que se pueda hacer asíncronamente */				
function procesaruta(ruta) {
	console.log(ruta)
	ruta.transform("EPSG:4258","EPSG:3857");
	
	var sourcePoints = new ol.source.Vector();
	
	 for (i=0; i<ruta.length; i++){
                var points = ruta[i],
                    feature = new ol.Feature({ geometry: new ol.geom.Point([points.x, points.y])});
                
                sourcePoints.addFeature(feature);
            }
	        
    sourcePoints.addFeature(feature);
	            var visibilePoints = new ol.layer.Vector({
                name:"Puntos Visibiles",
                source: sourcePoints,
                style: new ol.style.Style({
                      image: new ol.style.Circle({
                        fill: new ol.style.Fill({
                          color: 'rgba(0,255,0,1)'
                        }),
                        radius:2,
                        stroke: new ol.style.Stroke({
                          color: 'rgba(0,255,255,1)',
                          width: 2
                        })
                      })
                    })
            });
            
            map.addLayer(visibilePoints);
            add_layer_to_list(visibilePoints);
	
}
				

// Obtencio de los puntos de recarga por municipio
$("#ptosMunicipio").click(function(){
     obtenerPtosRecargaMunicipio();
});

function obtenerPtosRecargaMunicipio(){ 
      // peticion a ign para obtener el municipio en el que se encuentra el usuario
      var bodyMunicipiosWFS = `<wfs:GetFeature service="WFS" version="1.1.0"
		  xmlns:topp="http://www.openplans.org/topp"
		  xmlns:wfs="http://www.opengis.net/wfs"
		  xmlns="http://www.opengis.net/ogc"
		  xmlns:gml="http://www.opengis.net/gml"
		  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		  xsi:schemaLocation="http://www.opengis.net/wfs
							  http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
		  <wfs:Query typeName="au:AdministrativeUnit">
			<Filter>
			  <And>
				<PropertyIsEqualTo>
					<PropertyName>nationalLevelName</PropertyName>
					<Literal>Municipio</Literal>
				 </PropertyIsEqualTo>
				<Intersects>
				  <PropertyName>geometry</PropertyName>
					<gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#4326">
					  <gml:coordinates>41.528587,-4.747623</gml:coordinates>
					</gml:Point>
				  </Intersects>
				</And>
			  </Filter>
		  </wfs:Query>
		</wfs:GetFeature>`;

      // then post the request and add the received features to a layer
      fetch("http://www.ign.es/wfs-inspire/unidades-administrativas", {
           method: "POST",
           headers: {
               "Content-Type": "application/xml; charset=UTF-8"
           },
           body: bodyMunicipiosWFS
	  }).then(function(response) {
        return response.text();
      }).then(function(gml) {
		//Se divide la respuesta gml para quedarnos con el nodo <au:geometry> con la geomtría del municipio-->
		var posInicial = gml.search("<au:geometry>");
		var posFinal = gml.search("</au:geometry>");
		var geometria = gml.substring(posInicial,posFinal+14);<!-- 14 es el numero de caracteres de </au:geometry> -->
		
		//dibuja los puntos de recarga (INCOMPLETO))-->
		var sourcePoints = new ol.source.Vector();
		feature = new ol.Feature({ geometry: new ol.geom.Point([4622941.16, -529108.81])});           
		sourcePoints.addFeature(feature);
		var visibilePoints = new ol.layer.Vector();
		map.addLayer(visibilePoints);
        add_layer_to_list(visibilePoints);
		
		//var features = new ol.format.WFS().readFeatures(gml);
        //vectorSource.addFeatures(features);
        //map.getView().fit(vectorSource.getExtent());
		
      });
}

function initApp() {
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
              fit_map_to_layer(sourceLayer);
          }
      } else if (pageId === 'historypage') {
          if (event.type === 'pagecontainershow') {
              alert("show something");
          }
      } else if (pageId === 'questionpage') {
          if (event.type === 'pagecontainershow') {
              if (lastsuccessfulstage.question === '') {
                  $.mobile.pageContainer.pagecontainer("change", "#mappage");
              } else {
                  alert("set something");
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
              top: $(window).height() / 8
          })
          .appendTo($.mobile.pageContainer).delay(3000)
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