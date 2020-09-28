<?php
/**
 * Кастомизация темы
 * 
 */



 // отключаем стилии woocommerce
add_filter( 'woocommerce_enqueue_styles', '__return_false' );

/**
 * Добавление атрибутов для font awesome
 */
/*
add_filter('style_loader_tag', 'font_awesome_add_attr', 10, 2);
function font_awesome_add_attr($html, $handle){

	if ('font-awesome-5' === $handle){

		str_replace('media="all"', 'media="all" integrity="sha384-HzLeBuhoNPvSl5KYnjx0BT+WB0QEEqLprO+NBkkk5gbc67FTaL7XIGa2w1L0Xbgc" crossorigin="anonymous"', $html);
	}
	return $html;
}
*/

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