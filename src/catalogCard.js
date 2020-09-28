/**
 * Catalog card
 */

 module.exports = {

    create: function( product ){

        var card = document.createElement('li');
        card.classList.add('catalog-cards__item');
        card.classList.add('catalog-card');

        var price = '<span class="price"><sup>£</sup>' + product.price + '</span>';
        // если действует акция
        if ( product.price != product.regularPrice ){

            price = '<span class="price old-price"><sup>£</sup>' + product.regularPrice + '</span>' + price;
        }
        card.innerHTML = `
        <div class="catalog-card__wrap">

	    	<a href="${product.url}" class="catalog-card__preview-wrap">
	    		<div class="catalog-card__preview" style="background-image: url(${product.thumb});">
                    <div class="catalog-card__price">
	    				${price}
	    			</div>
	    			<div class="catalog-card__thumbs">
	    				<ul>
	    					<li><img src="${product.thumb}" alt=""></li>
	    					<li><img src="${product.gallery}" alt=""></li>
	    				</ul>
	    			</div>
	    			<button class="catalog-card__info-icon">
	    				<i class="fas fa-info-circle"></i>
	    			</button>
	    		</div><!-- catalog-card__preview -->
	    	</a>
	    	<div class="catalog-card__desc">
                <h2>
                    ${product.title} <span class="price"><sup>£</sup>${product.price}</span>
                </h2>
                    ${product.desc}
                <div class="catalog-card__buttons">
                    <ul>
                        <li><button class="catalog-card__to-cart" data-product_id="${product.ID}" data-quantity="1" rel="nofollow"><i class="fas fa-shopping-cart"></i></button></li>
                        <li><button><i class="far fa-heart"></i></button></li>
                        <li><button><i class="fas fa-compress-alt"></i></button></li>
                    </ul>
                </div>
            </div>
	    </div><!-- catalog-card__wrap -->
        `;

        return card;
    }
 }