var limMinLon = 3.438721;
var limMaxLon = 4.262695;

var limMinLat = 43.344156;
var limMaxLat = 43.858297;

var workspace = 'ide2018b';
/**
 * Array with all informations about layers we use
 */
var configLayersData = [
  layerPopulation = {
    name: 'population',
    style: new ol.style.Style({
      image: new ol.style.Circle({
        radius: 3,
        fill: new ol.style.Fill({
          color: 'rgb(0,255,0,0.1)'
        })
      })
    }),
    infectionProbability: 0.5,
    getWFS(minLon, minLat, maxLon, maxLat) {
      return '/geoserver/wfs?REQUEST=GetFeature&VERSION=1.0.0&TYPENAMES=' + workspace + ':pop4326&bbox=' + minLon + ',' + minLat + ',' + maxLon + ',' + maxLat + '&srs=EPSG:4326&outputFormat=application/json';
    },
    getXML(minLon, minLat, maxLon, maxLat) {
      return '<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd"><ows:Identifier>vec:VectorToRaster</ows:Identifier><wps:DataInputs><wps:Input><ows:Identifier>features</ows:Identifier><wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST"><wps:Body><wfs:GetFeature service="WFS" version="1.0.0" outputFormat="GML2" xmlns:' + workspace + '="' + workspace + '"><wfs:Query typeName="' + workspace + ':pop4326"/></wfs:GetFeature></wps:Body></wps:Reference></wps:Input><wps:Input><ows:Identifier>rasterWidth</ows:Identifier><wps:Data><wps:LiteralData>100</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>rasterHeight</ows:Identifier><wps:Data><wps:LiteralData>100</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>attribute</ows:Identifier><wps:Data><wps:LiteralData>1</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>bounds</ows:Identifier><wps:Data><wps:BoundingBoxData crs="EPSG:4326" dimensions="2"><ows:LowerCorner>' + minLon + ' ' + minLat + '</ows:LowerCorner><ows:UpperCorner>' + maxLon + ' ' + maxLat + '</ows:UpperCorner></wps:BoundingBoxData></wps:Data></wps:Input></wps:DataInputs><wps:ResponseForm><wps:RawDataOutput mimeType="image/tiff"><ows:Identifier>result</ows:Identifier></wps:RawDataOutput></wps:ResponseForm></wps:Execute>';
    },
    data: null
  },
  layerGraveyard = {
    name: 'graveyard',
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'rgb(255,0,255,0.3)',
        width: 2
      })
    }),
    infectionProbability: 1,
    getWFS(minLon, minLat, maxLon, maxLat) {
      return 'https://wxs.ign.fr/k3p0n69vbaaonaamhydsqw3f/geoportail/wfs?REQUEST=GetFeature&VERSION=1.0.0&TYPENAME=BDCARTO_BDD_WLD_WGS84G:cimetiere&bbox=' + minLon + ',' + minLat + ',' + maxLon + ',' + maxLat + '&srs=EPSG:4326&outputFormat=application/json';
    },
    getXML(minLon, minLat, maxLon, maxLat) {
      return '<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd"><ows:Identifier>vec:VectorToRaster</ows:Identifier><wps:DataInputs><wps:Input><ows:Identifier>features</ows:Identifier><wps:Reference mimeType="application/wfs-collection-1.0" xlink:href="https://wxs.ign.fr/k3p0n69vbaaonaamhydsqw3f/geoportail/wfs?REQUEST=GetFeature&amp;VERSION=1.0.0&amp;TYPENAME=BDCARTO_BDD_WLD_WGS84G:cimetiere&amp;bbox=' + minLon + ',' + minLat + ',' + maxLon + ',' + maxLat + '&amp;srs=EPSG:4326" method="GET"/></wps:Input><wps:Input><ows:Identifier>rasterWidth</ows:Identifier><wps:Data><wps:LiteralData>100</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>rasterHeight</ows:Identifier><wps:Data><wps:LiteralData>100</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>attribute</ows:Identifier><wps:Data><wps:LiteralData>1</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>bounds</ows:Identifier><wps:Data><wps:BoundingBoxData crs="EPSG:4326" dimensions="2"><ows:LowerCorner>' + minLon + ' ' + minLat + '</ows:LowerCorner><ows:UpperCorner>' + maxLon + ' ' + maxLat + '</ows:UpperCorner></wps:BoundingBoxData></wps:Data></wps:Input></wps:DataInputs><wps:ResponseForm><wps:RawDataOutput mimeType="image/tiff"><ows:Identifier>result</ows:Identifier></wps:RawDataOutput></wps:ResponseForm></wps:Execute>';
    },
    data: null
  },
  layerHealth = {
    name: 'health',
    style: new ol.style.Style({
      /*
      image: new ol.style.Icon({
        scale: 0.1,
        src: '../img/redCross.png'
      })
      */
     image: new ol.style.Circle({
      radius: 3,
      fill: new ol.style.Fill({
        color: 'rgb(0,255,0,0.3)'
      })
    })
    }),
    infectionProbability: 0.75,
    getWFS(minLon, minLat, maxLon, maxLat) {
      return 'https://wxs.ign.fr/k3p0n69vbaaonaamhydsqw3f/geoportail/wfs?REQUEST=GetFeature&VERSION=1.0.0&TYPENAME=BDTOPO_BDD_WLD_WGS84G:pai_sante&bbox=' + minLon + ',' + minLat + ',' + maxLon + ',' + maxLat + '&srs=EPSG:4326&outputFormat=application/json';
    },
    getXML(minLon, minLat, maxLon, maxLat) {
      return '<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd"><ows:Identifier>vec:VectorToRaster</ows:Identifier><wps:DataInputs><wps:Input><ows:Identifier>features</ows:Identifier><wps:Reference mimeType="application/wfs-collection-1.0" xlink:href="https://wxs.ign.fr/k3p0n69vbaaonaamhydsqw3f/geoportail/wfs?REQUEST=GetFeature&amp;VERSION=1.0.0&amp;TYPENAME=BDTOPO_BDD_WLD_WGS84G:pai_sante&amp;bbox=' + minLon + ',' + minLat + ',' + maxLon + ',' + maxLat + '&amp;srs=EPSG:4326" method="GET"/></wps:Input><wps:Input><ows:Identifier>rasterWidth</ows:Identifier><wps:Data><wps:LiteralData>100</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>rasterHeight</ows:Identifier><wps:Data><wps:LiteralData>100</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>attribute</ows:Identifier><wps:Data><wps:LiteralData>1</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>bounds</ows:Identifier><wps:Data><wps:BoundingBoxData crs="EPSG:4326" dimensions="2"><ows:LowerCorner>' + minLon + ' ' + minLat + '</ows:LowerCorner><ows:UpperCorner>' + maxLon + ' ' + maxLat + '</ows:UpperCorner></wps:BoundingBoxData></wps:Data></wps:Input></wps:DataInputs><wps:ResponseForm><wps:RawDataOutput mimeType="image/tiff"><ows:Identifier>result</ows:Identifier></wps:RawDataOutput></wps:ResponseForm></wps:Execute>';
    },
    data: null
  },
  layerReligious = {
    name: 'religious',
    style: new ol.style.Style({
      /*
      image: new ol.style.Icon({
        scale: 0.1,
        src: '../img/christianCross.png'
      })
      */
     image: new ol.style.Circle({
      radius: 3,
      fill: new ol.style.Fill({
        color: 'rgb(0,255,0,0.3)'
      })
    })
    }),
    infectionProbability: 0,
    getWFS(minLon, minLat, maxLon, maxLat) {
      return 'https://wxs.ign.fr/k3p0n69vbaaonaamhydsqw3f/geoportail/wfs?REQUEST=GetFeature&VERSION=1.0.0&TYPENAME=BDTOPO_BDD_WLD_WGS84G:pai_religieux&bbox=' + minLon + ',' + minLat + ',' + maxLon + ',' + maxLat + '&srs=EPSG:4326&outputFormat=application/json';
    },
    getXML(minLon, minLat, maxLon, maxLat) {
      return '<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd"><ows:Identifier>vec:VectorToRaster</ows:Identifier><wps:DataInputs><wps:Input><ows:Identifier>features</ows:Identifier><wps:Reference mimeType="application/wfs-collection-1.0" xlink:href="https://wxs.ign.fr/k3p0n69vbaaonaamhydsqw3f/geoportail/wfs?REQUEST=GetFeature&amp;VERSION=1.0.0&amp;TYPENAME=BDTOPO_BDD_WLD_WGS84G:pai_religieux&amp;bbox=' + minLon + ',' + minLat + ',' + maxLon + ',' + maxLat + '&amp;srs=EPSG:4326" method="GET"/></wps:Input><wps:Input><ows:Identifier>rasterWidth</ows:Identifier><wps:Data><wps:LiteralData>100</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>rasterHeight</ows:Identifier><wps:Data><wps:LiteralData>100</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>attribute</ows:Identifier><wps:Data><wps:LiteralData>1</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>bounds</ows:Identifier><wps:Data><wps:BoundingBoxData crs="EPSG:4326" dimensions="2"><ows:LowerCorner>' + minLon + ' ' + minLat + '</ows:LowerCorner><ows:UpperCorner>' + maxLon + ' ' + maxLat + '</ows:UpperCorner></wps:BoundingBoxData></wps:Data></wps:Input></wps:DataInputs><wps:ResponseForm><wps:RawDataOutput mimeType="image/tiff"><ows:Identifier>result</ows:Identifier></wps:RawDataOutput></wps:ResponseForm></wps:Execute>';
    },
    data: null
  },
  layerMilitary = {
    name: 'military',
    style: new ol.style.Style({
      /*
      image: new ol.style.Circle({
        radius: 3,
        fill: new ol.style.Fill({
          color: 'rgb(255,255,255,0.3)'
        })
      })
      */
     image: new ol.style.Circle({
        radius: 3,
        fill: new ol.style.Fill({
          color: 'rgb(0,255,0,0.3)'
        })
      })
    }),
    infectionProbability: 0,
    getWFS(minLon, minLat, maxLon, maxLat) {
      return 'https://wxs.ign.fr/k3p0n69vbaaonaamhydsqw3f/geoportail/wfs?REQUEST=GetFeature&VERSION=1.0.0&TYPENAME=BDTOPO_BDD_WLD_WGS84G:pai_administratif_militaire&bbox=' + minLon + ',' + minLat + ',' + maxLon + ',' + maxLat + '&srs=EPSG:4326&outputFormat=application/json';
    },
    getXML(minLon, minLat, maxLon, maxLat) {
      return '<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd"><ows:Identifier>vec:VectorToRaster</ows:Identifier><wps:DataInputs><wps:Input><ows:Identifier>features</ows:Identifier><wps:Reference mimeType="application/wfs-collection-1.0" xlink:href="https://wxs.ign.fr/k3p0n69vbaaonaamhydsqw3f/geoportail/wfs?REQUEST=GetFeature&amp;VERSION=1.0.0&amp;TYPENAME=BDTOPO_BDD_WLD_WGS84G:pai_administratif_militaire&amp;bbox=' + minLon + ',' + minLat + ',' + maxLon + ',' + maxLat + '&amp;srs=EPSG:4326" method="GET"/></wps:Input><wps:Input><ows:Identifier>rasterWidth</ows:Identifier><wps:Data><wps:LiteralData>100</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>rasterHeight</ows:Identifier><wps:Data><wps:LiteralData>100</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>attribute</ows:Identifier><wps:Data><wps:LiteralData>1</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>bounds</ows:Identifier><wps:Data><wps:BoundingBoxData crs="EPSG:4326" dimensions="2"><ows:LowerCorner>' + minLon + ' ' + minLat + '</ows:LowerCorner><ows:UpperCorner>' + maxLon + ' ' + maxLat + '</ows:UpperCorner></wps:BoundingBoxData></wps:Data></wps:Input></wps:DataInputs><wps:ResponseForm><wps:RawDataOutput mimeType="image/tiff"><ows:Identifier>result</ows:Identifier></wps:RawDataOutput></wps:ResponseForm></wps:Execute>';
    },
    data: null
  },
  layerWater = {
    name: 'water',
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'rgb(0,0,255,0.3)',
        width: 2
      }),
    }),
    infectionProbability: 0,
    getWFS(minLon, minLat, maxLon, maxLat) {
      return '/geoserver/wfs?REQUEST=GetFeature&VERSION=1.0.0&TYPENAMES=' + workspace + ':water&bbox=' + minLon + ',' + minLat + ',' + maxLon + ',' + maxLat + '&srs=EPSG:4326&outputFormat=application/json';
    },
    getXML(minLon, minLat, maxLon, maxLat) {
      return '<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd"><ows:Identifier>vec:VectorToRaster</ows:Identifier><wps:DataInputs><wps:Input><ows:Identifier>features</ows:Identifier><wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST"><wps:Body><wfs:GetFeature service="WFS" version="1.0.0" outputFormat="GML2" xmlns:' + workspace + '="' + workspace + '"><wfs:Query typeName="' + workspace + ':water"/></wfs:GetFeature></wps:Body></wps:Reference></wps:Input><wps:Input><ows:Identifier>rasterWidth</ows:Identifier><wps:Data><wps:LiteralData>100</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>rasterHeight</ows:Identifier><wps:Data><wps:LiteralData>100</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>attribute</ows:Identifier><wps:Data><wps:LiteralData>1</wps:LiteralData></wps:Data></wps:Input><wps:Input><ows:Identifier>bounds</ows:Identifier><wps:Data><wps:BoundingBoxData crs="EPSG:4326" dimensions="2"><ows:LowerCorner>' + minLon + ' ' + minLat + '</ows:LowerCorner><ows:UpperCorner>' + maxLon + ' ' + maxLat + '</ows:UpperCorner></wps:BoundingBoxData></wps:Data></wps:Input></wps:DataInputs><wps:ResponseForm><wps:RawDataOutput mimeType="image/tiff"><ows:Identifier>result</ows:Identifier></wps:RawDataOutput></wps:ResponseForm></wps:Execute>';
    },
    data: null
  }
]
var configLayersInvader = [
  layerZombie = {
    name: "zombie",
    style: "#FF0000",
    infectionRate: 0.2
  },
  layerVampire = {
    name: "vampire",
    style: "#FF0000",
    infectionRate: 0.15
  }
]