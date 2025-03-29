document.addEventListener("DOMContentLoaded", function() {
    let btnRef = document.getElementById("cookie");
    let h1ref = document.getElementById("score");

    let multi = 1;
    let ref2x = document.getElementById("2x");
    let price2x = 5;
    let refPrice2x = document.getElementById("price-2x");
    let info2x = document.getElementById("info-2x");

    let perSec = 0;
    let ref1s = document.getElementById("1s");
    let price1s = 100;
    let refPrice1s = document.getElementById("price-1s");
    let info1s = document.getElementById("info-1s");

    let per3rd = 0;
    let ref3rd = document.getElementById("3rd");
    let price3rd = 100;
    let refPrice3rd = document.getElementById("price-3rd");
    let info3rd = document.getElementById("info-3rd");
    let priceMulti = 1.5;

    begin();

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
    
    function begin(){
        refPrice2x.textContent = price2x;
        refPrice1s.textContent = price1s;
        refPrice3rd.textContent = price3rd;   
        info2x.textContent = multi;
        info1s.textContent = perSec;
        info3rd.textContent = per3rd;
    }

    ref2x.addEventListener("click", () => {
        if(checkScore(price2x)){
            spendScore(price2x);
            multi += 2;
            update2x();
        }
    });

    btnRef.addEventListener("click" , () => {
        scoreObj.score = 1 * multi;
    }
    );

    function updateScore(){
        h1ref.textContent = scoreObj.score;
    }

    function update2x(){
        price2x = Math.round(price2x * priceMulti);
        refPrice2x.textContent = price2x;
    }

    function checkScore(price){
        return scoreObj.score >= price ? true : false;
    }

    function spendScore(price) {
        scoreObj.score = -price;
    }
});

