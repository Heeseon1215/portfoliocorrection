AOS.init();


// a href="#" 속성 없애기
$('a[href="#"]').on('click', function(e){
  e.preventDefault()
});


// 모바일 토글 버튼
$('header').on('click', function() {
  // header 메뉴 아이콘 클릭 시 toggle-btn이 적용/미적용
  $(this).toggleClass('toggle-btn');
  
  // 각자의 메뉴를 클릭하면, 버튼은 원래대로, 메뉴는 닫히게
$('.global-menu li').each(function(idx, list) {
    $(list).on('click', function() {
      $('header .menu-icon').removeClass('toggle-btn');
      $('header .menu').removeClass('toggle-menu');
    });
  }); 
});



//스크롤이 내려가면 헤더가 사라지고, 스크롤이 올라가면 헤더가 내려옴

    // 이전 스크롤. 브라우저를 열면 바로 읽기 때문에 0
    let prevScroll = window.scrollY;

  
    $(window).on('scroll', function () {
      if ($('header').hasClass('toggle-btn')) {
        // toggle-btn이 활성화된 상태에서는 스크롤 동작을 막음
        return;
  
      }
      
      let currentScroll = window.scrollY;

      if (prevScroll > currentScroll) { 
        //스크롤을 올리면(스크롤의 이동거리가 0에 가까워진다) 헤더가 보이고
        $('header').css({transform : 'translateY(0)'});
      } else {   
        // 스크롤을 내리면 헤더를 숨김 
        $('header').css({transform : 'translateY(-100px)'});
      }
      
      // prev에 현재 스크롤 값 재할당
      prevScroll = currentScroll
    })




// 스와이퍼
const mainswiper = new Swiper('.main-slide', {
  slidesPerView: 2,
  loop: true,
  scrollbar : {
    el: '.swiper-scrollbar',
    hide: false
  },
  spaceBetween: 10,
  breakpoints: {
    768: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
  },
  autoplay: {
    delay: 1000, disableOnInteraction: false, }
});

const subswiper = new Swiper('.sub-slide', {
  slidesPerView: 1,
  loop: true,

  scrollbar : {
    el: '.swiper-scrollbar',
    hide: false
  },
  spaceBetween: 30,
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1080: {
      slidesPerView: 4,
      spaceBetween: 10,
    }
  },
  autoplay: {
    delay: 2500, disableOnInteraction: false, }
});



