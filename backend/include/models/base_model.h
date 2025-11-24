#ifndef BASE_MODEL_H
#define BASE_MODEL_H

#include <pqxx/pqxx>
#include <string>
#include <vector>
#include <memory>
#include <iostream>


class BaseModel {
protected:
    pqxx::connection& conn;

public:
    BaseModel(pqxx::connection& c) : conn(c) {}
    virtual ~BaseModel() = default;
};

#endif
