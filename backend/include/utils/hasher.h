#ifndef HASHER_H
#define HASHER_H

#include <string>

class Hasher {
public:
    static std::string hashPassword(const std::string& password);
    static bool verifyPassword(const std::string& password, const std::string& hash);
};

#endif
