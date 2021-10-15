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

let slider_brands = new Swiper('.brands__body', {
   speed: 800,
   slidesPerView: 5,
   watchSlidesVisibility: true,
   breakpoints: {
      820: {
         slidesPerView: 5,
         // slidesPerGroup: 5,
         slidesPerColumn: 2,
         spaceBetween: 0,
      },
      320: {
         spaceBetween: 30,
         slidesPerView: 5,
         slidesPerColumn: 1,
         slidesPerGroup: 1,
      },
   },
   on: {
      slideChange: function () {
         if (this.params.slidesPerColumn === 1) {
            if (document.querySelector('.brands__slide._next')) {
               document.querySelector('.brands__slide._next').classList.remove('_next');
            }

            if (document.querySelector('.brands__slide._previous')) {
               document.querySelector('.brands__slide._previous').classList.remove('_previous');
            }
            // add class _next if there is next slide
            const halfSliderPerView = Math.ceil(this.params.slidesPerView / 2) - 1;
            const activeSlideIndex = this.realIndex + halfSliderPerView;
            const nextSlideIndex = activeSlideIndex + halfSliderPerView + 1;

            if (this.slides[nextSlideIndex]) {
               this.slides[nextSlideIndex - 1].classList.add('_next');
               // document.querySelector('.brands__body').classList.add('_next');
            }
            // add class _next if there is previous slide
            const previousSlideIndex = activeSlideIndex - halfSliderPerView + 1;
            if (this.activeIndex !== 0) {
               if (document.querySelector('.brands__slide._previous')) {
                  document.querySelector('.brands__slide._previous').classList.remove('_previous');
               }
               this.slides[previousSlideIndex - 1].classList.add('_previous');
            }
         } else {
            const nextSlides = document.querySelectorAll('.brands__slide._next');
            const previousSlides = document.querySelectorAll('.brands__slide._previous');

            if (nextSlides.length > 0) {
               for (let index = 0; index < nextSlides.length; index++) {
                  const nextSlide = nextSlides[index];
                  nextSlide.classList.remove('_next');
               }
            }

            if (previousSlides.length > 0) {
               for (let index = 0; index < previousSlides.length; index++) {
                  const previousSlide = previousSlides[index];
                  previousSlide.classList.remove('_previous');
               }
            }

            const visibleSlides = document.querySelectorAll('.brands .swiper-slide-visible');
            if (this.realIndex !== 0) {
               for (let index = 0; index < this.params.slidesPerColumn; index++) {
                  const slide = visibleSlides[index];
                  slide.classList.add('_previous');
               }
            }
            if (this.visibleSlides[length - 1 + 3]) {
               for (
                  let index = visibleSlides.length - 1;
                  index > visibleSlides.length - this.params.slidesPerColumn - 1 - 2;
                  --index
               ) {
                  const slide = visibleSlides[index];
                  slide.classList.add('_next');
               }
            }
         }
      },
   },
});

let currentNextSlide = document.querySelector('.brands .swiper-slide-next');

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

const advantagesBody = document.querySelector('.advantages__body');
let advantagesSlider;
activateOrDeactivateSlider('.advantages__body', 767, advantagesSlider);
window.addEventListener('resize', function() {
	activateOrDeactivateSlider('.advantages__body', 767, advantagesSlider);
});

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