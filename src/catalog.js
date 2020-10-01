/**
 * 
 * Инициализация карточек товаров в каталоге
 * 
 */
var cart = require("./cart.js");
var catalogCard = require("./catalogCard.js");
var lookbookCard = require("./lookbookCard.js");


/**
 * Запрос из каталога
 */
function createGetRequest( url, callback){

    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener("readystatechange", callback);
    return request;
}

/**
 * добавление обработчиков событий в карточках товаров
 */
function addCardListeners(){

    // получаем карточки товаров
    var catalogPrevs = document.querySelectorAll('.catalog-card__preview');

    catalogPrevs.forEach(function(item){

        // получаем изображения для каждой карточки
        var thumbs = item.querySelectorAll('.catalog-card__thumbs ul li img');
        var previewItem = item;
        
        thumbs.forEach(function(thumb){

            thumb.addEventListener('click', function(e){

                e.preventDefault();
                previewItem.style.backgroundImage = 'url('+thumb.src+')';
            });
        });
    });

    // обработка нажатия на кнопку ДОБАВИТЬ В КОРЗИНУ
    var toCartBtn = document.querySelectorAll('.catalog-card__to-cart');

    toCartBtn.forEach( function( item ){

        item.addEventListener('click', function(e){
            
            var el = e.target.closest('.catalog-card__to-cart' );
            if ( el ){

                cart.add(el.dataset.product_id)
            }
        });
    });
}

/**
 * Добавление обработчиков кнопок категорий
 */
function addCategoriesListeners( args ){

    // определяем конфигурации функции
    var conf = Object.assign( {
        lookbook: false
    }, args  );

     // кнопка категорий в мобильной версии
     var categoriesBtn = document.querySelector('.catalog-categories__show-button');
     
     var categoriesList = document.querySelector('.catalog-categories__list');
     var categoriesListItems = document.querySelectorAll('.catalog-categories__list a');
 
     if ( categoriesBtn !== null){
     
         categoriesBtn.addEventListener('click', function(e){
             e.preventDefault();
             categoriesList.classList.toggle('show');
             
         });
     }

     categoriesListItems.forEach(function( item ){

        item.addEventListener('click', function(event){
            event.preventDefault();

            var category = event.target.dataset.category;
            getCategoryItems({
                category: category,
                lookbook: conf.lookbook
            });
        });
     });
}

/**
 * Получение товаров/лукбуков категории
 */
function getCategoryItems( args ){

    // определяем конфигурации функции
    var conf = Object.assign( {
        lookbook: false,
        category: 'all'
    }, args  );

    // получаем элемент каталога
    var catalogCards = document.querySelector('.catalog-cards');

    // определяем url для запроса
    if ( conf.lookbook ){
        var reqUrl = '/wp-json/lookbook/v1/get/' + conf.category;
    } else {
        var reqUrl = '/wp-json/catalog/v1/get/' + conf.category;
    }

    // создаем запрос
    var catalogRequest = createGetRequest( reqUrl, function( event ){

        // если запрос выполнен не полностью - выходим
        if( event.target.readyState != 4) return;
        // если пустой ответ - выходим
        if( event.target.responseText == "" ) return;

        var resJSON = JSON.parse(event.target.responseText);

        // очищае текущий элемент каталога
        catalogCards.innerHTML = '';

        // если каталог лукбуков - добавляем карточки лукбуков
        if( conf.lookbook ){
            for( [index, item] of Object.entries( resJSON )){

                catalogCards.appendChild( lookbookCard.create( item ) );
            }

        } else {

            // иначе выводим товары
            for( [index, product] of Object.entries( resJSON )){
                
                catalogCards.appendChild( catalogCard.create( product ) );
            }
        }

        // добавляем обработчики событий
        addCardListeners();

    });

    // отпраавляем запрос
    catalogRequest.send();

}

module.exports ={

    init: function(){

        var fpCatalog = document.querySelector('.fp-catalog');
        var catalog = document.querySelector('.catalog');
        var lbCatalog = document.querySelector('.lb-catalog');
        
        if ( fpCatalog ) {
            // если главная страница - подгружаем каталог динамически
            addCategoriesListeners();
            getCategoryItems();

        } else if ( lbCatalog ){
             // если каталог лукбуков
             addCategoriesListeners( {lookbook: true} );
             getCategoryItems( {lookbook: true} );
            
        } else if ( catalog ){
            // если страница каталога - просто добавляем обработчики событий
            addCardListeners();
        }
        

    }
}
