#!/bin/bash

# Navigate to the 'dist' directory
cd dist || exit

# Loop through all JS files in the 'dist' directory
for js_file in *.js; do
    # Rename each JS file to 'index.js'
    mv "$js_file" "index.js"

    # Get the file name without extension
    file_name=$(basename -- "$js_file")
    file_name_no_ext="${file_name%.*}"

    # Zip the 'index.js' file with the original file name
    zip "$file_name_no_ext.zip" "index.js"

    # Remove the original 'index.js' file
    rm "index.js"
done

echo "Zip and rename process completed."
