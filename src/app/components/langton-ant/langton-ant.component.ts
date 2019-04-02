import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { RendererComponent } from '../renderer/renderer.component';
import { Langton } from '../../model/langton-ant';

@Component({
  selector: 'app-langton-ant',
  templateUrl: './langton-ant.component.html',
  styleUrls: ['./langton-ant.component.scss']
})
export class LangtonAntComponent extends RendererComponent implements OnInit, OnDestroy {

  @ViewChild('canvas') canvasRef: ElementRef;
  public context: CanvasRenderingContext2D;
  public langton = new Langton();
  public pixelSize: number;

  constructor() {
    super();
  }

  public get canvas() {
    return this.canvasRef.nativeElement as HTMLCanvasElement;
  }

  public ngOnInit() {
    this.context = this.canvas.getContext("2d");
    this.pixelSize = this.canvas.height / this.langton.gridSize;
    this.drawAnts();
  }

  public ngOnDestroy() {
    this.cancelAnimation();
  }

  public drawMap() {
    this.langton.ants.forEach(ant => {
      this.context.fillStyle = this.langton.getCell(ant) === 1 ? "white" : ant.color;
      this.context.fillRect(ant.x * this.pixelSize, ant.y * this.pixelSize, this.pixelSize, this.pixelSize);
    });
  }

  public drawAnts() {
    this.langton.ants.forEach(ant => {
      this.context.fillStyle = "red";
      this.context.fillRect(ant.x * this.pixelSize, ant.y * this.pixelSize, this.pixelSize, this.pixelSize);
    });
  }

  public canvasClick(e: MouseEvent) {
    var rect = this.canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    var cx = Math.floor(this.langton.gridSize * x / this.canvas.height);
    var cy = Math.floor(this.langton.gridSize * y / this.canvas.height);

    this.langton.ants.push({ x: cx, y: cy, dir: 'n', color: '#' + Math.floor(Math.random() * 16777215).toString(16) });
    this.drawAnts();
  }

  public repaint() {
    if (this.langton.ants.length > 0) {
      for (let i = 0; i < 20; i++) {
        this.drawMap();
        this.langton.evolve();
        this.drawAnts();
      }
    }
    else {
      this.cancelAnimation();
    }
  }
}
