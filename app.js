{//hide and show nav bar depending on scrolling direction
    const nav = document.querySelector('.nav');
    let scrollY = window.scrollY;
    window.addEventListener("scroll", () => {
        if (scrollY < window.scrollY) {
            //scrolling down
            if (window.scrollY >= 500) {
                nav.classList.add("nav--hidden");
            }
        } else {
            //scrolling up
            nav.classList.remove("nav--hidden");
        }
        scrollY = window.scrollY;
    });
    //show or hide nav bar when the user clicks on the screen
    document.addEventListener('click', (event) => {
        if (window.scrollY >= 500 && event.target !== nav && !event.target.classList.contains('nav--link') && event.target.parentElement !== nav && !event.target.classList.contains('home-link')) {
            nav.classList.toggle('nav--hidden');
        }
    });
}
{
    const fragment = document.createDocumentFragment("div");
    const sectionsContainer = document.querySelector(".sections");
    const navContainer = document.querySelector(".nav ul");
    const headings = document.querySelectorAll(".section h2");
    const sections = document.querySelectorAll(".section");
    let navLinks = document.querySelectorAll(".nav--link");
    for (let i = 0; i < sections.length; i++) {
        let collapseArrow = document.createElement("span");
        collapseArrow.innerHTML = ('&and;');
        sections[i].insertBefore(collapseArrow, sections[i].firstChild);
    }
    {//a function to add a navigation link for every section
        function addAnchor(x, y) {
            for (let i = x + 1; i <= y; i++) {
                let listItem = document.createElement("li")
                let newAnchor = document.createElement("a");
                newAnchor.classList.add("nav--link");
                newAnchor.setAttribute("href", "#section" + i);
                newAnchor.textContent = headings[i - 1].innerText;
                listItem.appendChild(newAnchor);
                fragment.appendChild(listItem);
            }
            navContainer.appendChild(fragment);
        }
        //add special id for every section to navigate to it
        sectionsContainer.classList.add('.hide');
        for (let i = 1; i <= sections.length; i++) {
            sections[i - 1].setAttribute("id", "section" + i);
        }
        if (sections.length > navLinks.length) {
            addAnchor(navLinks.length, sections.length);
        }
        sectionsContainer.classList.remove('.hide');
        //to set the width of navigation buttons depending on their number
        navLinks = document.querySelectorAll('.nav--link');
        const listItems = document.querySelectorAll('.nav li');
        for (let a of listItems) {
            a.style.width = `${100 / navLinks.length}%`;
        }
    }
}
{//detect which section is closest to the top of the page and highlight it.
    const closestToTop = () => {
        let k = 1;
        let y = 0;
        for (let i = 1; i <= sections.length; i++) {
            let rect = sections[i - 1].getBoundingClientRect();
            let x = Math.abs(rect.top);
            if (i === 1) {
                y = x;
            } else if (x < y) {
                k = i;
                y = x;
            }
        }
        const id = `section${k}`;
        for (let i = 0; i < sections.length; i++) {
            if (window.scrollY >= 350 && sections[i].getAttribute('id') === id) {
                sections[i].classList.add('active-section');
            } else {
                sections[i].classList.remove('active-section');
            }
        }
        //highlight the navigator of the section in view
        for (let i = 0; i < navLinks.length; i++) {
            const href = navLinks[i].getAttribute('href');
            if (window.scrollY >= 350 && href.slice(1) === id) {
                navLinks[i].classList.add('active-link');
            } else {
                navLinks[i].classList.remove('active-link');
            }
        }
    }
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav--link');
    document.addEventListener('scroll', closestToTop);
}
{//highlighting sections when clicked and making them collapsable
    const sections = document.querySelectorAll(".section");
    const sectionsContainer = document.querySelector(".sections");
    sectionsContainer.addEventListener('click', (event) => {
        let targetedElementParent = event.target.parentElement;
        let targetedElement = event.target;
        //if the collapse button is clicked, the paragraph should be hidden and button text should be appropriate 
        if (targetedElement.tagName === 'SPAN') {
            let paragraph = targetedElementParent.querySelector('p');
            paragraph.classList.toggle('hidden-para');
            if (paragraph.classList.contains('hidden-para')) {
                targetedElement.innerHTML = '&or;';
            } else {
                targetedElement.innerHTML = '&and;';
            }
        //if the user clicked inside the section or on it the section should be highlighted
        } else if (!targetedElement.classList.contains('section') && targetedElement !== sectionsContainer) {
            for (let section of sections) {
                section.classList.remove('active-section');
            }
            targetedElement.parentElement.classList.add('active-section');
        } else if (targetedElement.classList.contains('section')) {
            for (let section of sections) {
                section.classList.remove('active-section');
            }
            targetedElement.classList.add('active-section');
        }
    });
    {//showing home button when user scrolls down
        const homebtn = document.querySelector(".home-link");
        addEventListener("scroll", () => {
            if (window.scrollY >= 550) {
                homebtn.classList.remove('home-link-hidden');
            } else {
                homebtn.classList.add('home-link-hidden');
            }
        });
    }
}
{//moving the home button down when the nav bar is diplayed
    const navBar = document.querySelector(".nav");
    const homebtn = document.querySelector('.home-link');
    const moveHomebtn = () => {
        if (!navBar.classList.contains('nav--hidden') && !homebtn.classList.contains('home-link-hidden')) {
            homebtn.classList.add('home-link-down');
        } else {
            homebtn.classList.remove('home-link-down');
        }
    }
    //the nav bar could move when the user clicks or scrolls
    document.addEventListener('scroll', moveHomebtn);
    document.addEventListener('click', moveHomebtn);
}
{//toggle nav menu when the button is clicked
    const toggleMenu = () => {
        navMenu.classList.toggle('nav-menu-shown');
        navBtn.classList.toggle('nav-button-active');
    }
    const navBtn = document.querySelector('.nav-button');
    const navMenu = document.querySelector('.nav-menu');
    navBtn.addEventListener('click', toggleMenu);
    document.addEventListener('click', (event) => {
        if (event.target !== navBtn && navMenu.classList.contains('nav-menu-shown')) {
            toggleMenu();
        }
    });
}