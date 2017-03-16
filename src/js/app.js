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


        $(".scrollbar").mCustomScrollbar({
            axis:"xy",
            theme: "inset-2-dark"
        });

        $('.items .item-frame').click(function (e) {
            e.preventDefault();

            try {
                sessionStorage.setItem('test', 'test');
                window.location = "/edit.html";
            }
            catch (ex) {
                console.log(ex);
            }

        });
    });



    $('body').on("click", function () {
        return;
        /*var node = document.getElementById('content');

        node = document.body;

        domtoimage.toPng(node)
            .then(function (dataUrl) {
                var img = new Image();
                img.src = dataUrl;
                document.body.appendChild(img);
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });*/


        if (!$("div").is("#preview"))
            return;
        html2canvas($("#preview"), {
            onrendered: function(canvas) {
                document.body.appendChild(canvas);

                // Convert and download as image
                //Canvas2Image.saveAsPNG(canvas);
                //$("#img-out").append(canvas);
                // Clean up
                //document.body.removeChild(canvas);
            }
        });
    });

});