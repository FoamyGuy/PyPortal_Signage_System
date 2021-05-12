from django.contrib.auth.decorators import login_required
from django.urls import path, include


from . import views
from .views import IndexView, ViewPlanView, PyPortalPlanView, CreatePlanView, PyPortalPlanUUIDView

app_name = "frontend"




urlpatterns = [
    path('', IndexView.as_view()),
    path('view/plan/<int:plan_id>/', login_required(ViewPlanView.as_view()), name='plan'),
    path('create/plan/', login_required(CreatePlanView.as_view()), name='create_plan'),
    path('pyportal/plan/<int:plan_id>/', PyPortalPlanView.as_view(), name='pyportal_plan'),
    path('pyportal/plan/uuid/<uuid:plan_uuid>/', PyPortalPlanUUIDView.as_view(), name='pyportal_plan_uuid'),

]