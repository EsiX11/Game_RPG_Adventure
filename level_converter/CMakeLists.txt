cmake_minimum_required(VERSION 3.0.0)

# Sources of project
set(SOURCES main.cpp)

# Flags
set(CMAKE_CXX_STANDARD 17)

add_executable(level_editor ${SOURCES})
# target_link_libraries(sfml sfml-graphics sfml-audio sfml-system)