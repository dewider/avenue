<?php
/*
 *  API
 */


/**
 * Выдача товаров по категориям
 */
function catalog_endpoint ( $args ){

    $res = [];

    $query_args = array(

        'post_type'     => 'product',
        'posts_per_page' => 6,
    );

    // Best sellers
    if ( $args['category'] == "best" ){
        $query_args = array_merge( $query_args, array(

            'meta_key'      => 'best_seller',
            'meta_value'    => true
        ));
    }
    // Popular
    elseif ( $args['category'] == "popular" ){
        $query_args = array_merge( $query_args, array(

            'meta_key'      => 'popular',
            'meta_value'    => true
        ));
    }
    // New
    elseif ( $args['category'] == "new" ){
        $query_args = array_merge( $query_args, array(

            'meta_key'      => 'new',
            'meta_value'    => true
        ));
    }
    // Special
    elseif ( $args['category'] == "special" ){
        $query_args = array_merge( $query_args, array(

            'meta_key'      => 'special',
            'meta_value'    => true
        ));
    }
    // Soon
    elseif ( $args['category'] == "soon" ){
        $query_args = array_merge( $query_args, array(

            'meta_key'      => 'soon',
            'meta_value'    => true
        ));
    }

    // Получаем значек текущей валюты
    $currencySymbol = get_currency_symbol();

    // запрос к БД
    $posts = new WP_Query($query_args);

    // Цикл WP
    while ( $posts->have_posts() ){
        $posts->the_post();
        global $product; 

        array_push($res, array(
            'ID'                => $product->get_ID(),
            'title'             => $product->get_title(),
            'price'             => $product->get_price(),
            'regularPrice'      => $product->get_regular_price(),
            'thumb'             => wp_get_attachment_image_url($product->get_image_id(), 'full'),
            'desc'              => $product->get_description(),
            'url'               => get_permalink($product->get_ID()),
            'gallery'           => wp_get_attachment_url ( $product->get_gallery_image_ids()[0] ),
            'currencySymbol'    => $currencySymbol
        ));
    }
    wp_reset_postdata();

    return $res;
}

/**
 * добавление нового пользователя
 */
function new_user_endpoint ( $args ){

    $res = array(
        "email"     => false,
        "pass"      => false,
        "message"   => ' '
    );

    // проверяем почту
    $email = sanitize_email( $args["email"] );
    if ( $email ){
        if ( preg_match( '/\S+@\S+\.\S+/', $email ) ){

            $res['email'] = true;
        }
    }

    // проверяем пароль
    $pass = $args["pass"];
    if ( $pass ){
        if ( !stripos($pass, ' ' ) ){

            $res['pass'] = true;
        }
    }

    // проверяем есть ли ошибка
    $correct = true;
    foreach ( $res as $key => $value ){

        if ( $value == false ) $correct = false;
    }
    $res = array_merge( $res, array( "isCorrect" => $correct ));

    // если ошибок нет, добавляем пользователя
    if ( $correct ){

        $user_id = register_new_user( $email, $email );

        if ( is_wp_error( $user_id )){

            $res["email"] = false;
            $res["isCorrect"] = false;
            $res["message"] = "Такой Email уже зарегистрирован";
            return $res;
        }
        wp_set_password( $pass, $user_id);
    }

    return $res;
}

/**
 * выдача информации о магазине
 */
function stores_endpoint ( $args ){

    $res = [];
    // преобразуем id в число
    $s_ID = intval( $args['id'] );
    // получаем пост
    $store = get_post( $s_ID );
    // если тип поста не соответсвует - выходим
    if ( $store->post_type != 'local-stores' ){
        return array(
            'error' => true
        );
    }
    // получаем метаполя поста
    $store_meta = get_post_meta( $s_ID);
    // получаем картинку карты
    $store_map_id = $store_meta['store_map'][0];
    $store_map = wp_get_attachment_image_src( $store_map_id, 'full' )[0]; 
    // получаем информация из поста
    $res = array_merge( $res, array(
        'map'       => $store_map,
        'title'     => $store->post_title,
        'address'   => $store_meta['store_address'][0],
        'desc'      => $store_meta['store_description'][0],
        'phone'     => $store_meta['store_phone'][0],
        'url'        => $store_meta['store_url'][0],
        'email'     => $store_meta['store_email'][0],
        'shedule'   => $store_meta['store_shedule'][0],
    ));

    return $res;
}

