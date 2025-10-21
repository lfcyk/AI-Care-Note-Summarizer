from django.contrib import admin
from .models import Tenant, UserProfile, CareNote
# Register your models here.
admin.site.register([Tenant, UserProfile, CareNote])