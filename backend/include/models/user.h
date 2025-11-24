#ifndef USER_MODEL_H
#define USER_MODEL_H

#include "models/base_model.h"
#include <pqxx/pqxx>
#include <string>
#include <optional>

struct User {
    int id;
    std::string username;
    std::string email;
    std::string password_hash;
    std::string fitness_level;
};

class UserModel : public BaseModel {
public:
    UserModel(pqxx::connection& c) : BaseModel(c) {}

    bool create(const User& user);
    std::unique_ptr<User> findByUsername(const std::string& username);
};

#endif
