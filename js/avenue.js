/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/cart.js":
/*!*********************!*\
  !*** ./src/cart.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\r\n * \r\n * Cart\r\n * \r\n */\r\n\r\n\r\n/**\r\n * создаем запрос для получения содержания корзины \r\n*/\r\nfunction createGetRequest(){\r\n\r\n    var request = new XMLHttpRequest();\r\n    request.open( 'GET', '/wp-json/cocart/v1/get-cart' );\r\n    request.setRequestHeader('Content-Type', 'application/json');\r\n\r\n    request.addEventListener(\"readystatechange\", function(event){\r\n\r\n        // если запрос выполнен не полностью - выходим\r\n        if( event.target.readyState != 4) return;\r\n        // если пустой ответ - выходим\r\n        if( event.target.responseText == \"\" ) return;\r\n        // парсим результат запроса\r\n        var resJSON = JSON.parse(event.target.responseText);\r\n        // рисуем полученные элементы\r\n        render(resJSON);\r\n\r\n    });\r\n\r\n    return request;\r\n}\r\n\r\n/**\r\n * создаем запрос для удаления\r\n*/\r\nfunction createDelRequest(){\r\n\r\n    var request = new XMLHttpRequest();\r\n    request.open('DELETE', '/wp-json/cocart/v1/item');\r\n    request.setRequestHeader('Content-Type', 'application/json');\r\n\r\n    request.addEventListener('readystatechange', function(event){\r\n\r\n        // если запрос выполнен не полностью - выходим\r\n        if( event.target.readyState != 4) return;\r\n        // получаем содержание корзины\r\n        var getRequest = createGetRequest();\r\n        getRequest.send();\r\n    });\r\n\r\n    return request;\r\n}\r\n\r\n/**\r\n * запрос для добавления\r\n */\r\nfunction createAddRequest(){\r\n\r\n    var request = new XMLHttpRequest();\r\n    request.open('POST', '/wp-json/cocart/v1/add-item');\r\n    request.setRequestHeader('Content-Type', 'application/json');\r\n\r\n    request.addEventListener('readystatechange', function(event){\r\n\r\n        // если запрос выполнен не полностью - выходим\r\n        if( event.target.readyState != 4) return;\r\n        // получаем содержание корзины\r\n        var getRequest = createGetRequest();\r\n        getRequest.send();\r\n    });\r\n\r\n    return request;\r\n}\r\n\r\n/**\r\n * Рендеринг корзины \r\n*/\r\nfunction render(data){\r\n\r\n    // текст кнопки корзины\r\n    var cartButtonText = document.querySelector('.cart-button__text');\r\n\r\n    // получаем элемент корзины\r\n    var cartElement = document.querySelector('.cart ul');\r\n\r\n    // создание внутренних элементов корзины\r\n    var createItem = function( el, cname, text){\r\n\r\n        var item = document.createElement(el);\r\n        item.classList.add(cname);\r\n        if ( text ) item.innerHTML = text;\r\n        return item;\r\n    }\r\n\r\n    // если корзина пустая\r\n    if ( data.length == 0 ){\r\n\r\n        cartElement.innerHTML = 'empty';\r\n        cartButtonText.innerHTML = 'empty';\r\n        return;\r\n    };\r\n    // очищаем список дочерних элементов\r\n    cartElement.innerHTML = '';\r\n    cartButtonText.innerHTML = Object.entries(data).length;\r\n\r\n    for ([key, item] of Object.entries(data)){\r\n        \r\n        // создаем элемент списка с дочерними элементами\r\n        var cartItem = createItem('li', 'cart__item');\r\n        var cartItemTitle = createItem('div', 'cart__item-title', item.product_title);\r\n        var cartItemPrice = createItem('div', 'cart__item-price', item.line_total);\r\n        var cartItemDelete = createItem('div', 'cart__item-delete', '<button><i class=\"far fa-times-circle\"></i></button>');\r\n        \r\n        // устанавливаем атрибут data с идентификатором товара\r\n        cartItem.dataset.key = key;\r\n\r\n        // добавляем элементы в DOM\r\n        cartItem.appendChild(cartItemTitle);\r\n        cartItem.appendChild(cartItemPrice);\r\n        cartItem.appendChild(cartItemDelete);\r\n        cartElement.appendChild(cartItem);\r\n\r\n        // обработчик кнопки удаления из корзины\r\n        cartItemDelete.addEventListener('click', function(e){\r\n            e.preventDefault();\r\n\r\n            var key = e.target.closest('li').dataset.key;\r\n            var delRequest = createDelRequest();\r\n            delRequest.send(JSON.stringify({\"cart_item_key\": key}));\r\n        });\r\n    };\r\n}\r\n\r\n module.exports = {\r\n\r\n    /**\r\n     * Init\r\n     */\r\n    init: function(){\r\n\r\n        // получаем корзину\r\n        var getRequest = createGetRequest();\r\n        getRequest.send();\r\n    },\r\n\r\n    // добавление в корзину\r\n    add: function( id, qty ){\r\n\r\n        if ( !id ) return;\r\n        \r\n        var requestData = {\r\n\r\n            \"product_id\": id\r\n        }\r\n\r\n        if ( qty && qty > 0 ){\r\n\r\n            Object.assign(requestData, {\"quantity\": qty})\r\n        }\r\n\r\n        var addRequest = createAddRequest();\r\n        addRequest.send(JSON.stringify(requestData));\r\n    }\r\n\r\n }\n\n//# sourceURL=webpack:///./src/cart.js?");

/***/ }),

