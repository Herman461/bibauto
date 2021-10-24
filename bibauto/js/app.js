"use strict";
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}

let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}

let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}
const iconMenu = document.querySelector('.icon-menu');

if (iconMenu) {
   const menuBody = document.querySelector('.menu__body');
   const headerLogo = document.querySelector('.header__logo');
   iconMenu.addEventListener('click', (e) => {
      document.body.classList.toggle('_lock');
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
      headerLogo.classList.toggle('_active');
   });
}
const select = document.querySelectorAll('select');

if (select.length > 0) {
   for (let index = 0; index < select.length; index++) {
      const selectItem = select[index];
      const selectOption = Array.from(selectItem.querySelectorAll('option')).filter(
         (option) => !option.hasAttribute('disabled'),
      );
      const selectOptionLength = selectOption.length;
      const disabledOption = selectItem.querySelector('option[disabled]');
      const selectedOption = selectItem.querySelector('option[selected="selected"]');
      selectItem.hidden = true;

      const customSelectTitle = document.createElement('div');
      customSelectTitle.className = 'select__title';
      customSelectTitle.textContent = disabledOption.textContent;
      selectItem.parentElement.insertBefore(customSelectTitle, selectItem.nextSibling);

      const customSelectList = document.createElement('ul');
      customSelectList.className = 'select__list';
      selectItem.parentElement.insertBefore(customSelectList, customSelectTitle.nextSibling);

      for (let index = 0; index < selectOptionLength; index++) {
         const customSelectItem = document.createElement('li');
         customSelectItem.className = 'select__item';
         customSelectItem.textContent = selectOption[index].textContent;
         customSelectItem.dataset.value = selectOption[index].value;
         customSelectList.appendChild(customSelectItem);
      }

      _slideUp(customSelectList);
      // customSelectTitle.addEventListener('click', function() {
      // 	_slideToggle(customSelectList, 300);
      // });
      // customSelectList.addEventListener('click', function(e) {
      // 	const targetSelectItem = e.target.closest('.select__item');
      // 	if (!targetSelectItem) return;
      // 	const previousOption = selectItem.querySelector('option[selected="selected"]');
      // 	if (previousOption) {
      // 		previousOption.removeAttribute('selected');
      // 	}

      // 	const currentOption = selectItem.querySelector(`option[value=${targetSelectItem.dataset.value}]`);
      // 	currentOption.setAttribute('selected', 'selected');
      // });
   }
}

document.addEventListener('click', function (e) {
   const selectTitle = e.target.closest('.select__title');
   if (selectTitle) {
      _slideToggle(selectTitle.nextElementSibling, 300);
      selectTitle.classList.toggle('_active');
   }
});

document.addEventListener('click', function (e) {
   const selectList = e.target.closest('.select__list');
   if (!selectList) return;

   const targetSelectItem = e.target.closest('.select__item');

   if (!targetSelectItem) return;

   const selectItem = e.target.closest('.select');
   const previousOption = selectItem.querySelector('option[selected="selected"]');

   if (previousOption) {
      previousOption.removeAttribute('selected');
   }
   const currentOption = selectItem.querySelector(
      `option[value="${targetSelectItem.dataset.value}"]`,
   );
   currentOption.setAttribute('selected', 'selected');

   selectList.previousElementSibling.textContent = targetSelectItem.textContent;
   selectList.previousElementSibling.classList.remove('_active');
   _slideUp(selectList, 300);
});

document.addEventListener('DOMContentLoaded', function () {
   const inputFile = document.querySelectorAll('.file__input');

   inputFile.forEach(function (el) {
      el.addEventListener('change', function (e) {
         const filePreview = el.closest('.file').querySelector('.file__preview');
         const fileName = document.createElement('div');
         fileName.className = 'file__name';
         const fileList = [];

         for (let index = 0; index < el.files.length; index++) {
            fileList.push(el.files[index]);
         }

         fileList.forEach((file) => {
            fileName.textContent = file.name;
            filePreview.appendChild(fileName);
         });
      });
   });
});

