#include "models/user.h"
#include <iostream>

bool UserModel::create(const User& user) {
    try {
        pqxx::work txn(conn);

        txn.exec_params(
            "INSERT INTO users (username, email, password_hash, fitness_level) "
            "VALUES ($1, $2, $3, $4)",
            user.username, user.email, user.password_hash, user.fitness_level
        );

        txn.commit();
        return true;
    } catch (const std::exception& e) {
        std::cerr << "Error creating user: " << e.what() << std::endl;
        return false;
    }
}

std::unique_ptr<User> UserModel::findByUsername(const std::string& username) {
    try {
        pqxx::work txn(conn);

        pqxx::result result = txn.exec_params(
            "SELECT id, username, email, password_hash, fitness_level "
            "FROM users WHERE username = $1",
            username
        );

        if (result.empty()) {
            return nullptr;
        }

        const auto& row = result[0];

        auto user = std::make_unique<User>();
        user->id = row["id"].as<int>();
        user->username = row["username"].as<std::string>();
        user->email = row["email"].as<std::string>();
        user->password_hash = row["password_hash"].as<std::string>();
        user->fitness_level = row["fitness_level"].as<std::string>();

        return user;
    } catch (const std::exception& e) {
        std::cerr << "Error finding user: " << e.what() << std::endl;
        return nullptr;
    }
}
