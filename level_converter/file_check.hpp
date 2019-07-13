#pragma once

#include <sys/stat.h>
#include <string>

/**
 * @brief Check if a file exists
 * 
 * @param filename the name of the file to check
 * @return true if the file exists, else false
 */
bool file_exists(const std::string& filename) {
    struct stat buf;

    return stat(filename.c_str(), &buf) != -1;
}