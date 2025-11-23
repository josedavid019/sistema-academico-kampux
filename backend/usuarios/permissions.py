from rest_framework import permissions

class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Permite modificar/eliminar solamente al propietario (propio user) o superuser/admin.
    Lectura permitida si es GET (puedes ajustar).
    """
    def has_object_permission(self, request, view, obj):
        # Permitir GET para todos (si quieres restringir, cambia aquí)
        if request.method in permissions.SAFE_METHODS:
            return True

        # Si el request.user no está autenticado -> negar
        # Nota: en tu proyecto 'Usuario' no es User de Django, así que usamos sesión guardada:
        # Esperamos que request.session['user_id'] o request.user esté configurado. 
        # Para ser robustos intentamos extraer user id de session.
        session_user = None
        try:
            session_user = getattr(request, 'user', None)
        except Exception:
            session_user = None

        # Si request.user es instancia de tu modelo Usuario (raro), comparamos
        if session_user and getattr(session_user, 'id', None) == getattr(obj.user, 'id', None):
            return True

        # Si tienes un indicador de admin (ejemplo: Administrador model) podrías comprobarlo;
        # por simplicidad, permitimos si existe en session 'user_role' == 'administrador'
        user_role = request.session.get('user_role')

        if user_role in ['administrador', 'coordinador']:
            return True

        return False
