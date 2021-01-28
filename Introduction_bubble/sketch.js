let bubbleGifs = [];
let bubblePopGifs = [];
let bubbles = [];
let amount = 30;
let mousePos;
let size;
let bubbleSize = 200;


function preload() {

  // create initial bubble GIFS; store them in an array
  for(let i = 0; i < amount; i++) {
    let b = createImg("bubble.gif", "bubble");
    bubbleGifs.push(b);
  }
  size = bubbleGifs[0].width;
}

function setup() {
  let cnv = createCanvas(innerWidth, innerHeight);
  cnv.parent("#sketch-parent");
  
  
  // create Bubbles with random x and y positions; store them in an array
  for(let i = 0; i < amount; i++) {
    let b = new Bubble();
    bubbles.push(b);
  }
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

function draw() {
  background(0,0,0,0);
  
  // draw the bubbleGifs based on the positions of the bubbles
  for(let i=0; i < bubbles.length; i++) {
    bubbles[i].update();
    bubbleGifs[i].position(bubbles[i].pos.x, bubbles[i].pos.y);
  }
}

class Bubble {
  constructor() {
    this.pos = createVector(random(width-size), random(height-size));
    this.vel = createVector(random(-.5, .5), random(-.5, .5));
  }
  
  update() {
    this.pos.add(this.vel);
    this.checkWalls();
  }
  
  checkWalls() {
    if(this.pos.x > width - size) {
      this.vel.x*=-1;
    }
    if(this.pos.x < 0) {
      this.vel.x*=-1;
    }
    if(this.pos.y > height - size) {
      this.vel.y*=-1;
    }
    if(this.pos.y < 0) {
      this.vel.y*=-1;
    }
  }
}

// checks if a bubble should be popped. When a user clicks, this function checks to see if the mouse position is within a bubble. If it is, the bubbleGif is removed, and a bubblePopGif is created and diplayed where the bubble used to be. The next time a bubble is clicked, the previous bubblePopGif is removed before a new one is created where the user clicked.
function popBubble(_mousePos) {
  
  let oneClick = true;
  console.log("clicked")
  
  // check all bubbles to see if click location is inside a bubble
  for(let i = 0; i < bubbles.length; i++) {
    // if the distance from the center of the current bubble to
    // the position of the mouse click is less than the size of the GIF...
    // also makes sure to only remove a single bubble for each click
    if(dist(bubbles[i].pos.x, bubbles[i].pos.y, _mousePos.x, _mousePos.y) < bubbleSize && oneClick) {
      oneClick = false;
      // remove the bubbleGif that was clicked (removes bubbleGif from the DOM)
      bubbleGifs[i].remove();
      
      // removes the empty bubbleGif from the array
      bubbleGifs.splice(i, 1);
      
      
      // remove any pre-existing bubblePopGifs
      if(bubblePopGifs.length > 0) {
        bubblePopGifs[0].remove();
        bubblePopGifs = [];
      }
      
      // create a bubblePopGif and store it in an array
      bubblePopGifs.push(createImg("bubble_broken.gif", "Broken Bubble"));
      
      // display the bubblePopGif where the bubbleGif was
      bubblePopGifs[0].position(bubbles[i].pos.x, bubbles[i].pos.y);
      
      // remove the clicked bubble object from the array.
      bubbles.splice(i, 1);
    }
  }
}

function mousePressed() {
  mousePos = createVector(mouseX, mouseY);
  popBubble(mousePos);
}
