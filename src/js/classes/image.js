class ImageItem {
    constructor(url, textW = 100, textH = 100, top = 0, left = 0, rotate = 0, text = "") {
        this.url = url;
        this.text = text;
        this.textW = textW;
        this.textH = textH;
        this.top = top;
        this.left = left;
        this.rotate = rotate;
    }

    appendToDomElement() {
        let html = '<div class="pr-body">' +
            '<img id="pr-image" src="' + this.url + '" />' +
            '<div id="pr-text">' +
            this.text +
            '</div>' +
            '</div>';
        $('#preview').html(html);

        $('#pr-text').css({
            'width': this.textW,
            'height': this.textH,
            'top': this.top,
            'left': this.left,
            '-webkit-transform': 'rotate(' + this.rotate + ')',
            '-moz-transform': 'rotate(' + this.rotate + ')',
            '-ms-transform': 'rotate(' + this.rotate + ')',
            '-o-transform': 'rotate(' + this.rotate + ')',
            'transform': 'rotate(' + this.rotate + ')'
        });
        $('#mini-image img, #mini-result img').attr('src', this.url);
    }

    setText(text = "") {
        this.text = text;
        $('#pr-text').html(this.text);
    }

    getText() {
        return this.text;
    }

    saveImage() {
        let link;
        if (!$('a').is('#download')) {
            link = document.createElement('a');
            link.innerHTML = 'download image';
            link.id = 'download';
            link.download = "noname.png";
            document.body.appendChild(link);
        }
        else {
            link = $('a#download').get(0);
        }

        if (!$("div").is("#preview"))
            return;
        html2canvas($("#preview"), {
            onrendered: function (canvas) {
                //document.body.appendChild(canvas);
                //link.href = canvas.toDataURL();
                $(link).attr('href', canvas.toDataURL());
                link.click();
            }
        });
    }

    shareFB() {

    }

    upload() {
        html2canvas($("#preview"), {
            onrendered: function (canvas) {
                $.ajax({
                    type: "POST",
                    url: "upload.php",
                    data: {
                        img: canvas.toDataURL()
                    }
                }).done(function (response) {
                    console.log(response);
                    FB.ui({
                        method: 'share',
                        href: 'http://demo.yoursites.online/' + response,
                        image: 'http://demo.yoursites.online/' + response
                    }, function (response) {

                        //TODO Proper response handling
                        log(response);
                        if (typeof response != 'undefined') {
                            alert('Thanks for sharing');
                        }
                    });
                }).error(function (error) {
                    console.warn(error);
                });
            }
        });

    }
}