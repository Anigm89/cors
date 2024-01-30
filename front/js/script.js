function buscarPersonaje(){  
 const input = document.getElementById('nombre');
    const info = document.getElementById('info');

    const nombre = input.value.toLowerCase();

    fetch(`http://localhost:3000/characters/${nombre}`)
    .then(response => response.json())
    .then(data =>{
    //const {name, status, species, gender, origin, image } = data;
    const personajes = data;
    info.innerHTML = '';
    personajes.forEach(personaje => {

        
        info.innerHTML += `
        <div class="card">
            <h2> ${personaje.name} </h2>
            <img src ="${personaje.image} " alt="${personaje.name} ">
            <p>Status: <span>${personaje.status}</span> </p>
            <p>Species: <span>${personaje.species} </span></p>
            <p>Gender: <span>${personaje.gender} </span></p>
            <p>Origin: <span>${personaje.origin.name} </span></p>
            
        </div>
        `
        })
    })
    .catch(error => info.innerHTML = 'no se ha podido obtener la información')

}