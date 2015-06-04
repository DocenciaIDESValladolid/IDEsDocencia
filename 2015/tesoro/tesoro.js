/**
 * @type String|newstate
 */
var state='welcoming';// authenticated,createScenario,creatingScenario,createRiddle,running
var scenario_under_creation=null;
var path_under_creation=null;
var scenario_running='';
var last_created_riddle=null;

/**
 * States of the application:
 * welcoming a guest user is visiting the app
 * authenticated  a user has been autenticated by facebook
 * creatingScenario  the user is entering the data for a new scenario
 * startCreatingRiddle  the user is entering the edition process
 * createRiddle   the iterative process of digitizing a riddle after riddle
 * running  the user is playing an scenario
 * 
 * @param {String} newstate
 * @returns {undefined}
 */
function setState(newstate)
{  
    state=newstate;
    updateUI();
}

function updateUI()
{
switch (state)
{
    case 'welcoming':
        disable_edit_polygons();
        $("#validarUbicacion").hide();
        $("#infoValidar").hide();
        $("#nuevoescenario_button").hide();
        $("#welcomingInfo").show();
        $("#createRiddleInfo").hide();
        $("#infopanel").panel('open');
        break;
    case 'authenticated':
        disable_edit_polygons();
        $("#welcomingInfo").show();
        $("#createRiddleInfo").hide();
        $("#infoValidar").hide();
        $("#validarUbicacion").hide();
        $("#nuevoescenario_button").show();
        break;
    case 'createScenario':
        $("#welcomingInfo").show();
        $("#createRiddleInfo").hide();
        $("#infoValidar").hide();
        $("#nuevoescenario_button").show();
        $("#validarUbicacion").hide();
        $("#infoValidar").hide();
        break;
    case 'creatingScenario':
        $("#validarUbicacion").hide();
        $("#infoCreatingScenarioPanel").panel('open');
        break;
    case 'startCreatingRiddle':
        addEditingRiddlesWMS(fb.user.id,path_under_creation);
        $("#welcomingInfo").hide();
        $("#createRiddleInfo").show();
        $("#riddle_iduser").val(fb.user.id);
        $("#riddle_stage").val(scenario_under_creation);
        $("#riddle_path").val(path_under_creation);
        setTimeout(function(){$("#infopanel").panel('open');},1500);
        state = 'createRiddle';//continue to next actions common to createRiddle
        
    case 'createRiddle':
        // refresh WMS layers
        refresh_WMS_layer("Tesoro:Editable");//"EditingRiddlesWMS"); // nombre ficticio
        refresh_WMS_layer("Pistas nuevo escenario");
//        $.mobile.back();
        enable_edit_polygons(function(event)
        {
            var geom= event.feature.geometry;
            $("#riddle_geom").val(geom.toString());
            $.mobile.changePage("#addRiddlePage");
            emptyPolygonLayer();
        });
        $("#validarUbicacion").hide();
        $("#infoValidar").hide();
        break;
    case 'running':
        disable_edit_polygons();
        $("#validarUbicacion").show();
        $("#infoValidar").show();
        // $("#validarUbicacion").button('enable');
        break;
    }
	
    $("#mappage").trigger( "updatelayout" );
}
function initTesoro(){
    $("#nuevoescenario_button").bind("click",nuevoescenario_button_action);
    $("#endScenarioButton").bind("click",end_scenario_button_action);

    enableForm('#createScenarioForm', 
        function(result){
            if(result.status!="success")
            {
                toast(result.msg);
            }
            else{
                toast(result.msg);
                scenario_under_creation=result.idStage;
                path_under_creation=result.idPath;
                $("#createScenarioForm")[0].reset();
                $("#create_scenario_panel").panel('close');
                setState('startCreatingRiddle');
            }
        },
        function(error){
             toast('Network error has occurred please try again! Error: '+error);
        });
		
	enableForm('#createQuestionForm', 
        function(result){
            if(result.status!="success")
            {
                toast(result.msg);
            }
            else{
                last_created_riddle=result.numRiddle;
                toast(result.msg);
                $.mobile.back();
                $("#createQuestionForm")[0].reset();
                refresh_WMS_layer("Pistas nuevo escenario");
                setState('createRiddle');
            }
        },
        function(error){
             toast('Network error has occurred please try again! Error: '+error);
        });
}

