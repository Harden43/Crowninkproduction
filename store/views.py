from django.shortcuts import render
from .models import Beat

def home(request):
    beats = Beat.objects.all().order_by('-created_at')
    return render(request, 'store/home.html', {'beats': beats})