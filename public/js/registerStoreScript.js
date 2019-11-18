let storeLocation;
let storeType;
let storeImage;

$("#submit-button").on('click', (e) => {
    e.preventDefault();
    let storeNameValue = $('#storeName').val();

    data = {
        storeName : storeNameValue,
        storeImage : storeImage,
        storeLocation:storeLocation,
        storeType:storeType
      }

    settings = {
        url : asd ,//Aqui va el url al backend
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

$('#storeType').change(function (e) { 
    storeType = $('#storeType').val();
});

$(":file").change(function(e){
    storeImage = $(":file").val();
});