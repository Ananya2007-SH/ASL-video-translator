// 1. Create and inject the AI Avatar container onto the YouTube player
const avatarContainer = document.createElement('div');
avatarContainer.id = 'ai-sign-avatar-container';
avatarContainer.innerHTML = '<video id="ai-avatar-video" autoplay muted playsinline></video>';
document.body.appendChild(avatarContainer);

const videoElement = document.getElementById('ai-avatar-video');

// 2. Observe YouTube captions for text changes
const captionObserver = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    if (mutation.addedNodes.length) {
      const captionText = mutation.target.innerText;
      if (captionText) {
        translateTextToSign(captionText);
      }
    }
  }
});

// Find YouTube's caption window and start observing
function observeCaptions() {
  const targetCaptionWindow = document.querySelector('.ytp-caption-window-container');
  if (targetCaptionWindow) {
    captionObserver.observe(targetCaptionWindow, { childList: true, subtree: true });
    console.log('Observer attached to captions!');
  } else {
    setTimeout(observeCaptions, 1000);
  }
}

observeCaptions();

// 3. Send text to your AI generation server
async function translateTextToSign(text) {
  try {
    console.log("Caption captured:", text);
    videoElement.src = 'https://www.w3schools.com/html/mov_bbb.mp4';
  } catch (error) {
    console.error('Sign language translation failed:', error);
  }
}