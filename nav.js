document.body.insertAdjacentHTML('beforeend',
  '<div class="progress"><div></div></div><nav><div class="js-next">&gt;</div><div class="js-prev">&lt;</div><div class="js-first">&lt;&lt;</div><div class="js-last">&gt;&gt;</div></nav>'
);

var slideCurrent = 0;
var slides = Array.prototype.slice.call(document.querySelectorAll('section'));
var slidesCount = slides.length - 1;
var progressBar = document.querySelector('.progress > div');
var nextKeyCodes = {
  9: 'tab',
  13: 'enter',
  32: 'space',
  34: 'pagedown',
  39: 'rightarrow',
  40: 'downarrow'
};
var prevKeyCodes = {
  8: 'backspace',
  33: 'pagedown',
  37: 'leftarrow',
  38: 'uparrow'
};
var firstKeyCodes = {
  36: 'home'
};
var lastKeyCodes = {
  35: 'end',
};

function setSlide(index) {
  slideCurrent = index;
  slides[slideCurrent].scrollIntoView();
  progressBar.style.height = (slideCurrent + 1) / (slidesCount + 1) * 100 + '%';
  if (history.pushState) {
    history.pushState(null, null, '#' + slideCurrent);
  } else {
    window.location.hash = '#' + slideCurrent;
  }
}

function nextSlide() {
  if (slideCurrent < slidesCount) {
    setSlide(slideCurrent + 1);
  }
}

function prevSlide() {
  if (slideCurrent > 0) {
    setSlide(slideCurrent - 1);
  }
}

function firstSlide() {
  setSlide(0);
}

function lastSlide() {
  setSlide(slidesCount);
}

function on(selector, callback) {
  document
    .querySelector(selector)
    .addEventListener('click', callback);
}

on('.js-prev', prevSlide);
on('.js-next', nextSlide);
on('.js-first', firstSlide);
on('.js-last', lastSlide);

document.addEventListener('keydown', function(ev) {
  var handled = false;
  var key = ev.which;
  if (nextKeyCodes[key]) {
    handled = true;
    nextSlide();
  } else if (prevKeyCodes[key]) {
    handled = true;
    prevSlide();
  } else if (firstKeyCodes[key]) {
    handled = true;
    firstSlide();
  } else if (lastKeyCodes[key]) {
    handled = true;
    lastSlide();
  }
  if (handled) {
    ev.preventDefault();
  }
}, false);

document.addEventListener('wheel', function(ev) {
  if (ev.deltaY > 0) {
    nextSlide();
  } else {
    prevSlide();
  }
});

var slideToSet = 0;
var hash = window.location.hash;
if (hash.length > 1) {
  hash = parseInt(hash.substr(1), 10);
  if (!isNaN(hash)) {
    slideToSet = hash;
  }
}

setSlide(slideToSet);
