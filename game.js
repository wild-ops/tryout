// Set up Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a flat green ground
const groundGeometry = new THREE.PlaneGeometry(50, 50);
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Create a low-poly player (simple cube)
const playerGeometry = new THREE.BoxGeometry(1, 2, 1);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.y = 1;
scene.add(player);

// Add lighting
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

// Create a health bar UI
const healthBar = document.createElement("div");
healthBar.id = "healthBar";
document.body.appendChild(healthBar);

const health = document.createElement("div");
health.id = "health";
healthBar.appendChild(health);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Update movement
    const speed = 0.1;
    if (movement.forward) player.position.z -= speed;
    if (movement.backward) player.position.z += speed;
    if (movement.left) player.position.x -= speed;
    if (movement.right) player.position.x += speed;

    // Move camera with player
    camera.position.set(player.position.x, 3, player.position.z + 5);
    camera.lookAt(player.position);

    renderer.render(scene, camera);
}
animate();
