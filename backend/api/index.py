import os
import sys

# add project path
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "smart_stadium.settings")

from django.core.wsgi import get_wsgi_application

app = get_wsgi_application()
