const navButton = document.querySelector('.nav-button');
const navOpen = document.querySelector('.nav-open');

//Анимация  const tween = Tweenlite.to(object, time, {animate})

//const tween = TweenLite.to('.cover', 1, {
//  width: "40%"});

const tl = new TimelineLite({paused : true, reversed: true });  //Не позволяет автоматически анимировать, но в таком случае
                                                // работает только после второго клика => добавляем reversed:true

tl.to('.cover', 1, {
  width: "60%",
  ease: Power2.easeOut  //GreenSock
}).to(
  "nav",
   1,
    {
      height: "100%",
      ease: Power2.easeOut
    },
     "-= 0.5"
  )
  //Анимация от чего-то, к чему-то ( fromTo),
  .fromTo('.nav-open', 0.5, {
    opacity: 0,
    x: 50,
    ease: Power2.easeOut
  },{
    opacity: 1,
    x: 0,
    onComplete: function(){
      navOpen.style.pointerEvents = "auto"; //Делает все кликабельным и выбираемым    
      console.log('done');
    }
  }
);

navButton.addEventListener('click', (e) =>{ // e = event
  //  Не позволяет отменить анимацию, если она уже началась
  if(tl.isActive()){
    e.preventDefault();
    e.stopImmediatePropagation();
    return false;
  }

  toggleTween(tl);
});


//Возвращаем все в первоначальное положение

function toggleTween(tween) {
  tween.reversed() ? tween.play() : tween.reverse();
}