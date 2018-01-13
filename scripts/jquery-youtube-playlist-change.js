$(document).ready(function () {

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

});