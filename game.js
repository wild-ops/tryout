// Import Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Large terrain setup
const terrainSize = 1000000; // 1 million blocks wide
const oceanSize = terrainSize + 500; // Ocean beyond the land

// Ground texture
const groundGeometry = new THREE.PlaneGeometry(terrainSize, terrainSize, 256, 256);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x007f00, wireframe: false });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Ocean surrounding the terrain
const oceanGeometry = new THREE.PlaneGeometry(oceanSize, oceanSize);
const oceanMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
ocean.position.y = -2; // Slightly below terrain
ocean.rotation.x = -Math.PI / 2;
scene.add(ocean);

// Function to reset player if they touch the ocean
function checkOceanBounds() {
    if (Math.abs(player.position.x) > terrainSize / 2 || Math.abs(player.position.z) > terrainSize / 2) {
        player.position.set(0, 1, 0); // Teleport back to the center
    }
}

// Procedural trees (random placement)
const trees = [];
for (let i = 0; i < 5000; i++) { // Generate 5000 trees randomly
    const treeGeometry = new THREE.CylinderGeometry(0.5, 1, 4, 6);
    const treeMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 }); // Brown tree trunk
    const tree = new THREE.Mesh(treeGeometry, treeMaterial);
    tree.position.set(Math.random() * terrainSize - terrainSize / 2, 2, Math.random() * terrainSize - terrainSize / 2);
    scene.add(tree);
    trees.push(tree);
}

// Mountains using Perlin Noise (Basic approximation)
function generateMountain(x, z) {
    return Math.sin(x * 0.001) * Math.cos(z * 0.001) * 20; // Heightmap function
}

// Player (simple cube)
const playerGeometry = new THREE.BoxGeometry(1, 2, 1);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.set(0, 1, 0);
scene.add(player);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

// Camera setup
camera.position.set(0, 3, 5);
camera.lookAt(player.position);

// Movement controls
const movement = { forward: false, backward: false, left: false, right: false };

document.addEventListener("keydown", (event) => {
    if (event.key === "w" || event.key === "ArrowUp") movement.forward = true;
    if (event.key === "s" || event.key === "ArrowDown") movement.backward = true;
    if (event.key === "a" || event.key === "ArrowLeft") movement.left = true;
    if (event.key === "d" || event.key === "ArrowRight") movement.right = true;
});

document.addEventListener("keyup", (event) => {
    if (event.key === "w" || event.key === "ArrowUp") movement.forward = false;
    if (event.key === "s" || event.key === "ArrowDown") movement.backward = false;
    if (event.key === "a" || event.key === "ArrowLeft") movement.left = false;
    if (event.key === "d" || event.key === "ArrowRight") movement.right = false;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update movement
    const speed = 2;
    if (movement.forward) player.position.z -= speed;
    if (movement.backward) player.position.z += speed;
    if (movement.left) player.position.x -= speed;
    if (movement.right) player.position.x += speed;

    // Check for ocean teleportation
    checkOceanBounds();

    // Move camera with player
    camera.position.set(player.position.x, 5, player.position.z + 10);
    camera.lookAt(player.position);

    renderer.render(scene, camera);
}
animate();
