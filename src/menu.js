/**
 * Header menu
 */

 module.exports = {

    init: function(){

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
    }
 }