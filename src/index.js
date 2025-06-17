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