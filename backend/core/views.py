from rest_framework import viewsets, permissions
from .models import CareNote
from .serializers import CareNoteSerializer
from .tasks import generate_summary_task
from rest_framework import generics
from django.contrib.auth.models import User
from .models import UserProfile
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status

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
        if(self.request.user.userprofile.role != 'caregiver' or self.request.user.userprofile.role != 'admin'):
            raise PermissionError("Only caregivers can create care notes.")
        note = serializer.save(author=self.request.user, tenant=self.request.tenant)
        # enqueue background job to generate summary
        generate_summary_task.delay(note.id)

# class UserRegistrationView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

#     def create(self, request, *args, **kwargs):
#         tenant = request.data.get('tenant')
#         role = request.data.get('role')
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
#         UserProfile.objects.create(user=user, tenant=tenant, role=role)
#         headers = self.get_success_headers(serializer.data)
#         return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)