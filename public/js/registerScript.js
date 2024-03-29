//validates user credential saven in a cookie
//if they do not exist the user is redirected to login.html
function init(){
    //gets only the value of the cookie, without the name
    if(document.cookie != "" && document.cookie != undefined){
    var re = new RegExp(name + "=([^;]+)");
    console.log(document.cookie);
    var value = re.exec(document.cookie);
    //ajax call to validate if user is already logged in
    $.ajax({
      url: '/validate',
      method:'POST',
      contentType:'application/json',
      data:JSON.stringify({
        Email:value[1]
      }),
      success:(response) =>{
        console.log('YES');
        window.location.replace("../home.html");
      },
      error : (response) => {
        console.log('No');
        //window.location.replace("../login.html");
      }
    });
  }
};

$("#submit-button").on('click', (event) => {
  event.preventDefault();
  let firstname = $("#firstname-field");
  let lastname = $("#lastname-field");
  let username = $("#username-field");
  let emailValue = $("#email-field");
  let passwordValue = $("#password-field");
  let passwordConfirmValue = $('#password-confirmation-field');
  if(passwordValue.val()!=passwordConfirmValue.val())
    alert("Password Does Not Match!!!");
  else{
    $.ajax({
      url: '/register',
      method:'POST',
      datatype : 'JSON',
      contentType:'application/json',
      data:JSON.stringify({
        FirstName:firstname.val(),
        LastName:lastname.val(),
        Username:username.val(),
        Email:emailValue.val(),
        Password:passwordValue.val()
      }),
      success:function(res){
        data = {
          Email:emailValue.val(),
          Password:passwordValue.val()
        }
        console.log("Email: " + data.Email);
        console.log("Password: " + data.Password);


        var cart = {
          userId : res._id,
        }

        //creation of cart
        settings2 = {
          url : 'cart-create',
          method : 'POST',
          datatype : 'JSON',
          data : JSON.stringify(cart),
          contentType : 'application/json',
          success: (response) => {

            var data2 = {
              userId : response.userId,
              cartId : response._id,
            }

            settings3 = {
              url : 'add-cart',
              method : 'POST',
              datatype : 'JSON',
              data : JSON.stringify(data2),
              contentType : 'application/json',
              success: (response) => {
                  console.log('it worked');
              },
              error: (response) => {
                console.log('it did not worked');
              }
            }

            $.ajax(settings3);

          }
        }

        $.ajax(settings2);

        settings = {
          url : "/login" ,
          method : 'POST',
          data : JSON.stringify(data),
          datatype : 'JSON',
          contentType : "application/json",
          success : (response) => {
            console.log("User Found");
            window.location.replace("../home.html");
          },
          error : (response) => {
            console.log("Failed to create");
          }
        }

        $.ajax(settings);
      },
      error:function(e){
        //console.log(e);
      }
    });
  }
});

$("#redirect-to-login-button").on('click', (e) => {
  e.preventDefault();
  console.log("hey");
  document.location.href = "login.html";
});

init();
