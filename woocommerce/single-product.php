<?php
/**
 * The Template for displaying all single products
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see         https://docs.woocommerce.com/document/template-structure/
 * @package     WooCommerce\Templates
 * @version     1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

get_header( 'shop' ); ?>

<?php global $product; ?>

<?php while ( have_posts() ) : ?>
	<?php the_post(); ?>

	<?php
		$p_price = $product->get_price();
		$p_regular_price = $product->get_regular_price();
		$p_thumb = wp_get_attachment_image_url($product->get_image_id(), 'full');
		$p_title = $product->get_title();
		$p_desc = $product->get_description();
		$p_short = $product->get_short_description();
		$p_ID = $product->get_ID();
		//$p_url = get_permalink($p_ID);
		$p_gallery = wp_get_attachment_url ( $product->get_gallery_image_ids()[0] );
		$p_currency_symbol = get_currency_symbol();
	?>


	<div class="menu-placeholder"></div>
	<div class="top-banner-internal">
	    <div class="top-banner-internal__text">
	        <div class="top-banner-internal__title">
	            <h1><span class="bold">PRODUCT</span> VIEW</h1>
	        </div>
	        <p>MENS - CASUALS - HOODIES & SWEATSHIRTS - AVE CLASSIC SWEATSHIRT</p>
	    </div>
	</div>
	<div class="container">
	    <div class="product">
	        <div class="product__top">
	            <div class="product__preview">
					<div class="product-preview" style="background-image: url(<?php echo $p_thumb; ?>);">
						<button class="product-preview__nav product-preview__prev">
							<i class="fas fa-angle-left"></i>
						</button>
						<button class="product-preview__nav product-preview__next">
							<i class="fas fa-angle-right"></i>
						</button>
						<ul class="product-preview__links">
							<li><?php echo $p_thumb; ?></li>
							<li><?php echo $p_gallery; ?></li>
						</ul>
					</div>
	            </div>
	            <div class="product__text">
	                <div class="product__title">
	                    <h1><?php echo $p_title; ?></h1>
	                </div>
	                <div class="product__feedback">
	                    <div class="product__stars">
	                        <ul>
	                            <li class="gold"><i class="fas fa-star"></i></li>
	                            <li class="gold"><i class="fas fa-star"></i></li>
	                            <li class="gold"><i class="fas fa-star"></i></li>
	                            <li class="gold"><i class="fas fa-star"></i></li>
	                            <li><i class="fas fa-star"></i></li>
	                        </ul>
	                    </div>
	                    <span>3 Review(s)</span>
	                    <div class="product__add-review-button">
	                        <button>Add a Review</button>
	                    </div>
	                    <div class="product__share-buttons">
	                        <span>Share: </span>
	                        <ul>
	                            <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
	                            <li><a href="#"><i class="fab fa-twitter"></i></a></li>
	                            <li><a href="#"><i class="fab fa-google-plus-g"></i></a></li>
	                            <li><a href="#"><i class="fab fa-pinterest-p"></i></a></li>
	                            <li><a href="#"><i class="fab fa-instagram"></i></a></li>
	                            <li><a href="#"><i class="far fa-envelope"></i></a></li>
	                        </ul>
	                    </div>
	                </div>
	                <div class="product__price">
						<?php if ( $p_price < $p_regular_price ): ?>
						<span class="price old-price"><sup><?php echo $p_currency_symbol; ?></sup><?php echo $p_regular_price; ?></span>
						<?php endif; ?>
	                    <span class="price"><sup><?php echo $p_currency_symbol; ?></sup><?php echo $p_price; ?></span>
	                </div>
	                <div class="product__details">
	                    <ul>
	                        <li><span class="bold">AVAILABILITY:</span> In stock</li>
	                        <li><span class="bold">PRODUCT CODE:</span> #499577</li>
	                        <li><span class="bold">TAGS:</span> <span class="product__tags">Classic, Casual, V-neck, Loose</span></li>
	                    </ul>
	                </div>
	                <div class="product__short">
	                    <?php echo $p_short; ?>
	                </div>
	                <div class="product__specs">
	                    <form action="#">
	                        <div class="product__specs-field">
	                            <label for="color">COLOR</label>
	                            <select name="color">
	                                <option value disabled selected>Select Colour</option>
	                                <option value="Red">Red</option>
	                                <option value="Black">Black</option>
	                            </select>
	                        </div>
	                        <div class="product__specs-field">
	                            <label for="size">SIZE</label>
	                            <select name="size">
	                                <option value disabled selected>Select Size</option>
	                                <option value="S">S</option>
	                                <option value="M">M</option>
	                            </select>
	                        </div>
	                        <div class="product__specs-field">
	                            <label for="qty">QTY</label>
	                            <div class="qty-selector">
	                                <input name="qty" id="qtyInput" value="1">
	                                <div class="qty-selector__buttons">
	                                    <button class="qty-selector__up"><i class="fas fa-angle-up"></i></button>
	                                    <button class="qty-selector__down"><i class="fas fa-angle-down"></i></button>
	                                </div>
	                            </div>
	                        </div>
	                    </form>
	                </div>
	                <div class="product__buttons">
	                    <button class="transparrent-button add-to-cart" data-product_id="<?php echo $p_ID; ?>"><i class="fas fa-shopping-cart"></i>ADD TO CART</button>
	                    <button class="transparrent-button add-to-lookbook"><i class="far fa-heart"></i>ADD TO LOOKBOOK</button>
	                </div>
	                <div class="product__to-compare">
	                    <button><div class="circle-button"><i class="fas fa-compress-alt"></i></div> ADD TO COMPARE</button>
	                </div>
	            </div>
	        </div><!-- product__top -->
	        <div class="product__bottom">
	            <div class="product__tabs">
	                <ul>
	                    <a href="#"><li class="active">DESCRIPTION</li></a>
	                    <a href="#"><li>VIDEO</li></a>
	                    <a href="#"><li>SIZE & SPECS</li></a>
	                    <a href="#"><li>DELIVERY & RETURNS</li></a>
	                    <a href="#"><li>REVIEWS</li></a>
	                </ul>
	            </div>
	            <div class="product__desc">
	                <?php echo $p_desc; ?>
	            </div>
	        </div>
	    </div><!-- product -->
	</div>
<?php endwhile; // end of the loop. ?>


<?php
get_footer( 'shop' );

/* Omit closing PHP tag at the end of PHP files to avoid "headers already sent" issues. */
