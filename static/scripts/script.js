// // HTML Elements from index.ejs
// const main = document.getElementsByTagName('main')[0];
// const persons = main.getElementsByTagName('li');
// const likeButton = document.querySelectorAll('.like');
// const ignoreButton = document.querySelectorAll('.dislike');

// let i = 0;

// // when you press the (dis)like button
// function choosePerson() {
//     if (i < (people.length)) { // show next person
//         this.closest('li').style.display = 'none';
//         i++;
//     }
// }

// // eventlisteners
// for (let i = 0; i < likeButton.length; i++) {
//     likeButton[i].addEventListener('click', choosePerson);
//     ignoreButton[i].addEventListener('click', choosePerson);
// }

const main = document.getElementsByTagName('main')[0];
const user = main.getElementsByTagName('li');
const like = document.querySelector('.like');
const dislike = document.querySelector('.dislike');

let i = 0;

// function opinion() {
//     if (i < (user.length)) {

//     }
// }

function ratePerson() {
    if (i < (user.length)) { // show next person
        this.closest('li').style.display = 'none';
        i++;
    }
}

for (let i = 0; i < like.length; i++) {
    like[i].addEventListener('click', ratePerson);
    dislike[i].addEventListener('click', ratePerson);
}