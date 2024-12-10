// a href="#" 속성 없애기
$('a[href="#"]').on('click', function(e){
  e.preventDefault()
});


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





// main-word

document.querySelectorAll('.rolled').forEach(word => {
  word.innerHTML = word.textContent
    .split('')
    .map(char => `<span class="char">${char}</span>`)
    .join('');
});

// GSAP 애니메이션
gsap.utils.toArray('.rolled').forEach(txt => {
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
      { opacity: 0, y: 50}, 
      {
        opacity: 1,
        y: -50,

        duration: 1,
        ease: "power1.inOut",
        stagger: 0.1, 
      }
    )
    .to(
      chars,
      {
        y: 0,
        duration: 1,
        ease: "power1.out",
        stagger: 0.1, 
      }
    );
});



// vue 애니메이션 설정
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
      ease: "expoScale(0.5,7,none)",
      scale: 0.1,
      duration: 0.5,
      backgroundColor: '#fff',
    },
    0
  );
});

// main-sony 요소 고정 및 스크롤 애니메이션
gsap.timeline({
  scrollTrigger: {
    trigger: '.main-sony',
    start: 'top top',
    end: '+=100%',
    scrub: true,
    pin: true,
    pinSpacing: true,
  },
});

// vue를 고정시키고 가로로만 이동
gsap.timeline({
  scrollTrigger: {
    trigger: '.main-sony',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    pin: '.vue',
    pinSpacing: false,
  },
})
.to('.vue', {
  x: 100, 
  duration: 20, 
  scrub: true,
})
.to('.vue .vue-wrapper', {
  scale: '13', 
  duration: 5, 
  ease: 'linear', 
  scrub: true,
});


// sony-img를 반대방향으로 이동
gsap.timeline({
  scrollTrigger: {
    trigger: '.main-sony',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  },
})
.to('.sony-img', {
  x: -150, // sony-img는 왼쪽으로 이동
});




// 이미지가 옆으로 스크롤
/* const images = gsap.utils.toArray('.sony-img');

images.forEach(title => {
  gsap.to(title, {
    x: (idx, target) => -target.offsetWidth * 0.2,
    scrollTrigger: {
      trigger: '.main-sony',
      start: '0 100%',
      end: '100% 0',
      scrub: 1,
    },
  });
}); */

