function getImage64(file) {
    console.log(file);
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

export async function getImageSize(imageFile) {
    var image64 = await getImage64(imageFile).then((data) => { return data });
    return await getImage(image64).then((image) => { return { height: image.height, width: image.width } });

}



    // const onFileChange = async (e) => {
    //     const maxWidth = 320
    //     const maxHeight = 240
    //     var imageFile = e.target.files[0];



    //     console.log("w" + imageSize.width, "h" + imageSize.height);

    //     const ratio = Math.min(maxWidth / imageSize.width, maxHeight / imageSize.height)
    //     const width = imageSize.width * ratio + .5 | 0
    //     const height = imageSize.height * ratio + .5 | 0

    //     console.log("w" + width, "h" + height);
    // };
    // return (<input type="file" onChange={(e) => onFileChange(e)} />)


