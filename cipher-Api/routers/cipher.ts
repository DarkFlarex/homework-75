import express from 'express';
import { CipherMutation } from '../types';

const cipherRouter = express.Router();

const vigenereCipher = (phrase: string, key: string, encrypt: boolean): string =>{
    let keyArray: number[] = key.split('').map(c => findOffset(c));
    let letters: number[] = [];

    let c = 0;
    for (let i = 0; i < phrase.length; i++) {
        let charCode: number = phrase[i].charCodeAt(0);
        if (((97 <= charCode) && (charCode <= 122)) || ((65 <= charCode) && (charCode <= 90))) {
            letters.push(letterShift(phrase[i], keyArray[c % keyArray.length], encrypt));
            c++;
        } else {
            letters.push(charCode);
        }
    }

    return String.fromCharCode(...letters);
}

const letterShift =(letter: string, shift: number, forward: boolean): number => {
    shift = forward ? shift : -1 * shift;
    let charCode: number = letter.charCodeAt(0);
    if ((65 <= charCode) && (charCode <= 90)) {
        charCode = 65 + ((charCode - 65 + shift + 26) % 26);
    } else if ((97 <= charCode) && (charCode <= 122)) {
        charCode = 97 + ((charCode - 97 + shift + 26) % 26);
    }
    return charCode;
}

const findOffset = (letter: string): number => {
    const charCode: number = letter.toUpperCase().charCodeAt(0) - 65;
    return charCode % 26;
}

let data: CipherMutation[] = [];

cipherRouter.post('/encode', (req, res) => {
    const { password, message } = req.body;
    const encodedText = vigenereCipher(message, password, true);
    data.push({ password, encoded: encodedText });
    res.send({ encoded: encodedText });
});

cipherRouter.post('/decode', (req, res) => {
    const { password, message } = req.body;
    const decodedText = vigenereCipher(message, password, false);
    data.push({ password, decoded: decodedText });
    res.send({ decoded: decodedText });
});


export default cipherRouter;
