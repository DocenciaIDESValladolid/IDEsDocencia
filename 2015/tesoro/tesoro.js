/**
 * @type String|newstate
 */
var state='welcoming';// authenticated,createScenario,creatingScenario,createRiddle,running
var scenario_under_creation=null;
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
        $("#nuevoescenario_button").hide();
        $("#welcomingInfo").show();
        $("#createRiddleInfo").hide();
        $("#infopanel").panel('open');
        break;
    case 'authenticated':
        disable_edit_polygons();
        $("#welcomingInfo").show();
        $("#createRiddleInfo").hide();
        $("#validarUbicacion").hide();
        $("#nuevoescenario_button").show();
        break;
    case 'createScenario':
        $("#welcomingInfo").show();
        $("#createRiddleInfo").hide();
        $("#nuevoescenario_button").show();
        $("#validarUbicacion").hide();
        break;
    case 'creatingScenario':
        $("#validarUbicacion").hide();
        $("#infoCreatingScenarioPanel").panel('open');
        break;
    case 'startCreatingRiddle':
        addEditingRiddlesWMS(fb.getUser(),scenario_under_creation);
        state = 'createRiddle';//continue to next actions common to createRiddle
    case 'createRiddle':
        // refresh WMS layer
        refresh_WMS_layer("Tesoro:Editable");//"EditingRiddlesWMS"); // nombre ficticio
        $.mobile.back();
        $("#welcomingInfo").hide();
        $("#createRiddleInfo").show();
        $("#riddle_iduser").val(fb.user.id);
        $("#riddle_stage").val(scenario_under_creation);
        setTimeout(function(){$("#infopanel").panel('open');},1500);
        enable_edit_polygons(function(event)
        {
            var geom= event.feature.geometry;
            $("#riddle_geom").val(geom.toString());
            
            $.mobile.changePage("#addRiddlePage");
            emptyPolygonLayer();
        });
        $("#validarUbicacion").hide();
        break;
    case 'running':
            disable_edit_polygons();
        $("#validarUbicacion").show();
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
             scenario_under_creation=result.idStage;
             toast('Escenario creado');
             $("#createScenarioForm")[0].reset();
             setState('startCreatingRiddle');
        },
        function(error){
             toast('Network error has occurred please try again!'+error);
        });
		
	enableForm('#createQuestionForm', 
        function(result){
             last_created_riddle=result.idRiddle;
             toast('Pregunta creada');
             $("#createQuestionForm")[0].reset();
             setState('createRiddle');
        },
        function(error){
             toast('Network error has occurred please try again!'+error);
        });
}

function end_scenario_button_action(event,ui){
   		
        if (state==="createRiddle")
        {
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

/*function marca_pulsada(event){
	if (state==="welcoming"){
		$("#infopanel").panel("open");
	}		
    else if (state==="authenticated"){        
//        $("#scenario_iduser").attr('value','XXX')
        $("#create_scenario_panel").panel("open");
    }
}*/

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
                        //dataType: 'json',
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
    map.removeLayer(layer);
    map.updateSize();
    layer.destroy();
}
function refresh_WMS_layer(name){
    var layers=map.getLayersByName(name);
    layers.forEach(function (layer){
        if (layer instanceof OpenLayers.Layer.Vector)
        {
            
        }else
        if (layer instanceof OpenLayers.Layer.WMS){
            layer.refresh();
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
		document.location.href="index.html";
	}
	setCookie("displayDemo", false, 1000);
}
