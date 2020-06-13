const carousel = document.querySelector('.js-reviews');
const row = carousel.querySelector('.js-reviews__row');
const prev = carousel.querySelector('.js-reviews__nav-prev');
const next = carousel.querySelector('.js-reviews__nav-next');
const items = carousel.querySelectorAll('.js-reviews__item');

const optimizedResize = (function () {
  const callbacks = [];
  let running = false;

  function runCallbacks() {
    callbacks.forEach((callback) => {
      callback();
    });

    running = false;
  }

  function resize() {
    if (!running) {
      running = true;

      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(runCallbacks);
      } else {
        setTimeout(runCallbacks, 66);
      }
    }
  }

  function addCallback(callback) {
    if (callback) {
      callbacks.push(callback);
    }
  }

  return {
    add(callback) {
      // eslint-disable-next-line unicorn/explicit-length-check
      if (!callbacks.length) {
        window.addEventListener('resize', resize);
      }
      addCallback(callback);
    },
  };
}());

let itemVisible = document.body.clientWidth > 767 ? 2 : 1;
let rowWidth = row.offsetWidth;
let itemWidth = rowWidth / itemVisible;
let itemActive = 0;

const itemResize = (width) => {
  for (const item of items) {
    item.style.width = `${width}px`;
  }
};
itemResize(itemWidth);

optimizedResize.add(() => {
  if (document.body.clientWidth > 767) {
    itemVisible = 2;
  } else {
    itemVisible = 1;
  }

  rowWidth = row.offsetWidth;
  itemWidth = rowWidth / itemVisible;
  itemResize(itemWidth);
  row.style.transform = (`translateX(-${itemWidth * itemActive - itemWidth * itemVisible + itemWidth}px)`);
});

prev.addEventListener('click', () => {
  if (itemActive > 0) {
    itemActive -= 1;
    row.style.transform = (`translateX(-${itemWidth * itemActive}px)`);
  }
});

next.addEventListener('click', () => {
  if (itemActive < items.length - itemVisible) {
    itemActive += 1;
    row.style.transform = (`translateX(-${itemWidth * itemActive}px)`);
  }
});
