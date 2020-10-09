/**
 * Обраотка форм регистрации
 */

 var ajax = require("../ajax.js");

/**
 * Проверка введенных данных
 */
function checkForm ( data ){

    // если нет даннных - выходим
    if ( !data ) return;

    // результат проверок
    res = {
        email: false,
        pass: false,
        confirm: false,
    };

    // проверка корректности email
    if ( data.email ){

        if ( data.email.match(/\S+@\S+\.\S+/) ){

            res.email = true;
        }
    }

    // проверка корректности пароля и подтвержения
    if ( data.pass && data.confirm ){
        
        // проверяем снова
        if ( data.pass === data.confirm && !data.pass.match(/\s/g) ){

            res.pass = true;
            res.confirm = true;            
        }
    }

    // устанавливаем атрибут корректности данных вцелом
    var correct = true;
    for ([key, value] of Object.entries(res)){

        if ( value == false ) correct = false;
    }
    Object.assign( res, {isCorrect: correct})

    return res;
}

/**
 * Получение cart key из cookie
 */
function getCartKey(){

    var key = document.cookie.match(/wp_cocart_session_.*=.*%7C%7C/);
    if( !key ) return undefined;
    key = key[0].split('=')[1];
    key = key.split('%7C%7C')[0];
    return key;
}

/**
 * Отображение ошибок
 */
function showErrors ( data ){

    // если нет даннных - выходим
    if ( !data ) return;

    var emailField = document.querySelector('.login__register form input[name=email]');
    var passField = document.querySelector('.login__register form input[name=pass]');
    var confirmField = document.querySelector('.login__register form input[name=confirm_pass]');
    var messageField = document.querySelector('.login__register .login-form__error-message');
    var message = '';

    if ( data.message ) message = data.message+'\n';
    
    if ( data.email == false ){

        emailField.classList.add('error');
        message = message + 'Некорректный Email\n';
    } else {
        emailField.classList.remove('error');
    }

    if ( data.pass == false ){

        passField.classList.add('error');
        message = message + 'Некорректный пароль\n';
    } else {

        passField.classList.remove('error');
    }

    if ( data.confirm == false ){

        confirmField.classList.add('error');
        message = message + 'Подтверждение пароля не совпадает\n';
    } else {

        confirmField.classList.remove('error');
    } 

    messageField.innerText = message;

}

/**
 * Запрос регистрации нового пользователя
 */
function newUserRequest( callback ){

    var request = new XMLHttpRequest();
    request.open( 'POST', '/wp-json/users/v1/add');
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener('readystatechange', callback);
    return request;
}

/**
 * Форма регистрации
 */
function initRegisterForm(){

    var form = document.querySelector('.login__register form');
    
    // Если формы нет на странице - выходим
    if ( !form ) return;

    var submitButton = document.querySelector('.login__register .login-form__submit button');

    // Обработка нажатия на кнопку отправки
    submitButton.addEventListener('click', function(e){

        e.preventDefault();

        // получаем значения полей формы
        var formFields = {
            email: form.email.value,
            pass: form.pass.value,
            confirm: form.confirm_pass.value,
            signup: form.sign_updates.checked
        };
        // проверяем корректность данных формы
        var res = checkForm(formFields);

        // выводим ошибки
        showErrors(res);

        // Если данные корректные - отправляем запрос на сервер
        if ( res.isCorrect ){

            var request = newUserRequest( function(e){

                // обработка ответа сервера

                // если запрос выполнен не полностью - выходим
                if( e.target.readyState != 4) return;
                // если пустой ответ - выходим
                if( e.target.responseText == "" ) return;
                // парсим результат запроса
                var resJSON = JSON.parse(e.target.responseText);
                // показываем ошибки
                showErrors(resJSON);

                // если пользователь создан
                if ( resJSON.isCorrect ){

                    // сохряняем cart key
                   var cartKey = getCartKey();
                   // выполняем авторизацию
                   var loginRequest = ajax.createRequest(
                       'POST',
                       '/wp-json/users/v1/login',
                       function( e ){
                           // если запрос выполнен не полностью - выходим
                            if( e.target.readyState != 4) return;
                            // если пустой ответ - выходим
                            if( e.target.responseText == "" ) return;

                            if( cartKey ){
                                // если в корзине есть товары, добавляем их из сессии
                                document.location.href = '/?cocart-load-cart=' + cartKey + '&keep-cart=false';
                            } else {
                                //иначе - просто перенаправляем на главную страницу
                                document.location.href = '/';
                            }
                       }
                   );
                   loginRequest.send(JSON.stringify(formFields));
                }
            });

            // отправляем значения полей формы
            request.send(JSON.stringify(formFields));
        }
        
    });
}

/**
 * Форма авторризации
 */
function initLoginForm(){

    var form = document.querySelector('.login-form form');
    // Если формы нет на странице - выходим
    if ( !form ) return;

    form.addEventListener('submit', function( e ){

        e.preventDefault();

        // получаем значения полей формы
        var formFields = {
            email: form.log.value,
            pass: form.pwd.value,
        };

        // сохряняем cart key
        var cartKey = getCartKey();
        var loginRequest = ajax.createRequest(
            'POST',
            '/wp-json/users/v1/login',
            function( e ){
                // если запрос выполнен не полностью - выходим
                if( e.target.readyState != 4) return;
                // если пустой ответ - выходим
                if( e.target.responseText == "" ) return;

                if( cartKey ){
                    // если в корзине есть товары, добавляем их из сессии
                    document.location.href = '/?cocart-load-cart=' + cartKey + '&keep-cart=false';
                } else {
                    //иначе - просто перенаправляем на главную страницу
                    document.location.href = '/';
                }
            }

        );
        loginRequest.send(JSON.stringify(formFields));

    });
}

module.exports = {

    init: function(){     
        
        initLoginForm();
        initRegisterForm();
    }
}