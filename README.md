# B R O K E R
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


![Alt text](broker/images/scrshots/3.png?raw=true "Title")

### A Stock Trading Website.


# FrameWorks

## Django

![Alt text](broker/images/scrshots/djngo.png?raw=true "Title") 
    
## chart.JS 

![Alt text](broker/images/scrshots/chrt.png?raw=true "Title")





### Features
- [x] **Live Stock Data**
    Levraging the API the user can get realTime date about a given stock price through quoting.


![Alt text](broker/images/scrshots/6.png?raw=true "Title")

- [x] **Company Data**

    Levraging the API the user can get realTime date about a given stock price through quoting.
    
    
    ![Alt text](broker/images/scrshots/4.png?raw=true "Title")

- [x] **Buy Stocks** **[latest data provided by IEX financial API]**

When the user searches for a corporation stock (successful one hopefully) the chosen stock price is quoted through the api and the last price is added to the database as a [dataPoint] representing the user performance on that point in time, this is used later to plot the user history, after that the price is substracted from the users balance and the balance is recorded in the database .
  
- [x] **User Statistics** 

The site provides the users with an uptodate information about their performance by calculating the latest price of every stock the user has and modifying the user balance accordingly this is done every time the user refreshes the page the a to keep a reasonable **TTFB**, (time to first byte), **Hashing** is used to pervent unnecessary API calls
by keeping a **dictionary** of alraedy quoted stocks.


![Alt text](broker/images/scrshots/5.png?raw=true "Title")



- [x] **Mobile Responsive** 

    Broker is mobile friendly this is acheived using the CSS Media quieries
    
    
![Alt text](broker/images/scrshots/7.png?raw=true "Title")


## Samples

![Alt text](broker/images/scrshots/2.png?raw=true "Title")


![Alt text](broker/images/scrshots/8.png?raw=true "Title")


