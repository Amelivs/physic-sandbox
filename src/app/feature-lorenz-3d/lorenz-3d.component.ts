import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'Three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Lorenz } from '../shared/utils/lorenz';
import { RendererComponent } from '../shared/ui/renderer.component';


@Component({
  selector: 'app-lorenz-3d',
  templateUrl: './lorenz-3d.component.html',
  styleUrls: ['./lorenz-3d.component.css']
})
export class Lorenz3dComponent extends RendererComponent implements OnInit, OnDestroy {

  @ViewChild('canvas', { static: true }) canvasRef: ElementRef;

  public lorenz = new Lorenz({ x: 0, y: 0.1, z: 0 }, { b: 8 / 3, r: 28, w: 10 });

  public MAX_POINTS = 50000;
  public scene: THREE.Scene;
  public camera: THREE.Camera;
  public renderer: THREE.WebGLRenderer;
  public geometry: THREE.BufferGeometry;
  public material: THREE.LineBasicMaterial;
  public line: THREE.Line;
  public index = 0;
  public controls: OrbitControls;
  public pointsPerFrame = 2000;

  constructor() {
    super();
  }

  public get canvas() {
    return this.canvasRef.nativeElement as HTMLDivElement;
  }

  public ngOnInit() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(600, 600);
    this.canvas.appendChild(this.renderer.domElement);

    this.camera.position.z = 70;

    // geometry
    this.geometry = new THREE.BufferGeometry();

    // attributes
    var positions = new Float32Array(this.MAX_POINTS * 3); // 3 vertices per point
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // An axis object to visualize the 3 axes in a simple way.
    // The X axis is red. The Y axis is green. The Z axis is blue.
    const axesHelper = new THREE.AxesHelper(20);
    this.scene.add(axesHelper);

    // material
    this.material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });

    // line
    this.line = new THREE.Line(this.geometry, this.material);
    this.scene.add(this.line);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  }

  public ngOnDestroy() {
    this.cancelAnimation();
  }

  public start() {
    this.startAnimation();
  }

  public draw(x: number, y: number, z: number) {
    var positions = this.line.geometry.attributes.position.array as Float32Array;
    this.line.geometry.attributes.position.needsUpdate = true;

    positions[this.index++] = x;
    positions[this.index++] = y;
    positions[this.index++] = z;

    this.line.geometry.setDrawRange(0, this.index);
    this.renderer.render(this.scene, this.camera);
  }

  public repaint() {
    if (this.index >= this.MAX_POINTS) {
      this.renderer.render(this.scene, this.camera);
      return
    }

    for (let i = 0; i < this.pointsPerFrame; i++) {
      let { x, y, z } = this.lorenz.next();
      this.draw(x, y, z);
    }
  }
}
