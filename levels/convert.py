#!/usr/bin/python
from PIL import Image
from sys import argv
image = Image.open(argv[1])
width, height = image.size

level_index = argv[1].split('/')[-1].split('.')[0][5:]

javascript_string = "levels[" + level_index + "] = ["
for y in range(height):
    for x in range(width):
        data = image.getpixel((x, y))
        javascript_string += "[" + str(data[0]) + "," + str(data[1]) + "," + str(data[2]) + "],"
javascript_string += "]";

print(javascript_string)
