from django.db import models
from django.contrib.auth.models import User

class Tenant(models.Model):
    name = models.CharField(max_length=200)
    subdomain = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=[('caregiver','caregiver'),('family','family'),('admin','admin')])

class CareNote(models.Model):
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    # optional attachments -> use S3 key or FileField

class Summary(models.Model):
    care_note = models.OneToOneField(CareNote, on_delete=models.CASCADE)
    text_en = models.TextField(null=True, blank=True)
    text_ja = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    generated = models.BooleanField(default=False)
