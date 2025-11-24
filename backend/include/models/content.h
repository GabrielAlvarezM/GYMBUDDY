#ifndef CONTENT_MODEL_H
#define CONTENT_MODEL_H

#include "models/base_model.h"
#include <pqxx/pqxx>
#include <string>
#include <vector>

struct Content {
    int id;
    std::string type; // Not in DB, populated manually
    std::string title;
    std::string description;
    std::string fitness_level;
    std::string image_url;
    std::string details; // TEXT in DB
};

class ContentModel : public BaseModel {
public:
    ContentModel(pqxx::connection& c) : BaseModel(c) {}

    std::vector<Content> getByTypeAndLevel(
        const std::string& type,
        const std::string& fitness_level
    );
};

#endif
