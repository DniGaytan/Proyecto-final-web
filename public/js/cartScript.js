$("#button-order-confirmation").on('click', () => {

});

$(".delete-item-button").on('click', (e) => {
  var idTriggered = e.currentTarget.id;
  var idCart = $(".cart-element").attr('id');

  var data = {
    idCart : idCart,
    productId : idTriggered,
  }

  var settings = {
    url : "/delete-product/" + idTriggered,
    method : 'POST',
    data : JSON.stringify(data),
    datatype : 'JSON',
    contentType : "application/json",
    success : (response) => {
      //update cart
    },
    error : (error) => {
      console.log(error);
    }
  }

  $.ajax(settings);
});

$(document).on('click', '.product-button', (e) => {
    var productId = e.currentTarget.id;
    var cartId = $(".cart-element").attr('id');

    dat = {
      cartId : cartId;
    }

    var settings = {
      url : 'add-product/' + productId,
      method : 'POST',
      datatype : 'JSON',
      data : JSON.stringify(data),
      contentType : 'application/json',
      success : (response) => {
        updateCart(response);
      },
      error : (response) => {
        console.log('error happened');
      },
    }

    $.ajax(settings);

});

function updateCart(products){
  var productsWrapper = $("#cart-products-wrapper");

  for(var i = 0; i < products.length; i++){
    productsWrapper.append(`
      <li class="list-group-item">
        <div class="row" style="width:100%;">
          <div class="col-6">
            ${products[i].productName}
          </div>
          <div class="col-6">
            <button type="button" class="btn btn-danger btn-sm delete-item-button" name="button" id="${products[i]._id}">delete</button>
          </div>
        </div>
      </li>
      `)
  }
}
