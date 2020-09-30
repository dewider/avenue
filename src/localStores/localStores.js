
/**
 * Запрос финформации о магазине
 */
function createGetRequest( id ){
    request = new XMLHttpRequest();
    request.open('GET', '/wp-json/stores/v1/get/' + id);
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener("readystatechange", function( e ){
        console.log(e);
        // если запрос выполнен не полностью - выходим
        if( e.target.readyState != 4) return;
        // если пустой ответ - выходим
        if( e.target.responseText == "" ) return;
        // парсим результат запроса
        var resJSON = JSON.parse(e.target.responseText);
        // рисуем полученные элементы
        render(resJSON);
    });
    return request;
}

/**
 * Отрисовка
 */
function render( data ){

    if ( !data ) return;

    var titleElement = document.querySelector('.local-desc__title');
    var addressElement = document.querySelector('.local-desc__address');
    var descElement = document.querySelector('.local-desc__desc');
    var address2Element = document.querySelector('.local-desc__address2');
    var phoneElement = document.querySelector('.local-desc__phone');
    var urlElement = document.querySelector('.local-desc__url');
    var emailElement = document.querySelector('.local-desc__email');
    var sheduleElement = document.querySelector('.local-desc__shedule');

    titleElement.innerHTML = data.title;
    addressElement.innerHTML = data.address;
    descElement.innerHTML = data.desc;
    address2Element.innerHTML = '<i class="fas fa-map-marker-alt"></i>' + data.address;
    phoneElement.innerHTML = '<a href="tel:' + data.phone + '"><i class="fas fa-phone-alt"></i>' + data.phone + '</a>';
    urlElement.innerHTML = '<a href="' + data.url + '"><i class="fas fa-link"></i>' + data.url + '</a>';
    emailElement.innerHTML = '<a href="mailto:' + data.email + '"><i class="far fa-envelope"></i>' + data.email + '</a>';
    sheduleElement.innerHTML = '<i class="far fa-clock"></i>' + data.shedule;
}

module.exports = {

    init: function(){

        // находим все кнопки просмотра магазинов
        var localsButtons = document.querySelectorAll('.locals__item .locals__button');
        // если на странице нет кнопок - выходим
        if ( !localsButtons ) return;
        // добавляем обработчика нажатий
        localsButtons.forEach( function( button ){

            button.addEventListener('click', function(e){
                e.preventDefault();

                // ищем элемент кнопки
                var el = e.target.closest('.locals__button');
                if ( el ){
                    // передаем атрибут data-store_id в запрос
                    var req = createGetRequest( el.dataset.store_id);
                    req.send();
                }
            });
        });
    }
}