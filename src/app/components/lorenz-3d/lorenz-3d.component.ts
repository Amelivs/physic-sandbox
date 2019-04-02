import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'Three';

import { Lorenz } from '../../model/lorenz';
import { RendererComponent } from '../renderer/renderer.component';

@Component({
  selector: 'app-lorenz-3d',
  templateUrl: './lorenz-3d.component.html',
  styleUrls: ['./lorenz-3d.component.css']
})
export class Lorenz3dComponent extends RendererComponent implements OnInit, OnDestroy {

  @ViewChild('canvas') canvasRef: ElementRef;

  public lorenz = new Lorenz({ x: 0, y: 0.1, z: 0 }, { b: 8 / 3, r: 28, w: 10 });

  public MAX_POINTS = 50000;
  public scene: THREE.Scene;
  public camera: THREE.Camera;
  public renderer: THREE.WebGLRenderer;
  public geometry: THREE.BufferGeometry;
  public material: THREE.LineBasicMaterial;
  public rotSpeed: number;
  public line: any;
  public index: number;

  constructor() {
    super();
  }

  public get canvas() {
    return this.canvasRef.nativeElement as HTMLDivElement;
  }

  public ngOnInit() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(600, 600);
    this.canvas.appendChild(this.renderer.domElement);

    this.camera.position.z = 70;

    this.rotSpeed = .001;

    // geometry
    this.geometry = new THREE.BufferGeometry();

    // attributes
    var positions = new Float32Array(this.MAX_POINTS * 3); // 3 vertices per point
    this.geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));

    // draw range
    //var drawCount = 2; // draw the first 2 points, only
    //geometry.setDrawRange(0, drawCount);

    // material
    this.material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });

    // line
    this.line = new THREE.Line(this.geometry, this.material) as any;
    this.scene.add(this.line);

    this.index = 0;
  }

  public ngOnDestroy() {
    this.cancelAnimation();
  }

  public checkRotation() {
    var x = this.camera.position.x,
      y = this.camera.position.y,
      z = this.camera.position.z;

    this.camera.position.x = x * Math.cos(this.rotSpeed) + z * Math.sin(this.rotSpeed);
    this.camera.position.z = z * Math.cos(this.rotSpeed) - x * Math.sin(this.rotSpeed);
    this.camera.lookAt(this.scene.position);
  }

  public start() {
    this.startAnimation();
  }

  public draw(x: number, y: number, z: number) {
    var positions = this.line.geometry.attributes.position.array;
    this.line.geometry.attributes.position.needsUpdate = true;

    positions[this.index++] = x;
    positions[this.index++] = y;
    positions[this.index++] = z;

    this.line.geometry.setDrawRange(0, this.index);
    this.checkRotation();
    this.renderer.render(this.scene, this.camera);
  }

  public repaint() {
    let { x, y, z } = this.lorenz.next();
    this.draw(x, y, z);
  }
}
