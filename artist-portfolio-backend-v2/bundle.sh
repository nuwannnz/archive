#!/bin/bash

# Specify the directory path
directory_path="./dist"

# Change to the specified directory
cd "$directory_path" || exit

# Loop through each JavaScript file in the directory
for js_file in *.js; do
    # Extract the file name (excluding extension)
    file_name=$(basename "$js_file" .js)

    # Create a folder with the file name if it doesn't exist
    mkdir -p "$file_name"

    # Move the JavaScript file into the corresponding folder
    mv "$js_file" "$file_name/"
done

echo "Folders created and files moved successfully."
