import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import starsTexture from '../img/img one.png';
import sunTexture from '../img/sun1.jpg';
import mercuryTexture from '../img/mercury.jpg';
import venusTexture from '../img/venus.jpg';
import earthTexture from '../img/earth.jpg';
import marsTexture from '../img/mars.jpg';
import jupiterTexture from '../img/Jupiter.jpg';
import saturnTexture from '../img/saturn.jpg';
import saturnRingTexture from '../img/saturn ring.jpg';
import uranusTexture from '../img/uranus.jpg';
import neptuneTexture from '../img/neptune.jpg';
import plutoTexture from '../img/pluto.jpg';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
const cubeTexture = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
]);

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

function createPlanete(size, texture, position,){
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(texture)
});
const mesh = new THREE.Mesh(geo, mat);
const obj = new THREE.Object3D();
obj.add(mesh);
scene.add(obj);
mesh.position.x = position;
return {mesh, obj}
}

const mercury = createPlanete(3.2, mercuryTexture, 28);
const venus = createPlanete(3.7, venusTexture, 44);
const earth = createPlanete(3.8, earthTexture,60);
const mars = createPlanete(3.8, marsTexture, 76);
const jupiter = createPlanete(6, jupiterTexture, 92);
const uranus = createPlanete(7, uranusTexture, 156);
const neptune = createPlanete(7, neptuneTexture, 170); 
const pluto = createPlanete(6, plutoTexture, 185);


const saturnGeo = new THREE.SphereGeometry(5, 30, 30);
const saturnMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(saturnTexture)
});
const saturn = new THREE.Mesh(saturnGeo, saturnMat);
const saturnObj = new THREE.Object3D();
saturnObj.add(saturn);
scene.add(saturnObj);
saturn.position.x = 120;

const saturnRingGeo = new THREE.RingGeometry(5, 20, 32);
const saturnRingMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(saturnRingTexture),
    side: THREE.DoubleSide
});
const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat);
saturnObj.add(saturnRing);
saturnRing.position.x = 120;
saturnRing.rotation.x = -0.5 * Math.PI;

const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
scene.add(pointLight);


function animate() {
    sun.rotateY(0.004);
    mercury.mesh.rotateY(0.004);
    mercury.obj.rotateY(0.04);
    venus.mesh.rotateY(0.002);
    venus.obj.rotateY(0.03);
    earth.mesh.rotateY(0.02);
    earth.obj.rotateY(0.009);
    mars.mesh.rotateY(0.018);
    mars.obj.rotateY(0.007);
    jupiter.mesh.rotateY(0.04);
    jupiter.obj.rotateY(0.002);
    saturn.rotateY(0.038);
    saturnObj.rotateY(0.0009);
    uranus.mesh.rotateY(0.0009);
    uranus.obj.rotateY(0.0004);
    neptune.mesh.rotateY(0.032);
    neptune.obj.rotateY(0.0001);
    pluto.mesh.rotateY(0.008);
    pluto.obj.rotateY(0.00007);
    
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});