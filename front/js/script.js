function buscarPersonaje(){  
    const input = document.getElementById('nombre');
    const info = document.getElementById('info');

    const nombre = input.value.toLowerCase();

    fetch(`http://localhost:3000/characters/${nombre}`)
    .then(response => response.json())
    .then(data =>{
        info.innerHTML = '';
        if(data){
            data.map(personaje => {
                const {name, status, species, gender, origin, image } = personaje;
            
                    info.innerHTML += `
                    <div class="card">
                        <h2> ${name} </h2>
                        <img src ="${image} " alt="${name} ">
                        <p>Status: <span>${status}</span> </p>
                        <p>Species: <span>${species} </span></p>
                        <p>Gender: <span>${gender} </span></p>
                        <p>Origin: <span>${origin.name} </span></p>
                        
                    </div>
                    `
                })
            }
            else{
                info.innerHTML = 'No se ha encontrado el personaje'
            }
    })
    .catch(error => info.innerHTML = 'no se ha podido obtener la información')

}

