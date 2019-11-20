//validates user credential saven in a cookie
//if they do not exist the user is redirected to login.html
function init(){
      //gets only the value of the cookie, without the name
      var re = new RegExp(name + "=([^;]+)");
      var value = re.exec(document.cookie);
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