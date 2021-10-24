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

