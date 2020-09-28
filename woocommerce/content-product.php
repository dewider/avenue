<?php
/**
 * The template for displaying product content within loops
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.6.0
 */

defined( 'ABSPATH' ) || exit;

global $product;

// Ensure visibility.
if ( empty( $product ) || ! $product->is_visible() ) {
	return;
}
?>

<?php
	$p_price = $product->get_price();
	$p_regular_price = $product->get_regular_price();
	$p_thumb = wp_get_attachment_image_url($product->get_image_id(), 'full');
	$p_title = $product->get_title();
	$p_desc = $product->get_description();
	$p_ID = $product->get_ID();
	$p_url = get_permalink($p_ID);
	$p_gallery = wp_get_attachment_url ( $product->get_gallery_image_ids()[0] );
?>

<li class="catalog-cards__item catalog-card">

	<div class="catalog-card__wrap">

		<a href="<?php echo $p_url; ?>" class="catalog-card__preview-wrap">
			<div class="catalog-card__preview" style="background-image: url(<?php echo $p_thumb; ?>;">
				<div class="catalog-card__price">
				<?php if ( $p_price < $p_regular_price ): ?>
					<span class="price old-price"><sup>£</sup><?php echo $p_regular_price; ?></span>
				<?php endif; ?>
	            	<span class="price"><sup>£</sup><?php echo $p_price; ?></span>
				</div>
				<div class="catalog-card__thumbs">
					<ul>
						<li><img src="<?php echo $p_thumb; ?>" alt=""></li>
						<li><img src="<?php echo  $p_gallery; ?>" alt=""></li>
					</ul>
				</div>
				<button class="catalog-card__info-icon">
					<i class="fas fa-info-circle"></i>
				</button>
			</div><!-- catalog-card__preview -->
		</a>
		<div class="catalog-card__desc">
            <h2>
                <?php echo $p_title; ?> <span class="price"><sup>£</sup><?php echo $p_price ?></span>
            </h2>
            <?php echo $p_desc; ?>
            <div class="catalog-card__buttons">
                <ul>
                    <?php /*<li><a href="?add-to-cart=<?php echo $p_ID; ?>" class="button product_type_simple add_to_cart_button ajax_add_to_cart" data-product_id="<?php echo $p_ID; ?>" data-quantity="1" rel="nofollow"><i class="fas fa-shopping-cart"></i></a></li>*/?>
                    <li><button class="catalog-card__to-cart" data-product_id="<?php echo $p_ID; ?>" data-quantity="1" rel="nofollow"><i class="fas fa-shopping-cart"></i></button></li>
                    <li><button><i class="far fa-heart"></i></button></li>
                    <li><button><i class="fas fa-compress-alt"></i></button></li>
                </ul>
            </div>
        </div>
	</div><!-- catalog-card__wrap -->
</li>
