var imagesToLoad = [
    "metro",
    "landscape",
    "stallman_right",
    "stallman_left",
    "mark_c4",
]

var images = {};

var current_image = 0;
var BASE_IMAGE_URL = "images/";

function loadNextImage()
{
    if(current_image == imagesToLoad.length)
    {
        afterLoadImages();
        return;
    }

    current_image++;

    var img = new Image();
    img.onload = loadNextImage;
    img.src = BASE_IMAGE_URL + imagesToLoad[current_image-1] + ".png";

    images[imagesToLoad[current_image-1]] = img;
}

var loadImages = loadNextImage
