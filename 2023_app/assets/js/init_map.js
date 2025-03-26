//Variables generales
let DATOS_INFORME={'gen_fuentes':0}        //Datos generales donde se guardará el informe

let select_mode=false;      //Para activar el modo de análisis por click
let inform_gen=false;       //Indica si hay un informe generado

let f_fuente=0;
let f_tiempo=0;


/**
 * Filtra aproximadamente si un punto está dentro del territorio español
 */
function filtroSpain(coordenadas) {

    //Península
    var pen_c={"coordinates":[[[-823186.0585837469,4459216.979668514],[-829793.019675967,4475940.849933196],[-837501.1409502239,4509801.5255308235],[-840254.0414053155,4518886.097032626],[-825113.0889023112,4550819.74231169],[-814652.0671729626,4560454.893904512],[-808870.97621727,4581376.937363208],[-794831.1838963022,4584955.707954828],[-786572.4825310272,4590186.218819502],[-780791.3915753346,4590461.508865011],[-778589.0712112611,4602574.270867415],[-791252.4133046829,4600922.53059436],[-820433.1581286552,4643317.197602772],[-811348.5866268525,4668093.301698598],[-810247.4264448158,4685711.864611184],[-789050.0929406097,4702504.557387244],[-780516.1015298252,4720673.700390849],[-778038.4911202427,4727555.951528579],[-783269.001984917,4735264.072802835],[-794555.893850793,4732235.882302235],[-800612.2748519949,4738842.843394455],[-797584.0843513937,4742559.259008829],[-811073.2965813432,4750817.960374104],[-809146.2662627791,4761003.692057943],[-819331.9979466186,4772290.5839238195],[-815202.6472639809,4784953.926017241],[-834197.6604041139,4799819.588474737],[-843282.2319059165,4820053.40681966],[-825388.3789478202,4819227.536683133],[-816303.8074460176,4816749.926273551],[-806118.0757621782,4821154.567001698],[-793179.4436232471,4819778.116774151],[-782443.1318483895,4820053.40681966],[-779414.9413477887,4833542.61904961],[-778589.0712112611,4843177.7706424305],[-766476.3092088576,4867540.939669993],[-785471.3223489902,4887912.403037671],[-780791.3915753346,4904980.38585924],[-767026.8892998758,4906081.546041276],[-758768.1879346007,4918331.953066435],[-765650.43907233,4934298.775705967],[-761245.7983441832,4943108.057162261],[-765650.43907233,4952743.2087550815],[-760144.6381621467,4965957.130939522],[-762622.248571729,4991146.1701036105],[-774184.4304831143,5014821.1140174],[-770605.6598914951,5022116.300223392],[-761521.0883896924,5019088.109722792],[-756565.8675705274,5027622.101133576],[-744177.8155226146,5051847.625138383],[-729587.4431106285,5053774.655456947],[-709491.269788459,5074421.408870135],[-696896.7502064144,5093003.486942004],[-692216.8194327584,5098509.287852188],[-702127.2610710886,5108695.019536027],[-715341.1832555288,5110897.339900101],[-725251.624893859,5106767.989217463],[-735987.9366687167,5121083.07158394],[-729931.5556675149,5140078.084724072],[-734060.9063501526,5143656.855315692],[-732133.8760315883,5151089.68654444],[-751404.1792172303,5149162.656225875],[-786641.3050424043,5151640.266635458],[-795175.2964531886,5153154.361885758],[-798754.0670448081,5140766.309837846],[-816647.9200029039,5133608.768654607],[-832890.0326879452,5131681.738336043],[-833165.3227334544,5135535.798973171],[-849682.7254640047,5133333.478609098],[-852160.3358735872,5139665.149655809],[-864823.6779670093,5140766.309837846],[-877418.1975490537,5134434.638791135],[-886778.0590963657,5136361.669109699],[-900817.8514173334,5128102.967744424],[-914031.7736017738,5135811.08901868],[-918436.4143299202,5149300.30124863],[-904396.6220089525,5164716.543797144],[-915132.9337838104,5172149.375025892],[-918711.7043754295,5177104.595845057],[-944038.3885622734,5165542.413933671],[-956908.1981898271,5164441.253751635],[-969020.9601922306,5152053.201703722],[-986088.9430137994,5138839.279519281],[-996825.2547886571,5147373.270930066],[-998476.9950617121,5182059.816664222],[-1025180.1294761018,5271942.016522965],[-1049130.3634353997,5324797.705260727],[-978105.5316940334,5380543.939476334],[-944244.8560964053,5371459.367974531],[-893866.7777682269,5441658.32957937],[-836881.7383478284,5434225.498350622],[-781548.4392004848,5406971.783845214],[-678314.6721345454,5407797.6539817415],[-642802.2562638621,5421011.576166182],[-609767.4508027616,5402016.563026049],[-459459.08595475386,5382195.679749389],[-401648.1763978276,5396235.472070357],[-339707.91615826404,5378892.199203279],[-301924.3574121302,5389628.510978136],[-259804.980449227,5370633.497838004],[-198690.59034619085,5375588.718657169],[-192703.0318563662,5364852.406882311],[-179695.5772060578,5360516.588665542],[-175566.22652342022,5357832.510721827],[-157603.55105394678,5357419.575653563],[-148725.44708627596,5347715.601549366],[-153887.13543957294,5332024.068955342],[-139640.8755844733,5331817.601421211],[-139847.34311860517,5324797.705260727],[-131588.64175333,5321287.757180485],[-94011.55054132808,5306009.159654725],[-82449.36862994285,5310344.977871495],[-76048.87507185462,5300228.068699033],[-60976.74508022744,5282884.795831955],[-53956.848919743585,5288665.886787648],[-46730.485225127806,5283091.263366087],[-35581.238382006355,5289904.691992439],[-27374.15390026418,5288252.951719385],[-11476.153772109508,5278136.042546922],[-2391.582270306855,5266986.7957038],[22797.456893782364,5273800.224330152],[33740.23620277195,5268432.068442724],[43650.67784110212,5274006.691864285],[53767.58701356419,5267606.198306196],[72556.13261956513,5267606.1983061945],[70078.52220998259,5277103.704876261],[72349.66508543325,5290524.0945948325],[79163.09371178526,5293001.7050044155],[88660.60028185169,5288252.951719382],[92996.41849862115,5288872.354321778],[104352.13287587448,5282265.393229558],[108481.48355851206,5284123.601036745],[127063.56163038115,5277516.6399445245],[129954.10710822746,5270496.743784041],[138212.80847350264,5271529.0814547],[144613.30203159084,5270909.678852305],[150807.3280555472,5271529.0814547],[156794.88654537173,5265541.522964875],[161130.70476214116,5256044.016394809],[166085.92558130628,5261618.63981637],[177648.1074926915,5259553.9644750515],[193700.95827144507,5237255.470788809],[205469.60771696217,5235397.262981622],[217238.25716247928,5230648.509696588],[225290.4909936225,5217434.587512148],[238504.41317806276,5224660.951206763],[250892.4652259755,5229409.704491797],[268390.5887436523,5223835.081070236],[279126.90051850997,5215576.379704961],[288211.4720203126,5216608.71737562],[294818.4331125328,5215369.912170829],[299154.2513293022,5225280.353809159],[312161.70597961056,5227345.029150478],[318975.13460596255,5234984.327913358],[335440.9204529799,5234364.925310962],[344319.0244206507,5228790.301889401],[356294.1414002997,5226312.691479819],[376269.87532755896,5213511.704363642],[370075.8493036026,5194929.626291773],[358720.1349263493,5187083.859994761],[363055.9531431187,5172631.132605529],[366152.9661550969,5143932.145361198],[328782.3424772268,5114200.820446207],[254505.64707328338,5076004.326631809],[244595.2054349532,5055770.508286885],[210115.12723492942,5043382.456238972],[123037.4447148096,5008695.910504816],[92480.2496632915,4985571.546682046],[110649.39266689686,4966576.533541913],[63574.7948848285,4926108.896852065],[43753.9116081681,4892248.221254436],[-9721.17973198858,4822462.194717862],[-23760.972052956346,4778691.077481903],[-636.6082301859278,4717576.687378867],[43960.379142299935,4688671.232600404],[24965.366002167048,4660178.712890205],[-27064.452599066426,4625492.167156049],[-68357.95942544221,4551163.854868572],[-60925.12819669454,4514825.568861362],[-118116.63515122498,4508631.542837406],[-153629.05102190812,4495830.555721229],[-190793.20716564634,4464860.425601447],[-210201.15537404292,4411178.866727158],[-241584.22056208854,4385163.957426542],[-262230.97397527646,4401268.425088828],[-286594.14300283813,4389706.243177444],[-336146.35119448905,4386402.762631333],[-357618.97474420443,4393835.5938600805],[-480570.39131973835,4391357.983450498],[-494610.1836407061,4371950.035242102],[-537142.4956718732,4355432.6325115515],[-563157.4049724899,4351303.281828914],[-598153.6520078434,4297828.190488758],[-636143.6782881091,4289156.554055219],[-670830.2240222648,4313932.658151044],[-706342.639892948,4358529.6455235295],[-725337.6530330807,4386609.230165465],[-736796.6011774001,4427076.866855313],[-789239.3548468972,4458046.996975095],[-823186.0585837469,4459216.979668514]]],"type":"Polygon"};
    var pen_shp = new ol.geom.Polygon(pen_c.coordinates);
    //Palma
    var pal_c={"coordinates":[[[128715.30190343634,4722738.375732164],[133670.52272260142,4693832.920953701],[151839.66572620676,4662036.920697392],[179919.2503681423,4663275.725902183],[176615.76982203225,4700439.882045921],[189003.821869945,4736365.232984868],[265809.7445670039,4778071.674879508],[306690.3163251159,4767335.36310465],[356655.45958503056,4746275.674623199],[378128.0831347459,4776419.9346064525],[400426.5768209889,4825146.272661576],[385147.9792952299,4838360.194846016],[419834.5250293856,4851987.05209872],[451217.5902174311,4844141.285801709],[485904.1359515867,4828036.818139423],[488794.681429433,4858594.01319094],[457824.55130965123,4885434.792628084],[421486.2653024406,4880479.571808919],[419421.58996112173,4860245.753463996],[381431.563680856,4843315.415665181],[354590.78424371185,4866852.714556215],[293889.32920893945,4844554.220869972],[255899.30292867371,4810693.545272345],[254247.56265561868,4792111.467200476],[252182.88731429988,4777245.80474298],[184874.47118730738,4739668.713530978],[168770.00352502085,4743385.129145352],[141929.22408787656,4734300.5576435495],[128715.30190343634,4722738.375732164]]],"type":"Polygon"};
    var pal_shp = new ol.geom.Polygon(pal_c.coordinates);
    //Ceuta
    var ceu_c={"coordinates":[[[-599198.8938993918,4288627.480999011],[-598656.9166222956,4287569.334886584],[-598760.1503893615,4286369.242344443],[-598514.9701925799,4286007.924159712],[-598385.9279837474,4284756.214734038],[-597314.8776504385,4283840.015051328],[-596824.5172568753,4283723.877063379],[-596372.8695259618,4283001.2406939175],[-595495.3825059014,4282975.432252151],[-594772.7461364398,4282678.635171836],[-593069.388979852,4283259.325111582],[-586591.4700964649,4286485.380332393],[-587520.5740000582,4289427.542693771],[-597624.5789516362,4289827.573541152],[-598979.5221443766,4289182.36249699],[-599198.8938993918,4288627.480999011]]],"type":"Polygon"};
    var ceu_shp = new ol.geom.Polygon(ceu_c.coordinates);
    //Melilla
    var mel_c={"coordinates":[[[-328601.6833847815,4207528.754154796],[-329599.6097997521,4206960.968435934],[-330545.91933118977,4204466.152398507],[-330717.97560963297,4203175.730310183],[-330167.3955186147,4203020.879659584],[-330477.0968198125,4202607.94459132],[-330528.71370334545,4201850.8969661705],[-329513.58166053053,4201334.728130841],[-328670.5058961588,4200474.446738625],[-328412.421478494,4199889.455391917],[-326863.9149725052,4200199.156693116],[-325711.1379069357,4200956.204318265],[-324661.59460843215,4202986.468403895],[-328154.3370608292,4207666.39917755],[-328601.6833847815,4207528.754154796]]],"type":"Polygon"};
    var mel_shp = new ol.geom.Polygon(mel_c.coordinates);
    //Canarias
    var can_c={"coordinates":[[[-1996738.919775189,3306452.818319888],[-2014082.1926422638,3354146.818704345],[-1984350.867727278,3368393.0785594424],[-1954000.1402098965,3331848.3250181056],[-1908783.7502350225,3289728.9480552087],[-1854276.321224215,3315743.857355821],[-1785522.6323583103,3331848.3250181056],[-1727298.7877331295,3276721.4934049025],[-1597843.6438324624,3281676.714224067],[-1529709.3575689532,3414848.273739108],[-1493784.0066300118,3441482.5856421157],[-1469007.9025341906,3399363.208679219],[-1534664.5783881175,3284773.727236044],[-1588552.6047965293,3243273.752875543],[-1636866.0077833813,3266811.051766574],[-1693231.6446013749,3268669.2595737604],[-1706858.501854077,3221594.6617916995],[-1756410.71004572,3205490.194129416],[-1775612.1907199817,3246370.7658875217],[-1748977.8788169737,3282915.519428858],[-1783045.021948728,3312027.4417414484],[-1810918.1390565275,3270527.4673809474],[-1860470.3472481703,3225930.4800084685],[-1914358.3736565823,3239557.33726117],[-1935418.0621380303,3251325.986706686],[-1978776.2443057185,3223452.869598887],[-2001074.7379919577,3193102.142081505],[-2035761.2837261078,3203631.9863222293],[-2028328.4524973612,3230266.298225237],[-1988067.2833416515,3234602.116442006],[-1942231.4907643811,3262475.2335498054],[-1928604.63351168,3289109.545452813],[-1960813.5688362473,3325654.29899415],[-1971962.8156793672,3301497.5975007243],[-1989925.4911488378,3296542.3766815597],[-1996738.919775189,3306452.818319888]]],"type":"Polygon"};
    var can_shp =  new ol.geom.Polygon(can_c.coordinates);

    //Comprueba la intersección con cada zona
    if(pen_shp.intersectsCoordinate(coordenadas)){return true;}
    else if(pal_shp.intersectsCoordinate(coordenadas)){return true;}
    else if(ceu_shp.intersectsCoordinate(coordenadas)){return true;}
    else if(mel_shp.intersectsCoordinate(coordenadas)){return true;}
    else if(can_shp.intersectsCoordinate(coordenadas)){return true;}

    return false;
}


