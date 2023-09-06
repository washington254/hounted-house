import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

function init() {
  const loadingBox = document.querySelector(".loading-box");
  loadingBox.style.display = "none";
}

THREE.ColorManagement.enabled = false;

const btn = document.querySelector("button");
const audio = document.querySelector("#audio-el");

init();

const soundOffSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 7.358v15.642l-8-5v-.785l8-9.857zm3-6.094l-1.548-1.264-3.446 4.247-6.006 3.753v3.646l-2 2.464v-6.11h-4v10h.843l-3.843 4.736 1.548 1.264 18.452-22.736z"/></svg>`;

const soundOnSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 17h-5v-10h5v10zm2-10v10l9 5v-20l-9 5zm11.008 2.093c.742.743 1.2 1.77 1.198 2.903-.002 1.133-.462 2.158-1.205 2.9l1.219 1.223c1.057-1.053 1.712-2.511 1.715-4.121.002-1.611-.648-3.068-1.702-4.125l-1.225 1.22zm2.142-2.135c1.288 1.292 2.082 3.073 2.079 5.041s-.804 3.75-2.096 5.039l1.25 1.254c1.612-1.608 2.613-3.834 2.616-6.291.005-2.457-.986-4.681-2.595-6.293l-1.254 1.25z"/></svg>`;

btn.addEventListener("click", () => {
  if (btn.classList.contains("is-active")) {
    btn.classList.remove("is-active");
  }
  if (!audio.paused) {
    audio.pause();
    btn.innerHTML = soundOnSvg;
    console.log(audio.paused);
  } else {
    console.log(audio.paused);
    audio.play();
    btn.innerHTML = soundOffSvg;
  }
});

/**
 * Base
 */
// Debug
const gui = new dat.GUI();
gui.hide();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Fog
const fog = new THREE.Fog("#262837", 3, 18);
scene.fog = fog;

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

// Door Textures
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAplhaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");




// Bricks Texture
const brickColorTexture = textureLoader.load("/textures/bricks/color.jpg");
const brickAmbientOcclusionTexture = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
const brickNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
const brickRoughnessTexture = textureLoader.load(
  "/textures/bricks/roughness.jpg"
);

// Moon Texture
const moonColorTexture = textureLoader.load("/textures/moon/color.jpg");
const moonAmbientOcclusionTexture = textureLoader.load(
  "/textures/moon/ambientOcclusion.jpg"
);
const moonNormalTexture = textureLoader.load("/textures/moon/normal.jpg");
const moonRoughnessTexture = textureLoader.load("/textures/moon/roughness.png");

// Stone Texture
const stoneColorTexture = textureLoader.load("/textures/stone/color.jpg");
const stoneAmbientOcclusionTexture = textureLoader.load(
  "/textures/stone/ambientOcclusion.jpg"
);
const stoneNormalTexture = textureLoader.load("/textures/stone/normal.jpg");
const stoneRoughnessTexture = textureLoader.load(
  "/textures/stone/roughness.jpg"
);
const stoneHeightTexture = textureLoader.load("/textures/stone/height.png");


// Roof Texture
const roofColorTexture = textureLoader.load("/textures/roof/color.jpg");
const roofAmbientOcclusionTexture = textureLoader.load(
  "/textures/roof/ambientOcclusion.jpg"
);
const roofNormalTexture = textureLoader.load("/textures/roof/normal.jpg");
const roofRoughnessTexture = textureLoader.load("/textures/roof/roughness.jpg");
const roofHeightTexture = textureLoader.load("/textures/roof/height.png");

// Grass Texture
const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
const grassAmbientOcclusionTexture = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
const grassRoughnessTexture = textureLoader.load(
  "/textures/grass/roughness.jpg"
);

grassColorTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

/**
 * House
 */
// Create group
const house = new THREE.Group();
scene.add(house);

// Create walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 3.4, 4),
  new THREE.MeshStandardMaterial({
    map: stoneColorTexture,
    aoMap: stoneAmbientOcclusionTexture,
    normalMap: stoneNormalTexture,
    roughnessMap: stoneRoughnessTexture,
  })
);
walls.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);
walls.position.y = 2.5 / 2;
house.add(walls);

// Side Pillars
const pillarGeometry = new THREE.CylinderGeometry(0.8, 0.8, 3.5, 32);
const pillarGeometry2 = new THREE.CylinderGeometry(0.8, 0.8, 5.5, 32);
const pillarMaterial = new THREE.MeshStandardMaterial({
  map: stoneColorTexture,
  aoMap: stoneAmbientOcclusionTexture,
  normalMap: stoneNormalTexture,
  roughnessMap: stoneRoughnessTexture,
});
const pillarRight = new THREE.Mesh(pillarGeometry, pillarMaterial);
pillarRight.position.y = 3.5 / 2;
pillarRight.position.x = 5 / 2;
pillarRight.position.z = 4 / 2;