const form = document.querySelectorAll('form');

if (form.length > 0) {
   for (let index = 0; index < form.length; index++) {
      const el = form[index];
      validateForm(el);
   }
}

function checkValidFields(form) {
   const inputs = form.querySelectorAll('[data-required]');
   const validInputs = form.querySelectorAll('[data-required]._success');

   if (inputs.length !== validInputs.length) {
      return false;
   }

   return true;
}
function validateForm(form) {
   form.addEventListener('submit', function (e) {
      e.preventDefault();
      submit(form);
   });
   const requiredFields = form.querySelectorAll('[data-required]');
   if (requiredFields.length > 0) {
      for (let index = 0; index < requiredFields.length; index++) {
         const requiredField = requiredFields[index];
         requiredField.addEventListener('keyup', validation);
         requiredField.addEventListener('input', validation);
         requiredField.addEventListener('change', validation);
      }
   }
}

function submit(form) {
   if (!checkValidFields(form)) {
      const requiredFields = form.querySelectorAll('[data-required]:not(._success)');

      for (let index = 0; index < requiredFields.length; index++) {
         const requiredField = requiredFields[index];
         if (index === 0) {
            requiredField.focus();
         }
         addError(requiredField);
      }
   }
}

function addError(field) {
   field.classList.remove('_success');
   field.classList.add('_error');

   const message = document.createElement('span');
   message.innerText = field.dataset.message || 'Required field';
   message.className = 'error';

   const parent = field.parentElement;
   const messageCheck = parent.querySelector('error');
   if (!messageCheck) {
      parent.appendChild(message);
   }
}

function addSuccess(field) {
   field.classList.remove('_error');
   field.classList.add('_success');

   const parent = field.parentElement;
   const message = parent.querySelector('.error');

   if (message) {
      message.remove();
   }
}

function validation(e) {
   const targetElement = e.target;
   if (targetElement.dataset.validateRule === 'email') {
      const regexEmail = /^[a-zA-Z0-9][a-zA-Z0-9._-]+@([a-zA-Z0-9._-]+\.)[a-zA-Z-0-9]{2,4}$/;
      if (regexEmail.test(targetElement.value)) {
         addError(targetElement);
      } else {
         addSuccess(targetElement);
      }
   } else if (targetElement.dataset.validateRule === 'phone') {
      const regexPhone =
         /^(?:\()?(1[1-9]|2[12478]|3[1234578]|4[1-9]|5[1345]|6[1-9]|7[134579]|8[1-9]|9[1-9])(?:\))?(?:\s)?(9)?(\d{4})(?:-)?(\d{4})$/;
      if (regexPhone.test(targetElement.value)) {
         addError(targetElement);
      } else {
         addSuccess(targetElement);
      }
   } else if (targetElement.value.length === 0 && targetElement.dataset.required) {
      addError(targetElement);
   } else {
      addSuccess(targetElement);
   }
}


window.addEventListener('DOMContentLoaded', function () {
   var inputs = document.querySelectorAll('input[type="tel"]');

   Array.prototype.forEach.call(inputs, function (input) {
      new InputMask({
         selector: input, // в качестве селектора может быть элемент, или, собственно css селектор('#input', '.input', 'input'). Если селектор - тег или класс - будет получен только первый элемент
         layout: input.dataset.mask,
      });
   });
});

function InputMask(options) {
   this.el = this.getElement(options.selector);
   if (!this.el) return console.log('Что-то не так с селектором');
   this.layout = options.layout || '+_ (___) ___-__-__';
   this.maskreg = this.getRegexp();
   this.setListeners();
}

InputMask.prototype.getRegexp = function () {
   var str = this.layout.replace(/_/g, '\\d');
   str = str.replace(/\(/g, '\\(');
   str = str.replace(/\)/g, '\\)');
   str = str.replace(/\+/g, '\\+');
   str = str.replace(/\s/g, '\\s');

   return str;
};

