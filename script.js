'use strict';

const allCheckMarks = document.querySelectorAll('.check');
const displayPassword = document.querySelector('#password-output');
const generatePasswordBtn = document.querySelector('#generate-password');
const copyPasswordBtn = document.querySelector('#copy-password');
const displayPasswordLength = document.querySelector(
  '.display-password-length'
);
let strengthIndicator = document.querySelector('.password-strength');
const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const numbers = '0123456789'.split('');
const specialCharacters = '!@#$%^&*()-_=+[]{}|;:\'",.<>?/`~'.split('');
let passwordInput = document.querySelector('#password-length');

const charactersArray = [
  uppercaseLetters,
  lowercaseLetters,
  numbers,
  specialCharacters,
];
const checkAgainst = Array.from(charactersArray);
let password = '';

const checkBoxes = function (array) {
  if (!charactersArray.includes(array)) {
    charactersArray.push(array);
  } else {
    charactersArray.splice(
      charactersArray.findIndex(el => el === array),
      1
    );
  }
};

passwordInput.addEventListener(
  'change',
  () =>
    (displayPasswordLength.textContent = `Password Length: ${passwordInput.value}`)
);

const passwordLengthValue = function () {
  return Number(passwordInput.value);
};

passwordInput.addEventListener('change', function () {
  generatePassword(charactersArray);
});

allCheckMarks.forEach((checkmark, index) => {
  checkmark.addEventListener('click', () => {
    checkBoxes(checkAgainst[index]);
    generatePassword(charactersArray);
  });
});

const generatePassword = function (arr) {
  let passwordLength = passwordLengthValue();
  password = '';

  if (charactersArray.length === 0) {
    displayPassword.value = 'Select at least one option';
  } else {
    while (password.length < passwordLength) {
      const getElement = function () {
        let characterIndex = Math.floor(Math.random() * arr.length);
        let elementIndex = Math.floor(
          Math.random() * arr[characterIndex].length
        );

        return arr[characterIndex][elementIndex];
      };

      let charEl = getElement();
      password.slice(-1) === charEl ? getElement() : (password += charEl);
    }

    displayPassword.value = password;
  }
};
generatePassword(charactersArray);

const copyPassword = function () {
  navigator.clipboard.writeText(password.join(''));
  console.log('copied');
};

generatePasswordBtn.addEventListener('click', () =>
  generatePassword(charactersArray)
);

copyPasswordBtn.addEventListener('click', copyPassword);

// const checkPasswordStrength = function (arr) {
//   console.log(arr.length);

//   // if(arr.length === 8 && !arr.includes())
// };

// checkPasswordStrength(password);

// const veryWeak = [arr.length === 8, arr.every(el=> el = ''), ];
