// check if grid shape has been mousePressed
//
var w; //width of grid
var h; // width of grid
var grid = [];
var mwidth= 30; //columns
var mHeight= 30; // rows
var timer;
var baseTime;
var chord = [];
var speed = 100;
var bugs = [];
var jitterS = 1;
var jitterAmount = 3000;
var hu; // hue
var sat; // saturation
var bri; // brightness
var duration = 200;; //length of note
var channel = 16;
var synth = [];
var noteCollection = [0,4,6,8,10];
var baseNote = 40;
var octave = 5;
var jitterCounter = 0;

var props = {
	JitterSize: jitterCounter,
	NoteDuration: duration,
	Octave: octave,
};

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 50, .1);
	w = width/mwidth;
	h = height/mHeight;
	timer = 0;
	baseTime = 0;
	multiArray();
	notes();
	jit();
	ui();
	//making the range of chords
	for (var i = 0; i < mHeight; i++) {
		chord[i] = baseNote + noteCollection[i % 5]+parseInt(i/octave)*12; //number of notes wihtin cord + i / octave
	}
}


function multiArray(){
	for (var i = 0; i < mwidth; i++) {
		grid[i]=[]; // new 2d array
		for (var j= 0; j< mHeight; j++) {
			grid[i][j]= 0; //2d array is filled with 0
			console.log(grid[i][j])
		}
	}
}

function draw() {
	background(200, 100, 0, .01);
	gridSettings();
	bgrd();
	hu = random(255);
	fill(360, 0, 100);
  //jitterCounter ++;
	reactSound();
	rect(timer % (mwidth) * w+w/2, height/2, 4, height); // move the timer along the grid
}

function ui(){
	gui = new dat.GUI;
	var v = gui.addFolder('Change the visualisation');
	v.add(props, 'JitterSize', 0, 600);
	v.open();
}

function gridSettings(){
	rectMode(CENTER);
	for (var i = 0; i < mwidth; i++) {
		for (var j = 0; j < mHeight; j++) {
			push();
			translate(i*w+w/2, j*h+h/2); // grid position
			if (grid[i][j]== 1) {
				gridColour();
			} else {
				gridStroke();
			}
			pop();
		}
		clockCount();
	}
}

function clockCount() { // playing speed counter
	var elapsedTime = millis() - baseTime;
	if (elapsedTime > (speed)){
		baseTime = millis();
		timer++;
		playSound(timer % mwidth);
	}
}


function mouseDetect(x, y, width, height) { // wheres the mouse
	if (mouseX >= x && mouseX <= x + width &&
		mouseY >= y && mouseY <= y + height) {
			return 1;
		}  else {
			return 0;
		}
	}

	function gridStroke(){ //circle stroke (unpressed)
		rectMode(CENTER);
		noFill();
		strokeWeight(1);
		stroke(255);
		rectMode(CENTER);
		ellipse(0, 0, 20, 20);
	}

	function gridColour(){ //circle filled (playing circle)
		noStroke();
		fill(255);
		ellipse(0, 0, 20, 20);
	}


	function playSound(x){
		for (var j = 0; j < mHeight; j++) {
			if (grid[x][j] == 1){ //if button is clicked
				playNote(x, chord[j], duration); // play a note
			}
		}
	}

	function mousePressed(){
		reactSound();
		props.JitterSize++;
		for (var i= 0; i < mwidth; i++) {
			for (var j= 0; j < mHeight; j++) {
				if (mouseDetect(i*w, j*h, w, h)) { //giving the funciton params to align to the grid
					grid[i][j]= 1;
					for(var k = 0; k < mHeight; k++){
						if(j != k){
							grid[i][k]= 0;
						}
					}
				}
			}
		}
	}

	function notes(){
		for(var i=0; i < channel; i++){
			synth[i] = new p5.Oscillator();
			synth[i].setType('sine');
			synth[i].start();
			synth[i].amp(0);
		}
		synth[0].setType('sine');
		synth[1].setType('sine');
		synth[2].setType('sine');
		synth[4].setType('sine');
		synth[5].setType('sine');
		synth[6].setType('sine');
		synth[7].setType('sine');
	}

	function playNote(chan, note, duration) {
		synth[chan%channel].freq(midiToFreq(note));
		if (duration>0) {
			setTimeout(function() {
				synth[chan%channel].fade(0,0.5);
			}, duration-1 );
		}
	}




	//jitter

	function jit(){
		//positon of the background particles
		for (var i = 0; i < jitterAmount; i++) {
			var x = round((random(width / jitterCounter)) * jitterS);
			var y = round(random(height / jitterCounter) * jitterS);
			var r = jitterS;
			var h = random(0, 360);
			bugs[i] = new Jitter(x, y, r, h);
		}
	};

	function bgrd(){ // jitter
		for (var i = 0; i < jitterAmount; i++) {
			bugs[i].move();
			bugs[i].show();

		}
	}

	function reactSound() {

		jitterS = props.JitterSize*0.5;
		jitterAmount = round(random(0, 2000));
		//if (jitterS < 2) jitterAmount = round(random(500, 2000));
		for (var i = 0; i < jitterAmount; i++) {
			var x = round(random(width / jitterS)) * jitterS;
			var y = round(random(height / jitterS)) * jitterS;
			var r = jitterS;
			var h = random(0, 360);
			bugs[i] = new Jitter(x, y, r, h);
		}
	}
