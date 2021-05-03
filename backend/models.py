from django.db import models

# Create your models here.
class Plan(models.Model):
    name = models.CharField(max_length=128)
    content_image = models.FileField(upload_to="content", blank=True, default='')
    content_json = models.JSONField(blank=True, default='')

    def __str__(self):
        return self.name