/**
 * Recoge los datos de la variable general, recalcula y
 * refresca los datos del informe
 */
function actDatosInforme(){

    /*Testigos*/
    var flagBombero=0;
    var flagHospital=0;
    var flagFuente=0;
    var flagClima=0;
    var flagTerreno=0;
    var flagBio=0;

    /*Valoracion area de fuego*/
    if (DATOS_INFORME['fu_coor']){
        $("#fu_puntos").html(DATOS_INFORME['fu_puntos']);
        $("#fu_brillo").html(DATOS_INFORME['fu_brillo']);
        $("#fu_area").html(DATOS_INFORME['fu_area']);
    }else{
        $("#fu_puntos").html("---");
        $("#fu_brillo").html("---");
        $("#fu_area").html("---");
    }

    /*Datos de parque de bomberos*/
    if ( DATOS_INFORME['pb_coor']){
        $("#pb_dist").html(DATOS_INFORME['pb_dist']);
        $("#pb_name").html(DATOS_INFORME['pb_name']);
        $("#pb_addr").html(DATOS_INFORME['pb_addr']);
        $("#pb_city").html(DATOS_INFORME['pb_city']);
        $("#pb_prov").html(DATOS_INFORME['pb_prov']);
        $("#pb_tel").html(DATOS_INFORME['pb_tel']);
        $("#pb_email").html(DATOS_INFORME['pb_email']);
        flagBombero++;
    }else{
        $("#pb_dist").html("---");
        $("#pb_name").html("---");
        $("#pb_addr").html("---");
        $("#pb_city").html("---");
        $("#pb_prov").html("---");
        $("#pb_tel").html("---");
        $("#pb_email").html("---");
    }

    /*Datos de parque de hospitales*/
    if ( DATOS_INFORME['ho_coor']){
        $("#ho_dist").html(DATOS_INFORME['ho_dist']);
        $("#ho_name").html(DATOS_INFORME['ho_name']);
        $("#ho_addr").html(DATOS_INFORME['ho_addr']);
        $("#ho_city").html(DATOS_INFORME['ho_city']);
        $("#ho_prov").html(DATOS_INFORME['ho_prov']);
        $("#pb_tipo").html(DATOS_INFORME['pb_tipo']);
        flagHospital++;
    }else{
        $("#ho_dist").html("---");
        $("#ho_name").html("---");
        $("#ho_addr").html("---");
        $("#ho_city").html("---");
        $("#ho_prov").html("---");
        $("#pb_tipo").html("---");
    }

    /*Datos de fuente de agua cercana*/
    if ( DATOS_INFORME['fa_coor']){
        $("#fa_dist").html(DATOS_INFORME['fa_dist']);
        $("#fa_tipo").html(DATOS_INFORME['fa_tipo']);
        $("#fa_elev").html(DATOS_INFORME['fa_elev']);
        $("#fa_sup").html(DATOS_INFORME['fa_sup']);
        flagFuente++;
    }else{
        $("#fa_dist").html("---");
        $("#fa_tipo").html("---");
        $("#fa_elev").html("---");
        $("#fa_sup").html("---");
    }

    /*Datos de corine del tipo de suelo*/
    if (DATOS_INFORME['bi_tipo']){
        $("#bi_tipo").html(DATOS_INFORME['bi_tipo']);
        flagBio++;
    }else{
        $("#bi_tipo").html("---");
    }

    /*Datos de freq de incendios*/
    if (DATOS_INFORME['te_flag']){
        $("#te_comu").html(DATOS_INFORME['te_comu']);
        $("#te_muni").html(DATOS_INFORME['te_muni']);
        $("#te_prov").html(DATOS_INFORME['te_prov']);
        $("#te_incen").html(DATOS_INFORME['te_incen']);
        $("#te_freq").html(DATOS_INFORME['te_freq']);
        flagTerreno++;
    }else{
        $("#te_comu").html("---");
        $("#te_muni").html("---");
        $("#te_prov").html("---");
        $("#te_incen").html("---");
        $("#te_freq").html("---");
    }

    /*Datos de precipitaciones*/
    if (DATOS_INFORME['cl_precip']){
        $("#cl_precip").html(DATOS_INFORME['cl_precip']);
        flagClima++;
    }else{
        $("#cl_precip").html("---");
    }

    /*Datos del viento*/
    if (DATOS_INFORME['cl_vient']){
        $("#cl_vient").html(DATOS_INFORME['cl_vient']);
        flagClima++;
    }else{
        $("#cl_vient").html("---");
    }

    /*Datos de la temperatura*/
    if (DATOS_INFORME['cl_temp']){
        $("#cl_temp").html(DATOS_INFORME['cl_temp']);
        flagClima++;
    }else{
        $("#cl_temp").html("---");
    }

    /*Datos de la humeadad*/
    if (DATOS_INFORME['cl_humed']){
        $("#cl_humed").html(DATOS_INFORME['cl_humed']);
        flagClima++;
    }else{
        $("#cl_humed").html("---");
    }

    /*Datos de montes*/
    if (DATOS_INFORME['bi_comb']){
        $("#bi_bosque").html(DATOS_INFORME['bi_bosque']);
        $("#bi_cubiert").html(DATOS_INFORME['bi_cubiert']);
        $("#bi_eprin").html(DATOS_INFORME['bi_eprin']);
        $("#bi_eprinarea").html(DATOS_INFORME['bi_eprinarea']);
        $("#bi_esec").html(DATOS_INFORME['bi_esec']);
        $("#bi_esecarea").html(DATOS_INFORME['bi_esecarea']);
        $("#bi_eter").html(DATOS_INFORME['bi_eter']);
        $("#bi_eterarea").html(DATOS_INFORME['bi_eterarea']);
        $("#bi_farbo").html(DATOS_INFORME['bi_farbo']);
        $("#bi_farbu").html(DATOS_INFORME['bi_farbu']);
        $("#bi_fherb").html(DATOS_INFORME['bi_fherb']);
        $("#bi_comb").html(DATOS_INFORME['bi_comb']);
        flagBio++;
    }else{
        $("#bi_bosque").html("---");
        $("#bi_cubiert").html("---");
        $("#bi_eprin").html("---");
        $("#bi_eprinarea").html("---");
        $("#bi_esec").html("---");
        $("#bi_esecarea").html("---");
        $("#bi_eter").html("---");
        $("#bi_eterarea").html("---");
        $("#bi_farbo").html("---");
        $("#bi_farbu").html("---");
        $("#bi_fherb").html("---");
        $("#bi_comb").html("---");
    }

    /*Fuentes de datos*/
    $("#gen_fuentes").html(DATOS_INFORME['gen_fuentes']);

    /*Estación*/
    $("#cl_esta").html(DATOS_INFORME['cl_esta']);
    
    /*Peligrosidad Calculada cada vez*/
    var peligrosidad=calcularPeligrosidad();
    $("#gen_peligro").html(peligrosidad);
    gauge.setValue(peligrosidad);


    /*Parar las cargas*/
    if(DATOS_INFORME['gen_fuentes']==11){$("#loader_rg").hide();}
    if(flagClima==4){$("#loader_cl").hide();}
    if(flagTerreno==1){$("#loader_te").hide();}
    if(flagBio==2){$("#loader_bi").hide();}
    if(flagBombero==1){$("#loader_pb").hide();}
    if(flagHospital==1){$("#loader_ho").hide();}
    if(flagFuente==1){$("#loader_fa").hide();}


    /*Zoom del mapa*/
    if(DATOS_INFORME['gen_coor']){
        var nn = 1;
        var coor2 = Object.create(DATOS_INFORME['gen_coor']);
        //Para parques de bomberos
        if(DATOS_INFORME['pb_coor']){
            coor2[0]+=DATOS_INFORME['pb_coor'][0]
            coor2[1]+=DATOS_INFORME['pb_coor'][1]
            nn++;
        }
        //Para hospitales
        if(DATOS_INFORME['ho_coor']){
            coor2[0]+=DATOS_INFORME['ho_coor'][0]
            coor2[1]+=DATOS_INFORME['ho_coor'][1]
            nn++;
        }
        //Para hospitales
        if(DATOS_INFORME['fa_coor']){
            coor2[0]+=parseInt(DATOS_INFORME['fa_coor'][0])
            coor2[1]+=parseInt(DATOS_INFORME['fa_coor'][1])
            nn++;
        }
        //La media del punto
        coor2[0]=coor2[0]/nn;
        coor2[1]=coor2[1]/nn;
        var zoom=11
        fly_to2(map,coor2,zoom);
    }

}


