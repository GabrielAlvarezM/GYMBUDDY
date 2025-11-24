#include "db/connection.h"
#include <iostream>

DBConnection::DBConnection(const std::string& host, const std::string& port, 
                           const std::string& dbname, const std::string& user, 
                           const std::string& password) {
    connectionString = "host=" + host + " port=" + port + " dbname=" + dbname + 
                       " user=" + user + " password=" + password;
}

std::unique_ptr<pqxx::connection> DBConnection::getConnection() {
    return std::make_unique<pqxx::connection>(connectionString);
}

bool DBConnection::testConnection() {
    try {
        auto conn = getConnection();
        if (conn->is_open()) {
            std::cout << "Conexión a PostgreSQL exitosa" << std::endl;
            return true;
        }
    } catch (const std::exception& e) {
        std::cerr << "Error de conexión: " << e.what() << std::endl;
    }
    return false;
}