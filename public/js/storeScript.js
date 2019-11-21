$(document).ready(() => {
  var url = document.location.href;
  var params = url.split('?')[1].split('&');
  console.log(params);

  var settings = {
    url : '/get/' + params,
    method: 'POST',
    contentType : 'application/json',
    success : (responseStore) => {

      var settings2 = {
        url : '/get-by/' + responseStore.storeManager,
        method: 'POST',
        contentType : 'application/json',
        success : (responseUser) => {
          console.log(responseUser);
          loadContent(responseStore, responseUser);

        }
      }

      $.ajax(settings2);

    }
  }

  $.ajax(settings);


});

function loadContent(responseStore, responseUser){
  var divWrapper = $('body');

  divWrapper.append(`
    <div class="container-fluid" id="content-wrapper">
      <div class="container" id="banner-wrapper" style="background-color:black;">
        <img src="${responseStore.storeImg}" id="img-banner" alt="">
      </div>
      <div class="container" id="information-wrapper">
        <div class="row" id="inner-information-wrapper">
          <div class="col-sm-6" id="contact-wrapper">
            <div class="card shadow p-3 mb-5 bg-white rounded">
              <div class="card-body">
                <h5 class="card-title">Contact</h5>
                <p class="card-text">${responseUser.Username}  |  ${responseStore.storeName} </p>
              </div>
            </div>
          </div>
          <div class="col-sm-6" id="description-wrapper">
            <div class="card shadow p-3 mb-5 bg-white rounded">
              <div class="card-body">
                <h5 class="card-title">Description</h5>
                <p class="card-text">${responseStore.storeDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container" id="products-wrapper">
        <div class="row" id="inner-products-wrapper">
          <div class="col-md-6 col-sm-6 col-lg-3 product-card-wrapper">
            <div class="card product-card" style="width: 18rem;">
              <img src="https://dummyimage.com/150x150/000000/fff.png&text=Aguacate" class="card-img-top" style="min-height: 150px; max-height: 150px;">
              <div class="card-body " align="center">
                <p class="card-text">Aguacate</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Price: $123.4 </li>
                <li class="list-group-item">Discount: 5%</li>
                <li class="list-group-item">Available: 5 pcs </li>
              </ul>
              <div class="card-body">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="inputGroupSelect01">Add: </label>
                  </div>
                  <select class="custom-select" id="inputGroupSelect01">
                    <option value="1" selected>1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <a href="#" class="card-link">Add product</a>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
    `)

}
