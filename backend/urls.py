from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from . import views
from .views import UpdatePlanView

app_name = "backend"
router = routers.DefaultRouter()
router.register(r'plans', views.PlanView, 'plan')

urlpatterns = [
    path('api/', include(router.urls)),
    path('create_plan/', views.CreatePlanView.as_view(), name='create_plan'),
    path('update/plan/<int:plan_id>/', UpdatePlanView.as_view(), name='plan'),


]