from django.contrib import admin
from .models import Event, Ticket, CrowdZone, EnergyMeter, MerchandiseItem, SystemLog

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'start_time', 'end_time', 'status', 'expected_attendance')
    list_filter = ('status',)
    search_fields = ('name',)

@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = ('ticket_code', 'customer_name', 'event', 'seat_number', 'is_validated', 'fraud_score')
    list_filter = ('is_validated', 'event')
    search_fields = ('ticket_code', 'customer_name')

@admin.register(CrowdZone)
class CrowdZoneAdmin(admin.ModelAdmin):
    list_display = ('name', 'capacity', 'current_count', 'status')
    list_filter = ('status',)
    search_fields = ('name',)

@admin.register(EnergyMeter)
class EnergyMeterAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'current_usage_kw', 'status')
    list_filter = ('status',)
    search_fields = ('name', 'location')

@admin.register(MerchandiseItem)
class MerchandiseItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'stock_quantity', 'sold_count')
    list_filter = ('category',)
    search_fields = ('name',)

@admin.register(SystemLog)
class SystemLogAdmin(admin.ModelAdmin):
    list_display = ('timestamp', 'module', 'level', 'message')
    list_filter = ('module', 'level')
    search_fields = ('message',)
