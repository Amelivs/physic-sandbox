import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Kepler } from './kepler';
import { RendererComponent } from '../shared/ui/renderer.component';


@Component({
  selector: 'app-kepler',
  templateUrl: './kepler.component.html',
  styleUrls: ['./kepler.component.scss']
})
export class KeplerComponent extends RendererComponent implements OnInit {

  @ViewChild('canvas', { static: true }) canvasRef: ElementRef;
  public context: CanvasRenderingContext2D;
  public earth = new Kepler(149598094, 0.017);
  public mars = new Kepler(227939184, 0.093);

  constructor() {
    super();
  }

  public get canvas() {
    return this.canvasRef.nativeElement as HTMLCanvasElement;
  }

  ngOnInit() {
    this.context = this.canvas.getContext('2d');
    this.context.lineWidth = 1.0;
  }

  public repaint() {
    let e = this.earth.next();
    let m = this.mars.next();

    //this.context.clearRect(0, 0, 900, 600);

    let ex = 600 + (e.r * Math.cos(e.v) / 1000000);
    let ey = 300 + (e.r * Math.sin(e.v) / 1000000);

    let mx = 600 + (m.r * Math.cos(m.v) / 1000000);
    let my = 300 + (m.r * Math.sin(m.v) / 1000000);

    this.context.beginPath();
    this.context.arc(ex, ey, 5, 0, 2 * Math.PI);
    this.context.arc(mx, my, 5, 0, 2 * Math.PI);
    this.context.fill();



  }

}
