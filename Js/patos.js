class Ducks extends Element {
    constructor(x,y,width,height,ctx, src,team){  
      super(x,y,width,height,ctx,src);
      this.team = team;
      this.vx = 4;
      this.vy = 2;
      this.live = 1;
    }
  
  }