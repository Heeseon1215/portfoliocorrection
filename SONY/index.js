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



// gsap

gsap.registerPlugin(ScrollTrigger);