/***/ "./src/catalog.js":
/*!************************!*\
  !*** ./src/catalog.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\r\n * \r\n * Инициализация карточек товаров в каталоге\r\n * \r\n */\r\nvar cart = __webpack_require__(/*! ./cart.js */ \"./src/cart.js\");\r\nvar catalogCard = __webpack_require__(/*! ./catalogCard.js */ \"./src/catalogCard.js\");\r\n\r\n\r\n/**\r\n * Запрос товаров из каталога\r\n */\r\nfunction createGetRequest(category, callback){\r\n\r\n    var request = new XMLHttpRequest();\r\n    request.open('GET', '/wp-json/catalog/v1/get/'+category);\r\n    request.setRequestHeader('Content-Type', 'application/json');\r\n    request.addEventListener(\"readystatechange\", callback);\r\n    return request;\r\n}\r\n\r\n/**\r\n * добавление обработчиков событий в карточках товаров\r\n */\r\nfunction addCardListeners(){\r\n\r\n    // получаем карточки товаров\r\n    var catalogPrevs = document.querySelectorAll('.catalog-card__preview');\r\n\r\n    catalogPrevs.forEach(function(item){\r\n\r\n        // получаем изображения для каждой карточки\r\n        var thumbs = item.querySelectorAll('.catalog-card__thumbs ul li img');\r\n        var previewItem = item;\r\n        \r\n        thumbs.forEach(function(thumb){\r\n\r\n            thumb.addEventListener('click', function(e){\r\n\r\n                e.preventDefault();\r\n                previewItem.style.backgroundImage = 'url('+thumb.src+')';\r\n            });\r\n        });\r\n    });\r\n\r\n    // обработка нажатия на кнопку ДОБАВИТЬ В КОРЗИНУ\r\n    var toCartBtn = document.querySelectorAll('.catalog-card__to-cart');\r\n\r\n    toCartBtn.forEach( function( item ){\r\n\r\n        item.addEventListener('click', function(e){\r\n            \r\n            var el = e.target.closest('.catalog-card__to-cart' );\r\n            if ( el ){\r\n\r\n                cart.add(el.dataset.product_id)\r\n            }\r\n        });\r\n    });\r\n}\r\n\r\n/**\r\n * Добавление обработчиков кнопок категорий\r\n */\r\nfunction addCategoriesListeners(){\r\n\r\n     // кнопка категорий в мобильной версии\r\n     var categoriesBtn = document.querySelector('.catalog-categories__show-button');\r\n     \r\n     var categoriesList = document.querySelector('.catalog-categories__list');\r\n     var categoriesListItems = document.querySelectorAll('.catalog-categories__list a');\r\n \r\n     if ( categoriesBtn !== null){\r\n     \r\n         categoriesBtn.addEventListener('click', function(e){\r\n             e.preventDefault();\r\n             categoriesList.classList.toggle('show');\r\n             \r\n         });\r\n     }\r\n\r\n     categoriesListItems.forEach(function( item ){\r\n\r\n        item.addEventListener('click', function(event){\r\n            event.preventDefault();\r\n\r\n            getProductsCategory(event.target.dataset.category);\r\n        });\r\n     });\r\n}\r\n\r\n/**\r\n * Получение товаров по категории\r\n */\r\nfunction getProductsCategory( category ){\r\n\r\n    // получаем элемент каталога\r\n    var catalogCards = document.querySelector('.catalog-cards');\r\n\r\n    var catalogRequest = createGetRequest( category, function( event ){\r\n\r\n        // если запрос выполнен не полностью - выходим\r\n        if( event.target.readyState != 4) return;\r\n        // если пустой ответ - выходим\r\n        if( event.target.responseText == \"\" ) return;\r\n\r\n        var resJSON = JSON.parse(event.target.responseText);\r\n\r\n        // очищае текущий элемент каталога\r\n        catalogCards.innerHTML = '';\r\n\r\n        // выводим товары\r\n        for( [index, product] of Object.entries( resJSON )){\r\n\r\n            catalogCards.appendChild( catalogCard.create( product ) );\r\n        }\r\n\r\n        // добавляем обработчики событий\r\n        addCardListeners();\r\n\r\n    });\r\n\r\n    // отпраавляем запрос\r\n    catalogRequest.send();\r\n\r\n}\r\n\r\nmodule.exports ={\r\n\r\n    init: function(){\r\n\r\n        var fpCatalog = document.querySelector('.fp-catalog');\r\n        var catalog = document.querySelector('.catalog');\r\n        \r\n        if ( fpCatalog ) {\r\n            // если главная страница - подгружаем каталог динамически\r\n            addCategoriesListeners();\r\n            getProductsCategory('all');\r\n            \r\n        } else if ( catalog ){\r\n            // если страница каталога - просто добавляем обработчики событий\r\n            addCardListeners();\r\n        }\r\n        \r\n\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/catalog.js?");

