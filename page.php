<?php
/**
 * The brand page temlate
 *
 * @package avenue
 * 
 */

get_header();
?>
    <div class="menu-placeholder"></div>

	<div class="container">
    <?php
		while ( have_posts() ) :
			the_post();
			
			the_content();
			
		endwhile; // End of the loop.
	?>
	</div>

<?php
get_footer();
