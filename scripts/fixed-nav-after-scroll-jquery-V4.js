$(document).ready(function () {
    // ---------------------------------------------------------- //
    // ---------- Fixed top navigation after scrolling ---------- //
    // ---------------------------------------------------------- //

    // Constant variable: Minimum window width to fix elements
    const minWindowWidth = 500; // px

    // Variables:
    // $topNav - jQuery reference to topnav element
    // topNavOffset - distance from top of document to topNav, equivalent to header height
    //      Note: topNavOffset equivalent to header element height for responsive design. If the
    //      header is resized, the topnav will always sit under it.
    // topNavHeight - height of topnav element including margin
    // $window - jQuery reference to window; used to run scrollTop() and width() methods
    // $row - jQuery reference to row element; used to add margin to compensate for fixed position of topnav removing it from document flow
    var $topNav = $("#topnav"),
        topNavOffset = $("header").outerHeight(),
        topNavHeight = $topNav.outerHeight(true),
        $window = $(window),
        $row = $("body > .row");

    // Function: changeTopNav
    function changeTopNav() {
        // If window width is larger than minimum window width
        if ($window.width() > minWindowWidth) {
            // If current scroll position is larger or equal to topNavOffset
            if ($window.scrollTop() >= topNavOffset) {
                // Add fixed class to topNav
                $topNav.addClass("topnav-fixed");
                // Increase margin-top of row by topNavHeight
                $row.css("margin-top", topNavHeight);
            } else { // Else current scroll position is below topnav offset
                // Remove fixed class from topNav
                $topNav.removeClass("topnav-fixed");
                // Decrease margin-top of row by topNavHeight
                $row.css("margin-top", "0");
            }
        }
    }

    // ---------------------------------------------------------- //
    // ---------- Fixed side navigation after scrolling --------- //
    // ---------------------------------------------------------- //

    // Variables:
    // $sideNav - jQuery reference of sidenav element
    // sideNavOffset - distance between top of sidenav and top of topnav; 
    // uses main element since sidenav display can be none resulting in a top offset of 0
    // sideNavWidth - width of sidenav left column element; refer to style.css
    // $main - jQuery reference to main element; used to add margin to compensate for fixed position of sidenav removing it from document flow

    var $sideNav = $("#sidenav"),
        sideNavOffset = $("main").offset().top - topNavOffset,
        sideNavWidth = "15%",
        $main = $("main");

    // Function: Change sidenav element to absolute positioned element
    function changeSideNav() {
        // If window width is larger than minimum window width
        if ($window.width() > minWindowWidth) {
            // If current scroll position is larger or equal to topNavOffset
            if ($window.scrollTop() >= topNavOffset) {
                // Add fixed class to sideNav
                $sideNav.addClass("sidenav-fixed");
                // Set top positioning height so it rests underneath topnav
                $sideNav.css("top", sideNavOffset);
                // Set margin-left of main to sideNavWidth
                $main.css("margin-left", sideNavWidth);
            } else { // Else current scroll position is below topNavOffset
                // Remove fixed class from sideNav
                $sideNav.removeClass("sidenav-fixed");
                // Set margin-left of main to 0
                $main.css("margin-left", "0");
            }
        }
    }

    // ---------------------------------------------------------- //
    // ---------- Fixed right column after scrolling --------- //
    // ---------------------------------------------------------- //

    // Variables:
    // $rightCol - jQuery reference of right column aside element 
    var $rightCol = $("body > .row > aside");

    // Function: Change rightCol element to absolute positioned element
    function changeRightCol() {
        // If window width is larger than minimum window width
        if ($window.width() > minWindowWidth) {
            // If current scroll position is larger or equal to topNavOffset
            if ($window.scrollTop() >= topNavOffset) {
                // Add fixed class to rightCol
                $rightCol.addClass("right-col-fixed");
                // Set top positioning height so it rests underneath topnav
                $rightCol.css("top", sideNavOffset);
                // Set margin-right of main to sideNavWidth
                $main.css("margin-right", sideNavWidth);
            } else { // Else current scroll position is below topNavOffset
                // Remove fixed class from rightCol
                $rightCol.removeClass("right-col-fixed");
                // Set margin-right of main to 0
                $main.css("margin-right", "0");
            }
        }
    }

    // Window scroll event handler: 
    // Run changeTopNav(), changeSideNav(), & changeRightCol() function whenever window scrolls
    $window.scroll(function () {
        changeTopNav();
        changeSideNav();
        changeRightCol();
    });
        
});