'use strict';

const allCheckMarks = document.querySelectorAll('.check');
const displayPassword = document.querySelector('#password-output');
const generatePasswordBtn = document.querySelector('#generate-password');
const copyPasswordBtn = document.querySelector('#copy-password');

const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const numbers = '0123456789'.split('');
const specialCharacters = '!@#$%^&*()-_=+[]{}|;:\'",.<>?/`~'.split('');

const charactersArray = [
  uppercaseLetters,
  lowercaseLetters,
  numbers,
  specialCharacters,
];

const checkAgainst = Array.from(charactersArray);

let passwordArr = [];

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

let passwordInput = document.querySelector('#password-length');

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
  passwordArr = [];

  if (charactersArray.length === 0) {
    displayPassword.value = 'Select at least one option';
  } else {
    while (passwordArr.length < passwordLength) {
      const getElement = function () {
        let characterIndex = Math.floor(Math.random() * arr.length);
        let elementIndex = Math.floor(
          Math.random() * arr[characterIndex].length
        );

        return arr[characterIndex][elementIndex];
      };

      let charEl = getElement();

      passwordArr.slice(-1).join('') === charEl
        ? getElement()
        : passwordArr.push(charEl);
    }

    displayPassword.value = passwordArr.join('');
  }
};

generatePassword(charactersArray);

const copyPassword = function () {
  navigator.clipboard.writeText(passwordArr.join(''));
  // alert(`Password copied to clipboard`);

  console.log('copied');
};

generatePasswordBtn.addEventListener('click', () =>
  generatePassword(charactersArray)
);

copyPasswordBtn.addEventListener('click', copyPassword);
