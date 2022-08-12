// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// hide error modal
const errorModal = document.getElementById('modal');
errorModal.classList.add('hidden');

window.addEventListener('DOMContentLoaded', (event) => {
  // add event listener to heart icons
  const likeGlyphColl = document.getElementsByClassName('like-glyph');
  for (const likeGlyph of likeGlyphColl) {        // for each icon ...
    likeGlyph.addEventListener('click', function(event) {
      const heart = event.target;                 // get clicked-on icon
      mimicServerCall()
      .then(() => {
        if (heart.textContent === EMPTY_HEART) {  // if empty, fill & activate
          heart.textContent = FULL_HEART;
          heart.classList.add('activated-heart');
        } else {                                  // if full, empty & de-activate
          heart.textContent = EMPTY_HEART;
          heart.classList.remove('activated-heart');
        }
      })
      .catch((error) => {                       // if server error...
        const errorMessage = errorModal.querySelector('#modal-message');
        errorMessage.textContent = error;           // set error message
        errorModal.classList.remove('hidden');      // display error modal
        setTimeout(function() {                     // for 3 seconds, then reset
          errorModal.classList.add('hidden');
          errorMessage.textContent = '';
        }, 3000);
      });
    });
  }

console.log(document.querySelector('.hidden'));

});




//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
