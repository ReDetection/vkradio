var radioLocation = location.protocol + '//' + location.host;
if (location.host.localeCompare('redetection.github.io')==0){
  radioLocation = radioLocation + '/vkradio/';
}
var RadioClass ;
var radioInstance;
var nowPlaying = " ";
var radioid = window.location.search.substring(1).split("/")[0];
  
$(document).ready(function () {
  Parse.initialize("poVULgqVbzdhjQCip2OqubuwmuyZHJHgkrYCmNAd", "FtNJgAjrsbPzLSuPP6BmQflqx17doGz1A4HhGVqP");
  VK.init({
    apiId: 2810295,
    nameTransportPath: "xd_receiver.html"
  });

  RadioClass = Parse.Object.extend("Radio");
  
  if(radioid && radioid.length==10){
    searchRadio(radioid);
  } 

  VK.Auth.getLoginStatus(authInfo);
});

function authInfo(response) {
  if (response.session) {
    VK.Api.call('getUserSettings', {}, allowedSettings);
  } else {
    VK.UI.button('login_button');
    show("vklogin");
  }
}

function allowedSettings(response){
  if ((parseInt(response.response) & 8) > 0){
    hide("vklogin");
    show("createbox");
  } else {
    VK.UI.button('login_button');
    show("vklogin");
  }
}

function searchRadio(queryString){
  var query = new Parse.Query(RadioClass);
  query.get(queryString,{
    success: function(instance) {
      radioInstance = instance;
      
      hide("indexpage");
      document.getElementById("statusLabel").innerHTML = "Вы слушаете радио " + instance.id;
      document.getElementById("link").value= radioLocation + "/?" + instance.id;
      show("mainpage");

      renewPlayer();
    },
    error: function(object, error) {
       alert("Такое радио не существовало");
    }
  });

  return false;
}

function renewPlayer(){
  radioInstance.fetch({
    success: function(instance) {
      var track = instance.get("track");
      if (track.localeCompare(nowPlaying)!=0){
         justListen(track);
      }
    }
  });

  setTimeout(renewPlayer,10000);
}

function createRadio(form){
  hide("indexpage");
  var searchQuery = form["musicsearch"].value;
  musicSearchByQuery(searchQuery);
  var status = document.getElementById("statusLabel");
  status.innerHTML="Вы вещаете радио ";
  document.getElementById("mainpageSearchbox").value = searchQuery;
  show("mainpage");
  
  radioInstance = new RadioClass();
  radioInstance.save({author: VK.Auth.getSession().mid}, {
    success: function(object) {
      status.innerHTML = status.innerHTML + object.id;
      document.getElementById("link").value = radioLocation + "/?" + object.id;
    }
  });

  return false;
}

function musicSearchByQuery(query) {
  return musicSearch({q: query, sort: 2});
}

function musicSearchByQueryWithCaptcha(query, sid, key) {
  hide("captcha_dialog");
  document.getElementById("captcha_key").value = "";
  return musicSearch({q: query, sort: 2, captcha_sid: sid, captcha_key: key});
};

function musicSearch(params) {
  hide("results");

  VK.Api.call('audio.search', params, function(r) {
    if(r.response) {
      var newHTML = "<table border='0'>";
      var len = r.response.length;
      for (var i=1; i<len; i++) {
        var s = r.response[i];
        
        newHTML=newHTML+"<tr><td><b>" + s.artist + "</b> — " + s.title;
        newHTML=newHTML+'&nbsp;<a id="listen" href="/" onclick="return justListen(\'' + trim(s.owner_id + '_' + s.aid) + '\');">Слушать</a>';
        newHTML=newHTML+'&nbsp;<a id="shout" href="/" onclick="return shout(\'' + trim(s.owner_id + '_' + s.aid) + '\');">Вещать</a>';
        newHTML=newHTML+" </td></tr>";
      }
      newHTML=newHTML+" </table>";

      var div = document.getElementById('resultslist');
      div.innerHTML=newHTML;
      show("results");

    } else {
      if (r.error.error_code == 14) {
        /* Set captcha image */
        var img = document.getElementById('captcha_image');
        img.src = r.error.captcha_img;

        /* Set form values */
        var captcha_sid_input = document.getElementById('captcha_sid');
        captcha_sid_input.value = r.error.captcha_sid;

        var captcha_musicsearch = document.getElementById('captcha_musicsearch');
        captcha_musicsearch.value = params.q;

        /* Show captcha dialog. */
        show("captcha_dialog");
      }
      console.log(r);
    }
  });
  return false;
}

function justListen(track){
  var playerdiv = document.getElementById('player');
  playerdiv.innerHTML = "<iframe src='http://player.vas3k.ru/small/#track:"+ track + "' width=630 height=130></iframe>";
  nowPlaying = track;
  return false;
}

function shout(track){
  justListen(track);
  radioInstance.save({track: track},{});
  return false;
}

/* Utils */
function trim(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function show(id){
  $("#" + id).removeClass('hide');
}

function hide(id) {
  $("#" + id).addClass('hide');
}