/***/ }),

/***/ "./src/catalogCard.js":
/*!****************************!*\
  !*** ./src/catalogCard.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\r\n * Catalog card\r\n */\r\n\r\n module.exports = {\r\n\r\n    create: function( product ){\r\n\r\n        var card = document.createElement('li');\r\n        card.classList.add('catalog-cards__item');\r\n        card.classList.add('catalog-card');\r\n\r\n        var price = '<span class=\"price\"><sup>£</sup>' + product.price + '</span>';\r\n        // если действует акция\r\n        if ( product.price != product.regularPrice ){\r\n\r\n            price = '<span class=\"price old-price\"><sup>£</sup>' + product.regularPrice + '</span>' + price;\r\n        }\r\n        card.innerHTML = `\r\n        <div class=\"catalog-card__wrap\">\r\n\r\n\t    \t<a href=\"${product.url}\" class=\"catalog-card__preview-wrap\">\r\n\t    \t\t<div class=\"catalog-card__preview\" style=\"background-image: url(${product.thumb});\">\r\n                    <div class=\"catalog-card__price\">\r\n\t    \t\t\t\t${price}\r\n\t    \t\t\t</div>\r\n\t    \t\t\t<div class=\"catalog-card__thumbs\">\r\n\t    \t\t\t\t<ul>\r\n\t    \t\t\t\t\t<li><img src=\"${product.thumb}\" alt=\"\"></li>\r\n\t    \t\t\t\t\t<li><img src=\"${product.gallery}\" alt=\"\"></li>\r\n\t    \t\t\t\t</ul>\r\n\t    \t\t\t</div>\r\n\t    \t\t\t<button class=\"catalog-card__info-icon\">\r\n\t    \t\t\t\t<i class=\"fas fa-info-circle\"></i>\r\n\t    \t\t\t</button>\r\n\t    \t\t</div><!-- catalog-card__preview -->\r\n\t    \t</a>\r\n\t    \t<div class=\"catalog-card__desc\">\r\n                <h2>\r\n                    ${product.title} <span class=\"price\"><sup>£</sup>${product.price}</span>\r\n                </h2>\r\n                    ${product.desc}\r\n                <div class=\"catalog-card__buttons\">\r\n                    <ul>\r\n                        <li><button class=\"catalog-card__to-cart\" data-product_id=\"${product.ID}\" data-quantity=\"1\" rel=\"nofollow\"><i class=\"fas fa-shopping-cart\"></i></button></li>\r\n                        <li><button><i class=\"far fa-heart\"></i></button></li>\r\n                        <li><button><i class=\"fas fa-compress-alt\"></i></button></li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n\t    </div><!-- catalog-card__wrap -->\r\n        `;\r\n\r\n        return card;\r\n    }\r\n }\n\n//# sourceURL=webpack:///./src/catalogCard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\r\n * Entry webpack\r\n */\r\n\r\nvar menu = __webpack_require__(/*! ./menu.js */ \"./src/menu.js\");\r\nvar cart = __webpack_require__(/*! ./cart.js */ \"./src/cart.js\");\r\nvar catalog = __webpack_require__(/*! ./catalog.js */ \"./src/catalog.js\");\r\nvar product = __webpack_require__(/*! ./product/product.js */ \"./src/product/product.js\");\r\nvar signup = __webpack_require__(/*! ./signup/signup.js */ \"./src/signup/signup.js\");\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', function(){\r\n\r\n    menu.init();\r\n\r\n    // корзина\r\n    cart.init();\r\n    \r\n    // инициализация страницы товара\r\n    product.init();\r\n\r\n    // Инициализация карточек товара\r\n    catalog.init();\r\n\r\n    // Инициализация форм авторизации\r\n    signup.init();\r\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/menu.js":
/*!*********************!*\
  !*** ./src/menu.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\r\n * Header menu\r\n */\r\n\r\n module.exports = {\r\n\r\n    init: function(){\r\n\r\n        // добавляем обработчик нажатия кнопки меню\r\n        var showMenuButton = document.querySelector('.show-menu-button');\r\n        var closeMenuButton = document.querySelector('.close-menu-button');\r\n        var menu = document.querySelector('.header-menu__wrap');\r\n        \r\n        showMenuButton.addEventListener('click', function(e){\r\n            e.preventDefault();\r\n            \r\n            menu.classList.add('show');\r\n        });\r\n    \r\n        closeMenuButton.addEventListener('click', function(e){\r\n            e.preventDefault();\r\n            \r\n            menu.classList.remove('show');\r\n        });\r\n    }\r\n }\n\n//# sourceURL=webpack:///./src/menu.js?");

/***/ }),

/***/ "./src/product/product.js":
/*!********************************!*\
  !*** ./src/product/product.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\r\n * Product\r\n */\r\nvar cart = __webpack_require__(/*! ../cart.js */ \"./src/cart.js\");\r\nvar productPreview = __webpack_require__(/*! ./productPreview.js */ \"./src/product/productPreview.js\");\r\n\r\n /**\r\n  * обработчики событий элементов\r\n  */\r\nfunction addListeners(){\r\n\r\n\r\n    // обработчик кнопок QTY\r\n    var qtyInput = document.querySelector('#qtyInput');\r\n    var qtyPlusBtn = document.querySelector('.qty-selector__up');\r\n    var qtyMinusBtn = document.querySelector('.qty-selector__down');\r\n\r\n    if ( qtyInput !== null){\r\n\r\n        qtyPlusBtn.addEventListener('click', function(e){\r\n\r\n            e.preventDefault();\r\n            qtyInput.value++;\r\n        });\r\n\r\n        qtyMinusBtn.addEventListener('click', function(e){\r\n\r\n            e.preventDefault();\r\n            if (qtyInput.value > 1) qtyInput.value--;\r\n        });\r\n    }\r\n\r\n    // кнопка ДОБАВИТЬ В КОРЗИНУ\r\n    var toCartButton = document.querySelector('.product__buttons .add-to-cart');\r\n    \r\n    toCartButton.addEventListener('click', function(e){\r\n\r\n        e.preventDefault();\r\n\r\n        // получаем QTY\r\n        var qtyInput = document.querySelector('#qtyInput');\r\n        var qty = qtyInput.value;\r\n\r\n        var toCartButton = e.target.closest('.add-to-cart');\r\n        if ( toCartButton ){\r\n            // добавляем в корзину по атрибуту кнопки data-product_id\r\n            cart.add(toCartButton.dataset.product_id, qty);\r\n        }\r\n    });\r\n}\r\n\r\nmodule.exports = {\r\n\r\n    init: function(){\r\n\r\n        var product = document.querySelector('.product');\r\n        if ( !product ) return;\r\n        addListeners();\r\n        productPreview.init();\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/product/product.js?");

/***/ }),

