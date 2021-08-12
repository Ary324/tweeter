/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

   
$(document).ready(function() {
 
  loadTweets();
  $('#target').on('submit', onSubmit);
});

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

  const createTweetElement = function(data) {
    const $output = $(` 
    <article class="tweet"> 
    <div class="tweet-avatar">
          <div class="left-side">
          <img src="${data.user.avatars}" width="50px" height="50px">
          <p>${data.user.name}</p> 
          </div>
          <div class="handle"><h5>${data.user.handle}</h5></div>
        </div>
        <div>
          <p class="tweet-body">${escape(data.content.text)}</p>
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

  const loadTweets = function() {
    $.ajax('/tweets/', {
      method: 'GET',
      success: function(response) {
        console.log('response', response);
        renderTweets(response);
      }
    });
  };

  const onSubmit = function(event) {
    event.preventDefault();
  //Form Validation
    const counter = $('#counter'); //counter
     const tweetLength = 140 - parseInt(counter.val());
     console.log(tweetLength);
     if (tweetLength > 140) {
       alert('Tweet limit surpassed');
       return;
     }
     const tweetChars = $('#tweet-text').val();
     console.log('tweetChars:', tweetChars);
     if (tweetChars === '' || tweetChars === null) {
       alert('Tweet cannot be empty');
       return;
     } 
    
     const data = $(this).serialize();
     $.post('/tweets', data)
       .then(data => {
         loadTweets();
       });
       $("#tweet-text").val("");
   }; 
