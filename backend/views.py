import base64
import json
import os

from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets

from pyportal_signage_system.settings import MEDIA_ROOT
from .models import Plan
from .serializer import PlanSerializer
from django.core.files.base import ContentFile, File
from PIL import Image
from io import BytesIO
import base64

class PlanView(viewsets.ModelViewSet):
    serializer_class = PlanSerializer
    queryset = Plan.objects.all()


class CreatePlanView(View):
    def post(self, request):
        #print(request.POST.get("image_base64"))

        #name = request.POST.get("name")
        json_data = request.POST.get("json")
        print(json_data)
        format, imgstr = request.POST.get("image_base64").split(';base64,')
        ext = format.split('/')[-1]

        print(format)
        print(ext)
        im = Image.open(BytesIO(base64.b64decode(imgstr)))

        #data = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)  # You can save this as file instance.

        blob = BytesIO()
        im = im.convert(mode="P", palette=Image.WEB)
        im.save(blob, "bmp")

        new_plan = Plan(name="Posted Plan")
        new_plan.content_image.save('temp.bmp', File(blob), save=True)

        new_plan.content_json = json_data

        new_plan.save()
        return JsonResponse({"success": True})

class UpdatePlanView(View):
    def post(self, request, plan_id):
        json_data = request.POST.get("json")
        print(json_data)
        format, imgstr = request.POST.get("image_base64").split(';base64,')
        ext = format.split('/')[-1]

        im = Image.open(BytesIO(base64.b64decode(imgstr)))
        blob = BytesIO()
        im = im.convert(mode="P", palette=Image.WEB)
        im.save(blob, "bmp")

        #content_image = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)  # You can save this as file instance.

        plan = Plan.objects.get(id=plan_id)
        plan.content_json = json_data
        file_name = plan.content_image.name.split("/")[-1]
        print("filename: {}".format(file_name))
        print("deleting: {}".format(MEDIA_ROOT + "/content/" + file_name))
        os.remove(MEDIA_ROOT + "/content/" + file_name)
        plan.content_image.save(file_name, File(blob), save=True)
        plan.save()
        return JsonResponse({'success': True})
