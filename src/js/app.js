$.noConflict();
window.$ = jQuery;
jQuery(document).ready(function ($) {
    new Main();

    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1328361773895736',
            status: true,
            cookie: true,
            xfbml: true,
            channelUrl : '//demo.yoursites.online',
            version    : 'v2.8'
        });
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
});