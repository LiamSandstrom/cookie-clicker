document.addEventListener("DOMContentLoaded", function() {
    let btnRef = document.getElementById("cookie");
    let h1ref = document.getElementById("score");

    let price2x = 100;
    let price1s = 50;
    let priceXrd = 20;

    let multi = 1;
    let ref2x = document.getElementById("2x");
    let refPrice2x = document.getElementById("price-2x");
    let info2x = document.getElementById("info-2x");

    let perSec = 0;
    let perSecCalled = false;
    let ref1s = document.getElementById("1s");
    let refPrice1s = document.getElementById("price-1s");
    let info1s = document.getElementById("info-1s");

    let perXrd = 0;
    let perXrdAmount = 3;
    let refXrd = document.getElementById("Xrd");
    let refPriceXrd = document.getElementById("price-Xrd");
    let infoXrd = document.getElementById("info-Xrd");
    let priceMulti = 1.5;
    let activeXrd = false;
    let countXrd = 0;

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const baseColor = getComputedStyle(btnRef).backgroundColor;
    const baseColorScore = getComputedStyle(h1ref).color;
    const critColor = "rgb(0, 255, 50)";
    const badColor = "rgb(255, 36, 80)";

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
        refPriceXrd.textContent = priceXrd;   
        info2x.textContent = multi;
        info1s.textContent = perSec;
        infoXrd.textContent = perXrd;
    }


    btnRef.addEventListener("click" , () => {
        scoreObj.score = 1 * multi;
        if(activeXrd){
            countXrd++;
            if(countXrd === 5){
                scoreObj.score = perXrd * multi;
                countXrd = 0;
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
            multi += 1;
            update2x();
            buyAnimation(ref2x);
        }
        else{
            notEnoughAnimation(ref2x);
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
            buyAnimation(ref1s);
        }
        else{
            notEnoughAnimation(ref1s);
        }
    });

    function update1s(){
        price1s = Math.round(price1s * priceMulti);
        refPrice1s.textContent = price1s;
        info1s.textContent = perSec;
    }

    async function scorePerSec(){
        scoreObj.score = perSec;
        if(!perSecCalled){
            perSecCalled = true;
            tickPerSec();
        }
    }

    async function tickPerSec(){
        while(true){
            await delay(1000);
            scorePerSec();
        }
    }

    refXrd.addEventListener("click", () => {
        if(checkScore(priceXrd)){
            spendScore(priceXrd);
            perXrd += perXrdAmount;
            buyAnimation(refXrd);
            updateXrd();
            if(!activeXrd){
                activeXrd = true;
            }
        }
        else{
            notEnoughAnimation(refXrd);
        }
    });

    function updateXrd(){
        priceXrd = Math.round(priceXrd * priceMulti);
        refPriceXrd.textContent = priceXrd;
        infoXrd.textContent = perXrd;
    }

    async function critAnimation(){
        btnRef.style.transform = "scale(1.15)";
        h1ref.style.transform = "scale(1.25)";
        btnRef.style.backgroundColor = critColor;
        h1ref.style.color = critColor;
        btnRef.style.pointerEvents = "none";
        await delay(100);
        btnRef.style.pointerEvents = "auto";
        await delay(100);
        btnRef.style.backgroundColor = baseColor;
        h1ref.style.color = baseColorScore;
        await delay(80);
        btnRef.style.transform = "scale(1)";
        h1ref.style.transform = "scale(1)";
    }

    async function buyAnimation(ref){
        ref.style.transform = "scale(1.1)";
        ref.style.backgroundColor = critColor;
        await delay(200);
        ref.style.backgroundColor = baseColorScore;
        ref.style.transform = "scale(1)";
    }

    async function notEnoughAnimation(ref){
        ref.style.backgroundColor = badColor;
        await delay(160);
        ref.style.backgroundColor = baseColorScore;
    }
});

