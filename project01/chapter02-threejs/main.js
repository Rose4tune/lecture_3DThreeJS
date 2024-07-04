import "./style.css";
import * as THREE from "three";

const renderer = new THREE.WebGLRenderer({antialias: true});
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

const geometry = new THREE.BoxGeometry(1,1,1); //가로, 세로, 높이
const material = new THREE.MeshBasicMaterial({color:0xff0000});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

window.addEventListener('resize', () => {
  // 리사이즈 시 화면과 물체의 크기가 이상해 지지 않도록 하는 기본 셋팅
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
})

renderer.render(scene, camera);