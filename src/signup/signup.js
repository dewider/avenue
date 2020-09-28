/**
 * Обраотка форм регистрации
 */


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
 * Отображение ошибок
 */
function showErrors ( data ){

    // если нет даннных - выходим
    if ( !data ) return;

    var emailField = document.querySelector('.login__register form input[name=email]');
    var passField = document.querySelector('.login__register form input[name=pass]');
    var confirmField = document.querySelector('.login__register form input[name=confirm_pass]');
    
    if ( data.email == false ){

        emailField.classList.add('error');
    } else {
        emailField.classList.remove('error');
    }

    if ( data.pass == false ){

        passField.classList.add('error');
    } else {

        passField.classList.remove('error');
    }

    if ( data.confirm == false ){

        confirmField.classList.add('error');
    } else {

        confirmField.classList.remove('error');
    } 
    

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
            });

            // отправляем значения полкй формы
            request.send(JSON.stringify(formFields));

        }
        
    });
}

module.exports = {

    init: function(){

        initRegisterForm();
    }
}