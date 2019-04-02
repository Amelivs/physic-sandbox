import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { Lorenz } from '../../model/lorenz';
import { RendererComponent } from '../renderer/renderer.component';

@Component({
  selector: 'app-lorenz-2d',
  templateUrl: './lorenz-2d.component.html',
  styleUrls: ['./lorenz-2d.component.css']
})
export class Lorenz2dComponent extends RendererComponent implements OnInit, OnDestroy {

  @ViewChild('canvas') canvasRef: ElementRef;
  public context: CanvasRenderingContext2D;
  public animationId: number;
  public colorTheta = 0;
  public eye = { x: 0, y: 100, z: 1000 };

  public lorenz = new Lorenz({ x: 0, y: 0.1, z: 0 }, { b: 8 / 3, r: 28, w: 10 });

  public nextColor() {
    let color = Math.abs(70 * Math.sin(this.colorTheta));
    this.colorTheta += 0.01;
    this.colorTheta = this.colorTheta % Math.PI;
    return color;
  }

  constructor() {
    super();
  }

  public get canvas() {
    return this.canvasRef.nativeElement as HTMLCanvasElement;
  }

  public ngOnInit() {
    this.context = this.canvas.getContext('2d');
    this.context.translate(this.canvas.width / 2, 300);
    this.context.lineWidth = 1.0;
    this.context.beginPath();
    this.context.moveTo(0, 0);
  }

  public ngOnDestroy() {
    this.cancelAnimation();
  }

  public draw(x: number, y: number, z: number) {
    let point = this.project(x, y, z);
    point.x *= 10;
    point.y *= 10;

    this.context.strokeStyle = `hsl(36, 100%, ${this.nextColor()}%)`;
    this.context.lineTo(point.x, point.y);
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(point.x, point.y);
  }

  public change(value: string) {
    this.eye.x = parseInt(value);
    this.context.translate(-this.canvas.width / 2, -300);
    this.context.clearRect(0, 0, 600, 600);
    this.context.translate(this.canvas.width / 2, 300);
  }

  public project(x: number, y: number, z: number) {
    let eye = this.eye;
    let xp = (eye.z * (x - eye.x)) / (eye.z + z) + eye.x;
    let yp = (eye.z * (y - eye.y)) / (eye.z + z) + eye.y;
    return {
      x: xp,
      y: yp
    }
  }

  public repaint() {
    for (let i = 0; i < 100; i++) {
      let { x, y, z } = this.lorenz.next();
      this.draw(x, y, z);
    }
  }
}
