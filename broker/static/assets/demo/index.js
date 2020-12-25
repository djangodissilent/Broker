// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

document.querySelectorAll("button").forEach((el) => {
        if (el.className === "btn btn-danger")
            el.addEventListener("click", (e) => {
                sell(e);
            })
    }

);



async function sell(e) {
    msgDiv = document.getElementById("MESSAGE");

    e.target.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Loading...`;

    const response = await fetch('/sell', {
        method: "POST",
        body: JSON.stringify({
            id: e.target.id
        }),
    }).then((response) => response.json()).then((data) => {

        console.log(data);
        const ret = data['message'];


        e.target.className = "btn btn-success";
        e.target.innerHTML = `<h6 style="display:inline"> SOLD&nbsp;&nbsp;✔ </h6>`;

        e.target.parentNode.parentNode.color = "red";
        setTimeout(() => e.target.parentNode.parentNode.style.display = "none", 1000)


    })

}


brokerData()
    .then((broker_data) => {
        const labels = broker_data.x;
        const data = broker_data.y;
        const latestUpdate = labels[labels.length - 1]
        const brokerBalance = broker_data.balance;
        const brokerChangePer = parseFloat(broker_data.changePer);
        clr = 'black'
        if (brokerChangePer > 0) clr = 'forestgreen';
        if (brokerChangePer < 0) clr = 'red';

        document.getElementById("BALANCE").innerHTML = `<h1 style="display:inline">${brokerBalance} </h1> <h2 style="display:inline">  $</h2>`;
        document.getElementById("CHANGE").innerHTML = `<h1 style="display:inline; color:${clr}">${brokerChangePer} </h1> <h2 style="display:inline">  %</h2>`;
        document.getElementById("UPD").innerHTML = `Updated At ${latestUpdate} GMT`;


        draw(labels, data);
    });

async function brokerData() {
    const response = await fetch('/broker_data');
    const data = await response.json();


    console.log(data);
    // const tst = document.getElementById("api");
    // tst.innerHTML = data.days_since_joined;
    return data;
}
async function draw(labels, data) {

    // Area Chart Example
    var ctx = document.getElementById("myAreaChart");
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels, //["Mar 1", "Mar 2", "Mar 3", "Mar 4", "Mar 5", "Mar 6", "Mar 7", "Mar 8", "Mar 9", "Mar 10", "Mar 11", "Mar 12", "Mar 13"],
            datasets: [{
                label: "Capital",
                lineTension: 0.3,
                hoverBackgroundColor: "rgba(136, 176, 75)",

                // backgroundColor: "rgba(2,117,216,0.2)",
                borderColor: "rgba(2,117,216,1)",
                pointRadius: 5,
                pointBackgroundColor: "rgba(2,117,216,1)",
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(2,117,216,1)",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: data //[10000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849, 24159, 32651, 31984, 38451],
            }],
        },
        options: {
            scales: {
                xAxes: [{
                    time: {
                        unit: 'date'
                    },
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 50000
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 40000,
                        maxTicksLimit: 10
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, .125)",
                    }
                }],
            },
            legend: {
                display: false
            }
        }
    });
}