/**
 * Función para calcular el grado de peligrosidad con los datos de los que se dispone
*/
function calcularPeligrosidad() {
    var peligro = 0;

    //Parametros del fuego en si mismo
    if(DATOS_INFORME['fu_coor']){
        peligro += parseInt(DATOS_INFORME['fu_area'])*25;
        peligro += parseInt(DATOS_INFORME['fu_brillo'])*0.03;
    }

    //Parametros de tipo de suelo
    if(DATOS_INFORME['bi_tipo']){
        //Superficie arbolada
        if (DATOS_INFORME['bi_farbo'] && DATOS_INFORME['bi_farbo'] != "Null"){
            peligro += parseInt(DATOS_INFORME['bi_farbo'])*0.5;
        }
        //Superficie con arbustos
        if (DATOS_INFORME['bi_farbu'] && DATOS_INFORME['bi_farbu'] != "Null"){
            peligro += parseInt(DATOS_INFORME['bi_farbu'])*0.2;
        }
        //Superficie con hierbas
        if (DATOS_INFORME['bi_fherb'] && DATOS_INFORME['bi_fherb'] != "Null"){
            peligro += parseInt(DATOS_INFORME['bi_fherb'])*0.1;
        }
    }

    //Parametros de freq de incendios
    if(DATOS_INFORME['te_flag']){
        if (parseInt(DATOS_INFORME['te_freq']) > 100){
            peligro += (parseInt(DATOS_INFORME['te_freq'])/100)*10;
        }
    }

    //Parametro precipitaciones
    if(DATOS_INFORME['cl_precip']){
        peligro -= (parseInt(DATOS_INFORME['cl_precip']))*0.5;
    }

    //Parametro viento
    if(DATOS_INFORME['cl_vient']){
        peligro += (parseInt(DATOS_INFORME['cl_vient']))*0.5;
    }

    //Parametro temperatura
    if(DATOS_INFORME['cl_temp']){
        peligro += (parseInt(DATOS_INFORME['cl_temp']))*0.2;
    }

    //Parametro precipitaciones
    if(DATOS_INFORME['cl_humed']){
        peligro -= (parseInt(DATOS_INFORME['cl_humed']))*0.2;
    }

    //Limites en la salida
    if (peligro > 100){
        return 100;
    }else if(peligro <= 0){
        return 0;
    }else{
        return Math.round(peligro);
    }

}


