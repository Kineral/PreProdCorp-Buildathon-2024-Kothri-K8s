const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(express.json()); // To parse JSON bodies

// ======= File Upload Handling =======

// Configure Multer to store uploaded files in the 'uploads/' directory with a default filename
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, 'data.csv'); // Use a default filename
  }
});
const upload = multer({ storage: storage }); // Configure multer with custom storage

// Serve the uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Handle POST request to /upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // File has been saved as 'data.csv'
  res.json({ success: true, message: 'File uploaded successfully.' });
});

// ======= Element Addition Handling =======

// Define paths to the JavaScript files
const files = {
  features: path.join(__dirname, 'features.js'),
  labels: path.join(__dirname, 'labels.js'),
};

// Handle POST request to add element to a JavaScript file
app.post('/addElement', (req, res) => {
  const { item, fileName } = req.body;
  if (!item || !fileName || !files[fileName]) {
    return res.status(400).send('Invalid request');
  }

  const filePath = files[fileName];
  const dataToAppend = `\n'${item}',`;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File does not exist, initialize with empty array
        const initialContent = fileName === 'features' ? 'const features = [];' : 'const labels = [];';
        fs.writeFile(filePath, initialContent, 'utf8', (writeErr) => {
          if (writeErr) {
            return res.status(500).send('Error initializing file');
          }
          // After initialization, append the item
          appendItemToFile(filePath, dataToAppend, res);
        });
      } else {
        return res.status(500).send('Error reading file');
      }
    } else {
      appendItemToFile(filePath, dataToAppend, res);
    }
  });
});

// Function to append item to file
function appendItemToFile(filePath, dataToAppend, res) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading file');
    }

    let newData;
    const arrayDeclaration = filePath.includes('features') ? 'const features = ' : 'const labels = ';

    // Check if file content starts with the array declaration
    if (data.trim().startsWith(arrayDeclaration) && data.trim().endsWith('];')) {
      newData = data.replace(/(\];\s*)$/, `${dataToAppend}\n];`);
    } else {
      newData = `${arrayDeclaration}[${dataToAppend}\n];`;
    }

    fs.writeFile(filePath, newData, 'utf8', (err) => {
      if (err) {
        return res.status(500).send('Error writing to file');
      }
      res.send('Element added successfully');
    });
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
