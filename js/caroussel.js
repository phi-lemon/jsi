const TRANSLATE_LEFT = '-820px'
const TRANSLATE_RIGHT = '820px'

function listen_click(block) {
  switch (block) {
    case 'section_top':
      var btn_right = document.getElementById('r_arrow_top');
      var btn_left = document.getElementById('l_arrow_top');
      break;
    case 'section_1':
      var btn_right = document.getElementById('r_arrow_1');
      var btn_left = document.getElementById('l_arrow_1');
      break;
    case 'section_2':
      var btn_right = document.getElementById('r_arrow_2');
      var btn_left = document.getElementById('l_arrow_2');
      break;
    case 'section_3':
      var btn_right = document.getElementById('r_arrow_3');
      var btn_left = document.getElementById('l_arrow_3');
      break;
  }
  btn_right.addEventListener('click', function (event) {
    anim(block, 'left')
    event.preventDefault();
    btn_right.classList.toggle('fade');
    btn_left.classList.toggle('fade');
  });
  btn_left.addEventListener('click', function (event) {
    anim(block, 'right')
    event.preventDefault();
    btn_left.classList.toggle('fade');
    btn_right.classList.toggle('fade');
  });
}

function anim(block, direction) {
  carousel = document.getElementById(block)
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


listen_click('section_top')
listen_click('section_1')
listen_click('section_2')
listen_click('section_3')