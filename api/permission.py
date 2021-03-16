from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        print('Tiene Permiso')

        if request.user:
            if request.user.is_superuser:
                return True
            else:
                return False
        else:
            return False