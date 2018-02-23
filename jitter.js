
function Jitter(tempX, tempY, tempDiameter, tempHue) {
  this.x = tempX;
  this.y = tempY;
  this.diameter = tempDiameter;
  this.h = tempHue;

  this.show = function() {
    noStroke();

    fill(tempHue, 255,255, 255);
    rect(this.x, this.y, this.diameter, this.diameter);
  }

  this.move = function() {
    var tx = round(random(-1, 1));
    var ty = round(random(-1, 1));
    this.x += (tx * jitterS);
    if ((this.x > width+(jitterS * 8)) || (this.x < -jitterS * 8)) { this.x = round(random(width / jitterS)) * jitterS; }
    this.y += (ty * jitterS);
    if ((this.y > height+(jitterS * 8)) || (this.y < -jitterS * 8)) { this.y = round(random(height / jitterS)) * jitterS;}
 }
}
