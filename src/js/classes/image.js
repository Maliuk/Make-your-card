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
        var html = '<div class="pr-body">' +
                    '<img id="pr-image" src="'+ this.url +'" />' +
                    '<div id="pr-text">' +
                    'Integer semper ut libero vel aliquet. Cras vel ipsum sed nibh vestibulum lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis in quam dapibus, iaculis libero ac, vestibulum odio. Phasellus fermentum sapien at magna faucibus, ac convallis velit ultricies. Morbi eget enim vel elit cursus ultrices id quis nisl. Cras maximus facilisis venenatis.' +
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

        $('#mini-image .item-image, #mini-result .item-image').css('background-image', 'url("' + this.url + '")');
    }

    setText(text = "") {
        this.text = text;
        $('#pr-text').html(this.text);
    }

    getText() {
        return this.text;
    }
}