$(document).ready(() => {
    var settings = {
        url : '/get-stores',
        method : 'GET',
        contentType : "application/json",
        success : (response) => {
            console.log(response);
            appendStores(response);
        },
        error : (error) => {
            console.log(error);
        },
    }

    $.ajax(settings);
});


function appendStores(stores){
    var divWrapper = $("#inner-stores-wrapper");
    for(var i = 0; i < stores.length ; i++){
        divWrapper.append(`
            <div class="col-4 product-card-wrapper">
                <div class="card product-card shadow-lg p-3 mb-5 bg-white rounded" style="width: 18rem;">
                <img src="${stores[i].storeImg}" class="card-img-top" style="min-height: 150px; max-height: 150px;">
                <div class="card-body " align="center">
                    <p class="card-text">${stores[i].storeName}</p>
                </div>
                <div class="card-body d-flex justify-content-center">
                    <a class="card-link go-to-store-a">Go to store</a>
                </div>
                </div>
            </div>
        `)
    }
};

$('#logout').on('submit', (event) => {
    event.preventDefault();
    
});