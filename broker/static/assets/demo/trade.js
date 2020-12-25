const buyBtn = document.getElementById("BUY");
const symb = document.getElementById("Xsymb").innerText.toLowerCase();
// add anonymous fn to call eHandler with params
buyBtn.addEventListener("click", () => {
    buy(symb);
})

async function buy(symbol) {
    const priceV = document.getElementById("PRICE").innerText;
    const price = parseFloat(priceV);
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