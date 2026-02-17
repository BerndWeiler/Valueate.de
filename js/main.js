/* ==========================================================================
   Valueate.de – Main JavaScript
   ========================================================================== */

(function () {
    'use strict';

    // --- Cookie Banner ---
    const cookieBanner = document.getElementById('cookie-banner');
    const cookieAccept = document.getElementById('cookie-accept');
    const cookieDecline = document.getElementById('cookie-decline');

    if (cookieBanner && !localStorage.getItem('cookie-consent')) {
        setTimeout(function () {
            cookieBanner.classList.add('is-visible');
        }, 1000);
    }

    function hideCookieBanner(consent) {
        localStorage.setItem('cookie-consent', consent);
        cookieBanner.classList.remove('is-visible');
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', function () {
            hideCookieBanner('accepted');
        });
    }

    if (cookieDecline) {
        cookieDecline.addEventListener('click', function () {
            hideCookieBanner('declined');
        });
    }

    // --- Mobile Navigation ---
    const burger = document.getElementById('burger');
    const mobileNav = document.getElementById('mobile-nav');

    if (burger && mobileNav) {
        burger.addEventListener('click', function () {
            var isOpen = mobileNav.classList.toggle('is-open');
            burger.classList.toggle('is-active');
            burger.setAttribute('aria-expanded', isOpen);
            mobileNav.setAttribute('aria-hidden', !isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close on link click
        var mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                mobileNav.classList.remove('is-open');
                burger.classList.remove('is-active');
                burger.setAttribute('aria-expanded', 'false');
                mobileNav.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Header Scroll Effect ---
    var header = document.getElementById('header');
    var lastScroll = 0;

    window.addEventListener('scroll', function () {
        var currentScroll = window.pageYOffset;
        if (header) {
            if (currentScroll > 20) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        }
        lastScroll = currentScroll;
    }, { passive: true });

    // --- Scroll Animations (Intersection Observer) ---
    var fadeElements = document.querySelectorAll('.fade-in, .fade-in-children');

    if ('IntersectionObserver' in window && fadeElements.length > 0) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeElements.forEach(function (el) {
            observer.observe(el);
        });
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Kontaktformular: Erfolgs-/Fehlermeldung ---
    var urlParams = new URLSearchParams(window.location.search);
    var successBox = document.getElementById('contact-success');
    var errorBox = document.getElementById('contact-error');

    if (urlParams.get('success') === '1' && successBox) {
        successBox.classList.add('is-visible');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    if (urlParams.get('error') === '1' && errorBox) {
        errorBox.classList.add('is-visible');
        errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // --- Kostenersparnis-Rechner ---
    var calcEl = document.querySelector('.calc');

    if (calcEl) {
        var effortSlider = document.getElementById('calc-effort');
        var frequencySlider = document.getElementById('calc-frequency');
        var costSlider = document.getElementById('calc-cost');
        var effortDisplay = document.getElementById('calc-effort-value');
        var frequencyDisplay = document.getElementById('calc-frequency-value');
        var costDisplay = document.getElementById('calc-cost-value');
        var manualDisplay = document.getElementById('calc-manual');
        var aiDisplay = document.getElementById('calc-ai');
        var savingsDisplay = document.getElementById('calc-savings');
        var percentDisplay = document.getElementById('calc-percent');
        var radios = document.querySelectorAll('input[name="calc-type"]');

        function updateSliderFill(slider) {
            var min = parseFloat(slider.min);
            var max = parseFloat(slider.max);
            var val = parseFloat(slider.value);
            var pct = ((val - min) / (max - min)) * 100;
            slider.style.background = 'linear-gradient(to right, #E6821F 0%, #E6821F ' + pct + '%, #E0E0E0 ' + pct + '%, #E0E0E0 100%)';
        }

        function formatEuro(num) {
            return Math.round(num).toLocaleString('de-DE') + ' €';
        }

        function getType() {
            var checked = document.querySelector('input[name="calc-type"]:checked');
            return checked ? checked.value : 'voice';
        }

        function calculate() {
            var effort = parseFloat(effortSlider.value);
            var frequency = parseFloat(frequencySlider.value);
            var hourly = parseFloat(costSlider.value);
            var type = getType();

            // Update slider displays
            effortDisplay.textContent = effort + ' Min';
            frequencyDisplay.textContent = frequency + 'x';
            costDisplay.textContent = hourly + ' €/Std';

            // Update slider fill colors
            updateSliderFill(effortSlider);
            updateSliderFill(frequencySlider);
            updateSliderFill(costSlider);

            // Manuelle Kosten/Jahr = (min / 60) * Stundenlohn * Häufigkeit * 12
            var manualCost = (effort / 60) * hourly * frequency * 12;

            // KI-Kosten/Jahr
            var aiCost;
            if (type === 'voice') {
                // Sprachassistent: Aufwand in Min * 0,15 €/Min * Häufigkeit * 12
                aiCost = effort * 0.15 * frequency * 12;
            } else {
                // Automatisierung: 0,03 € pro Ausführung * Häufigkeit * 12
                aiCost = 0.03 * frequency * 12;
            }

            // Ersparnis
            var savings = manualCost - aiCost;
            var percent = manualCost > 0 ? Math.round((savings / manualCost) * 100) : 0;

            // Ensure no negative savings display
            if (savings < 0) {
                savings = 0;
                percent = 0;
            }

            // Update results
            manualDisplay.textContent = formatEuro(manualCost);
            aiDisplay.textContent = formatEuro(aiCost);
            savingsDisplay.textContent = formatEuro(savings);
            percentDisplay.textContent = '(' + percent + '% weniger)';
        }

        // Attach event listeners
        effortSlider.addEventListener('input', calculate);
        frequencySlider.addEventListener('input', calculate);
        costSlider.addEventListener('input', calculate);

        radios.forEach(function (radio) {
            radio.addEventListener('change', calculate);
        });

        // Initial calculation
        calculate();
    }

})();
