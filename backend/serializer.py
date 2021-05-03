from rest_framework import serializers

from .models import Plan

#https://stackoverflow.com/questions/31690991/uploading-base64-images-using-modelserializers-in-django-django-rest-framework

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = ('id', 'name', 'content_image', 'content_json')
