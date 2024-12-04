// a href="#" 속성 없애기
$('a[href="#"]').on('click', function(e){
  e.preventDefault()
});
