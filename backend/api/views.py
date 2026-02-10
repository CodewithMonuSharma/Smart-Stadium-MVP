from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.db.models import Sum, F
from .models import *
from .serializers import *
from . import ai_services
import random
import datetime

# Dashboard: Stats
class DashboardDataView(APIView):
    def get(self, request):
        active_events = Event.objects.filter(status='active').count()
        total_occupancy = CrowdZone.objects.aggregate(Sum('current_count'))['current_count__sum'] or 0
        total_capacity = CrowdZone.objects.aggregate(Sum('capacity'))['capacity__sum'] or 1 # avoid div by zero
        
        occupancy_pct = int((total_occupancy / total_capacity) * 100) if total_capacity > 0 else 0
        system_health = random.randint(90, 100)
        
        # Ticketing Summary
        tickets_sold = Ticket.objects.count()
        fraud_alerts = Ticket.objects.filter(fraud_score__gt=0.8).count()
        
        # Crowd Summary
        critical_zones = CrowdZone.objects.filter(status='red').count()
        
        # Energy Summary
        total_energy = EnergyMeter.objects.aggregate(Sum('current_usage_kw'))['current_usage_kw__sum'] or 0
        
        # Merchandise Summary
        total_merch_items = MerchandiseItem.objects.count()
        total_revenue = MerchandiseItem.objects.all().aggregate(
            revenue=Sum(F('price') * F('sold_count'))
        )['revenue'] or 0
        
        return Response({
            "active_events": active_events,
            "occupancy_percentage": occupancy_pct,
            "system_health": system_health,
            "ticketing": {
                "total_sold": tickets_sold,
                "fraud_alerts": fraud_alerts
            },
            "crowd": {
                "critical_zones": critical_zones,
                "total_zones": CrowdZone.objects.count()
            },
            "energy": {
                "total_usage": round(total_energy, 1)
            },
            "merchandise": {
                "total_revenue": round(total_revenue, 2),
                "total_items": total_merch_items
            }
        })

# Event
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

# Ticketing
class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    
    def perform_create(self, serializer):
        # AI prediction on create
        code = serializer.validated_data.get('ticket_code', '')
        score = ai_services.predict_fraud_score(code)
        serializer.save(fraud_score=score)

class ValidateTicket(APIView):
    def post(self, request):
        code = request.data.get('code')
        try:
            ticket = Ticket.objects.get(ticket_code=code)
        except Ticket.DoesNotExist:
            return Response({"valid": False, "reason": "Ticket not found"}, status=404)
        
        # Fraud check
        if ticket.fraud_score > 0.8:
            return Response({"valid": False, "reason": "High fraud risk detected by AI"}, status=403)
            
        if ticket.is_validated:
             return Response({"valid": False, "reason": "Already scanned"}, status=400)
             
        ticket.is_validated = True
        ticket.entry_time = timezone.now()
        ticket.save()
        return Response({"valid": True, "details": TicketSerializer(ticket).data})

# Crowd
class CrowdZoneViewSet(viewsets.ModelViewSet):
    queryset = CrowdZone.objects.all()
    serializer_class = CrowdZoneSerializer

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data
        
        # Add AI prediction to response
        for zone in data:
            prediction = ai_services.predict_crowd_levels(zone['capacity'], zone['current_count'])
            zone['ai_prediction'] = prediction
        return Response(data)

# Energy
class EnergyMeterViewSet(viewsets.ModelViewSet):
    queryset = EnergyMeter.objects.all()
    serializer_class = EnergyMeterSerializer
    
    def list(self, request):
        queryset = self.get_queryset()
        total_usage = queryset.aggregate(Sum('current_usage_kw'))['current_usage_kw__sum'] or 0
        
        # Format meters for frontend expectations
        meters_data = []
        for meter in queryset:
            meters_data.append({
                "id": meter.id,
                "zone": meter.location,
                "type": meter.name,
                "current_reading": meter.current_usage_kw,
                "status": meter.status
            })
            
        # Mock history data for the graph
        history = [
            {"time": "09:00", "usage": max(50, total_usage * 0.4), "prediction": total_usage * 0.45},
            {"time": "11:00", "usage": max(100, total_usage * 0.6), "prediction": total_usage * 0.65},
            {"time": "13:00", "usage": max(200, total_usage * 0.9), "prediction": total_usage * 0.85},
            {"time": "15:00", "usage": total_usage, "prediction": total_usage * 1.1},
            {"time": "17:00", "usage": max(150, total_usage * 0.8), "prediction": total_usage * 0.75},
            {"time": "19:00", "usage": max(300, total_usage * 1.2), "prediction": total_usage * 1.3},
        ]
        
        return Response({
            "summary": {
                "total_usage": round(total_usage, 1),
            },
            "history": history,
            "meters": meters_data
        })
    
    @action(detail=True, methods=['get'])
    def forecast(self, request, pk=None):
        meter = self.get_object()
        forecast_data = ai_services.forecast_energy_usage(meter.current_usage_kw)
        return Response({"forecast": forecast_data})

# Merchandise
class MerchandiseItemViewSet(viewsets.ModelViewSet):
    queryset = MerchandiseItem.objects.all()
    serializer_class = MerchandiseItemSerializer

# Logs
class SystemLogViewSet(viewsets.ModelViewSet):
    queryset = SystemLog.objects.all()
    serializer_class = SystemLogSerializer

class GenerateMockData(APIView):
    def post(self, request):
        # Create some zones, meters, etc if empty
        if CrowdZone.objects.count() == 0:
            CrowdZone.objects.create(name="North Gate A", capacity=500, current_count=120, status='green')
            CrowdZone.objects.create(name="South Stand", capacity=2000, current_count=1800, status='red')
            CrowdZone.objects.create(name="VIP Lounge", capacity=100, current_count=80, status='yellow')
        
        if EnergyMeter.objects.count() == 0:
            EnergyMeter.objects.create(name="Main Lighting", location="Roof", current_usage_kw=450.5, status='optimal')
            EnergyMeter.objects.create(name="HVAC System", location="Basement", current_usage_kw=320.2, status='high')
        
        if Event.objects.count() == 0:
            e = Event.objects.create(
                name="Championship Final", 
                start_time=timezone.now(), 
                end_time=timezone.now() + datetime.timedelta(hours=3),
                status="active",
                expected_attendance=50000
            )
            # Create some dummy tickets
            for i in range(10):
                Ticket.objects.create(
                    event=e, 
                    customer_name=f"Fan {i}", 
                    ticket_code=f"TICKET-{i}", 
                    price=50.00
                )

        if MerchandiseItem.objects.count() == 0:
            MerchandiseItem.objects.create(name="Team Jersey", category="Apparel", price=89.99, stock_quantity=500, sold_count=120)
            MerchandiseItem.objects.create(name="Cap", category="Apparel", price=29.99, stock_quantity=200, sold_count=45)
            
        return Response({"status": "Mock data generated successfully"})
