
/* Incluimos la API de Open Layers */

//import Geolocation from 'ol/geolocation.js';
/*import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';*/

/**
 * Demo functions
 */
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
  /*-------Obtener valores lista desplegable---- */
  // Muestra la selección de la lista desplegable
  document.getElementById("NivOscuridad").addEventListener("change", function(e) {
      console.log("Nivel oscuridad: " + e.target.value);
    });
  
  
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
  
  
  /**
  * Código necesario para la implementación del Spinner en el que el usuario puede elegir entre emplear su propia
  * ubicación o marcar un punto de orígen.
  */
  var x, i, j, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = document.getElementsByClassName("custom-select");
  for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < selElmnt.length; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function(e) {
          /* When an item is clicked, update the original select box,
          and the selected item: */
          var y, i, k, s, h;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          h = this.parentNode.previousSibling;
          for (i = 0; i < s.length; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              for (k = 0; k < y.length; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
  
  /**
  * Calcula un buffer de centro (ubicación usuario o punto marcado) y radio (introducido por el usuario). Posteriormente
  * filtra la capa de zonas oscuras con el rango introducido por el usuario y aplica el buffer.
  * @param value Radio
  * @param value NivelOscuridad
  * @param ol.geom.Point origen
  * @return Promise(FeatureCollection) en formato JSON con un buffer que contiene las zonas de oscuridad filtradas según el rango.
  */
  function Consulta_Buffer_PolygonExtraction(Radio,NivelOscuridad,origen)
  {
      var layerWPS=`<wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
	<ows:Identifier>ras:PolygonExtraction</ows:Identifier>
	<wps:DataInputs>
		<wps:Input>
			<ows:Identifier>data</ows:Identifier>
			<wps:Reference mimeType="image/tiff" xlink:href="http://geoserver/wcs" method="POST">
        <wps:Body>
          <wcs:GetCoverage service="WCS" version="1.1.1">
            <ows:Identifier>ide2020b:Contaminacion_luminica</ows:Identifier>
            <wcs:DomainSubset>
              <ows:BoundingBox crs="http://www.opengis.net/gml/srs/epsg.xml#3857">
                <ows:LowerCorner>-792919.4092452168 4871676.572923876</ows:LowerCorner>
                <ows:UpperCorner>-194713.38067853975 5351057.36307961</ows:UpperCorner>
              </ows:BoundingBox>
            </wcs:DomainSubset>
            <wcs:Output format="image/tiff"/>
          </wcs:GetCoverage>
        </wps:Body>
      </wps:Reference>
		</wps:Input>
		<wps:Input>
			<ows:Identifier>roi</ows:Identifier>
			<wps:Reference mimeType="text/xml; subtype=gml/3.1.1" xlink:href="http://geoserver/wps" method="POST">
				<wps:Body>
					<wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
						<ows:Identifier>geo:buffer</ows:Identifier>
						<wps:DataInputs>
							<wps:Input>
								<ows:Identifier>geom</ows:Identifier>
								<wps:Data>
									<wps:ComplexData mimeType="application/wkt"><![CDATA[POINT(${origen.flatCoordinates[0].toString()} ${origen.flatCoordinates[1].toString()})]]></wps:ComplexData>
								</wps:Data>
							</wps:Input>
							<wps:Input>
								<ows:Identifier>distance</ows:Identifier>
								<wps:Data>
									<wps:LiteralData>${Radio}</wps:LiteralData>
								</wps:Data>
							</wps:Input>
							<wps:Input>
								<ows:Identifier>capStyle</ows:Identifier>
								<wps:Data>
									<wps:LiteralData>Round</wps:LiteralData>
								</wps:Data>
							</wps:Input>
						</wps:DataInputs>
						<wps:ResponseForm>
							<wps:RawDataOutput mimeType="application/json">
								<ows:Identifier>result</ows:Identifier>
							</wps:RawDataOutput>
						</wps:ResponseForm>
					</wps:Execute>
				</wps:Body>
			</wps:Reference>
		</wps:Input>
		<wps:Input>
			<ows:Identifier>ranges</ows:Identifier>
			<wps:Data>
				<wps:LiteralData>${NivelOscuridad}</wps:LiteralData>
			</wps:Data>
		</wps:Input>
	</wps:DataInputs>
	<wps:ResponseForm>
		<wps:RawDataOutput mimeType="application/json">
			<ows:Identifier>result</ows:Identifier>
		</wps:RawDataOutput>
	</wps:ResponseForm>
</wps:Execute>`;
      // Use relative URL to avoid hostname and port.
      return fetch("/geoserver/wps", {
                          method: "POST",
                          mode: 'no-cors',
                          
                          headers: {
                              "Content-Type": "application/xml"
                          },
                          body: layerWPS
                      }).then(function(response){
                          return response.text();
                      }).then(function(json){
                          //Introducimos en la variable features todas las features (capa circular con las zonas oscuras finales) del fichero json
                          var features = new ol.format.GeoJSON().readFeatures(json);
                          //Devolvemos tipo Promise por ser async
                          return Promise.resolve(features);									  
                      });
  }
  
  /**
  * Calcula la intersección entre la capa con las zonas oscuras y la capa de usos del suelo (ambas previamente filtradas).
  * @param JSON capa_zonas_oscuras.
  * Nota -> se hace consulta WFS para obtener la capa con los usos del suelo.
  * @return Promise(FeatureCollection) en formato JSON con la intersección de las dos capas.
  */
  function Consulta_Intersection(capa_zonas_oscuras)
  {
      var layerWPS=`<wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
    <ows:Identifier>vec:IntersectionFeatureCollection</ows:Identifier>
    <wps:DataInputs>
      <wps:Input>
        <ows:Identifier>first feature collection</ows:Identifier>
        <wps:Data>
          <wps:ComplexData mimeType="application/json"><![CDATA[${capa_zonas_oscuras}]]></wps:ComplexData>
        </wps:Data>
      </wps:Input>
      <wps:Input>
        <ows:Identifier>second feature collection</ows:Identifier>
        <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST">
          <wps:Body>
            <wfs:GetFeature service="WFS" version="2.0.0" outputFormat="GML2" xmlns:Proyecto="http://geoserver.org/proyecto">
              <wfs:Query typeName="ide2020b:usos_suelo"/>
            </wfs:GetFeature>
          </wps:Body>
        </wps:Reference>
      </wps:Input>
      <wps:Input>
        <ows:Identifier>intersectionMode</ows:Identifier>
        <wps:Data>
          <wps:LiteralData>INTERSECTION</wps:LiteralData>
        </wps:Data>
      </wps:Input>
    </wps:DataInputs>
    <wps:ResponseForm>
      <wps:RawDataOutput mimeType="application/json">
        <ows:Identifier>result</ows:Identifier>
      </wps:RawDataOutput>
    </wps:ResponseForm>
  </wps:Execute>`;  
  
      return fetch("/geoserver/wps", {
                          method: "POST",
                          mode: 'no-cors',
                          headers: {
                              "Content-Type": "application/xml"
                          },
                          body: layerWPS
                      }).then(function(response){
                          return response.json();
                      }).then(function(json){
                          //Introducimos en la variable features todas las features (capa circular con las zonas oscuras finales) del fichero json
                          var features = new ol.format.GeoJSON().readFeatures(json);
                          //Devolvemos tipo Promise por ser async
                          return Promise.resolve(features);									  
                      });
  }
  
  /**
  * Calcula el punto más próximo al usuario dentro de las zonas recomendadas.
  * @param JSON capa_zonas_recomendadas
  * @param ol.geom.Point origen
  * @return Promise(Feature) en formato JSON con el punto más cercano al usuario dentro de la capa de zonas recomendadas.
  */
  function Consulta_Snap(capa_zonas_recomendadas,origen)
  {
      var layerWPS=`<wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
    <ows:Identifier>vec:Snap</ows:Identifier>
    <wps:DataInputs>
      <wps:Input>
        <ows:Identifier>features</ows:Identifier>
        <wps:Data>
          <wps:ComplexData mimeType="application/json"><![CDATA[${capa_zonas_recomendadas}]]></wps:ComplexData>
        </wps:Data>
      </wps:Input>
      <wps:Input>
        <ows:Identifier>point</ows:Identifier>
        <wps:Data>
          <wps:ComplexData mimeType="application/wkt"><![CDATA[POINT(${origen.flatCoordinates[0].toString()} ${origen.flatCoordinates[1].toString()})]]></wps:ComplexData>
        </wps:Data>
      </wps:Input>
      <wps:Input>
        <ows:Identifier>crs</ows:Identifier>
        <wps:Data>
          <wps:LiteralData>EPSG:3857</wps:LiteralData>
        </wps:Data>
      </wps:Input>
    </wps:DataInputs>
    <wps:ResponseForm>
      <wps:RawDataOutput mimeType="application/json">
        <ows:Identifier>result</ows:Identifier>
      </wps:RawDataOutput>
    </wps:ResponseForm>
  </wps:Execute>`;  
  
      return fetch("/geoserver/wps", {
                          method: "POST",
                          mode: 'no-cors',
                          headers: {
                              "Content-Type": "application/xml"
                          },
                          body: layerWPS
                      }).then(function(response){
                          return response.json();
                      }).then(function(json){
                          //Introducimos en la variable features todas las features (capa circular con las zonas oscuras finales) del fichero json
                          var features = new ol.format.GeoJSON().readFeatures(json);
                          //Devolvemos tipo Promise por ser async
                          return Promise.resolve(features);									  
                      });
  }
 /**
 * Calcula una ruta usando el servicio WPS RouteFinder.
 * @param ol.geom.Point origen
 * @param ol.geom.Point punto_destino
 * @return Promise(FeatureCollection) con la ruta calculada.
 */
async function Consulta_Cartociudad(origen,punto_destino)
{  

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
                <gml:pos>${origen[0]} ${origen[1]}</gml:pos>
              </gml:Point>
            </wp:geom>
          </wp:waypoint>
          <wp:waypoint gml:id="2">
            <wp:geom>
              <gml:Point srsDimension="2" srsName="http://www.opengis.net/gml/srs/epsg.xml#4258">
                <gml:pos>${punto_destino[0]} ${punto_destino[1]}</gml:pos>
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
</wps:Execute>
    `;

//Con try catch gestionamos posibles errores que puede devolver el servidor de Cartociudad
/*try{
  returnVar =*/ return fetch("https://www.cartociudad.es/wps/WebProcessingService", {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/xml"
                      },
                      body: layerWPS
                  }).then(function(response){
            return response.text();
          }).then(function(gml){
            var doc = ol.xml.parse(gml);
            var colls = doc.getElementsByTagName("gml:FeatureCollection");
            var coll = colls[0];
                      // WPS uses random namespaces and Featuretypes each request.
            var ns = coll.getAttribute("xmlns:n52");
            var sufix = ns.substring("http://www.52north.org/".length);
            var featuretype = 'Feature-' + sufix;
            var options={
              srsName: "EPSG:4258", //proyeccion de openlayers
              featureNS: ns,//poner el necesario en cada caso
              featurePrefix: 'n52',
              featureType: featuretype
                }
              // Register the alias for the SRS.
              proj4.defs("EPSG:4258","+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs");
            proj4.defs("http://www.opengis.net/gml/srs/epsg.xml#4258", "+proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs");
            var wfsformat = new ol.format.GML(options);
            var rutacoll =wfsformat.readFeatures(coll);
            return Promise.resolve(rutacoll);
          }).catch(function(error){
            alert("No se ha podido recuperar la ruta");
            $.mobile.loading("hide");
          return;
           
          });
  /*}catch(error){
    alert("Hubo un problema al calcular la ruta a través del servicio Cartociudad\n Inténtelo de nuevo");
    return 0;
  }		
  return returnVar;*/

}
  
// JPC: Hay que separar lo máximo posible la funcionalidad de los eventos del interfaz. Si no el código será difícil de manejar.
// Enlaza con el botón.
/**
* Manejador de evento cuando el usuario hace "click" en el botón BUSCAR.
* Se recogen las tres variables que el usuario introdujo a través de la interfaz -> Radio, Nivel de Oscuridad y Tipo de Origen.
* Posteriormente se llama a la función muestraValores a la que le pasamos como argumento de entrada las tres variables.
*/
$('#muestraValores').click(function () {
	 //Variables que introduce el usuario por teclado
    var Radio = document.getElementById("Radio").value;
    if(Radio=="") Radio="20000"; //Valor por defecto
    var NivelOscuridad= document.getElementById("NivOscuridad").value;
    if(NivelOscuridad=="0") NivelOscuridad="(0;5)"; //Valor por defecto
    var TipoOrigen = document.formulario.tipoOrigen.value;
	muestraValores(Radio, NivelOscuridad, TipoOrigen).then(() => {
        //Ocultamos el reloj
        $.mobile.loading("hide");
		toast("Cálculo finalizado");
		});
	}); 


  /**
  * Función encargada de recoger los valores introducidos por el usuario
  * Radio= radio de cobertura en metros
  * NiveldeOscuridad= rango que se introducirá en la consulta Buffer_PolygonExtraction
  */
  async function muestraValores(Radio, NivelOscuridad, TipoOrigen) {
    //Limpiamos fuentes
    fuenteOscuridad.clear();
    fuenteRecomendable.clear();
    fuentePunto.clear();
    fuenteRuta.clear();
    
    //Comprobamos qué tipo de origen pretende utilizar el usuario
    if (TipoOrigen=="real")
    {
      //Comprobamos que el usuario ha permitido localizar su ubicación al navegador
      if(geolocation.getPosition()==null)
      {
        alert("Debe permitir al navegador encontrar su ubicación");
          return;
      }
      var ubicacion = geolocation.getPosition();
    }
    else
    {
      //Comprobamos que el usuario ha seleccionado alguna zona del mapa
      if(typeof selectedCoordinates== 'undefined')
      {
        alert("Debe seleccionar un punto primero");
          return;
      }
      var ubicacion = selectedCoordinates;
    }
  
    //Introducimos coordenadas origen en un objeto de clase punto
    origen=new ol.geom.Point([ubicacion[0],ubicacion[1]]);
      
    alert("Este es el radio introducido: " + Radio + "\n El nivel de oscuridad introducido es: " + NivelOscuridad + "\n Ubicación del usuario" + ubicacion);
    
    //Posible reloj
    $.mobile.loading("show");
    
    //Recogemos las features que forman la capa de zonas oscuras
    toast("Recuperando capa de zonas oscuras...");
    
    // JPC: Las llamadas asíncronas deben ser ejecutadas asíncronamente... y devolver Promise
    return Consulta_Buffer_PolygonExtraction(Radio,NivelOscuridad,origen).then(procesa_zonas_oscuras).then(paso2);
  };
  
  /**
  * Esta función se encarga de llamar a las funciones necesarias que realizan la lógica de la aplicación.
  * Inicialmente llama a Consulta_Intersection() para realizar la intersección y obtener la capa de zonas recomendadas para el usuario.
  * Posteriormente llama a Consulta_Snap() para obtener el punto más cercano al usuario dentro de la capa de zonas recomendadas.
  * Por último, se llama a Consulta_Cartociudad() para obtener la ruta entre el origen y el punto de destino.
  * @param JSON capa_zonas_oscuras
  * @return Promise (FeatureCollection) que componen la ruta entre el punto de origen y el punto destino.
  */
  async function procesa_zonas_oscuras(capa_zonas_oscuras) {
        //Comprobamos que se ha recibido alguna feature
		if (capa_zonas_oscuras.length==0)
		{
		alert("No se ha encontrado ninguna zona recomendable con los criterios introducidos");
        //Ocultamos el reloj
        $.mobile.loading("hide");
		return;
		}
		//Añadimos features a la capa
		fuenteOscuridad.addFeatures(capa_zonas_oscuras);

		//Obtenemos JSON de features para siguiente consulta
		var geojson = new ol.format.GeoJSON();
		var salidaPolygon = geojson.writeFeatures(capa_zonas_oscuras);

		//Recogemos las features que forman la capa de zonas recomendables
		toast("Recuperando capa de zonas recomendables para el usuario...")
		var capa_interseccion = await Consulta_Intersection(salidaPolygon);
        
        //Comprobamos que se ha recibido alguna feature
		if (capa_interseccion.length==0)
		{
		alert("No se ha encontrado ninguna zona recomendable, lo sentimos");
        //Ocultamos el reloj
        $.mobile.loading("hide");
		return;
		}
        
		//Añadimos features a la capa
		fuenteRecomendable.addFeatures(capa_interseccion);

		//Obtenemos JSON de features para siguiente consulta
		var salidaInterseccion = geojson.writeFeatures(capa_interseccion);

		//Recogemos el punto recomendado
		toast("Recuperando punto más cercano...")
		var capa_snap = await Consulta_Snap(salidaInterseccion, origen);

		//Realizamos conversión de coordenadas y generamos nueva feature
		var coordenadasPunto = ol.proj.transform(capa_snap[0].getGeometry().flatCoordinates,"EPSG:4326","EPSG:3857");
		punto = new ol.Feature();
		punto.setGeometry(new ol.geom.Point(coordenadasPunto));
		//Añadimos feature a la capa
        fuentePunto.addFeature(punto);
        toast("Calculando Ruta...");
		//return Consulta_Cartociudad(ol.proj.transform(origen.getCoordinates(),"EPSG:3857","EPSG:4326"), capa_snap[0].getGeometry().getCoordinates());
    var respuesta_carto = await Consulta_Cartociudad(ol.proj.transform(origen.getCoordinates(),"EPSG:3857","EPSG:4326"), capa_snap[0].getGeometry().getCoordinates());
    
    if (respuesta_carto.length!=0){
		return respuesta_carto;
    }else{
      alert("No se ha encontrado ninguna ruta, lo sentimos");
        //Ocultamos el reloj
        $.mobile.loading("hide");
      return;
    }
  }
  
  /**
  * Esta función se encarga de pintar por pantalla la colección de features devuelta por Cartociudad
  * @param Respuesta de Cartociudad
  * @return Void
  */
  function paso2(cartociudadResponse) {
    
    //Recorremos cada una de las features que devuelve Cartociudad y se realiza transformación de EPSG para
    //visualizar correctamente por pantalla.
    if (cartociudadResponse==0) return; //En caso de error en consulta Cartociudad
    cartociudadResponse.forEach((feature) => {
    	feature.getGeometry().transform("EPSG:4258","EPSG:3857");
    });
    //Añadimos las features a la capa fuenteRuta para mostrarlas por pantalla.
    fuenteRuta.addFeatures(cartociudadResponse);
	return;

  }
  
  
  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < x.length; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  
  /* If the user clicks anywhere outside the select box,
  then close all select boxes: */
  document.addEventListener("click", closeAllSelect);
