import os
import sys
from django.core.wsgi import get_wsgi_application

# ⭐ IMPORTANT for Vercel (adds project root to path)
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "smart_stadium.settings")

application = get_wsgi_application()

# ⭐ Vercel requires this
handler = application
