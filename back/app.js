const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/characters', async (req, res ) =>{
    const url = 'https://rickandmortyapi.com/api/character'
    try{
        const response = await axios.get(url);
        const personajes = response.data.results;
      
        const listado = personajes.map(personaje => `<li> ${personaje.name}</li>`).join('');

        res.send(
            `<h1>listado de personajes</h1>
            <ul>${listado}</ul>            
            `
        ) 
    }
    catch(error){
        res.status(404).json({error: 'Personaje no encontrado'})
    }
})


app.get('/characters/:name', async (req, res) => {
    const nombre = req.params.name;
    
    const urlName = `https://rickandmortyapi.com/api/character/?name=${nombre}`;
    try{
        const response = await axios.get(urlName);
      
        let {results} = response.data;
        const personajes = results.map((personaje) => {
        let { name, status, species, gender, origin, image } = personaje;
    
            return { name, status, species, gender, origin, image };
           
        });
        res.json(personajes) 
    
    }
    catch (error){
        res.status(404).json({error: 'Personaje no encontrado'})
    }
})


app.listen(3000, () => {
    console.log(`express está escuchando en http://localhost:3000/characters`);
})