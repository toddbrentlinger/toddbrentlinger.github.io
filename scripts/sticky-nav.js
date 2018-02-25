window.onload = function () {
    // Constant Variable: Minimum window width to stick elements
    const minWindowWidth = 500; // px

    // Variables:
    // topNav - reference to topnav nav element
    // sideNav - reference to sidenav nav element
    // leftAside - reference to left column aside element
    // topOffset - distance sideNav and leftAside stick from the top
    // windowWidth - width of window
    var topNav = document.getElementById("topnav"),
        sideNav = document.getElementById("sidenav"),
        leftAside = document.querySelector("body > .row > aside"),
        topOffset,
        windowWidth;

    // Function: Set up elements from static to absolute
    function setUpNav() {
        // Set windowWidth
        windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        // If window width is larger than minimum window width
        if (windowWidth > minWindowWidth) {
            // Variables: main and header element size and its position relative to the viewport; used to set topOffset
            var mainRect = document.querySelector("body > .row > main").getBoundingClientRect(),
                headerRect = document.querySelector("body > header").getBoundingClientRect();
            // Set variable for topOffset used to position sticky sideNav and leftAside
            topOffset = mainRect.top - headerRect.bottom;
            // Add sticky class to topNav, sideNav, and leftAside
            topNav.classList.add("topnav-sticky");
            sideNav.classList.add("side-sticky");
            leftAside.classList.add("side-sticky");
            // Add top position value to sideNav and leftAside
            sideNav.style.top = topOffset + "px";
            leftAside.style.top = topOffset + "px";
        } else { // Else window width is smaller or equal to minimum window width
            // Remove sticky classes
            topNav.classList.remove("topnav-sticky");
            sideNav.classList.remove("side-sticky");
            leftAside.classList.remove("side-sticky");
            // Reset top position value of sideNav and leftAside
            sideNav.style.top = "0";
            leftAside.style.top = "0";
        }
    }

    // Call setUpNav() when document is ready
    setUpNav();

    // Window Resize Event Listener: Call setUpNav() function
    window.addEventListener("resize", setUpNav);
};