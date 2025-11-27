# 🔧 Guía de Troubleshooting y Mejores Prácticas

## 🚨 Troubleshooting

### Problemas de Instalación

#### 1. "Python no reconocido como comando"

**Síntoma:**
```
'python' is not recognized as an internal or external command
```

**Soluciones:**

a) Verificar si Python está instalado:
```powershell
python --version
py --version
py -3 --version
```

b) Si no está instalado, descargar de: https://www.python.org/downloads/

c) Después de instalar, reiniciar PowerShell

d) Si aún no funciona, agregar Python a PATH:
- Panel de Control → Sistema → Variables de entorno
- Editar PATH y agregar: `C:\Users\[tu_usuario]\AppData\Local\Programs\Python\Python312`

#### 2. "No se puede activar venv"

**Síntoma:**
```powershell
.\venv\Scripts\Activate.ps1 : File cannot be loaded because running scripts is disabled
```

**Solución:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
# Presiona "Y" y Enter
# Luego intenta de nuevo:
.\venv\Scripts\Activate.ps1
```

#### 3. "pip: command not found"

**Síntoma:**
```
pip is not recognized
```

**Soluciones:**

a) Asegúrate que venv esté activado:
```powershell
# Debe mostrar "(venv)" en el prompt
.\venv\Scripts\Activate.ps1
```

b) Usa python -m pip:
```powershell
python -m pip install --upgrade pip
python -m pip install django
```

#### 4. "No se puede instalar módulos Django"

**Síntoma:**
```
ERROR: Could not find a version that satisfies the requirement
```

**Soluciones:**

a) Verificar conexión a internet

b) Usar un espejo de pip:
```powershell
pip install -i https://pypi.tsinghua.edu.cn/simple django==5.2.8
```

c) Actualizar pip:
```powershell
python -m pip install --upgrade pip setuptools wheel
```

---

### Problemas de Backend (Django)

#### 5. "Port 8000 already in use"

**Síntoma:**
```
Address already in use *** addrnotavail
```

**Soluciones:**

a) Usar puerto diferente:
```powershell
python manage.py runserver 8001
```

b) En Windows, encontrar y matar el proceso:
```powershell
netstat -ano | findstr :8000
# Verás algo como: TCP 127.0.0.1:8000 0.0.0.0:0 LISTENING 12345
Get-Process -Id 12345 | Stop-Process -Force
```

c) O usar taskkill:
```powershell
taskkill /PID 12345 /F
```

#### 6. "ModuleNotFoundError: No module named 'django'"

**Síntoma:**
```
ModuleNotFoundError: No module named 'django'
```

**Soluciones:**

a) Activar venv:
```powershell
.\venv\Scripts\Activate.ps1
```

b) Instalar django:
```powershell
pip install django==5.2.8
```

c) Verificar venv correcto:
```powershell
where python  # Debe mostrar ruta dentro de venv
```

#### 7. "Database table does not exist"

**Síntoma:**
```
ProgrammingError: no such table: usuarios_usuario
```

**Soluciones:**

```powershell
# Crear migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Verificar estado
python manage.py showmigrations
```

#### 8. "CORS error: No 'Access-Control-Allow-Origin' header"

**Síntoma:**
```
Access to XMLHttpRequest at 'http://localhost:8000/api/...'
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Soluciones:**

a) Verificar CORS_ALLOWED_ORIGINS en `settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:8000",
]
```

b) Verificar que django-cors-headers esté instalado:
```powershell
pip install django-cors-headers
```

c) Verificar que esté en INSTALLED_APPS:
```python
INSTALLED_APPS = [
    'corsheaders',
    # ...
]
```

d) Verificar MIDDLEWARE:
```python
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Debe ser al principio
    'django.middleware.common.CommonMiddleware',
    # ...
]
```

#### 9. "CSRF token missing or incorrect"

**Síntoma:**
```
CSRF verification failed. Request aborted.
```

**Soluciones:**

a) Verificar que la vista tiene `@csrf_exempt`:
```python
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@method_decorator(csrf_exempt, name="dispatch")
class MiAPIView(APIView):
    pass
```

b) O usar CSRF tokens (mejor para producción):
```javascript
// Frontend
const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
```

#### 10. "Superuser creation failed"

**Síntoma:**
```
ERROR: That username is already taken.
```

**Soluciones:**

```powershell
# Crear otro superuser con diferente nombre
python manage.py createsuperuser

# O cambiar la contraseña del existente:
python manage.py changepassword admin
```

---

### Problemas de Frontend (React)

#### 11. "npm: command not found"

**Síntoma:**
```
npm is not recognized as an internal or external command
```

**Soluciones:**

a) Node.js no está instalado. Descargar de: https://nodejs.org/

b) Después de instalar, reiniciar PowerShell

c) Verificar:
```powershell
node --version
npm --version
```

