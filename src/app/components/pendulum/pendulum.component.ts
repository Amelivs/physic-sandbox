import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { RendererComponent } from '../renderer/renderer.component';
import { Pendulum } from '../../model/pendulum';

@Component({
    selector: 'app-pendulum',
    templateUrl: './pendulum.component.html',
    styleUrls: ['./pendulum.component.scss']
})
export class PendulumComponent extends RendererComponent implements OnInit, OnDestroy {

    @ViewChild('canvas', { static: true }) canvasRef: ElementRef;
    public context: CanvasRenderingContext2D;

    public pendulum = new Pendulum(Math.PI * 0.9, 0, .1, 1e-2, 0.4);

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

    public draw(position: number) {
        var rPend = Math.min(this.canvas.width, this.canvas.height) * 0.47;
        var rBall = Math.min(this.canvas.width, this.canvas.height) * 0.02;
        var rBar = Math.min(this.canvas.width, this.canvas.height) * 0.005;
        var ballX = Math.sin(position) * rPend;
        var ballY = Math.cos(position) * rPend;

        this.context.globalCompositeOperation = "destination-out";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.fillStyle = "yellow";
        this.context.strokeStyle = "black"
        this.context.globalCompositeOperation = "source-over";

        this.context.save();
        this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.context.rotate(position);

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
