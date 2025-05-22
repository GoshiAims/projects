import * as THREE from 'https://unpkg.com/three@0.160.1/build/three.module.js';
import { AsciiEffect } from 'https://unpkg.com/three@0.160.1/examples/jsm/effects/AsciiEffect.js';

let scene, camera, renderer, effect, cube;

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function hideLoadingScreen() {
    const loader = document.getElementById('loading-screen');
    loader.style.opacity = 0;
    setTimeout(() => loader.style.display = 'none', 500);
}

if (isMobileDevice()) {
    document.getElementById('mobile-message').style.display = 'flex';
} else {
    init();
    hideLoadingScreen()
    animate();
}

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
    effect.setSize(window.innerWidth, window.innerHeight);
    effect.domElement.id = 'ascii-container';
    document.body.appendChild(effect.domElement);

    const geometry = new THREE.BoxGeometry( 3, 3, 3 ); 
    const material = new THREE.MeshNormalMaterial(); 
    cube = new THREE.Mesh( geometry, material ); 
    scene.add( cube );

    cube.rotation.x = 3.7
  
    window.addEventListener('resize', onWindowResize);
}

function animate() {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    effect.render(scene, camera);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    effect.setSize(window.innerWidth, window.innerHeight);
  }
