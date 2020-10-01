<?php
/**
 * Lookbook page temlate
 *
 * @package avenue
 * 
 * Template Name: Lookbook
 */

get_header();
?>
    <div class="menu-placeholder"></div>
    <div class="top-banner-internal">
        <div class="top-banner-internal__text">
            <div class="top-banner-internal__title">
                <h1><span class="bold">OUR</span> LOOKBOOK</h1>
            </div>
            <p>LATEST POSTS - MENS & WOMENS</p>
        </div>
    </div>
    <div class="catalog lb-catalog ">
            <div class="container-xl">
                <div class="catalog-categories">
                    <button class="catalog-categories__show-button">Categories <i class="fas fa-angle-down"></i></button>
                    <ul class="catalog-categories__list">
                        <li><a href="#" data-category="latest" rel="nofollow">latest</a></li>
                        <li><a href="#" data-category="liked" rel="nofollow">most liked</a></li>
                        <li><a href="#" data-category="best" rel="nofollow">best sellers</a></li>
                        <li><a href="#" data-category="low" rel="nofollow">price low to hight</a></li>
                        <li><a href="#" data-category="high" rel="nofollow">price hight to low</a></li>
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
