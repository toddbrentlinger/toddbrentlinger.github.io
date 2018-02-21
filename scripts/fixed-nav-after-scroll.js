window.onload = function () {
    // Constant Variable: Minimum window width to fix elements
    const minWindowWidth = 500; // px

    // Variables:
    // topNav - reference to topnav element
    // topNavOffset - distance from top of document to topNav, equivalent to header height
    //      Note: topNavOffset equivalent to header element height for responsive design. If the
    //      header is resized, the topnav will always sit under it.
    // topNavHeight - height of topnav element including margin
    // row - reference to row element; used to add margin to compensate for fixed position of topnav removing it from document flow
    // topNavFixed - bool representing if topNav is fixed or not; initialized to true so setUpNav() function will convert topNav to absolute when document loads
    var topNav = document.getElementById("topnav"),
        topNavOffset,
        topNavHeight,
        row = document.querySelector("body > .row"),
        topNavFixed = true;

    // Function: Set up elements from static to absolute
    function setUpNav() {
        // If window width is larger than minimum window width
        if (window.innerWidth > minWindowWidth) {
            // Set variables for topNavOffset and topNavHeight used to size and position certain elements
            topNavOffset = document.querySelector("header").getBoundingClientRect().height;
            topNavHeight = topNav.getBoundingClientRect().height;
            // Set topNavFixed bool depending on current scroll position relative to topNavOffset
            topNavFixed = !(window.scrollY >= topNavOffset);
            // Run changeNav() function to add fixed or absolute class
            changeNav();
            // Increase margin-top of row by topNavHeight
            row.style.marginTop = topNavHeight + "px";
        } else { // Else window width is smaller or equal to minimum window width
            // Remove fixed/absolute classes
            topNav.classList.remove("topnav-fixed");
            topNav.classList.remove("topnav-absolute");
            // Reset top positioning to 0
            topNav.style.top = "0";
            // Reset margin on row
            row.style.marginTop = "0";
        }
    }

    // Call setUpNav() when document is ready
    setUpNav();

    // Function: Change nav
    function changeNav() {
        // If current scroll position is larger or equal to topNavOffset
        if (window.scrollY >= topNavOffset) {
            // If topNav is NOT already fixed
            if (!topNavFixed) {
                // Remove absolute position class from and add fixed class to topNav
                topNav.classList.remove("topnav-absolute");
                topNav.classList.add("topnav-fixed");
                // Set top positioning to 0
                topNav.style.top = "0";
                // Set topNavFixed to true
                topNavFixed = true;
            }
        } else { // Else current scroll position is below topNavOffset
            // If topNav is fixed
            if (topNavFixed) {
                // Remove fixed class from and add absolute position class to topNav
                topNav.classList.remove("topnav-fixed");
                topNav.classList.add("topnav-absolute");
                // Set top of absolute positioned element depending on topNavOffset
                topNav.style.top = topNavOffset + "px";
                // Set topNavFixed to false
                topNavFixed = false;
            }
        }
    }

    // Window Scroll Event Listener
    window.addEventListener("scroll", changeNav);

    // Window resize Event Listener
    window.addEventListener("resize", setUpNav);
};