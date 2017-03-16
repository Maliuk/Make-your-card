$.noConflict();
jQuery(document).ready(function ($) {

    $('.item-image').each(function () {
        var imgSrc = $('img', this).attr('src');
        if (imgSrc) {
            $(this).css('background-image', 'url("' + imgSrc + '")');
            $('img', this).remove();
        }
    });

    $(window).load(function () {
        $('.items .item-frame').each(function (i) {
            var _this = this;
            setTimeout(function () {
                $(_this).addClass('animate');
            }, i * 50);
        });
    });

    new Main();

});