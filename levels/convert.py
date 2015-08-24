#!/usr/bin/python
from PIL import Image
from sys import argv
image = Image.open(argv[1])
width, height = image.size

level_index = argv[1].split('/')[-1].split('.')[0][5:]

rgb_to_tile = {
    (213, 206, 184) : "WALL_TOP",
    (213, 206, 184, 255) : "WALL_TOP",
    (171, 144, 123) : "WALL_BOTTOM",
    (171, 144, 123, 255) : "WALL_BOTTOM",
    (163, 148, 94)  : "WALL_BORDER",
    (163, 148, 94, 255)  : "WALL_BORDER",
    (218, 174, 141) : "FLOOR",
    (218, 174, 141, 255) : "FLOOR",
    (128, 128, 128) : "ROAD",
    (128, 128, 128, 255) : "ROAD",
    (191, 191, 191) : "PATH",
    (191, 191, 191, 255) : "PATH",
}

tile_to_i = {
    "WALL_TOP" : 3,
    "WALL_BOTTOM" : 1,
    "WALL_BORDER" : 2,
    "FLOOR" : 0,
    "ROAD": 5,
    "PATH" : 4
}

red_to_tile = {
    0: 2,
    1: 1,
    2: 3,
    253: 5,
    254: 4,
    255: 0,
}

green_to_marker= {
    0: "SPAWN",
    1: "C4",
    248: "TABLE_UP",
    249: "TABLE_DOWN",
    250: "TRIGGERPAD",
    251: "STEELDOOR",
    252: "GUARD_CATCH",
    253: "NPC",
    254: "METRO",
    255: "DOOR_UP",
}

tilemaps = "tilemaps[" + level_index + "] = new TileMap(" + str(width) + "," + str(height) + ",["
markers = "markers[" + level_index + "] = ["

for y in range(height):
    for x in range(width):
        CURX = x
        CURY = y
        data = image.getpixel((x, y))

        if data[0] == 0:
            tilemaps += str(data[1]) + ","
            markers += "[" + str(x) + "," + str(y) + ",\""

            if data[2] >= 100 and data[2] <= 200:
                markers += "COMPUTER_" + str(data[2]%100)
            else:
                markers +=  green_to_marker[data[2]]

            markers += "\"],"
        else:
            tilemaps += str(tile_to_i[rgb_to_tile[data]]) + ","

tilemaps += "]);"
markers += "];"

print(tilemaps)
print(markers)
