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
camera.position.y = 5;
camera.position.y = 5;
camera.position.z = 5;

// 직사광선
const directionalLight = new THREE.DirectionalLight(0xffffff, 5); //빛의 색, 세기
directionalLight.castShadow = true; // 빛의 그림자 설정
directionalLight.position.set(3, 4, 5);
directionalLight.lookAt(0, 0, 0);
scene.add(directionalLight);

// 평면 Geometry (바닥)
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({color: 0xbbbbbb});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor)

// Mesh FrontSide
const frontSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const frontSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  side: THREE.FrontSide,
});
const frontSideMesh = new THREE.Mesh(frontSideGeometry, frontSideMaterial);
frontSideMesh.position.z = 4;
frontSideMesh.position.y = 0.5;
frontSideMesh.castShadow = true;
frontSideMesh.receiveShadow = true;
scene.add(frontSideMesh);

// Mesh BackSide
const backSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const backSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  side: THREE.BackSide,
});
const backSideMesh = new THREE.Mesh(backSideGeometry, backSideMaterial);
backSideMesh.position.set(2, 0.5, 4);
backSideMesh.position.y = 0.51;
backSideMesh.receiveShadow = true;
scene.add(backSideMesh);

// Mesh DoubleSide
const doubleSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const doubleSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  side: THREE.DoubleSide,
});
const doubleSideMesh = new THREE.Mesh(doubleSideGeometry, doubleSideMaterial);
doubleSideMesh.position.set(4, 0.5, 4);
doubleSideMesh.position.y = 0.51;
doubleSideMesh.receiveShadow = true;
scene.add(doubleSideMesh);

// TorusKnot
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 20);
//** Mesh Standard Material */
const torusKnotStandMaterial = new THREE.MeshStandardMaterial({color: 0xff0000});
torusKnotStandMaterial.roughness = 0.5;
torusKnotStandMaterial.metalness = 1;

const torusKnotStandardMesh = new THREE.Mesh(torusKnotGeometry, torusKnotStandMaterial);
torusKnotStandardMesh.position.set(-4, 1, 0);
torusKnotStandardMesh.castShadow = true;
torusKnotStandardMesh.receiveShadow = true;
scene.add(torusKnotStandardMesh)

//** Mesh Lambert Material */ 
const torusKnotLambertMaterial = new THREE.MeshLambertMaterial({color:0xff0000});
torusKnotLambertMaterial.emissive = new THREE.Color(0x00ff00);
torusKnotLambertMaterial.emissiveIntensity = 0.2;

const torusKnotLambertMesh = new THREE.Mesh(torusKnotGeometry, torusKnotLambertMaterial);
torusKnotLambertMesh.position.set(-2, 1, 0);
torusKnotLambertMesh.castShadow = true;
torusKnotLambertMesh.receiveShadow = true;
scene.add(torusKnotLambertMesh)

//** Mesh Phong Material */ 
const torusKnotPhongMaterial = new THREE.MeshPhongMaterial({color:0xff0000});
torusKnotPhongMaterial.emissive = new THREE.Color(0x00ff00);
torusKnotPhongMaterial.emissiveIntensity = 0.2;
torusKnotPhongMaterial.specular = new THREE.Color(0x0000ff);
torusKnotPhongMaterial.shininess = 100;

const torusKnotPhongMesh = new THREE.Mesh(torusKnotGeometry, torusKnotPhongMaterial);
torusKnotPhongMesh.position.set(0, 1, 0);
torusKnotPhongMesh.castShadow = true;
torusKnotPhongMesh.receiveShadow = true;
scene.add(torusKnotPhongMesh)

//** Mesh Basic Material */ 
const torusKnotBasicMaterial = new THREE.MeshBasicMaterial({color:0xff0000});
const torusKnotBasicMesh = new THREE.Mesh(torusKnotGeometry, torusKnotBasicMaterial);
torusKnotBasicMesh.position.set(2, 1, 0);
torusKnotBasicMesh.castShadow = true;
torusKnotBasicMesh.receiveShadow = true;
scene.add(torusKnotBasicMesh)

//** Mesh Depth Material */ 
const torusKnotDepthMaterial = new THREE.MeshDepthMaterial({color:0xffffff});
torusKnotDepthMaterial.opacity = 0.5;
const torusKnotDepthMesh = new THREE.Mesh(torusKnotGeometry, torusKnotDepthMaterial);
torusKnotDepthMesh.position.set(4, 1, 0);
torusKnotDepthMesh.castShadow = true;
torusKnotDepthMesh.receiveShadow = true;
scene.add(torusKnotDepthMesh)

// Texture Loader
const textureLoader = new THREE.TextureLoader();
//** 동기 방식 */
textureLoader.load("/threejs.webp", (texture) => {
  const textureBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const textureMaterial = new THREE.MeshStandardMaterial({map: texture});
  const textureMesh = new THREE.Mesh(textureBoxGeometry, textureMaterial);
  textureMesh.position.set(0, 0.5, 2);
  textureMesh.castShadow = true;
  textureMesh.receiveShadow = true;
  scene.add(textureMesh)
})
//** 비동기 방식 */
const texture = await textureLoader.loadAsync('/threejs.webp');
const textureBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const textureMaterial = new THREE.MeshStandardMaterial({map: texture});
const textureMesh = new THREE.Mesh(textureBoxGeometry, textureMaterial);
textureMesh.position.set(2, 0.5, 2);
textureMesh.castShadow = true;
textureMesh.receiveShadow = true;
scene.add(textureMesh)


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
  textureMesh.rotation.y += 0.01;
}

render();