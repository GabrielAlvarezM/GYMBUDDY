# 🏋️ GymBuddy - Personalized Fitness Platform

**GymBuddy** is a full-stack web application that provides personalized workout routines, diet plans, and supplement recommendations based on your fitness level.


### Frontend
- **Framework**: Next.js 14 (React)
- **Lenguaje**: TypeScript
- **Estilos**: TailwindCSS + Custom CSS
- **HTTP Client**: Axios
- **Contenedor**: Node:20-alpine

### Backend
- **Lenguaje**: C++17
- **Build System**: CMake
- **ORM**: libpqxx (PostgreSQL C++ library)
- **Hashing**: OpenSSL (SHA-256)
- **Contenedor**: Ubuntu 22.04

### Database
- **Motor**: PostgreSQL
- **Schema**: 4 tablas (users, workouts, diets, supplements)
- **Datos de Prueba**: 3 usuarios + 54 registros de contenido

### DevOps
- **Containerización**: Docker
- **Orquestación**: Docker Compose
- **Red**: Bridge network personalizada

---

## Arquitectura

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Frontend      │────▶│    Backend      │────▶│   Database      │
│   Next.js       │ API │    C++17        │ ORM │   PostgreSQL    │
│   Port: 3000    │     │   Port: 3001    │     │   Port: 5432    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
   Container 1             Container 2             Container 3
        │                       │                       │
        └───────────────────────┴───────────────────────┘
                    gymbuddy-network (Docker)
```

**Flujo de Datos:**
1. Usuario accede al frontend (Next.js)
2. Frontend hace requests HTTP a backend (C++)
3. Backend consulta la base de datos (PostgreSQL) vía libpqxx
4. Backend retorna datos al frontend
5. Frontend renderiza la UI


**Construir y levantar los contenedores**
   ```bash
   docker-compose up --build
   ```

   Esto levanta 3 contenedores:
   - `gymbuddy-frontend` (Puerto 3000)
   - `gymbuddy-backend` (Puerto 3001)
   - `gymbuddy-db` (Puerto 5432)


## Seguridad

- **Hashing de contraseñas**: SHA-256 con salt aleatorio (16 bytes)


## Autor

**Gabriel** - Proyecto Final Desarrollo Web 2025

