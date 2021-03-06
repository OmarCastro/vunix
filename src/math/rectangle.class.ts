/**
  A rectanglular area
*/
export class Rectangle{
  public x:number = 0
  public y:number = 0
  public width:number = 0
  public height:number = 0

  get left() { return this.x; }
  set left(x:number) { this.x = x; }
  get right() { return this.x + this.width; }
  set right(x:number) {  this.width = x - this.x; }
  get top() { return this.y }
  set top(y:number){ this.y = y; }
  get bottom() { return this.y + this.height }
  set bottom(y:number){ this.height = y - this.y; }

  /**
    expands the rectangle by doing the union beteen this
    and the other rectangle
  */
  public expand(other:Rectangle):void {
    const x:number = Math.min(this.x, other.x);
    const y:number = Math.min(this.y, other.y);
    const w:number = Math.max(this.right, other.right); - x;
    const h:number = Math.max(this.bottom, other.bottom) - y;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }

  /** translates the rectangle by X and Y */
  public translateXY(x:number, y:number):void{
    this.x += x
    this.y += y
  }

  /** translates the rectangle by a point object, it should include x and y */
  public translatePoint(point:any):void{
    this.x += point.x
    this.y += point.y
  }
}