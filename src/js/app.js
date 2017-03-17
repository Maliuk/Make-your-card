$.noConflict();
window.$ = jQuery;
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


        $(".scrollbar").mCustomScrollbar({
            axis:"xy",
            theme: "inset-2-dark"
        });
    });


    $('.items .item-frame').click(function (e) {
        e.preventDefault();

        var image = {
            url: $(this).data('url'),
            textWidth: $(this).data('text-width'),
            textHeight: $(this).data('text-height'),
            top: $(this).data('top'),
            left: $(this).data('left'),
            rotate: $(this).data('rotate')
        };

        try {
            sessionStorage.setItem('image', JSON.stringify(image));
            window.location = "/edit.html";
        }
        catch (ex) {
            console.log(ex);
        }
    });


    (function () {
        if (window.location.toString().indexOf('edit.html') > -1 && !sessionStorage.getItem('image')) {
            window.location = "/";
        }

        if ($("div").is("#preview") && sessionStorage.getItem('image')) {
            var image = JSON.parse(sessionStorage.getItem('image'));
            var imgObj = new ImageItem(image.url, image.textWidth, image.textHeight, image.top, image.left, image.rotate);
            imgObj.appendToDomElement();

            $('#input-text').on("keyup", function () {
                $('#mini-text .item-image').html($(this).html());
                imgObj.setText($(this).html());

                html2canvas($("#preview"), {
                    onrendered: function(canvas) {
                        document.body.appendChild(canvas);
                        $('#mini-result .item-image').html(canvas);
                    }
                });
            });
        }
    })();



    var link = document.createElement('a');
    link.innerHTML = 'download image';
    link.id = 'download';
    link.download = "mypainting.png";
    document.body.appendChild(link);

    $('.btn').on("click", function (e) {
        e.preventDefault();
        var _this = this;

        if (!$("div").is("#preview"))
            return;
        html2canvas($("#preview"), {
            onrendered: function(canvas) {
                document.body.appendChild(canvas);

                link.href = canvas.toDataURL();
                link.click();

                //var image = canvas.toDataURL('image/jpeg', 0.5);
                //var image = canvas.toDataURL('image/jpeg', 1.0).replace("image/jpeg", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
                //window.location.href = image; // it will save locally

                //$(_this).href(canvas.toDataURL('image/jpeg', 1.0));
            }
        });
    });

});