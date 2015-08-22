default:
	./levels/convert.py levels/level0.png > level0.js
	echo "var tilemaps = [];" > header
	cat header level0.js > html/levels.js
	rm level0.js
	rm header
