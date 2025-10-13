from rest_framework import serializers
from .models import CareNote, Summary, UserProfile, Tenant
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from djoser.serializers import UserSerializer as BaseUserSerializer
from rest_framework import serializers
from django.contrib.auth.models import User

class CareNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareNote
        fields = ['id','text','created_at']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [ 'tenant', 'role']

class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = BaseUserSerializer.Meta.fields

class CustomUserCreateSerializer(BaseUserCreateSerializer):
    tenant = serializers.PrimaryKeyRelatedField(queryset=Tenant.objects.all(), required=True, write_only=True)
    role = serializers.ChoiceField(choices=[('caregiver','caregiver'),('family','family'),('admin','admin')], required=True, write_only=True)

    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = BaseUserCreateSerializer.Meta.fields + ('tenant', 'role')

    def validate(self, attrs):
        # print(f"Before pop: {attrs}")
        attrs.pop('tenant', None)
        attrs.pop('role', None)
        # print(f"After pop: {attrs}")
        attrs = super().validate(attrs)
        return attrs

    def create(self, validated_data):
        # print(f"Validated data: {validated_data}")
        tenantId = self.initial_data.get('tenant')
        tenant = Tenant.objects.get(id=tenantId) if tenantId else None
        role = self.initial_data.get('role')
        user = super().create(validated_data)
        UserProfile.objects.create(user=user, tenant=tenant, role=role)
        return user