// Cake data
const themedCakes = [
    { id: 1, name: "Superhero Cake", price: 49.99, image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=500&h=500&fit=crop", theme: "Boys Birthday" },
    { id: 2, name: "Princess Castle Cake", price: 59.99, image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=500&h=500&fit=crop", theme: "Girls Birthday" },
    { id: 3, name: "Sports Car Cake", price: 54.99, image: "https://images.unsplash.com/photo-1519654793190-28a034206610?w=500&h=500&fit=crop", theme: "Dad's Birthday" },
    { id: 4, name: "Flower Garden Cake", price: 64.99, image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500&h=500&fit=crop", theme: "Mom's Birthday" },
    { id: 5, name: "Unicorn Cake", price: 49.99, image: "https://images.unsplash.com/photo-1557979619-445218f326b9?w=500&h=500&fit=crop", theme: "Sister's Birthday" },
    { id: 6, name: "Video Game Controller Cake", price: 54.99, image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500&h=500&fit=crop", theme: "Brother's Birthday" }
];

const occasionCakes = [
    { id: 7, name: "Wedding Elegance Cake", price: 199.99, image: "https://images.unsplash.com/photo-1522767131594-6b7e96848f0b?w=500&h=500&fit=crop", occasion: "Wedding" },
    { id: 8, name: "Anniversary Love Cake", price: 79.99, image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=500&h=500&fit=crop", occasion: "Anniversary" },
    { id: 9, name: "Valentine's Heart Cake", price: 59.99, image: "https://images.unsplash.com/photo-1582401656496-9d75f95f9018?w=500&h=500&fit=crop", occasion: "Valentine's Day" },
    { id: 10, name: "Christmas Tree Cake", price: 69.99, image: "https://images.unsplash.com/photo-1576777647209-e8733d7b851d?w=500&h=500&fit=crop", occasion: "Christmas" },
    { id: 11, name: "Easter Bunny Cake", price: 54.99, image: "https://images.unsplash.com/photo-1521708266372-b3547456cc2d?w=500&h=500&fit=crop", occasion: "Easter" },
    { id: 12, name: "Graduation Cap Cake", price: 64.99, image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=500&h=500&fit=crop", occasion: "Graduation" }
];

// Function to create cake cards
function createCakeCard(cake) {
    const card = document.createElement('div');
    card.className = 'cake-card';
    card.innerHTML = `
        <img src="${cake.image}" alt="${cake.name}">
        <div class="cake-card-content">
            <h3>${cake.name}</h3>
            <p>$${cake.price.toFixed(2)}</p>
            <p>${cake.theme || cake.occasion}</p>
        </div>
    `;
    card.addEventListener('click', () => openModal(cake));
    return card;
}

// Populate cake grids
function populateCakeGrid(cakes, gridId) {
    const grid = document.getElementById(gridId);
    cakes.forEach(cake => {
        grid.appendChild(createCakeCard(cake));
    });
}

populateCakeGrid(themedCakes, 'themed-cakes-grid');
populateCakeGrid(occasionCakes, 'occasion-cakes-grid');

// Modal functionality
const modal = document.getElementById('cake-modal');
const closeBtn = document.getElementsByClassName('close')[0];

closeBtn.onclick = () => {
    modal.style.display = 'none';
};

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

// 3D cake rendering
let scene, camera, renderer, cake;

function init3DScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(300, 300);
    document.getElementById('cake-3d-container').appendChild(renderer.domElement);

    const geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    cake = new THREE.Mesh(geometry, material);
    scene.add(cake);

    camera.position.z = 5;
}

function animate() {
    requestAnimationFrame(animate);
    cake.rotation.y += 0.01;
    renderer.render(scene, camera);
}

init3DScene();
animate();

function openModal(cakeData) {
    modal.style.display = 'block';
    document.getElementById('cake-details').innerHTML = `
        <h2>${cakeData.name}</h2>
        <p>Price: $${cakeData.price.toFixed(2)}</p>
        <p>${cakeData.theme || cakeData.occasion}</p>
    `;
    // Update 3D cake color based on the cake theme/occasion
    cake.material.color.setHex(Math.random() * 0xffffff);
}

// Custom order form submission
document.getElementById('custom-order-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your custom order! We will contact you soon.');
});