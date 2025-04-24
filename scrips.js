const currency_one = document.getElementById("currency-one");
const currency_two = document.getElementById("currency-two");

const amount_one = document.getElementById("amount-one");
const amount_two = document.getElementById("amount-two");

const rateText = document.getElementById("rate");
const swap = document.getElementById("btn");

currency_one.addEventListener("change", calculateMoney);
currency_two.addEventListener("change", calculateMoney);
amount_one.addEventListener("input", calculateMoney);
amount_two.addEventListener("input", calculateMoney);

function calculateMoney() {
  const one = currency_one.value;
  const two = currency_two.value;

  console.log("สกุลเงินต้นทาง: " + one);
  console.log("สกุลเงินปลายทาง: " + two);
  let url = `https://v6.exchangerate-api.com/v6/44968af48963d203223db30d/latest/${one}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.conversion_rates[two];
      rateText.innerText = `1 ${one} = ${rate} ${two}`;
      amount_two.value = amount_one.value * rate;
    });
}

swap.addEventListener("click", () => {
  // USD -> THB  || THB -> USD
  // TEMP -> USD  || USD -> THB
  const temp = currency_one.value;
  currency_one.value = currency_two.value;
  currency_two.value = temp;
  calculateMoney();
});

