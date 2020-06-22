const // Page variables, to allow code to run on exact same page class.
  matchPage = Array.from(document.getElementsByClassName('match')),
  swipePage = Array.from(document.getElementsByClassName('home'));

if (swipePage.length !== 0) {
  // Animation of tapping for left and right:
  let // Variables for buttons, form and last user
    likeButtons = document.getElementsByClassName('like'),
    lastLike = likeButtons[likeButtons.length - 1],
    dislikeButtons = document.getElementsByClassName('dislike'),
    lastDislike = dislikeButtons[dislikeButtons.length - 1],
    form = document.querySelector('#likeOrDislike'),
    userOnStack = document.getElementsByClassName('card'),
    lastUserElement = userOnStack[userOnStack.length - 1];

  form.addEventListener('submit', (e) => {
    swipeLeft();
    swipeRight();
    e.preventDefault();

    lastUserElement.addEventListener('transitionend', () => {
      setTimeout(() => {
        window.location.href = '/match';
      }, 3000);
    });
  });

  lastLike.addEventListener(
    'click',
    (swipeLeft = () => {
      console.log('right');
      lastUserElement.classList.add('SwipeAnimationRight');
    })
  );

  lastDislike.addEventListener(
    'click',
    (swipeRight = () => {
      console.log('left');
      lastUserElement.classList.add('SwipeAnimationLeft');
    })
  );

  // lastUserElement.addEventListener('transitionend', function () {});
  // Used sources:
  // Ward, J. (2018, June 14). How to correctly use preventDefault(), stopPropagation(), or return false; on events. Retrieved June 16, 2020,
  // from https://medium.com/@jacobwarduk/how-to-correctly-use-preventdefault-stoppropagation-or-return-false-on-events-6c4e3f31aedb

  // Increase counter of liked
  lastLike.addEventListener('click', clickCounter());

  function clickCounter() {
    let count = localStorage.getItem('clicked');

    if (count === null) {
      count = 0;
    }
    count++;
    localStorage.setItem('clicked', count);
    document.getElementById('counter').innerHTML = 'you have liked ' + localStorage.clicked + ' users';
  }
}

// Redirect to home after spending 5 seconds on match doing nothing
if (matchPage.length !== 0) {
  if (window.location.pathname === '/match') {
    setTimeout(() => {
      window.location.href = '/';
    }, 5000);
  }
}
