#!/bin/bash

# Check if the correct number of arguments is provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <directory> <search_string>"
    exit 1
fi

directory="$1"
search_string="$2"

# Check if the directory exists
if [ ! -d "$directory" ]; then
    echo "Directory '$directory' does not exist."
    exit 1
fi

# Use grep to search for the string in each file in the directory
for file in "$directory"/*
do
    if [ -f "$file" ]; then
        echo "Searching in file: $file"
        grep -i "$search_string" "$file"
        echo "--------------------------------"
    fi
done

