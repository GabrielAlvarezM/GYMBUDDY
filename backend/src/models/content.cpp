#include "models/content.h"
#include <iostream>

#include "models/content.h"
#include <iostream>

std::vector<Content> ContentModel::getByTypeAndLevel(
    const std::string& type,
    const std::string& fitness_level
) {
    std::vector<Content> contents;
    std::string table_name;

    if (type == "workout") {
        table_name = "workouts";
    } else if (type == "diet") {
        table_name = "diets";
    } else if (type == "supplement") {
        table_name = "supplements";
    } else {
        return contents; // Return empty if type is invalid
    }

    try {
        pqxx::work txn(conn);

        // Use dynamic table name safely since we control the input above
        std::string query = "SELECT id, title, description, fitness_level, image_url, "
                            "COALESCE(details, '{}') AS details "
                            "FROM " + table_name + " "
                            "WHERE fitness_level = $1";

        pqxx::result result = txn.exec_params(query, fitness_level);

        for (const auto& row : result) {
            Content content;
            content.id = row["id"].as<int>();
            content.type = type; // Manually set type
            content.title = row["title"].as<std::string>();
            content.description = row["description"].as<std::string>();
            content.fitness_level = row["fitness_level"].as<std::string>();
            content.image_url = row["image_url"].as<std::string>();
            content.details = row["details"].as<std::string>();
            contents.push_back(content);
        }

    } catch (const std::exception& e) {
        std::cerr << "Error getting content: " << e.what() << std::endl;
    }

    return contents;
}
