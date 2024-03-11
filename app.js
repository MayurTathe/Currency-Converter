// const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".select-container select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector("form select");
const toCurr = document.querySelector("form #to");

const url = 'https://currency-exchange.p.rapidapi.com/exchange?from=';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '8d28213499msh72bf922639c74b4p10f88ajsn7bd58ca6f6f0',
        'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
    }
};



for (const select of dropdowns) {
    for (const currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerHTML = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selcted";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    });
}

const updateFlag = (element)=>{
    let currCode = element.value;
    let country = countryList[currCode];
    let newSrc = `https://flagsapi.com/${country}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (event) => {

    event.preventDefault();
    let inputAmount = document.querySelector("form input");
    let amount = (inputAmount.value);
    if (amount === "" || amount < 1) {
        amount = 1;
        inputAmount.value = 1;
    }
    const URL = `${url}${fromCurr.value}&to=${toCurr.value}&q=${amount}`;
    console.log(URL);
    try {
        let response = await fetch(URL, options);
        let data = response.text();
        data.then((res) => {
            console.log(res);
            document.querySelector(".msg").innerHTML=`${amount} ${fromCurr.value} = ${(res*amount).toFixed(3)} ${toCurr.value}`;
        });
    } catch (error) {
        console.log(error);
    }
})
