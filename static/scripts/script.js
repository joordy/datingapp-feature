// HTML Elements from index.ejs
const main = document.getElementsByTagName('main')[0];
const persons = main.getElementsByTagName('li');
const likeButton = document.querySelectorAll('.like');
const ignoreButton = document.querySelectorAll('.dislike');

let i = 0;

// when you press the (dis)like button
function choosePerson() {
    if (i < (people.length)) { // show next person
        this.closest('li').style.display = 'none';
        i++;
    }
}

// eventlisteners
for (let i = 0; i < likeButton.length; i++) {
    likeButton[i].addEventListener('click', choosePerson);
    ignoreButton[i].addEventListener('click', choosePerson);
}