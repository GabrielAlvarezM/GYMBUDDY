#include "utils/hasher.h"

#include <openssl/evp.h>
#include <openssl/rand.h>

#include <sstream>
#include <iomanip>
#include <stdexcept>
#include <vector>
#include <string>

namespace {
    constexpr int SALT_SIZE = 16;
    constexpr int HASH_SIZE = 32; // SHA-256

    std::string to_hex(const unsigned char* data, std::size_t len) {
        std::ostringstream oss;
        oss << std::hex << std::setfill('0');
        for (std::size_t i = 0; i < len; ++i) {
            oss << std::setw(2) << static_cast<int>(data[i]);
        }
        return oss.str();
    }

    std::vector<unsigned char> from_hex(const std::string& hex) {
        if (hex.size() % 2 != 0) {
            throw std::runtime_error("Hex string length must be even");
        }
        std::vector<unsigned char> out(hex.size() / 2);
        for (std::size_t i = 0; i < out.size(); ++i) {
            std::string byteStr = hex.substr(i * 2, 2);
            out[i] = static_cast<unsigned char>(std::stoul(byteStr, nullptr, 16));
        }
        return out;
    }
}

std::string Hasher::hashPassword(const std::string& password) {
    unsigned char salt[SALT_SIZE];
    if (RAND_bytes(salt, SALT_SIZE) != 1) {
        throw std::runtime_error("No se pudo generar salt aleatorio");
    }

    unsigned char hash[HASH_SIZE];
    unsigned int hash_len = 0;

    EVP_MD_CTX* ctx = EVP_MD_CTX_new();
    if (!ctx)
        throw std::runtime_error("No se pudo crear contexto de hash");

    if (EVP_DigestInit_ex(ctx, EVP_sha256(), nullptr) != 1 ||
        EVP_DigestUpdate(ctx, salt, SALT_SIZE) != 1 ||
        EVP_DigestUpdate(ctx, password.data(), password.size()) != 1 ||
        EVP_DigestFinal_ex(ctx, hash, &hash_len) != 1) {

        EVP_MD_CTX_free(ctx);
        throw std::runtime_error("Error calculando hash de contraseña");
    }

    EVP_MD_CTX_free(ctx);

    std::string saltHex = to_hex(salt, SALT_SIZE);
    std::string hashHex = to_hex(hash, hash_len);

    return saltHex + ":" + hashHex;
}

bool Hasher::verifyPassword(const std::string& password, const std::string& stored) {
    auto pos = stored.find(':');
    if (pos == std::string::npos) {
        return false;
    }

    std::string saltHex = stored.substr(0, pos);
    std::string hashHex = stored.substr(pos + 1);

    std::vector<unsigned char> salt;
    std::vector<unsigned char> expected_hash;
    try {
        salt = from_hex(saltHex);
        expected_hash = from_hex(hashHex);
    } catch (...) {
        return false;
    }

    unsigned char hash[HASH_SIZE];
    unsigned int hash_len = 0;

    EVP_MD_CTX* ctx = EVP_MD_CTX_new();
    if (!ctx)
        return false;

    bool ok = false;

    if (EVP_DigestInit_ex(ctx, EVP_sha256(), nullptr) == 1 &&
        EVP_DigestUpdate(ctx, salt.data(), salt.size()) == 1 &&
        EVP_DigestUpdate(ctx, password.data(), password.size()) == 1 &&
        EVP_DigestFinal_ex(ctx, hash, &hash_len) == 1) {

        if (hash_len == expected_hash.size()) {
            unsigned char diff = 0;
            for (unsigned int i = 0; i < hash_len; ++i) {
                diff |= hash[i] ^ expected_hash[i];
            }
            ok = (diff == 0);
        }
    }

    EVP_MD_CTX_free(ctx);
    return ok;
}
