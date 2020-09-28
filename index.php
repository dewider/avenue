<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package avenue
 */

get_header();
?>
        <div class="top-banner">
            <div class="top-banner__button">
                <a href="#" class="transparrent-button">
                    shop men’s collection
                </a>
            </div>
        </div><!--top-banner-->
        <div class="catalog fp-catalog ">
            <div class="container-xl">
                <div class="catalog-categories">
                    <button class="catalog-categories__show-button">Categories <i class="fas fa-angle-down"></i></button>
                    <ul class="catalog-categories__list">
                        <li><a href="#" data-category="popular" rel="nofollow">popular</a></li>
                        <li><a href="#" data-category="new" rel="nofollow">new arrivals</a></li>
                        <li><a href="#" data-category="best" rel="nofollow">best sellers</a></li>
                        <li><a href="#" data-category="special" rel="nofollow">special offers</a></li>
                        <li><a href="#" data-category="soon" rel="nofollow">coming soon</a></li>
                    </ul>
                </div>
            </div>
            <div class="container-xl catalog-cards__wrap">
                <ul class="catalog-cards">

                </ul>
            </div>
        </div><!-- catalog -->
        <div class="lookbook-cards">
            <div class="lookbook-cards__left-col">
                <div class="lookbook-card" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/men.jpg);">
                    <div class="lookbook-card__content">
                        <div class="lookbook-card__title">
                            <h2>
                                <p class="bold">MEN’S</p>
                                <p>LOOKBOOK</p>
                            </h2>
                        </div>
                        <div class="lookbook-card__desc">
                            <p>Lorem ipsum dolor sit amet eras facilisis
                                consectetur adipiscing elit lor, integer lorem consecteur dignissim laciniqui.
                                Elementum metus facilisis ut phasellu.
                            </p>
                        </div>
                        <div class="lookbook-card__button">
                            <a href="#" class="transparrent-button">view now</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lookbook-cards__center-col">
                <div class="lookbook-card" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/women.jpg);">
                    <div class="lookbook-card__content">
                        <div class="lookbook-card__title">
                            <h2>
                                <p class="bold">WOMEN’S</p>
                                <p>LOOKBOOK</p>
                            </h2>
                        </div>
                        <div class="lookbook-card__desc">
                            <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames.
                                Pellentesque laoreet quis enim et mattis. Quisque interdum felis tellus.
                            </p>
                        </div>
                        <div class="lookbook-card__button">
                            <a href="#" class="transparrent-button">view now</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lookbook-cards__right-col">
                <div class="lookbook-card" style="background-image: url(<?php echo get_template_directory_uri(); ?>/img/you.jpg);">
                    <div class="lookbook-card__content">
                        <div class="lookbook-card__title">
                            <h2>
                                <p class="bold">YOUR</p>
                                <p>LOOKBOOK</p>
                            </h2>
                        </div>
                        <div class="lookbook-card__desc">
                            <p>See an item you like and click the  button to add it to your lookbook where you can create your own perfect look.
                                It’s like your own boutique!
                            </p>
                        </div>
                        <div class="lookbook-card__button">
                            <a href="#" class="transparrent-button">view now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div><!-- lookbook-cards-->

<?php
get_footer();
