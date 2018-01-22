$(document).ready(function () {

    // --------------------------------------------- //
    // ----- YouTube Playlists Media Container ----- //

    // Playlist links array
    /* Two-dimensional array. In each sub-array, the first element refers to the value attribute 
    of an option element in the select container element. The second element is
    the corresponding link for the source attribute of the media player. The third element
    is the title for the heading of the container above the media player. */
    var youtubePlaylistOptions = [

    // Game Informer

    ["gi-replay-s1" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sKt5QHOkLbG6WrICCKsRgNl" , "Game Informer - Replay (Season 1)"],
    ["gi-replay-s2" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sKlhqQ9mjOtxRsizQdEWDo5" , "Game Informer - Replay (Season 2)"],
    ["gi-replay-s3" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sKqQnk0Gh8bDHF66sb4bieC" , "Game Informer - Replay (Season 3)"],
    ["gi-replay-s4" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sK--m9Ym2_fBKptdKWzlLdo" , "Game Informer - Replay (Season 4)"],
    ["gi-super-replay-showdown" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sKOIX3ibMMspVhMqknMI0Y8" , "Game Informer - Super Replay Showdown"],
    ["gi-favorite" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sKMp605SaSXRi9sQ1HMaAbZ" , "Game Informer - Favorite"],

    // Hat Films/Yogscast

    ["yogscast-misc" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sJ0UBiyZ7LWpax03LQPzHMJ" , "HatFilms/Yogscast - Misc"],
    ["yogscast-gta" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sKdwEU3FxzL22MXTYW9mcmC" , "HatFilms/Yogscast - GTA V"],
    ["yogscast-gmod" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sInP-_vS9htd99uLOZkuE1x" , "HatFilms/Yogscast - GMod"],
    ["yogscast-minecraft" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sKRAyyEFaqJUTUvH7V-cKPk" , "HatFilms/Yogscast - Minecraft"],

    // Comedy

    ["conan-remotes" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sJrFvdH7R9ypxz2JPmLxt79" , "Conan O'Brien Remotes"],
    ["conan" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sIdC0YYeiciA3pNVCMNUA2R" , "Conan O'Brien"],
    ["comedy-misc" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sJsEZO9pjrBgi-BXIP9hIbd" , "Comedy - Misc"],
    ["whose-line" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sLZnJlA3g61AAB-yC0L89a_" , "Whose Line Is It Anyway"],

    // Screen Junkies

    ["movie-fights" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sK5nB5oWJV3mw5PO6fK3fzl" , "Screen Junkies - Movie Fights - Favorite"],
    ["screen-junkies-misc" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sLtJaJYD2c6zyu_QdAAfXpC" , "Screen Junkies - Misc"],

    // Film

    ["filmmaking" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sJLprgEBA1gpS54ocgHEj_C" , "Filmmaking"],
    ["film-making-of" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sLdM7_LgNc8koKT4hvoSA_9" , "Film - Making Of"],
    ["film-special-effects" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sIaoapovlIubgh7JCtbKjW4" , "Film - Special Effects"],
    ["film-visual-effects" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sIKTJmNxAax_VyVm25YVsZQ" , "Film - Visual Effects"],
    ["short-films" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sJnJR07xxoDQhUKmRSmL-xk" , "Short Films/Trailers"],

    // Cooking

    ["cooking-misc" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sKjFjZ-11BgarH6ipBHpJyx" , "Cooking - Misc"],
    ["cooking-breakfast" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sKjBWfx0VDoBLyi6nTyTIF-" , "Cooking - Breakfast"],
    ["cooking-dessert" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sI9VrEyhxM4h23owVwfR1GU" , "Cooking - Dessert"],
    ["cooking-dessert-brownie" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sJJhpz36OWaB5R2mnS311iI" , "Cooking - Dessert - Brownie"],
    ["cooking-dessert-cake" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sJlsSXmHUNGiWEhZw6p-DBp" , "Cooking - Dessert - Cake"],
    ["cooking-dessert-cookie" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sKX5sSQJvzNsPbAvgzyFT2t" , "Cooking - Dessert - Cookie"],
    ["cooking-dessert-cupcake" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sLpSWZOCAw1EpDx1FFwL4Ss" , "Cooking - Dessert - Cupcake"],
    ["cooking-dessert-ice-cream" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sJKs4hI6LYEm8J_fttIpdHr" , "Cooking - Dessert - Ice Cream"],
    ["cooking-dessert-technique" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sLx8yNLHE28zwH3XW6wxAWN" , "Cooking - Dessert - Technique"],
    ["cooking-grill" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sK1H6KgIQ26z19wYaQDAVeb" , "Cooking - Grill"],
    ["cooking-meat" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sLxvFWCW1MiV3ZpmcQ28kFA" , "Cooking - Meat"],
    ["cooking-meat-burger" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sIsxYYqLpDdqzg_jYTQ2oi0" , "Cooking - Meat - Burger"],
    ["cooking-meat-poultry" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sJsr_MEAosbk3XulOVP6Ru1" , "Cooking - Meat - Poultry"],
    ["cooking-meat-steak" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sKyNXFkhj0Ukw8g3JrtyFw1" , "Cooking - Meat - Steak"],
    ["cooking-technique" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sLjmEgrKcynWCy0Kd_LiDMU" , "Cooking - Technique"],
    ["cooking-tv" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sKpVNUN41gU_yKQl0damNFg" , "Cooking - TV Show"],

    // Video Games

    ["vg-misc" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sKYlUSuvJOeFlgB7XAMNZF9" , "Video Game - Misc"],
    ["vg-design" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sKw-N8oh5lBl6JDqJN-uvO8" , "Video Game Design"],
    ["last-of-us" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sLXvnbUxrvjjVirZr-SIxtF" , "The Last of Us"],
    ["uncharted-4" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sI7pmyaTLEbw-HpHOYD9uwb" , "Uncharted 4: A Thief's End"],

    // Hobbies

    ["magic-illusions" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sKE38MfSmqe8mKvVYKg4-un" , "Magic/Illusions"],
    ["magic-tutorials" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sKhZvvBnYKvdr9Smyn52S-_" , "Magic Tutorials"],
    ["motorcycle" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sI8vGMI_Kls_vHSvXJUhe-i" , "Motorcycle"],
    ["archery" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sI__h9M1g6YspwDnXvDwrhd" , "Archery"],
    ["wood-new-yankee" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sKuoARp2fOBnkO0DgO5KAgo" , "Woodworking - New Yankee Workshop"],
    ["this-old-house" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sIEgujHRMjYn61eYD3zhWl7" , "This Old House"],
    ["diy-hobbies" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sIGotWOAkupBViGjUvAW9is" , "DIY/Hobbies"],
    ["sailing" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sKnz5TzdVCzEUV9IMrflZya" , "Sailing"],
    ["programming" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sIdnad55okwQpcePNMaWRT5" , "Programming"],
    ["martial-arts" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sJixcrkjKFnsS_zniQt8pf0" , "Martial Arts"],
    
    // Educational

    ["dinosaurs" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sL9rZDz7NaFRBR-5npnvCeQ" , "Dinosaurs"],
    ["space" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sJyZVOJXmjdmtrrTFnn9teU" , "Space"],
    ["religion" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sLjrb2Ft2A64MP0er8mX9BG" , "Religion"],
    ["documentary" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sKe-BfZ4Ole5fe2FIlgyAnf" , "Documentary"],
    ["science" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sJ6uXLjAdAy3SuPRnhCcclz" , "Science"],
    ["politics" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sJUrCOWfGSA21ZCnEP12KUS" , "Politics"],
    ["social-anxiety" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sKXGtHqqZ2i5o88prE8ke29" , "Social Anxiety/Depression"],
    ["educational-misc" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sJf2J2XEmPYbUIpTITAFCL-" , "Educational - Misc"],

    // Misc

    ["misc" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sIJQTFXdYlTbx-Wf8CeKphD" , "Misc"],
    ["james-bond" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sKnrGsvJZf4V4JAV_dTtzzF" , "James Bond 007"],
    ["batman" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sJvxNsXkgUtoqtLfFIKCxt9" , "Batman"],
    ["jurassic-park" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sKAOURqx1xSYhwJ2Wvq-bvA" , "Jurassic Park"],
    ["indiana-jones" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sI8akUurbMgAj-p9tu3L-ZW" , "Indiana Jones"],
    ["power-rangers" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sKAUp-ryXQpf2HebwhSBC5a" , "Power Rangers"],
    ["music" , "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sJZeu_L12RWbpct2GUiqZn6" , "Music"],
    ["cartoon-episodes", "https://www.youtube.com/embed/videoseries?list=PLZNR-vaGz1sKTiWPNBZhsIql-4QgymERH", "Cartoon Episodes"]

    ];

    // references to necessary elements
    var $baseMediaContainer = $('#base-media-container'),
        $mediaContainerSource = $('iframe', $baseMediaContainer),
        $mediaContainerHeader = $('h3', $baseMediaContainer);

    // Function: change youtube playlist
    function ChangeYoutubePlaylist() {
        // if value is top blank option("make a choice" prompt), reset media container
        if (this.value === '') {
            $baseMediaContainer.hide('fast');
            $mediaContainerHeader.text('');
            $mediaContainerSource.attr('src', '');
        } else {
            // find sub-array of youtubePlaylistOptions where this.value equals 
            // the first element in the sub-array
            var targetSubArray;
            for (var i = 0; i < youtubePlaylistOptions.length; i++) {
                if (this.value === youtubePlaylistOptions[i][0]) {
                    targetSubArray = youtubePlaylistOptions[i];
                    break; // break loop after finding first correct instance
                }
            };
            if (targetSubArray) { // if targetSubArray exists (not undefined)
                // animate base media container to expand/open
                $baseMediaContainer.show('fast');
                // change header text
                $mediaContainerHeader.text(targetSubArray[2]);
                // change iframe src attribute
                $mediaContainerSource.attr('src', targetSubArray[1]);
            }
        }
    }

    // when youtube playlist select element is changed
    $('#playlist').change(ChangeYoutubePlaylist);

});