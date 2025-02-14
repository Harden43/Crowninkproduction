from django.contrib import admin
from .models import Beat

@admin.register(Beat)
class BeatAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'bpm', 'key', 'created_at')
    search_fields = ('title', 'key')
    list_filter = ('created_at',)