InputMask.prototype.mask = function (e) {
   var _this = e.target,
      matrix = this.layout,
      i = 0,
      def = matrix.replace(/\D/g, ''),
      val = _this.value.replace(/\D/g, '');
   if (def.length >= val.length) val = def;
	
   _this.value = matrix.replace(/./g, function (a) {
		console.log(a)
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
   });

   if (e.type == 'blur') {
      var regexp = new RegExp(this.maskreg);
      if (!regexp.test(_this.value)) _this.value = '';
   } else {
      this.setCursorPosition(_this.value.length, _this);
   }
};

InputMask.prototype.setCursorPosition = function (pos, elem) {
   elem.focus();
   if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
   else if (elem.createTextRange) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
   }
};

InputMask.prototype.setListeners = function () {
   this.el.addEventListener('input', this.mask.bind(this), false);
   this.el.addEventListener('focus', this.mask.bind(this), false);
   this.el.addEventListener('blur', this.mask.bind(this), false);
};

InputMask.prototype.getElement = function (selector) {
   if (selector === undefined) return false;
   if (this.isElement(selector)) return selector;
   if (typeof selector == 'string') {
      var el = document.querySelector(selector);
      if (this.isElement(el)) return el;
   }
   return false;
};

InputMask.prototype.isElement = function (element) {
   return element instanceof Element || element instanceof HTMLDocument;
};

//BuildSlider

let sliders = document.querySelectorAll('._swiper');

if (sliders) {
   for (let index = 0; index < sliders.length; index++) {
      let slider = sliders[index];
      if (!slider.classList.contains('swiper-build')) {
         let slider_items = slider.children;
         if (slider_items) {
            for (let index = 0; index < slider_items.length; index++) {
               let el = slider_items[index];
               el.classList.add('swiper-slide');
            }
         }
         let slider_content = slider.innerHTML;
         let slider_wrapper = document.createElement('div');
         slider_wrapper.classList.add('swiper-wrapper');
         slider_wrapper.innerHTML = slider_content;
         slider.innerHTML = '';
         slider.appendChild(slider_wrapper);
         slider.classList.add('swiper-build');
      }
      if (slider.classList.contains('_gallery')) {
         //slider.data('lightGallery').destroy(true);
      }
   }
   sliders_build_callback();
}

function sliders_build_callback() {}

function activateOrDeactivateSlider(className, breakpoint, swiperObj) {
   const body = document.querySelector(className);
   if (body) {
      if (window.innerWidth < breakpoint && !body.classList.contains('swiper-build')) {
         body.classList.add('swiper-build');

         for (let index = 0; index < body.children.length; index++) {
            const item = body.children[index];
            item.classList.add('swiper-slide');
         }
         let sliderContent = body.innerHTML;
         let sliderWrapper = document.createElement('div');
         sliderWrapper.classList.add('swiper-wrapper');
         sliderWrapper.innerHTML = sliderContent;
         body.innerHTML = '';
         body.appendChild(sliderWrapper);

         swiperObj = new Swiper(className, {
            spaceBetween: 5,
            slidesPerView: 1.1,
            pagination: {
               el: '.advantages__dotts',
               clickable: true,
            },
         });
      } else if (body.classList.contains('swiper-build') && window.innerWidth > breakpoint) {
         swiperObj = null;
         const elements = body.querySelectorAll('.swiper-slide');
         body.innerHTML = '';
         for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            element.removeAttribute('role');
            element.removeAttribute('style');
            element.removeAttribute('aria-label');
            const swiperItemClasses = element.className
               .match(/swiper-.*/g)
               .join('')
               .split(' ');
            element.classList.remove(...swiperItemClasses);

            body.appendChild(element);
         }
         const swiperBodyClasses = body.className
            .match(/swiper-.*/g)
            .join('')
            .split(' ');
         console.log(swiperBodyClasses);
         body.classList.remove(...swiperBodyClasses);
      }
   }
}

// let slider_about = new Swiper('.about__slider', {
// 	// effect: 'fade',
// 	// autoplay: {
// 	// 	delay: 3000,
// 	// 	disableOnInteraction: false,
// 	// },

