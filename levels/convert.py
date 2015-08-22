#!/usr/bin/python
from PIL import Image
from sys import argv
image = Image.open(argv[1])
width, height = image.size

level_index = argv[1].split('/')[-1].split('.')[0][5:]

red_to_tile = {
    0: 2,
    1: 1,
    2: 3,
    255: 0
}

javascript_string = "tilemaps[" + level_index + "] = new TileMap(" + str(width) + "," + str(height) + ",["
for y in range(height):
    for x in range(width):
        data = image.getpixel((x, y))
        javascript_string += str(red_to_tile[data[0]]) + ","
javascript_string += "]);";

print(javascript_string)
