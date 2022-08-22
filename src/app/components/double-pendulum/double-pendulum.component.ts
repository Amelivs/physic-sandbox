import { Component, OnInit, OnDestroy,ViewChild, ElementRef } from '@angular/core';

import { RendererComponent } from '../renderer/renderer.component';
import { DoublePendulum } from '../../model/double-pendulum';

@Component({
  selector: 'app-double-pendulum',
  templateUrl: './double-pendulum.component.html',
  styleUrls: ['./double-pendulum.component.scss']
})
export class DoublePendulumComponent extends RendererComponent implements OnInit, OnDestroy {

  @ViewChild('canvas', { static: true }) canvasRef: ElementRef;
  public context: CanvasRenderingContext2D;

  public conditions = {
    θ1: -Math.PI * 180 / 180,
    v1: 0,
    θ2: Math.PI * 90 / 180,
    v2: 0
  };

  public parameters = {
    l1: 0.5,
    m1: 4,
    β1: 0.3,
    l2: 0.5,
    m2: 1,
    β2: 0.3
  };

  public pendulum = new DoublePendulum(this.conditions, this.parameters, 1e-2);

  constructor() {
    super();
  }

  public get canvas() {
    return this.canvasRef.nativeElement as HTMLCanvasElement;
  }

  public ngOnInit() {
    this.context = this.canvas.getContext('2d');
    this.repaint();
  }

  public ngOnDestroy() {
    this.cancelAnimation();
  }

  public draw(angles: { θ1: number, θ2: number }) {
    var rPend = Math.min(this.canvas.width, this.canvas.height) * 0.20;
    var rBall = Math.min(this.canvas.width, this.canvas.height) * 0.02;
    var rBar = Math.min(this.canvas.width, this.canvas.height) * 0.005;
    var ballX = Math.sin(angles.θ1) * rPend;
    var ballY = Math.cos(angles.θ1) * rPend;

    this.context.globalCompositeOperation = "destination-out";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.fillStyle = "yellow";
    this.context.strokeStyle = "black"
    this.context.globalCompositeOperation = "source-over";

    this.context.save();
    this.context.translate(this.canvas.width / 2, this.canvas.height / 3);
    this.context.rotate(angles.θ1);

    this.context.beginPath();
    this.context.rect(-rBar, -rBar, rBar * 2, rPend + rBar * 2);
    this.context.fill();
    this.context.stroke();

    this.context.beginPath();
    this.context.arc(0, rPend, rBall, 0, Math.PI * 2, false);
    this.context.fill();
    this.context.stroke();
    this.context.restore();

    this.context.save();
    this.context.fillStyle = "green";
    this.context.strokeStyle = "black"
    this.context.translate(this.canvas.width / 2 - ballX, this.canvas.height / 3 + ballY);
    this.context.rotate(angles.θ2);

    this.context.beginPath();
    this.context.rect(-rBar, -rBar, rBar * 2, rPend + rBar * 2);
    this.context.fill();
    this.context.stroke();

    this.context.beginPath();
    this.context.arc(0, rPend, rBall, 0, Math.PI * 2, false);
    this.context.fill();
    this.context.stroke();
    this.context.restore();
  }

  public repaint() {
    this.draw(this.pendulum.next());
    if (this.pendulum.isStabilized()) {
      this.cancelAnimation();
    }
  }
}
