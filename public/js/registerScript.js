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
  let firstname = $("#firstname-field");
  let lastname = $("#lastname-field");
  let username = $("#username-field");
  let emailValue = $("#email-field");
  let passwordValue = $("#password-field");
  let passwordConfirmValue = $('#password-confirmation-field');
    $.ajax({
      url: '/register',
      method:'POST',
      contentType:'application/json',
      data:JSON.stringify({
        FirstName:firstname.val(),
        LastName:lastname.val(),
        Username:username.val(),
        Email:emailValue.val(),
        Password:passwordValue.val()
      }),
      success:function(res){
        firstname.val('');
        lastname.val('');
        username.val('');
        emailValue.val('');
        passwordValue.val('');
        passwordConfirmValue.val('');
      }
    });
});
init();