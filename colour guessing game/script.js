'use strict';

const topSect = document.querySelector('.top-section');
const rgbCode = document.querySelector('.top-section p');
const roundStatus = document.querySelector('.status');
const newRound = document.querySelector('.new');
const colourOptions = document.querySelectorAll('.colour-option');

//////////////////////////////////////////////////////////////////////////
let chosenOption;

const startRound = function () {
  //random colours to be displayed as users options
  colourOptions.forEach(option => {
    const randConc = () => Math.round(Math.random() * 255);
    const r = randConc();
    const g = randConc();
    const b = randConc();
    option.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  });
  //a random option is chosen and it's rgb code displayed
  (function () {
    const randOpt = () => Math.round(Math.random() * 3);
    chosenOption = colourOptions[randOpt()];
    rgbCode.textContent = chosenOption.style.backgroundColor.toUpperCase();
  })();
};
startRound();

colourOptions.forEach(optionx =>
  optionx.addEventListener('click', e => {
    //user already chose correct option
    if (roundStatus.textContent == 'Correct') return;
    //user chose correct option: show win message, change background colours to winning colour
    if (e.target == chosenOption) {
      roundStatus.textContent = 'Correct';
      topSect.style.backgroundColor = chosenOption.style.backgroundColor;
      colourOptions.forEach(optiony => {
        if (!(optiony == chosenOption)) {
          optiony.style.backgroundColor = getComputedStyle(
            colourOptions[0].parentElement
          ).backgroundColor;
        }
      });
      //user chose wrong option: show try again message, change background of chosen option
    } else if (!(e.target == chosenOption)) {
      roundStatus.textContent = 'Try Again';
      optionx.style.backgroundColor = getComputedStyle(
        colourOptions[0].parentElement
      ).backgroundColor;
    }
  })
);

//when new round button is clicked, reload page
newRound.addEventListener('click', () => window.location.reload());
