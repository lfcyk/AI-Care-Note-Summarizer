from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Tenant(models.Model):
    name = models.CharField(max_length=200)
    subdomain = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=[('caregiver','caregiver'),('family','family'),('admin','admin')])

class CareNote(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    family = models.ForeignKey(User, on_delete=models.CASCADE, related_name="family", null=True, blank=True)  # optional
    summary_en = models.TextField(null=True, blank=True)
    summary_jp = models.TextField(null=True, blank=True)