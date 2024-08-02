const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

const mongoURI = process.env.MONGO_URI

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define schema and model
const dataSchema = new mongoose.Schema({
    features: [String],
    labels: [String]
});
const Data = mongoose.model('Data', dataSchema);

// Handle form submission
app.post('/submit-data', async (req, res) => {
    try {
        const { features, labels } = req.body;
        console.log('Received data:', { features, labels }); // Log received data
        const data = new Data({ features, labels });
        await data.save();
        res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error); // Log the complete error
        res.status(500).json({ message: 'Error saving data', error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
