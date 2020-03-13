// const main = document.getElementsByTagName('main')[0];
// const user = main.getElementsByTagName('li');
// const like = document.querySelector('.like');
// const dislike = document.querySelector('.dislike');

// let i = 0;

// // function opinion() {
// //     if (i < (user.length)) {

// //     }
// // }

// function ratePerson() {
//     if (i < (user.length)) { // show next person
//         this.closest('li').style.display = 'none';
//         i++;
//     }
// }

// for (let i = 0; i < like.length; i++) {
//     like[i].addEventListener('click', ratePerson);
//     dislike[i].addEventListener('click', ratePerson);
// }

var form = document.querySelector('form');

form.addEventListener('click', test, false);

function test() {
    console.log(form);
}

test();