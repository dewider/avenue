/**
 * Product
 */
var cart = require("../cart.js");
var productPreview = require("./productPreview.js");
var ajax = require("../ajax.js");
var popup = require('../popup/popup.js');

 /**
  * обработчики событий элементов
  */

class Product {

    constructor(){

        // Корневой элемент
        this.productElement = document.querySelector('.product');
        // Поле QTY
        this.qtyInput = this.productElement.querySelector('#qtyInput');
        // Кнопки + и -
        this.qtyPlusBtn = this.productElement.querySelector('.qty-selector__up');
        this.qtyMinusBtn = this.productElement.querySelector('.qty-selector__down');
        // кнопка ДОБАВИТЬ В КОРЗИНУ
        this.toCartButton = this.productElement.querySelector('.product__buttons .add-to-cart');
        // табы
        this.tabsButtons = this.productElement.querySelectorAll('.product-tabs__item');
        // ID товара
        this.productID = this.productElement.querySelector('.add-to-cart').dataset.product_id;
        // поля выбора цвета и размера
        this.colorSelect = this.productElement.querySelector('.product__specs select[name=color]');
        this.sizeSelect = this.productElement.querySelector('.product__specs select[name=size]');
        // вариативный товар
        if( this.sizeSelect ){
            this.isVariable = true;
        } else {
            this.isVariable = false;
        }
        // цена
        this.priceElement = this.productElement.querySelector('product__price');
        // текущая вариация
        this.currentVariation = undefined;
    }

    /**
     * Добавление обработчиков событий
     */
    addListeners(){

        // обработчик кнопок QTY
        var parrent = this;
        if ( parrent.qtyInput !== null){

            parrent.qtyPlusBtn.addEventListener('click', function(e){

                e.preventDefault();
                parrent.qtyInput.value++;
            });

            parrent.qtyMinusBtn.addEventListener('click', function(e){

                e.preventDefault();
                if (parrent.qtyInput.value > 1) parrent.qtyInput.value--;
            });
        }

        // кнопка ДОБАВИТЬ В КОРЗИНУ
        this.toCartButton.addEventListener('click', function(e){

            e.preventDefault();

            // получаем QTY
            var qty = parrent.qtyInput.value;

            var toCartButton = e.target.closest('.add-to-cart');
            if ( toCartButton ){

                // если товар не вариативный - просто добавляем в корзину
                if( !parrent.isVariable ){
                    cart.add(toCartButton.dataset.product_id, qty);
                    return;
                }

                // получаем цвет
                var pColor = parrent.colorSelect.value;
                // если цвет не выбран, выводим попап
                if( !pColor ){

                    popup.show('Выберите цвет');
                    return;
                }
                // получаем размер
                var pSize = parrent.sizeSelect.value;
                // если цвет не выбран, выводим попап
                if( !pSize ){

                    popup.show('Выберите размер');
                    return;
                }
                //получаем вариацию
                var variation =  parrent.getVariation(pColor, pSize);
                // добавляем в корзину по атрибуту кнопки data-product_id
                cart.add(toCartButton.dataset.product_id, qty, variation.variation_id);
            }
        });

        // табы
        this.tabsButtons.forEach( function( item ){

            item.addEventListener( 'click', function( e ){

                e.preventDefault();

                var target = e.target.closest('.product-tabs__item');

                if( target.classList.contains('active') ) return;

                // получаем текущую активную вкладку
                var prevTab = parrent.productElement.querySelector('.product-tabs__item.active');
                var prevContent = parrent.productElement.querySelector('.product-bottom-content__item.active');
                // прячем
                prevTab.classList.remove('active');
                prevContent.classList.remove('active');

                // определяем новую активную вкладку
                switch( target.dataset.tab ){
                    case 'desc':
                        var newContent = parrent.productElement.querySelector('.product-bottom-content .product__desc');
                        break;

                    case 'video':
                        var newContent = parrent.productElement.querySelector('.product-bottom-content .product__video');
                        break;

                    case 'specs':
                        var newContent = parrent.productElement.querySelector('.product-bottom-content .product__specs');
                        break;

                    case 'delivery':
                        var newContent = parrent.productElement.querySelector('.product-bottom-content .product__delivery');
                        break;

                    case 'reviews':
                        var newContent = parrent.productElement.querySelector('.product-bottom-content .product__reviews');
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
    
        // изменение цвета или размера
        if( this.isVariable ){
            this.colorSelect.addEventListener('change', function( e ){
                parrent.renderVariations('color');
            });
            this.sizeSelect.addEventListener('change', function( e ){
                parrent.renderVariations('size');
            });
        }
    }

    /**
     * Получение доступных вариация
     */
    getVariations(){

        var parrent = this;
        var request = ajax.createRequest(
            'GET',
            '/wp-json/product/v1/variations/' + this.productID,
            function( e ){

                if( e.target.readyState != 4 ) return;
                parrent.variations = JSON.parse(e.target.responseText);
                console.log(parrent.variations);
                parrent.renderVariations();
            }
        );
        request.send();
    }

    /**
     * Отрисовка полей выбора вариация
     */
    renderVariations( changedAttr ){

        var parrent = this;
        var colors = new Set;
        var sizes = new Set;
        var colorValue = this.colorSelect.value;
        var sizeValue = this.sizeSelect.value;

        //получаем уникальные цвета и размеры из вариаций
        
        if( changedAttr == 'color'){
            // если был изменен только цвет
            
            // находим доступные размеры
            parrent.variations.forEach( function( item ){

                if( item.attributes.attribute_pa_color == colorValue){
                    sizes.add(item.attributes.attribute_pa_size);
                }
            });

            // добавляем размеры
            this.sizeSelect.innerHTML = "<option value disabled selected>Select Size</option>";
            sizes.forEach( function( item ){
                parrent.sizeSelect.appendChild( new Option (item, item) );
            });

            //============================================

        } else {
            //иначе получаем все доступные цвета и размеры
            
            this.variations.forEach( function( item ){
                
                colors.add(item.attributes.attribute_pa_color);
                sizes.add(item.attributes.attribute_pa_size);
            });

            // добавляем цвета
            this.colorSelect.innerHTML = "<option value disabled selected>Select Colour</option>";
            colors.forEach( function( item ){
                parrent.colorSelect.appendChild( new Option (item, item) );
            });
            // добавляем размеры
            this.sizeSelect.innerHTML = "<option value disabled selected>Select Size</option>";
            sizes.forEach( function( item ){
                parrent.sizeSelect.appendChild( new Option (item, item) );
            });
            
        }
        
    }

    /**
     * Возвращает вариацию
     */
    getVariation( color, size ){

        var variation;
        this.variations.forEach( function( item ){

           if( item.attributes.attribute_pa_size == size &&
               item.attributes.attribute_pa_color == color ){
                    variation = item;
                    return;
               }
        });

        return variation;
    }

    /**
     * Отрисовка цены вариации
     */
    renderPrice(){
        
    }
}

module.exports = {

    init: function(){

        var productEl = document.querySelector('.product');
        if ( !productEl ) return;
        var product = new Product;
        product.addListeners();
        if( product.isVariable ) product.getVariations();
        productPreview.init();
    }
}