#### 12. "Module not found: react-router-dom"

**Síntoma:**
```
Module not found: Can't resolve 'react-router-dom'
```

**Soluciones:**

```powershell
cd frontend
npm install
npm run dev
```

#### 13. "Port 5173 already in use"

**Síntoma:**
```
EADDRINUSE: address already in use :::5173
```

**Soluciones:**

a) Usar puerto diferente:
```powershell
npm run dev -- --port 5174
```

b) En PowerShell, matar el proceso:
```powershell
Get-Process | Where-Object {$_.Port -eq 5173} | Stop-Process -Force
```

c) O en cmd:
```cmd
lsof -i :5173  # En Linux/Mac
netstat -ano | findstr :5173  # En Windows
taskkill /PID [PID] /F
```

#### 14. "Cannot find module '.env.local'"

**Síntoma:**
Las variables de entorno no se cargan

**Soluciones:**

a) Crear archivo `.env.local` en `frontend/`:
```env
VITE_API_URL=http://localhost:8000/api
VITE_ENV=development
```

b) En Vite, acceder como:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

c) No usar `process.env` (es de Node, no de Vite):
```javascript
// ❌ Incorrecto
const url = process.env.VITE_API_URL;

// ✅ Correcto
const url = import.meta.env.VITE_API_URL;
```

#### 15. "Axios CORS error"

**Síntoma:**
```
XMLHttpRequest has been blocked by CORS policy
```

**Soluciones:**

a) Verificar que backend tiene CORS habilitado (ver problema 8)

b) Verificar URL de API en `.env.local`:
```env
VITE_API_URL=http://localhost:8000/api  # Sin trailing slash
```

c) En axios config:
```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,  // Importante para sesiones
});
```

#### 16. "Build error: Unexpected token"

**Síntoma:**
```
SyntaxError: Unexpected token < in JSON at position 0
```

**Soluciones:**

a) El archivo HTML se está sirviendo en lugar de JSON. Verificar que el servidor backend está corriendo.

b) Verificar URL de API:
```javascript
console.log('API URL:', import.meta.env.VITE_API_URL);
```

c) Hacer petición de prueba:
```powershell
curl http://localhost:8000/api/usuarios/
```

---

### Problemas de Autenticación

#### 17. "Login no funciona"

**Síntoma:**
```
Error: Invalid credentials
```

**Verificaciones:**

a) Usuario existe en la BD:
```powershell
# En Django shell
python manage.py shell
>>> from usuarios.models import Usuario
>>> Usuario.objects.all()
```

b) Contraseña es correcta:
```python
from django.contrib.auth.hashers import check_password
user = Usuario.objects.get(email='test@example.com')
check_password('password123', user.password)  # Debe retornar True
```

c) Usuario está activo:
```python
user.activo  # Debe ser True
```

#### 18. "Sesión no persiste"

**Síntoma:**
```
Usuario se desloguea al refrescar la página
```

**Soluciones:**

a) Verificar que localStorage está habilitado:
```javascript
localStorage.setItem('test', 'test');
console.log(localStorage.getItem('test'));
```

b) En authStore, verificar loadUser():
```javascript
useEffect(() => {
  loadUser();  // Restaurar usuario desde localStorage
}, []);
```

c) Verificar que se guarda en localStorage:
```javascript
const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', user.token);
};
```

---

## ✅ Mejores Prácticas

### Backend (Django)

#### 1. Organización del Código

```python
# ❌ Incorrecto: Todo en views.py
class MegaView(APIView):
    # 500 líneas de código

# ✅ Correcto: Separar responsabilidades
# services/academico_service.py
class AcademicoService:
    @staticmethod
    def crear_programa(nombre, facultad):
        ...

# views.py
class ProgramaCreateView(APIView):
    def post(self, request):
        service = AcademicoService()
        resultado = service.crear_programa(...)
        return Response(resultado)
```

#### 2. Querys Eficientes

```python
# ❌ Incorrecto: N+1 query problem
for estudiante in Estudiante.objects.all():
    print(estudiante.user.email)  # Cada iteración hace 1 query

# ✅ Correcto: select_related
estudiantes = Estudiante.objects.select_related('user').all()
for estudiante in estudiantes:
    print(estudiante.user.email)  # Una sola query
```

#### 3. Validación de Datos

```python
# ❌ Incorrecto: Sin validación
class UsuarioCreateSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

# ✅ Correcto: Con validación completa
class UsuarioCreateSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        min_length=8,
        validators=[validate_password]
    )
    
    def validate_email(self, value):
        if Usuario.objects.filter(email=value).exists():
            raise ValidationError("Email ya existe")
        return value
```

#### 4. Manejo de Errores