/***/ "./src/product/productPreview.js":
/*!***************************************!*\
  !*** ./src/product/productPreview.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\r\n * Product preview\r\n */\r\n\r\n/**\r\n * Получаем ссылки на картинки\r\n */\r\nfunction getGallery( list ){\r\n\r\n    // создаем объект для рабты с ссылками\r\n    var res = {\r\n\r\n        current: 0,\r\n        links: [],\r\n\r\n        // возвращает ссылку на следующую картинку галереи\r\n        next: function(){\r\n\r\n            this.current++;\r\n            if ( this.current >= this.links.length ) this.current = 0;\r\n            return this.links[this.current];\r\n        },\r\n\r\n        // возвращает предыдущую\r\n        prev: function(){\r\n\r\n            this.current--;\r\n            if ( this.current < 0 ) this.current = this.links.length - 1;\r\n            return this.links[this.current];\r\n        }\r\n    }\r\n\r\n    // получаем ссылки\r\n    list.forEach( function( item ){\r\n\r\n        res.links.push(item.innerHTML);\r\n    });\r\n\r\n    return res;\r\n}\r\n\r\nmodule.exports = {\r\n\r\n    init: function(){\r\n\r\n        // получаем элементы\r\n        var preview = document.querySelector('.product-preview');\r\n        var list = document.querySelectorAll('ul.product-preview__links li');\r\n        var prevButton = document.querySelector('.product-preview__prev');\r\n        var nextButton = document.querySelector('.product-preview__next');\r\n\r\n        // получаем галерею картинок\r\n        var gallery =  getGallery( list );\r\n\r\n        // обработчики нажатия назад-вперед\r\n        prevButton.addEventListener('click', function(e){\r\n\r\n            e.preventDefault();\r\n            preview.style.backgroundImage = 'url(' + gallery.prev() + ')';\r\n        });\r\n        nextButton.addEventListener('click', function(e){\r\n\r\n            e.preventDefault();\r\n            preview.style.backgroundImage = 'url(' + gallery.next() + ')';\r\n\r\n        });\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/product/productPreview.js?");

/***/ }),

