(function (window, document, undefined) {
  /*
   *	TAGLINE TYPING ANIMATION
   *	--------------------------------------------
   */

  var typeTagline = function(sourceText, sourceTextLength, anim) {
    var i = anim.textContent.length;
    anim.textContent = anim.textContent + sourceText.charAt(i);
    if (i < sourceTextLength) {
      setTimeout(function() {
        typeTagline(sourceText, sourceTextLength, anim);
      }, 50);
    } else {
      anim.classList.add('blink-cursor');

      // Hide cursor after blinking 5 times
      setTimeout(function(){
        anim.classList.add('reached-end');
      }, 5400);
    }
  };

  var anim = document.getElementById('tagline-anim'),
      sourceText = document.getElementById('tagline-source').textContent;
      sourceTextLength = sourceText.length;

  setTimeout(function(){
    typeTagline(sourceText, sourceTextLength, anim);
  }, 500);

  /*
   *	MOBILE TOGGLE INFO
   *	--------------------------------------------
   */

  var mediaQuerySupport = false;

  // Only add these scripts if media queries supported
  if (typeof window.matchMedia != 'undefined' || typeof window.msMatchMedia != 'undefined' || window.styleMedia || window.media){
    mediaQuerySupport = true;
  }

  if (mediaQuerySupport) {
    var bpMobileInfo = 850,
        pageContent = document.getElementById('main'),
        info = document.getElementById('site-info'),
        btn = document.createElement('button'),
        infoUserOpened = false;

    btn.setAttribute('class', 'toggle-btn');

    // Open and close SVGs
    btn.innerHTML = '<svg class="open" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><style>.st0{fill:#FFFFFF;stroke:#E93D45;stroke-miterlimit:10;} .st1{fill:#E93D45;}</style><circle class="st0" cx="20" cy="20" r="19"/><path class="st1" d="M21.4 19.8c-.5 1.4-1.2 2.9-1.2 5 0 .5 0 1 .1 1.6h-1.2c-.2-.7-.3-1.4-.3-2.1 0-1 .1-2 .4-3.1.5-2.1 1.3-4.2 1.3-6.7V12c0-1-.2-1.5-.7-1.5-.6 0-.7 1.1-.7 3.4 0 .7.1 1.7.1 2.8l-1.7.2c-.1-1.3-.2-2.4-.2-3.1 0-3.5.7-5.1 2.7-5.1 1.7 0 2.7 1.2 2.7 3.4v2.1c0 2.4-.8 4.2-1.3 5.6zm-2.7 11.5v-2.8h2v2.8h-2z"/></svg> <svg class="close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><style>.st0{fill:#FFFFFF;stroke:#E93D45;stroke-miterlimit:10;}</style><circle class="st0" cx="20" cy="20" r="19"/><path class="st0" d="M29 11L11 29M29 29L11 11"/></svg>';

    // SHARED FUNCTIONS

      // SET CLOSED PROPERTIES
      var setClosedProps = function() {
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Show contact info');
        info.style.opacity = '0';

        // Let CSS opacity transition run unless resizing
        if (infoUserOpened) {
          var timing = 400;
        } else {
          var timing = 0;
        }

        setTimeout(function(){
          info.setAttribute('aria-hidden', 'true');
        }, timing);
      };

      // SET OPEN PROPERTIES
      var setOpenProps = function() {
        btn.setAttribute('aria-expanded', 'true');
        btn.setAttribute('aria-label', 'Hide contact info');
        info.removeAttribute('aria-hidden');
        info.style.opacity = '1';
      };

    // SET UP ON PAGE LOAD
    if (window.innerWidth <= bpMobileInfo) {
      setClosedProps();
    } else {
      setOpenProps();
    }

    pageContent.insertBefore(btn, info);

    // SET UP ON WINDOW RESIZE
    var toggleInfoOnResize = function() {

      // Close info on mobile breakpoints unless it was opened by the user (not by page load)
      if (window.innerWidth <= bpMobileInfo) {
        if (btn.getAttribute('aria-expanded') === 'true') {
          if (!infoUserOpened) {
            setClosedProps();
          }
        }
      } else {
        setOpenProps();
      }
    };

    window.addEventListener('resize', toggleInfoOnResize);

    // TOGGLE INFO VISIBLITY
    var toggleInfo = function() {
      if (btn.getAttribute('aria-expanded') === 'true') {
        setClosedProps();
        infoUserOpened = false;
      } else {
        setOpenProps();
        infoUserOpened = true;
      }
    };

    btn.addEventListener('click', toggleInfo, false);

  }

})(window, document);
