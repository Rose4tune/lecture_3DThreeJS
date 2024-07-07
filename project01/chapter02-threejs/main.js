import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FlyControls } from "three/examples/jsm/controls/FlyControls";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true; // 그림자 활성화
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // BasicShadowMap, PCFShadowMap
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60, //fov
  window.innerWidth / window.innerHeight,
  0.1, //near
  100 //far
);
// camera.position.y = 5;
// camera.position.y = 5;
// camera.position.z = 5;
camera.position.set(0, 1, 0);

//** Directional Light */
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true;
directionalLight.position.set(3, 4, 5);
directionalLight.lookAt(0, 0, 0);
scene.add(directionalLight);

// Shadow Size
directionalLight.shadow.mapSize.width = 4096;
directionalLight.shadow.mapSize.height = 4096;

// Shadow Camera
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 100;

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
scene.add(directionalLightHelper)


// 평면 Geometry (바닥)
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({color: 0xbbbbbb});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor)

// 육면체
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({color:0xffff00});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.castShadow = true;
boxMesh.receiveShadow = true;
boxMesh.position.y = 0.51;
scene.add(boxMesh);

//** Orbit Controls : 마우스에 따른 카메라 시점 변경 */
// const orbitControls = new OrbitControls(camera, renderer.domElement);
// orbitControls.enableDamping = true;
// orbitControls.dampingFactor = 0.03;
// orbitControls.enableZoom = true;
// orbitControls.enablePan = true;
// orbitControls.enableRotate = true;
// orbitControls.autoRotate = false;
// orbitControls.autoRotateSpeed = 2;

// orbitControls.maxPolarAngle = Math.PI / 2;
// orbitControls.minPolarAngle = Math.PI / 4;
// orbitControls.maxAzimuthAngle = Math.PI / 2;
// orbitControls.minAzimuthAngle = -Math.PI / 2;


//** Fly Controls */
// const flyControls = new FlyControls(camera, renderer.domElement);
// flyControls.movementSpeed = 1;
// flyControls.rollSpeed = Math.PI / 10;
// flyControls.autoForward = false;


//** FirstPersonControls */
// const firstPersonControls = new FirstPersonControls(camera, renderer.domElement);
// firstPersonControls.lookSpeed = 0.1; // 카메라 회전 스피드
// firstPersonControls.movementSpeed = 1; // 카메라 이동 스피드
// firstPersonControls.lookVertical = false;


//** Pointer Lock Controls */
// const pointerLockControls = new PointerLockControls(camera, renderer.domElement);
// window.addEventListener('click', () => {
//   pointerLockControls.lock();
// })


//** Trackball Controls */
const trackballControls = new TrackballControls(camera, renderer.domElement);
trackballControls.rotateSpeed = 2;
trackballControls.zoomSpeed = 1.5;
trackballControls.panSpeed = 0.5;
trackballControls.noRotate = false;
trackballControls.noZoom = false;
trackballControls.noPan = false;
trackballControls.staticMoving = false; //deping 활성화
trackballControls.dynamicDampingFactor = 0.05;

const target = new THREE.Mesh(
  new THREE.SphereGeometry(0.5),
  new THREE.MeshStandardMaterial({color:0x0000ff})
);
target.position.set(4, 0.5, 0)
scene.add(target)
trackballControls.target = target.position

window.addEventListener('resize', () => {
  // 리사이즈 시 화면과 물체의 크기가 이상해 지지 않도록 하는 기본 셋팅
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
})

const clock = new THREE.Clock();

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render)
  // orbitControls.update();
  // flyControls.update(clock.getDelta());
  // firstPersonControls.update(clock.getDelta());
  trackballControls.update();
}

render();