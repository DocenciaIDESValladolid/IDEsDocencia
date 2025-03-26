var express = require('express');
const proxy = require('http-proxy-middleware');
var fs = require('fs');
var app = express();
var pg = require('pg');
var conn = "postgres://postgres:postgres@127.0.0.1/IDEs";
// Servicio de ficheros estáticos.
app.use(express.static(__dirname));
/**
 * URL principal por defecto.
 */
app.get('/', function (req, res) {
    console.log('GET /')
    //var html = '<html><body><form method="post" action="http://localhost:3000">Name: <input type="text" name="name" /><input type="submit" value="Submit" /></form></body>';
    var html = fs.readFileSync('index.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
});
// Proxy for local geoserver.
var geoserverProxy = proxy('/geoserver1', {target: 'http://localhost:8080'});
app.use(geoserverProxy);

var mirameProxy = proxy('/mirame', {target: 'http://www.mirame.chduero.es', 
									pathRewrite: {
													'^/mirame' : '/geoserver/ows',     // rewrite path
												},
									changeOrigin: true,     
									});
app.use(mirameProxy);
/**
 * Ejemplo para obtener las tablas de la base de datos
 */
app.get('/tables', function (req, res) {
    console.log("GET /tables");
    var pgclient = new pg.Client(conn);
    pgclient.connect();
    var query = pgclient.query("SELECT * FROM pg_catalog.pg_tables");
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {
        res.json(result.rows);
        res.end();
    });
});
/**
 * Ejemplo de petición para acceder a la base de datos.
 */
app.get('/geoms/:table/:geom', function (req, res, next) {
    console.log("GET /geoms");
    var pgclient = new pg.Client(conn);
    pgclient.connect();
    var table = req.params.table;
    var geom = req.params.geom;
    /* NO USAR ESTO EN CÓDIGO DE PRODUCCIÓN: PERMITE INYECCIÓN DE SQL */
    var query = pgclient.query("SELECT ST_ASGEOJSON(" + geom + ") as " + geom + " FROM " + table);
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {
        res.send(result.rows);
        res.end();
    });
});
/**
 * Creación de una FeatureCollection mediante SQL de postgis
 */
app.get('/layers/:table/features', function (req, res, next) {
    console.log("GET /layers");
    var pgclient = new pg.Client(conn);
    pgclient.connect();
    var table = req.params.table;
    /* NO USAR ESTO EN CÓDIGO DE PRODUCCIÓN: PERMITE INYECCIÓN DE SQL */
    var query = pgclient.query("SELECT row_to_json(fc) FROM " +
        "( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features " +
        " FROM (SELECT 'Feature' As type, ST_AsGeoJSON(edif.geom)::json As geometry, row_to_json(edif) As properties" +
        " FROM edificios As edif) as f) as fc");
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {
        res.send(result.rows[0].row_to_json);
        res.end();
    });
});
/**
 * Creación de una FeatureCollection progresivamente mediante javascript
 */
app.get('/layers/:table/featuresjson', function (req, res, next) {
    console.log("GET /layers");
    var pgclient = new pg.Client(conn);
    pgclient.connect();
    var table = req.params.table;
    /* NO USAR ESTO EN CÓDIGO DE PRODUCCIÓN: PERMITE INYECCIÓN DE SQL */
    var querystring = "SELECT ST_AsGeoJSON(geom)::json As geometry_JSON, * FROM " + table;
    var query = pgclient.query(querystring);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write('{"type":"FeatureCollection","features":[');
    query.on("row", function (row, result) {
        var properties = {};
        var feature = { "type": 'Feature' };
        feature.properties = properties;
        // Crea el elemento "properties" con todas las columnas excepto la geometría
        for (var key in row) {
            var value = row[key];
            if (key == 'geometry_json') {
                feature.geometry = value;
            } else
                if (key != 'geom') {
                    properties[key] = value;
                }
        }
        // pasa a JSON
        var featurejson = JSON.stringify(feature);
        res.write(featurejson);
        res.write(",");
    });
    query.on("end", function (result) {
        res.write(']}');
        res.end();
    });
});
/**
 * Ejemplo de servicio POST
 */
app.post('/', function (req, res) {
    console.log('POST /');
    console.dir(req.body);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('thanks');
});

port = 4000;
app.listen(port);
console.log('Listening at http://localhost:' + port)