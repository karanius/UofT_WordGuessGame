const inquirer = require('inquirer')
const Word = require('./lib/word.js');

const clear = () => {
    process.stdout.write('\033c')
}
const msg = (x) => {
    switch(x){
        case 1:
            console.log(`
            ~~ WORD GUESSING GAME ~~
        
            `)
            return
        case 2:
            console.log(`
            \n\n\n   ~~ !YOU !LOST !Play !Again..  ~~\n\n\n
            
            `)
            return
        case 3:
            console.log(`
            \n\n\n   YOU GUESS RIGHT  ~~\n\n\n
            
            `)
            return
        default:
            return
    }
}
const ask = async (question) => {
    let answer;
    await inquirer.prompt([
    {
        name: "input",
        message: ` ~~ ${question}`,
    },
    ])
    .then( async (answers)=>{
        if (answers.word !== '') {
            answer = answers.input;
        } else {
            answer = await ask(question);
        }
    })
    return answer;
}
const buildWord = (secretWord) => {
    return new Word(secretWord)
}
class buildGame {
    constructor(wordObj){
        this.wordObj = wordObj
    }
    printWord(){
        console.log(`
            Word: ${this.wordObj.hiddenLetters.join('')}
        `)
    }
}
const startGame = async (wordObj,gameObj) => {
    if (!wordObj.guessedCorrectly()) {
        clear()
        console.log(`Wrong tries: ${wordObj.wrong}\/${wordObj.wrongLimit}`)
        await gameObj.printWord()
        let guess = await ask('Guess a letter: ')
        let result = await wordObj.guessLetter(guess)
        if (result == false) {
            wordObj.wrong++
            if ((wordObj.wrong / wordObj.wrongLimit) === 1){
                clear()
                msg(2)
                return
            }
        }
        startGame(wordObj,gameObj)
    } else {
        clear()
        await gameObj.printWord()
        msg(3);
    }
}
const init = async () => {
    clear() ; 
    msg(1) ;
    let secretWord = await ask('Enter a secret word to start the game! \n The Word: ');
    clear() ;
    secretWord = buildWord(secretWord);
    const game = new buildGame(secretWord);
    startGame(secretWord,game)
}
init()