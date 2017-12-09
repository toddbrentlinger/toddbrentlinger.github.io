
var baseMediaContainer = document.getElementById('base-media-container'),
    mediaContainerSource = baseMediaContainer.querySelector('iframe'),
    mediaContainerHeader = baseMediaContainer.querySelector('h3');

document
    .getElementById('playlist')
    .addEventListener('change', function () {
        var vis = document.getElementById('youtube-playlists').querySelector('.vis'), // current visible section, if any
            target = document.getElementById(this.value); // target anchor link to be added to iframe src
        // do I need this check
        if (vis != null) {
            vis.className = 'inv';
        }
        if (target != null) {
            if (this.value === '') {
                baseMediaContainer.className = 'inv';
                mediaContainerHeader.textContent = '';
                mediaContainerSource.src = '';
            } else {
                baseMediaContainer.className = 'vis';
                mediaContainerHeader.textContent = target.textContent;
                mediaContainerSource.src = target.href;
            }
        }
    });

/*
var baseMediaContainer = document.getElementById('base-media-container');
var mediaContainerSource = baseMediaContainer.querySelector('iframe');
var mediaContainerHeader = baseMediaContainer.querySelector('h3');

document
    .getElementById('playlist')
    .addEventListener('change', function () {
        var vis = document.getElementById('youtube-playlists').querySelector('.vis'), // current visible section,if any
            target = document.getElementById(this.value);
        if (vis != null) {
            vis.className = 'inv';
        }
        if (target != null) {
            if (this.value === '') {
                baseMediaContainer.className = 'inv';
                mediaContainerHeader.textContent = '';
                mediaContainerSource.src = '';
            } else {
                baseMediaContainer.className = 'vis';
                mediaContainerHeader.textContent = target.querySelector('a').textContent;
                mediaContainerSource.src = target.querySelector('a').href;
            }
        }
    });
*/