/**
 * Función de análisis
 * Modo 0: Seleccionando uno de los fuegos existentes
 * Modo 1: Pulsando sobre una zona con el marker
 */
function analizar(objeto,modo) {

    //Si no hay fuego incial no tenemos este dato
    if(modo == 0){
        getAreaFuego(objeto);
        var coor = objeto.getGeometry().flatCoordinates;
    }else{
        DATOS_INFORME['gen_fuentes']+=1;
        var coor = objeto;
    }

    DATOS_INFORME['gen_coor']=coor;
    
    getBomberos(coor);
    getHospital(coor);
    getFuente(coor);
    getCorineSuelo(coor);
    getPrecipitaciones(coor);
    getViento(coor);
    getTemperatura(coor);
    getHumeadad(coor);
    getTipoSuelo(coor);
    getFrecuenciaIncendio(coor);
    getEstacion()

    var zoom=14
    fly_to2(map,coor,zoom);

    /*Interfaz*/
    $("#borrarInforme").fadeIn(2000);
    $("#analisisPunto").animate({"background-color": "#121212"}, 500).blur();
    $("#BotonInforme").animate({"background-color": "#22d1c9"}, 1000).delay(2000);
    $('#BotonInforme').attr("href", "#informe");
    select_mode=false;
    inform_gen = true;
}


