from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CareNoteViewSet

router = DefaultRouter()
router.register(r'carenotes', CareNoteViewSet, basename='carenotes')

urlpatterns = [
    path('', include(router.urls)),
]