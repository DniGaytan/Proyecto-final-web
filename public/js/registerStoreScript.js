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
      zoom: 10 //The zoom value.
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


let storeType;
let storeImage;
let latCoord;
let lonCoord;
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

$("#submit-button").on('click', (e) => {
    e.preventDefault();
    let storeNameValue = $('#storeName').val();
    latCoord = $("#lat").val();
    lonCoord = $("#lng").val();
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    var storeType = 'Any';
    if(value[1] == undefined){
      window.location.replace("../login.html");
    }
    data = {
        storeName : storeNameValue,
        storeImage : storeImage,
        lat:latCoord,
        lon:lonCoord,
        storeType:storeType,
        storeManager:value[1]
      }
      console.log(storeNameValue);
      console.log(latCoord);
      console.log(lonCoord);
      console.log(storeType);
      console.log(data.storeManager);
    settings = {
        url : '/register-store' ,//Aqui va el url al backend
        method : 'POST',
        data : JSON.stringify(data),
        datatype : 'JSON',
        contentType : "application/json",
        success : (response) => {


          var re = new RegExp(name + "=([^;]+)");

          data2 = {
            email : re.exec(document.cookie)[1],
            id : response._id,
          }
          console.log("triggered");
          console.log(data2);

          settings2 = {
              url : '/push-store-to-user' ,//Aqui va el url al backend
              method : 'POST',
              data : JSON.stringify(data2),
              datatype : 'JSON',
              contentType : "application/json",
              success : (response) => {
                console.log(response);
              },
              error : (response) => {
                console.log(response);
              }
          }

          $.ajax(settings2);

        },
        error : (response) => {
          //hacemos algo.
        }
    }

    $.ajax(settings);
});


$('.custom-select').change(function (e) {
    storeType = $('.custom-select').val();
});

$(":file").change(function(e){
    storeImage = $(":file").val();
});
