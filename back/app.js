const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (req, res) =>{
    res.json({mensaje: 'hola'})
})

app.get('/characters', async (req, res ) =>{
    const url = 'https://rickandmortyapi.com/api/character'
    try{
        const response = await axios.get(url);
        const personajes = response.data.results;
      
        //res.json(personajes)  ->  devuelve datos json y  lo de abajo no es necesario
        const listado = personajes.map(personaje => `<li> ${personaje.name}</li>`).join('');

        res.send(
            `<h1>listado de personajes</h1>
            <ul>${listado}</ul>            
            `
        ) 
    }
    catch(error){
        res.status(500).json({error: 'Error al acceder al personaje'})

    }
})


app.get('/characters/:name', async (req, res) => {
    const nombre = req.params.name;
    
    const urlName = `https://rickandmortyapi.com/api/character/?name=${nombre}`;
    try{
        const response = await axios.get(urlName);
        const personajes = response.data.results;

        if(personajes){
            res.json(personajes)
        }
        else{
            res.status(404).json({error: 'Personaje no encontrado'})

        }

      /* otra forma:
        let {results} = response.data;
        const personajes = results.map((personaje) => {
        let { name, status, species, gender, origin, image } = personaje;
    
            return { name, status, species, gender, origin, image };
           
        });
        
        res.json(personajes) 
        */
    
    }
    catch (error){
        res.status(500).json({error: 'No ha podido acceder al servidor. Personaje no encontrado'})
    }
})


app.listen(3000, () => {
    console.log(`express está escuchando en http://localhost:3000/characters`);
})