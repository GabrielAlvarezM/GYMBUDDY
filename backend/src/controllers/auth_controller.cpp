#include "controllers/auth_controller.h"

AuthController::AuthController(DBConnection& db_conn)
    : db(db_conn) {}

void AuthController::registerRoutes(crow::App<crow::CORSHandler>& app) {
    CROW_ROUTE(app, "/api/login").methods("POST"_method)(
        [this](const crow::request& req) {
            return this->login(req);
        }
    );

    CROW_ROUTE(app, "/api/register").methods("POST"_method)(
        [this](const crow::request& req) {
            return this->registerUser(req);
        }
    );
}

crow::response AuthController::login(const crow::request& req) {
    auto conn = db.getConnection();
    UserModel userModel(*conn);

    try {
        auto body = crow::json::load(req.body);
        if (!body) {
            return crow::response(400, "Invalid JSON");
        }

        std::string username = body["username"].s();
        std::string password = body["password"].s();

        auto user = userModel.findByUsername(username);
        if (!user) {
            return crow::response(401, "Invalid username or password");
        }

        bool password_ok = Hasher::verifyPassword(password, user->password_hash);
        if (!password_ok) {
            return crow::response(401, "Invalid username or password");
        }

        crow::json::wvalue response;
        response["success"] = true;
        response["user"]["id"] = user->id;
        response["user"]["username"] = user->username;
        response["user"]["email"] = user->email;
        response["user"]["fitness_level"] = user->fitness_level;

        return crow::response(response);

    } catch (const std::exception& e) {
        return crow::response(500, e.what());
    }
}

crow::response AuthController::registerUser(const crow::request& req) {
    auto conn = db.getConnection();
    UserModel userModel(*conn);

    try {
        auto body = crow::json::load(req.body);
        if (!body) {
            return crow::response(400, "Invalid JSON");
        }

        User newUser;
        newUser.username = body["username"].s();
        newUser.email = body["email"].s();
        newUser.fitness_level = body["fitness_level"].s();
        std::string password = body["password"].s();

        newUser.password_hash = Hasher::hashPassword(password);

        bool success = userModel.create(newUser);

        if (success) {
            crow::json::wvalue response;
            response["success"] = true;
            response["message"] = "User created successfully";
            return crow::response(201, response);
        } else {
            return crow::response(400, "Username or email already exists");
        }

    } catch (const std::exception& e) {
        return crow::response(500, e.what());
    }
}
