from django.contrib.auth.models import User
from django.db import models
import uuid

# Create your models here.
from django.db.models import CASCADE


class Plan(models.Model):
    name = models.CharField(max_length=128)
    content_image = models.FileField(upload_to="content", blank=True, default='')
    content_json = models.JSONField(blank=True, default=dict)

    user = models.ForeignKey(User, on_delete=CASCADE, null=True, blank=True)

    uuid = models.UUIDField(default=uuid.uuid4, editable=False)

    def __str__(self):
        if self.user:
            return "{} - {}".format(self.user.username, self.name)
        else:
            return  self.name