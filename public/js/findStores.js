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

