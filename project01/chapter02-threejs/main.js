import "./style.css";
import * as THREE from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { int } from "three/examples/jsm/nodes/Nodes.js";

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

//** GLTFLoader */
const glrfLoader = new GLTFLoader();
const gltf = await glrfLoader.loadAsync("/dancer.glb");
const chracter = gltf.scene;
const animationClips = gltf.animations;
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

const mixer = new THREE.AnimationMixer(chracter);
const action = mixer.clipAction(animationClips[3]);
action.setLoop(THREE.LoopPingPong);
action.play();

// 평면 Geometry (바닥)
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({color: 0xbbbbbb});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
floor.name = "FLOOR";
scene.add(floor)

//** Orbit Controls : 마우스에 따른 카메라 시점 변경 */
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.03;

const newPosition = new THREE.Vector3(0, 1, 0);
const rayCaster = new THREE.Raycaster();

renderer.domElement.addEventListener('pointerdown', (e) => {
  const x = (e.clientX / window.innerWidth) * 2 - 1;
  const y = -((e.clientY / window.innerHeight) * 2 - 1);

  rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);
  const intersects = rayCaster.intersectObjects(scene.children);
  // console.log(intersects)

  const intersectFloor = intersects.find((i) => i.object.name === 'FLOOR');
  console.log('intersectFloor', intersectFloor);
  newPosition.copy(intersectFloor.point)
  newPosition.y = 1;
})

window.addEventListener('resize', () => {
  // 리사이즈 시 화면과 물체의 크기가 이상해 지지 않도록 하는 기본 셋팅
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
})

const clock = new THREE.Clock();
const targetVector = new THREE.Vector3();

const render = () => {
  chracter.lookAt(newPosition);
  targetVector
    .subVectors(newPosition, chracter.position)
    .normalize() // 정규화 : 벡터의 크기를 1로 만듦
    .multiplyScalar(0.01) // 백터의 크기만 0.01배 함

  if(
    Math.abs(chracter.position.x - newPosition.x) >= 1 ||
    Math.abs(chracter.position.z - newPosition.z) >= 1
  ) {
      chracter.position.x += targetVector.x;
      chracter.position.z += targetVector.z;
      action.stop();
    }
  action.play()
  renderer.render(scene, camera);
  requestAnimationFrame(render)
  orbitControls.update();
  if(mixer) {
    mixer.update(clock.getDelta())
  }
}

render();