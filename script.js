 //for smooth view ui slide 

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
  console. log(entry)
  if (entry.isIntersecting) {
  entry.target.classList.add('show');
  } else {
  entry.target.classList.remove('show');
  }
  }) ;
  }) ;
  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((el) => observer.observe(el));

  //geting HTml element  access to script 

    const fromCurrency = document.getElementById("from");  
  const toCurrency = document.getElementById("to");     
  const amount = document.getElementById("amount");       
  const convertBtn = document.getElementById("convert");  
  const result = document.getElementById("result");       

  async function loadCurrencies() {
    let res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    let data = await res.json();

    let currencies = Object.keys(data.rates);

    currencies.forEach(currency => {
      fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
      toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
    });
      console.log(data);
  }

  loadCurrencies();


  //convert function 

    async function convert() {
    let res = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency.value}`);
    let data = await res.json();

    let rate = data.rates[toCurrency.value];
    let inputAmount = amount.value;

    let converted = (inputAmount * rate).toFixed(2);

    result.innerText = `${inputAmount} ${fromCurrency.value} = ${converted} ${toCurrency.value}`;
  }

  convertBtn.addEventListener("click", convert);

//the inp