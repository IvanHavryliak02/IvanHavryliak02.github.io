# Encrypto

**Encrypto** is a data encryption and decryption tool that uses **four customizable character strings** provided by the user.  

---

## Features

- Encrypts and decrypts data using a custom key.  
- Users can modify the character sets for encryption.  
- Supports letters (upper and lower case), digits, and symbols (`!$&#`).  
- Automatically handles default character sets if the user does not provide them.  
- Displays errors if input data does not meet the required conditions.  

---

## Requirements

1. Characters in the strings used for encryption must be **unique**.  
2. Input data must contain **at least four digits**. The **fourth digit** serves as the encryption/decryption key.  

The four character strings are:  
- Uppercase letters (A-Z)  
- Lowercase letters (a-z)  
- Digits (0-9)  
- Symbols (`!$&#`)  

> Note: The order of characters does not matter. The more random the order, the stronger the encryption.

---

## How It Works

1. The algorithm analyzes the input data. If there are fewer than four digits, an error is displayed and the process stops.  
2. If the user has not entered custom character strings, the algorithm fills the fields with **default values**.  
3. Each character in the input is identified by type (letter, digit, or symbol), its index in the corresponding array is found, and the **key is added** to produce the encrypted character.  
4. The algorithm determines the action based on the input field:  
   - Input in the **first field** → encrypts data and outputs to the **second field**.  
   - Input in the **second field** → decrypts data and outputs to the **first field**.  
   - If both fields are filled, the user is prompted to clear one field.  

> To decrypt the result, the user needs the **four character strings**. The **encryption key** is stored in the input data.

---

## Technologies Used

- **HTML**  
- **CSS**  
- **JavaScript**

---

## Live Demo

A live demo of Encrypto is available here:  
[Encrypto Demo](https://ivanhavryliak02.github.io/Encrypto/dist/index.html) 

---

## Projects

You can find other projects I have worked on here:
- [Portfolio](https://ivanhavryliak02.github.io/Portfolio/dist/index.html)    
- [Weather App](https://ivanhavryliak02.github.io/WeatherApp/dist/index.html)  
- [Pulse](https://ivanhavryliak02.github.io/Pulse/dist/index.html)  
- [TPass](https://ivanhavryliak02.github.io/TeaPass/dist/index.html)
