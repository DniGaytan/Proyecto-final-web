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
    },
    error : (response) => {
      console.log("Username/Password");
    }
  }

  $.ajax(settings);
});
