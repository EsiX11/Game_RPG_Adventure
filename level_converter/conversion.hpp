#pragma once

#include <string>
#include <vector>
#include <sstream>
#include <iostream>

/**
 * @brief std::string split implementation by using delimiter as a character.
 * 
 * @param str_to_split 
 * @param delimeter 
 * @return std::vector<std::string> 
 */
std::vector<std::string> split(std::string str_to_split, char delimeter) {
    std::stringstream ss(str_to_split);
    std::string item;
    std::vector<std::string> splitted_strings;

    while (std::getline(ss, item, delimeter)) {
       splitted_strings.push_back(item);
    }

    return splitted_strings;
}