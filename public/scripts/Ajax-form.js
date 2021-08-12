$(document).ready(() => {
  const target = $('#target');
  target.on('submit', function(event) => {
    event.preventDefault();
    const url = $(this).attr('action');
     $.ajax({
       method: 'POST',
       url: url,
       data: $(this).serialize(),
       success: function(data) {
         console.log(data);
       },
     });
  });
});