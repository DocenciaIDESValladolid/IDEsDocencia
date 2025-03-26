var fb = {
  config :{
  // CONFIG VARS: 

  // Copy this file as facebook.js and fill-in the Facebook App Id
    app_id : '408450839360647', // CazaDelTesoro Test App
 
    use_xfbml : true,

    extendPermissions : 'email',  //'publish_stream' , 
    // info: http://developers.facebook.com/docs/reference/api/permissions/
    locale : 'es_ES' 
    // all locales in: http://www.facebook.com/translations/FacebookLocales.xml

  // END CONFIG VARS
  },
  perms : [],
  hasPerm : function (perm) { for(var i=0, l=fb.perms.length; i<l; i++) { if(fb.perms[i] == perm) {return true;}} return false; },
  logged : false,
  user : false, // when login, is a user object: http://developers.facebook.com/docs/reference/api/user
  login : function (callback){
    FB.login(function(r) {
      if (r.status == 'connected') {
        FB.api('/me/permissions',function(perm){
          fb.logged = true;
		  fb.perms = [];
		  for(i in perm.data[0])
		  {
			if (perm.data[0][i] == 1)
			{
				fb.perms.push(i);
			}
		  }
        });	   
		fb.getUser(callback);
      } else {
        fb.logged = false;
        fb.perms = [];
		callback();
      }
    },{scope:fb.config.extendPermissions});
    return false;
  },
  syncLogin : function (callback){
    if (!callback) callback = function(){};
    FB.getLoginStatus(function(r) {
      if (r.status == 'connected' ) { 
        FB.api('/me/permissions',function(perm){
          fb.logged = true;
		  fb.perms = [];
		  for(i in perm.data[0])
		  {
			if (perm.data[0][i] == 1)
			{
				fb.perms.push(i);
			}
		  }
        });	   
        fb.getUser(callback);
        return true;
      } else {
        fb.logged = false;
        callback();
        return false;
      }
    });
  },
  logout : function(callback) {FB.logout(callback);},
  getUser : function(callback){
    FB.api('/me', function(r){
      var user = r;
      user.picture = "https://graph.facebook.com/"+user.id+"/picture";
      fb.user=user; callback(user); 
    }); 
  },
  publish : function (publishObj,callback,noReTry) {
  // publishObj: http://developers.facebook.com/docs/reference/api/post   
    if (fb.logged && fb.hasPerm('publish_stream'))
    { 
      FB.api('/me/feed', 'post', publishObj, function(response) {
      if (!response || response.error) {
        callback(false);
      } else {
        callback(true);
      }
      });
      return true;
    }
    else
    { 
      if (!noReTry)
      	return fb.login(function() { return fb.publish(publishObj,callback,1)});
      else
      {
        callback(false);
        return false;
      }
    }
  },
  readyFuncs : [],
  ready: function(func){fb.readyFuncs.push(func)},
  launchReadyFuncs : function () {for(var i=0,l=fb.readyFuncs.length;i<l;i++){fb.readyFuncs[i]();};}
}
window.fbAsyncInit = function() { 
  if (fb.config.app_id) FB.init({appId: fb.config.app_id, status: true, cookie: true, xfbml: fb.config.use_xfbml});
  fb.syncLogin(fb.launchReadyFuncs);
};
var oldload = window.onload;
window.onload = function() {
  var d = document.createElement('div'); d.id="fb-root"; document.getElementsByTagName('body')[0].appendChild(d);
  var e = document.createElement('script'); e.async = true; e.src = document.location.protocol + '//connect.facebook.net/'+fb.config.locale+'/all.js';
  document.getElementById('fb-root').appendChild(e);
  if (typeof oldload == 'function') oldload();
};

// Funcion para logarse con Facebook.
function login() {
  fb.login(function(){ 
    if (fb.logged) {
		// Cambiamos el link de identificarse por el nombre y la foto del usuario.
		updateFacebookLoginInfo(fb);
    } else {
      toast("No se pudo identificar al usuario");
    }
  })
};

// Funcion para actualizar la información de facebook
function updateFacebookLoginInfo(fb)
{
	id_facebook = fb.user.id;
	name_facebook = fb.user.name;
	email_facebook=fb.user.email;
	var fb_user_label = '<img valign="center" height="30" src="'+fb.user.picture+'"/>' + fb.user.name;
	var html = fb_user_label + '<a href="#" class="ui-btn  ui-btn-icon-left ui-icon-delete" onclick="fb.logout(facebook_logout);return false;">Salir</a></p>';
	$("#estadoLogin").html(html);
	$("#iniciosesionFacebook").hide();

	$("#search_button").show();
	$("#mappage").trigger( "updatelayout" );
	toast(fb_user_label);
	
	$("#id_facebook").val(fb.user.id);
	$("#name_facebook").val(fb.user.name);
	
	setState('authenticated');
  stages();
}

// Funcion para publicar un mensaje en tu muro
var publish = function () {
    fb.publish({
      message : "Estoy probando un script para que la gente publique desde mi/s web/s en Facebook",
      picture : "http://blog.ikhuerta.com/wp-content/themes/ikhuerta3/images/ikhuerta.jpg",
      link : "http://blog.ikhuerta.com/simple-facebook-graph-javascript-sdk",
      name : "Simple Facebook Graph Javascript SDK",
      description : "Facebook Graph es una nueva forma de conectar tu web Facebook. Con este script es muy fácil conseguirlo :)"
    },function(published){ 
      if (published)
       alert("publicado!");
      else
       alert("No publicado :(, seguramente porque no estas identificado o no diste permisos");
    });  
}
