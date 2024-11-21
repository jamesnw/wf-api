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
        const filename = `${item.feature_id}`;
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


const items = Object.keys(features).map(feature => {
  const featureData = features[feature];

  let status;
  switch (featureData.status.baseline) {
    case 'high':
      status = 'widely';
      break;
    case 'low':
      status = 'newly';
      break;
    case false:
      status = 'limited';
      break;
  
    default:
      status = 'unavailable';
      break;
  }

  return {
    feature_id: feature,
    baseline: {status},
    name: featureData.name,
    spec: featureData.spec,
    browser_implementations: featureData.status.support
  }
})

//   "browser_implementations": {
//       "chrome": {
//           "date": "2024-09-17",
//           "status": "available",
//           "version": "129"
//       },
//       "edge": {
//           "date": "2024-09-19",
//           "status": "available",
//           "version": "129"
//       }


const directory = './api/v1';  // You can change this to any directory path

writeFiles(items, directory);