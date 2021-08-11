$(document).ready(function() {
  $('#tweet-text').on("input", function() {
    let $counter = $('.counter');
    let countValue = this.value.length;
    $counter.html(140 - countValue);
    if (countValue > 140) {
      $counter.css( "color", "red" );
    } else {
      $counter.css( "color", "#545149" );
    }
    console.log(countValue);
  })
})