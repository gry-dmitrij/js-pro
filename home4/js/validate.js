document.addEventListener('DOMContentLoaded', () => {
   const form = document.querySelector('form');
   // сделал через коллекцию для универсальности, если в будущем
   // будет несколько форм с одинаковой валидацией
   const nameInputs = form.querySelectorAll('input[type=text]');
   const phoneInputs = form.querySelectorAll('input[type=tel]');
   const emailInputs = form.querySelectorAll('input[type=email]');
   const button = form.querySelector('button');

   button.addEventListener('click', submit);

   function submit(event) {
       // при неверной валидации отключаем отправку
       if (!validate()) {
           event.preventDefault();
       }
   }

   // валидация данных
   function validate() {
       let result = true;
       let errorStr = '';
       if (!validateName(nameInputs)) {
           errorStr += 'Имя может содержать только буквы.\n';
           result = false;
       }
       if (!validatePhone(phoneInputs)) {
           errorStr += 'Неверный формат телефона.\nТелефон должен быть в следующем формате: +7(000)000-0000\n';
           result = false;
       }
       if (!validateEmail(emailInputs)) {
           errorStr += 'Неверный формат email';
       }
       if (!result) {
           alert('Ошибка ввода:\n' + errorStr);
       }
       return  result;
   }

    /**
     * Функция, производящая валидацию
     * @callback checkFunc
     * @param {string} str - строка для проверки
     * @returns {boolean}
     */

    /**
     * Валидация поле ввода
     * @param {Node} input - ссылка на input для валидации
     * @param {checkFunc} cb - функция, производящая валидацю
     * @returns {boolean}
     */
   function validateInput(input, cb) {
       if (!cb(input.value)) {
           input.classList.add('error');
           // сбросим ошибку, когда пользователь изменит что-нибудь в поле
           input.addEventListener('input', clearError);
           return false;
       }
       return true;
   }

    /**
     * Валидация коллекции однотипных полей ввода
     * @param {NodeList} inputs - коллекция однотипных полей ввода
     * @param {checkFunc} cb - функция, производящая валидацю
     * @return {boolean}
     */
   function validateInputs(inputs, cb) {
       let result = true;
       inputs.forEach((item) => {
           result &&= validateInput(item, cb)
       });
       return result;
   }

   function validateName(inputs) {
       return validateInputs(inputs, checkName);
   }

   function validatePhone(inputs) {
       return validateInputs(inputs, checkPhone);
   }

   function validateEmail(inputs) {
       return validateInputs(inputs, checkEmail);
   }

   function checkName(str) {
       //добавил пробел для поиска Имя Фамилия в одном поле
       return /^[a-zа-яё ]+$/i.test(str);
   }

   function checkPhone(str) {
       return /^\+\d\(\d{3}\)\d{3}-\d{4}$/.test(str);
   }

   function checkEmail(str) {
       return /^((\w+[.-]?\w+)|(\w+))@\w+\.\w+$/i.test(str);
   }

   // сброс ошибки с поля
   function clearError() {
       this.classList.remove('error');
       this.removeEventListener('input', clearError);
   }
});
