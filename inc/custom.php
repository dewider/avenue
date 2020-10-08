<?php
/**
 * Кастомизация темы
 * 
 */
// отключаем стилии woocommerce (кроме страницы заказа)
add_filter( 'woocommerce_enqueue_styles', 'wc_styles_setup' );
function wc_styles_setup( $style ){
    if ( !is_checkout() ) return false;
    else return $style;
}

/**
 * Добавление разметки для верхних элементов меню с дочерними элементами
 */
add_filter('wp_nav_menu_items', 'add_submenu_markup', 10 , 2);
function add_submenu_markup($items, $args){

    $menu_banner =  '<div class="submenu-banner">'.
                    '<div class="submenu-banner__content">'.
                    '<p class="bold">AUTUNM SALE</p>'.
                    '<p>UP TO 50% OFF</p>'.
                    '</div>'.
                    '</div>';

    $dom_banner = new DOMDocument;
    $dom_banner->loadHTML($menu_banner);
    
	if ( 'header' === $args->theme_location ){

        $dom_menu = new DOMDocument;
        $dom_menu->loadHTML( $items );

        // выбираем все подменю
        $sub_menus = $dom_menu->getElementsByTagName('ul');
        
        foreach ( $sub_menus as $menu_node ){

            // проверяем порядок в иерархии DOM
            $deep = substr_count($menu_node->getNodePath(), 'ul');

            // если верхнее меню
            if ( $deep == 1 ){

                // получаем родительский элемент для вставки стрелки
                $parent_node = $menu_node->parentNode;
                // создаем элемент стрелки
                $arrow_el = $dom_menu->createElement('i');
                $arrow_el->setAttribute("class", "fas fa-angle-down");
                // вставляем в родительский элемент
                $parent_node->appendChild($arrow_el);
                // получаем элемент баннера и вставляем в меню
                $banner_node = $dom_menu->importNode($dom_banner->documentElement, true);
                $menu_node->appendChild($banner_node);
            }

        }
        $items = $dom_menu->saveHTML();

	}
	return $items;
}

/**
 * Ограничеваем количество товаров на странице каталога
 */
add_filter('loop_shop_per_page', function( $items ){

    $max_items = 12;

    return $max_items;

}, 20);

/**
 * Получение символа текущей валюты
 */
function get_currency_symbol(){

    global $WOOCS;
    $currencyList = $WOOCS->get_currencies();
    return $currencyList[$WOOCS->current_currency]['symbol'];
}

/**
 * Регистрация типов постов
 */
add_action( 'init', 'register_post_types');
function register_post_types(){
    register_post_type( 'local-stores', array(
        'labels'        => array(
            'name'                  => 'Local Stores',
            'singular_name'         => 'Local Store',
            'add_new'               => 'Add Store',
            'add_new_item'          => 'Add Store',
            'edit_item'             => 'Edit Store',
            'new_item'              => 'New Store',
            'view_item'             => 'View Store',
            'search_item'           => 'Search Store',
            'not_found'             => 'Not Found',
            'not_found_in_trash'    => 'Not fonud in trash',
            'menu_name'             => 'Local Stores'
        ),
        'public'    => true,
        'menu_icon' => 'dashicons-location-alt',
        'supports'  => array('title')
    ));
    register_post_type( 'lookbook', array(
        'labels'        => array(
            'name'                  => 'Lookbook',
            'singular_name'         => 'Lookbook',
            'add_new'               => 'Add Lookbook',
            'add_new_item'          => 'Add Lookbook',
            'edit_item'             => 'Edit Lookbook',
            'new_item'              => 'New Lookbook',
            'view_item'             => 'View Lookbook',
            'search_item'           => 'Search Lookbook',
            'not_found'             => 'Not Found',
            'not_found_in_trash'    => 'Not fonud in trash',
            'menu_name'             => 'Lookbook'
        ),
        'public'        => true,
        'menu_icon'     => 'dashicons-format-gallery',
        'supports'      => array('title', 'thumbnail'),
        'taxonomies'    => array( 'category' )
    ));
}

/**
 * Установка cookie
 */
add_action( 'init', 'set_cookie' );
function set_cookie(){

    if( is_user_logged_in() )
        setcookie('logged_in', 'yes' );
    else
        setcookie('logged_in', 'no' );
}