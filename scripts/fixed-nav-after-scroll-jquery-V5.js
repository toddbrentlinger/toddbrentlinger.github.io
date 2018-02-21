$(document).ready(function () {

    // Constant Variable: Minimum window width to fix elements
    const minWindowWidth = 500; // px

    // Variables:
    // $topNav - jQuery reference to topnav element
    // topNavOffset - distance from top of document to topNav, equivalent to header height
    //      Note: topNavOffset equivalent to header element height for responsive design. If the
    //      header is resized, the topnav will always sit under it.
    // topNavHeight - height of topnav element including margin
    // $window - jQuery reference to window; used to run scrollTop() and width() methods
    // $row - jQuery reference to row element; used to add margin to compensate for fixed position of topnav removing it from document flow
    // topNavFixed - bool representing if topNav is fixed or not; initialized to true so setUpNav() function will convert topNav to absolute when document loads
    var $topNav = $("#topnav"),
        topNavOffset,
        topNavHeight,
        $window = $(window),
        $row = $("body > .row"),
        topNavFixed = true;

    // Function: Set up elements from static to absolute
    function setUpNav() {
        // If window width is larger than minimum window width
        if ($window.width() > minWindowWidth) {
            // Set variables for topNavOffset and topNavHeight used to size and position certain elements
            topNavOffset = $("header").outerHeight();
            topNavHeight = $topNav.outerHeight(true);
            // Set topNavFixed bool depending on current scroll position relative to topNavOffset
            topNavFixed = !($window.scrollTop() >= topNavOffset);
            // Run changeNav() function to add fixed or absolute class
            changeNav();
            // Increase margin-top of row by topNavHeight
            $row.css("margin-top", topNavHeight);
        } else { // Else window width is smaller or equal to minimum window width
            // Remove fixed-absolute classes
            $topNav.removeClass("topnav-fixed").removeClass("topnav-absolute");
            // Reset top positioning to 0
            $topNav.css("top", "0");
            // Reset margin on row
            $row.css("margin-top", "0");
        }
    }

    // Call setUpNav() when document is ready
    setUpNav();

    // Function: Change nav
    function changeNav() {
        // If current scroll position is larger or equal to topNavOffset
        if ($window.scrollTop() >= topNavOffset) {
            // If topNav is NOT already fixed
            if (!topNavFixed) {
                // Remove absolute position class from and add fixed class to topNav
                $topNav.removeClass("topnav-absolute").addClass("topnav-fixed");
                // Set top positioning to 0
                $topNav.css("top", "0");
                // Set topNavFixed to true
                topNavFixed = true;
            }
        } else { // Else current scroll position is below topNavOffset
            // If topNav is fixed
            if (topNavFixed) {
                // Remove fixed class from and add absolute position class to topNav
                $topNav.removeClass("topnav-fixed").addClass("topnav-absolute");
                // Set top of absolute positioned element depending on topNavOffset
                $topNav.css("top", topNavOffset);
                // Set topNavFixed to false
                topNavFixed = false;
            }
        }
    }

    // Window Scroll Event Handler
    $window.scroll(changeNav);

    // Window resize Event Handler
    $window.resize(setUpNav);

});