/**
 * Product
 */
var cart = require("../cart.js");
var productPreview = require("./productPreview.js");

 /**
  * обработчики событий элементов
  */
function addListeners(){


    // обработчик кнопок QTY
    var qtyInput = document.querySelector('#qtyInput');
    var qtyPlusBtn = document.querySelector('.qty-selector__up');
    var qtyMinusBtn = document.querySelector('.qty-selector__down');

    if ( qtyInput !== null){

        qtyPlusBtn.addEventListener('click', function(e){

            e.preventDefault();
            qtyInput.value++;
        });

        qtyMinusBtn.addEventListener('click', function(e){

            e.preventDefault();
            if (qtyInput.value > 1) qtyInput.value--;
        });
    }

    // кнопка ДОБАВИТЬ В КОРЗИНУ
    var toCartButton = document.querySelector('.product__buttons .add-to-cart');
    
    toCartButton.addEventListener('click', function(e){

        e.preventDefault();

        // получаем QTY
        var qtyInput = document.querySelector('#qtyInput');
        var qty = qtyInput.value;

        var toCartButton = e.target.closest('.add-to-cart');
        if ( toCartButton ){
            // добавляем в корзину по атрибуту кнопки data-product_id
            cart.add(toCartButton.dataset.product_id, qty);
        }
    });
}

module.exports = {

    init: function(){

        var product = document.querySelector('.product');
        if ( !product ) return;
        addListeners();
        productPreview.init();
    }
}