let enteredText = '';
let cuttedText = '';
let fullTranslitText = '';

const textToRuSide = (text) => {
  const newSpan = document.createElement('span');
  newSpan.innerText = text;
  newSpan.setAttribute('data-tooltip', `${enteredText}`);
  const lastSpan = document.querySelector('.ruSide').lastElementChild;
  lastSpan.after(newSpan);
};

const textToTranslitSide = (translitText) => {
  const newSpan = document.createElement('span');
  newSpan.innerText = translitText;
  newSpan.setAttribute('data-tooltip', `${fullTranslitText}`);
  const lastSpan = document.querySelector('.translitSide').lastElementChild;
  lastSpan.after(newSpan);
};

const textCut = (text) => {
  cuttedText = text.slice(0, 30);
  cuttedText = cuttedText.split(' ');
  cuttedText = cuttedText.slice(0, cuttedText.length - 1);
  cuttedText = cuttedText.join(' ');
  cuttedText = `${cuttedText}...`;
  return cuttedText;
};

const deletePopUpWindows = () => {
  const lastSpanRu = document.querySelector('.ruSide').lastElementChild;
  const lastSpanTranslit = document.querySelector('.translitSide').lastElementChild;
  lastSpanRu.removeAttribute('data-tooltip');
  lastSpanTranslit.removeAttribute('data-tooltip');
};

const showMessage = (message) => {
  // eslint-disable-next-line no-alert
  alert(message);
};

const clearInput = () => {
  document.querySelector('input').value = '';
}

const inputValidation = () => {
  const latinLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890=-()*?&@!#№$;^~';
  for (let i = 0; i < latinLetters.length; i += 1) {
    if (latinLetters.includes(enteredText[i])) {
      showMessage('Текст не должен содержать латинских букв, цифр или символов.');
      return false;
    }
  }
  return true;
};

const translit = (text) => {
  let textArray = [];
  const baseForTranslit = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'c', ч: 'ch', ш: 'sh', щ: 'sch', ь: '', ы: 'y', ъ: '', э: 'e', ю: 'yu', я: 'ya', А: 'A', Б: 'B', В: 'V', Г: 'G', Д: 'D', Е: 'E', Ё: 'E', Ж: 'Zh', З: 'Z', И: 'I', Й: 'Y', К: 'K', Л: 'L', М: 'M', Н: 'N', О: 'O', П: 'P', Р: 'R', С: 'S', Т: 'T', У: 'U', Ф: 'F', Х: 'H', Ц: 'C', Ч: 'Ch', Ш: 'Sh', Щ: 'Sch', Ь: '', Ы: 'Y', Ъ: '', Э: 'E', Ю: 'Yu', Я: 'Ya', '.': '.', '!': '!', ',': ',', ' ': ' ', '?': '?',
  };

  textArray = text.split('');

  for (let i = 0; i < textArray.length; i += 1) {
    if (baseForTranslit[textArray[i]] !== undefined) {
      fullTranslitText += baseForTranslit[textArray[i]];
    }
  }
  return fullTranslitText;
};

function addToDictionary() {
  enteredText = document.querySelector('input').value;
  fullTranslitText = '';

  if (!enteredText) {
    showMessage('Введите слово для транслита');
    return false;
  }

  if (inputValidation()) {
    translit(enteredText);
  } else {
    clearInput();
    return false;
  }

  if (enteredText.length > 50) {
    textCut(enteredText)
    textToRuSide(cuttedText);
    textCut(fullTranslitText)
    textToTranslitSide(cuttedText);
    clearInput();
    return true;
  }

  textToRuSide(enteredText);
  textToTranslitSide(fullTranslitText);
  deletePopUpWindows();
  clearInput();
  return true;
}

const addWordButton = document.querySelector('button');
addWordButton.addEventListener('click', addToDictionary);
const input = document.querySelector('input');
input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addToDictionary();
  }
});
