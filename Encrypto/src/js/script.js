const datafield = document.querySelector('#data');
const encryptDataField = document.querySelector('#encrypt-data');
const uppercaseField = document.querySelector('#uppercase');
const lowercaseField = document.querySelector('#lowercase');
const charactersField = document.querySelector('#characters');
const numbersField = document.querySelector('#numbers');
const startBtn = document.querySelector('#start');
const errorPanel = document.querySelector('.error-panel');

const example = {
    numbers: "9175436280",
    uppercase: "QWZRMHSNFOJDLBGXKYUPVITAEC",
    lowercase: "qzudxymorlsbngwtpjhfkveica",
    characters: '@$!&^%*#'
}

let stroke = "";
let cstroke = "";
let digits = "";
let bigAlphabet = "";
let smallAlphabet = "";
let symbols = "";
let keyPosition;

function isNotRepeated (input){
    let value = input.value;
    let isNotRepeated = true;
    for(let i = 0; i < value.length; i++){
        for(let j = 0; j < value.length; j++){
            if(j != i){
                if(value[i] === value[j]){
                    isNotRepeated = false;
                    errorPanel.innerHTML = `The symbol ${value[i]} is repeated`
                    break;
                }
            }
        }
    }
    return isNotRepeated;
}

// Проверка на наличие недопустимых символов
function containsInvalidCharacters(input, validChars) {
    for (let i = 0; i < input.length; i++) {
        if (!validChars.includes(input[i])) {
            return true;
        }
    }
    return false;
}

// Функция объединяет все допустимые символы
function getValidCharacters() {
    return digits + bigAlphabet + smallAlphabet + symbols;
}

function ifEmpty(array, objectValue, inputName) {
    array = inputName.value;
    if (array == '') {
        array = objectValue;
        inputName.value = objectValue;
    }
}

function setKey() {
    let key;
    let counter = 0;
    if (stroke == '') {
        for (let i = 0; i < cstroke.length; i++) {
            if (/^\d$/.test(cstroke[i])) {
                counter++;
                if (counter % 4 === 0) {
                    key = Number(cstroke[i]);
                    keyPosition = i;
                    break;
                }
            }
        }
    } else if (cstroke == '') {
        for (let i = 0; i < stroke.length; i++) {
            if (/^\d$/.test(stroke[i])) {
                counter++;
                if (counter % 4 === 0) {
                    key = Number(stroke[i]);
                    keyPosition = i;
                    break;
                }
            }
        }
    }
    return key;
}

function encode(array, i, localKey) {
    for (let j = 0; j < array.length; j++) {
        if (array[j] === stroke[i]) {
            if ((j + localKey) > (array.length - 1)) {
                cstroke += array[(j + localKey) - array.length];
            } else {
                cstroke += array[j + localKey];
            };
        };
    };
}

function decode(array, i, localKey) {
    for (let j = 0; j < array.length; j++) {
        if (array[j] === cstroke[i]) {
            if ((j - localKey) < 0) {
                stroke += array[(j - localKey) + array.length];
            } else {
                stroke += array[j - localKey];
            };
        };
    };
}

function letsWork() {
    ifEmpty(digits, example.numbers, numbersField);
    ifEmpty(bigAlphabet, example.uppercase, uppercaseField);
    ifEmpty(smallAlphabet, example.lowercase, lowercaseField);
    ifEmpty(symbols, example.characters, charactersField);
    stroke = datafield.value;
    cstroke = encryptDataField.value;
    digits = numbersField.value;
    bigAlphabet = uppercaseField.value;
    smallAlphabet = lowercaseField.value;
    symbols = charactersField.value;
    const validCharacters = getValidCharacters();
    let localKey = setKey();


    if(stroke != '' && cstroke != ''){
        errorPanel.style.opacity = '1';
        errorPanel.innerHTML = 'One of the input fields for either the source data or the encrypted data must be empty.'
    }else if(stroke == '' && cstroke == ''){
        errorPanel.style.opacity = '1';
        errorPanel.innerHTML = "Inputs of data or encryption can't be empty"; 
    }else 
    if (containsInvalidCharacters(stroke, validCharacters)) {
        errorPanel.innerHTML = 'Input in "Your Password" field contains invalid characters. Encryption failed.';
        encryptDataField.disabled = true;
        errorPanel.style.opacity = '1';
        return;
    }else if (containsInvalidCharacters(cstroke, validCharacters)) {
        errorPanel.innerHTML = 'Input in "Your Encryption" field contains invalid characters. Decryption failed';
        datafield.disabled = true;
        errorPanel.style.opacity = '1';
        return;
    }else if(localKey == undefined){
        errorPanel.innerHTML = 'Minimum quantity of digits in password is 4';
        errorPanel.style.opacity = '1';
        return;
    }else if(isNotRepeated(uppercaseField) === false || isNotRepeated(lowercaseField) === false || isNotRepeated(charactersField) === false || isNotRepeated(numbersField) === false){
        errorPanel.style.opacity = '1';
        return
    }else
        {
        datafield.disabled = false;
        encryptDataField.disabled = false;
        errorPanel.style.opacity = '0';
    }

    if ((stroke == '') && (cstroke != '')) {
        for (let i = 0; i < cstroke.length; i++) {
            if (digits.includes(cstroke[i])) {
                if ((i === keyPosition)) {
                    stroke += localKey;
                } else {
                    decode(digits, i, localKey);
                };
            } else
            if (bigAlphabet.includes(cstroke[i])) {
                decode(bigAlphabet, i, localKey);
            } else
            if (smallAlphabet.includes(cstroke[i])) {
                decode(smallAlphabet, i, localKey);
            } else
            if (symbols.includes(cstroke[i])) {
                decode(symbols, i, localKey);
            };
        };
        datafield.value = stroke;
    } else 
    if ((cstroke == "") && (stroke != "")) {
        let localKey = setKey();
        let flag = false;
        for (let i = 0; i < stroke.length; i++) {
            if (digits.includes(stroke[i])) {
                if ((i === keyPosition)) {
                    cstroke += localKey;
                } else {
                    encode(digits, i, localKey);
                };
            } else
            if (bigAlphabet.includes(stroke[i])) {
                encode(bigAlphabet, i, localKey);
            } else
            if (smallAlphabet.includes(stroke[i])) {
                encode(smallAlphabet, i, localKey);
            } else
            if (symbols.includes(stroke[i])) {
                encode(symbols, i, localKey);
            };
        };
        encryptDataField.value = cstroke;
    }
}

startBtn.addEventListener('click', () => {
    letsWork();
});
