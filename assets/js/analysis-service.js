(function () {
  'use strict';

  document.querySelectorAll('.analysis-media-card video').forEach(function (video, index) {
    var card = video.closest('.analysis-media-card');
    var title = card && card.querySelector('p');
    var label = title ? title.textContent.trim() : 'video ' + (index + 1);
    var frame = document.createElement('div');
    var button = document.createElement('button');
    var icon = document.createElement('span');
    var controlsIdleTimer;

    frame.className = 'analysis-video-frame';
    video.parentNode.insertBefore(frame, video);
    frame.appendChild(video);

    button.className = 'analysis-video-toggle';
    button.type = 'button';
    icon.className = 'analysis-video-toggle__icon';
    icon.setAttribute('aria-hidden', 'true');
    button.appendChild(icon);
    frame.appendChild(button);

    function clearControlsIdleTimer() {
      window.clearTimeout(controlsIdleTimer);
      controlsIdleTimer = undefined;
    }

    function showControlsTemporarily() {
      if (!frame.classList.contains('is-playing')) return;

      frame.classList.remove('is-controls-idle');
      clearControlsIdleTimer();
      controlsIdleTimer = window.setTimeout(function () {
        if (frame.classList.contains('is-playing')) {
          frame.classList.add('is-controls-idle');
        }
      }, 1000);
    }

    function updateButton() {
      var playing = !video.paused && !video.ended;
      frame.classList.toggle('is-playing', playing);
      button.setAttribute('aria-label', (playing ? 'Pause ' : 'Play ') + label);
      button.setAttribute('aria-pressed', playing ? 'true' : 'false');

      if (playing) {
        showControlsTemporarily();
      } else {
        clearControlsIdleTimer();
        frame.classList.remove('is-controls-idle');
      }
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
    frame.addEventListener('mousemove', showControlsTemporarily);
    frame.addEventListener('mouseenter', showControlsTemporarily);
    frame.addEventListener('mouseleave', function () {
      clearControlsIdleTimer();
      frame.classList.remove('is-controls-idle');
    });
    updateButton();
  });
}());
