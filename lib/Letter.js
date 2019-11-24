class Letter {
    constructor(l){
        this.hasBeenGuessed = false;
        this.l = String(l.toLowerCase())
        this.alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "u", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        this.numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    }
    visible(){
        return !(this.alphabet.includes(this.l) || this.numbers.includes(this.l))
    }
    toString(){
        return ((this.alphabet.includes(this.l)) 
        ? '_' : false);
    }
    guess(x){
        return ((this.l === String(x.toLowerCase())) ? (this.hasBeenGuessed = true ,true ) : false)
    }
    getSolution(){
        return this.l
    }
}


module.exports = Letter