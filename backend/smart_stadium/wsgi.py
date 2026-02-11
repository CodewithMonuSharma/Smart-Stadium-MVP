import os
from django.core.wsgi import get_wsgi_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'smart_stadium.settings')
application = get_wsgi_application()

handler = application   # ⭐⭐⭐ THIS LINE ADD