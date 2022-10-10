// const { request, response } = require('express');



const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const app = express();
const port = 9000; 

const countrys = [
    {Country: 'Austria', Capitalcity: 'Viena', Currency: 'Euro', id: 1},
    {Country: 'Germany', Capitalcity: 'Berin', Currency: 'Euro', id: 2},
    {Country: 'Albania', Capitalcity: 'Tirana', Currency: 'Lek', id: 3}
];

app.use(express.json())

app.use(cors("*"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Get /Country
app.get('/countrys', (request, response) => {

    response.status(200).send(countrys)
});


// Post /Country
app.post('/country', (request, response) => {

    const newCountry = request.body;
    const newCountryWithID = {...newCountry, id: uuidv4() }

    countrys.push(newCountryWithID)

    response.status(200).send(newCountryWithID)
});

// Get by ID /Country/:id
app.get('/countrys/:id', (request, response) => {
    const params = request.params;
    const requestetCountry = countrys.find(countrys => countrys.id === params.id)
    console.log(requestetCountry)

    response.status(200).send(requestetCountry)
});

// Update by ID /Country/:id

// Delete by ID /Country/:id



app.listen(port, (error) => {
    if(error){
        console.log(error)
    } else {
        console.log(`app is running on port ${port}`)
    }
})