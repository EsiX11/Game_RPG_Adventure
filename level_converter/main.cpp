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

    // std for all data fields 
    std::vector<std::string> input_data;

    // temporary line data
    std::string line = "";

    // characters we want to remove
    const std::string removables = " \n\t";

    while (std::getline(input_file, line, ';')) {
        // remove characters we don't need
        for (char c: removables) {
            line.erase(std::remove(line.begin(), line.end(), c), line.end());
        }
        
        // add all the lines to the vector
        input_data.push_back(line);
    }

    // set the position to the beginning of the file
    input_file.clear();
    input_file.seekg(0, input_file.beg);

    // get the first line 
    std::getline(input_file, line, '\n');

    // get the amount of delimiters in a single line
    size_t input_delimiter_count = std::count(line.begin(), line.end(), ';');

    // add so the number is correct
    input_delimiter_count += input_delimiter_count ? 1 : 0;

    // close the file
    input_file.close();

    // create a json object
    json j;

    // store the size
    j["_size"] = input_data.size();

    // store the amount of delimiters in a single line
    j["_delimiter_line_count"] = input_delimiter_count;

    const std::string header = "map_part_";

    j["_header"] = header;

    for (size_t i = 0; i < input_data.size(); i++) {
        j[header + std::to_string(i)] = input_data[i];
    }

    output_file << j.dump(4);

    // close the file
    output_file.close();

    return 0;
}