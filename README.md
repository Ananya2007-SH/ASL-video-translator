# ASL-video-translator
Manifest V3 Chrome Extension that tracks YouTube live captions and pipes text through an English-to-ASL Gloss translation pipeline, driving a 3D WebGL anime avatar (VRM/Three.js) to sign captions in real time.


Key features and Technical highlights:

Dynamic Caption Extraction Engine:
  * **DOM Mutation Tracking:** Utilizes the browser's native `MutationObserver` API to monitor live structural mutations inside YouTube's caption container (`.ytp-caption-window-container`).
  * **Asynchronous Polling Loop:** Features a recursive `observeCaptions()` initialization loop with a 1-second fallback timer (`setTimeout`) to handle YouTube's Single Page Application (SPA) architecture, ensuring the script attaches cleanly even if captions load late.
  * **Text Node Parsing:** Filters specifically for `addedNodes` to intercept caption updates as text fragments render line-by-line during video playback.

Non-Intrusive Viewport Overlay UI:
  * **Direct DOM Injection:** Programmatically creates and appends a dedicated container (`#ai-sign-avatar-container`) directly into `document.body`, avoiding conflict with YouTube's core player elements.
  * **Embedded HTML5 Media Player:** Houses an optimized `<video>` element pre-configured with `autoplay`, `muted`, and `playsinline` attributes to bypass strict browser autoplay policies and ensure continuous playback.
  * **Responsive CSS Styling:** Positions the avatar frame in the bottom-right corner of the viewport using fixed positioning (`position: fixed`), scaled height/width dimensions, and rounded borders.

Strict Manifest V3 Compliance:
  * **Scoped Permissions:** Adheres to Chrome's latest security guidelines by restricting script execution exclusively to active tabs (`activeTab`) and YouTube domain match patterns (`https://www.youtube.com/*`).
  * **Isolated Content Scripts:** Runs `content.js` and injects `style.css` within isolated execution environments, preventing global namespace pollution or scope collisions with YouTube's native scripts.

Asynchronous Translation Bridge Architecture:
  * **Async Fetch Pipeline:** Implements an `async/await` network utility (`translateTextToSign`) that transforms extracted caption text into structured JSON payloads (`{ text, language: 'ASL' }`).
  * **Dynamic Media Source Updating:** Parses returning API payloads and dynamically re-binds the video element's source (`videoElement.src = data.videoUrl`), allowing new sign language video clips to load on the fly without page reloads.
  * **Graceful Error Handling:** Wrapped in `try...catch` blocks with console reporting to prevent network failures or unhandled promise rejections from breaking the DOM observer.

Zero Playback Interruption & Control Passthrough:
  * **Pointer-Event Passthrough:** Incorporates `pointer-events: none` on the avatar container in `style.css`, allowing mouse clicks to pass directly through the video frame so users can still click native YouTube controls (like settings, timeline, or volume) underneath.
  * **High Z-Index Management:** Configured with `z-index: 9999` to keep the sign language overlay above standard YouTube video elements without disrupting the main video player.
