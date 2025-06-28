document.addEventListener('DOMContentLoaded', () => {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const body = document.querySelector('body');
    const infoBg = document.querySelector('.attention-bg');
    const howTo = document.querySelector('.howto');
    const instructions = `
        <p >Before you start read this manual, let’s establish: the key-fields refer to four fields named: "UPPERCASE LETTERS", "lowercase letters", "symbols", and "numbers". In this short manual, the term key-field will refer to one of the aforementioned fields, or in the plural form (key-fields), all of them together.</p>
        <h2 class="attention-subheader">What is this website?</h2>
        <p>This website was created to demonstrate my basic programming skills. In the script that performs encryption and decryption, I wrote all the logic exclusively using loops (for) and conditions (if). Each line of code is treated as an array of characters, which the code iterates over with a for loop, and for each character, it replaces it based on a floating key and an array of randomly ordered letters, symbols, and numbers that you provide in the key-fields.</p>

        <h2 class="attention-subheader">What encryption method is used?</h2>
        <p>The data here is encrypted using an improved Caesar cipher. It works by replacing each character in your original data with a character from the sequence of uppercase letters, lowercase letters, symbols, or numbers, depending on what is encountered in your source code and the key, which is derived from your original code using a certain logic.</p>

        <h2 class="attention-subheader">What should I do to make this site work correctly?</h2>
        <p>Please enter your data that you want to encrypt in the top field, and it must contain letters from the key-fields. To ensure the best encryption quality, fill the key-fields with as many allowable symbols as possible in a random order without repetition. Remember, for the key-field named *numbers*, only digits from 0 to 9 are accepted; anything beyond 9 is treated by the code as individual characters, not numbers.</p>
        <p>If you enter invalid characters in the data you want to encrypt, meaning those not included in the key-fields (see the next section), the code may not work properly. Keep this in mind.</p>

        <h2 class="attention-subheader">What is the encryption-decryption key for this data?</h2>
        <p>The key is a digit that, after the data is encrypted in your code, remains the same in both the original and the encrypted data, meaning it will be identical in both strings at the same position. This makes such a cipher vulnerable. Since it would be too easy to decrypt the data, I decided to enhance security by adding four fields mentioned in the previous section.</p>
        <p>The key is not only a digit but also each set of characters, digits, and letters (case-sensitive), as well as their order. Since each character in the original data is replaced by a character from your key-fields, if you don't maintain the exact order and mix data in key-fields, the encryption or decryption may occur incorrectly or not at all.</p>

        <h2 class="attention-subheader">How can I decrypt the data and verify that encryption is working correctly?</h2>
        <p>You have two main fields: one labeled "Your password" and another labeled "Your cipher".</p>
        <p>To encrypt the data, simply enter the information into the "Your password" field and press "Start" button. The code will instantly provide you with the cipher, provided that you have filled in the key-fields correctly. 
        To decrypt the data, leave the "Your password" field empty and enter the encrypted data into the "Your cipher" field. Similarly to encryption, if you have entered the same data into the key-fields as you used during encryption, you will receive the original string before the data was encrypted. This indicates that encryption was successful.</p>
        <p>If, for some reason, you receive incorrect data after decryption, ensure that your cipher is correct and matches what the site initially provided, and also make sure that the data in the key-fields is exactly the same (the order matters!) as it was when the data was encrypted.</p>
    `;

    infoBg.querySelector('.attention-btn').addEventListener('click', () => {
        infoBg.style.display = 'none';
        body.style.overflow = 'auto';  
    });
    howTo.addEventListener('click', () => {
        infoBg.querySelector('p').innerHTML = instructions;
        infoBg.querySelector('h2').innerHTML = 'Manual';
        infoBg.querySelector('.attention').classList.add('instructions');
        infoBg.style.display = 'flex';
        body.style.overflow = 'hidden';
    });
});
