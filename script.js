let titles = document.querySelectorAll("h3");
let current = document.querySelectorAll(".current");
let previous = document.querySelectorAll('.previous');

// picking up the buttons

let daily = document.getElementById('daily');
let weekly = document.getElementById('weekly');
let monthly = document.getElementById('monthly');

// main code

fetch('data.json').then((response) => {
    if(!response.ok) {
        console.log('Algo deu errado na requisição!');
        return null
    }
    
    return response.json();
}).then((itens) => {
    function updateUI(timeframe) {
        itens.forEach((element, index) => {
            titles[index].textContent = element.title;
            current[index].textContent = `${element.timeframes[timeframe].current}hrs`
            previous[index].textContent = `Last week - ${element.timeframes[timeframe].previous}hrs`
        });
    }
    
    function activateButton(activeButton) {
        [daily, weekly, monthly].forEach(button => button.classList.remove('active'));
        activeButton.classList.add('active');
    }
    
    daily.addEventListener('click', function () {
        activateButton(daily);
        updateUI('daily');
    });
    
    weekly.addEventListener('click', function () {
        activateButton(weekly);
        updateUI('weekly');
    });
    
    monthly.addEventListener('click', function () {
        activateButton(monthly);
        updateUI('monthly');
    });

    weekly.click();
});
