
import os
import sys
import django

# Add the project root (backend) to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import CrowdZone

ZONES_DATA = [
    {'name': 'North Stand', 'capacity': 3000, 'current_count': 2010, 'status': 'HIGH'},
    {'name': 'South Stand', 'capacity': 3000, 'current_count': 1680, 'status': 'MODERATE'},
    {'name': 'East Stand', 'capacity': 2500, 'current_count': 1275, 'status': 'MODERATE'},
    {'name': 'West Stand', 'capacity': 2500, 'current_count': 1800, 'status': 'HIGH'},
    {'name': 'VIP Section', 'capacity': 500, 'current_count': 105, 'status': 'LOW'},
    {'name': 'Concourse A', 'capacity': 1000, 'current_count': 400, 'status': 'LOW'},
    {'name': 'Concourse B', 'capacity': 1000, 'current_count': 650, 'status': 'MODERATE'},
    {'name': 'Gate A', 'capacity': 500, 'current_count': 405, 'status': 'CRITICAL'},
    {'name': 'Gate B', 'capacity': 500, 'current_count': 290, 'status': 'MODERATE'},
]

for data in ZONES_DATA:
    zone, created = CrowdZone.objects.get_or_create(name=data['name'], defaults={
        'capacity': data['capacity'],
        'current_count': data['current_count'],
        'status': data['status']
    })
    if not created:
        zone.capacity = data['capacity']
        zone.current_count = data['current_count']
        zone.status = data['status']
        zone.save()
        print(f"Updated zone: {zone.name}")
    else:
        print(f"Created zone: {zone.name}")

print("Crowd data seeded successfully.")
