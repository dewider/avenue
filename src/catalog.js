/**
 * 
 * Инициализация карточек товаров в каталоге
 * 
 */
var cart = require("./cart.js");
var ajax = require("./ajax.js");
var catalogCard = require("./catalogCard.js");
var lookbookCard = require("./lookbookCard.js");

/**
 * Запрос из каталога
 */
function createGetRequest( url, callback){

    var request = ajax.createRequest('GET', url, callback);
    return request;
}

/**
 * Класс каталога
 */
class Catalog{

    constructor(){
        this.fpCatalog = document.querySelector('.fp-catalog');
        this.catalog = document.querySelector('.catalog');
        this.lbCatalog = document.querySelector('.lb-catalog');
    }

    /**
    * добавление обработчиков событий в карточках товаров
    */
    addCardListeners(){

        // получаем карточки товаров
        let catalogPrevs = this.catalog.querySelectorAll('.catalog-card__preview');

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
        var toCartBtn = this.catalog.querySelectorAll('.catalog-card__to-cart');

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
    addCategoriesListeners( args ){

        // определяем конфигурации функции
        var conf = Object.assign( {
            lookbook: false
        }, args  );

        // кнопка категорий в мобильной версии
        var categoriesBtn = this.catalog.querySelector('.catalog-categories__show-button');
        var categoriesList = this.catalog.querySelector('.catalog-categories__list');
        var categoriesListItems = this.catalog.querySelectorAll('.catalog-categories__list a');

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
    getCategoryItems( args ){

        // определяем конфигурации функции
        let conf = Object.assign( {
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

        // сохраняем this в parrent
        var parrent = this; 
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

                resJSON.forEach ( function( item ){

                    catalogCards.appendChild( lookbookCard.create( item ) );
                });
            } else {
    
                // иначе выводим товары
                resJSON.forEach ( function( product ){

                    catalogCards.appendChild( catalogCard.create( product ) );
                });
            }
    
            // добавляем обработчики событий
            parrent.addCardListeners();
    
        });
    
        // отпраавляем запрос
        catalogRequest.send();
    
    }
}

/**
 * Проверка на скрол к нижнему краю лукбука
 */
function isCatalogBotton(){

    var lbCatalog = document.querySelector( '.lb-catalog' );
    var catalogPosition = lbCatalog.getBoundingClientRect();
    var catalogBottomOffset = catalogPosition.top + catalogPosition.height;

    if( catalogBottomOffset <= window.innerHeight + 200 ){
        console.log('scroll');
    }
}

/**
 * Загрузка лукбуков при скролле
 */
function addScrollListener(){
    
    window.addEventListener('scroll', function( e ){

       isCatalogBotton();
    });
}

module.exports ={

    init: function(){

        let catalog = new Catalog;
        /*
        var fpCatalog = document.querySelector('.fp-catalog');
        var catalog = document.querySelector('.catalog');
        var lbCatalog = document.querySelector('.lb-catalog');
        */
        if ( catalog.fpCatalog ) {
            // если главная страница - подгружаем каталог динамически
            catalog.addCategoriesListeners();
            catalog.getCategoryItems();

        } else if ( catalog.lbCatalog ){
            // если каталог лукбуков
            catalog.addCategoriesListeners( {lookbook: true} );
            catalog.getCategoryItems( {lookbook: true} );
            addScrollListener();
            
        } else if ( catalog.catalog ){
            // если страница каталога - просто добавляем обработчики событий
            catalog.addCardListeners();
        }
        

    }
}
