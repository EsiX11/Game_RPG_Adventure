// libraries
#include <iostream>
#include <fstream>
#include <vector>
#include <algorithm>

// local files
#include "json.hpp"
#include "conversion.hpp"
#include "file_check.hpp"

using json = nlohmann::json;

const std::string map_name = "map";

int main(int argc, char **argv){

    // check for enough options
    if (argc < 3) {
        std::cout << "To use this program use:\n\t";
        std::cout << "level_converter.exe input.csv output.json";

        // stop the program with an error
        return -1;
    }

    std::cout << "Opening files:\n";
    std::cout << "\tInput file: " << argv[1] << "\n\tOutput file: " << argv[2] << "\n\n";

    std::ifstream input_file;

    input_file.open(argv[1]);

    // check if we could open the file
    if (input_file.fail()) {
        std::cout << "Failed to open file: " << argv[1] << '\n';

        // return a error
        return -1;
    }

    if (file_exists(argv[2])) {
        std::cout << "Overwriting old file.\n";
    }

    std::ofstream output_file;

    output_file.open(argv[2], std::ios_base::out);

    // check if we can open or overwrite the output file
    if (output_file.fail()) {
        std::cout << "Could not create or open file: " << argv[2] << '\n';

        // return a error
        return -1;
    }

    // temporary line data
    std::string line = "";

    // std for all data fields 
    std::vector<std::vector<std::string>> input_data;

    for (size_t i = 0; std::getline(input_file, line, '\r'); i++) {
        input_data.push_back(std::vector<std::string>());

        // // remove the spaces
        line.erase(std::remove(line.begin(), line.end(), ' '), line.end());
        // // remove the cariage return
        line.erase(std::remove(line.begin(), line.end(), '\n'), line.end());

        auto t = split(line, ';');

        for (std::string& s: t) {
            // add all the lines to the vector
            input_data[i].push_back(s);
        }

        // check if there is something after the last seperator
        if (line[line.length() - 1] == ';') {
            input_data[i].push_back("");
        }      
    }

    // close the file
    input_file.close();

    // create a json object
    json j;

    // store the name of the map
    j["_map_name"] = map_name;

    // store the array of the map
    j["_map"] = input_data;

    // write the json output to the output file
    output_file << j.dump(4);

    // close the file
    output_file.close();

    return 0;
}