// 	observer: true,
// 	observeParents: true,
// 	slidesPerView: 1,
// 	spaceBetween: 0,
// 	autoHeight: true,
// 	speed: 800,
// 	touchRatio: 0,
// 	simulateTouch: false,
// 	loop: true,
// 	preloadImages: false,
// 	lazy: true,
// 	// Dotts
// 	pagination: {
// 		el: '.slider-quality__pagging',
// 		clickable: true,
// 	},
// 	// Arrows
// 	navigation: {
// 		nextEl: '.about__more .more__item_next',
// 		prevEl: '.about__more .more__item_prev',
// 	},
// 	breakpoints: {
// 		320: {
// 			slidesPerView: 1,
// 			spaceBetween: 0,
// 			autoHeight: true,
// 		},
// 		768: {
// 			slidesPerView: 2,
// 			spaceBetween: 20,
// 		},
// 		992: {
// 			slidesPerView: 3,
// 			spaceBetween: 20,
// 		},
// 		1268: {
// 			slidesPerView: 4,
// 			spaceBetween: 30,
// 		},
// 	},
// 	on: {
// 		lazyImageReady: function () {
// 			ibg();
// 		},
// 	},
// 	// And if we need scrollbar
// 	scrollbar: {
// 		el: ".swiper-scrollbar",
// 	},
// })

//!
// let slider_brands = new Swiper('.brands__body', {
//    speed: 800,
//    slidesPerView: 5,
//    watchSlidesVisibility: true,
//    breakpoints: {
//       820: {
//          slidesPerView: 5,
//          // slidesPerGroup: 5,
//          slidesPerColumn: 2,
//          spaceBetween: 0,
//       },
//       320: {
//          spaceBetween: 30,
//          slidesPerView: 5,
//          slidesPerColumn: 1,
//          slidesPerGroup: 1,
//       },
//    },
//    on: {
//       slideChange: function () {
//          if (this.params.slidesPerColumn === 1) {
//             if (document.querySelector('.brands__slide._next')) {
//                document.querySelector('.brands__slide._next').classList.remove('_next');
//             }

//             if (document.querySelector('.brands__slide._previous')) {
//                document.querySelector('.brands__slide._previous').classList.remove('_previous');
//             }
//             // add class _next if there is next slide
//             const halfSliderPerView = Math.ceil(this.params.slidesPerView / 2) - 1;
//             const activeSlideIndex = this.realIndex + halfSliderPerView;
//             const nextSlideIndex = activeSlideIndex + halfSliderPerView + 1;

//             if (this.slides[nextSlideIndex]) {
//                this.slides[nextSlideIndex - 1].classList.add('_next');
//                // document.querySelector('.brands__body').classList.add('_next');
//             }
//             // add class _next if there is previous slide
//             const previousSlideIndex = activeSlideIndex - halfSliderPerView + 1;
//             if (this.activeIndex !== 0) {
//                if (document.querySelector('.brands__slide._previous')) {
//                   document.querySelector('.brands__slide._previous').classList.remove('_previous');
//                }
//                this.slides[previousSlideIndex - 1].classList.add('_previous');
//             }
//          } else {
//             const nextSlides = document.querySelectorAll('.brands__slide._next');
//             const previousSlides = document.querySelectorAll('.brands__slide._previous');

//             if (nextSlides.length > 0) {
//                for (let index = 0; index < nextSlides.length; index++) {
//                   const nextSlide = nextSlides[index];
//                   nextSlide.classList.remove('_next');
//                }
//             }

//             if (previousSlides.length > 0) {
//                for (let index = 0; index < previousSlides.length; index++) {
//                   const previousSlide = previousSlides[index];
//                   previousSlide.classList.remove('_previous');
//                }
//             }

//             const visibleSlides = document.querySelectorAll('.brands .swiper-slide-visible');
//             if (this.realIndex !== 0) {
//                for (let index = 0; index < this.params.slidesPerColumn; index++) {
//                   const slide = visibleSlides[index];
//                   slide.classList.add('_previous');
//                }
//             }
//             if (this.visibleSlides[length - 1 + 3]) {
//                for (
//                   let index = visibleSlides.length - 1;
//                   index > visibleSlides.length - this.params.slidesPerColumn - 1 - 2;
//                   --index
//                ) {
//                   const slide = visibleSlides[index];
//                   slide.classList.add('_next');
//                }
//             }
//          }
//       },
//    },
// });

