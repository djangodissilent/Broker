import json
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.http import request
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
from math import *
from .models import *
from .helpers import *


# add profile summmary 
def index(request):
    if request.user.is_authenticated:
        return render(request, "broker/index.html")
    else:
        return HttpResponseRedirect(reverse("login"))

def corpRedirect(request, symbol):
    data = get_company(symbol)
    return render(request, "broker/corp.html",{
        'symbol': symbol,
        'data': data,
    })


# API_METHODS
@login_required
def broker_data(request):
    username = request.user.username
    user = User.objects.get(username=username)
    s = user.serialize()
    balance = getBalance(username)
    dataPoint = DataPoint(y=balance, owner=user)
    dataPoint.save()
    
    x = [point.x.strftime("%b %-d %Y, %-I:%M %p") for point in  DataPoint.objects.filter(owner=user)]
    y = [point.y for point in DataPoint.objects.filter(owner=user)]

    changePer = round(((balance - user.initial_balance) / user.initial_balance )*100, 4)
    data = {'x': x, 'y': y, 'balance': round(balance, 2), 'changePer':changePer}
    return JsonResponse(data, safe=False)

def symbols(request):
    data = get_symbols();
    return JsonResponse(data, safe=False) 

def corpData(request, symbol):
    # data = stats(symbol=symbol)
    # Smax =  round(max([d['close'] for d in data ]))

    # data += [((Smax // (10**floor(log10(Smax)))) + 1) * 10**floor(log10(Smax))]
    # return JsonResponse({'data':data.chart, 'last':data.last, 'sMax': data.sMax}, safe=False)
    return JsonResponse({}, safe=0)

# buy a stock
@csrf_exempt
@login_required
def buy(request):
    if request.method != 'POST':
        return JsonResponse({"error": "POST required."}, status=400)
    user = request.user

    userSerial = user.serialize()
    data = json.loads(request.body)
    
    symbol = data.get('symbol', "")
    price = data.get('price', "")
    message = ''
    if(user.current_balance >= price):

        stock = Stock(symbol=symbol, buy_price=price, owner=user)
        stock.save()
        # save datapoint
        # BOTTLE NECK TAKES ALOT OF TIME
        # inORDER TO [QUOTE] EACH STOCK
        dataPoint = DataPoint(y=getBalance(user.username), owner=user)
        dataPoint.save()
    
        user.current_balance -= price
        user.save()

        # print("\n", "Done saving User .." , '\n')

        message = 'Purchased successfully'
    else:
        message = 'Transaction Failed'    


    return JsonResponse({'message': message}, safe=0)



# authentication functionality
def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "broker/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "broker/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "broker/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "broker/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "broker/register.html")