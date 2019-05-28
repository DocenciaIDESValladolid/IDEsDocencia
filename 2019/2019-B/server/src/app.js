/**
 * Demo functions
 */

$('#mappage').on("pageinit", function(){
  add_demo_functions();
  initmap();
  initApp();

mostrarparques();
mostraraeropuertos();
mostraraves();

});


async function mostrarinterseccion(){
	
	var CuentaWPS=`<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
			  <ows:Identifier>vec:Count</ows:Identifier>
			  <wps:DataInputs>
				<wps:Input>
				  <ows:Identifier>features</ows:Identifier>
				  <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST">
					<wps:Body>
					  <wfs:GetFeature service="WFS" version="1.0.0" outputFormat="GML2" xmlns:ide2019b="http://itastdevserver.tel.uva.es/IDE2019B">
						<wfs:Query typeName="ide2019b:dron"/>
					  </wfs:GetFeature>
					</wps:Body>
				  </wps:Reference>
				</wps:Input>
			  </wps:DataInputs>
			  <wps:ResponseForm>
				<wps:RawDataOutput>
				  <ows:Identifier>result</ows:Identifier>
				</wps:RawDataOutput>
			  </wps:ResponseForm>
			</wps:Execute>`;
			
			
			var href='/geoserver/ide2019b/wps';
			var prefixBD= 'ide2019b';
			var namespace = 'http://itastdevserver.tel.uva.es/IDE2019B';
			var featuretype = 'Aeropuertos-3857';
			var projection = ol.proj.get("EPSG:3857");
			var featuretype='dron';

			
		   
		   //Lanza una peticion al WPS asincrona para obtener el numero de rutas dibujas 
		   var cuenta = await wpsclient_count(href, CuentaWPS, prefixBD, namespace, featuretype, projection);
		   
		   
		   //consulta WFS para quedarme con la ultima ruta para realizar la interseccion posteriormente
		   var interseccion=`<wfs:GetFeature service="WFS" version="1.1.0" outputFormat="application/json"
		  xmlns:ide2019b="http://itastdevserver.tel.uva.es/IDE2019B"
		  xmlns:wfs="http://www.opengis.net/wfs"
		  xmlns:ogc="http://www.opengis.net/ogc"
		  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		  xsi:schemaLocation="http://www.opengis.net/wfs
							  http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
		  <wfs:Query typeName="ide2019b:interseccion">
			<ogc:Filter>
				<ogc:PropertyIsEqualTo>
						<ogc:PropertyName>idRuta</ogc:PropertyName>
						<ogc:Literal>${cuenta}</ogc:Literal>
				</ogc:PropertyIsEqualTo>
			</ogc:Filter>
			</wfs:Query>
		</wfs:GetFeature>`;
			
			
			
			
			// then post the request and add the received features to a layer
			fetch("/geoserver/ide2019b/wfs", {
				   method: "POST",
				   headers: {
					   "Content-Type": "application/xml; charset=UTF-8"
				   },
				   body: interseccion
			  }).then(function(response) {
				return response.json();
			  }).then(function(json){
				  var features = new ol.format.GeoJSON().readFeatures(json);
				  InterseccionSource.clear();
					InterseccionSource.addFeatures(features);

					 
					 //var extent = sourceLayer.getExtent();
				
					 //fly_to(map, null, extent);
				 											  
		    });
}





