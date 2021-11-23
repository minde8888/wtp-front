export function getImageSize(file) {

    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
        var reader = new FileReader();
        var read = reader.onload = () => {
            var image = new Image();
            var value = image.onload = () => {
                var size = { width: image.width, height: image.height };
                return size;
            }
            image.src = reader.result;
            console.log(value());
            return value();
        }
        reader.readAsDataURL(file);
        console.log(read());
        return read();
    }
    
}