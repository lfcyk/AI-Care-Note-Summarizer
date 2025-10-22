from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CareNoteViewSet, FamilyCareNotesView

router = DefaultRouter()
router.register(r'carenotes', CareNoteViewSet, basename='carenotes')

urlpatterns = [
    path('', include(router.urls)),
    path('family/carenotes/', FamilyCareNotesView.as_view(), name='family-carenotes'),
]