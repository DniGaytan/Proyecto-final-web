//Set up some of our variables.
var map; //Will contain map object.
var marker = false; ////Has the user plotted their location marker? 
        
//Function called to initialize / create the map.
//This is called when the page has loaded.
function initMap() {
 
    //The center location of our map.
    var centerOfMap = new google.maps.LatLng(25.67711885614149, -100.31744845581301);
 
    //Map options.
    var options = {
      center: centerOfMap, //Set center.
      zoom: 7 //The zoom value.
    };
 
    //Create the map object.
    map = new google.maps.Map(document.getElementById('map'), options);
 
    //Listen for any clicks on the map.
    google.maps.event.addListener(map, 'click', function(event) {                
        //Get the location that the user clicked.
        var clickedLocation = event.latLng;
        //If the marker hasn't been added.
        if(marker === false){
            //Create the marker.
            marker = new google.maps.Marker({
                position: clickedLocation,
                map: map,
                draggable: true //make it draggable
            });
            //Listen for drag events!
            google.maps.event.addListener(marker, 'dragend', function(event){
                markerLocation();
            });
        } else{
            //Marker has already been added, so just change its location.
            marker.setPosition(clickedLocation);
        }
        //Get the marker's location.
        markerLocation();
    });
}
        
//This function will get the marker's current location and then add the lat/long
//values to our textfields so that we can save the location.
function markerLocation(){
    //Get location.
    var currentLocation = marker.getPosition();
    //Add lat and lng values to a field that we can save.
    document.getElementById('lat').value = currentLocation.lat(); //latitude
    document.getElementById('lng').value = currentLocation.lng(); //longitude
}
        
        
//Load the map when the page has finished loading.
google.maps.event.addDomListener(window, 'load', initMap);
//validates user credential saven in a cookie
//if they do not exist the user is redirected to login.html
function init(){
  //gets only the value of the cookie, without the name
  if(document.cookie == ""){
    window.location.replace("../login.html");
  }
  else if(document.cookie != ""){
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    if(value[1] == undefined){
      window.location.replace("../login.html");
    }
    //ajax call to validate if user is already logged in
    $.ajax({
      url: '/validate',
      method:'POST',
      contentType:'application/json',
      data:JSON.stringify({
        Email:value[1]
      }),
      error : (response) => { 
        window.location.replace("../login.html");
      }
    });
  }
};
init();
//Destroys cookie object
$('#logout').on('click', (event) => {
    event.preventDefault();
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    if(value[1] == undefined){
      window.location.replace("../login.html");
    }
    $.ajax({
        url: '/logout',
        method:'POST',
        contentType:'application/json',
        data:JSON.stringify({
          Email:value[1]
        }),
        success:(response) =>{
            window.location.replace("../login.html");
        }
      });
});


$('#ordersDashboard').on('click', (event) => {
    event.preventDefault();
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    if(value[1] == undefined){
      window.location.replace("../login.html");
    }
    $.ajax({
        url: '/validate',
        method:'POST',
        contentType:'application/json',
        data:JSON.stringify({
          Email:value[1]
        }),
        success:(response) =>{
            window.location.href = "../dashboard.html";
        },
        error:(response)=>{
            window.location.replace("../login.html");
        }
      });
});
//Navigation to My Stores view
$('#myStores').on('click', (event) => {
    event.preventDefault();
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    if(value[1] == undefined){
      window.location.replace("../login.html");
    }
    $.ajax({
        url: '/validate',
        method:'POST',
        contentType:'application/json',
        data:JSON.stringify({
          Email:value[1]
        }),
        success:(response) =>{
            window.location.href = "../mystores.html";
        },
        error:(response)=>{
            window.location.replace("../login.html");
        }
      });
});

//Navigation to Home view
$('#home').on('click', (event) => {
    event.preventDefault();
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    if(value[1] == undefined){
      window.location.replace("../login.html");
    }
    $.ajax({
        url: '/validate',
        method:'POST',
        contentType:'application/json',
        data:JSON.stringify({
          Email:value[1]
        }),
        success:(response) =>{
            window.location.href = "../home.html";
        },
        error:(response)=>{
            window.location.replace("../login.html");
        }
      });
});


//Filter stores close to some coordinates
$('#location-find-button').on('click', (event) => {
  event.preventDefault();
  let lon = -100.292004;
  let lat = 25.621288;
  var settings = {
    url : '/get-stores',
    method : 'GET',
    contentType : "application/json",
    success : (response) => {
      console.log(response[0].storeLocation.coordinates[1] + " " + response[0].storeLocation.coordinates[0]);
        $.ajax({
          url:'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon+'&key=AIzaSyBHt_0k-RkQi4pDHhPKkkoYuJXsk1Lb1SI',
          success:(res)=>{
            console.log(res);
            Object.keys(response).forEach(function(key){
              console.log(response[key].storeLocation.coordinates[1] + " " + response[key].storeLocation.coordinates[0]);
                $.ajax({
                  url:'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + response[key].storeLocation.coordinates[1] + ',' + response[key].storeLocation.coordinates[0]+'&key=AIzaSyBHt_0k-RkQi4pDHhPKkkoYuJXsk1Lb1SI',
                  success:(validateStore)=>{
                    console.log(validateStore);
                  }
                })
              })
            }
        })
    },
    error : (error) => {
        console.log(error);
    },
}

$.ajax(settings);
});


//https://maps.googleapis.com/maps/api/geocode/json?latlng=25.484049, -100.187026&key=AIzaSyBHt_0k-RkQi4pDHhPKkkoYuJXsk1Lb1SI