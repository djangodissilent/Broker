const buyBtn = document.getElementById("BUY");
const symb = document.getElementById("Xsymb").innerText.toLowerCase();
const price = document.getElementById("PRICE").innerText.toLowerCase();
// add anonymous fn to call eHandler with params
buyBtn.addEventListener("click", () => {
    buy(symb, price);
})

async function buy(symbol, price) {
    price = parseInt(price);
    msgDiv = document.getElementById("MESSAGE");
    msgDiv.style.display = 'block';

    msgDiv.innerHTML = `<div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden"></span>
    </div>
  </div>`;
    const response = await fetch('/buy', {
        method: "POST",
        body: JSON.stringify({
            symbol: symbol,
            price: price
        }),
    }).then((response) => response.json()).then((data) => {

        console.log(data);
        const ret = data['message'];
        msgDiv.innerHTML = '';
        if (ret === 'Transaction Failed') {
            msgDiv.className = 'alert alert-danger';
        }
        msgDiv.innerText = ret;
        msgDiv.style.display = 'block';
    })

}