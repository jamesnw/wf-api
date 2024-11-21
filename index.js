//@ts-check
import { browsers, features, groups, snapshots } from "web-features";

import fs from 'fs';
import path from 'path';

/**
 * Writes each item in the array to a separate file on disk.
 * 
 * @param {Array} items - The array of items to be written to files.
 * @param {string} directory - The directory where the files should be saved.
 */
function writeFiles(items, directory) {
    // Ensure the directory exists
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }

    items.forEach((item, index) => {
        const filename = `${item.id}.json`;
        const filePath = path.join(directory, filename);

        // Write the item to the file
        fs.writeFile(filePath, JSON.stringify(item), 'utf8', (err) => {
            if (err) {
                console.error(`Error writing file ${filename}:`, err);
            } else {
                console.log(`Successfully wrote to ${filename}`);
            }
        });
    });
}

const items = Object.keys(features).map(feature => ({
  id: feature,
  ...features[feature]
}))

const directory = './api/v1';  // You can change this to any directory path

writeFiles(items, directory);