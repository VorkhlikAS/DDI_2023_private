#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <search_string>"
    exit 1
fi


data_folder="/Users/alex/Desktop/git-projects/DDI_2023_private/linux101/data"
search_string="$1"

# echo $search_string
# echo $data_folder

for file in "$data_folder"/*
do
    if [ -f "$file" ]; then
        ./grep_script.sh "$file" "$search_string"
    fi
done

