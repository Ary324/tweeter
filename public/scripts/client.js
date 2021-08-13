/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

   
// Security
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Default Tweet Format
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
    $('#error-message').hide();
    const counter = $('#counter'); //counter
     const tweetLength = 140 - parseInt(counter.val());
     console.log(tweetLength);
     if (tweetLength > 140) {
       $('#error-message').find('.error-text').text('Tweet limit surpassed');
       $('#error-message').slideDown('slow');
       return $("#tweet-text").val("");
     }
     const tweetChars = $('#tweet-text').val();
     console.log('tweetChars:', tweetChars);
     if (tweetChars === '' || tweetChars === null) {
       $('#error-message').find('.error-text').text('Tweet cannot be empty');
       $('#error-message').slideDown('slow');
       return $("#tweet-text").val("");
     } 
    
     //Jquery Ajax Post for Data
     const data = $(this).serialize();
     $.post('/tweets', data)
       .then(data => {
         $("#tweet-text").val("");
         loadTweets();
       });
  };


  //Function for hiding Compose tweet element
  const hideTweet = function() {
    if ($('#tweet-text').is(':visible')) {
      $('.new-tweet').slideUp('slow');
    } else {
      $('.new-tweet').slideDown('slow');
      $('#tweet-trigger').focus();
    }
  };

  //Dom Function
   $(document).ready(function() {
    $('#target').on('submit', onSubmit);
    $('#error-message').hide();
    $('.new-tweet').hide();
    loadTweets();
    $('#tweet-button').on('click', hideTweet);
   });
