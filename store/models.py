from django.db import models

class Beat(models.Model):
    title = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    bpm = models.IntegerField()
    key = models.CharField(max_length=10)
    cover_art = models.ImageField(upload_to='beats/covers/')
    audio_file = models.FileField(upload_to='beats/audio/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title