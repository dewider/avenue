<?php
/**
 * Кастомизация темы
 * 
 */
// отключаем стилии woocommerce (кроме страницы заказа)
//add_filter( 'woocommerce_enqueue_styles', '__return_false' );
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
