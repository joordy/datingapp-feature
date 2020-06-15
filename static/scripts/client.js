// Animation of tapping for left and right
let likeButtons = document.getElementsByClassName('like');
let lastLikeButton = likeButtons[likeButtons.length - 1];
let dislikeButtons = document.getElementsByClassName('dislike');
let lastDislikeButton = dislikeButtons[dislikeButtons.length - 1];
let form = document.querySelector('#likeOrDislike');
let userOnStack = document.getElementsByClassName('card');
let lastUserElement = userOnStack[userOnStack.length - 1];

form.addEventListener('submit', function (e) {
  e.preventDefault();
  swipeLeft();
  swipeRight();
});

lastLikeButton.addEventListener('click', function swipeLeft() {
  console.log('right');
  lastUserElement.classList.add('SwipeAnimationRight');
});

lastDislikeButton.addEventListener('click', function swipeRight() {
  console.log('left');
  lastUserElement.classList.add('SwipeAnimationLeft');
});

lastUserElement.addEventListener('transitionend', function () {
  window.location.href = '/match';
});

// function startAnimate(e) {
//   e.preventDefaut();
//   console.log('fireanimation');
// }

// buttonAnimation.addEventListener('click', startAnimate);

// const stopSendingForm = (e) => {
//   e.preventDefault();

//   lastUserElement.style.display = 'none'; // hides last user, need this for animation
// };
// form.addEventListener('submit', stopSendingForm);

// const sendToPage = () => {
//   window.location.href - '/';
// };

// lastUserElement.addEventListener('', sendToPage);

/////////
// function fireAnimation(e) {
//   e.preventDefault();
//   buttonAnimation.innerHTML = 'succeeded';
// }

// function stopFormSubmit(e) {
//   e.preventDefault();
// }

// buttonAnimation.addEventListener('click', buttonAnimation());
// form.addEventListener('click', stopFormSubmit;

// form.addEventListener('submit' e => {
//   e.preventDefault();

// })

//////////////////////////////

// console.log('hello');

// let form = document.querySelector('#likeOrDislike');
// var allLikeButtons = document.querySelector('.like').childNodes.length;
// console.log(allLikeButtons);
// let likeButton = document.querySelector('#like').childNodes[allLikeButtons - 1];

// // console.log(output);

// // console.log(form);
// console.log(likeButton);

// function stopFormSubmit(e) {
//   console.log('loading..');

//   e.preventDefault();
// }

// likeButton.addEventListener('click', stopFormSubmit());

////////////////////////////

// document.querySelector('#likeOrDislike').addEventListener('submit', (e) => {
//   e.preventDefault();

//   document.querySelector('card').style.display = 'none';
// });

// console.log('hello');

// function logSubmit(event) {
//   console.log('joe je hebt geliked');
//   // event.preventDefault();
// }

// const tekstje = document.querySelector('#like');
// tekstje.addEventListener('submit', logSubmit);

// // const form = document.getElementById('form');
// // const log = document.getElementById('log');
// // form.addEventListener('submit', logSubmit);
// // // let testje = document.querySelector('#like');

// // document.querySelector('#like').addEventListener('submit', ditIsMijnFunctie);

// // function ditIsMijnFunctie() {
// //   console.log('joe je hebt geliked');
// // }
