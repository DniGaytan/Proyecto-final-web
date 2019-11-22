let storeId;
let store;

$(document).ready(() => {
  var url = document.location.href;
  var params = url.split('?')[1].split('&');
  var settings = {
    url : '/get/' + params,
    method: 'POST',
    contentType : 'application/json',
    success : (responseStore) => {
      localStorage.setItem("LinkedStoreId",responseStore);
      var settings2 = {
        url : '/get-by/' + responseStore.storeManager,
        method: 'POST',
        contentType : 'application/json',
        success : (responseUser) => {
          console.log(responseStore);
          storeId = responseStore;
          loadContent(responseStore, responseUser);
          appendStoreProducts(responseStore);
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
              <img src="https://dummyimage.com/150x150/000000/fff.png&text=Add Product" class="card-img-top" style="min-height: 150px; max-height: 150px;">
              <div class="card-body " align="center">
              </div>
              <div class="card-body">
                <div class="input-group mb-3">
                </div>
                  <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#exampleModal">
                Add Product
                </button>
                </div>
              </div>
        </div>
      </div>
    </div>
  </div>
</div>
`)

}

//
function appendStoreProducts(stores){
  Object.keys(stores.Products).forEach(function(key){
    console.log(stores.Products[key]);
    $.ajax({
      url: '/find-product',
      method:'POST',
      contentType:'application/json',
      data:JSON.stringify({
        productId:stores.Products[key]
      }),
      success:(response) =>{
        let wrap = $('#inner-products-wrapper');
        wrap.append('');
        wrap.append(
        `<div class="col-md-6 col-sm-6 col-lg-3 product-card-wrapper">
        <div class="card product-card" style="width: 18rem;">
          <img src="https://dummyimage.com/150x150/000000/fff.png&text=${response.productName}" class="card-img-top" style="min-height: 150px; max-height: 150px;">
          <div class="card-body " align="center">
            <p class="card-text">${response.productName}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Price: ${response.productPrice} </li>
            <li class="list-group-item">Available: ${response.productQuantity} </li>
          </ul>
          <div class="card-body">
              <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#modifyModal">
              Modify Product
              </button>
            </div>
          </div>`
        )
      }
    });
  });
}

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}


$('#addProduct').on('click',function(e){
  let strId = storeId._id;
  console.log($('#name').val());
  console.log($('#price').val());
  console.log($('#inputGroupSelect01').val());

  $.ajax({
    url: '/register-product',
    method:'POST',
    contentType:'application/json',
    data:JSON.stringify({
      productName:$('#name').val(),
      productPrice:$('#price').val(),
      productQuantity:$('#inputGroupSelect01').val(),
      //productImg:
      storeId:strId
    }),
    success:(response) =>{
      console.log(response._id);
      $.ajax({
        url: '/push-product-to-store',
        method:'POST',
        contentType:'application/json',
        data:JSON.stringify({
          productId:response._id,
          storeId:strId
        }),
        success:(respresonse) =>{
          console.log('Product added to store');
        }
      });
    }
  });
  $('#name').val('');
  $('#price').val('');
  $('#inputGroupSelect01').val('Qty');
});


$('#modifyProduct').on('click',function(e){
  console.log($('#mname').val());
  console.log($('#mprice').val());
  console.log($('#mQty').val());
  console.log(strId);
  let strId = storeId._id;
  $.ajax({
    url: '/modify-product',
    method:'POST',
    contentType:'application/json',
    data:JSON.stringify({
      productName:$('#mname').val(),
      productPrice:$('#mprice').val(),
      productQuantity:$('#mQty').val(),
      storeId:strId
      //productImg:
    }),
    success:(response) =>{
      console.log(response._id);
    }
  });
  $('#mname').val('');
  $('#mprice').val('');
  $('#mQty').val('');
});
