<?php
/**
 * Local stores page temlate
 *
 * @package avenue
 * 
 * Template Name: Local Stores
 */

get_header();
?>
    <div class="menu-placeholder"></div>
    <div class="top-banner-internal">
        <div class="top-banner-internal__text">
            <div class="top-banner-internal__title">
                <h1><span class="bold">LOCAL</span> STORES</h1>
            </div>
            <p>FIND A STORE NEAR YOU</p>
        </div>
    </div>
    <div class="container">
        <div class="locals">

        <?php
            // Получаем список магазинов
            $stores_query = new WP_Query( array( 'post_type' => 'local-stores' ) );
            while( $stores_query->have_posts() ):
                $stores_query->the_post();
        ?>

            <div class="locals__item">
                <h2><?php the_title() ?></h2>
                <h3><?php echo get_field('store_address'); ?></h3>
                <p><?php echo get_field('store_description'); ?></p>
                <a href="#" data-store_id="<?php the_ID(); ?>" class="transparrent-button locals__button" rel="nofollow">VIEW DETAILS</a>
            </div>

        <?php
            endwhile;
        ?>

        </div><!-- locals -->
    </div>
    <div class="local-desc">
        <div class="local-desc__map" style="background-image: url(http://site3.ivit.pro/wp-content/uploads/2020/09/map.jpg);">
        </div>
        <div class="local-desc__details">
            <h2 class="local-desc__title">LONDON</h2>
            <h3 class="local-desc__address">180-182 REGENT STREET, LONDON, W1B 5BT</h3>
            <p class="local-desc__desc">Lorem ipsum dolor sit amet, consectetur adipiscing esi elit. Vivamus at arcu sem. Vestibulum ornare eleifendit massa, nec tempor odio. Fusce posuere nunc iaculis ligula viverra iaculis. Aliquam erat volutpat.</p>
            <ul class="local-desc__contacts">
                <li class="local-desc__contacts-item local-desc__address2"><i class="fas fa-map-marker-alt"></i>180-182 Regent Street, London, W1B 5BT</li>
                <li class="local-desc__contacts-item local-desc__phone"><a href="tel:0123-456-789"><i class="fas fa-phone-alt"></i>0123-456-789</a></li>
                <li class="local-desc__contacts-item local-desc__url"><a href="www.yourwebsite.com"><i class="fas fa-link"></i>www.yourwebsite.com</a></li>
                <li class="local-desc__contacts-item local-desc__email"><a href="mailto:support@yourwebsite.com"><i class="far fa-envelope"></i>support@yourwebsite.com</a></li>
                <li class="local-desc__contacts-item local-desc__shedule"><i class="far fa-clock"></i>Monday-Friday: 9am to 6pm  Saturday: 10am to 6pm  Sunday: 10am to 2pm</li>
            </ul>
            <ul class="local-desc__socials">
                <li><a href="" class="local-desc__socials-item"><i class="fab fa-facebook-f"></i></a></li>
                <li><a href="" class="local-desc__socials-item"><i class="fab fa-twitter"></i></a></li>
                <li><a href="" class="local-desc__socials-item"><i class="fab fa-instagram"></i></a></li>
                <li><a href="" class="local-desc__socials-item"><i class="fab fa-pinterest"></i></a></li>
            </ul>
        </div>
    </div>

<?php
get_footer();
