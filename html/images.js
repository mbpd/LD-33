var imagesToLoad = [
    "metro",
    "background",
    "station",
    "stallman_right",
    "stallman_left",
    "mark_c4",
    "cursor_default",
    "cursor_c4",
    "cursor_use",
    "cursor_talk",
    "door_up_open",
    "door_up_closed",
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
