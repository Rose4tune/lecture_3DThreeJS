import "./style.css";
import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
camera.position.y = 5;
camera.position.y = 5;
camera.position.z = 5;

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
// scene.add(directionalLightHelper)

//** GLTFLoader */
const glrfLoader = new GLTFLoader();
// 동기
// glrfLoader.load("/dancer.glb", (data) => {
//   const chracter = data.scene;
//   chracter.position.y = 0.8
//   chracter.scale.set(0.01, 0.01, 0.01)
//   scene.add(chracter)
// })

// 비동기
const gltf = await glrfLoader.loadAsync("/dancer.glb");
const chracter = gltf.scene;
chracter.position.y = 0.8;
chracter.scale.set(0.01, 0.01, 0.01);
chracter.castShadow = true;
chracter.receiveShadow = true;
chracter.traverse(obj => {
  // children을 타고 내려가서 모든 요소에 그림자 설정 할 수 있게 함
  if(obj.isMesh) {
    obj.castShadow = true;
    obj.receiveShadow = true;
  }
})
console.log(gltf)
scene.add(chracter)

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
// scene.add(boxMesh);

//** Orbit Controls : 마우스에 따른 카메라 시점 변경 */
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.03;

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
  orbitControls.update();
}

render();