import datetime
import pyEX as p
from django.utils import timezone
from .models import *

import os
import json
import time
# SETTING CREDINTIALS FROM ENVIRONMENT AND INITIALIZING AGENT
KEY = os.environ.get("IEX_KEY")
C = p.Client(api_token=KEY, version="stable")

def get_symbols():
    cur_path = os.path.dirname(__file__)
    with open(cur_path+"/assets/symbols.JSON", 'r') as infile:
        data = json.load(infile)
    return data


def get_company(symbol):
    symbol = str(symbol).strip().lower()
    data = C.company(symbol)
    data['logo'] = C.logo(symbol)
    return data
# get_company("aapl")




def stats(symbol):
    
    # data = C.chart(symbol, timeframe="1d")
    # chart = [{'date':obj['date'], 'close': obj['close']} for obj in data]
    # last = time.ctime(data[-1]['updated']/10**3)
    # return {'chart': chart, 'lastUpdated': last}
    return

# print(stats('amzn'))
# stats('amzn')
def getDays(start):
    end = timezone.now()
    delta = end - start
    days = []
    for i in range(delta.days + 1):
        days.append((start + datetime.timedelta(days=i)).strftime("%b %-d"))
    return days
# getDays(datetime.datetime(2020, 10, 1, 0, 0, 0, 0))

# get latest price sum for punch of stockes
def quote(stockNames):
    seen = {}
    aggr = 0
    for name in stockNames:
        if name in seen:
            aggr += seen[name]
        else:
            price = C.quote(name)['iexRealtimePrice']
            seen[name] = price
            aggr += price
    return aggr    


# return y axis 
def getBalance(username):
    user = User.objects.get(username=username)
    stocks = user.serialize()['stocks'] 
    stock_names = [stock['symbol'] for stock in stocks]

    balance = quote(stock_names) + user.current_balance
    return balance
