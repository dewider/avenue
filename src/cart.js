/**
 * ===================
 * === Cart ==========
 * ===================
 */

var cookie = require('cookie');
var popup = require('./popup/popup.js');

/**
 * Создает AJAX запрос
 */
function createRequest( method, url, callback ){

    var request = new XMLHttpRequest();
    request.open( method, url );
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener( "readystatechange", callback );
    return request;
}

/**
 * Создает AJAX запрос с авторизаций
 */
function createAuthRequest( method, url, callback ){

    var request = createRequest( method, url, callback );
    // если пользователь залогинился - авторизируемся в запросе
    if( cookie.parse( document.cookie ).logged_in === 'yes'){
        request.setRequestHeader('X-WP-Nonce', REST_API_data.nonce);
    }
    return request;
}

/**
 * создаем запрос для получения содержания корзины 
*/
function createGetRequest(){

    var request = createAuthRequest(
        'GET',
        '/wp-json/cocart/v1/get-cart',
        function( event ){
            // если запрос выполнен не полностью - выходим
            if( event.target.readyState != 4) return;
            // если пустой ответ - выходим
            if( event.target.responseText == "" ) return;
            // парсим результат запроса
            var resJSON = JSON.parse(event.target.responseText);
            // рисуем полученные элементы
            render(resJSON);
        }
    );

    return request;
}

/**
 * создаем запрос для обновления корзины 
*/
function createRefreshRequest(){

    var request = createAuthRequest(
        'GET',
        '/wp-json/cocart/v1/get-cart',
        function( event ){
            // если запрос выполнен не полностью - выходим
            if( event.target.readyState != 4) return;
            // если пустой ответ - выходим
            if( event.target.responseText == "" ) return;
            // парсим результат запроса
            var resJSON = JSON.parse(event.target.responseText);
            // рисуем полученные элементы
            render(resJSON);

            for( [key, item] of Object.entries(resJSON) ){

                var updateRequest = createAuthRequest(
                    'POST',
                    '/wp-json/cocart/v1/item',
                    null
                );
                updateRequest.send(JSON.stringify({
                    cart_item_key: key,
                    quantity: item.quantity
                }))
            }

    });

    return request;
}

/**
 * создаем запрос для удаления
*/
function createDelRequest(){

    var request = createAuthRequest(
        'DELETE',
        '/wp-json/cocart/v1/item',
        function(event){

            // если запрос выполнен не полностью - выходим
            if( event.target.readyState != 4) return;
            // получаем содержание корзины
            var getRequest = createGetRequest();
            getRequest.send();
    });

    return request;
}

/**
 * запрос для добавления
 */
function createAddRequest(){

    var request = createAuthRequest(
        'POST', 
        '/wp-json/cocart/v1/add-item',
        function(event){

            // если запрос выполнен не полностью - выходим
            if( event.target.readyState != 4) return;
            // если пустой ответ - выходим
            if( event.target.responseText == "" ) return;
    
            var resJSON = JSON.parse(event.target.responseText);
            // показываем попап
            popup.show(resJSON.product_title + " добавлен в корзину")
            // получаем содержание корзины
            var getRequest = createGetRequest();
            getRequest.send();
    });

    return request;
}

/**
 * Запрос для изменения количества
 */
function createUpdateRequest(callback){

    var request = createAuthRequest(
        'POST',
        '/wp-json/cocart/v1/item',
        callback
    )
    return request;
}