/***/ "./src/signup/signup.js":
/*!******************************!*\
  !*** ./src/signup/signup.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\r\n * Обраотка форм регистрации\r\n */\r\n\r\n\r\n/**\r\n * Проверка введенных данных\r\n */\r\nfunction checkForm ( data ){\r\n\r\n    // если нет даннных - выходим\r\n    if ( !data ) return;\r\n\r\n    // результат проверок\r\n    res = {\r\n        email: false,\r\n        pass: false,\r\n        confirm: false,\r\n    };\r\n\r\n    // проверка корректности email\r\n    if ( data.email ){\r\n\r\n        if ( data.email.match(/\\S+@\\S+\\.\\S+/) ){\r\n\r\n            res.email = true;\r\n        }\r\n    }\r\n\r\n    // проверка корректности пароля и подтвержения\r\n    if ( data.pass && data.confirm ){\r\n        \r\n        // проверяем снова\r\n        if ( data.pass === data.confirm && !data.pass.match(/\\s/g) ){\r\n\r\n            res.pass = true;\r\n            res.confirm = true;            \r\n        }\r\n    }\r\n\r\n    // устанавливаем атрибут корректности данных вцелом\r\n    var correct = true;\r\n    for ([key, value] of Object.entries(res)){\r\n\r\n        if ( value == false ) correct = false;\r\n    }\r\n    Object.assign( res, {isCorrect: correct})\r\n\r\n    return res;\r\n}\r\n\r\n/**\r\n * Отображение ошибок\r\n */\r\nfunction showErrors ( data ){\r\n\r\n    // если нет даннных - выходим\r\n    if ( !data ) return;\r\n\r\n    var emailField = document.querySelector('.login__register form input[name=email]');\r\n    var passField = document.querySelector('.login__register form input[name=pass]');\r\n    var confirmField = document.querySelector('.login__register form input[name=confirm_pass]');\r\n    var messageField = document.querySelector('.login__register .login-form__error-message');\r\n    var message = '';\r\n\r\n    if ( data.message ) message = data.message+'\\n';\r\n    \r\n    if ( data.email == false ){\r\n\r\n        emailField.classList.add('error');\r\n        message = message + 'Некорректный Email\\n';\r\n    } else {\r\n        emailField.classList.remove('error');\r\n    }\r\n\r\n    if ( data.pass == false ){\r\n\r\n        passField.classList.add('error');\r\n        message = message + 'Некорректный пароль\\n';\r\n    } else {\r\n\r\n        passField.classList.remove('error');\r\n    }\r\n\r\n    if ( data.confirm == false ){\r\n\r\n        confirmField.classList.add('error');\r\n        message = message + 'Подтверждение пароля не совпадает\\n';\r\n    } else {\r\n\r\n        confirmField.classList.remove('error');\r\n    } \r\n\r\n    messageField.innerText = message;\r\n\r\n}\r\n\r\n/**\r\n * Запрос регистрации нового пользователя\r\n */\r\nfunction newUserRequest( callback ){\r\n\r\n    var request = new XMLHttpRequest();\r\n    request.open( 'POST', '/wp-json/users/v1/add');\r\n    request.setRequestHeader('Content-Type', 'application/json');\r\n    request.addEventListener('readystatechange', callback);\r\n    return request;\r\n}\r\n\r\n/**\r\n * Форма регистрации\r\n */\r\nfunction initRegisterForm(){\r\n\r\n    var form = document.querySelector('.login__register form');\r\n    \r\n    // Если формы нет на странице - выходим\r\n    if ( !form ) return;\r\n\r\n    var submitButton = document.querySelector('.login__register .login-form__submit button');\r\n\r\n    // Обработка нажатия на кнопку отправки\r\n    submitButton.addEventListener('click', function(e){\r\n\r\n        e.preventDefault();\r\n\r\n        // получаем значения полей формы\r\n        var formFields = {\r\n            email: form.email.value,\r\n            pass: form.pass.value,\r\n            confirm: form.confirm_pass.value,\r\n            signup: form.sign_updates.checked\r\n        };\r\n        // проверяем корректность данных формы\r\n        var res = checkForm(formFields);\r\n\r\n        // выводим ошибки\r\n        showErrors(res);\r\n\r\n        // Если данные корректные - отправляем запрос на сервер\r\n        if ( res.isCorrect ){\r\n\r\n            var request = newUserRequest( function(e){\r\n\r\n                // обработка ответа сервера\r\n\r\n                // если запрос выполнен не полностью - выходим\r\n                if( e.target.readyState != 4) return;\r\n                // если пустой ответ - выходим\r\n                if( e.target.responseText == \"\" ) return;\r\n                // парсим результат запроса\r\n                var resJSON = JSON.parse(e.target.responseText);\r\n                // показываем ошибки\r\n                showErrors(resJSON);\r\n\r\n                // если пользователь создан\r\n                if ( resJSON.isCorrect ){\r\n\r\n                    // авторизируемся\r\n                    var form = document.querySelector('.login__sign-in form');\r\n\r\n                    form.log.value = formFields.email;\r\n                    form.pwd.value = formFields.pass;\r\n                    form.submit();\r\n                    console.log(form);\r\n                }\r\n            });\r\n\r\n            // отправляем значения полкй формы\r\n            request.send(JSON.stringify(formFields));\r\n        }\r\n        \r\n    });\r\n}\r\n\r\nmodule.exports = {\r\n\r\n    init: function(){\r\n\r\n        initRegisterForm();\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/signup/signup.js?");

/***/ })

/******/ });