const pillarLeft = new THREE.Mesh(pillarGeometry, pillarMaterial);
pillarLeft.position.y = 3.5 / 2;
pillarLeft.position.x = -5 / 2;
pillarLeft.position.z = 4 / 2;



house.add(pillarLeft, pillarRight);

// Pillar roof
const pillarRoofGeometry = new THREE.ConeGeometry(1, 1.5, 32);
const pillarRoofMaterial = new THREE.MeshStandardMaterial({
  map: roofColorTexture,
  aoMap: roofAmbientOcclusionTexture,
  normalMap: roofNormalTexture,
  roughnessMap: roofRoughnessTexture,
});
const pillarRoof1 = new THREE.Mesh(pillarRoofGeometry, pillarRoofMaterial);
const pillarRoof2 = new THREE.Mesh(pillarRoofGeometry, pillarRoofMaterial);

pillarRoof1.position.y = 4;
pillarRoof1.position.z = 4 / 2;
pillarRoof1.position.x = 5 / 2;

pillarRoof2.position.y = 4;
pillarRoof2.position.z = 4 / 2;
pillarRoof2.position.x = -5 / 2;


house.add(pillarRoof1, pillarRoof2);

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ 
    map: brickColorTexture,
    aoMap: brickAmbientOcclusionTexture,
    normalMap: brickNormalTexture,
   })
)
roof.rotation.y = Math.PI * 0.25
roof.position.y = 3.4
house.add(roof)

// Create door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(3, 3, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAplhaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.2,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);
door.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);
door.position.y = 1.35;
door.position.z = 2 + 0.01;
house.add(door);

// Add Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushesMaterial = new THREE.MeshStandardMaterial({ color: "#5d7847" });

const bush1 = new THREE.Mesh(bushGeometry, bushesMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushesMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushesMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushesMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

house.add(bush1, bush2, bush3, bush4);

// Graves
const gravesGroup = new THREE.Group();
scene.add(gravesGroup);

const graveGeometry = new THREE.BoxGeometry(0.7, 0.9, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
  map: stoneColorTexture,
  aoMap: stoneAmbientOcclusionTexture,
  normalMap: stoneNormalTexture,
  roughnessMap: stoneRoughnessTexture,
});

for (let index = 0; index < 60; index++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 5 + Math.random() * 7;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.set(x, 0.4, z);
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  grave.castShadow = true;
  gravesGroup.add(grave);
}

// Moon
const moonGeometry = new THREE.SphereGeometry(1, 15, 8);
const moonMaterial = new THREE.MeshBasicMaterial({
  map: moonColorTexture,
  aoMap: moonAmbientOcclusionTexture,
  // normalMap: moonNormalTexture,
  // roughnessMap: moonRoughnessTexture,
});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);
moon.position.y = 10;
moon.position.x = -7;
moon.position.z = -4;


// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(25, 25),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
);
floor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

// Door Light
const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
doorLight.position.set(0, 2.2, 2.7);
house.add(doorLight);

// Ghost
const ghost1 = new THREE.PointLight("#ff00ff", 2, 3);
const ghost2 = new THREE.PointLight("#00ffff", 2, 3);
const ghost3 = new THREE.PointLight("#ffff00", 2, 3);
scene.add(ghost1, ghost2, ghost3);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = -2;
camera.position.y = 5;
camera.position.z = 10;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableZoom = true;
controls.enableRotate = true;
controls.enableDamping = true;
controls.autoRotate = false;
controls.rotateSpeed = 1;
controls.dampingFactor = 0.08;
controls.minDistance = 4;
controls.maxDistance = 10;
controls.maxPolarAngle = 4*(Math.PI / 9);
controls.minPolarAngle = 1*(Math.PI / 7);
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#262837");

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Shadows
moonLight.castShadow = true;
doorLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;
floor.receiveShadow = true;

// Shadow optimisation
doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;

/**
 * Animate
 */
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update Ghost
  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y = Math.sin(elapsedTime * 3);

  const ghost2Angle = -elapsedTime * 0.32;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  const ghost3Angle = -elapsedTime * 0.18;
  ghost3.position.x =
    Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
  ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
  ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  // update candle

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

// for (let i = 0; i < 50; i++) {
//   const candle = new THREE.Mesh(candleGeometry, candleMaterial);
//   const xVal = (Math.random() - 0.5) * 50;
//   const yVal = (Math.random() - 0.5) * 50;
//   const zVal = (Math.random() - 0.5) * 50;
//   candle.position.x = xVal;
//   candle.position.y = Math.abs(yVal);
//   candle.position.z = zVal;
//   const scale = Math.random();
//   candle.scale.set(scale, scale, scale);
//   scene.add(candle);
// }
