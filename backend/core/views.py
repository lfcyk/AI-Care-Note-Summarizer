from rest_framework import viewsets, permissions
from .models import CareNote
from .serializers import CareNoteSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from .models import UserProfile
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from .summarize import summarize_text
import json

class CareNoteViewSet(viewsets.ModelViewSet):
    queryset = CareNote.objects.all()
    serializer_class = CareNoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        tenant = getattr(self.request, 'tenant', None)
        if(self.request.user.userprofile.role == 'caregiver' or self.request.user.userprofile.role == 'admin'):
            # family can only see notes from caregivers
            return CareNote.objects.filter(tenant=tenant)
        raise PermissionError("Unauthorized access.")

    def perform_create(self, serializer):
        if(self.request.user.userprofile.role != 'caregiver' and self.request.user.userprofile.role != 'admin'):
            raise PermissionError("Only caregivers can create care notes.")
        note = serializer.save(author=self.request.user)
        
        try:
            summary = summarize_text(note.text)
            # Assuming the summary returns both English and Japanese separated by a delimiter
            data = json.loads(summary)
            note.summary_en = data.get("en", "").strip()
            note.summary_jp = data.get("jp", "").strip()
            note.save()
        except Exception as e:
            # Log the error but do not block note creation
            print(f"Error generating summary: {e}")
            
