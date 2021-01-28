// import whatever modules you need from three.js

import {
  BoxBufferGeometry,
  Color,
  Mesh,
  MeshStandardMaterial,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  DirectionalLight,
  SphereBufferGeometry,
} from '../lib/three.js-master/build/three.module.js'

import {
  OrbitControls,
} from '../lib/three.js-master/examples/jsm/controls/OrbitControls.js'

// Import the GLTFLoader
import {
  OBJLoader2,
} from '../lib/three.js-master/examples/jsm/loaders/OBJLoader2.js'

import {
  MTLLoader
} from '../lib/three.js-master/examples/jsm/loaders/MTLLoader.js';
import {
  MtlObjBridge
} from '../lib/three.js-master/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js';


// get a reference to the container element that will hold our scene
const container = document.querySelector('#scene-container');

// create a Scene
const scene = new Scene();

// set the background color of the scene (set this to be the same background color of the container)
scene.background = new Color('skyblue')

// create camera
const fov = 35; // field of view
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 100; // the far clipping plane

const camera = new PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 10);

// create lights
const light = new DirectionalLight('white', 6);
light.position.set(10, 10, 10);

// everything needed for the 3D model
// const objLoader = new OBJLoader2();
// objLoader.load("/moon/moon.obj",);
// {

//   console.log(obj.scene);

//   obj.scene.scale.set(.05, .05, .05);

//   scene.add(obj.scene);
// }, undefined, function(error){
//   console.error(error);
// })
const mtlLoader = new MTLLoader();
mtlLoader.load("moon.mtl", mtlParseResult => {
    const materials = MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult);
    const objLoader = new OBJLoader2();
    objLoader.addMaterials(materials);
    objLoader.load("moon.obj", obj => scene.add(obj));
});
scene.add(light);
const renderer = new WebGLRenderer({ antialias: true });
// initialize controls
const controls = new OrbitControls(camera, renderer.domElement);
renderer.physicallyCorrectLights = true;

renderer.setSize(container.clientWidth, container.clientHeight);

renderer.setPixelRatio(window.devicePixelRatio);

container.append(renderer.domElement);
renderer.render(scene, camera);
window.addEventListener("resize", function(){
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.render(scene, camera);
})


// create the animation loop (basically the p5.js draw loop)
renderer.setAnimationLoop(function() {
  controls.update();
  renderer.render(scene, camera);
})



