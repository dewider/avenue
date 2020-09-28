/**
 * Entry webpack
 */


document.addEventListener('DOMContentLoaded', function(){

    // добавляем обработчик нажатия кнопки меню
    var showMenuButton = document.querySelector('.show-menu-button');
    var closeMenuButton = document.querySelector('.close-menu-button');
    var menu = document.querySelector('.header-menu__wrap');

    showMenuButton.addEventListener('click', function(e){
        e.preventDefault();
        
        menu.classList.add('show');
    });

    closeMenuButton.addEventListener('click', function(e){
        e.preventDefault();
        
        menu.classList.remove('show');
    });

    // кнопка категорий в мобильной версии
    var categoriesBtn = document.querySelector('.catalog-categories__show-button');
    var categoriesList = document.querySelector('.catalog-categories__list');

    if ( categoriesBtn !== null){

        categoriesBtn.addEventListener('click', function(e){
            e.preventDefault();
            categoriesList.classList.toggle('show');
            
        });
    }
        
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

    catalogInit();
});