import hashlib
import json

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

# Create your views here.
from django.views import View

from backend.models import Plan


class IndexView(View):
    def get(self, request):
        return render(request, 'frontend/polotno_designer.html', {"context_data": json.dumps({"hello": "world"})})


class TestView(View):
    def get(self, request):
        return HttpResponse("OK")


class ViewPlanView(View):
    def get(self, request, plan_id):
        plan_obj = Plan.objects.get(id=plan_id)

        return render(request, 'frontend/polotno_designer.html',
                      {"context_data": json.dumps({"id": plan_obj.id, "plan_json": plan_obj.content_json})})


class PyPortalPlanView(View):
    def get(self, request, plan_id):
        plan_obj = Plan.objects.get(id=plan_id)

        img_md5 = hashlib.md5(open(plan_obj.content_image.path, 'rb').read()).hexdigest()
        return JsonResponse(
            {
                "image": plan_obj.content_image.name,
                "md5": img_md5
            })
