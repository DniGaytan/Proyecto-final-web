//Register User
//FALTA referenciar siguiente vista
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
