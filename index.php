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
        <?php get_template_part( 'template-parts/lookbook', 'banners'); ?>
<?php
get_footer();
