import "./styles.css";
import { greeting } from "./greeting.js";
import profileImage from "./assets/images/profile-pic.png"
import githubIcon from "./assets/images/github-mark.svg"

console.log(greeting);

const cardImage = document.querySelector('.card-image');
cardImage.src = profileImage;

const linkIcon = document.querySelector('.link-icon');
linkIcon.src = githubIcon;

const footer = document.querySelector('.footer');
const currentYear = new Date().getFullYear();
footer.textContent = `Copyright © ${currentYear} KlakCodes`;

// 3D card drag interaction
const card = document.getElementById('card');

let isDragging = false;
let startX = 0;
let startY = 0;
let baseRotateY = 0;
let baseRotateX = 0;
let currentRotateY = 0;
let currentRotateX = 0;

function applyTransform() {
    card.style.transform = `rotateY(${currentRotateY}deg) rotateX(${currentRotateX}deg)`;
}

function onPointerDown(clientX, clientY) {
    isDragging = true;
    startX = clientX;
    startY = clientY;
    baseRotateY = currentRotateY;
    baseRotateX = currentRotateX;
    card.classList.add('is-dragging');
    card.classList.remove('is-snapping');
}

function onPointerMove(clientX, clientY) {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    const deltaY = clientY - startY;
    currentRotateY = baseRotateY + deltaX * 0.5;
    currentRotateX = Math.max(-25, Math.min(25, baseRotateX - deltaY * 0.3));
    applyTransform();
}

function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    card.classList.remove('is-dragging');
    card.classList.add('is-snapping');
    // Snap to nearest face (every 180deg)
    currentRotateY = Math.round(currentRotateY / 180) * 180;
    currentRotateX = 0;
    applyTransform();
}

card.addEventListener('transitionend', () => card.classList.remove('is-snapping'));

// Mouse events
card.addEventListener('mousedown', (e) => {
    onPointerDown(e.clientX, e.clientY);
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => onPointerMove(e.clientX, e.clientY));
document.addEventListener('mouseup', onPointerUp);

// Touch events
card.addEventListener('touchstart', (e) => {
    onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
    e.preventDefault();
}, { passive: false });

card.addEventListener('touchmove', (e) => {
    onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    e.preventDefault();
}, { passive: false });

card.addEventListener('touchend', onPointerUp);
