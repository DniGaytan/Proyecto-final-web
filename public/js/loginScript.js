$("#submit-button").on('click', (event) => {
  event.preventDefault();
  let emailValue = $("#email-field").val();
  let passwordValue = $("password-field").val();

  data = {
    email : emailValue,
    password : passwordValue,
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
