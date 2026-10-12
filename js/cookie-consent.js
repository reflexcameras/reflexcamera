(function () {
  'use strict';
  var analyticsId = 'G-K5380EE6TQ';
  var form = document.getElementById('recaptcha-container');
  var submit = document.getElementById('submit-button');
  var note = document.getElementById('consent-contact-note');
  var consent = false;
  var captchaLoading = false;
  function update(allowed) {
    consent = allowed;
    window['ga-disable-' + analyticsId] = !allowed;
    if (submit) submit.disabled = !allowed;
    if (form) form.style.display = allowed ? 'block' : 'none';
    if (note) note.hidden = allowed;
    if (!allowed) return;
    if (!window.gaLoaded) {
      window.gaLoaded = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', analyticsId);
      var analytics = document.createElement('script');
      analytics.src = 'https://www.googletagmanager.com/gtag/js?id=' + analyticsId;
      analytics.async = true;
      document.head.appendChild(analytics);
    }
    if (form && !captchaLoading) {
      captchaLoading = true;
      var captcha = document.createElement('script');
      window.reflexRecaptchaReady = function () {
        window.grecaptcha.render(form, { sitekey: '6Lew3SMUAAAAAJ82QoS7gqOTkRI_dhYrFy1f7Sqy' });
      };
      captcha.src = 'https://www.google.com/recaptcha/api.js?onload=reflexRecaptchaReady&render=explicit';
      captcha.async = true;
      document.head.appendChild(captcha);
    }
  }
  update(false);
  if (submit && submit.form) {
    submit.form.addEventListener('submit', function (event) {
      if (!consent || !window.grecaptcha || typeof window.grecaptcha.getResponse !== 'function' || !window.grecaptcha.getResponse()) {
        event.preventDefault();
        if (consent) window.alert('Please complete the human verification before submitting.');
      }
    });
  }
  if (!window.cookieconsent) return;
  window.cookieconsent.initialise({
    type: 'opt-in',
    revokable: true,
    palette: { popup: { background: '#071013', text: '#ebf1ee' }, button: { background: '#f05aa6', text: '#071013' } },
    content: {
      message: 'We use cookies to improve your visit.',
      allow: 'Accept all', deny: 'Reject', link: 'Learn more',
      policy: 'Cookie settings',
      href: document.querySelector('.site-cookie-links a').href
    },
    onInitialise: function () { update(this.hasConsented()); },
    onStatusChange: function () { update(this.hasConsented()); },
    onRevokeChoice: function () { update(false); }
  }, function (popup) {
    window.cc = popup;
    document.getElementById('cookie-settings').addEventListener('click', function () { popup.revokeChoice(); });
  });
}());
