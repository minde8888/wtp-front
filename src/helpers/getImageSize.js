function getImage64(file) {
    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    throw new Error("Error wrong image format");
}


function getImage(image64) {
    if (typeof image64 === "string") {
        return new Promise((resolve, reject) => {
            var image = new Image();
            image.src = image64;
            image.onload = () => resolve(image);
            image.onerror = error => reject(error);
        });
    }

    throw new Error("Not able to convert to perfect Base64");
}

export async function getImageSize(imageFile, type) {
    var image64 = await getImage64(imageFile).then((data) => { return data });
    return await getImage(image64).then((image) => {
        var maxWidth;
        var maxHeight;

        switch (type) {
            case "Profile_image":
                maxWidth = 290
                maxHeight = 228
                break;
            default:
                console.log(`Couldn't find: ${type}.`);
        }

        const ratio = Math.min(maxWidth / image.width, maxHeight / image.height)
        const width = image.width * ratio + .5 | 0
        const height = image.height * ratio + .5 | 0

        return { Height: height, Width: width }
    });

}