```python
# ❌ Incorrecto: Errores genéricos
try:
    user = Usuario.objects.get(id=1)
except:
    return Response({"error": "Error"})

# ✅ Correcto: Errores específicos
try:
    user = Usuario.objects.get(id=1)
except Usuario.DoesNotExist:
    return Response(
        {"error": "Usuario no encontrado"},
        status=status.HTTP_404_NOT_FOUND
    )
except Exception as e:
    logger.error(f"Error inesperado: {e}")
    return Response(
        {"error": "Error interno del servidor"},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )
```

#### 5. Logging

```python
import logging

logger = logging.getLogger(__name__)

class UsuarioLoginView(APIView):
    def post(self, request):
        try:
            user = Usuario.objects.get(email=request.data['email'])
            logger.info(f"Login exitoso para {user.email}")
        except Usuario.DoesNotExist:
            logger.warning(f"Intento de login fallido: {request.data['email']}")
```

---

### Frontend (React)

#### 6. Componentes Reutilizables

```javascript
// ❌ Incorrecto: Duplicar código
function EstudianteList() {
  return <div>
    <h1>Estudiantes</h1>
    <table>
      <thead>
        <tr><th>Nombre</th><th>Email</th></tr>
      </thead>
      <tbody>
        {/* rows */}
      </tbody>
    </table>
  </div>
}

// ✅ Correcto: Componente genérico
function GenericTable({ title, columns, data }) {
  return <div>
    <h1>{title}</h1>
    <table>
      <thead>
        <tr>
          {columns.map(col => <th key={col}>{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            {columns.map(col => <td key={col}>{row[col]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
}

// Uso:
<GenericTable 
  title="Estudiantes"
  columns={['nombre', 'email']}
  data={students}
/>
```

#### 7. Manejo de Estados

```javascript
// ❌ Incorrecto: Múltiples useState
const [loading, setLoading] = useState(false);
const [data, setData] = useState(null);
const [error, setError] = useState(null);

// ✅ Correcto: Usar Zustand o Context
const useStore = create((set) => ({
  loading: false,
  data: null,
  error: null,
  setLoading: (loading) => set({ loading }),
  setData: (data) => set({ data }),
  setError: (error) => set({ error }),
}));
```

#### 8. Custom Hooks

```javascript
// ✅ Reutilizar lógica con hooks
function useFetch(url) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { loading, data, error };
}

// Uso:
const { loading, data, error } = useFetch('/api/students');
```

#### 9. Error Handling

```javascript
// ❌ Incorrecto: Sin captura de errores
const loginUser = async (email, password) => {
  const response = await axios.post('/login', { email, password });
  return response.data;
};

// ✅ Correcto: Con manejo de errores
const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/usuarios/login`,
      { email, password }
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Credenciales inválidas');
    } else if (error.response?.status === 500) {
      throw new Error('Error del servidor');
    } else if (!error.response) {
      throw new Error('Error de conectividad');
    } else {
      throw new Error(error.response.data?.error || 'Error desconocido');
    }
  }
};
```

#### 10. Performance

```javascript
// ❌ Incorrecto: Renders innecesarios
function UserList() {
  const [users, setUsers] = useState([]);
  
  const filteredUsers = users.filter(u => u.active);  // Recalcula cada render
  
  return <div>
    {filteredUsers.map(u => <UserCard key={u.id} user={u} />)}
  </div>
}

// ✅ Correcto: Usar useMemo
function UserList() {
  const [users, setUsers] = useState([]);
  
  const filteredUsers = useMemo(() => 
    users.filter(u => u.active),
    [users]
  );
  
  return <div>
    {filteredUsers.map(u => <UserCard key={u.id} user={u} />)}
  </div>
}
```

---

## 🛡️ Checklist de Seguridad

### Antes de Desplegar a Producción

- [ ] Cambiar `SECRET_KEY` en settings.py
- [ ] Poner `DEBUG=False`
- [ ] Añadir dominio a `ALLOWED_HOSTS`
- [ ] Usar HTTPS en todas las conexiones
- [ ] Implementar JWT tokens (no solo sesiones)
- [ ] Configurar rate limiting
- [ ] Agregar validación CSRF
- [ ] Sanitizar inputs en frontend y backend
- [ ] Usar variables de entorno para secretos
- [ ] Configurar headers de seguridad (CSP, X-Frame-Options, etc.)
- [ ] Hacer auditoría de seguridad
- [ ] Configurar WAF (Web Application Firewall)
- [ ] Implementar logging y monitoreo
- [ ] Hacer backup de BD regularmente
- [ ] Tener plan de disaster recovery

---

## 📚 Recursos Útiles

- Django Docs: https://docs.djangoproject.com/
- React Docs: https://react.dev/
- Django REST Framework: https://www.django-rest-framework.org/
- Tailwind CSS: https://tailwindcss.com/
- OWASP Top 10: https://owasp.org/Top10/

---

**Última actualización: 27 de Noviembre de 2025**
