// List of RTL language codes
const rtlLangs = ['ar', 'he', 'fa', 'ur'];

function setDirectionByLang(lang) {
  if (rtlLangs.includes(lang)) {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }
}

// Detect language from <html lang="...">
function detectLang() {
  const htmlLang = document.documentElement.lang || navigator.language || 'en';
  setDirectionByLang(htmlLang.split('-')[0]);
}

// Observe changes to the <html> lang attribute
const observer = new MutationObserver(detectLang);
observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

// Initial check
detectLang();

// Function to force translation on elements that Google Translate misses
function refreshGoogleTranslate() {
  const translateContainer = document.querySelector('#google_translate_element select');
  if (!translateContainer) return;

  // List of elements that need translation
  const translatableElements = document.querySelectorAll('[data-translate]');

  translatableElements.forEach(el => {
    // Google Translate copies the innerText to a hidden iframe, so we trigger a re-translation
    const originalText = el.getAttribute('data-translate');
    if (originalText) {
      el.innerText = originalText;
    }
  });
}

// Run after Google Translate has initialized
window.addEventListener('load', () => {
  // Give Google Translate a short time to initialize
  setTimeout(refreshGoogleTranslate, 1000);

  // Optional: rerun periodically in case user switches language dynamically
  setInterval(refreshGoogleTranslate, 2000);
});
