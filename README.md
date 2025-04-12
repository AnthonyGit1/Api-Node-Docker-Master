# API de Libros con Node.js, MongoDB y Docker

![Versión](https://img.shields.io/badge/versión-1.0.0-blue.svg)
![Licencia](https://img.shields.io/badge/licencia-MIT-green.svg)

Este proyecto implementa una API RESTful simple para gestionar una colección de libros, utilizando Node.js, Express y MongoDB. La aplicación está dockerizada para facilitar su despliegue y uso en cualquier entorno.

## Características

- ✅ API RESTful completa con operaciones CRUD
- 📊 Base de datos MongoDB para almacenamiento persistente
- 🐳 Dockerización de la aplicación y la base de datos
- 📚 Datos de ejemplo precargados
- 🔍 Filtrado de resultados
- 📝 Documentación completa de endpoints

## Rutas de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/books` | Obtener todos los libros |
| `GET` | `/api/books?author=Nombre&genre=Género` | Filtrar libros por diferentes campos |
| `GET` | `/api/books/:isbn` | Obtener un libro específico por ISBN |
| `POST` | `/api/books` | Crear un nuevo libro |
| `PUT` | `/api/books/:isbn` | Actualizar un libro existente o crear uno nuevo |
| `DELETE` | `/api/books/:isbn` | Eliminar un libro |

## Requisitos previos

- Docker y Docker Compose
- Git

## Instalación y ejecución

### Opción 1: Despliegue con Docker (Recomendado)

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/api-node-docker.git
   cd api-node-docker
   ```

2. Iniciar los contenedores con Docker Compose:
   ```bash
   docker-compose up
   ```

La API estará disponible en http://localhost:3000

### Opción 2: Desarrollo local sin Docker

Si prefieres desarrollar sin Docker:

1. Asegúrate de tener MongoDB instalado y ejecutándose localmente
2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` con la configuración:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/libraryDB
   ```

4. Ejecuta el seeder para cargar datos de ejemplo:
   ```bash
   npm run seed
   ```

5. Inicia la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```

## Estructura del proyecto

```
api-node-docker/
├── src/
│   ├── models/       # Modelos de datos
│   ├── routes/       # Rutas de la API
│   ├── scripts/      # Scripts de utilidad
│   ├── seeders/      # Scripts de carga de datos 
│   └── server.js     # Punto de entrada de la aplicación
├── Dockerfile        # Configuración para construir la imagen Docker
├── docker-compose.yml # Configuración para orquestar contenedores
├── package.json      # Dependencias y scripts
└── README.md         # Documentación
```

## Ejemplos de uso

### Obtener todos los libros
```bash
curl http://localhost:3000/api/books
```

### Filtrar libros por género
```bash
curl http://localhost:3000/api/books?genre=Fantasía
```

### Crear un nuevo libro
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "El nombre del viento",
    "author": "Patrick Rothfuss",
    "year": 2007,
    "genre": "Fantasía",
    "pages": 662,
    "isbn": "9788401352836",
    "available": true
  }'
```

### Actualizar un libro existente
```bash
curl -X PUT http://localhost:3000/api/books/9788401352836 \
  -H "Content-Type: application/json" \
  -d '{
    "available": false
  }'
```

### Eliminar un libro
```bash
curl -X DELETE http://localhost:3000/api/books/9788401352836
```

## Comandos útiles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor en modo desarrollo con recarga automática |
| `npm start` | Inicia el servidor en modo producción |
| `npm run seed` | Carga datos de ejemplo en la base de datos |
| `docker-compose up` | Inicia los contenedores con Docker Compose |
| `docker-compose down` | Detiene y elimina los contenedores |

## Licencia

Este proyecto está bajo la Licencia MIT.

---

<div align="center">Desarrollado con ❤️ por Anthony Rosas Pisco</div>