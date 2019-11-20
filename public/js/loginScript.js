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
      success:(response) =>{
        console.log('YES');
        window.location.replace("../home.html");
      },
      error : (response) => { 
        console.log('No');
        window.location.replace("../login.html");
      }
    });
};


$("#submit-button").on('click', (event) => {
  event.preventDefault();
  let emailValue = $("#email-field").val();
  let passwordValue = $("#password-field").val();

  data = {
    Email : emailValue,
    Password : passwordValue
  }
  console.log("Email: " + data.Email);
  console.log("Password: " + data.Password);
  settings = {
    url : "/login" ,//Aqui va el url al backend
    method : 'POST',
    data : JSON.stringify(data),
    datatype : 'JSON',
    contentType : "application/json",
    success : (response) => {
      console.log("User Found");
      window.location.replace("../home.html");
    },
    error : (response) => {
      console.log("Username/Password");
    }
  }

  $.ajax(settings);
});

init();