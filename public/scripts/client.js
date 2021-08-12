/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

   
$(document).ready(function() {

  const target = $('#target');
  target.on('submit', function(event) {
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

  const loadTweets = function() {
    $.ajax('/tweets/', {
      method: 'GET',
      success: function(response) {
        console.log('response', response);
        renderTweets(response);
      }
    });
  };

  loadTweets();
});

  const createTweetElement = function(data) {
    const $output = $(` 
    <article class="tweet"> 
    <div class="${data.user.avatar}">
          <div class="left-side">
          <img src="/images/profile-hex.png" width="50px" height="50px">
          <p>${data.user.name}</p> 
          </div>
          <div class="handle"><h5>${data.user.handle}</h5></div>
        </div>
        <div>
          <p class="tweet-body">${data.content.text}</p>
        </div>
        <hr>

        <footer>
          <div class="posted"><h5>${timeago.format(data["created_at"])}</h5></div> 
          <div class="buttons">
            <i class="fas fa-flag"></i> 
            <i class="fas fa-retweet"></i> 
            <i class="fas fa-heart"></i>
          </div>
        </footer>
    </article>
    `);
    return $output;
  };
  
  const renderTweets = function(tweets) {
        
    $('#allTweets').html(''); // Clears default text
    for (let key in tweets) { // loops through tweets
      let $tweet = createTweetElement(tweets[key]); // calls createTweetElement for each tweet
      $('#allTweets').prepend($tweet); // takes return value and prepends (ensures order) it to the tweets container
    }
  };