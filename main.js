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
    throw new Error("Mobile device - unsupported")
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

let contactPage = document.getElementById('contact-page')
let historyPage = document.getElementById('history-page')
let projectPage = document.getElementById('projects-page')

let btncontact = document.getElementById('btn-contact')
let btnhistory = document.getElementById('btn-history')
let btnprojects = document.getElementById('btn-projects')

let btn2dsandboxgame = document.getElementById('btn2dsandboxgame')
let project_2dsandboxgame = document.getElementById('project_2dsandboxgame')

// function getPages() {
//     contactPage = document.getElementById('contact-page')
//     historyPage = document.getElementById('history-page')
//     projectPage = document.getElementById('projects-page')
// }

function showPage(page) {
    page.classList.remove('hidden');
}

function isHidden(page) {
    if (page.className == 'hidden')
        return true
    else
        return false
}

function hidePage(page) {
    switch(page) {
        case historyPage:
            if (isHidden(historyPage))
                break
            else
                historyPage.classList.add('hidden');
            break
        case contactPage:
            if (isHidden(contactPage))
                break
            else
                contactPage.classList.add('hidden');
            break
        case projectPage:
            if (isHidden(projectPage))
                break
            else
                projectPage.classList.add('hidden');
            break
    }
}

btncontact.addEventListener('click', () => {
    hidePage(projectPage);
    hidePage(historyPage);
    showPage(contactPage);
});

btnhistory.addEventListener('click', () => {
    hidePage(projectPage)
    hidePage(contactPage)
    showPage(historyPage)
});

btnprojects.addEventListener('click', () => {
    hidePage(historyPage)
    hidePage(contactPage)
    showPage(projectPage)
});

const closebuttons = document.querySelectorAll('.close-page');
closebuttons.forEach(closebutton => {
    closebutton.addEventListener('click', () => {
        // getPages()
        hidePage(contactPage)
        hidePage(projectPage)
        hidePage(historyPage)
});})