/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section'),
      navBarList = document.querySelector('#navbar__list'),
      header = document.querySelector('.page__header'),
      toTopButton = document.querySelector('#scrollToTopButton');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function inViewport(section) {
    const secPos = section.getBoundingClientRect();
    return (
        !(secPos.top > 270 || secPos.bottom < 300)
    );
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
// build the nav
function buildNav(){
    const fragment = document.createDocumentFragment();
    for(let i = 1; i<=sections.length; ++i){
        const li = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.textContent = sections[i-1].getAttribute('data-nav');
        anchor.setAttribute('href', '');
        anchor.setAttribute('data-anch', `section${i}`);
        anchor.classList.add('menu__link');
        li.appendChild(anchor);
        fragment.appendChild(li);
    }
    navBarList.appendChild(fragment);
    window.navItems = document.querySelectorAll('[data-anch]');
    //the first item is set to active by default
    navItems[0].classList.add('navbar__active');
}
// Add class 'active' to section when near top of viewport
function activeSection(){
    // Make header fixed while scrolling
    header.style.position = 'fixed';
    // Make the button visible When the user scrolls below the fold of the page
    if (document.body.scrollTop > innerHeight || document.documentElement.scrollTop > innerHeight) {
        toTopButton.style.display = "block";
    } else {
        toTopButton.style.display = "none";
    }
    // Check the active section in viewport
    // Add 'navbar__active' class to item whose section is in viewport
    for(let i = 0; i<sections.length; ++i){
        if(inViewport(sections[i]) && document.querySelector('.your-active-class') != sections[i] && document.querySelector('.navbar__active') != navItems[i]){
            document.querySelector('.your-active-class').classList.remove("your-active-class");
            sections[i].classList.add("your-active-class");
            document.querySelector('.navbar__active').classList.remove("navbar__active");
            navItems[i].classList.add("navbar__active");
        }
    }
    // Hide header fixed position while not scrolling
    setTimeout(function() {
        header.style.position = 'absolute';
	}, 1200);
}
// Scroll to anchor ID using scrollTO event
function scroll(section) {
    // prevent the default event of anchors
    section.preventDefault();
    if(section.target.hasAttribute('data-anch')){
        window.scrollTo({
            top: document.querySelector(`#${section.target.getAttribute('data-anch')}`).offsetTop,
            behavior: "smooth"
        })
    }
}
// When the user clicks on the button, scroll to the top of the page
function toTop() {
    window.scrollTo({
        top: document.body.offsetTop,
        behavior: "smooth"
    })
}
/**
 * End Main Functions
 * Begin Events
 * 
*/
// Build menu
document.addEventListener('DOMContentLoaded', buildNav);
// Scroll to section on link click
navBarList.addEventListener('click', scroll);
// Set sections as active
document.addEventListener('scroll', activeSection);
// Scroll to top on button click
toTopButton.addEventListener('click', toTop);