function end_scenario_button_action(event,ui){
   		
        if (state==="createRiddle")
        { 
           eliminarcapa('Pistas nuevo escenario');
           if  (last_created_riddle==null){
               if (confirm("¿Deseas cancelar este escenario? No tiene ninguna pista."))
               {
                   $.ajax("services/deleteScenario.php?id="+scenario_under_creation)
                           .done(function(data){
                               toast("Escenario cancelado.");
                               scenario_under_creation=null;
							   setState("authenticated");
                           })
                           .fail(function(data){
                               toast("No se ha podido cancelar el escenario. Inténtelo de nuevo más tarde");
                           });
               }else{
               scenario_under_creation=null;
               toast("Escenario creado sin ninguna pista");
			   setState("authenticated");
                }
           }else{
           scenario_under_creation=null;
		   last_created_riddle=null;
           toast("Escenario listo para jugar.");
		   setState("authenticated");
            }
        }else{
            toast("Inicia antes la creación de un escenario y añade algunas pistas");
        }
    }

function nuevoescenario_button_action(event,ui){
        /*setState('createScenario');*/
		
        if (state==="authenticated")
        {
            $("#scenario_iduser").val(fb.user.id);
            $("#create_scenario_panel").panel('open');
        }
    }

function facebook_logout(response){
	window.location.href = 'index.html';
	// setState('welcoming');
}

function enableForm(id_form, onsuccess, onfailure){ 
    $(id_form).submit(function (submitevent){ // catch the form's submit event
        submitevent.preventDefault();
        var $form = $(this);
        var terms = {};
        var $inputs =$form.find("input");
        $inputs.each(function(){
            terms[this.name]=$(this).val();
        });
        terms = $form.serialize();
            url = $form.attr("action");
      
            // Send data to server through the Ajax call
            // action is functionality we want to call and outputJSON is our data
             $.ajax({url: url,
                        data: terms,
                        type: 'post',                   
                        async: 'true',
                        dataType: 'json',
                        beforeSend: function() {
                            // This callback function will trigger before data is sent
                            $.mobile.loading('show'); // This will show ajax spinner
                        },
                        complete: function() {
                            // This callback function will trigger on data sent/received complete
                            $.mobile.loading('hide'); // This will hide ajax spinner
                        },
                        success: function (result) {
                           
                                if (typeof(onsuccess) === "function")
                                {
                                    onsuccess(result);
                                }                         
                        },
                        error: function (request,error) {
                            // This callback function will trigger on unsuccessful action   
                            if (typeof(onfailure) === "function")
                                {
                                    onfailure(error);
                                }  
                           
                        }
                    });                   
                    
            return false; // cancel original event to prevent form submitting
        });    
    
}

function enable_edit_polygons(callback)
{
     var vlayers = map.getLayersByName( "Tesoro:Editable" );
     if (vlayers.length>0)
     {
        var vlayer = vlayers[0];
        vlayer.events.remove('featureadded');
        vlayer.events.on({'featureadded':callback});
        var controls= map.getControlsBy('CLASS_NAME','OpenLayers.Control.DrawFeature');
        controls[0].activate();
     }  
          
}
function disable_edit_polygons()
{
    var vlayers = map.getLayersByName( "Tesoro:Editable" );
     if (vlayers.length>0)
     {
        var vlayer=vlayers[0];
        vlayer.removeAllFeatures();
        vlayer.events.remove('featureadded');
        var controls= map.getControlsBy('CLASS_NAME','OpenLayers.Control.DrawFeature');
        controls[0].deactivate();
    }
}
function emptyPolygonLayer()
{
    var vlayers = map.getLayersByName( "Tesoro:Editable" );
     if (vlayers.length>0)
     {
        var vlayer=vlayers[0];
        vlayer.removeAllFeatures();
     }
}
function addEditingRiddlesWMS(user,path)
{
    var viewparams='param_user:'+user+';param_path:'+path;
    var capa= createriddle_editLayer(viewparams);
    map.addLayer(capa);
    map.updateSize();
}
function eliminarcapa(nombre){
    var layer=map.getLayersByName(nombre);
    if(layer.length >0)
    {
        removeLayerToList(layer[0],nombre);
        map.removeLayer(layer[0]);
        map.updateSize();
        layer[0].destroy();
    }

}
function eliminarfeaturecontrol(){
    var controls = map.getControlsBy('CLASS_NAME', 'OpenLayers.Control.SelectFeature');
    if (controls.length > 0)
    {
        controls.forEach(function (control) {
            control.deactivate();
            control.destroy();
        });
    }
   
}
function refresh_WMS_layer(name){
    var layers=map.getLayersByName(name);
    layers.forEach(function (layer){
        if (layer instanceof OpenLayers.Layer.Vector)
        {
            
        }else
        if (layer instanceof OpenLayers.Layer.WMS){
            layer.redraw(true);
        }
    });
}