// let currentNextSlide = document.querySelector('.brands .swiper-slide-next');

// function AdaptSlider() {}

// AdaptSlider.prototype.init = function() {
// 	this.nodes = document.querySelectorAll('[data-adapt-slider]');
// 	this.objects = [];

// 	for (let index = 0; index < this.nodes.length; index++) {
// 		const node = this.nodes[index];
// 		const object = {};
// 		const children = node.children;
// 		object.element = node;
// 		object.children = children;
// 		object.breakpoint = node.dataset.adaptSlider ? node.dataset.adaptSlider.trim() : '767';
// 		this.objects.push(object);
// 	}
// }

// AdaptSlider.prototype.build = function() {
// 	const sliderWrapper = document.createElement("div");
// 	sliderWrapper.classList.add('swiper-wrapper');
// 	sliderWrapper.innerHTML = sliderWrapper;
// 	slider.innerHTML = "";
// 	slider.appendChild(sliderWrapper);
// }

// const adaptSlider = new AdaptSlider();

// adaptSlider.init();

//!
// const advantagesBody = document.querySelector('.advantages__body');
// let advantagesSlider;
// activateOrDeactivateSlider('.advantages__body', 767, advantagesSlider);
// window.addEventListener('resize', function () {
//    activateOrDeactivateSlider('.advantages__body', 767, advantagesSlider);
// });

// if (advantagesBody) {
//    window.addEventListener('resize', function (e) {
//       if (window.innerWidth < 767 && !advantagesBody.classList.contains('swiper-build')) {
//          advantagesBody.classList.add('swiper-build');

//          for (let index = 0; index < advantagesBody.children.length; index++) {
//             const item = advantagesBody.children[index];
//             item.classList.add('swiper-slide');
//          }
//          let sliderContent = advantagesBody.innerHTML;
//          let sliderWrapper = document.createElement('div');
//          sliderWrapper.classList.add('swiper-wrapper');
//          sliderWrapper.innerHTML = sliderContent;
//          advantagesBody.innerHTML = '';
//          advantagesBody.appendChild(sliderWrapper);

//          advantagesSlider = new Swiper('.advantages__body', {
//             spaceBetween: 30,
//          });
//          console.log(advantagesBody);
//       } else if (advantagesBody.classList.contains('swiper-build') && window.innerWidth > 767) {
//          advantagesBody.classList.remove('swiper-build');
//          advantagesSlider = null;
//          const elements = advantagesBody.querySelectorAll('.swiper-slide');
//          advantagesBody.innerHTML = '';
//          for (let index = 0; index < elements.length; index++) {
//             const element = elements[index];
//             element.removeAttribute('role');
//             element.removeAttribute('style');
//             element.removeAttribute('aria-label');
//             const swiperItemClasses = element.className
//                .match(/swiper-.*/g)
//                .join('')
//                .split(' ');
//             element.classList.remove(...swiperItemClasses);
//             console.log(advantagesBody);

//             advantagesBody.appendChild(element);
//          }
//          console.log(advantagesBody);
//          const swiperBodyClasses = advantagesBody.className
//             .match(/swiper-.*/g)
//             .join('')
//             .split(' ');
//          console.log(swiperBodyClasses);
//          advantagesBody.classList.remove(...swiperBodyClasses);
//       }
//    });
// }

const slider_examples = new Swiper('.examples__body', {
   speed: 800,
   // Arrows
	navigation: {
		nextEl: '.examples__arrow_next',
		prevEl: '.examples__arrow_prev',
	},
		pagination: {
		el: '.examples__dotts',
		clickable: true,
	},
	slidesPerView: 1,
	spaceBetween: 20,
	centeredSlides: true,
   breakpoints: {
      360: {
			slidesPerView: 1.4,
			spaceBetween: 20,
      },
      768: {
			spaceBetween: 50,
			slidesPerView: 1.4,
      },
      992: {
			spaceBetween: 90,
			slidesPerView: 1.4,
      },
   //    1268: {
   //       slidesPerView: 4,
   //       spaceBetween: 30,
   //    },
   },
});

