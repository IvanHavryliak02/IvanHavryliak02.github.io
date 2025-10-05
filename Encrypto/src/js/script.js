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

let inputValue = "";
let outputValue = "";
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


function containsInvalidCharacters(input, validChars) {
    for (let i = 0; i < input.length; i++) {
        if (!validChars.includes(input[i])) {
            return true;
        }
    }
    return false;
}


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
    if (inputValue == '') {
        for (let i = 0; i < outputValue.length; i++) {
            if (/^\d$/.test(outputValue[i])) {
                counter++;
                if (counter % 4 === 0) {
                    key = Number(outputValue[i]);
                    keyPosition = i;
                    break;
                }
            }
        }
    } else if (outputValue == '') {
        for (let i = 0; i < inputValue.length; i++) {
            if (/^\d$/.test(inputValue[i])) {
                counter++;
                if (counter % 4 === 0) {
                    key = Number(inputValue[i]);
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
        if (array[j] === inputValue[i]) {
            if ((j + localKey) > (array.length - 1)) {
                outputValue += array[(j + localKey) - array.length];
            } else {
                outputValue += array[j + localKey];
            };
        };
    };
}

function decode(array, i, localKey) {
    console.log('Decoding...')
    for (let j = 0; j < array.length; j++) {
        if (array[j] === outputValue[i]) {
            if ((j - localKey) < 0) {
                inputValue += array[(j - localKey) + array.length];
            } else {
                inputValue += array[j - localKey];
            };
        };
    };
}

function letsWork() {
    ifEmpty(digits, example.numbers, numbersField);
    ifEmpty(bigAlphabet, example.uppercase, uppercaseField);
    ifEmpty(smallAlphabet, example.lowercase, lowercaseField);
    ifEmpty(symbols, example.characters, charactersField);
    inputValue = datafield.value;
    outputValue = encryptDataField.value;
    digits = numbersField.value;
    bigAlphabet = uppercaseField.value;
    smallAlphabet = lowercaseField.value;
    symbols = charactersField.value;
    const validCharacters = getValidCharacters();
    let localKey = setKey();


    if(inputValue != '' && outputValue != ''){
        errorPanel.style.opacity = '1';
        errorPanel.innerHTML = 'One of the input fields for either the source data or the encrypted data must be empty.'
    }else if(inputValue == '' && outputValue == ''){
        errorPanel.style.opacity = '1';
        errorPanel.innerHTML = "Inputs of data or encryption can't be empty"; 
    }else 
    if (containsInvalidCharacters(inputValue, validCharacters)) {
        errorPanel.innerHTML = 'Input in "Your Password" field contains invalid characters. Encryption failed.';
        encryptDataField.disabled = true;
        errorPanel.style.opacity = '1';
        return;
    }else if (containsInvalidCharacters(outputValue, validCharacters)) {
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

    if ((inputValue == '') && (outputValue != '')) {
        for (let i = 0; i < outputValue.length; i++) {
            if (digits.includes(outputValue[i])) {
                if ((i === keyPosition)) {
                    inputValue += localKey;
                } else {
                    decode(digits, i, localKey);
                };
            } else
            if (bigAlphabet.includes(outputValue[i])) {
                decode(bigAlphabet, i, localKey);
            } else
            if (smallAlphabet.includes(outputValue[i])) {
                decode(smallAlphabet, i, localKey);
            } else
            if (symbols.includes(outputValue[i])) {
                decode(symbols, i, localKey);
            };
        };
        datafield.value = inputValue;
    } else 
    if ((outputValue == "") && (inputValue != "")) {
        let localKey = setKey();
        for (let i = 0; i < inputValue.length; i++) {
            if (digits.includes(inputValue[i])) {
                if ((i === keyPosition)) {
                    outputValue += localKey;
                } else {
                    encode(digits, i, localKey);
                };
            } else
            if (bigAlphabet.includes(inputValue[i])) {
                encode(bigAlphabet, i, localKey);
            } else
            if (smallAlphabet.includes(inputValue[i])) {
                encode(smallAlphabet, i, localKey);
            } else
            if (symbols.includes(inputValue[i])) {
                encode(symbols, i, localKey);
            };
        };
        encryptDataField.value = outputValue;
    }
}

startBtn.addEventListener('click', () => {
    letsWork();
});
