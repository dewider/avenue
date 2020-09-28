<?php
/**
 * The brand page temlate
 *
 * @package avenue
 * 
 * Template Name: The Brand
 */

get_header();
?>
    <div class="menu-placeholder"></div>
    <div class="top-banner-internal">
        <div class="top-banner-internal__text">
            <div class="top-banner-internal__title">
                <h1><span class="bold">THE</span> BRAND</h1>
            </div>
            <p>COMPANY SLOGAN GOES HERE</p>
        </div>
    </div>
    <div class="container">
        <div class="about">
            <div class="about__item">
                <img src="<?php echo get_template_directory_uri(); ?>/img/about1.jpg" alt="">
            </div>
            <div class="about__item">
                <h2>hand designed clothing</h2>
                <h3>established in 2013, avenue fashion Sed dictum elit vel sapien luctus eras</h3>
                <p>Praesent feugiat malesuada tristique maecenas rhoncus diam eget quam vestibulim consectetur, id condimentum leo porttitor. Cum sociis natoque penatibus eta magnis disut parturient montes, nascetur ridiculus mus. Donec sem lorem laoreet tempor un risus vitae, rutrum sodales nibh suspendisse congue metus nunc, id viverra elit loreti rhoncus quis consecteur es. Donec pulvinar tempor lorem a pretium justo interdum.</p>
            </div>
            <div class="about__item">
                <img src="<?php echo get_template_directory_uri(); ?>/img/about-value.jpg" alt="">
                <h2>our values, vision and strategy</h2>
                <h3>The above image would be a great place for an advertising video</h3>
                <p>Cras maximus venenatis malesuada. Nulla sagittis elit felis, ac facilisis quam ornare aliquam. Etiam cursus odio vitae dui dignissim, sed tempus lacus tincidunt et donec sapien velit, rhoncus eu nulla a, molestie tempus mi maecenas sagittis ornare.</p>
                <p>Pellentesque sapien mi, tincidunt nec magna vitae, volutpat elementum odioni lorem Aliquam tempor massa vitae augue mattis tempor id in ante ut augue erat, luctus eil.</p>
            </div>
            <div class="about__item">
                <img src="<?php echo get_template_directory_uri(); ?>/img/about-ethical.jpg" alt="">
                <h2>Ethical trading</h2>
                <h3>we oversee the working conditions of the people in the supply chain</h3>
                <p>Cras maximus venenatis malesuada. Nulla sagittis elit felis, ac facilisis quam ornare aliquam. Etiam cursus odio vitae dui dignissim, sed tempus lacus tincidunt et donec sapien velit, rhoncus eu nulla a, molestie tempus mi maecenas sagittis ornare.</p>
                <p>Pellentesque sapien mi, tincidunt nec magna vitae, volutpat elementum odioni lorem Aliquam tempor massa vitae augue mattis tempor id in ante ut augue erat, luctus eil.</p>
            </div>
            <div class="about__item awards">
                <img src="<?php echo get_template_directory_uri(); ?>/img/about-awards.jpg" alt="">
            </div>
        </div>
    </div>

<?php
get_footer();
