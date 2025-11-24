cmake_minimum_required(VERSION 3.15)
project(gymbuddy_backend)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Dependencias
find_package(PostgreSQL REQUIRED)
find_package(OpenSSL REQUIRED)
find_package(Threads REQUIRED)

# Includes
include_directories(
    ${PostgreSQL_INCLUDE_DIRS}
    include
)

# Todos los .cpp del backend
file(GLOB_RECURSE SOURCES "src/*.cpp")

# Ejecutable
add_executable(gymbuddy_server ${SOURCES})

# Librerías
target_link_libraries(gymbuddy_server
    pqxx
    ${PostgreSQL_LIBRARIES}
    OpenSSL::SSL
    OpenSSL::Crypto
    Threads::Threads
)
