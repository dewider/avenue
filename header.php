<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package avenue
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

    <div class="main-wrapper">
    <header class="header">
            <div class="header__top stop-line">
                <div class="container header__top-container">
                    <div class="stop-line__left-part">
                        <div class="header__top-currency">
                            <span>Currency : </span><button>GBP <i class="fas fa-angle-down"></i></button>
                        </div>
                    </div>
                    <div class="stop-line__right-part">
                    <?php 
                    // если пользователь авторизирован
                    if ( is_user_logged_in() ):
                    ?>
                        <div class="stop-line__right-part-item">
                            <a href="<?php echo wp_logout_url( home_url() ); ?>">Logout</a>
                        </div>
                    <?php else: ?>
                        <div class="stop-line__right-part-item">
                            <a href="/signup">Register</a>
                        </div>
                        <div class="stop-line__right-part-item">
                            <a href="/signup">Sign In</a>
                        </div>
                    <?php endif; ?>
						<div class="cart-button stop-line__cart-button">
							<button><i class="fas fa-shopping-cart"></i><span class="cart-button__text">empty</span><i class="fas fa-angle-down"></i></button>
						</div>
                        <div class="cart">
                            <ul>
                            </ul>
                            <div class="checkout-button__outer">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header__container-xl">
                <div class="container-xl">
                    <div class="header__logo">
                        <div class="logo">
                            <a href="/"><h1><span class="bold">AVENUE</span> FASHION</h1></a>
                        </div>
                    </div>

                    <div class="header-menu__wrap">
			        	<div class="container">

                        <?php 
                            wp_nav_menu([
                                'theme_location'    => 'header',
                                'container_class'   => 'header-menu__container',
                                'menu_class'        => 'header-menu',
                                'menu'              => 'header-menu'
                            ]);

                        ?>
                            <?php get_product_search_form(); ?>
                            <button class="close-menu-button"><i class="fas fa-times"></i></button>
                        </div>
                    </div><!-- END header-menu__wrap -->

                    <div class="header__search">
                        <button class="show-menu-button">
                            <span>MENU <i class="fas fa-angle-down"></i></span>
                        </button>
                        <?php get_product_search_form(); ?>
                    </div>
                </div>
            </div>
        </header>
