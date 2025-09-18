from rest_framework import viewsets, permissions
from .models import CareNote
from .serializers import CareNoteSerializer
from .tasks import generate_summary_task

class CareNoteViewSet(viewsets.ModelViewSet):
    queryset = CareNote.objects.all()
    serializer_class = CareNoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        tenant = getattr(self.request, 'tenant', None)
        return CareNote.objects.filter(tenant=tenant)

    def perform_create(self, serializer):
        note = serializer.save(author=self.request.user, tenant=self.request.tenant)
        # enqueue background job to generate summary
        generate_summary_task.delay(note.id)
