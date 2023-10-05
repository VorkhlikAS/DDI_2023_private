#!/bin/bash

# Check if the correct number of arguments is provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <file> <search_string>"
    exit 1
fi

file="$1"
search_string="$2"

# Check if the file exists
if [ ! -f "$file" ]; then
    echo "File '$file' does not exist."
    exit 1
fi

# Use grep to search for the string in the file
grep -i "$search_string" "$file"

