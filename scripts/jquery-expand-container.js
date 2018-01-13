$(document).ready(function () {

    // ---------------------------- //
    // ----- Expand Container ----- //

    $('.expand-button').click(function () {
        $(this).parent().siblings('.expand-body').toggle('fast');
        /* 
        // expand-closed class changes display to none
        $(this).parent().siblings('.expand-body').toggleClass('expand-closed');
        */
        $('span', this).toggleClass('fa-minus-circle');
        $('span', this).toggleClass('fa-plus-circle');

        // if container is expanded, move document so top of container lies at top of window
    });

});