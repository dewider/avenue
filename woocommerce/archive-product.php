<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/archive-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.4.0
 */

defined( 'ABSPATH' ) || exit;

get_header( 'shop' );

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
	<div class="catalog">
		<div class="container-xl catalog-cards__wrap">
			<?php
			if ( woocommerce_product_loop() ) {
			
				woocommerce_product_loop_start();
			
				if ( wc_get_loop_prop( 'total' ) ) {
					while ( have_posts() ) {
						the_post();
					
						/**
						 * Hook: woocommerce_shop_loop.
						 */
						do_action( 'woocommerce_shop_loop' );
					
						wc_get_template_part( 'content', 'product' );
					}
				}
			
				woocommerce_product_loop_end();
			}
			?>
		</div>
		<?php
			$total   = isset( $total ) ? $total : wc_get_loop_prop( 'total_pages' );
			$current = isset( $current ) ? $current : wc_get_loop_prop( 'current_page' );
			$base    = isset( $base ) ? $base : esc_url_raw( str_replace( 999999999, '%#%', remove_query_arg( 'add-to-cart', get_pagenum_link( 999999999, false ) ) ) );
			$format  = isset( $format ) ? $format : '';

			if ( $total > 1 ):
		?>
		<div class="container-xl">

			<nav class="catalog-pagination">
				<?php
				echo paginate_links(
					apply_filters(
						'woocommerce_pagination_args',
						array( // WPCS: XSS ok.
							'base'      => $base,
							'format'    => $format,
							'add_args'  => false,
							'current'   => max( 1, $current ),
							'total'     => $total,
							'prev_text' => '&larr;',
							'next_text' => '&rarr;',
							'type'      => 'list',
							'end_size'  => 3,
							'mid_size'  => 3,
						)
					)
				);
				?>
			</nav>
		</div>
			<?php endif; ?>
	</div>
<?php
get_footer( 'shop' );
