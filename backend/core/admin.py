from django.contrib import admin
from .models import Tenant, UserProfile, CareNote, Summary

# Register your models here.
admin.site.register([Tenant, UserProfile, CareNote, Summary])