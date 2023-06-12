
//al poner oncklic al input en el html podemos activar funciones en javascript, en este caso se modifica el placeholder tanto al clikear sobre el input como al sacar el click
function clearPlaceholder(input){
    input.placeholder = "";
}
function restPlaceholder(input){
    input.placeholder = "Buscar ciudad..."
}
//consumo de api(intento)
const api = {
    key : '1e5ed99272204af4fc919e9d0102148f',
    url:'https://api.openweathermap.org/data/2.5/weather',
}

const containerCard = document.getElementById('container-card');

const ciudad = document.getElementById('ciudad');
const data = document.getElementById('data');
const pais = document.getElementById('pais');
const temperatura = document.getElementById('temperatura');
const clima = document.getElementById('clima');
const rango = document.getElementById('rango');
const imgClima = document.getElementById('idImgClima');

//esta funcion se usa para cambiar la img dentro de la card
function updateImg(data){
    //const para cambiar de celius a grados y asi saber que parametros se utilizan
    const temp = toCelsius(data.main.temp)//toCelsius es la funcion de cambio a grados y dentro va el elemento al que va a afectar la funcion(temp)
    //variable para saber cual es la img que va a modificar
    let src = `imgClimas/temp-mid.png`;
    //condiciones que se van a cumplir para cambiar la img
    if (temp > 26){
        src = `/imgClimas/temp-higt.png`
    }
    else if (temp < 20){
        src = `/imgClimas/temp-low.png`
    }
    //imgClima.src es lo que va a cambiar, en este caso se asigna el valor imgClima.src a solo src
    imgClima.src = src;
}
//pido la info a la api con async
async function search(query){
    try {
        const response = await fetch (`${api.url}?q=${query}&appid=${api.key}&lang=es`)
        const data = await response.json();
        console.log(data)
        //parametros que cambian al apretar enter
        containerCard.style.display= 'flex';
        card.style.margin = "0";
        //de esta forma saco la info de la api
        ciudad.innerHTML = `${data.name}`
        pais.innerHTML = `${data.sys.country}`
        data.innerHTML = (new Date()).toLocaleDateString();
        temperatura.innerHTML = `${toCelsius(data.main.temp)}°c`
        clima.innerHTML = `${data.weather[0].description}`
        rango.innerHTML = `${toCelsius(data.main.temp_min)}°c / ${toCelsius(data.main.temp_max)}°c`
        updateImg(data)
    } catch (error) {
        console.log(error)
        alert("Hubo un error")
    }
}
//funcion para pasar de celsius a grados 
function toCelsius(kelvin){
    return Math.round(kelvin - 273.15);
}
//funcion para buscar dentro de la api el valor escrito en el input dentro del form
function onSubmit(event){
    event.preventDefault();
    search(inputCard.value);
}
const card = document.getElementById('idCard')
const buscar = document.getElementById('inputCard');
    
card.addEventListener('submit', onSubmit, true);

