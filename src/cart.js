/**
 * 
 * Cart
 * 
 */


/**
 * создаем запрос для получения содержания корзины 
*/
function createGetRequest(){

    var request = new XMLHttpRequest();
    request.open( 'GET', '/wp-json/cocart/v1/get-cart' );
    request.setRequestHeader('Content-Type', 'application/json');

    request.addEventListener("readystatechange", function(event){

        // если запрос выполнен не полностью - выходим
        if( event.target.readyState != 4) return;
        // если пустой ответ - выходим
        if( event.target.responseText == "" ) return;
        // парсим результат запроса
        var resJSON = JSON.parse(event.target.responseText);
        // рисуем полученные элементы
        render(resJSON);

    });

    return request;
}

/**
 * создаем запрос для удаления
*/
function createDelRequest(){

    var request = new XMLHttpRequest();
    request.open('DELETE', '/wp-json/cocart/v1/item');
    request.setRequestHeader('Content-Type', 'application/json');

    request.addEventListener('readystatechange', function(event){

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

    var request = new XMLHttpRequest();
    request.open('POST', '/wp-json/cocart/v1/add-item');
    request.setRequestHeader('Content-Type', 'application/json');

    request.addEventListener('readystatechange', function(event){

        // если запрос выполнен не полностью - выходим
        if( event.target.readyState != 4) return;
        // получаем содержание корзины
        var getRequest = createGetRequest();
        getRequest.send();
    });

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
        return;
    };
    // очищаем список дочерних элементов
    cartElement.innerHTML = '';
    cartButtonText.innerHTML = Object.entries(data).length;

    for ([key, item] of Object.entries(data)){
        
        // создаем элемент списка с дочерними элементами
        var cartItem = createItem('li', 'cart__item');
        var cartItemTitle = createItem('div', 'cart__item-title', item.product_title);
        var cartItemPrice = createItem('div', 'cart__item-price', item.line_total);
        var cartItemDelete = createItem('div', 'cart__item-delete', '<button><i class="far fa-times-circle"></i></button>');
        
        // устанавливаем атрибут data с идентификатором товара
        cartItem.dataset.key = key;

        // добавляем элементы в DOM
        cartItem.appendChild(cartItemTitle);
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
    };
}

 module.exports = {

    /**
     * Init
     */
    init: function(){

        // получаем корзину
        var getRequest = createGetRequest();
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