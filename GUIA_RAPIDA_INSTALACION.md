# 🚀 Guía Rápida de Instalación

Esta guía te ayudará a poner el proyecto en funcionamiento en 10 minutos.

## ⚡ TL;DR (Para los impacientes)

```powershell
# Terminal 1: Backend
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install django==5.2.8 djangorestframework django-cors-headers
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

# Terminal 2: Frontend
cd frontend
npm install
npm run dev

# Listo! Accede a http://localhost:5173
```

---

## 📋 Requisitos Previos (Verificar)

Abre PowerShell y ejecuta:

```powershell
python --version    # ✅ Debe ser 3.9 o mayor
node --version      # ✅ Debe ser 18 o mayor
npm --version       # ✅ Debe ser 9 o mayor
git --version       # ✅ Debe estar instalado
```

Si alguno falta, descárgalo:
- Python: https://www.python.org/downloads/
- Node.js: https://nodejs.org/
- Git: https://git-scm.com/

---

## 🔧 Instalación Paso a Paso

### Paso 1: Clonar el Proyecto

```powershell
cd "C:\ruta\donde\quieras"
git clone https://github.com/josedavid019/sistema-academico-kampux.git
cd sistema-academico-kampux
```

### Paso 2: Backend (Django)

**En una terminal PowerShell:**

```powershell
# Ir a carpeta backend
cd backend

# Crear entorno virtual
python -m venv venv

# Activar (verás "(venv)" en el prompt)
.\venv\Scripts\Activate.ps1

# Instalar dependencias
pip install --upgrade pip
pip install django==5.2.8 djangorestframework django-cors-headers

# Crear base de datos y usuario admin
python manage.py migrate
python manage.py createsuperuser
# Te pedirá email, contraseña (x2)

# Iniciar servidor
python manage.py runserver
```

✅ Backend listo en: **http://localhost:8000**
🔐 Admin en: **http://localhost:8000/admin**

### Paso 3: Frontend (React)

**En una NUEVA terminal PowerShell:**

```powershell
# IMPORTANTE: NO cierres la terminal del backend

# Ir a carpeta frontend (desde raíz del proyecto)
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor
npm run dev
```

✅ Frontend listo en: **http://localhost:5173**

---

## 🎮 Primeros Pasos

### 1. Acceder al Frontend

- Abre http://localhost:5173
- Haz clic en "Registrarse"
- Completa el formulario
- ¡Listo! Ya tienes una cuenta

### 2. Acceder al Admin

- Ve a http://localhost:8000/admin
- Ingresa con las credenciales del superusuario que creaste
- Aquí puedes crear:
  - Facultades
  - Programas
  - Materias
  - Usuarios especiales (Docente, Coordinador, Administrador)

### 3. Crear Datos de Prueba

Desde el admin puedes:

1. **Crear Facultad** (ej: "Ingeniería")
2. **Crear Programa** (ej: "Ingeniería de Sistemas", vincular a Facultad)
3. **Crear Materia** (ej: "Programación I", "Estructuras de Datos")
4. **Crear Usuarios especiales**:
   - Crea usuario base primero en Users
   - Luego crea el perfil (Docente, Estudiante, etc.)

---

## ❓ Problemas Comunes

### "Module not found: django"
```powershell
# Verifica que venv esté activado (debe mostrar "(venv)")
# Si no, ejecuta:
.\venv\Scripts\Activate.ps1

# Luego instala de nuevo:
pip install django==5.2.8 djangorestframework django-cors-headers
```

### "Port 8000 already in use"
```powershell
# Usa un puerto diferente:
python manage.py runserver 8001
```

### "Port 5173 already in use"
```powershell
# O mata el proceso:
# En otro PowerShell:
lsof -i :5173  # En Linux/Mac
netstat -ano | findstr :5173  # En Windows cmd

# Luego:
Get-Process -Id PROCESO_ID | Stop-Process -Force
```

### "npm: command not found"
- Node.js no está instalado correctamente
- Descarga e instala desde: https://nodejs.org/
- Reinicia PowerShell después de instalar

### "CORS error"
- Verifica que ambos servidores estén corriendo
- El backend debe estar en http://localhost:8000
- El frontend en http://localhost:5173

---

## 📚 Archivos Importantes

Después de la instalación, estos archivos son útiles:

| Archivo | Ubicación | Propósito |
|---------|-----------|----------|
| `manage.py` | `backend/` | Comandos Django |
| `settings.py` | `backend/django_kampux/` | Configuración Django |
| `App.jsx` | `frontend/src/` | Componente principal React |
| `authStore.js` | `frontend/src/store/` | Gestión de autenticación |
| `package.json` | `frontend/` | Dependencias npm |

---

## 🔐 Seguridad Básica

Antes de ir a producción:

1. Cambiar `SECRET_KEY` en `settings.py`
2. Poner `DEBUG=False`
3. Añadir URL del servidor a `ALLOWED_HOSTS`
4. Usar PostgreSQL en lugar de SQLite
5. Implementar HTTPS
6. Crear variables de entorno para secretos

---

## 📞 Ayuda

- Lee el README.md principal
- Revisa la documentación en `docs/`
- Abre el panel admin para ver la estructura de datos
- Consulta los comentarios en el código

---

**¡Listo! Ya puedes comenzar a desarrollar** 🎉
