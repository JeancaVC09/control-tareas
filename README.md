# API REST con Node.js - Arquitectura MVC Funcional

Una Aplicación web con frontend en HTML/CSS/JS y backend en Node.js usando Express y MongoDB local. Implementa autenticación JWT, control de acceso por roles y estructura basada en el patrón MVC.

## 🚀 Características

- ✨ **Frontend** responsivo con HTML, CSS moderno y JavaScript
- 🔐 **Autenticación JWT** (login, registro, protección de rutas)
- 👥 **Control de acceso por roles** (`admin` y `user`)
- 🧱 **Arquitectura MVC** con separación de responsabilidades
- 🗃️ **Base de datos MongoDB local**
- 🌐 **API RESTful** con Express
- 🛡️ **Middleware personalizado** para validación y roles
- 📁 **Estructura modular** clara y escalable

## 📁 Estructura del Proyecto

```
proyecto/ 
├─────.env
├─────package-lock.json
├─────package.json
├─────README.md
├─────server.js
│
├───config
│   └──db.js
│
├───controllers
│   ├──authController.js
│   ├──taskController.js
│   └──userController.js
│
├───middlewares
│   ├──authMiddleware.js
│   └──roleMiddleware.js
│
├───models
│   ├──Task.js
│   └──User.js
│
├───node_modules/
│    ├──...
│
├───public
│   ├──index.html
│   ├──login.html
│   ├──register.html
│   │
│   └───js
│       ├──auth.js
│       └──tasks.js
│
├───routes
│    ├──authRoutes.js
│    ├──taskRoutes.js
│    └──userRoutes.js
```

## 🛠️ Instalación

1. **Clonar el repositorio**

```bash
git clone <url-del-repositorio>
cd control-tareas
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno** (opcional)
   Crear un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/tareas
JWT_SECRET=clave_super_secreta
REFRESH_SECRET=clave_refresh
```

4. **Asegúrate de tener MongoDB instalado y ejecutándose localmente**

Este proyecto requiere una instancia local de MongoDB.
Puedes iniciar el servidor de MongoDB con:

```bash
mongod
```

Si no tienes MongoDB instalado, puedes descargarlo desde: https://www.mongodb.com/try/download/community

5. **Ejecutar el servidor**

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## 📚 Endpoints de la API

### 🔐 Autenticación

#### POST `/api/auth/register`

Registrar un nuevo usuario

```json
{
  "username": "usuario1",
  "password": "123456",
  "role": "user"
}
```

#### POST `/api/auth/login`

Iniciar sesión

```json
{
  "username": "usuario1",
  "password": "123456"
}
```

#### GET `/api/auth/profile`

Obtener perfil del usuario (requiere autenticación)

### 👥 Usuarios

#### GET `/api/users`

| Requiere token JWT válido. Solo accesible por administradores.

Obtener todos los usuarios (solo admin)

### 📋 Tareas

#### GET `/api/tasks`

Obtiene todas las tareas del usuario autenticado.

#### POST `/api/tasks`

Crear una nueva tarea
```json
{
  "title": "Comprar víveres",
  "description": "Ir al mercado y comprar frutas y vegetales"
}
```

#### PUT `/api/tasks/:id`

Actualizar tarea por ID

```json
{
  "title": "Comprar víveres y carnes",
  "description": "Agregar proteínas a la lista",
  "completed": true
}
```

#### DELETE  `/api/tasks/:id`

Eliminar tarea por ID

## �� Autenticación

Todas las rutas protegidas requieren un encabezado:

```
Authorization: Bearer <access_token>
```

### Roles disponibles

- Roles disponibles
user: Usuario regular (solo puede ver y crear sus tareas)

- admin: Usuario con privilegios (puede ver todos los usuarios)

## 🛡️ Seguridad

- **JWT**: Tokens firmados con secreto desde .env

- **bcryptjs**: Contraseñas hasheadas

- **Middleware**: Protección de rutas con validación de token y verificación de roles

- **Escape de HTML** en frontend para prevenir inyecciones XSS

## 🚀 Ejemplos de Uso

### 1. Registrar usuario

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "jean",
    "password": "123456",
    "role": "admin"
  }'
```

### 2. Iniciar sesión

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "jean",
    "password": "123456"
  }'
```

### 3. Crear tarea (con Bearer token)

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Authorization: Bearer <tu_token_aquí>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nueva tarea",
    "description": "Descripción opcional"
  }'
```