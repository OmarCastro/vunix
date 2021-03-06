import { Component } from "../graph/component" 

/**
 * this class is responsible to show the boundary of the selected components 
 */
export class Boundary{
  public constructor(
    public left:number,
    public rigth:number,
    public top:number,
    public bottom:number,
    public components:Component[]
  ){}

  public static createFromXY(x:number, y:number, component:Component): Boundary{
    const bottom = y + component.type === "file" ? 100: 350;
    return new this(x,x,y,bottom,[component]);
  }

  public static createFromPoint(point:{x:number; y:number}, component:Component): Boundary{
    return this.createFromXY(point.x,point.y,component);
  }

  public static createFromComponent(component:Component): Boundary{
    return this.createFromPoint(component.position,component);
  }

  public static createFromComponents(components:Component[]): Boundary{
    if(components == null || components.length === 0){ return null; }
    const boundary = this.createFromComponent(components[0])
    components.slice(1).forEach(component => {
      boundary.extend(this.createFromComponent(component))
    });
    return boundary;

  }

  public extend(boundary2: Boundary){
      this.left   = Math.min(boundary2.left   ,this.left)
      this.rigth  = Math.max(boundary2.rigth  ,this.rigth)
      this.top    = Math.min(boundary2.top    ,this.top)
      this.bottom = Math.max(boundary2.bottom ,this.bottom)
      this.components = this.components.concat(boundary2.components);
  } 


  public static translate(boundary:Boundary,x:number,y:number){
    boundary.left   += x
    boundary.rigth  += x
    boundary.top    += y
    boundary.bottom += y
    boundary.components.forEach(component => {
      const position = component.position;
      position.x += x
      position.y += y
    });
  }

  public translateXY(x, y = 0){ Boundary.translate(this,x,y) }
  /**
  arranges the layout
  */
  public static arrangeLayout(boundaries:Boundary[]):[Boundary, {x:number,y:number}]{
    let maxX:number = 0
    let components:any[] = []
    boundaries.forEach(boundary => {
      maxX = Math.max(boundary.rigth, maxX)
      components = components.concat(boundary.components)
    });

    let prevBound: Boundary = null

    boundaries.forEach(boundary => {
      const translateX = maxX - boundary.rigth
      const translateY = prevBound ? prevBound.bottom - boundary.top : 0
      boundary.translateXY(translateX,translateY)
      prevBound = boundary
    });

    let x = 0, y = 0, bottom = 350;
    
    if(boundaries.length){
      x = maxX + 350
      y = Math.max((prevBound.bottom - 350) / 2, 0)
      bottom = Math.max(prevBound.bottom,350)
    }
    return [new Boundary(0,x,0,bottom,components),{x:x,y:y}]
  }
}