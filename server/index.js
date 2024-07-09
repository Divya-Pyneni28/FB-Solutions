const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app= express()
const port = process.env.PORT || 5000


app.use(bodyParser.json())
app.use(cors())


//path to the json file
const dataFilePath = path.join(__dirname, 'data.json')

//read data from json file
const readData = () =>{
    try {
        const data = fs.readFileSync(dataFilePath);
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data:', error);
        return [];
    }
}

//write data to json file
const writeData = (data) =>{
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        console.log('Data successfully written to file')
    } catch (error) {
        console.error('Error writing data:', error);
    }
}


// Get API call
app.get('/api/data', (req, res) => {
    try {
        const data = readData();
        res.json(data);
    } catch (error) {
        console.error('Error in GET /api/data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



// Post API call
app.post('/api/data', (req, res) => {
    try {
        const newData = req.body;
        const data = readData();
        newData.id = data.length + 1;
        console.log("Hello there I am here....!")
        console.log(newData)
        data.push(newData);
        writeData(data);
        res.status(201).json(newData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})




app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
