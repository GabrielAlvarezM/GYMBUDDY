#include "controllers/content_controller.h"
#include "models/content.h"

ContentController::ContentController(DBConnection& db_conn)
    : db(db_conn) {}

void ContentController::registerRoutes(crow::App<crow::CORSHandler>& app) {
    CROW_ROUTE(app, "/api/content/<string>").methods("GET"_method)(
        [this](const crow::request& req, const std::string& type) {
            return this->getContent(req, type);
        }
    );
}

crow::response ContentController::getContent(const crow::request& req, const std::string& type) {
    auto conn = db.getConnection();
    ContentModel contentModel(*conn);

    try {
        const char* level_param = req.url_params.get("fitness_level");
        std::string fitness_level = level_param ? std::string(level_param) : "beginner";

        auto contents = contentModel.getByTypeAndLevel(type, fitness_level);

        crow::json::wvalue response;
        crow::json::wvalue::list content_list;

        for (const auto& c : contents) {
            crow::json::wvalue item;
            item["id"] = c.id;
            item["type"] = c.type;
            item["title"] = c.title;
            item["description"] = c.description;
            item["fitness_level"] = c.fitness_level;
            item["image_url"] = c.image_url;
            item["details"] = c.details;
            content_list.push_back(item);
        }

        response["type"] = type;
        response["fitness_level"] = fitness_level;
        response["content"] = std::move(content_list);

        return crow::response(response);

    } catch (const std::exception& e) {
        return crow::response(500, e.what());
    }
}
