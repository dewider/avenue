<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package avenue
 */

?>
        <footer class="footer">
            <div class="container">
                <?php 
                    wp_nav_menu([
                        'theme_location'    => 'footer',
                        'container_class'   => 'footer-menu__container',
                        'menu_class'        => 'footer-menu',
                        'menu'              => 'footer-menu'
                    ])
                ?>
            </div>
            <div class="container">
                <div class="footer-banners">
                    <div class="footer-banners__left">
                        <div class="award-winner-banner">
                            <div class="award-winner-banner__content">
                                <p class="bold">AWARD WINNER</p>
                                <p>FASHION AWARDS 2016</p>
                            </div>
                        </div>
                    </div>
                    <div class="footer-banners__right">
                        <div class="socials-banner">
                            <div class="socials-banner__content">
                                <ul>
                                    <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                    <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                    <li><a href="#"><i class="fab fa-pinterest"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="stop-line">
                <div class="container">
                    <div class="stop-line__left-part">
                        <span class="footer__copyright">© 2016 Avenue Fashion™</span>
                    </div>
                    <div class="stop-line__right-part">
                        <div class="stop-line__right-part-item">Design by RobbyDesigns.com</div>
                        <div class="stop-line__right-part-item">Dev by Loremipsum.com</div>
                    </div>
                </div>
            </div>
        </footer>
        

    </div><!-- main-wrapper -->

<?php wp_footer(); ?>

</body>
</html>
