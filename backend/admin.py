from django.contrib import admin

# Register your models here.
from backend.models import Plan

class PlanAdmin(admin.ModelAdmin):
    readonly_fields = ["uuid"]



admin.site.register(Plan, PlanAdmin)