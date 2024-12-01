// a href="#" 속성 없애기
$('a[href="#"').on('click', function(e){
  e.preventDefault()
});



$('.gnb-btn').on('click', function () {
  // header 메뉴 아이콘 클릭 시 toggle-btn이 적용/미적용
  $('header').toggleClass('toggle-btn');

  if ($('header').hasClass('toggle-btn')) {
      // 메뉴가 열릴 때 스크롤 비활성화 및 페이지를 맨 위로 이동
      $('body').css({ overflow: 'hidden' }); // 스크롤 비활성화
      window.scrollTo({ top: 0, behavior: 'smooth' }); // 부드럽게 맨 위로 이동
  } else {
      // 메뉴가 닫힐 때 스크롤 활성화
      $('body').css({ overflow: '' }); // 스크롤 복원
  }

  // 각 메뉴 클릭 시 버튼 초기화, 메뉴 닫힘
  $('.gnb li').on('click', function () {
      $('header').removeClass('toggle-btn');
      $('body').css({ overflow: '' }); // 스크롤 복원
  });
});

// 이전 스크롤 위치 초기화
let prevScroll = window.scrollY;

$(window).on('scroll', function () {
  if ($('header').hasClass('toggle-btn')) {
      // toggle-btn 활성화 상태에서는 스크롤 동작을 막음
      return;
  }

  let currentScroll = window.scrollY;

  if (prevScroll > currentScroll) {
      // 스크롤 올릴 때 헤더 보이기
      $('header').css({ transform: 'translateY(0)' });
  } else {
      // 스크롤 내릴 때 헤더 숨기기
      $('header').css({ transform: 'translateY(-100px)' });
  }

  // 현재 스크롤 위치를 이전 스크롤 값으로 업데이트
  prevScroll = currentScroll;
});

/* 흐르는 애니메이션 */
/* 
const name = document.querySelector('.footer-name .text');
const nameWt = name.offsetWidth;

// 첫번째 줄 애니메이션. 왼쪽 -> 오른쪽
gsap.fromTo(name, 
  { x: 0 },
  {
    x: -nameWt / 2,// 텍스트 길이의 절반만큼 이동
    duration: 30,
    repeat: -1,
    ease: 'linear'
  }
); */