/**
 * Lookbook card
 */

module.exports = {

    create: function( lookbook ){

        var card = document.createElement('li');
        card.classList.add('catalog-cards__item');
        card.classList.add('catalog-card');

        var price = '<span class="price"><sup></sup></span>';
        card.innerHTML = `
        <div class="catalog-card__wrap">
	    	<a href="" class="catalog-card__preview-wrap">
	    		<div class="catalog-card__preview" style="background-image: url(${lookbook.thumb});">
                    <div class="catalog-card__price">
	    				${price}
	    			</div>
	    			<button class="catalog-card__info-icon">
	    				<i class="fas fa-info-circle"></i>
	    			</button>
	    		</div><!-- catalog-card__preview -->
	    	</a>
	    </div><!-- catalog-card__wrap -->
        `;

        return card;
    }
 }