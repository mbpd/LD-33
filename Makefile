default:
	./levels/convert.py levels/level0.png > level0.js
	cat level0.js > html/levels.js
	rm level0.js
