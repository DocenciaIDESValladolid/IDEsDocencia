/**
 * Demo functions
 */
 var estadosLayer;
 var bufferLayer;
 var aptosLayer;
 
		function recuperar(){
	 var url ="/geoserver";
	 fetch(url, {  
				method: 'post',
				body: `<wfs:GetFeature service="WFS" version="1.1.0" outputFormat="application/json"
				  xmlns:wfs="http://www.opengis.net/wfs"
				  xmlns:ide2018c="ide2018c"
				  xmlns:lugares_visitados="lugares_visitados"
				  xmlns:gml="http://www.opengis.net/gml"
				  xmlns:ogc="http://www.opengis.net/ogc"
				  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
				  xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
				<wfs:Query typeName="ide2018c:lugares_visitados">  
				<ogc:Filter>
						
						<ogc:PropertyIsEqualTo>
							
							<ogc:PropertyName>email</ogc:PropertyName>
							
							<ogc:Literal>`+email_facebook+`</ogc:Literal>
							
						</ogc:PropertyIsEqualTo>
						
					
					</ogc:Filter>

					</wfs:Query>
				</wfs:GetFeature>`
			})
			.then(function(response){
			return response.json();
			})
			.then(function (response) {
				var olformat= new ol.format.GeoJSON();
				var featureslugares= olformat.readFeatures(response, {featureProjection: 'EPSG:4326'});			
				return featureslugares;
			})
				.then(function(featureslugares){
				var source = new ol.source.Vector();
				
				source.addFeatures(featureslugares);
				visitadosLayer = new ol.layer.Vector({
					name: 'lugaresVisitados',
					source: source
				});
				map.addLayer(visitadosLayer);
				add_layer_to_list(visitadosLayer);
		})
		}	
		
		function playas(){

	 var urlplaya = new URL('/proxymirame.php', location.href);
	 
	 var filterxmlplaya= '<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml"> <PropertyIsLike  wildCard="*" singleChar="." escape="!"> <PropertyName>feature_name</PropertyName> <Literal>*Play*</Literal> </PropertyIsLike> </Filter>';
			var params = {
				FILTER: filterxmlplaya, 
				request: 'GetFeature', 
				version: '1.1.0',
				outputFormat:'json',
				typeName:'Presas',
				service: 'WFS'
				};
				
			urlplaya.search = new URLSearchParams(params)
			fetch(urlplaya, {  
				method: 'get',  
			})
			.then(function(response){
			return response.json();
			})
			.then(function (response) {
				var olformat= new ol.format.GeoJSON();
				var featuresplaya= olformat.readFeatures(response, {featureProjection: 'EPSG:4326'});			
				return featuresplaya;
			})
				.then(function(featuresplaya){
				var source = new ol.source.Vector();
				
				source.addFeatures(featuresplaya);
				playaLayer = new ol.layer.Vector({
					name: 'playas',
					source: source
				});
				map.addLayer(playaLayer);
				add_layer_to_list(playaLayer);
		})
		}
		
		function anadir(){
			
			var localizacion = markerFeature.getGeometry();
			var cordenada = localizacion.getLastCoordinate();
			
	 var url ="/geoserver";
	 fetch(url, {  
				method: 'post',
				body: `<wfs:Transaction service="WFS" version="1.0.0"
  xmlns:wfs="http://www.opengis.net/wfs"
  xmlns:ide2018c="ide2018c"
  xmlns:lugares_visitados="lugares_visitados"
  xmlns:gml="http://www.opengis.net/gml"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd http://www.openplans.org/topp http://localhost:8080/geoserver/wfs/DescribeFeatureType?typename=topp:tasmania_roads">
  <wfs:Insert>
    <ide2018c:lugares_visitados>
      <lugares_visitados:geom>
            <gml:Point srsName="urn:x-ogc:def:crs:EPSG:4326">
                 <gml:coordinates decimal="." cs="," ts=" ">
        			`+cordenada[0]+`,`+cordenada[1]+`
       			 </gml:coordinates>
  		    </gml:Point>
      </lugares_visitados:geom>
      <lugares_visitados:email>`+email_facebook+`</lugares_visitados:email>
    </chduero:lugares_visitados>
  </wfs:Insert>
</wfs:Transaction>`
			})
			
 }
		var micontador=0;
		//import jsts from 'jsts';
		function algoritmo() {//VERTIDOS
			//var url ='?FILTER=&request=GetFeature&version=1.1.0&outputFormat=GML2&typeName=Estado_Rios_Global_2016';
			
			var divisorGrados = 83179.0496; // (Cos(41.6522966)*40076000)/360 Latitud Valladolid
			var distancia = document.formulario.distancia.value;
			var distanciaGrados = distancia/divisorGrados; //Convertimos los metros introducidos en grados para realizar la consulta
			var urlestadorios = new URL('/proxymirame.php', location.href);
			var localizacion = markerFeature.getGeometry();
			var cordenada = localizacion.getLastCoordinate();
			var filterxmlestado = '<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml"> 	<And> 		<DWithin> 			<PropertyName>geometry</PropertyName> 			<gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#4326" xmlns:gml="http://www.opengis.net/gml"> 				<gml:coordinates decimal="." cs="," ts=" ">'+cordenada[0]+','+cordenada[1]+'</gml:coordinates> 			</gml:Point> 			<Distance units="meter">'+distanciaGrados+'</Distance> 		</DWithin> 		<PropertyIsEqualTo> 			<PropertyName>state</PropertyName> 			<Literal>Bueno</Literal> 		</PropertyIsEqualTo> 	</And> </Filter>';
			var params = {
				FILTER: filterxmlestado, 
				request: 'GetFeature', 
				version: '1.1.0',
				outputFormat:'json',
				typeName:'Estado_Rios_Global_2016',
				service: 'WFS'
				};
			urlestadorios.search = new URLSearchParams(params)
						
			var urlvertidos = new URL('/proxymirame.php', location.href);
			var filterxmlvertidos = '<Filter xmlns="http://www.opengis.net/ogc" xmlns:gml="http://www.opengis.net/gml">  		<DWithin> 			<PropertyName>geometry</PropertyName> 			<gml:Point srsName="http://www.opengis.net/gml/srs/epsg.xml#4326" xmlns:gml="http://www.opengis.net/gml"> 				<gml:coordinates decimal="." cs="," ts=" ">'+cordenada[0]+','+cordenada[1]+'</gml:coordinates> 			</gml:Point> 		<Distance units="meter">'+distanciaGrados+'</Distance> 		</DWithin></Filter>';
			params = {
				FILTER: filterxmlvertidos, 
				request: 'GetFeature', 
				version: '1.1.0',
				outputFormat:'json',
				typeName:'Vertidos',
				service: 'WFS'
				};
			urlvertidos.search = new URLSearchParams(params)
			
			
			fetch(urlvertidos, {  
				method: 'get',  
			})
			.then(function(response){
			if(micontador==1)
			{
				map.removeLayer(aptosLayer);
				map.removeLayer(estadosLayer);
				map.removeLayer(bufferLayer);
			}
			
			return response.json();
			})
			.then(function (response) {
				
				micontador=1;
				
				var olformat= new ol.format.GeoJSON();
				var i;
				var featuresvertidos= olformat.readFeatures(response, {featureProjection: 'EPSG:4326'});			
				var parser = new jsts.io.OL3Parser();
				for(i = 0; i < featuresvertidos.length; i++){
					var featurevertidos = featuresvertidos[i];
					// convert the OpenLayers geometry to a JSTS geometry
					var jstsGeomvertido = parser.read(featurevertidos.getGeometry());
					var buffered = jstsGeomvertido.buffer(0.01);//en el momento de recibir los vertidos
					featurevertidos.setGeometry(parser.write(buffered));
				}
				return featuresvertidos;
			})	
			.then(function(featuresvertidos){
				var source = new ol.source.Vector();
				/*var estilobuffer = new ol.style.Style({
				  image: new ol.style.Icon( ({
					anchor: [0.5, 46],
					anchorXUnits: 'fraction',
					anchorYUnits: 'pixels',
					src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png'
				  }))
				});*/
				source.addFeatures(featuresvertidos);
				bufferLayer = new ol.layer.Vector({
					name: 'buffer',
					source: source
					//style:estilobuffer
				});
				map.addLayer(bufferLayer);
				add_layer_to_list(bufferLayer);
				return featuresvertidos;
			})
			.then(function(featuresvertidos){
				fetch(urlestadorios, {  
				method: 'get',  
				})
				.then(function(response){
					return response.json();
				})
				.then(function(response){
					var olformat= new ol.format.GeoJSON();
					var features= olformat.readFeatures(response, {featureProjection: 'EPSG:4326'});	
					var source = new ol.source.Vector();
					source.addFeatures(features);
					estadosLayer = new ol.layer.Vector({
					name: 'buenos',
					source: source
				});
				map.removeLayer(estadosLayer);
				map.addLayer(estadosLayer);
				add_layer_to_list(estadosLayer);
					return response
				})
				.then(function (response) {
					var olformat= new ol.format.GeoJSON();
					var i;
					var features= olformat.readFeatures(response, {featureProjection: 'EPSG:4326'});	
					var parser = new jsts.io.OL3Parser();
					var vertidosgeoms = [];
					for (i=0; i < featuresvertidos.length; i++) {
						var jstsGeomvertido = parser.read(featuresvertidos[i].getGeometry());
						vertidosgeoms.push(jstsGeomvertido);
					}
						
					for(i = 0; i < features.length; i++)
					{
						var feature = features[i];
						// convert the OpenLayers geometry to a JSTS geometry
						var jstsGeomestado = parser.read(feature.getGeometry());
						//var buffered = jstsGeomestado.buffer(0.011)
						//feature.setGeometry(parser.write(buffered));
						//jstsGeomestado = buffered;
						
						for(j = 0; j < vertidosgeoms.length; j++){
							var jstsGeomvertido = vertidosgeoms[j];
							if (jstsGeomvertido.intersects(jstsGeomestado)) {
								jstsGeomestado = jstsGeomestado.difference(jstsGeomvertido);
							}
							
						}
						feature.setGeometry(parser.write(jstsGeomestado));
						// convert back from JSTS and replace the geometry on the feature
					}
					return features;
				})
				.then(function(features){
					var source = new ol.source.Vector();
					source.addFeatures(features);
					aptosLayer = new ol.layer.Vector({
						name: 'aptos',
						source: source
					});
					map.addLayer(aptosLayer);
					add_layer_to_list(aptosLayer);
				})
			})
		}
		
$('#mappage').on("pageinit", function(){
  add_demo_functions();
  initmap();
  initApp();
});
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