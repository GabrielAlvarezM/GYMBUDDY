#ifndef DB_CONNECTION_H
#define DB_CONNECTION_H

#include <pqxx/pqxx>
#include <string>
#include <memory>

class DBConnection {
private:
    std::string connectionString;
    
public:
    DBConnection(const std::string& host, const std::string& port, 
                 const std::string& dbname, const std::string& user, 
                 const std::string& password);
    
    std::unique_ptr<pqxx::connection> getConnection();
    bool testConnection();
};

#endif