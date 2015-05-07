var state='welcoming';// authenticated,createScenario,createRiddle,running
var scenario_under_creation=null;
var scenario_running='';


function setState(newstate)
{
    state=newstate;
    updateUI();
}
function updateUI()
{
    if (state==='welcoming'){
        $("#validarUbicacion").hide();
        $("#infopanel").panel('open');
        $("#nuevoescenario_button").button('enable');
    }else if (state =='running'){
        $("#validarUbicacion").show();
        $("#validarUbicacion").button('enable');
    }else if (state=='createScenario')
    {
        $("#nuevoescenario_button").hide();
    }
	$("#mappage").trigger( "updatelayout" );

}
function initTesoro(){
    $("#nuevoescenario_button").bind("click",nuevoescenario_button_action);
}

function nuevoescenario_button_action(event,ui){
        setState('createScenario');
        $("#infopanel").panel('close');
    }
function marca_pulsada(event){
	if (state==="welcoming"){
		$("#infopanel").panel("open");
	}		
    else if (state==="authenticated" || state==="createScenario"){
        setState("createScenario");
        $("#scenario_iduser").val(fb.user.id);
//        $("#scenario_iduser").attr('value','XXX')
        $("#create_scenario_panel").panel("open");
    }
}

function facebook_logout(response){
	window.location.href = \'index.html\';
	// setState('welcoming');
}