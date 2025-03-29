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
    let price1s = 7;
    let refPrice1s = document.getElementById("price-1s");
    let info1s = document.getElementById("info-1s");

    let per3rd = 0;
    let ref3rd = document.getElementById("3rd");
    let price3rd = 4;
    let refPrice3rd = document.getElementById("price-3rd");
    let info3rd = document.getElementById("info-3rd");
    let priceMulti = 1.5;
    let active3rd = false;
    let count3rd = 0;

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const baseColor = getComputedStyle(btnRef).backgroundColor;
    const baseColorScore = getComputedStyle(h1ref).color;
    const critColor = "rgb(0, 255, 50)";

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


    btnRef.addEventListener("click" , () => {
        scoreObj.score = 1 * multi;
        if(active3rd){
            count3rd++;
            if(count3rd === 5){
                scoreObj.score = per3rd * multi;
                count3rd = 0;
                critAnimation();
            }
        }
    }
    );

    function updateScore(){
        h1ref.textContent = scoreObj.score;
    }

    function checkScore(price){
        return scoreObj.score >= price ? true : false;
    }

    function spendScore(price) {
        scoreObj.score = -price;
    }

    ref2x.addEventListener("click", () => {
        if(checkScore(price2x)){
            spendScore(price2x);
            multi += 2;
            update2x();
        }
    });

    function update2x(){
        price2x = Math.round(price2x * priceMulti);
        refPrice2x.textContent = price2x;
        info2x.textContent = multi;
    }

    ref1s.addEventListener("click", () => {
        if(checkScore(price1s)){
            spendScore(price1s);
            perSec += 1;
            update1s();
            scorePerSec();
        }
    });

    function update1s(){
        price1s = Math.round(price1s * priceMulti);
        refPrice1s.textContent = price1s;
        info1s.textContent = perSec;
    }

    async function scorePerSec(){
        await delay(1000);
        scoreObj.score = perSec;
        scorePerSec();
    }

    ref3rd.addEventListener("click", () => {
        if(checkScore(price3rd)){
            spendScore(price3rd);
            per3rd += 10;
            update3rd();
            if(!active3rd){
                active3rd = true;
            }
        }
    });

    function update3rd(){
        price3rd = Math.round(price3rd * priceMulti);
        refPrice3rd.textContent = price3rd;
        info3rd.textContent = per3rd;
    }

    async function critAnimation(){
        btnRef.style.transform = "scale(1.15)";
        h1ref.style.transform = "scale(1.25)";
        btnRef.style.backgroundColor = critColor;
        h1ref.style.color = critColor;
        await delay(200);
        btnRef.style.backgroundColor = baseColor;
        h1ref.style.color = baseColorScore;
        await delay(80);
        btnRef.style.transform = "scale(1)";
        h1ref.style.transform = "scale(1)";
    }
});

