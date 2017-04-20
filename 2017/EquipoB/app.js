$(document).bind('pageinit', function(){

    $( "#slider-3" ).slider(); // jquery ui slider init not working apparently

    setTimeout(function() {
        var demoFunctions=[
        {title:'add WFS layer BBOX',function:'addWFSLayer'},
        {title:'add WFS Feature',function:'addWFSFeature'},
        {title:'add WMS layer',function:'addWMSLayer'},
        {title:'add Editable layer',function:'addEditableLayer'}
    ];
    var liststring ='';
    demoFunctions.forEach(function(element) {
        liststring = liststring +  '<li><a href="#" onclick="'+element.function+'()">'+ element.title +'</a></li>';
    }, this);
    var list = $('#listdemos');
    var listcontent = $(liststring);
    list.html(liststring);
    list.trigger('create');
    }, 100);




   $("#pruebaMatteo").click(function(){
        testAction(); 
    });

    function testAction(){
        
    }



    function addEditableLayer(){
          var features = new ol.Collection();
          var featureOverlay = new ol.layer.Vector({
            source: new ol.source.Vector({features: features}),
            style: new ol.style.Style({
              fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
              }),
              stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2
              }),
              image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                  color: '#ffcc33'
                })
              })
            })
          });
          featureOverlay.setMap(map);

          var modify = new ol.interaction.Modify({
            features: features,
            // the SHIFT key must be pressed to delete vertices, so
            // that new vertices can be drawn at the same position
            // of existing vertices
            deleteCondition: function(event) {
              return ol.events.condition.shiftKeyOnly(event) &&
                  ol.events.condition.singleClick(event);
            }
          });
          map.addInteraction(modify);

          var draw; // global so we can remove it later
          //TODO: use globals draw
          function activateDraw() {
            draw = new ol.interaction.Draw({
              features: features,
              type: 'Polygon' // @type {ol.geom.GeometryType}
            });
            map.addInteraction(draw);
          }

          /**
           * Handle change event.
           */
          function deactivateDraw() {
            map.removeInteraction(draw);
          };   
          activateDraw();
    }
    function addWFSLayer() {
        var vectorSource = new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: function (extent) {
                return 'https://ahocevar.com/geoserver/wfs?service=WFS&' +
                    'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
                    'outputFormat=application/json&srsname=EPSG:3857&' +
                    'bbox=' + extent.join(',') + ',EPSG:3857';
            },
            strategy: ol.loadingstrategy.bbox
        });
        var vector = new ol.layer.Vector({
            name: 'WFS example layer',
            source: vectorSource,
            style: new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 255, 1.0)',
                    width: 2
                })
            })
        });
        map.addLayer(vector);
        add_layer_to_list(vector);
    }
    function addWFSFeature(){
         var vectorSource = new ol.source.Vector();
          var vector = new ol.layer.Vector({
              name: 'GetFeature result',
            source: vectorSource,
            style: new ol.style.Style({
              stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 255, 1.0)',
                width: 2
              })
            })
          });
          // generate a GetFeature request
          var featureRequest = new ol.format.WFS().writeGetFeature({
            srsName: 'EPSG:3857',
            featureNS: 'http://openstreemap.org',
            featurePrefix: 'osm',
            featureTypes: ['water_areas'],
            outputFormat: 'application/json',
            filter: ol.format.filter.and(
              ol.format.filter.like('name', 'Pisuerga*'),
              ol.format.filter.equalTo('waterway', 'riverbank')
            )
          });

          // then post the request and add the received features to a layer
          fetch('https://ahocevar.com/geoserver/wfs', {
            method: 'POST',
            body: new XMLSerializer().serializeToString(featureRequest)
          }).then(function(response) {
            return response.json();
          }).then(function(json) {
            var features = new ol.format.GeoJSON().readFeatures(json);
            vectorSource.addFeatures(features);
            map.addLayer(vector);
            add_layer_to_list(vector);
            map.getView().fit(vectorSource.getExtent());
          });
    }
    function addWMSLayer(){
        var wms =new ol.layer.Image({
              extent: [-13884991, 2870341, -7455066, 6338219],
              name: 'Test WMS',
              source: new ol.source.ImageWMS({
                url: 'https://ahocevar.com/geoserver/wms',
                params: {'LAYERS': 'topp:states'},
                serverType: 'geoserver'
              })
            });
        map.addLayer(wms);
        add_layer_to_list(wms);

        // GetFeatureInfo
        map.on('singleclick', function(evt) {
            var view = map.getView();
            var viewResolution = /** @type {number} */ (view.getResolution());
            var url = wms.getSource().getGetFeatureInfoUrl(
                evt.coordinate, viewResolution, 'EPSG:3857',
                {'INFO_FORMAT': 'text/plain'});
            if (url) {
                $.get(url,function(data){
                    create_popup('info','GetFeatureInfo',data);
                });
            }
          });
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
    
}); // End of document init
