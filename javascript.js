let btnRef = document.querySelector("button");
let h1ref = document.getElementById("score");

let multi = 1;

let scoreObj = {
    _score : 0,
    get score() {
        return this._score;
    },
    set score(value) {
        this._score += value;
        updateScore();
    }
}

btnRef.addEventListener("click" , () => {
    scoreObj.score = 1 * multi;
}
);

function updateScore(){
    h1ref.textContent = scoreObj.score;
}