function setCookie(cdemo,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cdemo+"="+cvalue+"; "+expires;
}
function getCookie(cdemo) {
	var demo = cdemo + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(demo) == 0) {
			return c.substring(demo.length, c.length);
		}
	}
	return "";
}
function checkCookie() {
	var demo=getCookie("displayDemo");
	if (demo == "false") {
		document.location.href="tesoro.html";
	}
	setCookie("displayDemo", false, 1000);
}

//prueba de conseguir todas las capas del usuario en uso
 function stages(){
 	var url = "services/escenarios_usuarios.php"; // El script a dónde se realizará la petición.
 	var params = {'id' : fb.user.id};
    $.ajax({
           type: "POST",
           url: url,
           data: params, // Adjuntar los campos del formulario enviado.
           beforeSend: function() {
                // This callback function will trigger before data is sent
                $.mobile.loading('show'); // This will show ajax spinner
            },
            complete: function() {
                // This callback function will trigger on data sent/received complete
                $.mobile.loading('hide'); // This will hide ajax spinner
                        },
           success: function(data)
           {
                //Elimino tanto los controles como la capa de escenarios iniciales
                eliminarfeaturecontrol();
                eliminarcapa('Escenarios Iniciales');
                //Los creo pero con los escenarios iniciales no jugados por el usuario
           		var viewparams='param_user:'+fb.user.id; 
                availableStages=createWFSLayer(viewparams);
                addInteractiveWFSLayer(availableStages,onWFSFeatureSelect);
                if (data['status']=='success')
                {  
                    for(i=0;i<Object.keys(data).length-1;i++)
                    {
                        var viewparams='param_user:'+fb.user.id+';param_path:'+data[i]['id_path'];
                        var nombre = data[i]['name'];
                        var wfs2=createWFSviewparamsLayer($.trim(nombre),viewparams);
                        addInteractiveWFSLayer(wfs2,onWFSFeatureSelectProgress);
                    }

                }
                else
                {

                }
                map.updateSize();
           },
           error: function(error)
           {
             toast('Network error has occurred please try again! Error: '+error);
           }, 
           dataType: "json",
         });
 } 
 /**
  * Add a new layer to the map registering with the Selected Control for hovering effect and 
  * feature selected event.
  * @param {OpenLayers.Layer.Vector} layer
  * @param {fuction} callback
  * @returns {undefined}
  */
