//validates user credential saven in a cookie
//if they do not exist the user is redirected to login.html
function init(){
  //gets only the value of the cookie, without the name
  console.log(document.cookie);
  if(document.cookie == ""){
    window.location.replace("../login.html");
  }
  else if(document.cookie != ""){
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    console.log('si llega aqui 1');
    if(value[1] == undefined){
      window.location.replace("../login.html");
    }
    console.log('si llega aqui 2');
    //ajax call to validate if user is already logged in
    $.ajax({
      url: '/validate',
      method:'POST',
      contentType:'application/json',
      data:JSON.stringify({
        Email:value[1]
      }),
      error : (response) => {
        console.log('si llega aqui 3');
        window.location.replace("../login.html");
      }
    });
  }
};

init();

$(document).ready(() => {
    var settings = {
        url : '/get-stores',
        method : 'GET',
        contentType : "application/json",
        success : (response) => {
            appendStores(response);
        },
        error : (error) => {
            console.log(error);
        },
    }
    $.ajax(settings);
});


function appendStores(stores){
    var divWrapper = $("#inner-stores-wrapper");
    for(var i = 0; i < stores.length ; i++){
        divWrapper.append(`
            <div class="col-4 product-card-wrapper">
                <div class="card product-card shadow-lg p-3 mb-5 bg-white rounded" style="width: 18rem;">
                <img src="${stores[i].storeImg}" class="card-img-top" style="min-height: 150px; max-height: 150px;">
                <div class="card-body " align="center">
                    <p class="card-text">${stores[i].storeName}</p>
                </div>
                <div class="card-body d-flex justify-content-center">
                    <button class="btn btn-primary go-to-store-a" id="${stores[i]._id}">Go to store</button>
                </div>
                </div>
            </div>
        `)
    }
};

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
//Navigation to find Stores View
$('#findStores').on('click', (event) => {
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
          window.location.href = "../findstores.html";
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
//Navigation to Orders Dashboard view
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

$(document).on('click', '.go-to-store-a',(e) => {
  console.log('executing!')
  var storeId = e.currentTarget.id;

  settings = {
    url : '/get/' + storeId,
    method : 'POST',
    contentType: 'application/json',
    success : (response) => {
      console.log(response);
      url = 'store.html?' + encodeURIComponent(storeId);
      document.location.href = url;
      setSettings(response);
      document.cookie.CurrentStore = storeId;
    }

  }
  $.ajax(settings);
});