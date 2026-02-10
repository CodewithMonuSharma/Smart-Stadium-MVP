from rest_framework import serializers
from .models import *

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

class CrowdZoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = CrowdZone
        fields = '__all__'

class EnergyMeterSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnergyMeter
        fields = '__all__'

class MerchandiseItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MerchandiseItem
        fields = '__all__'

class SystemLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemLog
        fields = '__all__'
