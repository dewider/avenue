/**
 * AJAX requests
 */

module.exports = {

    /**
     * простой запрос
     */
    createRequest: function( method, url, callback ){

        var request = new XMLHttpRequest();
        request.open( method, url);
        request.setRequestHeader('Content-Type', 'application/json');
        request.addEventListener('readystatechange', callback);
        return request;
    },

    /**
     * запрос с авторизацией WP
     */
    createAuthRequest: function( method, url, callback, nonce){

        var request = this.newRequest( method, url, callback );
        request.setRequestHeader('X-WP-Nonce', nonce);
        return request;
    }
}