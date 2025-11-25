from django.contrib import admin
from django.utils.html import format_html

from . import models


class RoleFilter(admin.SimpleListFilter):
	title = "Rol"
	parameter_name = "rol"

	def lookups(self, request, model_admin):
		return (
			("docente", "Docente"),
			("administrador", "Administrador"),
		)

	def queryset(self, request, queryset):
		if self.value() == "docente":
			return queryset.filter(docente_profile__isnull=False)
		if self.value() == "administrador":
			return queryset.filter(administrador_profile__isnull=False)
		return queryset


@admin.register(models.Usuario)
class UsuarioAdmin(admin.ModelAdmin):
	list_display = ("email", "nombre", "apellido", "rol_display", "activo", "created_at")
	search_fields = ("email", "nombre", "apellido", "numero_documento")
	list_filter = (RoleFilter, "activo")
	readonly_fields = ("created_at", "updated_at")
	change_list_template = "admin/usuarios/usuario_change_list.html"

	def get_urls(self):
		from django.urls import path

		urls = super().get_urls()
		custom_urls = [
			path(
				"roles-list/",
				self.admin_site.admin_view(self.roles_list_view),
				name="usuarios_roles_list",
			),
		]
		return custom_urls + urls

	def roles_list_view(self, request):
		from django.template.response import TemplateResponse

		docentes = models.Docente.objects.select_related("user").all()
		estudiantes = models.Estudiante.objects.select_related("user").all()
		administradores = models.Administrador.objects.select_related("user").all()

		context = dict(
			self.admin_site.each_context(request),
			docentes=docentes,
			estudiantes=estudiantes,
			administradores=administradores,
			title="Usuarios por rol",
		)

		return TemplateResponse(request, "admin/usuarios/roles_list.html", context)

	def rol_display(self, obj):
		roles = []
		if hasattr(obj, "docente_profile") and obj.docente_profile is not None:
			roles.append("Docente")
		if hasattr(obj, "administrador_profile") and obj.administrador_profile is not None:
			roles.append("Administrador")
		if hasattr(obj, "coordinador_profile") and obj.coordinador_profile is not None:
			roles.append("Coordinador")
		if hasattr(obj, "estudiante_profile") and obj.estudiante_profile is not None:
			roles.append("Estudiante")
		if not roles:
			return "-"
		return ", ".join(roles)

	rol_display.short_description = "Rol(es)"


@admin.register(models.Docente)
class DocenteAdmin(admin.ModelAdmin):
	list_display = ("user_email", "user_nombre", "activo", "created_at")
	search_fields = ("user__email", "user__nombre", "user__apellido")
	list_filter = ("activo",)

	def user_email(self, obj):
		return obj.user.email

	def user_nombre(self, obj):
		return f"{obj.user.nombre or ''} {obj.user.apellido or ''}".strip()


@admin.register(models.Administrador)
class AdministradorAdmin(admin.ModelAdmin):
	list_display = ("user_email", "user_numero_documento", "activo", "created_at")
	search_fields = ("user__email", "user__numero_documento")
	list_filter = ("activo",)

	def user_email(self, obj):
		return obj.user.email

	def user_numero_documento(self, obj):
		return obj.user.numero_documento

