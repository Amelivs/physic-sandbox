import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { GameOfLife } from './game-of-life';
import { RendererComponent } from '../shared/ui/renderer.component';


@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrls: ['./game-of-life.component.scss']
})
export class GameOfLifeComponent extends RendererComponent implements AfterViewInit, OnDestroy {

  @ViewChild('canvas', { static: true }) canvasRef: ElementRef;
  public context: CanvasRenderingContext2D;
  public gameOfLife = new GameOfLife();
  public dim = 0;

  constructor() {
    super();
  }

  public get canvas() {
    return this.canvasRef.nativeElement as HTMLCanvasElement;
  }

  ngAfterViewInit() {
    this.context = this.canvas.getContext("2d");
    this.dim = this.canvas.height;
    this.draw();
  }

  public ngOnDestroy() {
    this.cancelAnimation();
  }

  public draw() {
    this.context.clearRect(0, 0, this.dim, this.dim);
    for (var x = 0; x < this.gameOfLife.grid.length; x++) {
      for (var y = 0; y < this.gameOfLife.grid.length; y++) {
        this.context.fillStyle = this.gameOfLife.grid[x][y] === true ? "black" : "white";
        this.context.fillRect(x * this.dim / this.gameOfLife.grid.length, y * this.dim / this.gameOfLife.grid.length, this.dim / this.gameOfLife.grid.length, this.dim / this.gameOfLife.grid.length)
      }
    }
  }

  public evolve() {
    //for (let i = 0; i < 3; i++) {
      this.gameOfLife.next();
    //}
    this.draw();
  }

  public repaint() {
    this.evolve();
  }

  public click(event: MouseEvent) {
    let rect = this.canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    var cx = Math.floor(this.gameOfLife.grid.length * x / this.canvas.height);
    var cy = Math.floor(this.gameOfLife.grid.length * y / this.canvas.height);

    let state = this.gameOfLife.getCell(cx, cy);
    this.gameOfLife.setCell(cx, cy, !state);
    this.draw();
  }
}
