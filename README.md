# API de Libros con Node.js, MongoDB y Docker

Este proyecto implementa una API RESTful para gestionar una colección de libros, utilizando Node.js, Express y MongoDB. La aplicación está dockerizada para facilitar su despliegue y uso.

## Características

- API RESTful completa con operaciones CRUD
- Base de datos MongoDB para almacenamiento persistente
- Dockerización de la aplicación y la base de datos
- Datos de ejemplo precargados

## Rutas de la API

- `GET /api/books`: Obtener todos los libros
- `GET /api/books?author=Nombre&genre=Género`: Filtrar libros por diferentes campos
- `GET /api/books/:isbn`: Obtener un libro específico por ISBN
- `POST /api/books`: Crear un nuevo libro
- `PUT /api/books/:isbn`: Actualizar un libro existente o crear uno nuevo
- `DELETE /api/books/:isbn`: Eliminar un libro

## Requisitos previos

- Docker y Docker Compose
- Git

## Instalación y ejecución

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

## Desarrollo local sin Docker

Si prefieres desarrollar sin Docker:

1. Asegúrate de tener MongoDB instalado y ejecutándose localmente
2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo .env con la configuración:
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

## Licencia

Este proyecto está bajo la Licencia .