FROM postgres:15-alpine

# Variables de entorno por defecto 
ENV POSTGRES_DB=gymbuddy_db \
    POSTGRES_USER=gymbuddy_user \
    POSTGRES_PASSWORD=root

# Script de inicialización
COPY init.sql /docker-entrypoint-initdb.d/init.sql
