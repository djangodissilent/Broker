
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('info/<str:symbol>', views.corpRedirect, name="corpRedirect"),


    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    #API Routes
    path("broker_data", views.broker_data, name="broker_data"),
    path("symbols", views.symbols, name="symbols"),
    path("corpData/<str:symbol>", views.corpData, name="corpData"),
    path("buy", views.buy, name="buy"),
    path("sell", views.sell, name="sell"),

]