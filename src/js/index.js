import * as THREE from "three";

// choose result canvas

const $result = document.getElementById("result");

// 1. Scene ㅁ화ㅇㄴㅇ서 보줄 객ㅔㄹㅡㄹㄴ담는

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);
//2. Camera : perspective that sees the scene.
const camera = new THREE.PerspectiveCamera(
  50, // 야시야각 the bigger number is, the wider view is
  $result.clientWidth / $result.clientHeight,
  0.1, // min distance
  1000 // max distance
);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);

//3. Renderer : render the scene
const renderer = new THREE.WebGLRenderer({
  canvas: $result,
  antialias: true, // to prevent stair effects
});
renderer.setSize($result.clientWidth, $result.clientHeight); // renderer itself's size beecame same as canvas size.

// add renderer to the body
// document.body.appendChild(renderer.domElement);

// and now render the renderer
renderer.render(scene, camera);

const light = new THREE.DirectionalLight(0xffffff, 1);
scene.add(light);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x2e6ff2 });

// Mesh : 3 dimensional object
// geometry + material = mesh
// geometry : shape of the object
// material : color/fabric of the object
const geo1 = new THREE.BoxGeometry(1, 1, 1); // 1* 1* 1 box
const geo2 = new THREE.ConeGeometry(1, 1, 32); // radius, height, segment
const geo3 = new THREE.SphereGeometry(1, 32, 32); // radius, width segment, height segment
const geo4 = new THREE.PlaneGeometry(1, 1, 32, 32); // width, height, width segment, height segment 2 dimensions
const geo5 = new THREE.TorusGeometry(1, 0.35, 32, 100); // donut, radius, tube, radial segment, tubular segment

const box = new THREE.Mesh(geometry, material);

// will be added to scene to make this box shown.

scene.add(box);

// axesHelper : x,y,z axis

// function to use in requestAnimationFrame
function animate() {
  // whenever animate is called, it will rotate the box.
  box.rotation.y += 0.01;
  requestAnimationFrame(animate);
  // even though y is being modified, the changes not reflected on the screen.
  renderer.render(scene, camera);
}
// before rendering next frame, it repeatedly call the animate.
animate();

// for the resizing
window.addEventListener("resize", () => {
  // update the camera
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
