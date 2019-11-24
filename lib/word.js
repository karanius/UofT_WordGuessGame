const Letter = require('./Letter.js')

class Word {
    constructor(word){
        this.word = String(word.toLowerCase())
        this.exposedLetters = this.word.split('')
        this.hiddenLetters = this.initt(this.word.split(''));
        this.wrongLimit = 5;
        this.wrong = 0
    }
    initt(x){
        const arr = x.map((element,i) => {
            return ((new Letter(element).visible()) ? element : '_' )
        });
        return arr
    }

    guessLetter(x) {
        let letter = String(x.toLowerCase())
        if (this.exposedLetters.includes(letter)){
            while (this.exposedLetters.includes(letter)){
                let index = this.exposedLetters.indexOf(letter)
                this.exposedLetters[index] = '_'
                this.hiddenLetters[index] = letter
            }
            return true;
        } else {
            return false;
        }
    }

    guessedCorrectly(){
        return !(this.hiddenLetters.includes('_'))
    }

}


module.exports = Word;

