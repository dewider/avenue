/**
 * Страница товара
 */

 module.exports = {

    init: function(){

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
    }
 }