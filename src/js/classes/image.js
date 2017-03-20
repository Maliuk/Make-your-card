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
        html2canvas($("#preview"), {
            onrendered: function (canvas) {
                let data = canvas.toDataURL('image/png');
                try {
                    var blob = dataURItoBlob(data);
                } catch (e) {
                    console.log(e);
                }
                FB.getLoginStatus(function (response) {
                    console.log(response);
                    if (response.status === "connected") {
                        postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook", "image/png", blob, "http://bit.ly/1QK0Qbsz");
                    } else if (response.status === "not_authorized") {
                        FB.login(function (response) {
                            postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook", "image/png", blob, "http://bit.ly/1QK0Qbsz");
                        }, {scope: "publish_actions"});
                    } else {
                        FB.login(function (response) {
                            postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook", "image/png", blob, "http://bit.ly/1QK0Qbsz");
                        }, {scope: "publish_actions"});
                    }
                });
            }
        });
    }
}

function postImageToFacebook(token, filename, mimeType, imageData, message) {
    var fd = new FormData();
    fd.append("access_token", token);
    fd.append("source", imageData);
    fd.append("no_story", true);

    $('.preloader').removeClass('disable');
    
    // Upload image to facebook without story(post to feed)
    $.ajax({
        url: "https://graph.facebook.com/me/photos?access_token=" + token,
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        cache: false,
        success: function (data) {
            console.log("success: ", data);
            // Get image source url
            FB.api(
                "/" + data.id + "?fields=images",
                function (response) {
                    if (response && !response.error) {
                        //console.log(response.images[0].source);
                        // Create facebook post using image
                        FB.api(
                            "/me/feed",
                            "POST",
                            {
                                "message": "",
                                "picture": response.images[0].source,
                                "link":  response.images[0].source,
                                "name": 'Try to do the same',
                                "description": message,
                                "privacy": {
                                    value: 'SELF'
                                }
                            },
                            function (response) {
                                if (response && !response.error) {
                                    /* handle the result */
                                    console.log("Posted story to facebook");
                                    console.log(response);
                                    $('.preloader').addClass('disable');

                                    $('.pr-modal .pr-body').html('<h2 class="text-center">Shared on facebook</h2>');
                                    $('.pr-modal').addClass('shown');
                                }
                            }
                        );
                    }
                }
            );
        },
        error: function (shr, status, data) {
            console.log("error " + data + " Status " + shr.status);
        },
        complete: function (data) {
            console.log('Post to facebook Complete');
        }
    });
}

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}