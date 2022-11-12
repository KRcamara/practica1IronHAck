let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");
let frames = 0;
let ducks = [];
let interval;
let time = 50,timeRest=0,scoreA=0,scoreB=0;
let fondo = new Element(0,0,canvas.width,canvas.height,ctx,"./images/backGroundC.png");
let playerA = new Element(500,300,50,50,ctx,"./images/armaB.png");
let gunA = new Weapon(playerA.x,playerA.y,50,30,ctx,"./images/duckB_8.png");
let duckScoreA = new Ducks(40,25,50,30,ctx,"./images/duckA_0.png","a");
let duckWinA = new Ducks(600,200,70,100,ctx,"./images/duckA_7.png","a");
let sonido = new Audio();
sonido.src = "./sound/ball.mp3";
let sonidoStart = new Audio();
sonidoStart.src = "./sound/start.mp3";
sonidoStart.volume=0.2;
document.addEventListener('DOMContentLoaded', function() {
	let elems = document.querySelectorAll('.sidenav');
	let instances = M.Sidenav.init(elems);
});

let btnStart = document.getElementById("btnPlay");
btnStart.addEventListener("click",function(){
  document.getElementById("board").style.visibility = "visible"; 
  start();
}); 