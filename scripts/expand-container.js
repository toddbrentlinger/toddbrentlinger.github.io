
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