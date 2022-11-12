class Weapon extends Element {
    constructor(x,y,width,height,ctx, src){  
      super(x,y,width,height,ctx,src);
      this.shoot = 0;
      this.moment = 0;
    }
    collision(item){
      return (this.x < item.x + item.width) &&
      (this.x + this.width > item.x) &&
      (this.y < item.y + item.height) &&
      (this.y + this.height > item.y);
    }
  
  }