(function () {
  'use strict';

  document.querySelectorAll('.analysis-media-card video').forEach(function (video, index) {
    var card = video.closest('.analysis-media-card');
    var title = card && card.querySelector('p');
    var label = title ? title.textContent.trim() : 'video ' + (index + 1);
    var frame = document.createElement('div');
    var button = document.createElement('button');
    var icon = document.createElement('span');

    frame.className = 'analysis-video-frame';
    video.parentNode.insertBefore(frame, video);
    frame.appendChild(video);

    button.className = 'analysis-video-toggle';
    button.type = 'button';
    icon.className = 'analysis-video-toggle__icon';
    icon.setAttribute('aria-hidden', 'true');
    button.appendChild(icon);
    frame.appendChild(button);

    function updateButton() {
      var playing = !video.paused && !video.ended;
      frame.classList.toggle('is-playing', playing);
      button.setAttribute('aria-label', (playing ? 'Pause ' : 'Play ') + label);
      button.setAttribute('aria-pressed', playing ? 'true' : 'false');
    }

    button.addEventListener('click', function () {
      if (video.paused || video.ended) {
        video.play().catch(function () {
          updateButton();
        });
      } else {
        video.pause();
      }
    });

    video.addEventListener('play', updateButton);
    video.addEventListener('pause', updateButton);
    video.addEventListener('ended', updateButton);
    updateButton();
  });
}());
