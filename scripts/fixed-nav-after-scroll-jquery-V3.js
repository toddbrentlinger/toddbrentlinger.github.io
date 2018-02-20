$(document).ready(function () {
    // ---------------------------------------------------------- //
    // ---------- Fixed top navigation after scrolling ---------- //
    // ---------------------------------------------------------- //

    // Variable: Minimum window width to fix topnav; px
    const minWindowWidth = 500;

    // Variables:
    // Note: topNavOffset equivalent to header element height for responsive design. If the
    // header is resized, the topnav will always sit under it.
    var $topNav = $("#topnav"), // jQuery reference of topnav element
        topNavOffset = $("header").outerHeight(), // topnav distance from top of document, equivalent to header height
        topNavHeight = $topNav.outerHeight(true), // height of topnav element including margin
        topNavPosition = "static"; // string representing current css position value for topnav

    // Function: Change topnav element
    function changeTopNav() {
        // If current scroll position is below topnav offset
        if ($(window).scrollTop() > topNavOffset) {
            // If topnav does NOT have .topnav-fixed class, fix topnav to top of screen
            if (topNavPosition !== "fixed") {
                // Remove absolute position class from and add fixed class to topnav
                $topNav.removeClass("topnav-absolute").addClass("topnav-fixed");
                // Reset top positioning to 0
                $topNav.css("top", "0");
                // Change topNavPosition string to fixed
                topNavPosition = "fixed";
            }
        }
        // Else current scroll position is equal or less than topnav offset
        else {
            // If topnav does NOT have .topnav-absolute class
            if (topNavPosition !== "absolute") {
                // Remove fixed class from and add absolute position class to topnav
                $topNav.removeClass("topnav-fixed").addClass("topnav-absolute");
                // Set top of absolute positioned element depending on topNavOffset
                $topNav.css("top", topNavOffset);
                // Change topNavPosition string to absolute
                topNavPosition = "absolute";
            }
        }
    }

    // Function: setUpTopNav
    function setUpTopNav() {
        // If window width is larger than minimum window width
        if ($(window).width() > minWindowWidth) {
            // Set new topnav offset, height, and position string to empty string
            topNavOffset = $("header").outerHeight();
            topNavHeight = $topNav.outerHeight(true);
            topNavPosition = "";
            // Run changeTopNav() function to reset css
            changeTopNav();
            // Add margin-bottom to header to compensate for topnav being removed from document flow after it's position changes to absolute
            $("header").css("margin-bottom", topNavHeight);
        }
    }

    // // Run setUpTopNav() function on-load to change topnav from static to absolute position
    setUpTopNav();

    // Window scroll event handler: Invoke changeTopNav() function whenever window scrolls
    $(window).scroll(changeTopNav);

    // Window resize event handler: When window is resized, set new variable values
    $(window).resize(setUpTopNav);

    // ---------------------------------------------------------- //
    // ---------- Fixed side navigation after scrolling --------- //
    // ---------------------------------------------------------- //

    // Pseudocode

    // Variables:
    // $sideNav
    // sideNavOffset
    // sideNavWidth - add to main element margin to compensate for absolute positioned sideNav being removed from document flow

    // Function: changeSideNav
    // If current scroll position is less than topNavOffset
    //   If sideNavPosition is NOT fixed
    //     Add fixed: position
    //     Add top: sideNavOffset
    //     Add z-index: 1
    // Else current scroll position is equal or more than topNavOffset
    //   If sideNavPosition is NOT absolute
    //     Add absolute position
    //     Add top: topNavOffset + sideNavOffset
    //     Add z-index: 0

    // Function: onLoad
    // If sideNav display is NOT none
    //   Run changeSideNav function
    //   Add margin to main
    // Else sideNav display is none
    //   Reset margin on main to 0

    // Run onLoad() function

    // Scroll Event
    //   Run changeSideNav() function

    // Resize Event
    //   Run onLoad() function

    // Variables:
    var $sideNav = $("#sidenav"), // jQuery reference of sidenav element

        // distance between top of sidenav and top of topnav; 
        // uses main element since sidenav display can be none resulting in a top offset of 0
        sideNavOffset = $("main").offset().top - topNavOffset,

        sideNavWidth = "15%", // width of sidenav left column element; refer to style.css
        sideNavPosition = "static"; // string representing current css position value for sidenav

    // Function: Change sidenav element to absolute positioned element
    function changeSideNav() {
        // If current scroll position is below topnav offset
        if ($(window).scrollTop() > topNavOffset) {
            // If sidenav does NOT have fixed position, fix sidenav to top of screen
            if (sideNavPosition !== "fixed") {
                // Set position of sidenav to fixed
                $sideNav.css("position", "fixed");
                // Set top positioning height so it rests underneath topnav
                $sideNav.css("top", sideNavOffset);
                // Set z-index to 1 on sidenav
                $sideNav.css("z-index", "1");
                // Change sideNavPosition string to fixed
                sideNavPosition = "fixed";
            }
        }
            // Else current scroll position is equal or less than topnav offset
        else {
            // If sidenav does NOT have absolute position
            if (sideNavPosition !== "absolute") {
                // Set position of sidenav to absolute
                $sideNav.css("position", "absolute");
                // Set top positioning to height of topnav so it rests underneath it
                $sideNav.css("top", topNavOffset + sideNavOffset);
                // Set z-index to 1 on sidenav
                $sideNav.css("z-index", "0");
                // Change sideNavPosition string to absolute
                sideNavPosition = "absolute";
            }
        }
    }

    // Function: setUpSideNav
    function setUpSideNav() {
        // If window width is larger than minimum window width
        if ($(window).width() > minWindowWidth) {
            // If sidenav display is NOT none
            if ($sideNav.css("display") !== "none") {
                // Set position string to empty string
                sideNavPosition = "";
                // Run changeSideNav() function to reset css
                changeSideNav();
                // Add margin-left to main to compensate for sidenav being removed from document flow after it's position changes to absolute
                $("main").css("margin-left", sideNavWidth);
            } 
            else { // Else sidenav display is none
                // Remove margin-left from main
                $("main").css("margin-left", "0");
                // Change position back to static
            }
        }
    }

    // Run setUpSideNav() function on-load to change sidenav from static to absolute position
    setUpSideNav();

    // Window scroll event handler: Invoke changeSideNav() function whenever window scrolls
    $(window).scroll(changeSideNav);

    // Window resize event handler: When window is resized, set new variable values
    $(window).resize(setUpSideNav);

    // ---------------------------------------------------------- //
    // ---------- Fixed right column after scrolling --------- //
    // ---------------------------------------------------------- //

    // Variables:
    var $rightCol = $("body > .row > aside"), // jQuery reference of right column aside element

        // distance between top of rightCol and top of topnav; 
        // uses main element since rightCol position can be different from media queries
        rightColOffset = $("main").offset().top - topNavOffset,

        rightColPosition = "static"; // string representing current css position value for rightCol

    // Function: Change rightCol element to absolute positioned element
    function changeRightCol() {
        // If current scroll position is below topnav offset
        if ($(window).scrollTop() > topNavOffset) {
            // If rightCol does NOT have fixed position, fix rightCol to top of screen
            if (rightColPosition !== "fixed") {
                // Set position of rightCol to fixed
                $rightCol.css("position", "fixed");
                // Set top positioning height so it rests underneath topnav
                $rightCol.css("top", rightColOffset);
                // Set right positioning height to 0
                $rightCol.css("right", "0");
                // Set z-index to 1 on rightCol
                $rightCol.css("z-index", "1");
                // Change rightColPosition string to fixed
                rightColPosition = "fixed";
            }
        }
        // Else current scroll position is equal or less than topnav offset
        else {
            // If rightCol does NOT have absolute position
            if (rightColPosition !== "absolute") {
                // Set position of rightCol to absolute
                $rightCol.css("position", "absolute");
                // Set top positioning to height of topnav so it rests underneath it
                $rightCol.css("top", topNavOffset + rightColOffset);
                // Set right positioning height to 0
                $rightCol.css("right", "0");
                // Set z-index to 1 on sidenav
                $rightCol.css("z-index", "0");
                // Change rightColPosition string to absolute
                rightColPosition = "absolute";
            }
        }
    }

    // Function: setUpRightCol
    function setUpRightCol() {
        // If window width is larger than minimum window width
        if ($(window).width() > minWindowWidth) {
            // If rightCol display is NOT none
            if ($rightCol.css("display") !== "none") {
                // Set position string to empty string
                rightColPosition = "";
                // Run changeRightCol() function to reset css
                changeRightCol();
                // Add margin-right to main to compensate for rightCol being removed from document flow after it's position changes to absolute
                $("main").css("margin-right", sideNavWidth);
            }
            else { // Else rightCol display is none
                // Remove margin-right from main
                $("main").css("margin-right", "0");
            }
        }
    }

    // Run setUpRightCol() function on-load to change rightCol from static to absolute position
    setUpRightCol();

    // Window scroll event handler: Invoke changeSideNav() function whenever window scrolls
    $(window).scroll(changeRightCol);

    // Window resize event handler: When window is resized, set new variable values
    $(window).resize(setUpRightCol);
});