function mostrarparques(){
	
	var parquesWFS=`<wfs:GetFeature service="WFS" version="1.1.0" outputFormat="application/json"
  xmlns:topp="http://www.openplans.org/topp"
  xmlns:wfs="http://www.opengis.net/wfs"
  xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/wfs
                      http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
  <wfs:Query typeName="ide2019b:ParquesNaturales-3857-Simpl">
    <ogc:Filter>
       <PropertyIsEqualTo>
                <PropertyName>figura_lp</PropertyName>
                <Literal>Parque Natural</Literal>
          </PropertyIsEqualTo>
    </ogc:Filter>
    </wfs:Query>
</wfs:GetFeature>`;
			
			// then post the request and add the received features to a layer
			fetch("/geoserver/ide2019b/wfs", {
				   method: "POST",
				   headers: {
					   "Content-Type": "application/xml; charset=UTF-8"
				   },
				   body: parquesWFS
			  }).then(function(response) {
				return response.json();
			  }).then(function(json){
				  var features = new ol.format.GeoJSON().readFeatures(json);
				  parqueSource.clear();
					parqueSource.addFeatures(features);

					 
					 //var extent = sourceLayer.getExtent();
				
					 //fly_to(map, null, extent);
				 											  
		    });
}
function mostraraves(){
	
	var avesWFS=`<wfs:GetFeature service="WFS" version="1.1.0" outputFormat="application/json"
  xmlns:topp="http://www.openplans.org/topp"
  xmlns:wfs="http://www.opengis.net/wfs"
  xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/wfs
                      http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
  <wfs:Query typeName="ide2019b:Aves-3857-Simpl">
    </wfs:Query>
</wfs:GetFeature>`;
			
			// then post the request and add the received features to a layer
			fetch("/geoserver/wfs", {
				   method: "POST",
				   headers: {
					   "Content-Type": "application/xml; charset=UTF-8"
				   },
				   body: avesWFS
			  }).then(function(response) {
				return response.json();
			  }).then(function(json){
				  var features = new ol.format.GeoJSON().readFeatures(json);
				  avesSource.clear();
					avesSource.addFeatures(features);
				 											  
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
              fit_map_to_layer(drawSource);
          }
      } else if (pageId === 'historypage') {
          if (event.type === 'pagecontainershow') {
              //alert("show something");
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
  $('#dibujar').on('click', function () {
      dibujar(true);
  });
  $('#editar').on('click', function () {
      editar(true);
  });
 
  $('#calcular').on('click', function () {
      calcular(true).then(function(data) {
        $("#popupdialog").popup("close");
		mostrarinterseccion();
		
        // JPC: Incluir aquí lo que se hace al terminar el procesado.
      });
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
          .appendTo($.mobile.pageContainer).delay(10000)
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


//FUNCION PARA REALIZAR EL PROCESAMIENTO
async function calcular(){	
	
	if(calculo==0){
		//wfs transaccional
		var WFS = new ol.format.WFS();
		var options={
		srsName: "EPSG:3857", //proyeccion de openlayers
		featureNS: 'http://itastdevserver.tel.uva.es/IDE2019B',//poner el necesario en cada caso
		featurePrefix: 'ide2019b',
		featureType: 'dron'
		 }
		 var options1={
		srsName: "EPSG:3857", //proyeccion de openlayers
		featureNS: 'http://itastdevserver.tel.uva.es/IDE2019B',//poner el necesario en cada caso
		featurePrefix: 'ide2019b',
		featureType: 'interseccion'
		 }
		var options2={
		srsName: "EPSG:3857", //proyeccion de openlayers
		featureNS: '/geoserver/ide2019b/wfs',//poner el necesario en cada caso
		featurePrefix: 'ide2019b',
		featureType: 'dron'
		 }

		 var node= WFS.writeTransaction([geometria],null,null,options);// var node= WFS.writeTransaction([geometria],null,null,options);
																			// JMZ: var node= WFS.writeTransaction([geometria],null,null,options2); 
		

		
		s = new XMLSerializer();
		str = s.serializeToString(node);
		fetch('/geoserver/ide2019b/wfs',{
		method: 'POST',
		body: str
		}).then(function (node){
			return node.text();
		}).then(function(res){
				var resultado=WFS.readTransactionResponse(res);
				

		});
		calculo=calculo+1;
	}
	else{
		var opcion=confirm('La ruta ya se ha calulado o esta en proceso. ?Desea empezar de nuevo?');
		if (opcion == true){
			location.reload();
			draw.removeAllFeatures();
		}
		else{
			
		}
	}
	
	
	//CONSULTAS WPS

	//Obtener el bounding box de la ruta para pasarlo a la consulta
	var b=geometria.values_.geometry.flatCoordinates;
	var minimoX=9999999999; var maximoX=-9999999999; var minimoY=9999999999; var maximoY=-9999999999;
	xmin=0; var xmax=0; var ymin=0; var ymax=0;
	var j=0; var i=0;
	while(j==0)
	{
		if(i>b.length)
		{
			j=1;
		}
		else{
			if(i%2==0){
				if(b[i]<minimoX)
				{
					xmin=b[i];
					minimoX=xmin;
				}
				else if(b[i]>maximoX)
				{
					xmax=b[i];
					maximoX=xmax;
				}
			}
			else{
				if(b[i]<minimoY)
				{
					ymin=b[i];
					minimoY=ymin;
				}
				else if(b[i]>maximoY)
				{
					ymax=b[i];
					maximoY=ymax;
				}
			}
			
			i++;
		}
	}
	
	//var a= ol.extent.boundingExtent(b);
	//alert("bbox"+ xmin +"x"+ ymin +"x"+ xmax +"x"+ ymax);
	// JPC: Usar window.location.origin para no tener que poner host y puerto a mano.
	var baseurl = window.location.origin;
	var BufferWPS=`<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
			<ows:Identifier>gs:BufferFeatureCollection</ows:Identifier>
			<wps:DataInputs>
				<wps:Input>
					<ows:Identifier>features</ows:Identifier>
					<wps:Reference mimeType="text/xml" xlink:href="${baseurl}/geoserver/wps" method="POST">
						<wps:Body><![CDATA[
							<wfs:GetFeature service="WFS" version="1.1.0" maxFeatures="20" outputFormat="GML2"
							  xmlns:ide2019b="http://itastdevserver.tel.uva.es/IDE2019B"
							  xmlns:wfs="http://www.opengis.net/wfs"
							  xmlns:ogc="http://www.opengis.net/ogc"
							  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
							  xsi:schemaLocation="http://www.opengis.net/wfs
							  http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
								<wfs:Query typeName="ide2019b:Aeropuertos-3857">
									<ogc:Filter>
										<ogc:And>
											<ogc:PropertyIsEqualTo>
												<ogc:PropertyName>tip_area</ogc:PropertyName>
												<ogc:Literal>1</ogc:Literal>
											</ogc:PropertyIsEqualTo>
											<ogc:BBOX>
												<ogc:PropertyName>geom</ogc:PropertyName>
												<Envelope srsName="http://www.opengis.net/gml/srs/epsg.xml#3857">
													<lowerCorner>${minimoX} ${minimoY}</lowerCorner>
													<upperCorner>${maximoX} ${maximoX}</upperCorner>
												</Envelope>
											</ogc:BBOX>
										</ogc:And>
									</ogc:Filter>
								</wfs:Query>
							</wfs:GetFeature>
							
						]]></wps:Body>
					</wps:Reference>
				</wps:Input>
				<wps:Input>
					<ows:Identifier>distance</ows:Identifier>
					<wps:Data>
						<wps:LiteralData>10667</wps:LiteralData>
					</wps:Data>
				</wps:Input>
				</wps:DataInputs>
				<wps:ResponseForm>
					<wps:RawDataOutput mimeType="text/xml; subtype=wfs-collection/1.1">
						<ows:Identifier>result</ows:Identifier>
					</wps:RawDataOutput>
				</wps:ResponseForm>
			</wps:Execute>`;
			
			
			
			var UnionWPS=/*<?xml version="1.0" encoding="UTF-8"?>*/`<wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
			  <ows:Identifier>gs:UnionFeatureCollection</ows:Identifier>
			  <wps:DataInputs>
				<wps:Input>
				  <ows:Identifier>first</ows:Identifier>
				  <wps:Reference mimeType="text/xml; subtype=wfs-collection/1.1" xlink:href="${baseurl}/geoserver/wfs" method="POST">
					<wps:Body><![CDATA[<wfs:GetFeature service="WFS" version="1.1.0"

			  xmlns:ide2019b="http://itastdevserver.tel.uva.es/IDE2019B"
			  xmlns:wfs="http://www.opengis.net/wfs"
			  xmlns:ogc="http://www.opengis.net/ogc"
			  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			  xsi:schemaLocation="http://www.opengis.net/wfs
								  http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
			  <wfs:Query typeName="ide2019b:Aves-3857-Simpl">
				<ogc:Filter>
					 <ogc:BBOX>
					<ogc:PropertyName>geom</ogc:PropertyName>
					<Envelope srsName="http://www.opengis.net/gml/srs/epsg.xml#3857">
					   <lowerCorner>${minimoX} ${minimoY}</lowerCorner>
					   <upperCorner>${maximoX} ${maximoY}</upperCorner>
					</Envelope>
				  </ogc:BBOX>     
				</ogc:Filter>
				</wfs:Query>
			</wfs:GetFeature>]]></wps:Body>
				  </wps:Reference>
				</wps:Input>
				<wps:Input>
				  <ows:Identifier>second</ows:Identifier>
				  <wps:Reference mimeType="text/xml; subtype=wfs-collection/1.1" xlink:href="${baseurl}/geoserver/wfs" method="POST">
					<wps:Body><![CDATA[<wfs:GetFeature service="WFS" version="1.1.0"

			  xmlns:ide2019b="http://itastdevserver.tel.uva.es/IDE2019B"
			  xmlns:wfs="http://www.opengis.net/wfs"
			  xmlns:ogc="http://www.opengis.net/ogc"
			  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			  xsi:schemaLocation="http://www.opengis.net/wfs
								  http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
			  <wfs:Query typeName="ide2019b:ParquesNaturales-3857-Simpl">
				<ogc:Filter>
					 <ogc:BBOX>
					<ogc:PropertyName>geom</ogc:PropertyName>
					<Envelope srsName="http://www.opengis.net/gml/srs/epsg.xml#3857">
					   <lowerCorner>${minimoX} ${minimoY}</lowerCorner>
					   <upperCorner>${maximoX} ${maximoY}</upperCorner>
					</Envelope>
				  </ogc:BBOX>   
				</ogc:Filter>
				</wfs:Query>
			</wfs:GetFeature>]]></wps:Body>
				  </wps:Reference>
				</wps:Input>
			  </wps:DataInputs>
			  <wps:ResponseForm>
				<wps:RawDataOutput mimeType="text/xml; subtype=wfs-collection/1.1">
				  <ows:Identifier>result</ows:Identifier>
				</wps:RawDataOutput>
			  </wps:ResponseForm>
			</wps:Execute>`;
			
			
			var CuentaWPS=`<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
			  <ows:Identifier>vec:Count</ows:Identifier>
			  <wps:DataInputs>
				<wps:Input>
				  <ows:Identifier>features</ows:Identifier>
				  <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST">
					<wps:Body>
					  <wfs:GetFeature service="WFS" version="1.0.0" outputFormat="GML2" xmlns:ide2019b="http://itastdevserver.tel.uva.es/IDE2019B">
						<wfs:Query typeName="ide2019b:dron"/>
					  </wfs:GetFeature>
					</wps:Body>
				  </wps:Reference>
				</wps:Input>
			  </wps:DataInputs>
			  <wps:ResponseForm>
				<wps:RawDataOutput>
				  <ows:Identifier>result</ows:Identifier>
				</wps:RawDataOutput>
			  </wps:ResponseForm>
			</wps:Execute>`;
			
			
			
			var href='/geoserver/ide2019b/wps';
			var prefix = 'feature';
			var prefixBD= 'ide2019b';
			var namespace = 'http://itastdevserver.tel.uva.es/IDE2019B';
			var featuretype = 'Aeropuertos-3857';
			var projection = ol.proj.get("EPSG:3857");
			var featuretype2 = 'Aves-3857-Simpl';
			var featuretype3='dron';
			var featuretype4='Interseccion';
			
		   // Lanza la peticiï¿½n al WPS asï¿½ncrona. Se devuelve un objeto Promise. Hay que esperar a que se resuelva.
		   var buffercollection = await wpsclient_featurecollection(href, BufferWPS, prefixBD, namespace, featuretype, projection);//.then(function(featuresarray){});
		   // Lanza la peticiï¿½n al WPS asï¿½ncrona. Se devuelve un objeto Promise. Hay que esperar a que se resuelva.
		   var unioncollection = await wpsclient_featurecollection(href, UnionWPS, prefixBD, namespace, featuretype2, projection);
		   	
		   var fusionado = buffercollection.concat(unioncollection);
		   var GML = writeGMLFeatureMembers(fusionado, prefixBD, namespace, featuretype, projection);	

		   //console.log(GML);
		   //return Promise.resolve(GML);
		   
		   //Lanza una peticion al WPS asincrona para obtener el numero de rutas dibujas 
		   var cuenta = await wpsclient_count(href, CuentaWPS, prefixBD, namespace, featuretype3, projection);
		   var Rfid="dron." + cuenta;
		   
		   //consulta WFS para quedarme con la ultima ruta para realizar la interseccion posteriormente
		   var ruta=`<wfs:GetFeature service="WFS" version="1.1.0" outputFormat="GML2"
		  xmlns:ide2019b="http://itastdevserver.tel.uva.es/IDE2019B"
		  xmlns:wfs="http://www.opengis.net/wfs"
		  xmlns:ogc="http://www.opengis.net/ogc"
		  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		  xsi:schemaLocation="http://www.opengis.net/wfs
							  http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
		  <wfs:Query typeName="ide2019b:dron">
			<ogc:Filter>
				<ogc:FeatureId fid="dron.${cuenta}"/>
			</ogc:Filter>
			</wfs:Query>
		</wfs:GetFeature>`;
		
		var rutaDron = await wpsclient_featurecollection(href, ruta, prefixBD, namespace, featuretype3, projection);
		
		
		var InterseccionConAvesParques=`<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
  <ows:Identifier>gs:IntersectionFeatureCollection</ows:Identifier>
  <wps:DataInputs>
    <wps:Input>
      <ows:Identifier>first feature collection</ows:Identifier>
      <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wps" method="POST">
        <wps:Body>
        ${UnionWPS}
        </wps:Body>
      </wps:Reference>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>second feature collection</ows:Identifier>
      <wps:Reference mimeType="text/xml; subtype=wfs-collection/1.1" xlink:href="${baseurl}/geoserver/wfs" method="POST">
        <wps:Body>
		<![CDATA[${ruta}]]>
		</wps:Body>
      </wps:Reference>
    </wps:Input>
  </wps:DataInputs>
  <wps:ResponseForm>
    <wps:RawDataOutput mimeType="text/xml; subtype=wfs-collection/1.1">
      <ows:Identifier>result</ows:Identifier>
    </wps:RawDataOutput>
  </wps:ResponseForm>
</wps:Execute>`;
		
		var interseccionConAP = await wpsclient_featurecollection(href, InterseccionConAvesParques, prefix, namespace, featuretype2, projection);
		//calculo el numero de features de interseccion que hay con la ruta
		var numeroFeatures=interseccionConAP.length;
		
		for(var i=0; i<numeroFeatures; i++){
		//Añade una nueva feature para tener un identificador de la ruta con la que intersecciona
		//Envio cada una de las intersecciones a geoserver
		interseccionConAP[i].set('idRuta', cuenta);
		 var node1= WFS.writeTransaction([interseccionConAP[i]],null,null,options1);
		
		s = new XMLSerializer();
		str = s.serializeToString(node1);
		fetch('/geoserver/ide2019b/wfs',{
		method: 'POST',
		body: str
		}).then(function (node1){
			return node1.text();
		}).then(function(res){
				var resultado1=WFS.readTransactionResponse(res);
				

		});
		}
		var cadenaAves;
		var vectorAves=[];
		var cadenaResponsableAves;
		var vectorRAves=[];
		var cadenaParques;
		var vectorParques=[];
		var cadenaResponsableParques;
		var vectorRParques=[];
		for (var i=0; i<numeroFeatures; i++){
			
			
			if(!interseccionConAP[i].values_['Aves-3857-Simpl_site_name'])
			{
				//Tenemos interseccion con los parques
				var valorParques= interseccionConAP[i].values_['Aves-3857-Simpl_sitename']
				vectorParques.push(valorParques);
				var valorParquesR= interseccionConAP[i].values_['Aves-3857-Simpl_ccaa_n_enp']
				vectorRParques.push(valorParques);
				//var parquesResponsable[i]=interseccionConAP[i].values_['Aves-3857-Simpl_ccaa_n_enp'];
				
				
				
				
				
			}else{
				//tenemos interseccion con las aves
				
				var valorAves= interseccionConAP[i].values_['Aves-3857-Simpl_site_name']
				vectorAves.push(valorAves);
				var valorAvesR= interseccionConAP[i].values_['Aves-3857-Simpl_ac']
				vectorRAves.push(valorAvesR);
				
				
			}
			
			
		}
		cadenaAves=vectorAves.join();
		cadenaResponsableAves=vectorRAves.join();
		cadenaParques=vectorParques.join();
		cadenaResponsableParques=vectorRParques.join();
		var info="La ruta pasa por las siguientes zonas de proteccion de aves";
		
		
		
		create_popup('info', 'Interseccion', "La ruta pasa por las siguientes zonas de proteccion de aves:<br />" + cadenaAves + "   "+"<br />los responsables de estos espacios son: " + cadenaResponsableAves +
		"<br /><br /><br />"+ "La ruta pasa por las siguientes zonas de proteccion de parques naturales:<br />" + cadenaParques + "<br />los responsables de estos espacios son: " + cadenaResponsableParques);

}

function wpsclient_count(href, wpsbody, prefix, namespace, featuretype, projection){
	var SRScode= projection.getCode().substring(5);
	var WPSSRSname = "http://www.opengis.net/gml/srs/epsg.xml#" + SRScode;
    
return fetch(href, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/xml"
                    },
                    body: wpsbody
                }).then(function(response){
					return response.text();

				});
}


function mostraraeropuertos(){
	
	
	
	var aeropuertosWFS=`<wfs:GetFeature service="WFS" version="1.1.0" outputFormat="application/json"
  xmlns:topp="http://www.openplans.org/topp"
  xmlns:wfs="http://www.opengis.net/wfs"
  xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/wfs
                      http://schemas.opengis.net/wfs/1.1.0/wfs.xsd">
  <wfs:Query typeName="ide2019b:Aeropuertos-3857">
    <ogc:Filter>
       <And>
       <PropertyIsEqualTo>
                <PropertyName>tip_area</PropertyName>
                <Literal>1</Literal>
          </PropertyIsEqualTo>
       <ogc:BBOX>
					<ogc:PropertyName>geom</ogc:PropertyName>
					<Envelope srsName="http://www.opengis.net/gml/srs/epsg.xml#3857">
					   <lowerCorner>-1125153.056358 4344069.191503</lowerCorner>
					   <upperCorner>430493.343302 5410518.610138</upperCorner>
					</Envelope>
		</ogc:BBOX> 
      </And>
    </ogc:Filter>
    </wfs:Query>
</wfs:GetFeature>`;
			
			// then post the request and add the received features to a layer
			fetch("/geoserver/ide2019b/wfs", {
				   method: "POST",
				   headers: {
					   "Content-Type": "application/xml; charset=UTF-8"
				   },
				   body: aeropuertosWFS
			  }).then(function(response) {
				return response.json();
			  }).then(function(json){
				  var features = new ol.format.GeoJSON().readFeatures(json);
				  aeroSource.clear();
					aeroSource.addFeatures(features);

					 
					 //var extent = sourceLayer.getExtent();
				
					 //fly_to(map, null, extent);
				 											  
		    });
}

