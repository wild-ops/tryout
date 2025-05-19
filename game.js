// Set up Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ground setup
const groundSize = 10000;
const groundGeometry = new THREE.PlaneGeometry(groundSize, groundSize, 256, 256);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x007f00, wireframe: false });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Ocean
const oceanSize = groundSize + 500;
const oceanGeometry = new THREE.PlaneGeometry(oceanSize, oceanSize);
const oceanMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
ocean.position.y = -2;
ocean.rotation.x = -Math.PI / 2;
scene.add(ocean);

// Function to reset player position
function checkOceanBounds() {
    if (Math.abs(player.position.x) > groundSize / 2 || Math.abs(player.position.z) > groundSize / 2) {
        player.position.set(0, 1, 0);
    }
}

// Procedural trees
const trees = [];
for (let i = 0; i < 500; i++) {
    const treeGeometry = new THREE.CylinderGeometry(0.5, 1, 4, 6);
    const treeMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
    const tree = new THREE.Mesh(treeGeometry, treeMaterial);
    tree.position.set(Math.random() * groundSize - groundSize / 2, 2, Math.random() * groundSize - groundSize / 2);
    scene.add(tree);
    trees.push(tree);
}

// Player model (blocky with hands)
const playerGroup = new THREE.Group();

// Torso
const torsoGeometry = new THREE.BoxGeometry(1, 2, 0.8);
const torsoMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
torso.position.y = 2;
playerGroup.add(torso);

// Head (Chill face)
const headGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
const headMaterial = new THREE.MeshBasicMaterial({ color: 0xffccaa });
const head = new THREE.Mesh(headGeometry, headMaterial);
head.position.y = 3;
playerGroup.add(head);

// Legs
const legGeometry = new THREE.BoxGeometry(0.5, 1.5, 0.5);
const legMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
leftLeg.position.set(-0.3, 1, 0);
const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
rightLeg.position.set(0.3, 1, 0);
playerGroup.add(leftLeg);
playerGroup.add(rightLeg);

// Arms
const armGeometry = new THREE.BoxGeometry(0.4, 1.5, 0.4);
const armMaterial = new THREE.MeshBasicMaterial({ color: 0xffccaa });
const leftArm = new THREE.Mesh(armGeometry, armMaterial);
leftArm.position.set(-0.8, 2.5, 0);
const rightArm = new THREE.Mesh(armGeometry, armMaterial);
rightArm.position.set(0.8, 2.5, 0);
playerGroup.add(leftArm);
playerGroup.add(rightArm);

// Add player to scene
playerGroup.position.set(0, 1, 0);
scene.add(playerGroup);

// Camera setup
camera.position.set(0, 4, 6);
camera.lookAt(playerGroup.position);

// Movement controls
const movement = { forward: false, backward: false, left: false, right: false };
document.addEventListener("keydown", (event) => {
    if (event.key === "w") movement.forward = true;
    if (event.key === "s") movement.backward = true;
    if (event.key === "a") movement.left = true;
    if (event.key === "d") movement.right = true;
});
document.addEventListener("keyup", (event) => {
    if (event.key === "w") movement.forward = false;
    if (event.key === "s") movement.backward = false;
    if (event.key === "a") movement.left = false;
    if (event.key === "d") movement.right = false;
});

// Arm animation on left-click
document.addEventListener("mousedown", () => {
    rightArm.rotation.x = -Math.PI / 2;
    setTimeout(() => {
        rightArm.rotation.x = 0;
    }, 200);
});

// Game loop
function animate() {
    requestAnimationFrame(animate);
    const speed = 0.2;
    if (movement.forward) playerGroup.position.z -= speed;
    if (movement.backward) playerGroup.position.z += speed;
    if (movement.left) playerGroup.position.x -= speed;
    if (movement.right) playerGroup.position.x += speed;
    checkOceanBounds();
    camera.position.set(playerGroup.position.x, 4, playerGroup.position.z + 6);
    camera.lookAt(playerGroup.position);
    renderer.render(scene, camera);
}
animate();
