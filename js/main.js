$.noConflict();
jQuery(document).ready(function ($) {


    $('.item-image').each(function () {
        var imgSrc = $('img', this).attr('src');
        if (imgSrc) {
            $(this).css('background-image', 'url("' + imgSrc + '")');
            $('img', this).remove();
        }
    });
});
