default:
	./levels/convert.py levels/level0.png > level0.js
	./levels/convert.py levels/level1.png > level1.js
	echo "var tilemaps = []; var markers = [];" > header
	cat header level0.js level1.js > html/levels.js
	rm level0.js
	rm level1.js
	rm header
