document.addEventListener("DOMContentLoaded", function() {
    let btnRef = document.getElementById("cookie");
    let h1ref = document.getElementById("score");
    let ref2x = document.getElementById("2x");
    let ref1s = document.getElementById("1s");
    let ref3rd = document.getElementById("3rd");

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

    ref2x.addEventListener("click", () => {
        multi += 2;
    });

    btnRef.addEventListener("click" , () => {
        scoreObj.score = 1 * multi;
    }
    );

    function updateScore(){
        h1ref.textContent = scoreObj.score;
    }
});

