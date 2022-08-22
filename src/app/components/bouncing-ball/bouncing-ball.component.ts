import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { RendererComponent } from '../renderer/renderer.component';
import { BouncingBall } from '../../model/boucing-ball';

@Component({
  selector: 'app-bouncing-ball',
  templateUrl: './bouncing-ball.component.html',
  styleUrls: ['./bouncing-ball.component.scss']
})
export class BouncingBallComponent extends RendererComponent implements OnInit, OnDestroy {

  @ViewChild('canvas', { static: true }) canvasRef: ElementRef;
  public context: CanvasRenderingContext2D;
  public balls: BouncingBall[] = [];
  public radius = 30;
  public zoom = 600;

  constructor() {
    super();
  }

  public generateBalls() {
    let balls: BouncingBall[] = [];
    for (let i = 0; i < Math.floor(500 * Math.random()); i++) {
      balls.push(new BouncingBall({ x: 0, vx: Math.random(), y: Math.random(), vy: 0 }, 1e-2, 0.9, 0.1))
    }
    return balls;
  }

  public startAnimation() {
    this.cancelAnimation();
    this.balls = this.generateBalls();
    super.startAnimation();
  }

  public get canvas() {
    return this.canvasRef.nativeElement as HTMLCanvasElement;
  }

  public ngOnInit() {
    this.context = this.canvas.getContext('2d');
    this.context.transform(1, 0, 0, -1, 0, this.canvas.height);
  }

  public ngOnDestroy() {
    this.cancelAnimation();
  }

  public draw(x: number, y: number) {
    this.context.beginPath();
    this.context.arc(this.zoom * x, this.zoom * y + this.radius, this.radius, 0, 2 * Math.PI);
    this.context.stroke();
  }

  public repaint() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.balls.forEach(ball => {
      let { x, y } = ball.next();
      this.draw(x, y);
    });
    if (this.balls.every(ball => ball.isStabilized())) {
      this.cancelAnimation();
    }
  }
}
