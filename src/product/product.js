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

    // табы
    var tabsButtons = document.querySelectorAll('.product-tabs__item');
    tabsButtons.forEach( function( item ){

        item.addEventListener( 'click', function( e ){

            e.preventDefault();
            
            var target = e.target.closest('.product-tabs__item');

            if( target.classList.contains('active') ) return;

            // получаем текущую активную вкладку
            var prevTab = document.querySelector('.product-tabs__item.active');
            var prevContent = document.querySelector('.product-bottom-content__item.active');
            // прячем
            prevTab.classList.remove('active');
            prevContent.classList.remove('active');
            
            // определяем новую активную вкладку
            switch( target.dataset.tab ){
                case 'desc':
                    var newContent = document.querySelector('.product-bottom-content .product__desc');
                    break;
                
                case 'video':
                    var newContent = document.querySelector('.product-bottom-content .product__video');
                    break;

                case 'specs':
                    var newContent = document.querySelector('.product-bottom-content .product__specs');
                    break;
                
                case 'delivery':
                    var newContent = document.querySelector('.product-bottom-content .product__delivery');
                    break;

                case 'reviews':
                    var newContent = document.querySelector('.product-bottom-content .product__reviews');
                    break;

                default:
                    var newContent = prevContent;
                    break;
            }

            // делаем новую вкладку ативной
            target.classList.add('active');
            newContent.classList.add('active');
        });
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