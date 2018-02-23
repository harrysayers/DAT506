function bugs(){
		//positon of the background particles
		for (var i = 0; i < tiles; i++) {
			var x = round((random(width / tileSize)) * tileSize);
			var y = round(random(height / tileSize) * tileSize);
			var r = tileSize;
			var h = random(0, 360);
			bugs[i] = new Jitter(x, y, r, h);
		}
}

function bgrd(){ // jitter
	for (var i = 0; i < tiles; i++) {
		bugs[i].move();
		bugs[i].show();

	}
}

function reactSound() {
  tileSize = random(0.25, 10);
  tiles = round(random(0, 1500));
  if (tileSize < 2) tiles = round(random(500, 2000));

  for (var i = 0; i < tiles; i++) {
    var x = round(random(width / tileSize)) * tileSize;
    var y = round(random(height / tileSize)) * tileSize;
    var r = tileSize;
    var h = random(0, 360);
    bugs[i] = new Jitter(x, y, r, h);
  }
}