/**
 * Función para borrar el análisis 
 */
 function borrarAnalisis(){
    aplicarEstiloFuegos();
    resultSource.clear();
    markerFeature.setGeometry(null);
    $('#BotonInforme').attr("href", "");
    $("#BotonInforme").animate({"background-color": "#121212"}, 500).blur();
    /*Sevuelven a mostrar */
    $("#loader_rg").show();
    $("#loader_ho").show();
    $("#loader_pb").show();
    $("#loader_fa").show();
    $("#loader_te").show();
    $("#loader_bi").show();
    $("#loader_cl").show();
    /*Borra los datos del informe*/
    DATOS_INFORME={'gen_fuentes':0}
    actDatosInforme()
    inform_gen = false;
 }




/*
 * Función que guarda la estación del año en la que estamos
 */
function getEstacion() {
    var mes = new Date().getMonth()*100;
    var dia = new Date().getDate();
    var aux = mes+dia;
    var estacion = "";
    if (aux < 221){
        estacion="Invierno";
    }else if (aux >= 221 && aux < 521){
        estacion="Primavera";
    }else if(aux >= 521 && aux < 821){
        estacion="Verano";
    }else{
        estacion="Otoño";
    }
    DATOS_INFORME['cl_esta']=estacion;
}


function initmap() {
  
  openStreetMapGeocoder = GeocoderJS.createGeocoder('openstreetmap');

    /*-------------------------------Estilos-----------------------------------*/

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

    //Estilo para la posición de la geolocalización
    var positionFeatureStyle = new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            opacity: 1,
            scale: 0.08,
            zIndex: 100,
            src: 'pix/location.png'
        })
    });

    //Estilo para el radio de precisión
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

    //Estilo del marcador
    var markerFeatureStyle = new ol.style.Style({
        image: new ol.style.Icon({
            anchor: [0.5, 1],
            opacity: 1,
            scale: 0.04,
            zIndex: 100,
            src: 'pix/firemarker.png'
        })
    });

    /*-------------------------------Capas-----------------------------------*/
    var layers = [];
    var geoJSONFormat = new ol.format.GeoJSON();
    sourceLayer = new ol.source.Vector({
        projection: 'EPSG:3857'
    });

    //Capa sobre la que se selecciona
    var vectorCustomLayer = new ol.layer.Vector({
        id: "CapaSelect",
        source: sourceLayer,
        style: style_function
        /*updateWhileAnimating: true,
         updateWhileInteracting: true*/
    });

    //Capa de vista por satélite
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
    aeriallayer.set("name", "Vista de Satélite");

    //Capa de vista de mapa de carreteras Open Street Map
    var roadlayer = new ol.layer.Tile({
        source: new ol.source.OSM()
    });
    roadlayer.set("name", "Vista de Carreteras");

    //Grupo de capas
    var layergroup = new ol.layer.Group({ layers: [aeriallayer, roadlayer] });
    

    //Modo de vista inicial
    var view = new ol.View({
        center: [-474521.071594, 4940889.508354],
        zoom: 6,
        minZoom: 2
    });

    //Seleccionar un elemento
    select = new ol.interaction.Select({
        layers: [fuegosLayer],
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
    
    var accuracyFeature = new ol.Feature();
    accuracyFeature.setStyle(accuracyFeatureStyle);

    var positionFeature = new ol.Feature();
    positionFeature.setStyle(positionFeatureStyle);

    var userPosition = new ol.layer.Vector({
        id: "posicionUsuario",
        source: new ol.source.Vector({
            features: [accuracyFeature, positionFeature]
        })
    });

    markerFeature = new ol.Feature();
    markerFeature.setGeometry(null);
    markerFeature.setStyle(markerFeatureStyle);
    var markerVector = new ol.layer.Vector({
        id: "marcadorUsuario",
        source: new ol.source.Vector({
            features: [markerFeature]
        })
    });


    festiloselected = new ol.style.Style({
                            image: new ol.style.Icon({
                                anchor: [0.5, 1],
                                opacity: 1,
                                scale: 0.04,
                                zIndex: 100,
                                src: 'pix/firemarker.png'
                            })                               
                        })

    /*Capa vectorial para los fuegos*/
    fuegosSource = new ol.source.Vector({
                        projection: 'EPSG:3857'
                 });
    var fuegosLayer = new ol.layer.Vector({
        id: "fuegosNASA",
        visible: true,
        source: fuegosSource,
        style: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                opacity: 1,
                scale: 0.08,
                src: 'pix/fuego1.png'
            })                               
        })
    });


    /*Capa vectorial para los resultados*/
    resultSource = new ol.source.Vector({
                        projection: 'EPSG:3857'
                 });
    var resultLayer = new ol.layer.Vector({
        id: "Resultados",
        visible: true,
        source: resultSource
    });


    layers = [layergroup, userPosition, markerVector, resultLayer, fuegosLayer];

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
    

    /**
     * Función al seleccionar
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

    //Función para hacer click en el mapa
    map.on('click', function (evt) {
        if(!filtroSpain(map.getEventCoordinate(evt.originalEvent))){
            toast("Solo funcional en territorio español",1);
            return;
        };
        var hasFeature = false;
        map.forEachFeatureAtPixel(map.getEventPixel(evt.originalEvent), function (feature, layer) {
            if (feature.get('stageposition') === 0) {
                return false;
            }
            //Editar las acciones desde aqui
            if (!select_mode && layer.get("id") == "fuegosNASA"){
                if(inform_gen){
                    toast("Existe ya un informe ya creado",1);
                    return
                }
                aplicarEstiloFuegos();
                feature.setStyle(festiloselected);
                hasFeature = true;
                analizar(feature,0);
            }
        });
        if (!hasFeature && select_mode) {
            var coordinates = map.getEventCoordinate(evt.originalEvent);
            markerFeature.setGeometry(coordinates ?
                new ol.geom.Point(coordinates) : null);
            if(coordinates){
                 markerFeature.setGeometry(new ol.geom.Point(coordinates));
                 analizar(coordinates,1);
            }else{
                 markerFeature.setGeometry(null);
            }
        }
    });


    /**
     * Cambiar estilos con la variación del zoom
     */
    map.getView().on('change:resolution', function(e) {
      var fuente = resultSource.getFeatureById('fuente');
      if (map.getView().getZoom() < 14) {
        //Vista estándar
        //Para la fuente de agua
        if(fuente){
            var iconStyle = new ol.style.Style({
                geometry: function(feature) {
                  let geometry = feature.getGeometry();
                  let geometryType = geometry.getType();
                  return (
                      geometryType == 'Polygon' ? geometry.getInteriorPoint() :
                      geometryType == 'MultiPolygon' ? geometry.getInteriorPoints() :
                      geometry
                  );
                },
                image: new ol.style.Icon({
                    anchor: [0.5, 1],
                    opacity: 1,
                    scale: 0.07,
                    zIndex: 100,
                    src: 'pix/helicoptero.png',
                }),
              });
            fuente.setStyle(iconStyle);
        }
      } else {
        //Vista con zoom
        if(fuente){
            var estilo_fuente = new ol.style.Style({
                  fill: new ol.style.Fill({
                      color: '#0000FF'
                  }),
                  stroke: new ol.style.Stroke({
                      color: '#0000FF',
                      width: 1,
                  }),
                  zIndex: 100
              })
            fuente.setStyle(estilo_fuente);
        }
      }
    });



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
    
    $.mobile.loading("show");
    geolocation.setProperties({ center: center, validate_location: validate });
    var position= geolocation.getPosition();
    $.mobile.loading("hide");
    fly_to(map, position);
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
            zoom: 14,
            center: point,
            duration: duration
        });
    }
}

/*Función personalzada de vuelo*/
function fly_to2(map, point, zoom=14) {
    var duration = 700;
    var view = map.getView();
        view.animate({
            zoom: zoom,
            center: point,
            duration: duration
        });
}


/*Volver a la posición general con una transición*/
function fly_back() {
    var duration = 700;
    var view = map.getView();
        view.animate({
            zoom: 6,
            center: [-474521.071594, 4940889.508354],
            duration: duration
        });
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


