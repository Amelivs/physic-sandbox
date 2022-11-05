import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'Three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Helix } from './helix';
import { RendererComponent } from '../shared/ui/renderer.component';


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
  public pointsPerFrame = 20;
  public positions: Float32Array;
  public posAttribute: THREE.BufferAttribute;

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
    this.positions = new Float32Array(this.MAX_POINTS * 3); // 3 vertices per point
    this.posAttribute = new THREE.BufferAttribute(this.positions, 3)
    this.geometry.setAttribute('position', this.posAttribute);

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
    this.posAttribute.needsUpdate = true;

    this.positions[this.index++] = x;
    this.positions[this.index++] = y;
    this.positions[this.index++] = z;

    if (this.index > 6) {
      this.line.geometry.setDrawRange(0, this.index);
    }
    else {
      this.line.geometry.setDrawRange(0, this.index);
    }


    this.renderer.render(this.scene, this.camera);
  }

  public repaint() {
    if (this.index >= this.MAX_POINTS) {
      this.renderer.render(this.scene, this.camera);
      return
    }
    for (let i = 0; i < this.pointsPerFrame; i++) {
      let result = this.helixGenerator.next();
      if (result.done === true) {
        this.renderer.render(this.scene, this.camera);
        return
      }
      this.draw(result.value.x, result.value.Re, result.value.Im);
    }
  }
}
