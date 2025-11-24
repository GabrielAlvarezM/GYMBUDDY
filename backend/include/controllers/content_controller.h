#ifndef CONTENT_CONTROLLER_H
#define CONTENT_CONTROLLER_H

#include "crow/crow.h"
#include "crow/middlewares/cors.h"
#include "db/connection.h"
#include "models/content.h"

class ContentController {
private:
    DBConnection& db;

public:
    ContentController(DBConnection& db_conn);

    void registerRoutes(crow::App<crow::CORSHandler>& app);

    crow::response getContent(const crow::request& req, const std::string& type);
};

#endif
