d = [{ 'date': '2019-12-23', 'close': 1793 }, { 'date': '2019-12-24', 'close': 1789.21 }, { 'date': '2019-12-26', 'close': 1868.77 }, { 'date': '2019-12-27', 'close': 1869.8 }, { 'date': '2019-12-30', 'close': 1846.89 }, { 'date': '2019-12-31', 'close': 1847.84 }, { 'date': '2020-01-02', 'close': 1898.01 }, { 'date': '2020-01-03', 'close': 1874.97 }, { 'date': '2020-01-06', 'close': 1902.88 }, { 'date': '2020-01-07', 'close': 1906.86 }, { 'date': '2020-01-08', 'close': 1891.97 }, { 'date': '2020-01-09', 'close': 1901.05 }, { 'date': '2020-01-10', 'close': 1883.16 }, { 'date': '2020-01-13', 'close': 1891.3 }, { 'date': '2020-01-14', 'close': 1869.44 }, { 'date': '2020-01-15', 'close': 1862.02 }, { 'date': '2020-01-16', 'close': 1877.94 }, { 'date': '2020-01-17', 'close': 1864.72 }, { 'date': '2020-01-21', 'close': 1892 }, { 'date': '2020-01-22', 'close': 1887.46 }, { 'date': '2020-01-23', 'close': 1884.58 }];
// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';


const symbol = document.getElementById("Xsymb").innerText.toLowerCase();


companyData()
    .then((cData) => {
        //USE cDATA
        // lastUpdate = cData.last;
        //last PRICE GOES HERE
        // const price = document.getElementById("PRICE");
        //price.innerText = cData['price]

        lastUpdate = d[d.length - 1]['data'];
        document.getElementById("lastUpdated").innerText = lastUpdate;
        // document.getElementById("lastUpdated1").innerText = lastUpdate;


        // sMax = d.sMax;
        sMax = 4000;
        const lbls = d.map(obj => obj.date);
        const data = d.map(obj => obj.close);

        console.log(data);
        console.log(lbls);
        drawStock(lbls, data, sMax);
    });

async function companyData() {
    const response = await fetch(`/corpData/${symbol}`);
    console.log(response);
    const data = await response.json();
    // const tst = document.getElementById("api");
    // tst.innerHTML = data.days_since_joined;
    return data;
}
async function drawStock(l, d, Smax) {
    // Area Chart Example
    var ctx = document.getElementById("corp");
    var myLineChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: l, //["Mar 1", "Mar 2", "Mar 3", "Mar 4", "Mar 5", "Mar 6", "Mar 7", "Mar 8", "Mar 9", "Mar 10", "Mar 11", "Mar 12", "Mar 13"],
            datasets: [{
                label: "Stock Price",
                lineTension: 0.3,
                hoverBackgroundColor: "rgba(253,0,0,1)",
                backgroundColor: "rgba(2,117,216,0.5)",
                borderColor: "rgba(2,117,216,1)",
                pointRadius: 4,
                pointBackgroundColor: "rgba(2,117,216,1)",
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(2,117,216,1)",
                pointHitRadius: 5,
                pointBorderWidth: 2,
                data: d //[10000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849, 24159, 32651, 31984, 38451],
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
                        max: Smax,
                        maxTicksLimit: 5
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, .125)",
                    }
                }],
            },
            legend: {
                display: 1
            }
        }
    });
}