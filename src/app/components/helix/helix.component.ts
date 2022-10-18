import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Helix } from '../../model/helix';
import * as THREE from 'Three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { Lorenz } from '../../model/lorenz';
import { RendererComponent } from '../renderer/renderer.component';

@Component({
  selector: 'app-helix',
  templateUrl: './helix.component.html',
  styleUrls: ['./helix.component.css']
})
export class HelixComponent extends RendererComponent implements OnInit, OnDestroy {

  @ViewChild('canvas', { static: true }) canvasRef: ElementRef;

  private readonly helixGenerator: Generator<{ x: number, Re: number, Im: number }, void, unknown>

  public MAX_POINTS = 50000;
  public scene: THREE.Scene;
  public camera: THREE.Camera;
  public renderer: THREE.WebGLRenderer;
  public geometry: THREE.BufferGeometry;
  public material: THREE.LineBasicMaterial;
  public line: THREE.Line;
  public index = 0;
  public controls: OrbitControls;

  constructor() {
    super();
    let helix = new Helix();
    this.helixGenerator = helix.helixIterator();
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
    let result = this.helixGenerator.next();
    if (result.done === true) {
      this.renderer.render(this.scene, this.camera);
      return
    }
    
    this.draw(result.value.x, result.value.Re, result.value.Im);
  }
}