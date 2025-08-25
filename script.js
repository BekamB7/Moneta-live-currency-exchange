//for smooth view ui slide

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});
const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

//geting HTml element  access to script

const fromCurrency = document.getElementById("from");
const toCurrency = document.getElementById("to");
const amount = document.getElementById("amount");
const convertBtn = document.getElementById("convert");
const result = document.getElementById("result");
const regulation = document.getElementById("regulation");

async function loadCurrencies() {
  let res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
  let data = await res.json();

  let currencies = Object.keys(data.rates);

  currencies.forEach((currency) => {
    fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
    toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
  });
  console.log(data);
}

loadCurrencies();

//convert function

async function convert() {
  let res = await fetch(
    `https://api.exchangerate-api.com/v4/latest/${fromCurrency.value}`
  );
  let data = await res.json();

  let rate = data.rates[toCurrency.value];
  var inputAmount = amount.value;

  let converted = (inputAmount * rate).toFixed(2);

  result.innerText = `${inputAmount} ${fromCurrency.value} = ${converted} ${toCurrency.value}`;
}

convertBtn.addEventListener("click", checkInput);

//the input field regural expression

function checkInput() {
  let regex = /^[0-9]+(\.[0-9]{1,2})?$/;
  if (!regex.test(amount.value) || amount.value === "") {
    regulation.innerText = "Please enter the amount in number format";
    amount.value = "";
    result.innerText = "";
    return;
  }
  convert();
  regulation.innerText="";
}

//ffor in press key of the ENTER key in keyboard to go on 
amount.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); 
    checkInput();            
  }
});

// alert for the user screen size 
let screenWidth = window.innerWidth;
 if (window.innerWidth < 320){
 alert(" ⚠️ Your screen width is below: " + 320 + "px \n\n"+
"which is the lowest web application accessible screen size.\n\n"+
  "we kindly ask 😊For better experience use a device with more than " + 360 + "px width.🙌"
);
 }

