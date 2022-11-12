function start(){
    interval = setInterval(update,1000/40);
    
  }
  
  function update(){  
    frames ++;
    ctx.clearRect(0,0,canvas.width,canvas.height);  
    fondo.draw();
    playerA.draw();
    generateDucks();
    drawDucks();  
    drawTimer();
    drawScore();
    sonidoStart.play();
  }
  
  function generateDucks(){
    if(!(frames % 150 === 0 || frames === 1)) return;
    
    let y = Math.floor(Math.random() * 400);
    //let duckTeam1 = new Ducks(0,y,70,50,ctx,"./images/duckA_1.png","a");
    //ducks.push(duckTeam1);
  
    let duckTeam2 = new Ducks(canvas.width-70,y,70,50,ctx,"./images/duckB_5.png","b");
    ducks.push(duckTeam2);  
  }
  
  function drawDucks(){
  
    ducks.forEach((duck)=>{   
      if(timeRest >= 20){
        if (duck.vy < 0)  duck.vy = -1;
        else duck.vy = 1;
        if(duck.vx < 0) duck.vx = -3;
        else duck.vx = 3;
      }else if(timeRest >= 10 && timeRest < 40){
        if (duck.vy < 0)  duck.vy = -3;
        else duck.vy = 3;
        if(duck.vx < 0) duck.vx = -5;
        else duck.vx = 5;
      }else if(timeRest > 0 && timeRest < 20){
        if (duck.vy < 0)  duck.vy = -5;
        else duck.vy = 5;
        if(duck.vx < 0) duck.vx = -8;
        else duck.vx = 8;
      }
  
      duck.y += duck.vy;
      if ((duck.y + duck.vy >= canvas.height-300 || duck.y + duck.vy <= 0) && duck.live === 1) {
        duck.vy *= -1;
      }
      
   
       if(duck.team === 'b' && duck.live === 1){
        duck.x -= duck.vx;            
        if (duck.x - duck.vx >= canvas.width - duck.width || duck.x - duck.vx < 0) {
          duck.vx *= -1;
          let srcImgB = duck.image.src.toString().split("/");
          if(srcImgB[srcImgB.length - 1] === "duckB_5.png" || srcImgB[srcImgB.length - 1] === "duckB_4.png"){
            duck.image.src = "./images/duckB_1.png";
          } 
          else if (srcImgB[srcImgB.length - 1] === "duckB_1.png" || srcImgB[srcImgB.length - 1] === "duckB_0.png") {
            duck.image.src = "./images/duckB_5.png";
          }    
        }  
  
        let srcImgB2 = duck.image.src.toString().split("/");
        if(srcImgB2[srcImgB2.length - 1] === "duckB_5.png"){
          duck.image.src = "./images/duckB_4.png";
        } 
        else if (srcImgB2[srcImgB2.length - 1] === "duckB_4.png") {
          duck.image.src = "./images/duckB_5.png";
        }  
        else if (srcImgB2[srcImgB2.length - 1] === "duckB_1.png") {
          duck.image.src = "./images/duckB_0.png";
        }  
        else if (srcImgB2[srcImgB2.length - 1] === "duckB_0.png") {
          duck.image.src = "./images/duckB_1.png";
        }      
  
        if(gunA.shoot === 1 && gunA.moment+1 === frames && gunA.collision(duck)){
          duck.live = 0;
          duck.image.src = "./images/duckB_8.png";
        }   
  
      }else if(duck.team === 'b' && duck.live === 0){ 
        duck.image.src = "./images/duckB_9.png";
        duck.vy = Math.abs(duck.vy);
      }         
    duck.draw();    
  
    });
  }
  
  function drawTimer(){
    ctx.font = "40px Avenir";
    timeRest = Math.floor(time - (frames/40));
    ctx.fillText(timeRest, 500,50);
    if(timeRest === 0) gameOver();
  }
  
  function drawScore(){
    ctx.font = "30px Avenir";
    scoreA =ducks.reduce(function(accumulator, current){
      if(current.team === 'b' && current.live === 0){    
        return accumulator + 1;
      }else{
        return accumulator;
      }
    },0);
  
    ctx.fillText(scoreA, 100,50);
    ctx.fillText("", 15,50);
    duckScoreA.draw();
        
  }
  
  function gameOver(){
    ctx.font = "40px Avenir";  
    clearInterval(interval);
    ctx.clearRect(0,0,canvas.width,canvas.height); 
    fondo.draw();
    let win = "G A M E  O V E R";
    if(scoreA >= 10){
      win = " Y O U  W O N";
      duckWinA.draw();
    }
    ctx.fillText(win, 400,300);
  }
  

  addEventListener("keydown",function(e){
  e.preventDefault()
    let tecla = e.keyCode;
    console.log(tecla);
    switch(tecla){
      case 80:
        clearInterval(interval);
        break;      
      case 37:
        if(playerA.x - playerA.width < 0) playerA.x = playerA.width;
        else playerA.x -= 50;
        break;
      case 39:
        if(playerA.x + playerA.width >= canvas.width) playerA.x = canvas.width - playerA.width;
        else playerA.x += 50;
        break;
      case 38:
        if(playerA.y - playerA.height < 0) playerA.y = playerA.height;
        else playerA.y -= 50;
        break;
      case 40:
        if(playerA.y + playerA.height >= canvas.height) playerA.y = canvas.height - playerA.height;
        else playerA.y += 50;
        break;
      case 32:      
        gunA.shoot = 1;
        gunA.moment = frames;
        gunA.x = playerA.x;
        gunA.y = playerA.y;
        sonido.play();
        console.log("Dispara");
        break;

      default:
        break;
    }
  });