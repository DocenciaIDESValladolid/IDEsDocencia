var state='welcoming';// running, 

function setState(newstate)
{
    state=newState;
    updateUI();
}
function updateUI()
{
    if (state==='welcoming'){
        $("#validarUbicacion").hide();
        $("#infopanel").panel('open');
    }if (state =='running'){
        $("#validarUbicacion").show();
        $("#validarUbicacion").button('enable');
    }
}