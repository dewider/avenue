/*
 *  Search
*/

module.exports = {

    init: function(){

        var searchForm = document.querySelector('form.search-field');
        var searchFormSubmit = searchForm.querySelector('.search-fiel__submit');

        searchFormSubmit.addEventListener('click', function(e){

            e.preventDefault()

            searchForm.submit();
        });
    }
}