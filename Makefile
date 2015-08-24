default:
	./levels/convert.py levels/level0.png > level0.js
	./levels/convert.py levels/level1.png > level1.js
	./levels/convert.py levels/level2.png > level2.js
	echo "var tilemaps = []; var markers = [];" > header
	cat header level0.js level1.js level2.js > html/levels.js
	rm level0.js
	rm level1.js
	rm level2.js
	rm header
