/**
 * POPUP
 */

module.exports = {


    // элемент попапа
    el: undefined,

    /**
     * Показывает попап
     */
    show: function( message ){

        this.el = document.createElement('div');
        this.el.classList.add('popup__back');
        this.el.innerHTML = `
            <div class="popup">
                <button class="popup__close"><i class="far fa-times-circle"></i></button>
                <div class="popup__message">
                    ${message}
                </div>
            </div>
        `;
        document.body.appendChild( this.el );
        this.addEventListeners();
    },

    /**
     * Скрывает попап
     */
    close: function(){

        document.body.removeChild( this.el );
        this.el = undefined;
    },

    /**
     *  Добавляет обработчики событий 
     */
    addEventListeners: function(){

        var parrent = this;
        this.el.addEventListener( 'click', function(e){

            e.preventDefault();
            parrent.close();
        });
        var closeButton = this.el.querySelector('.popup__close');
        closeButton.addEventListener( 'click', function(e){

            e.preventDefault();
            parrent.close();
        });
    }
}