import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Mandelbrot } from '../../model/mandelbrot';

@Component({
  selector: 'app-mandelbrot',
  templateUrl: './mandelbrot.component.html',
  styleUrls: ['./mandelbrot.component.scss']
})
export class MandelbrotComponent implements OnInit {

  @ViewChild('canvas') canvasRef: ElementRef;
  public context: CanvasRenderingContext2D;
  //public mandelbrot = new Mandelbrot();
  public magnificationFactor = 200;
  public panX = 2;
  public panY = 1.5;

  constructor() { }

  public get canvas() {
    return this.canvasRef.nativeElement as HTMLCanvasElement;
  }

  ngOnInit() {
    this.context = this.canvas.getContext("2d");
    this.repaint();
  }

  public repaint() {
    for (var x = 0; x < this.canvas.width; x++) {
      for (var y = 0; y < this.canvas.height; y++) {
        var belongsToSet = this.checkIfBelongsToMandelbrotSet(x / this.magnificationFactor - this.panX, y / this.magnificationFactor - this.panY);
        if (belongsToSet == 0) {
          this.context.fillStyle = '#000';
          this.context.fillRect(x, y, 1, 1); // Draw a black pixel
        } else {
          this.context.fillStyle = 'hsl(0, 100%, ' + belongsToSet + '%)';
          this.context.fillRect(x, y, 1, 1); // Draw a colorful pixel
        }
      }
    }
  }

  public zoomChanged(value: number) {
    this.magnificationFactor = value;
    this.repaint();
  }

  public checkIfBelongsToMandelbrotSet(x: number, y: number) {
    var realComponentOfResult = x;
    var imaginaryComponentOfResult = y;
    var maxIterations = 100;
    for (var i = 0; i < maxIterations; i++) {
      var tempRealComponent = realComponentOfResult * realComponentOfResult - imaginaryComponentOfResult * imaginaryComponentOfResult + x;
      var tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult + y;
      realComponentOfResult = tempRealComponent;
      imaginaryComponentOfResult = tempImaginaryComponent;

      // Return a number as a percentage
      if (realComponentOfResult * imaginaryComponentOfResult > 5)
        return (i / maxIterations * 100);
    }
    return 0;   // Return zero if in set        
  }

}
