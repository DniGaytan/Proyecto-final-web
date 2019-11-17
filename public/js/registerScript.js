$("#submit-button").on('click', (event) => {
  event.preventDefault();
  let firstname = $("#firstname-field").val();
  let lastname = $("#lastname-field").val();
  let username = $("#username-field").val();
  let emailValue = $("#email-field").val();
  let passwordValue = $("password-field").val();

  console.log(firstname);
  if (firstname == "") {
    var wrapper = $("#firstname-field").parent();
    wrapper.append(' <small id="emailHelp" class="form-text text-muted">Passwords does not match</small> ')

  }

  data = {
    firstname : firstname,
    lastname : lastname,
    username : username,
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
