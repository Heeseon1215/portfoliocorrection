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



// vue 애니메이션
const vueAni = gsap.timeline({
  scrollTrigger: {
    trigger: '.main-word',
    start: '50% 50%',
    end: '700% 700%',
    scrub: 1,
  },
});

const move = ['.vue .vue-wrapper', '.vue .vue-inner'];

gsap.utils.toArray(move).forEach((elem, idx) => {
  vueAni.to(
    elem,
    {
      y: () => {
        const mainSony = document.querySelector('.main-sony');
        const mainSonyRect = mainSony.getBoundingClientRect();
        const elemRect = elem.getBoundingClientRect();
        return mainSonyRect.top + mainSonyRect.height / 2 - elemRect.top - elemRect.height / 2;
      },
      rotate: 360,
      ease: "expoScale(0.5,7,none)",
      scale: 0.3,
      duration: 0.5,
      backgroundColor: '#fff',
    },
    0
  );
});



// 옆으로 스크롤 되는것처럼 

const move2 =  ['.vue, .main-sony .sony-img' ]

const metersTitles = gsap.utils.toArray(move2);

metersTitles.forEach(title => {
  gsap.to(title, {
    x: (idx, target) => -target.offsetWidth * 0.6,
    scrollTrigger: {
      trigger: 'main-sony ',
      start: '0 100%',
      end: '100% 0',
      scrub: 1
    }
  });
});


// 화면에 딱 맞게 멈추기
gsap.timeline({
  scrollTrigger: {
    trigger: '.main-sony',
    start: 'top top', 
    end: '+=100%', 
    scrub: true, 
    pin: true,
    pinSpacing: true, // 고정된 상태에서도 아래 섹션이 밀려서 나타나도록 함
    zIndex : -1
  },
})
.to('.main-word', {
  opacity: 1, 
  duration: 1,
});