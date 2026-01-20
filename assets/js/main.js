/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
  }

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  
document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

})();
//// 1. Исправляем Scrollspy и мобильное меню (универсальный блок)
(function() {
  const navLinks = document.querySelectorAll('.mobile-top-nav a, #navmenu a');
  const sections = document.querySelectorAll('section');

  function navmenuScrollspy() {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= (section.offsetTop - 250)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active', 'active-mobile');
      const href = link.getAttribute('href');
      if (!href || !href.includes('#')) return;
      const sectionId = href.split('#')[1];

      if (['about', 'skills', 'resume', 'stats'].includes(current) && sectionId === 'about') {
        link.classList.add(link.closest('.mobile-top-nav') ? 'active-mobile' : 'active');
      } else if (current === 'testimonials' && sectionId === 'services') {
        link.classList.add(link.closest('.mobile-top-nav') ? 'active-mobile' : 'active');
      } else if (current === sectionId) {
        link.classList.add(link.closest('.mobile-top-nav') ? 'active-mobile' : 'active');
      }
    });
  }

  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  // Вибрация (теперь navLinks определен внутри этой функции)
  navLinks.forEach(link => {
    link.addEventListener('touchstart', () => {
      if (window.navigator.vibrate) window.navigator.vibrate(10);
    }, {passive: true});
  });
})();

// 2. Код КУРСОРА (теперь он точно сработает, так как выше нет ошибок)
(function() {
  // Ждем загрузки DOM
  function initCursor() {
    const follower = document.querySelector('.cursor-follower');
    if (!follower) {
      console.warn('Cursor follower element not found');
      return;
    }

    // Инициализация курсора - скрываем изначально
    follower.style.opacity = '0';
    follower.style.display = 'block';
    follower.style.position = 'fixed';
    follower.style.pointerEvents = 'none';
    follower.style.zIndex = '99999';
    follower.style.left = '-100px';
    follower.style.top = '-100px';

    let isVisible = false;

    // Обновление позиции курсора
    document.addEventListener('mousemove', (e) => {
      // Показываем курсор при первом движении мыши
      if (!isVisible) {
        follower.style.opacity = '1';
        isVisible = true;
      }

      // Используем clientX/Y для fixed позиционирования
      // CSS transform: translate(-50%, -50%) центрирует элемент на этих координатах
      follower.style.left = e.clientX + 'px';
      follower.style.top = e.clientY + 'px';
    });

    // Скрываем курсор при выходе мыши за пределы окна
    document.addEventListener('mouseleave', () => {
      follower.style.opacity = '0';
      isVisible = false;
    });

    // Показываем курсор при входе мыши в окно
    document.addEventListener('mouseenter', () => {
      if (isVisible) {
        follower.style.opacity = '1';
      }
    });

    // Эффект увеличения при наведении на интерактивные элементы
    const interactives = document.querySelectorAll('a, button, .portfolio-item, input, textarea, select, .navmenu a');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        follower.classList.add('cursor-active');
      });
      el.addEventListener('mouseleave', () => {
        follower.classList.remove('cursor-active');
      });
    });
  }

  // Инициализируем после загрузки DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCursor);
  } else {
    // DOM уже загружен
    initCursor();
  }
})();