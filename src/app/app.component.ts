import {Component, OnInit} from '@angular/core';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import GLTFLoader from 'three-gltf-loader';
import * as dat from 'dat.gui';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  camera;
  scene;
  renderer;
  controls;

  constructor() { }

  ngOnInit() {
    this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth/ window.innerHeight, 1, 5000);
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#ffffff');
    this.renderer = new THREE.WebGLRenderer( { antialias: true} );
    this.camera.position.set(900,1200,800);
    this.camera.lookAt(new THREE.Vector3(0,0,0));
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);


    let createLights=()=> {
      const ambientLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.4 );
      const  light = new THREE.SpotLight( '#fff7df',3.5);
      light.position.set( 960, 1740, 1250 );
      light.castShadow = true;
      light.target.position.set(0,0,0);
      light.distance=3000;
      light.shadow.mapSize.width = 2024;
      light.shadow.mapSize.height =2024;
      light.shadow.camera.near = 2000;
      light.shadow.camera.far = 2000  ;
      this.scene.add( light,ambientLight);
    };

    createLights();
    let animate = ()=> {
      requestAnimationFrame( animate );
      this.renderer.render( this.scene, this.camera );
    };


    let loader = new GLTFLoader();
    let object;
    let gui= new dat.GUI();
    let options={morph:0};

    loader.load('assets/3.gltf',(gltf)=>{
      object=gltf.scenes[0].children[0];
      this.scene.add(object);
      console.log(object);
      let morphChange=()=>{
        object.morphTargetInfluences[0]=options.morph;
      };
      gui.add(options,'morph',0,1).onChange(morphChange);
    });

    animate();
  }

}
