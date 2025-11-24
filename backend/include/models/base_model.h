#ifndef BASE_MODEL_H
#define BASE_MODEL_H

#include <pqxx/pqxx>
#include <string>
#include <vector>
#include <memory>
#include <iostream>

// Abstract base class for models to enforce ORM-like structure
class BaseModel {
protected:
    pqxx::connection& conn;

public:
    BaseModel(pqxx::connection& c) : conn(c) {}
    virtual ~BaseModel() = default;

    // Common interface for models could go here
    // For now, it serves as a common base for dependency injection and structure
};

#endif
