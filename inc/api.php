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

    // запрос к БД
    $posts = new WP_Query($query_args);

    // Цикл WP
    while ( $posts->have_posts() ){
        $posts->the_post();
        global $product; 

        array_push($res, array(
            'ID'            => $product->get_ID(),
            'title'         => $product->get_title(),
            'price'         => $product->get_price(),
            'regularPrice'  => $product->get_regular_price(),
            'thumb'         => wp_get_attachment_image_url($product->get_image_id(), 'full'),
            'desc'          => $product->get_description(),
            'url'           => get_permalink($product->get_ID()),
            'gallery'       => wp_get_attachment_url ( $product->get_gallery_image_ids()[0] )
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
    //$email = $args["email"];
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
});