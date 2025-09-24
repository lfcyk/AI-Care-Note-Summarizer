from django.utils.deprecation import MiddlewareMixin
from core.models import Tenant
import threading

_thread_locals = threading.local()

# def get_current_tenant():
#     return getattr(_thread_locals, 'tenant', None)

# class TenantMiddleware(MiddlewareMixin):
#     def process_request(self, request):
#         # Prefer header X-Tenant-Id (useful for API clients), fallback to subdomain
#         tenant_id = request.headers.get('X-Tenant-Id')
#         if not tenant_id:
#             host = request.get_host().split(':')[0]  # example: acme.example.com
#             subdomain = host.split('.')[0] if '.' in host else None
#             if subdomain:
#                 tenant = Tenant.objects.filter(subdomain=subdomain).first()
#             else:
#                 tenant = None
#         else:
#             tenant = Tenant.objects.filter(id=tenant_id).first()

#         _thread_locals.tenant = tenant
#         request.tenant = tenant

#     def process_response(self, request, response):
#         if hasattr(_thread_locals, 'tenant'):
#             del _thread_locals.tenant
#         return response
