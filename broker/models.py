from django.db import models
# Create your models here.

from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    joined = models.DateTimeField(auto_now_add=True)
    initial_balance = models.IntegerField(default=15000, null=True)
    current_balance = models.IntegerField(default=15000, null=True)

    def serialize(self):
        stocks = self.stocks.all()
        dps = self.dataPoints.all()
        return {
            'username': self.username,
            'joined': self.joined.strftime("%b %-d %Y, %-I:%M %p"),
            'stocks': [stock.serialize() for stock in stocks],
            'current_balance': self.current_balance,
            'initial_balance': self.initial_balance,
            'dataPoints': [dp.serialize() for dp in dps],
        }
    

class Stock(models.Model):
    symbol = models.CharField(max_length=5)
    buy_date = models.DateTimeField(auto_now_add=True)
    buy_price = models.DecimalField( max_digits=10, decimal_places=5)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='stocks')

    def serialize(self):
        return {
            'id': self.id,
 
            'symbol': self.symbol.upper(),
            'buy_date': self.buy_date.strftime("%b %-d %Y, %-I:%M %p"),
            'owner': self.owner.username,
            'buy_price': self.buy_price,
        }

    def __str__(self):
        return f"{self.symbol} Bought on {self.buy_date} for {self.buy_price}"

# persistent data points
class DataPoint(models.Model):
    x = models.DateTimeField(auto_now_add=True)
    y = models.DecimalField( max_digits=10, decimal_places=5)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='dataPoints')
    
    def serialize(self):
        return {
            'date': self.x.strftime("%b %-d %Y, %-I:%M %p"),
            'owner': self.owner.username,
            'balance': self.y,
        }

