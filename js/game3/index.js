const wH = 500;
const wW = 1000;
let mystar=document.getElementById('mystar');
const generateStars = n => {
  for (let i = 0; i < n; i++) {
    const div = document.createElement('div');
    div.className = i % 100 == 0 ? 'star star--big' : i % 9 == 0 ? 'star star--medium' : 'star';
    // random everywhere!
    div.setAttribute('style', `top:${Math.round(Math.random() * wH)}px;left:${Math.round(Math.random() * wW)}px;animation-duration:${Math.round(Math.random() * 3000) + 3000}ms;animation-delay:${Math.round(Math.random() * 3000)}ms;`);
    mystar.appendChild(div);

  }
};
generateStars(100);

//动画
$(function(){
  $('.myrule_img').addClass('animated rotateIn ');
  setTimeout(function(){
      $('.myrule_img').removeClass('rotateIn');
  }, 1000);
//   $('.coloured_img').addClass('animated shake infinite');
//   setTimeout(function(){
//       $('.coloured_img').removeClass('flash');
//   }, 1000);

});

