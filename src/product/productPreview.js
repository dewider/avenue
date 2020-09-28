/*
 * Product preview
 */

/**
 * Получаем ссылки на картинки
 */
function getGallery( list ){

    // создаем объект для рабты с ссылками
    var res = {

        current: 0,
        links: [],

        // возвращает ссылку на следующую картинку галереи
        next: function(){

            this.current++;
            if ( this.current >= this.links.length ) this.current = 0;
            return this.links[this.current];
        },

        // возвращает предыдущую
        prev: function(){

            this.current--;
            if ( this.current < 0 ) this.current = this.links.length - 1;
            return this.links[this.current];
        }
    }

    // получаем ссылки
    list.forEach( function( item ){

        res.links.push(item.innerHTML);
    });

    return res;
}

module.exports = {

    init: function(){

        // получаем элементы
        var preview = document.querySelector('.product-preview');
        var list = document.querySelectorAll('ul.product-preview__links li');
        var prevButton = document.querySelector('.product-preview__prev');
        var nextButton = document.querySelector('.product-preview__next');

        // получаем галерею картинок
        var gallery =  getGallery( list );

        // обработчики нажатия назад-вперед
        prevButton.addEventListener('click', function(e){

            e.preventDefault();
            preview.style.backgroundImage = 'url(' + gallery.prev() + ')';
        });
        nextButton.addEventListener('click', function(e){

            e.preventDefault();
            preview.style.backgroundImage = 'url(' + gallery.next() + ')';

        });
    }
}