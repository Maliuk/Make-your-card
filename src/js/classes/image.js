class ImageItem {

    constructor(url, textW = 100, textH = 100, textAngle = 0, text = "") {
        this.url = url;
        this.text = text;
    }

    toDomElement() {
        
    }

    setText(text = "") {
        this.text = text;
    }

    getText() {
        return this.text;
    }
}