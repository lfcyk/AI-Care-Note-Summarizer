from rest_framework import viewsets, permissions
from .models import CareNote
from .serializers import CareNoteSerializer
from rest_framework.response import Response
from rest_framework import status
from .summarize import summarize_text
import json
from rest_framework.decorators import action

class CareNoteViewSet(viewsets.ModelViewSet):
    queryset = CareNote.objects.all()
    serializer_class = CareNoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        
        if(self.request.user.userprofile.role == 'caregiver' or self.request.user.userprofile.role == 'admin'):
            # family can only see notes from caregivers
            return CareNote.objects.filter(tenant=self.request.user.userprofile.tenant)
        raise PermissionError("Unauthorized access.")

    def perform_create(self, serializer):
        if(self.request.user.userprofile.role != 'caregiver' and self.request.user.userprofile.role != 'admin'):
            raise PermissionError("Only caregivers can create care notes.")
        note = serializer.save(author=self.request.user, tenant=self.request.user.userprofile.tenant)
        
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

    # 🆕 Regenerate endpoint
    @action(detail=True, methods=["post"])
    def regenerate_summary(self, request, pk=None):
        note = self.get_object()
        if note.author != request.user:
            return Response({"error": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

        summary = summarize_text(note.text)
        data = json.loads(summary)
        note.summary_en = data.get("en", "").strip()
        note.summary_jp = data.get("jp", "").strip()
        note.save()
        return Response(
            {"message": "Summary regenerated successfully"},
            status=status.HTTP_200_OK,
        )
            
