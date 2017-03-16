var fs = require('fs');

function parseImageName(pathToImage) {
    var re = /..\/..\/uploads\/(.*)/;
    var matches = pathToImage.match(re);

    if (matches) { return matches[1]; }
    return false;
}

function deleteImage(pathToImage) {
    if (!pathToImage) return

    var basePath = __dirname + "/../../public/uploads/";
    var imageName = parseImageName(pathToImage);

    if (imageName) {
        pathToImage = basePath + imageName;

        fs.unlink(pathToImage, function(err) {
            if(err && err.code == 'ENOENT') {
                console.info("Cannot find file to delete");
            } else if (err) {
                console.error("Error occurred while trying to remove file");
            }
        });
    }
}

module.exports = deleteImage;
