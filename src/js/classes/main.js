class Main {
    constructor() {
        this.image;

        this.windowLoad();
        this.editPageEvents();
        this.saveImage();
        this.shareImage();

    }

    windowLoad() {
        $('.items .item-image').each(function () {
            var imgSrc = $('img', this).attr('src');
            if (imgSrc) {
                $(this).css('background-image', 'url("' + imgSrc + '")');
                $('img', this).remove();
            }
        });

        $(window).load(function () {
            $(".scrollbar").mCustomScrollbar({
                axis:"xy",
                theme: "inset-2-dark"
            });

            $('.preloader').addClass('disable');
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
    }

    editPageEvents() {
        let timeOutId = null;

        let previewUpdate = function () {
            if (timeOutId)
                clearTimeout(timeOutId);

            timeOutId = setTimeout(function () {
                html2canvas($("#preview"), {
                    onrendered: function(canvas) {
                        //document.body.appendChild(canvas);
                        $('#mini-result .item-image').html(canvas);
                    }
                });
            }, 1000);
        }

        if (window.location.toString().indexOf('edit.html') > -1 && !sessionStorage.getItem('image')) {
            window.location = "/";
        }

        if ($("div").is("#preview") && sessionStorage.getItem('image')) {
            var image = JSON.parse(sessionStorage.getItem('image'));
            var imgObj = new ImageItem(image.url, image.textWidth, image.textHeight, image.top, image.left, image.rotate);
            this.image = imgObj;
            imgObj.appendToDomElement();

            $('#input-text').on("keyup", function () {
                $('#mini-text .item-image').html($(this).html());
                imgObj.setText($(this).html());

                previewUpdate();
            });

            $('#input-text').keydown(function(e) {
                // trap the return key being pressed
                if (e.keyCode === 13) {
                    // insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
                    document.execCommand('insertHTML', false, '<br><br>');
                    // prevent the default behaviour of return key pressed
                    return false;
                }
            });

            $('#input-text, #pr-text, #mini-text').css('font-family', $('#select-font').val());
            $('#select-font').on("change", function () {
                $('#input-text, #pr-text, #mini-text').css('font-family', $(this).val());
                previewUpdate();
            });

            $('#font-size').on("change", function () {
                $('#input-text, #pr-text').css('font-size', $(this).val() + 'px');
                previewUpdate();
            });

            var picker = new CP(document.querySelector('input#font-color'));
            picker.on("change", function(color) {
                this.target.value = '#' + color;
                $('#input-text, #pr-text, #mini-text').css('color', '#' + color);
                previewUpdate();
            });

            $('#mini-result').click(function () {
                html2canvas($("#preview"), {
                    onrendered: function(canvas) {
                        //document.body.appendChild(canvas);
                        $('.pr-modal .pr-body').html(canvas);
                        $('.pr-modal').addClass('shown');
                    }
                });
            });

            $('.pr-modal').click(function (){
                $(this).removeClass('shown');
            });
        }
    }

    saveImage() {
        let _this = this;
        if (this.image) {
            $('#btn-download').on("click", function (e) {
                e.preventDefault();
                _this.image.saveImage();
            });
        }
    }

    shareImage() {
        let _this = this;
        if (this.image) {
            $('#btn-poster').on("click", function (e) {
                e.preventDefault();
                _this.image.shareFB();
            });
        }
    }

}