/**
 * Рендеринг корзины 
*/
function render(data){

    // текст кнопки корзины
    var cartButtonText = document.querySelector('.cart-button__text');

    // получаем элемент корзины
    var cartElement = document.querySelector('.cart ul');

    // получаем элемент кнопки заказа
    var checkoutButtonOuter = document.querySelector('.checkout-button__outer');

    // создание внутренних элементов корзины
    var createItem = function( el, cname, text){

        var item = document.createElement(el);
        item.classList.add(cname);
        if ( text ) item.innerHTML = text;
        return item;
    }

    // если корзина пустая
    if ( data.length == 0 ){

        cartElement.innerHTML = 'empty';
        cartButtonText.innerHTML = 'empty';
        checkoutButtonOuter.innerHTML = '';
        return;
    };
    // очищаем список дочерних элементов
    cartElement.innerHTML = '';
    cartButtonText.innerHTML = Object.entries(data).length;

    for ([key, item] of Object.entries(data)){
        
        // создаем элемент списка с дочерними элементами
        var cartItem = createItem('li', 'cart__item');
        var cartItemQuantity = createItem('div', 'cart__item-quantity', item.quantity);
        var cartItemPlus = createItem('button', 'cart__item-plus', '+');
        var cartItemMinus = createItem('button', 'cart__item-minus', '-');
        var cartItemTitle = createItem('div', 'cart__item-title', item.product_title);
        var cartItemPrice = createItem('div', 'cart__item-price', item.line_total);
        var cartItemDelete = createItem('div', 'cart__item-delete', '<button><i class="far fa-times-circle"></i></button>');
        
        // устанавливаем атрибуты data
        cartItem.dataset.key = key;
        cartItem.dataset.qty = item.quantity;

        // добавляем элементы в DOM
        cartItem.appendChild(cartItemTitle);
        cartItem.appendChild(cartItemMinus);
        cartItem.appendChild(cartItemQuantity);
        cartItem.appendChild(cartItemPlus);
        cartItem.appendChild(cartItemPrice);
        cartItem.appendChild(cartItemDelete);
        cartElement.appendChild(cartItem);

        // обработчик кнопки удаления из корзины
        cartItemDelete.addEventListener('click', function(e){
            e.preventDefault();

            var key = e.target.closest('li').dataset.key;
            var delRequest = createDelRequest();
            delRequest.send(JSON.stringify({"cart_item_key": key}));
        });
    
        // обработка кнопок + и -
        cartItemPlus.addEventListener('click', function(e){

            e.preventDefault();
            // получаем значения полей
            var item = e.target.closest('.cart__item');
            var qty = parseInt(item.dataset.qty) + 1;
            var key = item.dataset.key;

            var request = createUpdateRequest( function(e){

                // если запрос выполнен не полностью - выходим
                if( e.target.readyState != 4) return;
                // если пустой ответ - выходим
                if( e.target.responseText == "" ) return;
                // парсим результат запроса
                var res = JSON.parse(e.target.responseText)[key];

                item.dataset.qty = res.quantity;
                item.querySelector('.cart__item-quantity').innerText = res.quantity;
                item.querySelector('.cart__item-price').innerText = res.line_total;
            });

            request.send(JSON.stringify({
                cart_item_key: key,
                quantity: qty,
                return_cart: true
            }))
        });
        cartItemMinus.addEventListener('click', function(e){

            e.preventDefault();
            // получаем значения полей
            var item = e.target.closest('.cart__item');
            var qty = parseInt(item.dataset.qty);
            if( qty <= 1 ) return;
            qty--;
            var key = item.dataset.key;

            var request = createUpdateRequest( function(e){

                // если запрос выполнен не полностью - выходим
                if( e.target.readyState != 4) return;
                // если пустой ответ - выходим
                if( e.target.responseText == "" ) return;
                // парсим результат запроса
                var res = JSON.parse(e.target.responseText)[key];

                item.dataset.qty = res.quantity;
                item.querySelector('.cart__item-quantity').innerText = res.quantity;
                item.querySelector('.cart__item-price').innerText = res.line_total;
            });

            request.send(JSON.stringify({
                cart_item_key: key,
                quantity: qty,
                return_cart: true
            }))
        });
    };

    // добавляем кнопку заказа
    checkoutButtonOuter.innerHTML = '<a class="checkout-button transparrent-button" href="/checkout">Checkout</a>';
}

 module.exports = {

    /**
     * Init
     */
    init: function(){

        // если перешли после авторизации
        if( window.location.href.match('cocart-load-cart=') ){
            
            // обновляем содержимое корзины
            var getRequest = createRefreshRequest();
        } else {
            
            // иначе просто получаем содержимое корзины
            var getRequest = createGetRequest();
        }
        getRequest.send();
    },

    // добавление в корзину
    add: function( id, qty ){

        if ( !id ) return;
        
        var requestData = {

            "product_id": id
        }

        if ( qty && qty > 0 ){

            Object.assign(requestData, {"quantity": qty})
        }

        var addRequest = createAddRequest();
        addRequest.send(JSON.stringify(requestData));
    }

 }