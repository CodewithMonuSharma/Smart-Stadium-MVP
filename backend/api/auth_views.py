from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie

@api_view(['POST'])
@permission_classes([AllowAny])
def api_register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not username or not password or not email:
        return Response({"success": False, "error": "All fields are required"}, status=400)
    
    if User.objects.filter(username=username).exists():
        return Response({"success": False, "error": "Username already exists"}, status=400)
    
    user = User.objects.create_user(username=username, email=email, password=password)
    login(request, user)
    return Response({
        "success": True,
        "user": {"username": user.username, "email": user.email}
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def api_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({
            "success": True, 
            "user": {"username": user.username, "email": user.email}
        })
    return Response({"success": False, "error": "Invalid credentials"}, status=400)

@api_view(['POST'])
def api_logout(request):
    logout(request)
    response = Response({"success": True})
    response.delete_cookie('sessionid')
    response.delete_cookie('csrftoken')
    return response

@api_view(['GET'])
@ensure_csrf_cookie
def get_csrf_token(request):
    return Response({'csrfToken': get_token(request)})

@api_view(['GET'])
@ensure_csrf_cookie
def get_user(request):
    if request.user.is_authenticated:
        return Response({
            "is_authenticated": True, 
            "user": {"username": request.user.username, "email": request.user.email}
        })
    return Response({"is_authenticated": False})
