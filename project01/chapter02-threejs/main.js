import "./style.css";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60, //fov
  window.innerWidth / window.innerHeight,
  0.1, //near
  100 //far
);
camera.position.y = 1;
camera.position.z = 5;

// 직사광선
const directionalLight = new THREE.DirectionalLight(0xffffff, 5); //빛의 색, 세기
directionalLight.castShadow = true; // 빛의 그림자 설정
directionalLight.position.set(3, 4, 5);
directionalLight.lookAt(0, 0, 0);
scene.add(directionalLight);

// 평면 Geometry (바닥) 만들기
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({color: 0xbbbbbb});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor)

const geometry = new THREE.BoxGeometry(1,1,1); //가로, 세로, 높이
const material = new THREE.MeshStandardMaterial({color:0xff0000});
const mesh = new THREE.Mesh(geometry, material);
mesh.castShadow = true;
mesh.receiveShadow = true;
mesh.position.y = 0.5;
scene.add(mesh);

// 캡슐 만들기
const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 20);
const capsuleMaterial = new THREE.MeshStandardMaterial({color: 0xffff00});
const capsuleMesh = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
capsuleMesh.position.set(3, 1.75, 0);
capsuleMesh.castShadow = true;
capsuleMesh.receiveShadow = true;
scene.add(capsuleMesh)

// 원기둥 만들기
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2);
const cylinderMaterial = new THREE.MeshStandardMaterial({color:0x00ff00});
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinderMesh.position.set(-3, 1, 0);
cylinderMesh.castShadow = true;
cylinderMesh.receiveShadow = true;
scene.add(cylinderMesh)

// 도넛 만들기
const torusGeomety = new THREE.TorusGeometry(0.5, 0.1, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({color: 0x0000ff});
const torusMesh = new THREE.Mesh(torusGeomety, torusMaterial)
torusMesh.position.set(0, 0.5, 1);
torusMesh.castShadow = true;
torusMesh.receiveShadow = true;
scene.add(torusMesh)

// 마우스에 따른 카메라 시점 변경
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();

window.addEventListener('resize', () => {
  // 리사이즈 시 화면과 물체의 크기가 이상해 지지 않도록 하는 기본 셋팅
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
})

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render)
}

render();