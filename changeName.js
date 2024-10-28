const fs = require("fs");
const path = require("path");

const directoryPath = "ipfs/metadata";
const numberOfFilesToProcess = 100;

for (let i = 0; i < numberOfFilesToProcess; i++) {
  const filePath = path.join(directoryPath, `${i}`);

  try {
    // Read the JSON file
    const data = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(data);

    // Modify the name property
    if (jsonData.hasOwnProperty("name")) {
      jsonData.name = "New Name"; // Modify the 'name' property value here
    }

    // Save the updated JSON back to the file
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf8");
    console.log(`Modified and saved ${filePath}`);
  } catch (err) {
    console.error(`Error processing file ${filePath}: ${err.message}`);
  }
}

console.log("Processing completed.");
