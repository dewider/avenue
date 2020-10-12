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
        // текущая страница каталога для динамической загрузки
        this.currentPage = 1;
        // каталог загружается
        this.isLoad = false;
        // текущая категория
        this.currentCategory = 'all';
        // выданы все элементы каталога
        this.isEnd = false;

        if ( this.fpCatalog ) {
            // если главная страница - подгружаем каталог динамически
            this.addCategoriesListeners();
            this.getCategoryItems();

        } else if ( this.lbCatalog ){
            // если каталог лукбуков
            this.addCategoriesListeners( {lookbook: true} );
            this.getCategoryItems( {lookbook: true} );
            this.addScrollListener();
            
        } else if ( this.catalog ){
            // если страница каталога - просто добавляем обработчики событий
            this.addCardListeners();
        }
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
        var parrent = this;
        categoriesListItems.forEach(function( item ){
           item.addEventListener('click', function(event){
               event.preventDefault();
               var category = event.target.dataset.category;
               parrent.currentCategory = category;
               parrent.getCategoryItems({
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
        var conf = Object.assign( {
            lookbook: false,
            page: 1
        }, args  );
    
        // получаем элемент каталога
        var catalogCards = this.catalog.querySelector('.catalog-cards');

        // определяем url для запроса
        if ( conf.lookbook ){
            if ( conf.page ){

                var reqUrl = '/wp-json/lookbook/v1/get/' + this.currentCategory + '/' + conf.page;
            } else {
                
                var reqUrl = '/wp-json/lookbook/v1/get/' + this.currentCategory;
            }
        } else {
            var reqUrl = '/wp-json/catalog/v1/get/' + this.currentCategory;
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
    
            // очищае текущий элемент каталога если первая страница
            if( conf.page == 1 ){
                catalogCards.innerHTML = '';
            }
    
            // если каталог лукбуков - добавляем карточки лукбуков
            if( conf.lookbook ){

                resJSON.forEach ( function( item ){

                    // если последний элемент - устанавливаем атрибуит isEnd
                    if( item.isEnd ) parrent.isEnd = true;

                    catalogCards.appendChild( lookbookCard.create( item ) );
                });
            } else {
    
                // иначе выводим товары
                resJSON.forEach ( function( product ){

                    // если последний элемент - устанавливаем атрибуит isEnd
                    if( item.isEnd ) parrent.isEnd = true;

                    catalogCards.appendChild( catalogCard.create( product ) );
                });
            }

            //устанавливаем значение номера текущей страницы
            parrent.currentPage = conf.page;
    
            // добавляем обработчики событий
            parrent.addCardListeners();

            // убираем флаг isLoad
            parrent.isLoad = false;
    
        });
    
        // отпраавляем запрос
        catalogRequest.send();
    
    }

    /**
     * Проверка на скрол к нижнему краю лукбука
     */
    isCatalogBotton(){

        var catalogPosition = this.lbCatalog.getBoundingClientRect();
        var catalogBottomOffset = catalogPosition.top + catalogPosition.height;

        if( catalogBottomOffset <= window.innerHeight + 200 ){
            return true;
        }
        return false;
    }

    /**
     * Загрузка лукбуков при скролле
     */
    addScrollListener(){

        var parrent = this;
        window.addEventListener('scroll', function( e ){

           if( parrent.isCatalogBotton() && !parrent.isLoad && !parrent.isEnd){

            parrent.isLoad = true;
            parrent.getCategoryItems({
                page: parrent.currentPage + 1,
                lookbook: true
            })
           }
        });
    }
}

module.exports ={

    init: function(){

        let catalog = new Catalog;        

    }
}
