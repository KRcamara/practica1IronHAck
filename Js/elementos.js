class Element{
  constructor(x,y,width,height,ctx, src){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.image = new Image();
    this.image.src = src;
  }
  draw(){        
    this.ctx.drawImage(this.image,this.x,this.y,this.width,this.height);    
  }    
  
}