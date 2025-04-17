// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a simple cube to represent an item (e.g., a pet)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position the camera
camera.position.z = 5;

// Variables for the clicker game
let clicks = 0;
let clickPower = 1; // Base click power
let clickCountEl = document.getElementById("click-count");
let clickPowerEl = document.getElementById("click-power");

// Raycasting for detecting clicks on the 3D object
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Event listener for mouse click
window.addEventListener('click', onClick, false);

function onClick(event) {
  // Calculate mouse position in normalized device coordinates (-1 to +1)
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Update the raycaster with the mouse position
  raycaster.update();
  raycaster.setFromCamera(mouse, camera);

  // Check for intersections with the cube
  const intersects = raycaster.intersectObject(cube);
  if (intersects.length > 0) {
    // If we clicked on the cube, increment the click count
    clicks += clickPower;
    updateUI();
  }
}

// Update the UI with current click count and click power
function updateUI() {
  clickCountEl.textContent = clicks;
  clickPowerEl.textContent = clickPower;
}

// Animation loop to render the scene
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube for a dynamic look
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Render the scene from the camera's perspective
  renderer.render(scene, camera);
}

animate(); // Start the animation loop
