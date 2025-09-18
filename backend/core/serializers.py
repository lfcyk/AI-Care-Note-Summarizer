from rest_framework import serializers
from .models import CareNote, Summary

class CareNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareNote
        fields = ['id','text','created_at']
