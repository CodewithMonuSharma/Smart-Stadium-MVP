from django.db import models
from django.utils import timezone

class Event(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    status = models.CharField(max_length=20, default='upcoming') # upcoming, active, finished
    expected_attendance = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Ticket(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='tickets')
    customer_name = models.CharField(max_length=100)
    ticket_code = models.CharField(max_length=50, unique=True)
    is_validated = models.BooleanField(default=False)
    entry_time = models.DateTimeField(null=True, blank=True)
    fraud_score = models.FloatField(default=0.0)
    seat_number = models.CharField(max_length=20)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.ticket_code} - {self.customer_name}"

class CrowdZone(models.Model):
    name = models.CharField(max_length=100)
    capacity = models.IntegerField()
    current_count = models.IntegerField(default=0)
    status = models.CharField(max_length=20, default='green') # green, yellow, red
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class EnergyMeter(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    current_usage_kw = models.FloatField(default=0.0)
    status = models.CharField(max_length=20, default='optimal') # optimal, high, critical
    last_reading_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class MerchandiseItem(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.IntegerField(default=0)
    sold_count = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class SystemLog(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    module = models.CharField(max_length=50)
    level = models.CharField(max_length=20) # INFO, WARNING, ERROR
    message = models.TextField()

    def __str__(self):
        return f"{self.timestamp} - {self.module}: {self.message}"
