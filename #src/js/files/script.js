const iconMenu = document.querySelector(".icon-menu");

if (iconMenu) {
	const menuBody = document.querySelector(".menu__body");
	const headerLogo = document.querySelector('.header__logo');
	iconMenu.addEventListener("click", e => {
		document.body.classList.toggle("_lock");
		iconMenu.classList.toggle("_active");
		menuBody.classList.toggle("_active");
		headerLogo.classList.toggle("_active");
	})
}
