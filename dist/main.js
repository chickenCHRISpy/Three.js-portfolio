import './style.css'

import * as THREE from 'three'
import { PointLight } from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

renderer.render(scene, camera)


const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x01ffff });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const light = new THREE.PointLight(0xffffff)
light.position.set(5,5,5)

const ambientlight = new THREE.AmbientLight(0xffffff)


scene.add(light, ambientlight)

const lightHelper = new THREE.PointLightHelper(light)
const gridtHelper = new THREE.GridHelper(light)
scene.add(lightHelper, gridtHelper)


const controls = new OrbitControls(camera, renderer.domElement)


function addStar() {
  const geometry = new THREE.SphereGeometry(0.25,24,24)
  const material = new THREE.MeshStandardMaterial({
    color: 'white'
  })
  const star = new THREE.Mesh(geometry, material)

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
  star.position.set(x,y,z);
  scene.add(star)
}

Array(250).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


const avatar = new THREE.TextureLoader().load('chickenCHRISpy.png');

const me = new THREE.Mesh(
  new THREE.BoxGeometry(5,5,5),
  new THREE.MeshStandardMaterial({map: avatar})
)
scene.add(me)

const moonTexture = new THREE.TextureLoader().load('neon.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')

const moon = new THREE.Mesh(
  new THREE.DodecahedronGeometry(10, 1),
  new THREE.MeshStandardMaterial(
    {
      map: moonTexture,
      normalMap: normalTexture
    }
  )
)
scene.add(moon)

moon.position.setZ(30);
moon.position.setX(-10);

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  me.rotation.y += 0.01;
  me.rotation.z += 0.01;

  camera.position.x = t * -0.01;
  camera.position.y = t * -0.0002;
  camera.position.z = t * -0.0002;


}
document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.09;

  controls.update();
  renderer.render(scene, camera)
}
animate()