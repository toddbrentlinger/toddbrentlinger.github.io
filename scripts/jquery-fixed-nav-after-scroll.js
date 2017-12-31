$(document).ready(function () {

    // ---------------------------- //
    // ----- Expand Container ----- //

    $('.expand-button').click(function () {
        $(this).parent().siblings('.expand-body').toggle('fast');
        /*
        $(this).parent().siblings('.expand-body').toggleClass('expand-closed');
        */
        $('span', this).toggleClass('fa-minus-circle');
        $('span', this).toggleClass('fa-plus-circle');

        // if container is expanded, move document so top of container lies at top of window
    });

    // --------------------------------------------- //
    // ----- YouTube Playlists Media Container ----- //

    // references to necessary elements
    var $baseMediaContainer = $('#base-media-container'),
        $mediaContainerSource = $('iframe', $baseMediaContainer),
        $mediaContainerHeader = $('h3', $baseMediaContainer);

    // when youtube playlist select element is changed
    $('#playlist').change(function () {

        // if value is top blank option("make a choice" prompt)
        if (this.value === '') {
            $baseMediaContainer.hide('fast');
            $mediaContainerHeader.text('');
            $mediaContainerSource.attr('src', '');
        } else {
            var $target = $('#' + this.value);
            // if target is not empty jquery object
            if (!$.isEmptyObject($target)) {
                $baseMediaContainer.show('fast');
                $mediaContainerHeader.text($target.text());
                $mediaContainerSource.attr('src', $target.prop('href'));
            }
        }
    });

    // ---------------------------------------------------- //
    // ---------- Fixed top menu after scrolling ---------- //

    var mobileWindowWidth = 500; // px

    // window width is bigger than size for mobile devices
    if ($(window).width() > mobileWindowWidth) {
        /*
        Variables - TopNav:
        topNavDistance - topnav distance from top of document when initially static position
            Note: topNavdistance equivalent to header element height for responsive design. If the
            header is resized, the topnav will always sit under it.
        topNavHeight - height of topnav element
        $topNav - jQuery reference of topnav element
        */
        var topNavDistance = $('header').outerHeight(),
            topNavHeight = $('#topnav').outerHeight(),
            $topNav = $('#topnav');

        // function to change topnav element
        function ChangeTopNav() {
            // if current scroll position is below the topnav position
            if ($(window).scrollTop() > topNavDistance) {
                // add fixed class to topNav
                $topNav.addClass('fixed');
                // remove absolute position class from topnav
                $topNav.removeClass('topnav-absolute');
                // reset top positioning to 0
                $topNav.css('top', '0');
            } else {
                // remove fixed class from topNav
                $topNav.removeClass('fixed');
                // add absolute position class to topnav
                $topNav.addClass('topnav-absolute');
                // set top of absolute positioned element depending on topNavDistance
                $topNav.css('top', topNavDistance);
            }
        }

        /*
        Variables - SideNav:
        sideNavDistance - 
        sideNavWidth - used to add left margin to main element column
        $sideNav - jQuery reference to sidenav element
        */
        var sideNavDistance = topNavDistance + topNavHeight,
            sideNavWidth = $('#sidenav').outerWidth(),
            $sideNav = $('#sidenav');

        // window scroll event
        $(window).scroll(ChangeTopNav);

        // run ChangeTopNav() initially to make topnav absolute position
        ChangeTopNav();

        // add margin-bottom to header to compensate for topnav being removed from document flow
        $('header').css('margin-bottom', topNavHeight);

        // when window is resized, get new topnav height, distance, and set new header margin-bottom
        $(window).resize(function () {
            topNavDistance = $('header').outerHeight();
            topNavHeight = $('#topnav').outerHeight();
            $('header').css('margin-bottom', topNavHeight);
        });
    }
});