/**
 * выдача лукбуков
 */
function lookbook_endpoint( $args ){
    $res = [];

    // параметры для запроса к БД
    $lb_params = array(
        'post_type'     => 'lookbook',
    );

    // добавляем категорию в запрос    
    switch( $args['category'] ){
        case "latest":
            $lb_params = array_merge( $lb_params, array(
                'category_name' => 'latest'
            ) );
        break;
        case "liked":
            $lb_params = array_merge( $lb_params, array(
                'category_name' => 'liked'
            ) );
        break;
        case "best":
            $lb_params = array_merge( $lb_params, array(
                'category_name' => 'best'
            ) );
        break;
        case "low":
            $lb_params = array_merge( $lb_params, array(
                'meta_key'  => 'lookbook_price',
                'orderby'   => 'meta_value',
                'order'     => 'ASC'
            ) );
        break;
        case "high":
            $lb_params = array_merge( $lb_params, array(
                'meta_key'  => 'lookbook_price',
                'orderby'   => 'meta_value',
                'order'     => 'DESC'
            ) );
        break;

    }

    // получаем список лукбуков
    $lb_loop = new WP_Query( $lb_params );
    while( $lb_loop->have_posts() ){
        $lb_loop->the_post();

        $lb_is_banner = get_field('lookbook_is_banner');
        // если баннер
        if( $lb_is_banner ){

            array_push($res, array(
                'isBanner'      => true,
                'ID'            => get_the_ID(),
                'title'         => get_the_title(),
                'thumb'         => get_the_post_thumbnail_url(),
                'price'         => get_field('lookbook_price'),
                'content'       => get_field('lookbook_banner_content'),
                'width'         => get_field('lookbook_banner_width'),
                'buttonText'    => get_field('lookbook_button_text')
            ));
        } else {

            array_push($res, array(
                'isBanner'  => false,
                'ID'        => get_the_ID(),
                'title'     => get_the_title(),
                'thumb'     => get_the_post_thumbnail_url(),
                'price'     => get_field('lookbook_price'),
            ));
        }
    }

    return $res;
}

/**
 * получение id корзины
 */
/*
function cart_id_endpoint( $args ){

    $res = [];

    $user_id = get_current_user_id();
    $cart_id = get_field( 'user_cart_id', "user_" . $user_id );
    //$cart_id = get_field( 'user_cart_id', "user_0" );

    $res = array_merge( $res, array(

        'cartID'    => $cart_id,
        'userID'    => $user_id,
    ));

    return $res;
}
*/

/**
 * Авторизация и получение корзины
 */
/*
function get_cart_endpoint(){

    WC_AJAX::update_api_key();
}
*/

// Регистрация машрутов API
add_action('rest_api_init', function(){

    // маршруты для каталога
    register_rest_route(
        'catalog/v1', '/get',
        array(
            'methods'   => 'GET',
            'callback'  => 'catalog_endpoint',
        )
    );
    register_rest_route(
        'catalog/v1', '/get/(?P<category>.+)',
        array(
            'methods'   => 'GET',
            'callback'  => 'catalog_endpoint',
        )
    );

    // маршрут для регистрации нового пользователя
    register_rest_route(
        'users/v1', '/add',
        array(
            'methods'   => 'POST',
            'callback'  => 'new_user_endpoint'
        )
    );

    // маршрут для запроса информации по магазину
    register_rest_route(
        'stores/v1', '/get/(?P<id>\d+)',
        array(
            'methods'   => 'GET',
            'callback'  => 'stores_endpoint'
        )
    );

    // маршрут для получения лукбуков
    register_rest_route(
        'lookbook/v1', '/get/(?P<category>.+)',
        array(
            'methods'   => 'GET',
            'callback'  => 'lookbook_endpoint'
        )
    );
/*
    // получение id корзины пользователя
    register_rest_route(
        'users/v1', '/cart-id',
        array(
            'methods'   => 'GET',
            'callback'  => 'cart_id_endpoint'
        )
    );

    // авторизация и получение корзины
    register_rest_route(
        'cart/v1', '/get',
        array(
            'methods'   => 'GET',
            'callback'  => 'get_cart_endpoint'
        )
    );
    */
});