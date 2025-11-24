#ifndef AUTH_CONTROLLER_H
#define AUTH_CONTROLLER_H

#include "crow/crow.h"
#include "crow/middlewares/cors.h"
#include "db/connection.h"
#include "models/user.h"
#include "utils/hasher.h"

class AuthController {
private:
    DBConnection& db;

public:
    explicit AuthController(DBConnection& db_conn);

    // Registra las rutas en la app de Crow
    void registerRoutes(crow::App<crow::CORSHandler>& app);

    // Handlers de endpoints
    crow::response login(const crow::request& req);
    crow::response registerUser(const crow::request& req);
};

#endif