function addInteractiveWFSLayer(layer, callback) {
    map.addLayer(layer);
    /*FUNCION PARA EL POP-UP DE ESCENARIOS*/
    layer.events.on({
        'featureselected': callback
    });
    var controls = map.getControlsBy('CLASS_NAME', 'OpenLayers.Control.SelectFeature');
    // If the controls are not registered create and initialize them
    if (controls.length == 0) {
        highlightCtrl = new OpenLayers.Control.SelectFeature(layer, {
            hover: true,
            highlightOnly: true,
            renderIntent: "temporary",
        });
        selectCtrl = new OpenLayers.Control.SelectFeature(layer,
                {
                    clickout: true,
                }
        );
        map.addControl(highlightCtrl);
        map.addControl(selectCtrl);
        highlightCtrl.activate();
        selectCtrl.activate();
    } else {
        // if the controls exists reconfigure them to use the new layer
        controls.forEach(function (control) {
            var layers = control.layers;
            if (layers != null) {
                layers.push(layer);
            } else {
                layers = [control.layer, layer];
            }
            control.setLayer(layers);
            control.activate();
        });
    }

}
//función para enviar la localización y las respuestas escogidas por el usuario
function sendLocation (respuesta){
   
    if (!geolocation_position)
    {
        toast('Pulse el botón de geolocalización');
    }
    else{
         var params = {
        'id_user' : fb.user.id, 
        'id_path' : id_path,
        'lat' : geolocation_position.latitude,
        'long' : geolocation_position.longitude,
        //'lat' : 41.6581924, //41.6581924 41.65790924 41.6584924 41.6570124
        //'long' : -4.7158957, //-4.7138957 -4.7148957 -4.7158957
        'resp' : respuesta
         };
        $.ajax({
           type: "POST",
           url: "services/checkRiddle.php",
           data: params, // Adjuntar los campos del formulario enviado.
            beforeSend: function() {
                // This callback function will trigger before data is sent
                $.mobile.loading('show'); // This will show ajax spinner
            },
            complete: function() {
                // This callback function will trigger on data sent/received complete
                $.mobile.loading('hide'); // This will hide ajax spinner
                        },
           success: function(data)
           {
            //Recargo la capa
                var vlayers = map.getLayersByName(name_stage);
                vlayers[0].redraw(true);
                toast(data['msg']);
            //Si necesito realizar las preguntas llamo a la función
            if(data['status']=='challenge')
            {
                $("#question_riddle").text('Pregunta: '+data['question']);
                $("label[for = radio-choice-v-2a]").text(data['answer1']);
                $("label[for = radio-choice-v-2b]").text(data['answer2']);
                $("label[for = radio-choice-v-2c]").text(data['answer3']);
                setTimeout(function(){$.mobile.changePage('#solveRiddlePage');},500);
            }
            if(data['status']=='success_answer')
            {
                $.mobile.back();
            }
           },
           error: function(error)
           {
             toast('Network error has occurred please try again! Error: '+error);
           }, 
           dataType: "json",
         });
    }
}     
//función para determinar la respuesta escogida por el usuario
function answer_question()
{
    //selecciono la respuesta
    var selected = $("#form_answer input[type='radio']:checked");
    sendLocation (selected.val()); //la envío
}
//función para comenzar juego
function startGame (){
   //tengo que comprobar si existe el juego, si ya existe
    if (!geolocation_position)
    {
        toast('Pulse el botón de geolocalización');
    }
    else if(state !="authenticated")
    {
        toast('Debe estar logueado para iniciar un escenario');
    }
    else{
         var params = {
        'id_user' : fb.user.id, 
        'id_path' : id_path,
        'lat' : geolocation_position.latitude,
        'long' : geolocation_position.longitude,
         };
        $.ajax({
           type: "POST",
           url: "services/startScenario.php",
           data: params, // Adjuntar los campos del formulario enviado.
            beforeSend: function() {
                // This callback function will trigger before data is sent
                $.mobile.loading('show'); // This will show ajax spinner
            },
            complete: function() {
                // This callback function will trigger on data sent/received complete
                $.mobile.loading('hide'); // This will hide ajax spinner
                        },
           success: function(data)
           {
                //Muestro el mensaje de éxito o error por pantalla
                toast(data['msg']);
                //Si está en la localización de inicio creo la nueva capa y recargo la de escenarios iniciales
                if(data['status']=='success')
                {
                    $("#infoFeaturePanel").panel("close");
                    var viewparams='param_user:'+fb.user.id+';param_path:'+id_path;
                    var wfs=createWFSviewparamsLayer(name_stage,viewparams);
                    addInteractiveWFSLayer(wfs,onWFSFeatureSelectProgress);
                    map.updateSize();
                    var vlayers = map.getLayersByName("Escenarios Iniciales");
                    vlayers[0].redraw(true);
                }  
           },
            error: function(error)
           {
             toast('Network error has occurred please try again! Error: '+error);
           }, 
           dataType: "json",
         });
    }
}    