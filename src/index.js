/**
 * Entry webpack
 */

var menu = require("./menu.js");
var cart = require("./cart.js");
var catalog = require("./catalog.js");
var product = require("./product/product.js");
var signup = require("./signup/signup.js");


document.addEventListener('DOMContentLoaded', function(){

    menu.init();

    // корзина
    cart.init();
    
    // инициализация страницы товара
    product.init();

    // Инициализация карточек товара
    catalog.init();

    // Инициализация форм авторизации
    signup.init();
});