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

green_to_marker= {
0: "SPAWN",
1: "C4"
}

tilemaps = "tilemaps[" + level_index + "] = new TileMap(" + str(width) + "," + str(height) + ",["
markers = "markers[" + level_index + "] = ["

for y in range(height):
    for x in range(width):
        data = image.getpixel((x, y))

        tilemaps += str(red_to_tile[data[0]]) + ","

        if data[1] in green_to_marker:
            markers += "[" + str(x) + "," + str(y) + ",\"" + green_to_marker[data[1]] + "\"],"

tilemaps += "]);"
markers += "];"

print(tilemaps)
print(markers)
