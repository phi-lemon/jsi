const TRANSLATE_LEFT = '-820px'
const TRANSLATE_RIGHT = '820px'

const r_arrow = document.getElementById('r_arrow');
const l_arrow = document.getElementById('l_arrow');

r_arrow.addEventListener('click', function (event) {
  anim('left')
  event.preventDefault();
  r_arrow.classList.toggle('fade');
  l_arrow.classList.toggle('fade');
});

l_arrow.addEventListener('click', function (event) {
  anim('right')
  event.preventDefault();
  l_arrow.classList.toggle('fade');
  r_arrow.classList.toggle('fade');
});

function anim(direction) {
  carousel = document.getElementById("section")
  params = {
    duration: 1000,
    iterations: 1,
    easing: 'ease',
    fill: 'forwards'
  }
  if (direction == 'left') {
    carousel.animate([
      { transform: 'translateX(0px)' },
      { transform: 'translateX(' + TRANSLATE_LEFT + ')' }
    ], params);
  }
  else if (direction == 'right') {
    carousel.animate([
      { transform: 'translateX(' + TRANSLATE_LEFT + ')' },
      { transform: 'translateX(0px)' }
    ], params);
  }
}