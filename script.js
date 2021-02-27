

let bakery = {score: 0, cookie_per_click: 1, multi_cost: 20, auto_click: 0, auto_click_cost: 20, bonus_cost: 20}; //starting values

let bonus_factor = 1;//Leave at 1, used in functions: Cookie Click, AutoClick and CookieTime.
const SCORE_BUTTON_UPDATE = function () {
    if (bakery.score < 0) bakery.score = 0;
    document.getElementById('counter').innerText = bakery.score;
    document.getElementById('auto-clicker').disabled = bakery.score < bakery.auto_click_cost;
    document.getElementById('bonus').disabled = (bakery.score < bakery.bonus_cost) || (bonus_factor > 1);
    document.getElementById('multiplier').disabled = bakery.score < bakery.multi_cost;
    localStorage.setItem(player, JSON.stringify(bakery));
}//Update Data, Runs after Every Button click + auto Click cycle.

function AutoClick() {

    //Start or Increase the auto click.

    if (bakery.auto_click === 0) {
        bakery.auto_click++;
        setInterval(function () {
            bakery.score += ((bakery.cookie_per_click) * bonus_factor) * bakery.auto_click
            SCORE_BUTTON_UPDATE()
        }, 3000);
    } else {
        bakery.auto_click++;
    }

    //Adjust Score and Increase Future Cost

    bakery.score -= bakery.auto_click_cost;
    bakery.auto_click_cost = bakery.auto_click_cost * 2; //Cost Increase formula for auto click.

    //Update Button Display

    document.getElementById('autospan').innerText = 'Auto Click x' + bakery.auto_click;
    document.getElementById('autocostspan').innerText = 'upgrade for ' + bakery.auto_click_cost + ' points';
} //Auto Click: Automatic points at determined interval.

function CookieTime() {

    bonus_factor++; //Doubles points per click.

    //Sets Duration and Runs Timer.

    let duration = 31;
    let timer = setInterval(function () {
        duration--;
        document.getElementById('bonusspan').innerText = 'Double cookies for another: ' + duration.toString().padStart(2, '0') + 's';
    }, 1000)

    //Conclude Cookie Time.

    setTimeout(function () {

        //Ends Timer, Resets bonus_factor

        clearInterval(timer);
        bonus_factor--;

        //Increases Future Cost.

        bakery.bonus_cost = bakery.bonus_cost * 2;//Bonus Cost Increase formula.

        //Update Button Display

        document.getElementById('bonusspan').innerText = 'Cookie Time!';
        document.getElementById('bonuscostspan').innerText = 'activate for ' + bakery.bonus_cost + ' points'
    }, duration * 1000)
} //Cookie Time: double points for certain time + timer.

function Multiply() {

    // Increase point modifier.
    bakery.cookie_per_click++;

    //Adjust Score and Increase Future Cost

    bakery.score -= bakery.multi_cost
    bakery.multi_cost = bakery.multi_cost * 2;//Multiplier cost Increase Formula.

    //Update Button Display.

    document.getElementById('multispan').innerText = 'Cookies x' + bakery.cookie_per_click;
    document.getElementById('multicostspan').innerText = 'upgrade for ' + bakery.multi_cost + ' points';
}//Multiply: Increases cookie per click.

function CookieClick() {
    bakery.score += (bakery.cookie_per_click) * bonus_factor;
}//CookieClick: Increase point counter each click.


//Setup and Running of the Buttons//

let runButton = function (button) {
    switch (button) {
        case 'clicker':
            CookieClick();
            break;
        case 'multiplier':
            Multiply();
            break;
        case 'auto-clicker':
            AutoClick();
            break;
        case 'bonus':
            CookieTime();
            break;
    }
    SCORE_BUTTON_UPDATE()
}//Runs SCORE_BUTTON_UPDATE each click.

document.querySelectorAll("button").forEach(function ($btn) {
    $btn.addEventListener('click', function () {
        runButton($btn.id)
    })
})


//Setup Player (retrieve data if played before).//

let player = prompt("Who's playing today?");

document.getElementById('baker').innerText = player;
let retrieved_stats = localStorage.getItem(player);

if (retrieved_stats !== null) {
    bakery = JSON.parse(localStorage.getItem(player))
    document.getElementById('autospan').innerText = 'Auto Click x' + bakery.auto_click
    document.getElementById('autocostspan').innerText = 'upgrade for ' + bakery.auto_click_cost + ' points';
    document.getElementById('bonuscostspan').innerText = 'activate for ' + bakery.bonus_cost + ' points'
    document.getElementById('multispan').innerText = 'Cookies x' + bakery.cookie_per_click;
    document.getElementById('multicostspan').innerText = 'upgrade for ' + bakery.multi_cost + ' points';
    if (bakery.auto_click > 0) {
        setInterval(function () {
            bakery.score += ((bakery.cookie_per_click) * bonus_factor) * bakery.auto_click
            SCORE_BUTTON_UPDATE()
        }, 3000);
    }
}
SCORE_BUTTON_UPDATE();