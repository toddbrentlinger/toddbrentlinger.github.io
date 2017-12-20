let expandButtons = document.querySelectorAll('.expand-button');
for (let i = 0; i < expandButtons.length; i++) {
    expandButtons[i].onclick = function () {
        let expandIcon = this.querySelector('span'),
            expandBody = this.parentElement.parentElement.querySelector('.expand-body');
        if (expandBody.classList.contains('expand-closed')) {
            expandBody.classList.remove('expand-closed');
            expandIcon.classList.remove('fa-plus-circle');
            expandIcon.classList.add('fa-minus-circle');
        } else {
            expandBody.classList.add('expand-closed');
            expandIcon.classList.remove('fa-minus-circle');
            expandIcon.classList.add('fa-plus-circle');
        }
    };
}

// Old Code
/*
var expandButton = document.querySelector('.expand-button'),
            expandBody = document.querySelector('.expand-body'),
            expandIcon = document.querySelector('.expand-button span');

expandButton.addEventListener('click', function () {
    if (expandBody.classList.contains('expand-closed')) {
        expandBody.classList.remove('expand-closed');
        expandIcon.classList.remove('fa-plus-circle');
        expandIcon.classList.add('fa-minus-circle');
    } else {
        expandBody.classList.add('expand-closed');
        expandIcon.classList.remove('fa-minus-circle');
        expandIcon.classList.add('fa-plus-circle');
    }
});
*/