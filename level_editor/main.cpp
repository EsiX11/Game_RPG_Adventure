// libraries
#include <iostream>
#include <fstream>

// local files
#include "json.hpp"
#include "conversion.hpp"
#include "file_check.hpp"

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

    // close the files
    input_file.close();
    output_file.close();

    return 0;
}