// a href="#" 속성 없애기
$('a[href="#"]').on('click', function(e) {
  e.preventDefault();
});



// header
let lastScrollTop = 0;
const header = document.querySelector('.gnb'); 

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    header.classList.add('hidden');
  } 
  else {
    header.classList.remove('hidden');
  }

  lastScrollTop = scrollTop;
});




gsap.registerPlugin(ScrollTrigger);

// main-word
function animateText(selector) {
  document.querySelectorAll(selector).forEach(word => {
    word.innerHTML = word.textContent
      .split('')
      .map(char => `<span class="char">${char}</span>`)
      .join('');
  });

  gsap.utils.toArray(selector).forEach(txt => {
    const chars = txt.querySelectorAll('.char'); 
    gsap.timeline({
      scrollTrigger: {
        trigger: txt,
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1,
      },
    })
    .fromTo(
      chars, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: -50, duration: 1, ease: "power1.inOut", stagger: 0.1 }
    )
    .to(chars, {
      y: 0,
      duration: 1,
      ease: "power1.out",
      stagger: 0.1,
    });
  });
}

animateText('.rolled');


// Vue 애니메이션
const vueAni = gsap.timeline({
  scrollTrigger: {
    trigger: '.wordsony-wrapper', 
    start: '20% 40%',
    end: '70% 50%', 
    scrub: 1, 
  },
});

const moveElements = ['.vue .vue-wrapper', '.vue .vue-inner'];

gsap.utils.toArray(moveElements).forEach((elem, idx) => {
  vueAni.to(
    elem,
    {
      y: () => {
        const mainSony = document.querySelector('.main-sony');
        const mainSonyRect = mainSony.getBoundingClientRect();
        const elemRect = elem.getBoundingClientRect();
        return mainSonyRect.top + mainSonyRect.height / 2 - elemRect.top - elemRect.height / 2;
      },
      rotate: -360,
      scale: 0.1,
      ease: "expoScale(0.5,7,none)",
      duration: 0.5,
      backgroundColor: '#fff',
    },
    0
  );
});

// Main-Sony 
const mainSonyAni = gsap.timeline({
  scrollTrigger: {
    trigger: '.main-sony',
    start: 'top top',
    end: '+=100%',
    scrub: true,
    pin: true,
    pinSpacing: true,
  },
});

// Vue 고정 및 가로로 이동
const vueScrollAni = gsap.timeline({
  scrollTrigger: {
    trigger: '.main-sony',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    pin: '.vue',
    pinSpacing: false, 
  },
});

vueScrollAni
  .to('.vue', {
    x: 100,
    duration: 20,
    scrub: true,
  })
  .to('.vue .vue-wrapper', {
    scale: '15',
    duration: 5,
    ease: 'linear',
    scrub: true,
  });

// Sony-Img 반대 방향 이동
const sonyImgAni = gsap.timeline({
  scrollTrigger: {
    trigger: '.main-sony',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  },
});

sonyImgAni.to('.sony-img', {
  x: -150, 
});


vueAni.eventCallback('onComplete', () => {
  mainSonyAni.play();
});


// main-create
gsap.fromTo(
  ".title-up span",
  { y: "-200%" }, 
  {
    y: "0%",
    duration: 0.5, 
    stagger: 0.1, 
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".create", 
      start: "top top", 
      end: "50% bottom",
      toggleActions: "play none none none", 
    },
  }
);

// 영상 
const maxWidth = "80%"; 
const minWidth = "5%"; 
const secNumbers = [1, 2, 3, 4, 5]; 

// 숫자
function activateSection(index) {
  const $sections = $(".mov .mov-wrapper .sub-mov");
  const $activeSection = $sections.eq(index - 1);

  $(".mov .mov-num .sec-num").html(
    [index, ...secNumbers.filter((num) => num !== index)]
      .map((num) => `${num}<br>`)
      .join("")
  );

  $sections
    .removeClass("toggle-btn")
    .css("width", minWidth);
  $activeSection
    .addClass("toggle-btn")
    .css("width", maxWidth);
}

activateSection(3);

$(".mov .mov-wrapper .sub-mov").on("click", function () {
  activateSection($(this).index() + 1);
});


// main-mov
gsap.fromTo(
  ".mov",  
  {
    width: "0%",  
  },
  {
    width: "100%",  
    duration: 1, 
    stagger: 0.1,  
    scrollTrigger: {
      trigger: ".mov", 
      start: "top 20%",
      end: "bottom 50%",
      toggleActions: "play none none none", 
    },
  }
);