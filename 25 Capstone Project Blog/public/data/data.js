import { readFile, writeFile } from 'fs/promises';

const FILE_NAME = 'posts.json';

// Read file function:
async function readFileData(fileName) {
    try {
        // Use of readFile
        const jsonString = await readFile(fileName, 'utf8');
        return JSON.parse(jsonString);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return {}; // If the file doesn't exist it will create an empty one
        }
        // Throw error if is there any
        throw new Error(`Error reading or parsing file: ${err.message}`);
    }
}

// writeFile function:
async function writeFileData(fileName, dataObject) {
    try {
        const jsonString = JSON.stringify(dataObject, null, 2);
        // Using writeFile
        await writeFile(fileName, jsonString, 'utf8');
    } catch (err) {
        throw new Error(`Error writing to file: ${err.message}`);
    }
}

// Deep Update function
async function updateFileDeep(fileName, updates) {
    try {
        // 1. Read all existing data from the file
        const currentData = await readFileData(fileName); 

        // Get the key (e.g., 'Ethan' or 'David') and the object of updates
        const targetKey = Object.keys(updates)[0];
        const targetUpdates = updates[targetKey];
        
        // Determine the base object to merge into:
        const existingData = currentData[targetKey] || {}; // If key is new, start with an empty object!

        // 2. Deep Merge Logic
        const updatedObjectForTarget = {
            ...existingData, // 🔑 If 'Ethan', it loads current fields. If 'David', it's just {}.
            ...targetUpdates // 🔑 Overwrites existing fields or adds new ones.
        };

        // 3. Final Merge: Create the final object with the merged target
        const finalData = {
            ...currentData, // Keep ALL existing keys (Jonny, and the old Ethan if not overridden)
            [targetKey]: updatedObjectForTarget // Replace the old target object OR add the new one
        };

        // 4. Write the complete, updated object back to the file
        await writeFileData(fileName, finalData);
        return finalData;

    } catch (error) {
        console.error(`❌ File update failed: ${error.message}`);
        return null;
    }
}

// ----------------------
// לוגיקה ראשית לדוגמה
// ----------------------
// async function main() {
//     console.log("--- Starting ---");

// // נתונים ראשוניים
// const initialData = { Ethan: { ID: 0, Level: 1, Title: "Gamer" }, Jonny: { ID: 1, Level: 5, Title: "ProGamer" } };
// await writeFileData(FILE_NAME, initialData);
// console.log(`1. Initial data saved: ${JSON.stringify(initialData)}`);

// עדכון המידע (שינוי רמה והוספת ניקוד)
//     const updates = {
//         Ethan: {
//             level: 2,
//             score: 100,
//             location: "Israel",
//             Title: 'FineGamer'
//         }
//     };

//     const finalData = await updateFileDeep(FILE_NAME, updates);

//     // קריאה סופית לוודא
//     const verificationData = await readFileData(FILE_NAME);
//     console.log("\n2. Verifying data:");
//     console.log(verificationData);

// }

// main();