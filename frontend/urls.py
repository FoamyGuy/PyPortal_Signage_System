
from django.urls import path, include


from . import views
from .views import IndexView, TestView, ViewPlanView, PyPortalPlanView

app_name = "frontend"




urlpatterns = [
    path('', IndexView.as_view()),
    path('test/', TestView.as_view(), name="test"),
    path('view/plan/<int:plan_id>/', ViewPlanView.as_view(), name='plan'),
    path('pyportal/plan/<int:plan_id>/', PyPortalPlanView.as_view(), name='pyportal_plan'),

]