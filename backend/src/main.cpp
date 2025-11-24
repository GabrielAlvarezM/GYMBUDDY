#include <iostream>
#include <cstdlib>

#include "crow/crow.h"
#include "crow/middlewares/cors.h"

#include "db/connection.h"
#include "controllers/auth_controller.h"
#include "controllers/content_controller.h"

int main() {
    // Variables de entorno 
    const char* db_host = std::getenv("DB_HOST");
    const char* db_port = std::getenv("DB_PORT");
    const char* db_name = std::getenv("DB_NAME");
    const char* db_user = std::getenv("DB_USER");
    const char* db_password = std::getenv("DB_PASSWORD");

    if (!db_host) db_host = "localhost";
    if (!db_port) db_port = "5432";
    if (!db_name) db_name = "gymbuddy_db";
    if (!db_user) db_user = "gymbuddy_user";
    if (!db_password) db_password = "root";

    DBConnection db(db_host, db_port, db_name, db_user, db_password);

    if (!db.testConnection()) {
        std::cerr << "No se pudo conectar a la base de datos. Saliendo..." << std::endl;
        return 1;
    }

    crow::App<crow::CORSHandler> app;


    auto& cors = app.get_middleware<crow::CORSHandler>();
    cors.global()
        .origin("*")
        .methods("GET"_method, "POST"_method, "OPTIONS"_method)
        .headers("Content-Type", "Authorization");

    AuthController authController(db);
    ContentController contentController(db);

    authController.registerRoutes(app);
    contentController.registerRoutes(app);

    CROW_ROUTE(app, "/health")([]() {
        return crow::response(200, "Backend is running!");
    });

    const char* port_env = std::getenv("PORT");
    int server_port = port_env ? std::stoi(port_env) : 3001;

    std::cout << "Backend C++ corriendo en puerto " << server_port << std::endl;
    app.port(server_port).multithreaded().run();

    return 0;
}
