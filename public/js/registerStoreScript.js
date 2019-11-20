let storeLocation;
let storeType;
let storeImage;
let latCoord;
let lonCoord;

$('#location-button').on('click', (e) => {
  e.preventDefault();


  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition( (position) => {
      latCoord = position.coords.latitude;
      lonCoord = position.coords.longitude;
      var confirmationSmall = $("#confirmation-small");
      $(confirmationSmall).removeClass("invisible");
      $(confirmationSmall).addClass("visible");
    });
  }
  else{
    alert("geolocation is not supported by your browser");
  }
});

$("#submit-button").on('click', (e) => {
    e.preventDefault();
    let storeNameValue = $('#storeName').val();

    data = {
        storeName : storeNameValue,
        storeImage : storeImage,
        lat:latCoord,
        lon:lonCoord,
        storeType:storeType
      }
      console.log(latCoord);
      console.log(storeType);
    settings = {
        url : '/register-store' ,//Aqui va el url al backend
        method : 'POST',
        data : JSON.stringify(data),
        datatype : 'JSON',
        contentType : "application/json",
        success : (response) => {
          //hacemos algo.
        },
        error : (response) => {
          //hacemos algo.
        }
    }

    $.ajax(settings);
});

$('#storeLocations').change(function (e) {
    storeLocation = $('#storeLocations').val();
});

$('.custom-select').change(function (e) {
    storeType = $('.custom-select').val();
});

$(":file").change(function(e){
    storeImage = $(":file").val();
});
