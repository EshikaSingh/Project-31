var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions =[];

var divisionHeight=300;

function preload(){

  backgroundImg = loadImage("Images/Background.jpg");

  getTime();
}

function setup() {
  createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  //create division objects
  for (var k = 0; k <=800; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  //create 1st row of plinko objects
  for (var j = 25; j <=width; j=j+50) { 
    plinkos.push(new Plinko(j,75));
  }

  //create 2nd row of plinko objects
  for (var j = 25; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,175));
  }

  //create 3rd row of plinko objects
  for (var j = 25; j <=width; j=j+50) 
  {
    plinkos.push(new Plinko(j,275));
  }
  
  //create 4th row of plinko objects
  for (var j = 25; j <=width; j=j+50) 
  {
    plinkos.push(new Plinko(j,375));
  }

  wall1 = new Ground(797,400,10,1000);
  wall2 = new Ground(1,400,10,1000);
  
}

 function draw() {
  background(backgroundImg);

 
  Engine.update(engine);
  ground.display();
  
  //display the plinkos 
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();   
  }
   
  //display the divisions
  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  //create the particles using frameCount
  if(frameCount % 60 === 0){
    particles.push(new Particles(random(width/2-20, width/2+20), 10,10));
  }


  //display the particles 
  for (var j = 0; j < particles.length; j++){
    particles[j].display();
  }

  wall1.display();
  wall2.display();

}

async function getTime (){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  console.log(responseJSON);

  var datetime = responseJSON.datetime;
  console.log(datetime);

  var hour = datetime.slice(11,13);
  console.log(hour);

  if(hour >= 06 && hour <= 19){
      bg = "Images/Background.jpg";
  }
  else {
      bg = "Images/background2.jpg";
  }
  backgroundImg = loadImage(bg);
}