function ibg() {

	let ibg = document.querySelectorAll("._ibg");

	for (let index = 0; index < ibg.length; index++) {
		if (ibg[index].querySelector('img')) {
			ibg[index].style.backgroundImage = 'url(' + ibg[index].querySelector('img').getAttribute('src') + ')';
		}
	}
}

ibg();
let isMobile = {
	Android: function () {
		 return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		 return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		 return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		 return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		 return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		 return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();
let spoilersArray = document.querySelectorAll("[data-spoilers]");

if (spoilersArray.length > 0) {
	// Получение обычный спойлеров
	const spoilersRegular = Array.from(spoilersArray).filter(function (item, index, self) {
		return !item.dataset.spoilers.split(",")[0];
	})
	// Инициализация обычных спойлеров
	if (spoilersRegular.length > 0) {
		initSpoilers(spoilersRegular);
	}

	// Получение спойлеров с медиа запросами
	const spoilersMedia = Array.from(spoilersArray).filter(function (item, index, self) {
		return item.dataset.spoilers.split(",")[0];
	})

	// Инициализация спойлеров с медиа запросами
	if (spoilersMedia.length > 0) {
		const breakpointsArray = [];

		spoilersMedia.forEach(item => {
			const params = item.dataset.spoilers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		})

		// Получаем уникальные брейкпоинты
		let mediaQueries = breakpointsArray.map(item => {
			return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
		});

		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		})

		// Работаем с каждым брейкпоинтом
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			// Объекты с нужными условиями
			const spoilersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			})
			matchMedia.addEventListener("change", function () {
				initSpoilers(spoilersArray, matchMedia)
			})
			initSpoilers(spoilersArray, matchMedia);
		})
	}

	// Инициализация
	function initSpoilers(spoilersArray, matchMedia = false) {
		spoilersArray.forEach(spoilersBlock => {
			spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;
			if (matchMedia.matches || !matchMedia) {
				spoilersBlock.classList.add("_init");
				initSpoilerBody(spoilersBlock);
				spoilersBlock.addEventListener("click", setSpoilerAction);
			} else {
				spoilersBlock.classList.remove("_init");
				initSpoilerBody(spoilersBlock, false);
				spoilersBlock.removeEventListener("click", setSpoilerAction);
			}
		})
	}

	// Работа с контентом
	function initSpoilerBody(spoilersBlock, hideSpoilerBody = true) {
		const spoilerTitles = spoilersBlock.querySelectorAll("[data-spoiler]");
		if (spoilerTitles.length > 0) {
			spoilerTitles.forEach(spoilerTitle => {
				if (hideSpoilerBody) {
					spoilerTitle.removeAttribute("tabindex");
					if (!spoilerTitle.classList.contains("_active")) {
						spoilerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spoilerTitle.setAttribute("tabindex", "-1");
					spoilerTitle.nextElementSibling.hidden = false;
				}
			})
		}
	}
	function setSpoilerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
			const spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
			const spoilersBlock = spoilerTitle.closest('[data-spoilers]');
			const oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false;
			if (!spoilersBlock.querySelectorAll("._slide").length) {
				if (oneSpoiler && !spoilerTitle.classList.contains("_active")) {
					hideSpoilerBody(spoilersBlock);
				}
				spoilerTitle.classList.toggle("_active");
				_slideToggle(spoilerTitle.nextElementSibling, 500)
			}
			e.preventDefault();
		}
	}
	function hideSpoilerBody(spoilersBlock) {
		const spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler]._active');
		if (spoilerActiveTitle) {
			spoilerActiveTitle.classList.remove("_active");
			_slideUp(spoilerActiveTitle.nextElementSibling, 500)
		}
	}
}

